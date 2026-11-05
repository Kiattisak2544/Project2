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

// ข้อความปุ่มดำเนินการถัดไปของแต่ละสถานะงานซ่อม
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
    { id: 'repairs' as const, label: `🔧 งานแจ้งซ่อม (${repairs.length})`, accent: 'border-primary text-primary' },
    { id: 'cleanings' as const, label: `🧼 การทำความสะอาดและบริการ (${cleanings.length})`, accent: 'border-secondary text-secondary' },
  ];

  const nameButton = (name: string) => (
    <button type="button" onClick={() => onSelectRequester(name)} className="text-on-surface hover:text-primary hover:underline cursor-pointer">
      {name}
    </button>
  );

  return (
    <>
      <PageHeader
        title="ซ่อมบำรุง / ทำความสะอาด"
        subtitle={
          <>
            งานซ่อมที่ยังไม่ปิด: <b className="text-secondary font-bold">{openRepairs}</b> งาน · บันทึกทำความสะอาดทั้งหมด:{' '}
            <b className="text-tertiary-container font-bold">{cleanings.length}</b> ครั้ง
          </>
        }
      />

      {/* แท็บตัวเลือก */}
      <div className="flex border-b border-outline-variant/40 text-xs font-semibold gap-2 overflow-x-auto animate-fade-up" style={{ animationDelay: '100ms' }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`pb-3 px-3 border-b-2 whitespace-nowrap transition-all duration-200 cursor-pointer ${
              tab === t.id ? t.accent : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div key={tab} className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-xs overflow-hidden animate-fade-up" style={{ animationDelay: '150ms' }}>
        <div className="overflow-x-auto">
          {tab === 'repairs' ? (
            <table className="w-full text-left text-xs border-collapse min-w-[760px]">
              <thead>
                <tr className="bg-surface-container border-b border-outline-variant/40 text-on-surface-variant font-semibold">
                  <th className={th}>รหัสแจ้งซ่อม</th>
                  <th className={th}>สินทรัพย์</th>
                  <th className={th}>อาการเสีย</th>
                  <th className={th}>ผู้แจ้ง</th>
                  <th className={th}>ช่างผู้รับผิดชอบ</th>
                  <th className={th}>สถานะ</th>
                  <th className={`${th} text-center`}>การดำเนินการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {visibleRepairs.map((r, i) => (
                  <tr key={r.id} className="hover:bg-surface-container-low/50 transition-colors animate-fade-up" style={{ animationDelay: `${200 + i * 50}ms` }}>
                    <td className={`${td} font-mono font-bold text-primary`}>{r.id}</td>
                    <td className={td}>
                      <div className="font-semibold text-on-surface">{r.asset}</div>
                      <div className="text-[11px] font-mono text-on-surface-variant">{r.tag}</div>
                    </td>
                    <td className={`${td} text-on-surface-variant max-w-xs`}>{r.issue}</td>
                    <td className={td}>{nameButton(r.requesterName)}</td>
                    <td className={`${td} text-on-surface-variant`}>{r.technician || '-'}</td>
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
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-primary-container hover:bg-primary shadow-xs active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap"
                        >
                          {nextRepairAction[r.status]}
                        </button>
                      ) : (
                        <span className="text-[11px] text-on-surface-variant">{r.completedDate ? `ปิดงาน ${r.completedDate}` : 'เสร็จสิ้น'}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-xs border-collapse min-w-[760px]">
              <thead>
                <tr className="bg-surface-container border-b border-outline-variant/40 text-on-surface-variant font-semibold">
                  <th className={th}>รหัสบันทึก</th>
                  <th className={th}>สินทรัพย์</th>
                  <th className={th}>ประเภทบริการ</th>
                  <th className={th}>ผู้ครอบครอง</th>
                  <th className={th}>วันที่ทำ</th>
                  <th className={th}>รอบถัดไป</th>
                  <th className={`${th} text-center`}>การดำเนินการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {visibleCleanings.map((c, i) => (
                  <tr key={c.id} className="hover:bg-surface-container-low/50 transition-colors animate-fade-up" style={{ animationDelay: `${200 + i * 50}ms` }}>
                    <td className={`${td} font-mono font-bold text-secondary`}>{c.id}</td>
                    <td className={td}>
                      <div className="font-semibold text-on-surface">{c.asset}</div>
                      <div className="text-[11px] font-mono text-on-surface-variant">{c.tag}</div>
                    </td>
                    <td className={`${td} text-on-surface-variant`}>{c.serviceType}</td>
                    <td className={td}>{nameButton(c.requesterName)}</td>
                    <td className={`${td} text-on-surface-variant whitespace-nowrap`}>{c.date}</td>
                    <td className={`${td} text-secondary font-medium whitespace-nowrap`}>📅 {c.nextScheduledDate}</td>
                    <td className={`${td} text-center`}>
                      <button
                        type="button"
                        onClick={() => onLogCleaning(c)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-primary bg-surface-container-low border border-outline-variant/50 hover:bg-primary hover:text-white hover:border-transparent active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap"
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
            <div className="py-14 text-center text-xs text-on-surface-variant">ไม่พบข้อมูลที่ตรงกับคำค้นหาของคุณ</div>
          )}
        </div>
      </div>
    </>
  );
}
