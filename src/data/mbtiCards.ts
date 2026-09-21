import type { AnswerValue, MBTIType } from '../types';

const artwork = import.meta.glob<string>('../assets/cards/mbti/*.png', { eager: true, query: '?url', import: 'default' });
export const mbtiCodes = ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESFP', 'ESTP'] as const satisfies readonly MBTIType[];
export const mbtiCards = Object.fromEntries(mbtiCodes.map(code => [code, artwork[`../assets/cards/mbti/${code}.png`]])) as Record<MBTIType, string>;
const answers = import.meta.glob<string>('../assets/cards/answers/*.png', { eager: true, query: '?url', import: 'default' });
export const answerCardAsset = (value: AnswerValue, selected: boolean) => answers[`../assets/cards/answers/${selected ? 'light' : 'dark'}-${value}.png`];
export const isMBTIType = (value: string | undefined): value is MBTIType => mbtiCodes.some(code => code === value);
