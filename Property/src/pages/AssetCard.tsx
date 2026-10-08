import React from 'react';
import type { Requisition } from '../components/AssetRequisitions/types';
import { requisitionStatus } from '../components/AssetRequisitions/status';

interface AssetCardProps {
  item: Requisition;
  onViewDetails: (item: Requisition) => void;
  delay?: number;
}

const AssetCard: React.FC<AssetCardProps> = ({ item, onViewDetails, delay = 0 }) => {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className="group relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 flex flex-col gap-3 animate-fade-up transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-900/10 hover:border-blue-200"
    >
      {/* แถบไล่สีด้านบน แสดงเมื่อ hover */}
      <span className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-blue-500 via-indigo-500 to-violet-500 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />

      {/* Header: Asset tag + Status badge */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-bold text-blue-700">{item.tag}</span>
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${requisitionStatus[item.status].badge}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${requisitionStatus[item.status].dot}`} />
          {item.statusText}
        </span>
      </div>

      {/* Asset name & category */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 leading-tight group-hover:text-blue-800 transition">{item.asset}</h3>
        <p className="text-[11px] text-slate-400 mt-0.5">{item.category}</p>
      </div>

      {/* Info rows */}
      <div className="space-y-1.5 text-xs">
        <div className="flex justify-between">
          <span className="text-slate-400">ผู้ครอบครอง</span>
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
        className="mt-auto w-full py-2 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-xl transition-all duration-300 cursor-pointer group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-blue-600/30"
      >
        ดูรายละเอียด →
      </button>
    </div>
  );
};

export default AssetCard;
