import { useState } from 'react';
import { IRPlanCard } from '../components/irplan/IRPlanCard';
import { IRPlanForm } from '../components/irplan/IRPlanForm';
import { Button } from '../components/ui/Button';
import { ConfirmModal } from '../components/ui/Modal';
import { useIRPlans } from '../hooks/useIRPlans';
import type { IRPlan } from '../types';

type ViewMode = 'list' | 'create' | 'edit';

export function IRPlanPage() {
  const { plans, savePlan, updatePlan, deletePlan } = useIRPlans();
  const [mode, setMode] = useState<ViewMode>('list');
  const [editingPlan, setEditingPlan] = useState<IRPlan | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleCreate = (data: Parameters<typeof savePlan>[0]) => {
    savePlan(data);
    setMode('list');
  };

  const handleUpdate = (data: Parameters<typeof savePlan>[0]) => {
    if (editingPlan) {
      updatePlan(editingPlan.id, data);
      setEditingPlan(null);
      setMode('list');
    }
  };

  const handleEdit = (plan: IRPlan) => {
    setEditingPlan(plan);
    setMode('edit');
  };

  const handleDelete = () => {
    if (deleteId) {
      deletePlan(deleteId);
      setDeleteId(null);
    }
  };

  if (mode === 'create') {
    return (
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">IRプランの新規作成</h1>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <IRPlanForm onSave={handleCreate} onCancel={() => setMode('list')} />
        </div>
      </div>
    );
  }

  if (mode === 'edit' && editingPlan) {
    return (
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">IRプランの編集</h1>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <IRPlanForm
            initial={editingPlan}
            onSave={handleUpdate}
            onCancel={() => {
              setEditingPlan(null);
              setMode('list');
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">IRプラン管理</h1>
          <p className="text-gray-600">
            実際のIR活動計画を作成・管理できます。学習した内容を実践的なプランに落とし込みましょう。
          </p>
        </div>
        <Button variant="primary" onClick={() => setMode('create')}>
          ＋ 新規作成
        </Button>
      </div>

      {/* Guide for empty state */}
      {plans.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="text-5xl mb-4">📋</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">まだIRプランがありません</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            学習コンテンツで学んだ知識を活かして、実際のIRプランを作成してみましょう。
          </p>
          <Button variant="primary" onClick={() => setMode('create')}>
            最初のIRプランを作成
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plans.map((plan) => (
            <IRPlanCard
              key={plan.id}
              plan={plan}
              onEdit={handleEdit}
              onDelete={(id) => setDeleteId(id)}
            />
          ))}
        </div>
      )}

      {/* IR Plan Guide */}
      <div className="mt-8 bg-indigo-50 rounded-xl border border-indigo-200 p-6">
        <h3 className="font-semibold text-indigo-900 mb-3">📘 IRプラン作成のポイント</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-indigo-800">
          <div>
            <p className="font-medium mb-1">✓ 明確な目標設定</p>
            <p className="text-indigo-700">定量的なKPIを設定し、達成可能な目標を立てましょう。</p>
          </div>
          <div>
            <p className="font-medium mb-1">✓ ターゲット投資家の明確化</p>
            <p className="text-indigo-700">機関・個人・海外投資家それぞれへの戦略を持ちましょう。</p>
          </div>
          <div>
            <p className="font-medium mb-1">✓ 年間カレンダーの整備</p>
            <p className="text-indigo-700">決算スケジュールに合わせたIR活動計画を立てましょう。</p>
          </div>
          <div>
            <p className="font-medium mb-1">✓ 継続的な改善</p>
            <p className="text-indigo-700">投資家フィードバックを活かしてPDCAを回しましょう。</p>
          </div>
        </div>
      </div>

      {/* Delete confirmation */}
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="IRプランの削除"
        message="このIRプランを削除しますか？この操作は取り消せません。"
        confirmLabel="削除する"
        danger
      />
    </div>
  );
}
