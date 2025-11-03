
export enum Mood {
  Happy = '絶好調',
  Okay = 'ふつう',
  Sad = '不調',
}

export enum Condition {
  Good = '良い',
  Normal = '普通',
  Bad = '悪い',
}

export interface HealthLog {
  id: string;
  date: string;
  temperature: number;
  mood: Mood;
  condition: Condition;
  symptoms: string;
}
