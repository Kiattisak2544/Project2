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
      className="group relative overflow-hidden bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-xs p-5 flex flex-col gap-3 animate-fade-up transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-secondary/30"
    >
      {/* Accent top border bar on hover */}
      <span className="absolute inset-x-0 top-0 h-1 bg-secondary origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />

      {/* Header: Asset tag + Status badge */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-bold text-primary">{item.tag}</span>
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${requisitionStatus[item.status].badge}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${requisitionStatus[item.status].dot}`} />
          {requisitionStatus[item.status].text}
        </span>
      </div>

      {/* Asset name & category */}
      <div>
        <h3 className="text-sm font-bold text-on-surface leading-tight group-hover:text-primary transition">{item.asset}</h3>
        <p className="text-[11px] text-on-surface-variant mt-0.5">{item.category}</p>
      </div>

      {/* Info rows */}
      <div className="space-y-1.5 text-xs">
        <div className="flex justify-between">
          <span className="text-on-surface-variant">ผู้ครอบครอง</span>
          <span className="font-medium text-on-surface">{item.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-on-surface-variant">บริษัท</span>
          <span className="text-on-surface">{item.company}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-on-surface-variant">วันที่ขอ</span>
          <span className="text-on-surface">{item.date}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-on-surface-variant">กำหนดคืน</span>
          <span className="text-on-surface">{item.dueDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-on-surface-variant">ประเภท</span>
          <span className="px-2 py-0.5 bg-surface-container-low text-secondary rounded text-[11px]">{item.type}</span>
        </div>
      </div>

      {/* Action button */}
      <button
        onClick={() => onViewDetails(item)}
        className="mt-auto w-full py-2 text-xs font-semibold text-primary bg-surface-container-low border border-outline-variant/40 rounded-lg transition-all duration-200 cursor-pointer hover:bg-primary-container hover:text-white hover:border-transparent"
      >
        ดูรายละเอียด →
      </button>
    </div>
  );
};

export default AssetCard;
