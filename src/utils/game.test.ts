import { describe, expect, it, vi, afterEach } from 'vitest';
import { questions } from '../data/questions';
import { levels } from '../data/levels';
import { mbtiCards, mbtiCodes } from '../data/mbtiCards';
import { mbtiTypes } from '../data/mbtiTypes';
import { testReducer } from '../context/MBTIContext';
import { calculateMBTI, calculatePercentages, calculateScores, DIMENSIONS, OPPOSITE } from './scoring';
import { answeredCount, areAllLevelsCompleted, deriveUnlockedLevel, getLevelQuestions, getLevelStatus, isLevelCompleted } from './progression';
import { initialState, parseSavedState, persistState, readState, STORAGE_KEY } from './storage';
import type { Answers, AnswerValue, Question } from '../types';

afterEach(() => vi.unstubAllGlobals());
const fill = (bank: readonly Question[], value: AnswerValue = 5): Answers => Object.fromEntries(bank.map(q => [q.id, value]));

describe('question data and asset coverage', () => {
  it('uses unique IDs and balanced, mixed dimensions in every level', () => {
    expect(new Set(questions.map(q => q.id)).size).toBe(questions.length);
    for (const level of levels) {
      const bank = getLevelQuestions(level.id);
      expect(new Set(bank.map(q => q.dimension)).size).toBe(4);
      expect(new Set(DIMENSIONS.map(d => bank.filter(q => q.dimension === d).length)).size).toBe(1);
      for (const d of DIMENSIONS) expect(new Set(bank.filter(q => q.dimension === d).map(q => q.direction)).size).toBe(2);
    }
  });
  it('maps all 16 types to original artwork and complete profiles', () => {
    expect(mbtiCodes).toHaveLength(16);
    for (const code of mbtiCodes) {
      expect(mbtiCards[code]).toContain(`${code}.png`);
      expect(mbtiTypes[code].cardAsset).toBe(mbtiCards[code]);
      expect(mbtiTypes[code].strengths.length).toBeGreaterThan(0);
      expect(mbtiTypes[code].relationships.length).toBeGreaterThan(20);
    }
  });
});
describe('pure scoring', () => {
  it('scores all five values in all eight directions', () => {
    for (const direction of Object.keys(OPPOSITE) as (keyof typeof OPPOSITE)[]) {
      const q = questions.find(item => item.direction === direction)!;
      for (const value of [1, 2, 3, 4, 5] as const) {
        const scores = calculateScores({ [q.id]: value }, [q]);
        expect(scores[direction]).toBe(value - 1);
        expect(scores[OPPOSITE[direction]]).toBe(5 - value);
        expect(Object.values(scores).reduce((a, b) => a + b)).toBe(4);
      }
    }
  });
  it('replaces an old answer without double counting', () => {
    const old: Answers = { [questions[0].id]: 5 };
    const changed: Answers = { ...old, [questions[0].id]: 1 };
    expect(calculateScores(old).E).toBe(4);
    expect(calculateScores(changed).E).toBe(0);
    expect(calculateScores(changed).I).toBe(4);
  });
  it('can produce all 16 MBTI results', () => {
    for (const expected of mbtiCodes) {
      const answers: Answers = Object.fromEntries(questions.map(q => [q.id, expected.includes(q.direction) ? 5 : 1]));
      expect(calculateMBTI(answers)).toBe(expected);
    }
  });
  it('uses centralized ties and handles zero totals', () => {
    expect(calculateMBTI(fill(questions, 3))).toBe('ENTJ');
    expect(calculateMBTI({}, [])).toBe('ENTJ');
    expect(calculatePercentages(calculateScores({}, [])).every(p => p.leftPercent === 50 && p.rightPercent === 50)).toBe(true);
  });
  it('calculates complementary percentages from pair totals', () => {
    const scores = { E: 10, I: 6, S: 0, N: 16, T: 8, F: 8, J: 4, P: 12 };
    expect(calculatePercentages(scores).map(p => [p.leftPercent, p.rightPercent])).toEqual([[63, 37], [0, 100], [50, 50], [25, 75]]);
  });
  it('ignores unknown questions and invalid values', () => {
    const broken = { missing: 5, [questions[0].id]: 99 } as unknown as Answers;
    expect(Object.values(calculateScores(broken)).every(v => v === 0)).toBe(true);
  });
});
describe('progression and reducer', () => {
  it('starts with only level one available and rejects locked writes', () => {
    const state = initialState();
    expect(levels.map(l => getLevelStatus(l.id, state.answers, state.highestUnlockedLevel))).toEqual(['available', 'locked', 'locked', 'locked']);
    expect(testReducer(state, { type: 'answer', questionId: getLevelQuestions(2)[0].id, value: 5 })).toBe(state);
  });
  it('requires every question, then permanently unlocks the next level', () => {
    const bank = getLevelQuestions(1);
    let state = initialState();
    for (const q of bank.slice(0, -1)) state = testReducer(state, { type: 'answer', questionId: q.id, value: 5 });
    expect(state.highestUnlockedLevel).toBe(1);
    expect(isLevelCompleted(1, state.answers)).toBe(false);
    expect(getLevelStatus(1, state.answers, 1)).toBe('in-progress');
    state = testReducer(state, { type: 'answer', questionId: bank.at(-1)!.id, value: 5 });
    expect(state.highestUnlockedLevel).toBe(2);
    expect(isLevelCompleted(1, state.answers)).toBe(true);
    state = testReducer(state, { type: 'answer', questionId: bank[0].id, value: 1 });
    expect(state.highestUnlockedLevel).toBe(2);
    expect(deriveUnlockedLevel({}, 4)).toBe(4);
  });
  it('finishes the journey and resets all state', () => {
    let state = initialState();
    for (const level of levels) for (const q of getLevelQuestions(level.id)) state = testReducer(state, { type: 'answer', questionId: q.id, value: 3 });
    expect(state.highestUnlockedLevel).toBe(4);
    expect(areAllLevelsCompleted(state.answers)).toBe(true);
    expect(testReducer(state, { type: 'reset' })).toEqual(initialState());
  });
  it('handles arbitrary, uneven and empty banks', () => {
    const bank = levels.flatMap(l => getLevelQuestions(l.id).slice(0, l.id));
    const answers = fill(bank);
    expect(areAllLevelsCompleted(answers, bank)).toBe(true);
    expect(answeredCount(answers, bank)).toBe(10);
    delete answers[bank.at(-1)!.id];
    expect(areAllLevelsCompleted(answers, bank)).toBe(false);
    expect(isLevelCompleted(1, {}, [])).toBe(false);
    expect(areAllLevelsCompleted({}, [])).toBe(false);
  });
});
describe('safe versioned persistence', () => {
  it.each([null, '{broken', '{}', 'null', '[]', '{"version":0}', '{"version":1,"answers":[],"highestUnlockedLevel":1}', '{"version":1,"answers":{},"highestUnlockedLevel":99}'])('rejects invalid storage %s', raw => {
    expect(parseSavedState(raw)).toEqual(initialState());
  });
  it('sanitizes malformed and unknown answers', () => {
    const state = parseSavedState(JSON.stringify({ version: 1, answers: { [questions[0].id]: 5, [questions[1].id]: '5', [questions[2].id]: 1.2, unknown: 2 }, highestUnlockedLevel: 1 }));
    expect(state.answers).toEqual({ [questions[0].id]: 5 });
  });
  it('retains partial answers and unlocks through serialization', () => {
    const state = { version: 1, answers: fill(questions.slice(0, 3), 4), highestUnlockedLevel: 3 };
    expect(parseSavedState(JSON.stringify(state))).toEqual(state);
  });
  it('recovers unlocks and result from complete answers', () => {
    const restored = parseSavedState(JSON.stringify({ version: 1, answers: fill(questions, 3), highestUnlockedLevel: 1 }));
    expect(restored.highestUnlockedLevel).toBe(4);
    expect(areAllLevelsCompleted(restored.answers)).toBe(true);
    expect(calculateMBTI(restored.answers)).toBe('ENTJ');
  });
  it('survives unavailable storage', () => {
    vi.stubGlobal('localStorage', { getItem: () => { throw new Error('Denied'); }, removeItem: () => { throw new Error('Denied'); } });
    expect(readState()).toEqual(initialState()); expect(persistState(initialState())).toBe(false);
  });
  it('removes only the application key on reset', () => {
    const removeItem = vi.fn(); vi.stubGlobal('localStorage', { removeItem });
    expect(persistState(initialState())).toBe(true);
    expect(removeItem).toHaveBeenCalledExactlyOnceWith(STORAGE_KEY);
  });
});
