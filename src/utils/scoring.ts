import { questions } from '../data/questions';
import type { Answers, MBTIDimension, MBTIDirection, MBTIType, Question, Scores } from '../types';

export const DIMENSIONS = ['EI', 'SN', 'TF', 'JP'] as const;
export const PAIRS: Record<MBTIDimension, readonly [MBTIDirection, MBTIDirection]> = {
  EI: ['E', 'I'], SN: ['S', 'N'], TF: ['T', 'F'], JP: ['J', 'P'],
};
export const OPPOSITE: Record<MBTIDirection, MBTIDirection> = { E: 'I', I: 'E', S: 'N', N: 'S', T: 'F', F: 'T', J: 'P', P: 'J' };
export const TIE_BREAK = { EI: 'E', SN: 'N', TF: 'T', JP: 'J' } as const;

export function calculateScores(answers: Answers, bank: readonly Question[] = questions): Scores {
  const scores: Scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  for (const question of bank) {
    const value = answers[question.id];
    if (value === undefined || !Number.isInteger(value) || value < 1 || value > 5) continue;
    scores[question.direction] += value - 1;
    scores[OPPOSITE[question.direction]] += 5 - value;
  }
  return scores;
}

export function calculatePercentages(scores: Scores) {
  return DIMENSIONS.map(dimension => {
    const [left, right] = PAIRS[dimension];
    const total = scores[left] + scores[right];
    const leftPercent = total === 0 ? 50 : Math.round(scores[left] / total * 100);
    return { dimension, left, right, leftPercent, rightPercent: 100 - leftPercent, tied: scores[left] === scores[right] };
  });
}

export function calculateMBTI(answers: Answers, bank: readonly Question[] = questions): MBTIType {
  const scores = calculateScores(answers, bank);
  return DIMENSIONS.map(dimension => {
    const [left, right] = PAIRS[dimension];
    return scores[left] === scores[right] ? TIE_BREAK[dimension] : scores[left] > scores[right] ? left : right;
  }).join('') as MBTIType;
}
