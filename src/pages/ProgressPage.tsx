import { Link } from 'react-router-dom';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Card } from '../components/ui/Card';
import { useProgress } from '../hooks/useProgress';
import { allLessons } from '../data/lessons/index';
import { allQuizzes } from '../data/quizzes/index';

export function ProgressPage() {
  const { progress, getLessonProgress, getBestQuizScore } = useProgress();

  const stats = (() => {
    const totalLessons = allLessons.length;
    const completedLessons = allLessons.filter(
      (l) => getLessonProgress(l.id)?.completed
    ).length;

    const quizAttempts = Object.values(progress.quizAttempts).flat();
    const avgScore =
      quizAttempts.length > 0
        ? Math.round(
            quizAttempts.reduce((s, a) => s + a.score, 0) / quizAttempts.length
          )
        : 0;

    const passedQuizzes = allQuizzes.filter((q) => {
      const best = getBestQuizScore(q.id);
      return best !== undefined && best >= q.passingScore;
    }).length;

    return { totalLessons, completedLessons, avgScore, passedQuizzes };
  })();

  const cirpLessons = allLessons.filter((l) => l.examLevel === 'CIRP');
  const cirpSLessons = allLessons.filter((l) => l.examLevel === 'CIRP-S');
  const cirpQuizzes = allQuizzes.filter((q) => q.examLevel === 'CIRP');
  const cirpSQuizzes = allQuizzes.filter((q) => q.examLevel === 'CIRP-S');

  const cirpPassed = cirpQuizzes.filter((q) => {
    const best = getBestQuizScore(q.id);
    return best !== undefined && best >= q.passingScore;
  }).length;

  const cirpSPassed = cirpSQuizzes.filter((q) => {
    const best = getBestQuizScore(q.id);
    return best !== undefined && best >= q.passingScore;
  }).length;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">学習進捗</h1>
        <p className="text-gray-600">
          CIRP・CIRP-S合格に向けた進捗状況を確認しましょう。
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-indigo-600">{stats.completedLessons}</div>
          <div className="text-sm text-gray-500 mt-1">学習済み科目</div>
          <div className="text-xs text-gray-400">/ {stats.totalLessons}科目</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-emerald-600">{stats.passedQuizzes}</div>
          <div className="text-sm text-gray-500 mt-1">合格科目</div>
          <div className="text-xs text-gray-400">/ {allQuizzes.length}科目</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-amber-600">{stats.avgScore}</div>
          <div className="text-sm text-gray-500 mt-1">平均スコア</div>
          <div className="text-xs text-gray-400">合格基準: 70点</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-purple-600">
            {Math.round((stats.passedQuizzes / allQuizzes.length) * 100)}%
          </div>
          <div className="text-sm text-gray-500 mt-1">合格率</div>
          <div className="text-xs text-gray-400">全{allQuizzes.length}科目中</div>
        </Card>
      </div>

      {/* CIRP Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">CIRP（基礎）</h2>
          <span className={`text-sm font-medium ${cirpPassed === cirpQuizzes.length ? 'text-emerald-600' : 'text-gray-500'}`}>
            {cirpPassed === cirpQuizzes.length ? '🎉 全科目合格！' : `${cirpPassed} / ${cirpQuizzes.length}科目合格`}
          </span>
        </div>
        <ProgressBar
          value={(cirpPassed / cirpQuizzes.length) * 100}
          color={cirpPassed === cirpQuizzes.length ? 'emerald' : 'indigo'}
          showPercentage
          size="lg"
        />
        <div className="mt-4 space-y-3">
          {cirpLessons.map((lesson) => {
            const lessonProgress = getLessonProgress(lesson.id);
            const bestScore = getBestQuizScore(lesson.relatedQuizId);
            const passed = bestScore !== undefined && bestScore >= lesson.passingScore;

            return (
              <div key={lesson.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      passed
                        ? 'bg-emerald-100 text-emerald-700'
                        : lessonProgress?.completed
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {passed ? '✓' : lessonProgress?.completed ? '📖' : '○'}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{lesson.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {lessonProgress?.completed && <Badge variant="completed">学習済み</Badge>}
                        {passed && <Badge variant="passed">合格 {bestScore}点</Badge>}
                        {!lessonProgress?.completed && <Badge variant="not-started">未学習</Badge>}
                        {!passed && bestScore !== undefined && (
                          <Badge variant="in-progress">最高{bestScore}点</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Link to={`/learn/${lesson.id}`} className="text-xs text-indigo-600 hover:underline">
                      学ぶ
                    </Link>
                    <Link to={`/quiz/${lesson.relatedQuizId}`} className="text-xs text-amber-600 hover:underline">
                      クイズ
                    </Link>
                  </div>
                </div>
                {bestScore !== undefined && (
                  <div className="mt-3">
                    <ProgressBar
                      value={bestScore}
                      color={passed ? 'emerald' : bestScore >= 50 ? 'amber' : 'red'}
                      size="sm"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CIRP-S Progress */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">CIRP-S（上級）</h2>
          <span className={`text-sm font-medium ${cirpSPassed === cirpSQuizzes.length ? 'text-emerald-600' : 'text-gray-500'}`}>
            {cirpSPassed === cirpSQuizzes.length ? '🎉 全科目合格！' : `${cirpSPassed} / ${cirpSQuizzes.length}科目合格`}
          </span>
        </div>
        <ProgressBar
          value={(cirpSPassed / cirpSQuizzes.length) * 100}
          color={cirpSPassed === cirpSQuizzes.length ? 'emerald' : 'purple'}
          showPercentage
          size="lg"
        />
        <div className="mt-4 space-y-3">
          {cirpSLessons.map((lesson) => {
            const lessonProgress = getLessonProgress(lesson.id);
            const bestScore = getBestQuizScore(lesson.relatedQuizId);
            const passed = bestScore !== undefined && bestScore >= lesson.passingScore;

            return (
              <div key={lesson.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      passed
                        ? 'bg-emerald-100 text-emerald-700'
                        : lessonProgress?.completed
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {passed ? '✓' : lessonProgress?.completed ? '📖' : '○'}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{lesson.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {lessonProgress?.completed && <Badge variant="completed">学習済み</Badge>}
                        {passed && <Badge variant="passed">合格 {bestScore}点</Badge>}
                        {!lessonProgress?.completed && <Badge variant="not-started">未学習</Badge>}
                        {!passed && bestScore !== undefined && (
                          <Badge variant="in-progress">最高{bestScore}点</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Link to={`/learn/${lesson.id}`} className="text-xs text-indigo-600 hover:underline">
                      学ぶ
                    </Link>
                    <Link to={`/quiz/${lesson.relatedQuizId}`} className="text-xs text-amber-600 hover:underline">
                      クイズ
                    </Link>
                  </div>
                </div>
                {bestScore !== undefined && (
                  <div className="mt-3">
                    <ProgressBar
                      value={bestScore}
                      color={passed ? 'emerald' : bestScore >= 50 ? 'amber' : 'red'}
                      size="sm"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
