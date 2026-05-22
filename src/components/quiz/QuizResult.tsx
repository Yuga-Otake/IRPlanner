import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import type { Quiz, Question } from '../../types';

interface QuizResultProps {
  quiz: Quiz;
  score: number;
  correctCount: number;
  wrongQuestions: Question[];
  previousBest?: number;
  onRetry: () => void;
}

export function QuizResult({
  quiz,
  score,
  correctCount,
  wrongQuestions,
  previousBest,
  onRetry,
}: QuizResultProps) {
  const passed = score >= quiz.passingScore;
  const totalQuestions = quiz.questions.length;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Score Header */}
      <div
        className={`rounded-2xl p-8 text-center mb-6 ${
          passed
            ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white'
            : 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white'
        }`}
      >
        <div className="text-6xl font-bold mb-2">{score}<span className="text-3xl">点</span></div>
        <div className="text-xl font-semibold mb-1">
          {passed ? '🎉 合格おめでとうございます！' : 'もう少し！再挑戦しましょう'}
        </div>
        <div className="text-sm opacity-80">
          {correctCount} / {totalQuestions} 問正解 • 合格基準: {quiz.passingScore}点以上
        </div>
        {previousBest !== undefined && previousBest < score && (
          <div className="mt-2 text-sm bg-white/20 rounded-full px-3 py-1 inline-block">
            🏆 自己ベスト更新！（前回: {previousBest}点）
          </div>
        )}
      </div>

      {/* Score breakdown */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">スコア詳細</h3>
        <div className="space-y-3">
          <ProgressBar
            value={score}
            label={`取得スコア: ${score}点`}
            showPercentage={false}
            color={passed ? 'emerald' : score >= 50 ? 'amber' : 'red'}
          />
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center bg-emerald-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-emerald-600">{correctCount}</div>
              <div className="text-xs text-gray-500 mt-1">正解</div>
            </div>
            <div className="text-center bg-red-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-red-500">{totalQuestions - correctCount}</div>
              <div className="text-xs text-gray-500 mt-1">不正解</div>
            </div>
            <div className="text-center bg-indigo-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-indigo-600">{score}</div>
              <div className="text-xs text-gray-500 mt-1">点数</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wrong questions review */}
      {wrongQuestions.length > 0 && (
        <div className="bg-white rounded-xl border border-red-200 p-6 shadow-sm mb-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-red-500">📝</span>
            間違えた問題 ({wrongQuestions.length}問)
          </h3>
          <div className="space-y-4">
            {wrongQuestions.map((q, idx) => (
              <div key={q.id} className="bg-red-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-800 mb-2">
                  <span className="text-red-600 font-bold mr-2">Q{idx + 1}.</span>
                  {q.text}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-emerald-700">正解: </span>
                  {q.choices.find((c) => c.id === q.correctChoiceId)?.text}
                </p>
                <p className="text-xs text-gray-500 mt-2 bg-white rounded p-2">
                  💡 {q.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="secondary" onClick={onRetry} fullWidth>
          🔄 もう一度挑戦
        </Button>
        <Link to={`/learn/${quiz.lessonId}`} className="flex-1">
          <Button variant="ghost" fullWidth>
            📚 レッスンに戻る
          </Button>
        </Link>
        <Link to="/quiz" className="flex-1">
          <Button variant="primary" fullWidth>
            他のクイズへ →
          </Button>
        </Link>
      </div>
    </div>
  );
}
