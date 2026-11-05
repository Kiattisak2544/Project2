import type { Requisition, RepairRecord } from '../components/AssetRequisitions/types';
import type { PageId } from '../components/AssetRequisitions/navigation';
import { requisitionStatus } from '../components/AssetRequisitions/status';
import KpiCards from '../components/AssetRequisitions/KpiCards';
import { currentUser } from '../constants/currentUser';

interface DashboardProps {
  requisitions: Requisition[];
  repairs: RepairRecord[];
  onNavigate: (page: PageId) => void;
  onShowStatus: (status: string) => void;
  onCreate: () => void;
  onSelect: (item: Requisition) => void;
}

const card = 'bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-sm p-5 animate-fade-up text-on-surface';

export default function Dashboard({ requisitions, repairs, onNavigate, onShowStatus, onCreate, onSelect }: DashboardProps) {
  const total = requisitions.length || 1;
  const statuses = (Object.keys(requisitionStatus) as Requisition['status'][]).map((s) => ({
    id: s,
    ...requisitionStatus[s],
    count: requisitions.filter((r) => r.status === s).length,
  }));

  const deptCounts = Object.entries(
    requisitions.reduce<Record<string, number>>((acc, r) => {
      acc[r.dept] = (acc[r.dept] ?? 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]);
  const maxDept = deptCounts[0]?.[1] ?? 1;

  const openRepairs = repairs.filter((r) => r.status !== 'completed').length;
  const pending = statuses.find((s) => s.id === 'pending')?.count ?? 0;

  return (
    <>
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-xl p-6 bg-surface-container border border-outline-variant/40 text-on-surface shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold text-xl shrink-0 shadow-sm">
              EA
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-sm bg-primary-fixed text-on-primary-fixed font-mono text-[10px] font-semibold tracking-wider uppercase">
                  Enterprise Asset Core
                </span>
                <span className="text-xs text-on-surface-variant font-medium">ภาพรวมระบบ</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-on-surface">ยินดีต้อนรับกลับ, คุณ{currentUser.name.split(' ')[0]} 👋</h1>
              <p className="text-xs text-on-surface-variant mt-1 max-w-xl">
                ขณะนี้มี <b className="text-secondary">{pending} คำขอที่รอการอนุมัติ</b> และ{' '}
                <b className="text-secondary">{openRepairs} งานแจ้งซ่อม</b> ที่กำลังดำเนินการอยู่
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto shrink-0">
            <button
              type="button"
              onClick={onCreate}
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              + สร้างคำขอเบิกใหม่
            </button>
            <button
              type="button"
              onClick={() => onShowStatus('pending')}
              className="px-4 py-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface text-xs font-semibold border border-outline-variant/50 shadow-2xs transition-all cursor-pointer"
            >
              รายการรออนุมัติ →
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <KpiCards requisitions={requisitions} onSelectStatus={onShowStatus} />

      {/* Analytics Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Status Distribution */}
        <div className={card} style={{ animationDelay: '450ms' }}>
          <h3 className="text-sm font-bold text-on-surface">สัดส่วนสถานะคำขอเบิก</h3>
          <div className="mt-4 space-y-3">
            {statuses.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onShowStatus(s.id)}
                className="w-full text-left group cursor-pointer"
              >
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-on-surface-variant group-hover:text-primary transition">{s.text}</span>
                  <span className="font-semibold text-on-surface font-mono tabular-nums">{s.count}</span>
                </div>
                <div className="h-2 rounded-full bg-surface-container overflow-hidden">
                  <div
                    className={`h-full rounded-full ${s.dot} origin-left animate-grow-x`}
                    style={{ width: `${(s.count / total) * 100}%`, animationDelay: `${600 + i * 120}ms` }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Requests by Department */}
        <div className={card} style={{ animationDelay: '530ms' }}>
          <h3 className="text-sm font-bold text-on-surface">คำขอเบิกตามแผนก</h3>
          <div className="mt-4 space-y-3">
            {deptCounts.map(([dept, count], i) => (
              <div key={dept}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-on-surface-variant truncate">{dept}</span>
                  <span className="font-semibold text-on-surface font-mono tabular-nums">{count}</span>
                </div>
                <div className="h-2 rounded-full bg-surface-container overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary origin-left animate-grow-x"
                    style={{ width: `${(count / maxDept) * 100}%`, animationDelay: `${700 + i * 120}ms` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Requisitions */}
        <div className={card} style={{ animationDelay: '610ms' }}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-on-surface">คำขอเบิกล่าสุด</h3>
            <button
              type="button"
              onClick={() => onNavigate('requisitions')}
              className="text-[11px] text-secondary hover:underline cursor-pointer font-medium"
            >
              ดูทั้งหมด →
            </button>
          </div>
          <ul className="mt-3 divide-y divide-outline-variant/30">
            {requisitions.slice(0, 5).map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => onSelect(r)}
                  className="w-full flex items-center gap-3 py-2.5 text-left rounded-lg px-1.5 -mx-1.5 hover:bg-surface-container/40 transition-all cursor-pointer"
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${requisitionStatus[r.status].dot}`} />
                  <span className="flex-1 min-w-0">
                    <span className="block text-xs font-semibold text-on-surface truncate">{r.asset}</span>
                    <span className="block text-[11px] text-on-surface-variant truncate">
                      {r.name} · {r.date}
                    </span>
                  </span>
                  <span className="text-[11px] font-mono text-outline shrink-0">{r.tag}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
