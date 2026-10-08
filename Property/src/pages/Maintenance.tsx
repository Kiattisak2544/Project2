import { useState } from 'react';
import type { RepairRecord, CleaningRecord } from '../components/AssetRequisitions/types';
import { repairStatus } from '../components/AssetRequisitions/status';
import PageHeader from './PageHeader';

interface MaintenanceProps {
  repairs: RepairRecord[];
  cleanings: CleaningRecord[];
  search: string;
  onAdvanceRepair: (id: string) => void;
  onLogCleaning: (record: CleaningRecord) => void;
  onSelectRequester: (name: string) => void;
}

// ปุ่มถัดไปของงานซ่อมแต่ละสถานะ
const nextRepairAction: Partial<Record<RepairRecord['status'], string>> = {
  pending: 'รับเรื่อง / เริ่มซ่อม',
  in_progress: 'ปิดงานซ่อม',
};

const th = 'py-3 px-4';
const td = 'py-3.5 px-4';

export default function Maintenance({ repairs, cleanings, search, onAdvanceRepair, onLogCleaning, onSelectRequester }: MaintenanceProps) {
  const [tab, setTab] = useState<'repairs' | 'cleanings'>('repairs');
  const q = search.toLowerCase();
  const match = (...values: string[]) => values.some((v) => v.toLowerCase().includes(q));

  const visibleRepairs = repairs.filter((r) => match(r.asset, r.tag, r.issue, r.requesterName));
  const visibleCleanings = cleanings.filter((c) => match(c.asset, c.tag, c.serviceType, c.requesterName));
  const openRepairs = repairs.filter((r) => r.status !== 'completed').length;

  const tabs = [
    { id: 'repairs' as const, label: `🔧 งานแจ้งซ่อม (${repairs.length})`, accent: 'border-amber-500 text-amber-700' },
    { id: 'cleanings' as const, label: `🧼 ทำความสะอาด (${cleanings.length})`, accent: 'border-emerald-500 text-emerald-700' },
  ];

  const nameButton = (name: string) => (
    <button type="button" onClick={() => onSelectRequester(name)} className="text-slate-700 hover:text-blue-700 hover:underline cursor-pointer">
      {name}
    </button>
  );

  return (
    <>
      <PageHeader
        title="ซ่อมบำรุง / ตรวจนับ (Maintenance)"
        subtitle={
          <>
            งานซ่อมที่ยังไม่ปิด <b className="text-amber-600">{openRepairs}</b> งาน · บันทึกทำความสะอาดทั้งหมด{' '}
            <b className="text-emerald-600">{cleanings.length}</b> ครั้ง
          </>
        }
      />

      {/* แท็บ */}
      <div className="flex border-b border-slate-200 text-xs font-semibold gap-2 overflow-x-auto animate-fade-up" style={{ animationDelay: '100ms' }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`pb-3 px-3 border-b-2 whitespace-nowrap transition-all duration-300 cursor-pointer ${
              tab === t.id ? t.accent : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div key={tab} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden animate-fade-up" style={{ animationDelay: '150ms' }}>
        <div className="overflow-x-auto">
          {tab === 'repairs' ? (
            <table className="w-full text-left text-xs border-collapse min-w-[760px]">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold">
                  <th className={th}>รหัสแจ้งซ่อม</th>
                  <th className={th}>อุปกรณ์</th>
                  <th className={th}>อาการเสีย</th>
                  <th className={th}>ผู้แจ้ง</th>
                  <th className={th}>ช่าง</th>
                  <th className={th}>สถานะ</th>
                  <th className={`${th} text-center`}>ดำเนินการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visibleRepairs.map((r, i) => (
                  <tr key={r.id} className="hover:bg-amber-50/40 transition-colors animate-fade-up" style={{ animationDelay: `${200 + i * 50}ms` }}>
                    <td className={`${td} font-mono font-bold text-amber-600`}>{r.id}</td>
                    <td className={td}>
                      <div className="font-semibold text-slate-800">{r.asset}</div>
                      <div className="text-[11px] font-mono text-slate-400">{r.tag}</div>
                    </td>
                    <td className={`${td} text-slate-600 max-w-xs`}>{r.issue}</td>
                    <td className={td}>{nameButton(r.requesterName)}</td>
                    <td className={`${td} text-slate-600`}>{r.technician || '-'}</td>
                    <td className={`${td} whitespace-nowrap`}>
                      <span key={r.status} className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold border animate-pop-in ${repairStatus[r.status].badge}`}>
                        {r.statusText}
                      </span>
                    </td>
                    <td className={`${td} text-center`}>
                      {nextRepairAction[r.status] ? (
                        <button
                          type="button"
                          onClick={() => onAdvanceRepair(r.id)}
                          className="shine px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-linear-to-r from-amber-500 to-orange-500 shadow-md shadow-amber-500/30 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap"
                        >
                          {nextRepairAction[r.status]}
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400">{r.completedDate ? `ปิดงาน ${r.completedDate}` : 'เสร็จสิ้น'}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-xs border-collapse min-w-[760px]">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold">
                  <th className={th}>รหัสบันทึก</th>
                  <th className={th}>อุปกรณ์</th>
                  <th className={th}>ประเภทงาน</th>
                  <th className={th}>ผู้ครอบครอง</th>
                  <th className={th}>วันที่ทำ</th>
                  <th className={th}>รอบถัดไป</th>
                  <th className={`${th} text-center`}>ดำเนินการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visibleCleanings.map((c, i) => (
                  <tr key={c.id} className="hover:bg-emerald-50/40 transition-colors animate-fade-up" style={{ animationDelay: `${200 + i * 50}ms` }}>
                    <td className={`${td} font-mono font-bold text-emerald-600`}>{c.id}</td>
                    <td className={td}>
                      <div className="font-semibold text-slate-800">{c.asset}</div>
                      <div className="text-[11px] font-mono text-slate-400">{c.tag}</div>
                    </td>
                    <td className={`${td} text-slate-600`}>{c.serviceType}</td>
                    <td className={td}>{nameButton(c.requesterName)}</td>
                    <td className={`${td} text-slate-600 whitespace-nowrap`}>{c.date}</td>
                    <td className={`${td} text-blue-700 font-medium whitespace-nowrap`}>📅 {c.nextScheduledDate}</td>
                    <td className={`${td} text-center`}>
                      <button
                        type="button"
                        onClick={() => onLogCleaning(c)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 border border-emerald-200 bg-emerald-50 hover:bg-linear-to-r hover:from-emerald-500 hover:to-teal-600 hover:text-white hover:border-transparent hover:shadow-md hover:shadow-emerald-500/30 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap"
                      >
                        ✨ บันทึกรอบใหม่
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {(tab === 'repairs' ? visibleRepairs : visibleCleanings).length === 0 && (
            <div className="py-14 text-center text-xs text-slate-400">ไม่พบข้อมูลที่ตรงกับคำค้นหา</div>
          )}
        </div>
      </div>
    </>
  );
}
