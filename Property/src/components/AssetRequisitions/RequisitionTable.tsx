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

  // ถ้ากรองแล้วจำนวนหน้าลดลง ให้ถอยมาหน้าสุดท้ายที่มีอยู่
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const pageItems = items.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const firstIndex = items.length === 0 ? 0 : (current - 1) * PAGE_SIZE + 1;

  const pageBtn =
    'min-w-8 h-8 px-2 rounded-lg border text-xs font-medium transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed';

  return (
    <div
      className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden animate-fade-up"
      style={{ animationDelay: '500ms' }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase">
              <th className="py-3 px-4">รหัสคำขอ</th>
              <th className="py-3 px-4">ผู้ขอเบิก</th>
              <th className="py-3 px-4">บริษัท</th>
              <th className="py-3 px-4">รายการทรัพย์สิน</th>
              <th className="py-3 px-4">รหัสแท็ก</th>
              <th className="py-3 px-4">วันที่ขอ</th>
              <th className="py-3 px-4">สถานะ</th>
              <th className="py-3 px-4 text-center">จัดการ</th>
            </tr>
          </thead>
          {/* key เปลี่ยนตามหน้า เพื่อให้แถวเล่นแอนิเมชันใหม่ทุกครั้งที่เปลี่ยนหน้า */}
          <tbody key={current} className="divide-y divide-slate-100">
            {pageItems.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-14 text-slate-400 animate-fade-in">
                  <div className="text-3xl mb-2">🔎</div>
                  ไม่พบข้อมูลที่ตรงกับเงื่อนไขค้นหา
                </td>
              </tr>
            ) : (
              pageItems.map((item, i) => (
                <tr
                  key={item.id}
                  style={{ animationDelay: `${i * 50}ms` }}
                  className="group/row animate-fade-up transition-colors duration-200 hover:bg-linear-to-r hover:from-blue-50/60 hover:to-transparent"
                >
                  <td className="py-3.5 px-4 font-bold text-blue-700 font-mono relative">
                    <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-blue-600 scale-y-0 transition-transform duration-300 group-hover/row:scale-y-100" />
                    {item.id}
                  </td>
                  <td className="py-3.5 px-4">
                    {onSelectRequester ? (
                      <button
                        type="button"
                        onClick={() => onSelectRequester(item.name)}
                        className="text-left group cursor-pointer"
                        title="คลิกเพื่อดูประวัติการเบิก แจ้งซ่อม และทำความสะอาด"
                      >
                        <div className="font-semibold text-slate-800 group-hover:text-blue-700 flex items-center gap-1.5 transition">
                          <span className="bg-linear-to-r from-blue-600 to-blue-600 bg-[length:0%_1px] bg-no-repeat bg-bottom-left transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-blue-600 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition">
                            ↗
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400">{item.dept}</div>
                      </button>
                    ) : (
                      <div>
                        <div className="font-semibold text-slate-800">{item.name}</div>
                        <div className="text-[11px] text-slate-400">{item.dept}</div>
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4">{item.company}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-900">{item.asset}</div>
                    <div className="text-[11px] text-slate-400">{item.category}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">{item.tag}</td>
                  <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">{item.date}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${requisitionStatus[item.status].badge}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${requisitionStatus[item.status].dot} ${item.status === 'pending' ? 'animate-pulse' : ''}`} />
                      {item.statusText}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => onSelect(item)}
                      className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-md hover:shadow-blue-600/30 active:scale-95 transition-all duration-200 text-xs font-medium cursor-pointer"
                    >
                      ดูข้อมูล
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* แถบแสดงจำนวนรายการ + เปลี่ยนหน้า */}
      <div className="p-3 border-t border-slate-100 text-xs text-slate-500 flex flex-wrap gap-2 justify-between items-center">
        <span>
          แสดง {firstIndex}–{firstIndex + pageItems.length - (pageItems.length ? 1 : 0)} จาก {items.length} รายการ
          {items.length !== totalCount && <span className="text-slate-400"> (ทั้งหมด {totalCount})</span>}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setPage(current - 1)}
            disabled={current === 1}
            className={`${pageBtn} border-slate-200 enabled:hover:bg-slate-50`}
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
                  ? 'bg-linear-to-br from-blue-600 to-indigo-600 text-white border-transparent shadow-md shadow-blue-600/30'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage(current + 1)}
            disabled={current === totalPages}
            className={`${pageBtn} border-slate-200 enabled:hover:bg-slate-50`}
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
