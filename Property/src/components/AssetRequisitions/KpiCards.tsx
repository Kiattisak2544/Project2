import React from 'react';
import type { Requisition } from './types';
import { useCountUp } from '../ui/useCountUp';

interface KpiCardsProps {
  requisitions: Requisition[];
  activeStatus?: string;
  onSelectStatus?: (status: string) => void;
}

interface KpiCardProps {
  label: string;
  value: number;
  footnote: string;
  icon: string;
  iconClass: string;
  badgeText: string;
  badgeClass: string;
  valueClass: string;
  active: boolean;
  delay: number;
  onClick?: () => void;
}

const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  footnote,
  icon,
  iconClass,
  badgeText,
  badgeClass,
  valueClass,
  active,
  delay,
  onClick,
}) => {
  const display = useCountUp(value);
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      style={{ animationDelay: `${delay}ms` }}
      className={`group relative overflow-hidden text-left bg-surface-container-lowest p-4 sm:p-5 rounded-xl border shadow-sm animate-fade-up transition-all duration-200 enabled:cursor-pointer enabled:hover:shadow-md ${active
        ? 'border-primary ring-2 ring-primary/20 bg-surface-container-lowest'
        : 'border-outline-variant/40 hover:border-outline-variant'
        }`}
    >
      <div className="relative flex items-start justify-between">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-semibold shadow-2xs ${iconClass}`}>
          {icon}
        </div>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm font-mono text-[11px] font-semibold ${badgeClass}`}>
          {badgeText}
        </span>
      </div>
      <div className="mt-3 flex flex-col">
        <span className="text-xs text-on-surface-variant font-medium">{label}</span>
        <div className={`text-2xl sm:text-3xl font-bold font-mono mt-1 tabular-nums ${valueClass}`}>
          {display.toLocaleString()}
        </div>
      </div>
      <div className="mt-2 text-[11px] text-on-surface-variant flex items-center justify-between">
        <span>{footnote}</span>
      </div>
    </button>
  );
};

export const KpiCards: React.FC<KpiCardsProps> = ({ requisitions, activeStatus, onSelectStatus }) => {
  const count = (status: Requisition['status']) => requisitions.filter((r) => r.status === status).length;
  const select = onSelectStatus ? (status: string) => () => onSelectStatus(activeStatus === status ? 'all' : status) : undefined;

  const cards = [
    {
      key: 'all',
      label: 'รายการขอเบิกทั้งหมด',
      value: requisitions.length,
      footnote: 'รายการทั้งหมดในระบบ',
      icon: '📋',
      iconClass: 'bg-surface-container text-primary',
      badgeText: '+3.2%',
      badgeClass: 'bg-surface-container text-primary',
      valueClass: 'text-on-surface',
    },
    {
      key: 'pending',
      label: 'รออนุมัติ',
      value: count('pending'),
      footnote: 'รอการตรวจสอบจากแอดมิน',
      icon: '⏳',
      iconClass: 'bg-surface-container-high text-secondary',
      badgeText: 'รอดำเนินการ',
      badgeClass: 'bg-surface-container-high text-secondary',
      valueClass: 'text-secondary',
    },
    {
      key: 'approved',
      label: 'อนุมัติแล้ว',
      value: count('approved'),
      footnote: 'พร้อมสำหรับการรับสินทรัพย์',
      icon: '✅',
      iconClass: 'bg-tertiary-fixed text-tertiary',
      badgeText: 'ปกติ',
      badgeClass: 'bg-tertiary-fixed text-on-tertiary-fixed',
      valueClass: 'text-tertiary-container',
    },
    {
      key: 'completed',
      label: 'ส่งมอบแล้ว',
      value: count('completed'),
      footnote: 'สินทรัพย์อยู่ระหว่างการใช้งาน',
      icon: '🚚',
      iconClass: 'bg-primary-fixed text-primary',
      badgeText: 'เสร็จสิ้น',
      badgeClass: 'bg-primary-fixed text-primary',
      valueClass: 'text-primary',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
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
