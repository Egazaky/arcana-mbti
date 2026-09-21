import { questions } from '../data/questions';
import type { Answers, LevelId } from '../types';
import { deriveUnlockedLevel, isValidAnswer } from './progression';

export const STORAGE_KEY = 'arcana-mbti:progress';
export interface TestState { version: 1; answers: Answers; highestUnlockedLevel: LevelId }
export const initialState = (): TestState => ({ version: 1, answers: {}, highestUnlockedLevel: 1 });

export function parseSavedState(raw: string | null): TestState {
  if (!raw) return initialState();
  try {
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== 'object' || !('version' in data) || data.version !== 1
      || !('answers' in data) || !data.answers || typeof data.answers !== 'object' || Array.isArray(data.answers)
      || !('highestUnlockedLevel' in data) || ![1, 2, 3, 4].includes(data.highestUnlockedLevel as number)) return initialState();
    const saved = data.answers as Record<string, unknown>;
    const answers: Answers = {};
    for (const q of questions) { const value = saved[q.id]; if (isValidAnswer(value)) answers[q.id] = value; }
    return { version: 1, answers, highestUnlockedLevel: deriveUnlockedLevel(answers, data.highestUnlockedLevel as LevelId) };
  } catch { return initialState(); }
}

export function readState(): TestState {
  try { return parseSavedState(localStorage.getItem(STORAGE_KEY)); }
  catch { return initialState(); }
}
export function persistState(state: TestState): boolean {
  try {
    // Keep a reset truly empty: remove our key without touching other applications.
    if (Object.keys(state.answers).length === 0 && state.highestUnlockedLevel === 1) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch { return false; }
}
