import type { Question } from '../../types';

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedChoiceId: string | null;
  onSelect: (choiceId: string) => void;
  showResult: boolean;
}

export function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  selectedChoiceId,
  onSelect,
  showResult,
}: QuizQuestionProps) {
  const isCorrect = selectedChoiceId === question.correctChoiceId;

  return (
    <div>
      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500">
          問題 {questionNumber} / {totalQuestions}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: totalQuestions }, (_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-colors ${
                i < questionNumber - 1
                  ? 'bg-indigo-400 w-4'
                  : i === questionNumber - 1
                  ? 'bg-indigo-600 w-6'
                  : 'bg-gray-200 w-4'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4 shadow-sm">
        <p className="text-gray-900 text-base leading-relaxed font-medium">
          {question.text}
        </p>
      </div>

      {/* Choices */}
      <div className="space-y-3">
        {question.choices.map((choice) => {
          const isSelected = selectedChoiceId === choice.id;
          const isRight = choice.id === question.correctChoiceId;

          let choiceClass =
            'w-full text-left px-5 py-4 rounded-xl border-2 transition-all text-sm leading-relaxed font-medium';

          if (!showResult) {
            choiceClass += isSelected
              ? ' border-indigo-500 bg-indigo-50 text-indigo-900'
              : ' border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:bg-indigo-50/50';
          } else {
            if (isRight) {
              choiceClass += ' border-emerald-500 bg-emerald-50 text-emerald-900';
            } else if (isSelected && !isRight) {
              choiceClass += ' border-red-400 bg-red-50 text-red-900';
            } else {
              choiceClass += ' border-gray-200 bg-white text-gray-500';
            }
          }

          return (
            <button
              key={choice.id}
              disabled={showResult}
              onClick={() => onSelect(choice.id)}
              className={choiceClass}
            >
              <span className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold mt-0.5"
                  style={{
                    borderColor: showResult
                      ? isRight
                        ? '#10b981'
                        : isSelected
                        ? '#f87171'
                        : '#d1d5db'
                      : isSelected
                      ? '#6366f1'
                      : '#d1d5db',
                    color: showResult
                      ? isRight
                        ? '#10b981'
                        : isSelected
                        ? '#f87171'
                        : '#9ca3af'
                      : isSelected
                      ? '#6366f1'
                      : '#9ca3af',
                  }}
                >
                  {showResult && isRight
                    ? '✓'
                    : showResult && isSelected && !isRight
                    ? '✗'
                    : choice.id.toUpperCase()}
                </span>
                <span>{choice.text}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showResult && (
        <div
          className={`mt-4 p-4 rounded-xl border ${
            isCorrect
              ? 'bg-emerald-50 border-emerald-200'
              : 'bg-red-50 border-red-200'
          }`}
        >
          <p className={`text-sm font-semibold mb-1 ${isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
            {isCorrect ? '✓ 正解！' : '✗ 不正解'}
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
