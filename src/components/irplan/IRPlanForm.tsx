import { useState } from 'react';
import { Button } from '../ui/Button';
import { generateId } from '../../utils/storage';
import type { IRPlan, IRTarget, IRActivity } from '../../types';

type FormData = Omit<IRPlan, 'id' | 'createdAt' | 'updatedAt'>;

interface IRPlanFormProps {
  initial?: IRPlan;
  onSave: (data: FormData) => void;
  onCancel: () => void;
}

const AUDIENCE_TYPES = ['機関投資家', '個人投資家', 'アナリスト', '海外投資家', 'メディア'];
const ACTIVITY_TYPES = ['決算説明会', '個別面談', 'ロードショー', '株主総会', '開示資料公開', 'IRサイト更新', 'SNS発信'];
const PRIORITIES = [
  { value: 'high', label: '高' },
  { value: 'medium', label: '中' },
  { value: 'low', label: '低' },
] as const;

const TABS = ['基本情報', 'ターゲット設定', 'IR活動計画', 'KPI・予算', 'メモ'];

export function IRPlanForm({ initial, onSave, onCancel }: IRPlanFormProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState<FormData>({
    title: initial?.title ?? '',
    companyName: initial?.companyName ?? '',
    fiscalYear: initial?.fiscalYear ?? '',
    irObjective: initial?.irObjective ?? '',
    targets: initial?.targets ?? [],
    activities: initial?.activities ?? [],
    kpis: initial?.kpis ?? [''],
    budget: initial?.budget ?? '',
    notes: initial?.notes ?? '',
  });

  const update = (key: keyof FormData, value: FormData[keyof FormData]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // Targets
  const addTarget = () =>
    update('targets', [
      ...form.targets,
      { id: generateId(), audienceType: '機関投資家', priority: 'medium', notes: '' },
    ]);
  const removeTarget = (id: string) =>
    update('targets', form.targets.filter((t) => t.id !== id));
  const updateTarget = (id: string, field: keyof IRTarget, value: string) =>
    update(
      'targets',
      form.targets.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );

  // Activities
  const addActivity = () =>
    update('activities', [
      ...form.activities,
      { id: generateId(), type: '決算説明会', frequency: '年4回', responsible: '', notes: '' },
    ]);
  const removeActivity = (id: string) =>
    update('activities', form.activities.filter((a) => a.id !== id));
  const updateActivity = (id: string, field: keyof IRActivity, value: string) =>
    update(
      'activities',
      form.activities.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );

  // KPIs
  const addKpi = () => update('kpis', [...form.kpis, '']);
  const removeKpi = (i: number) =>
    update('kpis', form.kpis.filter((_, j) => j !== i));
  const updateKpi = (i: number, val: string) =>
    update('kpis', form.kpis.map((k, j) => (j === i ? val : k)));

  const handleSubmit = () => {
    onSave({
      ...form,
      kpis: form.kpis.filter((k) => k.trim() !== ''),
    });
  };

  const inputClass =
    'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500';
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 overflow-x-auto">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`flex-1 min-w-max px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === i
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab 0: 基本情報 */}
      {activeTab === 0 && (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>プランタイトル</label>
            <input
              type="text"
              placeholder="例: 2025年度IRプラン"
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>会社名 <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="例: 株式会社◯◯"
                value={form.companyName}
                onChange={(e) => update('companyName', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>対象期 <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="例: 2025年3月期"
                value={form.fiscalYear}
                onChange={(e) => update('fiscalYear', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>IR活動の主要目標</label>
            <textarea
              rows={4}
              placeholder="例: 機関投資家比率を高め、安定株主を増やす。アナリストカバレッジを拡大し、企業認知度を向上させる。"
              value={form.irObjective}
              onChange={(e) => update('irObjective', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      )}

      {/* Tab 1: ターゲット設定 */}
      {activeTab === 1 && (
        <div className="space-y-4">
          {form.targets.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              ターゲット投資家を追加してください
            </p>
          )}
          {form.targets.map((target) => (
            <div key={target.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <div>
                  <label className={labelClass}>投資家区分</label>
                  <select
                    value={target.audienceType}
                    onChange={(e) => updateTarget(target.id, 'audienceType', e.target.value)}
                    className={inputClass}
                  >
                    {AUDIENCE_TYPES.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>優先度</label>
                  <select
                    value={target.priority}
                    onChange={(e) => updateTarget(target.id, 'priority', e.target.value as IRTarget['priority'])}
                    className={inputClass}
                  >
                    {PRIORITIES.map((p) => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>補足メモ</label>
                  <input
                    type="text"
                    value={target.notes}
                    onChange={(e) => updateTarget(target.id, 'notes', e.target.value)}
                    placeholder="例: 長期投資家重視"
                    className={inputClass}
                  />
                </div>
              </div>
              <button
                onClick={() => removeTarget(target.id)}
                className="text-xs text-red-500 hover:text-red-700"
              >
                ✕ 削除
              </button>
            </div>
          ))}
          <Button variant="secondary" onClick={addTarget} size="sm">
            ＋ ターゲットを追加
          </Button>
        </div>
      )}

      {/* Tab 2: IR活動計画 */}
      {activeTab === 2 && (
        <div className="space-y-4">
          {form.activities.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              IR活動を追加してください
            </p>
          )}
          {form.activities.map((activity) => (
            <div key={activity.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className={labelClass}>活動種別</label>
                  <select
                    value={activity.type}
                    onChange={(e) => updateActivity(activity.id, 'type', e.target.value)}
                    className={inputClass}
                  >
                    {ACTIVITY_TYPES.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>実施頻度</label>
                  <input
                    type="text"
                    placeholder="例: 年4回"
                    value={activity.frequency}
                    onChange={(e) => updateActivity(activity.id, 'frequency', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>担当者</label>
                  <input
                    type="text"
                    placeholder="例: IR部長 山田"
                    value={activity.responsible}
                    onChange={(e) => updateActivity(activity.id, 'responsible', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>備考</label>
                  <input
                    type="text"
                    value={activity.notes}
                    onChange={(e) => updateActivity(activity.id, 'notes', e.target.value)}
                    placeholder="例: 決算後2週間以内に開催"
                    className={inputClass}
                  />
                </div>
              </div>
              <button
                onClick={() => removeActivity(activity.id)}
                className="text-xs text-red-500 hover:text-red-700"
              >
                ✕ 削除
              </button>
            </div>
          ))}
          <Button variant="secondary" onClick={addActivity} size="sm">
            ＋ 活動を追加
          </Button>
        </div>
      )}

      {/* Tab 3: KPI・予算 */}
      {activeTab === 3 && (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>KPI（数値目標）</label>
            <div className="space-y-2">
              {form.kpis.map((kpi, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="例: 個人株主数 +10%"
                    value={kpi}
                    onChange={(e) => updateKpi(i, e.target.value)}
                    className={inputClass}
                  />
                  {form.kpis.length > 1 && (
                    <button
                      onClick={() => removeKpi(i)}
                      className="text-red-400 hover:text-red-600 px-2"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={addKpi}
              className="text-sm text-indigo-600 hover:text-indigo-800 mt-2"
            >
              ＋ KPIを追加
            </button>
          </div>
          <div>
            <label className={labelClass}>IR予算の概要</label>
            <textarea
              rows={3}
              placeholder="例: 年間予算2,000万円。決算説明会600万、ロードショー500万、IR資料作成400万、その他500万"
              value={form.budget}
              onChange={(e) => update('budget', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      )}

      {/* Tab 4: メモ */}
      {activeTab === 4 && (
        <div>
          <label className={labelClass}>自由メモ欄</label>
          <textarea
            rows={8}
            placeholder="プランに関するメモや補足情報を自由に記入してください"
            value={form.notes}
            onChange={(e) => update('notes', e.target.value)}
            className={inputClass}
          />
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
        <Button variant="secondary" onClick={onCancel}>
          キャンセル
        </Button>
        <div className="flex gap-3">
          {activeTab > 0 && (
            <Button variant="ghost" onClick={() => setActiveTab((t) => t - 1)}>
              ← 前へ
            </Button>
          )}
          {activeTab < TABS.length - 1 ? (
            <Button variant="primary" onClick={() => setActiveTab((t) => t + 1)}>
              次へ →
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={handleSubmit}
              disabled={!form.companyName.trim() || !form.fiscalYear.trim()}
            >
              💾 保存する
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
