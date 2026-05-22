import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS, generateId } from '../utils/storage';
import type { IRPlan } from '../types';

export function useIRPlans() {
  const [plans, setPlans] = useLocalStorage<IRPlan[]>(STORAGE_KEYS.IR_PLANS, []);

  const savePlan = useCallback(
    (
      planData: Omit<IRPlan, 'id' | 'createdAt' | 'updatedAt'>
    ): IRPlan => {
      const newPlan: IRPlan = {
        ...planData,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setPlans((prev) => [newPlan, ...prev]);
      return newPlan;
    },
    [setPlans]
  );

  const updatePlan = useCallback(
    (id: string, updates: Partial<Omit<IRPlan, 'id' | 'createdAt'>>) => {
      setPlans((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, ...updates, updatedAt: new Date().toISOString() }
            : p
        )
      );
    },
    [setPlans]
  );

  const deletePlan = useCallback(
    (id: string) => {
      setPlans((prev) => prev.filter((p) => p.id !== id));
    },
    [setPlans]
  );

  const getPlanById = useCallback(
    (id: string): IRPlan | undefined => {
      return plans.find((p) => p.id === id);
    },
    [plans]
  );

  return { plans, savePlan, updatePlan, deletePlan, getPlanById };
}
