import { questions } from '../data/questions';
import { levels } from '../data/levels';
import type { Answers, LevelId, Question } from '../types';

export const getLevelQuestions = (id: LevelId, bank: readonly Question[] = questions) => bank.filter(q => q.levelId === id);
export const isValidAnswer = (value: unknown): value is 1 | 2 | 3 | 4 | 5 => typeof value === 'number' && Number.isInteger(value) && value >= 1 && value <= 5;
export const answeredCount = (answers: Answers, bank: readonly Question[]) => bank.filter(q => isValidAnswer(answers[q.id])).length;
export function isLevelCompleted(id: LevelId, answers: Answers, bank: readonly Question[] = questions) {
  const items = getLevelQuestions(id, bank);
  return items.length > 0 && answeredCount(answers, items) === items.length;
}
export const areAllLevelsCompleted = (answers: Answers, bank: readonly Question[] = questions) => levels.every(level => isLevelCompleted(level.id, answers, bank));
export function deriveUnlockedLevel(answers: Answers, previous: LevelId, bank: readonly Question[] = questions): LevelId {
  let unlocked = previous;
  for (const level of levels) {
    if (level.id <= unlocked && isLevelCompleted(level.id, answers, bank)) {
      unlocked = Math.max(unlocked, Math.min(4, level.id + 1)) as LevelId;
    }
  }
  return unlocked;
}
export function getLevelStatus(id: LevelId, answers: Answers, highest: LevelId) {
  if (id > highest) return 'locked';
  if (isLevelCompleted(id, answers)) return 'completed';
  return answeredCount(answers, getLevelQuestions(id)) > 0 ? 'in-progress' : 'available';
}
