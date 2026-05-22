import type { Lesson } from '../../../types';
import { takeoverDefenseLesson } from './takeover-defense';
import { stockSelectionLesson } from './stock-selection';
import { valuationLesson } from './valuation';

// Placeholder lessons for subjects not yet loaded
const placeholder = (
  id: string,
  subject: string,
  title: string,
  order: number
): Lesson => ({
  id,
  examLevel: 'CIRP-S',
  subject: subject as any,
  title,
  description: 'コンテンツ準備中です。',
  estimatedMinutes: 25,
  passingScore: 70,
  order,
  relatedQuizId: `quiz-${id}`,
  sections: [
    {
      heading: 'このレッスンについて',
      body: 'コンテンツは準備中です。近日公開予定です。',
      keyPoints: ['準備中'],
    },
  ],
});

export { takeoverDefenseLesson } from './takeover-defense';
export { stockSelectionLesson } from './stock-selection';
export { valuationLesson } from './valuation';

export const internationalDisclosureLesson = placeholder(
  'international-disclosure',
  'international-disclosure',
  '資本市場の国際化と企業ディスクロージャー',
  8
);
export const insiderTradingLesson = placeholder(
  'insider-trading',
  'insider-trading',
  '情報開示制度とインサイダー取引規制',
  9
);
export const complianceLesson = placeholder(
  'compliance',
  'compliance',
  'コンプライアンス',
  10
);
export const governanceLesson = placeholder(
  'governance',
  'governance',
  'コーポレートガバナンス',
  11
);

export const cirpSLessons: Lesson[] = [
  takeoverDefenseLesson,
  stockSelectionLesson,
  valuationLesson,
  internationalDisclosureLesson,
  insiderTradingLesson,
  complianceLesson,
  governanceLesson,
];
