import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import type { IRPlan } from '../../types';

interface IRPlanCardProps {
  plan: IRPlan;
  onEdit: (plan: IRPlan) => void;
  onDelete: (id: string) => void;
}

const priorityLabels = { high: '高', medium: '中', low: '低' };

export function IRPlanCard({ plan, onEdit, onDelete }: IRPlanCardProps) {
  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-base">{plan.title || plan.companyName}</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {plan.companyName} · {plan.fiscalYear}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="secondary" size="sm" onClick={() => onEdit(plan)}>
            編集
          </Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(plan.id)}>
            削除
          </Button>
        </div>
      </div>

      {plan.irObjective && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{plan.irObjective}</p>
      )}

      <div className="flex flex-wrap gap-2 mb-3">
        {plan.targets.slice(0, 3).map((t) => (
          <span
            key={t.id}
            className="text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-700"
          >
            {t.audienceType} ({priorityLabels[t.priority]})
          </span>
        ))}
        {plan.targets.length > 3 && (
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500">
            +{plan.targets.length - 3}件
          </span>
        )}
      </div>

      {plan.kpis.length > 0 && (
        <div className="mb-3">
          <p className="text-xs text-gray-500 font-medium mb-1">KPI:</p>
          <div className="flex flex-wrap gap-1.5">
            {plan.kpis.slice(0, 3).map((kpi, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded bg-amber-50 text-amber-700">
                {kpi}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="text-xs text-gray-400 border-t border-gray-100 pt-3 mt-3">
        作成: {formatDate(plan.createdAt)} · 更新: {formatDate(plan.updatedAt)}
      </div>
    </Card>
  );
}
