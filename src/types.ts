export type LevelId = 1 | 2 | 3 | 4;
export type AnswerValue = 1 | 2 | 3 | 4 | 5;
export type MBTIDimension = 'EI' | 'SN' | 'TF' | 'JP';
export type MBTIDirection = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
export type MBTIType = `${'I' | 'E'}${'S' | 'N'}${'T' | 'F'}${'J' | 'P'}`;
export type Question = {
  id: string;
  levelId: LevelId;
  statement: string;
} & ({ dimension: 'EI'; direction: 'E' | 'I' }
  | { dimension: 'SN'; direction: 'S' | 'N' }
  | { dimension: 'TF'; direction: 'T' | 'F' }
  | { dimension: 'JP'; direction: 'J' | 'P' });
export type Answers = Partial<Record<string, AnswerValue>>;
export type Scores = Record<MBTIDirection, number>;
export type ArchetypeGroup = 'Analis' | 'Diplomat' | 'Pengawal' | 'Penjelajah';
export interface MBTIProfile {
  code: MBTIType;
  title: string;
  group: ArchetypeGroup;
  shortDescription: string;
  description: string;
  traits: string[];
  strengths: string[];
  challenges: string[];
  communication: string;
  environment: string;
  relationships: string;
  cardAsset: string;
}
