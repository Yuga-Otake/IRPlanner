import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useProgress } from '../hooks/useProgress';
import { useIRPlans } from '../hooks/useIRPlans';
import { allLessons } from '../data/lessons/index';
import { allQuizzes } from '../data/quizzes/index';

export function HomePage() {
  const { getLessonProgress, getBestQuizScore } = useProgress();
  const { plans } = useIRPlans();

  const totalLessons = allLessons.length;
  const completedLessons = allLessons.filter(
    (l) => getLessonProgress(l.id)?.completed
  ).length;

  const passedQuizzes = allQuizzes.filter((q) => {
    const best = getBestQuizScore(q.id);
    return best !== undefined && best >= q.passingScore;
  }).length;

  const overallProgress = Math.round(
    ((completedLessons / totalLessons) * 0.4 + (passedQuizzes / allQuizzes.length) * 0.6) * 100
  );

  // Next recommended lesson
  const nextLesson = allLessons.find((l) => !getLessonProgress(l.id)?.completed);
  const nextQuiz = allQuizzes.find((q) => {
    const best = getBestQuizScore(q.id);
    return best === undefined || best < q.passingScore;
  });

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-900 to-indigo-700 rounded-2xl p-8 text-white mb-8">
        <div className="max-w-2xl">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">
            🎯 CIRP・CIRP-S 合格を目指そう！
          </h1>
          <p className="text-indigo-200 mb-6">
            日本IRプランナーズ協会の認定資格。全11科目をマスターして、IR専門家としてのキャリアを築きましょう。
          </p>

          {/* Overall progress */}
          <div className="bg-white/10 rounded-xl p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">総合進捗</span>
              <span className="text-lg font-bold">{overallProgress}%</span>
            </div>
            <ProgressBar value={overallProgress} color="emerald" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{completedLessons}</div>
              <div className="text-xs text-indigo-300">学習済み / {totalLessons}科目</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{passedQuizzes}</div>
              <div className="text-xs text-indigo-300">合格 / {allQuizzes.length}科目</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{plans.length}</div>
              <div className="text-xs text-indigo-300">IRプラン作成数</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {nextLesson && (
          <Card className="p-5">
            <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wide mb-2">
              📚 次に学ぶ科目
            </p>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant={nextLesson.examLevel === 'CIRP' ? 'cirp' : 'cirp-s'}>
                {nextLesson.examLevel}
              </Badge>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{nextLesson.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{nextLesson.description}</p>
            <Link to={`/learn/${nextLesson.id}`}>
              <Button variant="primary" size="sm">学習を開始する →</Button>
            </Link>
          </Card>
        )}

        {nextQuiz && (
          <Card className="p-5">
            <p className="text-xs text-amber-600 font-semibold uppercase tracking-wide mb-2">
              ✏️ クイズに挑戦
            </p>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant={nextQuiz.examLevel === 'CIRP' ? 'cirp' : 'cirp-s'}>
                {nextQuiz.examLevel}
              </Badge>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{nextQuiz.title}</h3>
            <p className="text-sm text-gray-500 mb-4">
              {nextQuiz.questions.length}問 · 合格基準{nextQuiz.passingScore}点
            </p>
            <Link to={`/quiz/${nextQuiz.id}`}>
              <Button variant="secondary" size="sm">クイズを開始する →</Button>
            </Link>
          </Card>
        )}
      </div>

      {/* Feature Cards */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">機能一覧</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            to: '/learn',
            icon: '📚',
            title: '学習コンテンツ',
            desc: '11科目の詳細な学習資料',
            color: 'indigo',
          },
          {
            to: '/quiz',
            icon: '✏️',
            title: 'クイズ',
            desc: '165問の練習問題',
            color: 'amber',
          },
          {
            to: '/irplan',
            icon: '📋',
            title: 'IRプラン',
            desc: '実践的なIR計画を作成',
            color: 'purple',
          },
          {
            to: '/progress',
            icon: '📊',
            title: '進捗管理',
            desc: '科目別合格状況を追跡',
            color: 'emerald',
          },
        ].map((item) => (
          <Link key={item.to} to={item.to}>
            <Card hoverable className="p-5 text-center">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Exam Info */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">📋 試験概要</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-indigo-700 mb-3">CIRP（基礎）</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2"><span className="text-indigo-500">▸</span>4科目：資本市場、企業分析、情報開示とIR活動、総合問題</li>
              <li className="flex items-start gap-2"><span className="text-indigo-500">▸</span>各科目100点満点・70点以上で合格</li>
              <li className="flex items-start gap-2"><span className="text-indigo-500">▸</span>年4回実施（科目ごとに受験可能）</li>
              <li className="flex items-start gap-2"><span className="text-indigo-500">▸</span>受験料：8,640円（4科目）</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-purple-700 mb-3">CIRP-S（上級）</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2"><span className="text-purple-500">▸</span>7科目：買収防衛、銘柄選択、企業価値算定、国際開示、インサイダー規制、コンプライアンス、ガバナンス</li>
              <li className="flex items-start gap-2"><span className="text-purple-500">▸</span>各科目70点以上で合格</li>
              <li className="flex items-start gap-2"><span className="text-purple-500">▸</span>年2回実施（2日間）</li>
              <li className="flex items-start gap-2"><span className="text-purple-500">▸</span>1科目45分の試験</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
