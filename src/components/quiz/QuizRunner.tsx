import { useState, useCallback } from 'react';
import { QuizQuestion } from './QuizQuestion';
import { QuizResult } from './QuizResult';
import { Button } from '../ui/Button';
import { useProgress } from '../../hooks/useProgress';
import type { Quiz } from '../../types';

interface QuizRunnerProps {
  quiz: Quiz;
}

type QuizState = 'running' | 'complete';

export function QuizRunner({ quiz }: QuizRunnerProps) {
  const [state, setState] = useState<QuizState>('running');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const { recordQuizAttempt, getBestQuizScore } = useProgress();
  const previousBest = getBestQuizScore(quiz.id);

  const currentQuestion = quiz.questions[currentIndex];
  const isLast = currentIndex === quiz.questions.length - 1;

  const handleSelect = useCallback(
    (choiceId: string) => {
      if (showResult) return;
      setSelectedChoice(choiceId);
    },
    [showResult]
  );

  const handleConfirm = useCallback(() => {
    if (!selectedChoice) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: selectedChoice }));
    setShowResult(true);
  }, [selectedChoice, currentQuestion.id]);

  const handleNext = useCallback(() => {
    if (isLast) {
      // Calculate result
      const allAnswers = { ...answers, [currentQuestion.id]: selectedChoice! };
      const wrongQuestionIds: string[] = [];
      let correctCount = 0;

      quiz.questions.forEach((q) => {
        if (allAnswers[q.id] === q.correctChoiceId) {
          correctCount++;
        } else {
          wrongQuestionIds.push(q.id);
        }
      });

      const score = Math.round((correctCount / quiz.questions.length) * 100);

      recordQuizAttempt(quiz.id, {
        score,
        correctCount,
        totalCount: quiz.questions.length,
        attemptedAt: new Date().toISOString(),
        wrongQuestionIds,
        answers: allAnswers,
      });

      setState('complete');
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedChoice(null);
      setShowResult(false);
    }
  }, [isLast, answers, currentQuestion.id, selectedChoice, quiz, recordQuizAttempt]);

  const handleRetry = useCallback(() => {
    setState('running');
    setCurrentIndex(0);
    setAnswers({});
    setSelectedChoice(null);
    setShowResult(false);
  }, []);

  if (state === 'complete') {
    const allAnswers = answers;
    let correctCount = 0;
    const wrongQuestions = quiz.questions.filter((q) => {
      if (allAnswers[q.id] === q.correctChoiceId) {
        correctCount++;
        return false;
      }
      return true;
    });
    const score = Math.round((correctCount / quiz.questions.length) * 100);

    return (
      <QuizResult
        quiz={quiz}
        score={score}
        correctCount={correctCount}
        wrongQuestions={wrongQuestions}
        previousBest={previousBest}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Quiz header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">{quiz.title}</h1>
        <p className="text-sm text-gray-500 mt-1">合格基準: {quiz.passingScore}点以上</p>
      </div>

      {/* Question */}
      <QuizQuestion
        question={currentQuestion}
        questionNumber={currentIndex + 1}
        totalQuestions={quiz.questions.length}
        selectedChoiceId={selectedChoice}
        onSelect={handleSelect}
        showResult={showResult}
      />

      {/* Action buttons */}
      <div className="mt-6 flex justify-end gap-3">
        {!showResult ? (
          <Button
            variant="primary"
            disabled={!selectedChoice}
            onClick={handleConfirm}
            size="lg"
          >
            解答する
          </Button>
        ) : (
          <Button variant="primary" onClick={handleNext} size="lg">
            {isLast ? '結果を見る →' : '次の問題 →'}
          </Button>
        )}
      </div>
    </div>
  );
}
