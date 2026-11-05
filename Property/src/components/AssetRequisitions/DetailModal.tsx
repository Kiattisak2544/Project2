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
    ['รายการสินทรัพย์', item.asset],
    ['หมวดหมู่', item.category],
    ['รหัสสินทรัพย์', <span className="font-mono text-primary font-semibold">{item.tag}</span>],
    ['ประเภทการเบิก', `${item.type} (กำหนดคืน: ${item.dueDate})`],
    ['วันที่ขอเบิก', item.date],
  ];

  return (
    <Modal onClose={onClose}>
      {(close) => {
        const update = (status: Requisition['status']) => () => {
          onUpdateStatus(item.id, status);
          close();
        };

        return (
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-xl border border-outline-variant/30 text-on-surface">
            {/* Header */}
            <div className="relative px-6 pt-5 pb-4 bg-primary-container text-on-primary">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[11px] font-mono font-bold text-on-primary-container">{item.id}</span>
                  <h3 className="text-base font-bold">รายละเอียดคำขอเบิก</h3>
                </div>
                <button
                  onClick={close}
                  className="w-8 h-8 rounded-full text-on-primary/80 hover:text-on-primary hover:bg-white/15 transition cursor-pointer flex items-center justify-center"
                  aria-label="ปิด"
                >
                  ✕
                </button>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 mt-3 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${requisitionStatus[item.status].badge}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${requisitionStatus[item.status].dot}`} />
                {requisitionStatus[item.status].text}
              </span>
            </div>

            {/* Content Rows */}
            <div className="px-6 py-4 space-y-2.5 text-xs bg-surface-container-lowest">
              {rows.map(([label, value], i) => (
                <div
                  key={label}
                  className="flex justify-between gap-4 animate-fade-up"
                  style={{ animationDelay: `${120 + i * 40}ms` }}
                >
                  <span className="text-on-surface-variant shrink-0">{label}:</span>
                  <span className="font-semibold text-on-surface text-right">{value}</span>
                </div>
              ))}
              {item.notes && (
                <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant/30 text-on-surface animate-fade-up" style={{ animationDelay: '460ms' }}>
                  <span className="font-bold text-on-surface-variant">หมายเหตุ:</span> {item.notes}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-end gap-2 px-6 py-3.5 border-t border-outline-variant/30 bg-surface-container-low/40">
              <button
                onClick={close}
                className="px-4 py-2 text-xs bg-surface-container hover:bg-surface-container-high rounded-lg text-on-surface-variant hover:text-on-surface transition font-medium cursor-pointer"
              >
                ปิด
              </button>
              {item.status === 'pending' && (
                <>
                  <button
                    onClick={update('rejected')}
                    className="px-4 py-2 text-xs border border-error/40 text-error bg-surface-container-lowest hover:bg-error-container/40 rounded-lg font-semibold transition cursor-pointer"
                  >
                    ปฏิเสธคำขอ
                  </button>
                  <button
                    onClick={update('approved')}
                    className="px-4 py-2 text-xs bg-primary text-on-primary hover:bg-primary-container rounded-lg font-semibold shadow-sm transition cursor-pointer"
                  >
                    ✓ อนุมัติคำขอ
                  </button>
                </>
              )}
              {item.status === 'approved' && (
                <button
                  onClick={update('completed')}
                  className="px-4 py-2 text-xs bg-primary text-on-primary hover:bg-primary-container rounded-lg font-semibold shadow-sm transition cursor-pointer"
                >
                  🚚 ยืนยันการส่งมอบ
                </button>
              )}
            </div>
          </div>
        );
      }}
    </Modal>
  );
};

export default DetailModal;
