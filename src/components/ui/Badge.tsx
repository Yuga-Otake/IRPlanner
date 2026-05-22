import React from 'react';

type BadgeVariant =
  | 'passed'
  | 'completed'
  | 'in-progress'
  | 'not-started'
  | 'cirp'
  | 'cirp-s'
  | 'basic'
  | 'intermediate'
  | 'advanced';

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  passed: 'bg-emerald-100 text-emerald-800',
  completed: 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-amber-100 text-amber-800',
  'not-started': 'bg-gray-100 text-gray-600',
  cirp: 'bg-indigo-100 text-indigo-800',
  'cirp-s': 'bg-purple-100 text-purple-800',
  basic: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700',
};

export function Badge({ variant, children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
