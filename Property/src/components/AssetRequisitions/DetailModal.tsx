import React from 'react';
import type { Requisition } from './types';
import { requisitionStatus } from './status';
import Modal from '../ui/Modal';

interface DetailModalProps {
  item: Requisition;
  onClose: () => void;
  onUpdateStatus: (id: string, status: Requisition['status']) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ item, onClose, onUpdateStatus }) => {
  const rows: [string, React.ReactNode][] = [
    ['ผู้ขอเบิก', `${item.name} (${item.dept})`],
    ['ตำแหน่ง', item.role],
    ['บริษัท', item.company],
    ['รายการทรัพย์สิน', item.asset],
    ['หมวดหมู่', item.category],
    ['รหัสแท็ก', <span className="font-mono text-blue-700">{item.tag}</span>],
    ['ประเภท', `${item.type} (กำหนดคืน: ${item.dueDate})`],
    ['วันที่ขอ', item.date],
  ];

  return (
    <Modal onClose={onClose}>
      {(close) => {
        // เปลี่ยนสถานะแล้วปิดหน้าต่างแบบมีแอนิเมชัน
        const update = (status: Requisition['status']) => () => {
          onUpdateStatus(item.id, status);
          close();
        };

        return (
          <>
            {/* ส่วนหัว Modal แบบไล่สี */}
            <div className="relative overflow-hidden px-6 pt-6 pb-5 bg-linear-to-br from-blue-700 via-indigo-700 to-violet-700 bg-[length:200%_200%] animate-gradient-pan text-white">
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
              <div className="relative flex justify-between items-start">
                <div>
                  <span className="text-[11px] font-mono font-bold text-blue-100/90">{item.id}</span>
                  <h3 className="text-base font-bold">รายละเอียดคำขอเบิก</h3>
                </div>
                <button
                  onClick={close}
                  className="w-8 h-8 rounded-full text-white/70 hover:text-white hover:bg-white/15 hover:rotate-90 transition-all duration-300 cursor-pointer"
                  aria-label="ปิด"
                >
                  ✕
                </button>
              </div>
              <span
                className={`relative inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${requisitionStatus[item.status].badge}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${requisitionStatus[item.status].dot}`} />
                {item.statusText}
              </span>
            </div>

            {/* ข้อมูลรายละเอียด */}
            <div className="px-6 py-4 space-y-2.5 text-xs">
              {rows.map(([label, value], i) => (
                <div
                  key={label}
                  className="flex justify-between gap-4 animate-fade-up"
                  style={{ animationDelay: `${120 + i * 40}ms` }}
                >
                  <span className="text-slate-400 shrink-0">{label}:</span>
                  <span className="font-semibold text-slate-800 text-right">{value}</span>
                </div>
              ))}
              {item.notes && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-600 animate-fade-up" style={{ animationDelay: '460ms' }}>
                  <span className="font-bold text-slate-500">หมายเหตุ:</span> {item.notes}
                </div>
              )}
            </div>

            {/* ปุ่มด้านล่าง Modal เปลี่ยนตามสถานะ */}
            <div className="flex flex-wrap justify-end gap-2 px-6 py-4 border-t border-slate-100 bg-slate-50/60">
              <button
                onClick={close}
                className="px-4 py-2 text-xs bg-white border border-slate-200 hover:bg-slate-100 rounded-xl text-slate-600 transition cursor-pointer"
              >
                ปิด
              </button>
              {item.status === 'pending' && (
                <>
                  <button
                    onClick={update('rejected')}
                    className="px-4 py-2 text-xs border border-rose-200 text-rose-600 bg-white hover:bg-rose-600 hover:text-white hover:border-rose-600 rounded-xl font-semibold transition-all duration-200 active:scale-95 cursor-pointer"
                  >
                    ปฏิเสธคำขอ
                  </button>
                  <button
                    onClick={update('approved')}
                    className="shine px-4 py-2 text-xs bg-linear-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-600/30 hover:-translate-y-0.5 transition-all duration-200 active:scale-95 cursor-pointer"
                  >
                    ✓ อนุมัติคำขอ
                  </button>
                </>
              )}
              {item.status === 'approved' && (
                <button
                  onClick={update('completed')}
                  className="shine px-4 py-2 text-xs bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/30 hover:-translate-y-0.5 transition-all duration-200 active:scale-95 cursor-pointer"
                >
                  🚚 ยืนยันส่งมอบแล้ว
                </button>
              )}
            </div>
          </>
        );
      }}
    </Modal>
  );
};

export default DetailModal;
