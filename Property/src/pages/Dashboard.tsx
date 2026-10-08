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

const card = 'bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 animate-fade-up';

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
      {/* แบนเนอร์ต้อนรับ */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 text-white bg-linear-to-br from-blue-800 via-indigo-700 to-violet-700 bg-[length:200%_200%] animate-gradient-pan shadow-2xl shadow-indigo-900/20">
        <div className="pointer-events-none absolute -top-20 -right-10 w-72 h-72 rounded-full bg-white/10 blur-3xl animate-float" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 w-64 h-64 rounded-full bg-sky-400/20 blur-3xl animate-float [animation-delay:-4s]" />
        <div className="relative animate-fade-up">
          <p className="text-xs text-blue-100/80">ยินดีต้อนรับกลับมา</p>
          <h1 className="text-2xl sm:text-3xl font-bold mt-1">สวัสดี, {currentUser.name.split(' ')[0]} 👋</h1>
          <p className="text-sm text-blue-100/90 mt-2 max-w-xl">
            วันนี้มีคำขอเบิก <b className="text-white">{pending} รายการ</b> รอการอนุมัติ และงานซ่อมที่ยังไม่ปิด{' '}
            <b className="text-white">{openRepairs} งาน</b>
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            <button
              type="button"
              onClick={onCreate}
              className="shine px-4 py-2 rounded-xl bg-white text-blue-800 text-xs font-bold shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              + สร้างคำขอเบิก
            </button>
            <button
              type="button"
              onClick={() => onShowStatus('pending')}
              className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 ring-1 ring-white/30 text-xs font-semibold backdrop-blur transition-all duration-200 active:scale-95 cursor-pointer"
            >
              ดูคำขอที่รออนุมัติ →
            </button>
          </div>
        </div>
      </div>

      <KpiCards requisitions={requisitions} onSelectStatus={onShowStatus} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* สัดส่วนสถานะ */}
        <div className={card} style={{ animationDelay: '450ms' }}>
          <h3 className="text-sm font-bold text-slate-800">สัดส่วนสถานะคำขอ</h3>
          <div className="mt-4 space-y-3">
            {statuses.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onShowStatus(s.id)}
                className="w-full text-left group cursor-pointer"
              >
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 group-hover:text-blue-700 transition">{s.text}</span>
                  <span className="font-semibold text-slate-800 tabular-nums">{s.count}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${s.dot} origin-left animate-grow-x`}
                    style={{ width: `${(s.count / total) * 100}%`, animationDelay: `${600 + i * 120}ms` }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* คำขอตามแผนก */}
        <div className={card} style={{ animationDelay: '530ms' }}>
          <h3 className="text-sm font-bold text-slate-800">คำขอตามแผนก</h3>
          <div className="mt-4 space-y-3">
            {deptCounts.map(([dept, count], i) => (
              <div key={dept}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 truncate">{dept}</span>
                  <span className="font-semibold text-slate-800 tabular-nums">{count}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-blue-500 to-indigo-600 origin-left animate-grow-x"
                    style={{ width: `${(count / maxDept) * 100}%`, animationDelay: `${700 + i * 120}ms` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* คำขอล่าสุด */}
        <div className={card} style={{ animationDelay: '610ms' }}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">คำขอล่าสุด</h3>
            <button
              type="button"
              onClick={() => onNavigate('requisitions')}
              className="text-[11px] text-blue-700 hover:underline cursor-pointer"
            >
              ดูทั้งหมด →
            </button>
          </div>
          <ul className="mt-3 divide-y divide-slate-100">
            {requisitions.slice(0, 5).map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => onSelect(r)}
                  className="w-full flex items-center gap-3 py-2.5 text-left rounded-lg px-1 -mx-1 hover:bg-slate-50 hover:translate-x-1 transition-all duration-200 cursor-pointer"
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${requisitionStatus[r.status].dot}`} />
                  <span className="flex-1 min-w-0">
                    <span className="block text-xs font-medium text-slate-800 truncate">{r.asset}</span>
                    <span className="block text-[11px] text-slate-400 truncate">
                      {r.name} · {r.date}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
