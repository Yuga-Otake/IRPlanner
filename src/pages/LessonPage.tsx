import { useParams, Link } from 'react-router-dom';
import { LessonContent } from '../components/lessons/LessonContent';
import { useProgress } from '../hooks/useProgress';
import { allLessons } from '../data/lessons/index';

export function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const { getLessonProgress, markLessonComplete } = useProgress();

  const lesson = allLessons.find((l) => l.id === id);

  if (!lesson) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 mb-4">レッスンが見つかりません。</p>
        <Link to="/learn" className="text-indigo-600 hover:underline">
          学習一覧に戻る
        </Link>
      </div>
    );
  }

  const progress = getLessonProgress(lesson.id);

  return (
    <LessonContent
      lesson={lesson}
      isCompleted={progress?.completed ?? false}
      onComplete={() => markLessonComplete(lesson.id)}
    />
  );
}
