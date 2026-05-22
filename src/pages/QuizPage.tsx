import { useParams, Link } from 'react-router-dom';
import { QuizRunner } from '../components/quiz/QuizRunner';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useProgress } from '../hooks/useProgress';
import { allQuizzes } from '../data/quizzes/index';

export function QuizPage() {
  const { id } = useParams<{ id?: string }>();
  const { getBestQuizScore } = useProgress();

  // Active quiz
  if (id) {
    const quiz = allQuizzes.find((q) => q.id === id);
    if (!quiz) {
      return (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">クイズが見つかりません。</p>
          <Link to="/quiz" className="text-indigo-600 hover:underline">
            クイズ一覧に戻る
          </Link>
        </div>
      );
    }
    return <QuizRunner quiz={quiz} />;
  }

  // Quiz list
  const cirpQuizzes = allQuizzes.filter((q) => q.examLevel === 'CIRP');
  const cirpSQuizzes = allQuizzes.filter((q) => q.examLevel === 'CIRP-S');

  const QuizItem = ({ quiz }: { quiz: typeof allQuizzes[0] }) => {
    const bestScore = getBestQuizScore(quiz.id);
    const passed = bestScore !== undefined && bestScore >= quiz.passingScore;

    return (
      <Link to={`/quiz/${quiz.id}`}>
        <Card hoverable className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge variant={quiz.examLevel === 'CIRP' ? 'cirp' : 'cirp-s'}>
                  {quiz.examLevel}
                </Badge>
                {passed && <Badge variant="passed">✓ 合格</Badge>}
                {bestScore !== undefined && !passed && (
                  <Badge variant="in-progress">挑戦中</Badge>
                )}
              </div>
              <h3 className="font-medium text-gray-900 text-sm">{quiz.title}</h3>
              <p className="text-xs text-gray-500 mt-1">
                {quiz.questions.length}問 · 合格基準{quiz.passingScore}点
              </p>
            </div>
            <div className="text-right shrink-0">
              {bestScore !== undefined ? (
                <div>
                  <div className={`text-2xl font-bold ${passed ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {bestScore}<span className="text-sm font-normal">点</span>
                  </div>
                  <div className="text-xs text-gray-400">最高スコア</div>
                </div>
              ) : (
                <div className="text-sm text-gray-400">未受験</div>
              )}
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
        </Card>
      </Link>
    );
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">クイズ</h1>
        <p className="text-gray-600">
          各科目のクイズに挑戦して、CIRP・CIRP-S試験の合格を目指しましょう。合格基準は70点以上です。
        </p>
      </div>

      {/* CIRP */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          CIRP（基礎）― {cirpQuizzes.length}科目
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cirpQuizzes.map((quiz) => (
            <QuizItem key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>

      {/* CIRP-S */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          CIRP-S（上級）― {cirpSQuizzes.length}科目
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cirpSQuizzes.map((quiz) => (
            <QuizItem key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>
    </div>
  );
}
