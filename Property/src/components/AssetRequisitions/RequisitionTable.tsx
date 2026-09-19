import React from 'react';
import type { Requisition } from '../AssetRequisitions/types';

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
  // ฟังก์ชันเลือกสีป้ายสถานะ
  const getStatusBadgeClass = (status: Requisition['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'completed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
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
          <tbody className="divide-y divide-slate-100">
            {items.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-10 text-slate-400">
                  ไม่พบข้อมูลที่ตรงกับเงื่อนไขค้นหา
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 px-4 font-bold text-blue-700 font-mono">{item.id}</td>
                  <td className="py-3.5 px-4">
                    {onSelectRequester ? (
                      <button
                        type="button"
                        onClick={() => onSelectRequester(item.name)}
                        className="text-left group cursor-pointer"
                        title="คลิกเพื่อดูประวัติการเบิก แจ้งซ่อม และทำความสะอาด"
                      >
                        <div className="font-semibold text-slate-800 group-hover:text-blue-700 group-hover:underline flex items-center gap-1.5 transition">
                          <span>{item.name}</span>
                          <span className="text-[10px] text-blue-600 opacity-0 group-hover:opacity-100 transition">
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
                  <td className="py-3.5 px-4 text-slate-600">{item.date}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${getStatusBadgeClass(
                        item.status
                      )}`}
                    >
                      {item.statusText}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => onSelect(item)}
                      className="px-2.5 py-1 border border-slate-200 rounded text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition text-xs font-medium cursor-pointer"
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

      {/* แถบแสดงจำนวนรายการด้านล่าง */}
      <div className="p-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between items-center">
        <span>แสดง {items.length} จากทั้งหมด {totalCount} รายการ</span>
        <span>หน้า 1 จาก 1</span>
      </div>
    </div>
  );
};

export default RequisitionTable;
