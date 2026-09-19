import React from 'react';
import type { Requisition } from '../AssetRequisitions/types';

interface DetailModalProps {
  item: Requisition;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ item, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ส่วนหัว Modal */}
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <div>
            <span className="text-xs font-mono font-bold text-blue-700">{item.id}</span>
            <h3 className="text-base font-bold text-slate-800">รายละเอียดคำขอเบิก</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-lg p-1"
          >
            ✕
          </button>
        </div>

        {/* ข้อมูลรายละเอียด */}
        <div className="py-4 space-y-3 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400">ผู้ขอเบิก:</span>
            <span className="font-semibold text-slate-800">
              {item.name} ({item.dept})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">รายการทรัพย์สิน:</span>
            <span className="font-semibold text-slate-800">{item.asset}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">รหัสแท็ก:</span>
            <span className="font-mono text-blue-700">{item.tag}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">ประเภท:</span>
            <span className="text-slate-700">
              {item.type} (กำหนดคืน: {item.dueDate})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">สถานะ:</span>
            <span className="font-semibold">{item.statusText}</span>
          </div>
          {item.notes && (
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-600">
              <span className="font-bold text-slate-500">หมายเหตุ:</span> {item.notes}
            </div>
          )}
        </div>

        {/* ปุ่มด้านล่าง Modal */}
        <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition"
          >
            ปิด
          </button>
          <button
            onClick={() => {
              alert('บันทึกการอนุมัติเรียบร้อย');
              onClose();
            }}
            className="px-4 py-1.5 text-xs bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold transition"
          >
            ยืนยันคำขอ
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
