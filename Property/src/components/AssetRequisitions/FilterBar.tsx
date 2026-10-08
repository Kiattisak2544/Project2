import React from 'react';

interface FilterBarProps {
  departments: string[];
  filterDept: string;
  onDeptChange: (value: string) => void;
  filterStatus: string;
  onStatusChange: (value: string) => void;
  onReset: () => void;
}

const statusTabs = [
  { id: 'all', label: 'ทั้งหมด' },
  { id: 'pending', label: 'รออนุมัติ' },
  { id: 'approved', label: 'อนุมัติแล้ว' },
  { id: 'completed', label: 'ส่งมอบแล้ว' },
  { id: 'rejected', label: 'ยกเลิก' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  departments,
  filterDept,
  onDeptChange,
  filterStatus,
  onStatusChange,
  onReset,
}) => {
  const hasFilter = filterDept !== 'all' || filterStatus !== 'all';

  return (
    <div
      className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-3 animate-fade-up"
      style={{ animationDelay: '420ms' }}
    >
      {/* กรองตามแผนก */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500">แผนก:</span>
        <select
          value={filterDept}
          onChange={(e) => onDeptChange(e.target.value)}
          className="text-xs border border-slate-200 bg-slate-50 px-3 py-1.5 rounded-lg outline-none cursor-pointer transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-slate-300"
        >
          <option value="all">ทุกแผนก</option>
          {departments.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        {hasFilter && (
          <button
            type="button"
            onClick={onReset}
            className="text-[11px] text-rose-600 hover:text-rose-700 hover:underline px-1 cursor-pointer animate-fade-in"
          >
            ล้างตัวกรอง
          </button>
        )}
      </div>

      {/* ปุ่มแท็บเลือกสถานะ */}
      <div className="flex bg-slate-100 p-1 rounded-xl gap-1 text-xs overflow-x-auto">
        {statusTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onStatusChange(tab.id)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all duration-300 cursor-pointer ${
              filterStatus === tab.id
                ? 'bg-white text-blue-700 font-bold shadow-md shadow-slate-300/50 scale-105'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
