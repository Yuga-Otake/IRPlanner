import { useState } from 'react';
import { LessonCard } from '../components/lessons/LessonCard';
import { useProgress } from '../hooks/useProgress';
import { allLessons } from '../data/lessons/index';
import type { ExamLevel } from '../types';

export function LearnPage() {
  const [activeLevel, setActiveLevel] = useState<ExamLevel | 'all'>('all');
  const { getLessonProgress, getBestQuizScore } = useProgress();

  const filtered =
    activeLevel === 'all'
      ? allLessons
      : allLessons.filter((l) => l.examLevel === activeLevel);

  const cirpLessons = allLessons.filter((l) => l.examLevel === 'CIRP');
  const cirpSLessons = allLessons.filter((l) => l.examLevel === 'CIRP-S');

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">学習コンテンツ</h1>
        <p className="text-gray-600">
          CIRP（4科目）とCIRP-S（7科目）の全11科目を学習しましょう。各科目70点以上で合格です。
        </p>
      </div>

      {/* Level filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(['all', 'CIRP', 'CIRP-S'] as const).map((level) => (
          <button
            key={level}
            onClick={() => setActiveLevel(level)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeLevel === level
                ? 'bg-indigo-600 text-white'
                : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {level === 'all'
              ? `すべて (${allLessons.length})`
              : level === 'CIRP'
              ? `CIRP基礎 (${cirpLessons.length}科目)`
              : `CIRP-S上級 (${cirpSLessons.length}科目)`}
          </button>
        ))}
      </div>

      {/* CIRP Section */}
      {(activeLevel === 'all' || activeLevel === 'CIRP') && (
        <div className="mb-10">
          {activeLevel === 'all' && (
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-semibold text-gray-900">CIRP（基礎）</h2>
              <span className="text-sm text-gray-500">4科目 · 年4回試験</span>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {(activeLevel === 'all' ? cirpLessons : filtered).map((lesson) => {
              const progress = getLessonProgress(lesson.id);
              const bestScore = getBestQuizScore(lesson.relatedQuizId);
              return (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  isCompleted={progress?.completed}
                  bestScore={bestScore}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* CIRP-S Section */}
      {(activeLevel === 'all' || activeLevel === 'CIRP-S') && (
        <div>
          {activeLevel === 'all' && (
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-semibold text-gray-900">CIRP-S（上級）</h2>
              <span className="text-sm text-gray-500">7科目 · 年2回試験（2日間）</span>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {(activeLevel === 'all' ? cirpSLessons : filtered).map((lesson) => {
              const progress = getLessonProgress(lesson.id);
              const bestScore = getBestQuizScore(lesson.relatedQuizId);
              return (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  isCompleted={progress?.completed}
                  bestScore={bestScore}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
