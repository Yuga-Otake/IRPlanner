import { cirpQuizzes } from './cirp/index';
import { cirpSQuizzes } from './cirp-s/index';
import type { Quiz } from '../../types';

export const allQuizzes: Quiz[] = [
  ...cirpQuizzes,
  ...cirpSQuizzes,
];

export { cirpQuizzes, cirpSQuizzes };
