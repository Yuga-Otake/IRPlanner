import { cirpLessons } from './cirp/index';
import { cirpSLessons } from './cirp-s/index';
import type { Lesson } from '../../types';

export const allLessons: Lesson[] = [
  ...cirpLessons,
  ...cirpSLessons,
].sort((a, b) => a.order - b.order);

export { cirpLessons, cirpSLessons };
