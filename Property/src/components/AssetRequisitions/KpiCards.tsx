import React from 'react';
import type { Requisition } from './types';
import { useCountUp } from '../ui/useCountUp';

interface KpiCardsProps {
  requisitions: Requisition[];
  activeStatus?: string;
  /** ถ้าส่งมา การ์ดจะกดเพื่อกรองตามสถานะได้ */
  onSelectStatus?: (status: string) => void;
}

interface KpiCardProps {
  label: string;
  value: number;
  footnote: string;
  icon: string;
  gradient: string;
  valueClass: string;
  active: boolean;
  delay: number;
  onClick?: () => void;
}

const KpiCard: React.FC<KpiCardProps> = ({ label, value, footnote, icon, gradient, valueClass, active, delay, onClick }) => {
  const display = useCountUp(value);
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      style={{ animationDelay: `${delay}ms` }}
      className={`group relative overflow-hidden text-left bg-white p-4 sm:p-5 rounded-2xl border shadow-sm animate-fade-up transition-all duration-300 enabled:cursor-pointer enabled:hover:-translate-y-1 enabled:hover:shadow-xl enabled:hover:shadow-blue-900/10 ${
        active ? 'border-blue-400 ring-4 ring-blue-500/10' : 'border-slate-200/80'
      }`}
    >
      {/* วงแสงไล่สีมุมขวาบน */}
      <div
        className={`absolute -top-10 -right-10 w-28 h-28 rounded-full bg-linear-to-br ${gradient} opacity-10 blur-xl transition-all duration-500 group-hover:opacity-25 group-hover:scale-125`}
      />
      <div className="relative flex items-start justify-between">
        <span className="text-xs text-slate-500">{label}</span>
        <span
          className={`w-8 h-8 rounded-xl bg-linear-to-br ${gradient} text-white text-sm flex items-center justify-center shadow-md transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110`}
        >
          {icon}
        </span>
      </div>
      <div className={`relative text-2xl sm:text-3xl font-bold mt-1 tabular-nums ${valueClass}`}>
        {display.toLocaleString()}
      </div>
      <span className="relative text-[11px] text-slate-400">{footnote}</span>
    </button>
  );
};

export const KpiCards: React.FC<KpiCardsProps> = ({ requisitions, activeStatus, onSelectStatus }) => {
  const count = (status: Requisition['status']) => requisitions.filter((r) => r.status === status).length;
  const select = onSelectStatus ? (status: string) => () => onSelectStatus(activeStatus === status ? 'all' : status) : undefined;

  const cards = [
    { key: 'all', label: 'คำขอเบิกทั้งหมด', value: requisitions.length, footnote: 'ทุกสถานะในระบบ', icon: '📋', gradient: 'from-slate-600 to-slate-900', valueClass: 'text-slate-900' },
    { key: 'pending', label: 'รอการอนุมัติ', value: count('pending'), footnote: 'รอผู้ดูแลดำเนินการ', icon: '⏳', gradient: 'from-amber-400 to-orange-500', valueClass: 'text-amber-600' },
    { key: 'approved', label: 'อนุมัติแล้ว', value: count('approved'), footnote: 'พร้อมนัดรับอุปกรณ์', icon: '✅', gradient: 'from-emerald-400 to-teal-600', valueClass: 'text-emerald-600' },
    { key: 'completed', label: 'ส่งมอบสำเร็จ', value: count('completed'), footnote: 'ผู้ขอได้รับอุปกรณ์แล้ว', icon: '🚚', gradient: 'from-blue-500 to-indigo-600', valueClass: 'text-blue-700' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cards.map(({ key, ...c }, i) => (
        <KpiCard
          key={key}
          {...c}
          delay={100 + i * 80}
          active={!!onSelectStatus && activeStatus === key && key !== 'all'}
          onClick={select?.(key)}
        />
      ))}
    </div>
  );
};

export default KpiCards;
