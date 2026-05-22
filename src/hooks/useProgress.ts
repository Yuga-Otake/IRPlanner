import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '../utils/storage';
import type { AppProgress, QuizAttempt } from '../types';

const initialProgress: AppProgress = {
  lessons: {},
  quizAttempts: {},
};

export function useProgress() {
  const [progress, setProgress] = useLocalStorage<AppProgress>(
    STORAGE_KEYS.PROGRESS,
    initialProgress
  );

  const markLessonComplete = useCallback(
    (lessonId: string) => {
      setProgress((prev) => ({
        ...prev,
        lessons: {
          ...prev.lessons,
          [lessonId]: {
            completed: true,
            completedAt: new Date().toISOString(),
          },
        },
      }));
    },
    [setProgress]
  );

  const recordQuizAttempt = useCallback(
    (quizId: string, attempt: QuizAttempt) => {
      setProgress((prev) => {
        const existing = prev.quizAttempts[quizId] ?? [];
        return {
          ...prev,
          quizAttempts: {
            ...prev.quizAttempts,
            [quizId]: [attempt, ...existing].slice(0, 10), // 最新10回分
          },
        };
      });
    },
    [setProgress]
  );

  const getLessonProgress = useCallback(
    (lessonId: string) => {
      return progress.lessons[lessonId];
    },
    [progress.lessons]
  );

  const getBestQuizScore = useCallback(
    (quizId: string): number | undefined => {
      const attempts = progress.quizAttempts[quizId];
      if (!attempts || attempts.length === 0) return undefined;
      return Math.max(...attempts.map((a) => a.score));
    },
    [progress.quizAttempts]
  );

  const getLatestQuizAttempt = useCallback(
    (quizId: string): QuizAttempt | undefined => {
      const attempts = progress.quizAttempts[quizId];
      return attempts?.[0];
    },
    [progress.quizAttempts]
  );

  const getOverallStats = useCallback(
    (totalLessons: number) => {
      const completedLessons = Object.values(progress.lessons).filter(
        (l) => l.completed
      ).length;

      const allAttempts = Object.values(progress.quizAttempts).flat();
      const averageScore =
        allAttempts.length > 0
          ? Math.round(
              allAttempts.reduce((sum, a) => sum + a.score, 0) /
                allAttempts.length
            )
          : 0;

      const passedQuizzes = Object.entries(progress.quizAttempts).filter(
        ([, attempts]) => attempts.some((a) => a.score >= 70)
      ).length;

      return { completedLessons, totalLessons, averageScore, passedQuizzes };
    },
    [progress]
  );

  const getWrongQuestions = useCallback(
    (quizId: string): string[] => {
      const latest = progress.quizAttempts[quizId]?.[0];
      return latest?.wrongQuestionIds ?? [];
    },
    [progress.quizAttempts]
  );

  return {
    progress,
    markLessonComplete,
    recordQuizAttempt,
    getLessonProgress,
    getBestQuizScore,
    getLatestQuizAttempt,
    getOverallStats,
    getWrongQuestions,
  };
}
