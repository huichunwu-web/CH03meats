export interface StudentProfile {
  studentId: string;
  studentName: string;
  department: string;
  classGroup: string;
}

export type ChapterCategory =
  | 'structure'     // 肉的構造與肌纖維
  | 'color_flavor'  // 色香味與多汁性
  | 'postmortem'    // 死後僵直與熟成
  | 'classification'// 禽畜肉分級與部位
  | 'culinary_prep' // 製備與嫩化技術
  | 'processed';    // 肉類加工品原理

export interface Flashcard {
  id: string;
  category: ChapterCategory;
  categoryName: string;
  front: string;
  subTitle?: string;
  back: string;
  details: string[];
  keyTakeaway: string;
  slideRef: string;
}

export interface QuizQuestion {
  id: number;
  category: ChapterCategory;
  categoryName: string;
  type: 'single' | 'boolean';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  slideRef: string;
}

export interface ScenarioStep {
  stepTitle: string;
  prompt: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    analysis: string;
  }[];
}

export interface ScenarioCase {
  id: string;
  title: string;
  tagline: string;
  difficulty: '初階' | '中階' | '進階';
  category: ChapterCategory;
  categoryName: string;
  background: string;
  symptoms: string[];
  question: string;
  steps: ScenarioStep[];
  scientificMechanism: string;
  culinarySolution: string;
  slideRef: string;
}

export interface QuizResult {
  completedAt: string;
  score: number;
  total: number;
  percentage: number;
  timeSpentSeconds: number;
  answers: {
    questionId: number;
    selectedOption: number;
    isCorrect: boolean;
  }[];
}
