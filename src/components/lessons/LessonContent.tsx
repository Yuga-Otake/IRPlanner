import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import type { Lesson } from '../../types';

interface LessonContentProps {
  lesson: Lesson;
  isCompleted: boolean;
  onComplete: () => void;
}

export function LessonContent({ lesson, isCompleted, onComplete }: LessonContentProps) {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <Badge variant={lesson.examLevel === 'CIRP' ? 'cirp' : 'cirp-s'}>
            {lesson.examLevel}
          </Badge>
          {isCompleted && <Badge variant="completed">学習済み ✓</Badge>}
          <span className="text-sm text-gray-500">約{lesson.estimatedMinutes}分</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          {lesson.title}
        </h1>
        <p className="text-gray-600 text-base">{lesson.description}</p>
      </div>

      {/* Content Sections */}
      <div className="space-y-8">
        {lesson.sections.map((section, idx) => (
          <section key={idx} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold shrink-0">
                {idx + 1}
              </span>
              {section.heading}
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{section.body}</p>

            {/* Key Points */}
            {section.keyPoints && section.keyPoints.length > 0 && (
              <div className="mt-4 bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-2">
                  📌 重要ポイント
                </p>
                <ul className="space-y-1.5">
                  {section.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-indigo-900">
                      <span className="text-indigo-500 mt-0.5 shrink-0">▸</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Action Footer */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-medium text-gray-900">学習が完了しましたか？</p>
            <p className="text-sm text-gray-500 mt-1">
              次はクイズで理解度を確認しましょう。合格基準は{lesson.passingScore}点以上です。
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {!isCompleted && (
              <Button variant="secondary" onClick={onComplete}>
                ✓ 完了にする
              </Button>
            )}
            {isCompleted && (
              <span className="text-emerald-600 font-medium text-sm">✓ 学習済み</span>
            )}
            <Link to={`/quiz/${lesson.relatedQuizId}`}>
              <Button variant="primary">クイズに挑戦 →</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-4 text-center">
        <Link to="/learn" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
          ← 学習一覧に戻る
        </Link>
      </div>
    </div>
  );
}
