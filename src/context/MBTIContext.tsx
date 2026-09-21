import { createContext, useContext, useEffect, useReducer, useState, type ReactNode } from 'react';
import type { AnswerValue } from '../types';
import { questions } from '../data/questions';
import { deriveUnlockedLevel, isValidAnswer } from '../utils/progression';
import { initialState, persistState, readState, type TestState } from '../utils/storage';

export type TestAction = { type: 'answer'; questionId: string; value: AnswerValue } | { type: 'reset' };
export function testReducer(state: TestState, action: TestAction): TestState {
  if (action.type === 'reset') return initialState();
  const question = questions.find(q => q.id === action.questionId);
  if (!question || question.levelId > state.highestUnlockedLevel || !isValidAnswer(action.value)) return state;
  const answers = { ...state.answers, [question.id]: action.value };
  return { ...state, answers, highestUnlockedLevel: deriveUnlockedLevel(answers, state.highestUnlockedLevel) };
}

interface MBTIContextValue extends TestState {
  setAnswer: (questionId: string, value: AnswerValue) => void;
  resetTest: () => void;
  storageAvailable: boolean;
}
const MBTIContext = createContext<MBTIContextValue | undefined>(undefined);
export function MBTIProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(testReducer, undefined, readState);
  const [storageAvailable, setStorageAvailable] = useState(true);
  useEffect(() => { setStorageAvailable(persistState(state)); }, [state]);
  return <MBTIContext.Provider value={{ ...state, storageAvailable,
    setAnswer: (questionId, value) => dispatch({ type: 'answer', questionId, value }),
    resetTest: () => dispatch({ type: 'reset' }),
  }}>{children}</MBTIContext.Provider>;
}
export function useMBTI() {
  const value = useContext(MBTIContext);
  if (!value) throw new Error('useMBTI must be inside MBTIProvider');
  return value;
}
