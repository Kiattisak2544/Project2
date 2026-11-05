import React, { useState } from 'react';
import type { Requisition } from './types';
import { requisitionStatus } from './status';

const PAGE_SIZE = 5;

interface RequisitionTableProps {
  items: Requisition[];
  totalCount: number;
  onSelect: (item: Requisition) => void;
  onSelectRequester?: (requesterName: string) => void;
}

export const RequisitionTable: React.FC<RequisitionTableProps> = ({
  items,
  totalCount,
  onSelect,
  onSelectRequester,
}) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const pageItems = items.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const firstIndex = items.length === 0 ? 0 : (current - 1) * PAGE_SIZE + 1;

  const pageBtn =
    'min-w-8 h-8 px-2 rounded-lg border text-xs font-medium transition-all duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed';

  return (
    <div
      className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-sm overflow-hidden animate-fade-up"
      style={{ animationDelay: '500ms' }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-surface-container text-on-surface-variant font-semibold tracking-wider uppercase border-b border-outline-variant/40">
              <th className="py-3 px-4">รหัสคำขอ</th>
              <th className="py-3 px-4">ผู้ขอเบิก</th>
              <th className="py-3 px-4">บริษัท</th>
              <th className="py-3 px-4">รายละเอียดสินทรัพย์</th>
              <th className="py-3 px-4">หมายเลขสินทรัพย์</th>
              <th className="py-3 px-4">วันที่ขอเบิก</th>
              <th className="py-3 px-4">สถานะ</th>
              <th className="py-3 px-4 text-center">การดำเนินการ</th>
            </tr>
          </thead>
          <tbody key={current} className="divide-y-0 text-on-surface">
            {pageItems.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-14 text-outline animate-fade-in">
                  <div className="text-3xl mb-2">🔎</div>
                  ไม่พบข้อมูลที่ตรงกับการค้นหาของคุณ
                </td>
              </tr>
            ) : (
              pageItems.map((item, i) => (
                <tr
                  key={item.id}
                  style={{ animationDelay: `${i * 50}ms` }}
                  className={`group/row animate-fade-up transition-colors duration-150 hover:bg-surface-container/40 ${
                    i % 2 === 0 ? 'bg-surface-container-lowest' : 'bg-surface-container-low/50'
                  }`}
                >
                  <td className="py-3.5 px-4 font-bold text-primary font-mono relative">
                    <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-primary scale-y-0 transition-transform duration-200 group-hover/row:scale-y-100" />
                    {item.id}
                  </td>
                  <td className="py-3.5 px-4">
                    {onSelectRequester ? (
                      <button
                        type="button"
                        onClick={() => onSelectRequester(item.name)}
                        className="text-left group cursor-pointer"
                        title="ดูประวัติการเบิกและบริการของพนักงาน"
                      >
                        <div className="font-semibold text-on-surface group-hover:text-secondary flex items-center gap-1.5 transition">
                          <span>{item.name}</span>
                          <span className="text-[10px] text-secondary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition">
                            ↗
                          </span>
                        </div>
                        <div className="text-[11px] text-on-surface-variant">{item.dept}</div>
                      </button>
                    ) : (
                      <div>
                        <div className="font-semibold text-on-surface">{item.name}</div>
                        <div className="text-[11px] text-on-surface-variant">{item.dept}</div>
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-on-surface-variant">{item.company}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-primary">{item.asset}</div>
                    <div className="text-[11px] text-on-surface-variant">{item.category}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-outline text-label-sm">{item.tag}</td>
                  <td className="py-3.5 px-4 text-on-surface-variant whitespace-nowrap">{item.date}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${requisitionStatus[item.status].badge}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${requisitionStatus[item.status].dot}`} />
                      {requisitionStatus[item.status].text}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => onSelect(item)}
                      className="px-3 py-1 border border-outline-variant/50 rounded-lg text-secondary hover:bg-surface-container hover:text-primary transition-colors text-xs font-medium cursor-pointer shadow-2xs"
                    >
                      ดูรายละเอียด
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3 border-t border-outline-variant/30 text-xs text-on-surface-variant flex flex-wrap gap-2 justify-between items-center bg-surface-container-low/40">
        <span>
          แสดง {firstIndex}–{firstIndex + pageItems.length - (pageItems.length ? 1 : 0)} จากทั้งหมด {items.length} รายการ
          {items.length !== totalCount && <span className="text-outline"> (ทั้งหมด {totalCount})</span>}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setPage(current - 1)}
            disabled={current === 1}
            className={`${pageBtn} border-outline-variant/40 bg-surface-container-lowest text-on-surface enabled:hover:bg-surface-container`}
            aria-label="หน้าก่อนหน้า"
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              className={`${pageBtn} ${
                n === current
                  ? 'bg-primary text-on-primary border-transparent shadow-sm font-semibold'
                  : 'border-outline-variant/40 bg-surface-container-lowest text-on-surface hover:bg-surface-container'
              }`}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage(current + 1)}
            disabled={current === totalPages}
            className={`${pageBtn} border-outline-variant/40 bg-surface-container-lowest text-on-surface enabled:hover:bg-surface-container`}
            aria-label="หน้าถัดไป"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequisitionTable;
