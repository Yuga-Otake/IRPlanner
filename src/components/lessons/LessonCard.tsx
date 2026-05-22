import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import type { Lesson } from '../../types';

interface LessonCardProps {
  lesson: Lesson;
  bestScore?: number;
  isCompleted?: boolean;
}

export function LessonCard({ lesson, bestScore, isCompleted }: LessonCardProps) {
  const passed = bestScore !== undefined && bestScore >= lesson.passingScore;

  return (
    <Link to={`/learn/${lesson.id}`} className="block group">
      <Card hoverable className="p-5 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={lesson.examLevel === 'CIRP' ? 'cirp' : 'cirp-s'}>
              {lesson.examLevel}
            </Badge>
            {isCompleted && <Badge variant="completed">学習済み</Badge>}
            {passed && <Badge variant="passed">✓ 合格</Badge>}
            {!isCompleted && !passed && (
              <Badge variant="not-started">未学習</Badge>
            )}
          </div>
          <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">
            約{lesson.estimatedMinutes}分
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
          {lesson.title}
        </h3>
        <p className="text-sm text-gray-600 flex-1 leading-relaxed">
          {lesson.description}
        </p>

        {/* Score */}
        {bestScore !== undefined && (
          <div className="mt-4">
            <ProgressBar
              value={bestScore}
              label={`最高スコア: ${bestScore}点`}
              showPercentage={false}
              color={passed ? 'emerald' : bestScore >= 50 ? 'amber' : 'red'}
              size="sm"
            />
          </div>
        )}

        {/* CTA */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {lesson.sections.length}セクション
          </span>
          <span className="text-indigo-600 text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            {isCompleted ? '復習する' : '学習開始'} →
          </span>
        </div>
      </Card>
    </Link>
  );
}
