import React from 'react';
import type { Requisition } from '../components/AssetRequisitions/types';

interface AssetCardProps {
  item: Requisition;
  onViewDetails: (item: Requisition) => void;
}

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

const AssetCard: React.FC<AssetCardProps> = ({ item, onViewDetails }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3">
      {/* Header: Asset tag + Status badge */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-bold text-blue-700">{item.id}</span>
        <span
          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadgeClass(item.status)}`}
        >
          {item.statusText}
        </span>
      </div>

      {/* Asset name & category */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 leading-tight">{item.asset}</h3>
        <p className="text-[11px] text-slate-400 mt-0.5">{item.category}</p>
      </div>

      {/* Info rows */}
      <div className="space-y-1.5 text-xs">
        <div className="flex justify-between">
          <span className="text-slate-400">รหัสแท็ก</span>
          <span className="font-mono text-slate-600">{item.tag}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">ผู้ขอเบิก</span>
          <span className="font-medium text-slate-800">{item.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">บริษัท</span>
          <span className="text-slate-600">{item.company}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">วันที่ขอ</span>
          <span className="text-slate-600">{item.date}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">กำหนดคืน</span>
          <span className="text-slate-600">{item.dueDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">ประเภท</span>
          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px]">{item.type}</span>
        </div>
      </div>

      {/* Action button */}
      <button
        onClick={() => onViewDetails(item)}
        className="mt-1 w-full py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition cursor-pointer"
      >
        ดูรายละเอียด
      </button>
    </div>
  );
};

export default AssetCard;
