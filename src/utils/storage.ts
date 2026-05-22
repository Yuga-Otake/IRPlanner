export const STORAGE_KEYS = {
  PROGRESS: 'irplanner_progress',
  IR_PLANS: 'irplanner_plans',
} as const;

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
