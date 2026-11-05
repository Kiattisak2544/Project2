import type { Requisition } from '../components/AssetRequisitions/types';
import { requisitionStatus } from '../components/AssetRequisitions/status';
import PageHeader from './PageHeader';

interface TransferHistoryProps {
  requisitions: Requisition[];
  search: string;
  onSelect: (item: Requisition) => void;
}

// ประวัติการโอนย้าย: ไทม์ไลน์การเคลื่อนย้ายสินทรัพย์จากคลังกลางไปยังผู้ใช้ (คำขอที่อนุมัติหรือส่งมอบแล้ว)
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
        title="ประวัติการโอนย้ายสินทรัพย์"
        subtitle="ไทม์ไลน์การเคลื่อนย้ายสินทรัพย์จากคลังกลางไปยังผู้ใช้งาน"
      />

      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-xs p-5 sm:p-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
        {transfers.length === 0 ? (
          <div className="py-10 text-center text-xs text-on-surface-variant">
            <div className="text-3xl mb-2">🔄</div>
            ยังไม่มีข้อมูลประวัติการโอนย้ายสินทรัพย์
          </div>
        ) : (
          <ol className="relative">
            {/* เส้นไทม์ไลน์ */}
            <span className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-outline-variant animate-fade-in" />
            {transfers.map((t, i) => {
              const done = t.status === 'completed';
              return (
                <li
                  key={t.id}
                  className="relative pl-12 pb-6 last:pb-0 animate-fade-up"
                  style={{ animationDelay: `${200 + i * 90}ms` }}
                >
                  <span
                    className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ring-4 ring-surface-container-lowest shadow-sm ${
                      done ? 'bg-primary text-on-primary' : 'bg-tertiary-fixed text-on-tertiary-fixed font-bold'
                    }`}
                  >
                    {done ? '✓' : '⏱'}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelect(t)}
                    className="group w-full text-left rounded-xl border border-outline-variant/40 p-3.5 hover:border-secondary hover:bg-surface-container-low/40 transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-on-surface group-hover:text-primary transition">{t.asset}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${requisitionStatus[t.status].badge}`}>
                        {t.statusText}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-on-surface-variant">
                      <span className="px-2 py-0.5 rounded-md bg-surface-container-low">คลังกลาง</span>
                      <span className="text-secondary transition-transform duration-200 group-hover:translate-x-1">→</span>
                      <span className="px-2 py-0.5 rounded-md bg-secondary-fixed/50 text-secondary font-medium">
                        {t.name} · {t.dept}
                      </span>
                    </div>
                    <div className="mt-1.5 text-[11px] text-on-surface-variant font-mono">
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
