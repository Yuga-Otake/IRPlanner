// ─────────────────────────────────────────
// Exam Types
// ─────────────────────────────────────────
export type ExamLevel = 'CIRP' | 'CIRP-S';

export type CIRPSubject =
  | 'capital-markets'
  | 'corporate-analysis'
  | 'ir-disclosure'
  | 'comprehensive';

export type CIRPSSubject =
  | 'takeover-defense'
  | 'stock-selection'
  | 'valuation'
  | 'international-disclosure'
  | 'insider-trading'
  | 'compliance'
  | 'governance';

// ─────────────────────────────────────────
// Lesson Types
// ─────────────────────────────────────────
export interface LessonSection {
  heading: string;
  body: string;
  keyPoints?: string[]; // 重要ポイント（箇条書き）
}

export interface Lesson {
  id: string;
  examLevel: ExamLevel;
  subject: CIRPSubject | CIRPSSubject;
  title: string;
  description: string;
  estimatedMinutes: number;
  passingScore: number; // 70点
  sections: LessonSection[];
  relatedQuizId: string;
  order: number;
}

// ─────────────────────────────────────────
// Quiz Types
// ─────────────────────────────────────────
export interface Choice {
  id: string; // 'a' | 'b' | 'c' | 'd'
  text: string;
}

export interface Question {
  id: string;
  text: string;
  choices: Choice[];
  correctChoiceId: string;
  explanation: string; // 詳細な解説
  difficultyLevel: 'basic' | 'intermediate' | 'advanced';
}

export interface Quiz {
  id: string;
  lessonId: string;
  examLevel: ExamLevel;
  subject: CIRPSubject | CIRPSSubject;
  title: string;
  questions: Question[]; // 15問
  passingScore: number; // 70点
}

// ─────────────────────────────────────────
// IR Plan Types
// ─────────────────────────────────────────
export interface IRTarget {
  id: string;
  audienceType: string; // 機関投資家 / 個人投資家 / アナリスト / 海外投資家
  priority: 'high' | 'medium' | 'low';
  notes: string;
}

export interface IRActivity {
  id: string;
  type: string; // 決算説明会 / 個別面談 / ロードショー etc.
  frequency: string; // 年4回 / 月次 etc.
  responsible: string; // 担当者名
  notes: string;
}

export interface IRPlan {
  id: string;
  title: string; // プランタイトル（任意）
  companyName: string;
  fiscalYear: string; // 例: 2025年3月期
  irObjective: string; // IR活動の主要目標
  targets: IRTarget[];
  activities: IRActivity[];
  kpis: string[]; // 例: ["個人株主数 +10%", "アナリストカバレッジ +2社"]
  budget: string;
  notes: string;
  createdAt: string; // ISO date string
  updatedAt: string;
}

// ─────────────────────────────────────────
// Progress Types
// ─────────────────────────────────────────
export interface LessonProgress {
  completed: boolean;
  completedAt?: string;
}

export interface QuizAttempt {
  score: number; // 0–100
  correctCount: number;
  totalCount: number;
  attemptedAt: string;
  wrongQuestionIds: string[];
  answers: Record<string, string>; // questionId -> choiceId
}

export interface AppProgress {
  lessons: Record<string, LessonProgress>; // lessonId -> progress
  quizAttempts: Record<string, QuizAttempt[]>; // quizId -> attempts (newest first)
}
