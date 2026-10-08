import type { Requisition } from '../components/AssetRequisitions/types';
import { requisitionStatus } from '../components/AssetRequisitions/status';
import PageHeader from './PageHeader';

interface TransferHistoryProps {
  requisitions: Requisition[];
  search: string;
  onSelect: (item: Requisition) => void;
}

// ประวัติการโอนย้าย: การเคลื่อนย้ายทรัพย์สินจากคลังกลางไปยังผู้ใช้ (คำขอที่อนุมัติหรือส่งมอบแล้ว)
export default function TransferHistory({ requisitions, search, onSelect }: TransferHistoryProps) {
  const q = search.toLowerCase();
  const transfers = requisitions.filter(
    (r) =>
      (r.status === 'approved' || r.status === 'completed') &&
      [r.asset, r.tag, r.name, r.dept].some((v) => v.toLowerCase().includes(q))
  );

  return (
    <>
      <PageHeader
        title="ประวัติการโอนย้าย (Transfers)"
        subtitle="ไทม์ไลน์การเคลื่อนย้ายทรัพย์สินจากคลังกลางไปยังผู้ใช้งาน"
      />

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
        {transfers.length === 0 ? (
          <div className="py-10 text-center text-xs text-slate-400">
            <div className="text-3xl mb-2">🔄</div>
            ยังไม่มีประวัติการโอนย้าย
          </div>
        ) : (
          <ol className="relative">
            {/* เส้นไทม์ไลน์ */}
            <span className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-linear-to-b from-blue-500 via-indigo-400 to-transparent animate-fade-in" />
            {transfers.map((t, i) => {
              const done = t.status === 'completed';
              return (
                <li
                  key={t.id}
                  className="relative pl-12 pb-6 last:pb-0 animate-fade-up"
                  style={{ animationDelay: `${200 + i * 90}ms` }}
                >
                  <span
                    className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ring-4 ring-white shadow-md ${
                      done ? 'bg-linear-to-br from-blue-500 to-indigo-600 text-white' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    }`}
                  >
                    {done ? '✓' : '⏱'}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelect(t)}
                    className="group w-full text-left rounded-xl border border-slate-200/80 p-3.5 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-900/5 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 transition">{t.asset}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${requisitionStatus[t.status].badge}`}>
                        {t.statusText}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100">คลังกลาง</span>
                      <span className="text-blue-500 transition-transform duration-300 group-hover:translate-x-1">→</span>
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-medium">
                        {t.name} · {t.dept}
                      </span>
                    </div>
                    <div className="mt-1.5 text-[11px] text-slate-400 font-mono">
                      {t.tag} · {t.date} · {t.type}
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </>
  );
}
