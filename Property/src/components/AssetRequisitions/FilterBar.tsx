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
  { id: 'all', label: 'ทุกสถานะ' },
  { id: 'pending', label: 'รอดำเนินการ' },
  { id: 'approved', label: 'อนุมัติแล้ว' },
  { id: 'completed', label: 'ส่งมอบแล้ว' },
  { id: 'rejected', label: 'ปฏิเสธ' },
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
      className="bg-surface-container-lowest p-3 sm:p-4 rounded-xl border border-outline-variant/40 shadow-sm flex flex-wrap items-center justify-between gap-3 animate-fade-up"
      style={{ animationDelay: '420ms' }}
    >
      {/* Department Filter */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-on-surface-variant font-medium">แผนก:</span>
        <select
          value={filterDept}
          onChange={(e) => onDeptChange(e.target.value)}
          className="text-xs border border-outline-variant/50 bg-surface-container-low text-on-surface px-3 py-1.5 rounded-lg outline-none cursor-pointer transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
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
            className="text-[11px] text-secondary hover:underline px-1 cursor-pointer font-medium animate-fade-in"
          >
            ล้างตัวกรอง
          </button>
        )}
      </div>

      {/* Status Segmented Tabs */}
      <div className="flex bg-surface-container-low p-1 rounded-lg gap-1 text-xs overflow-x-auto">
        {statusTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onStatusChange(tab.id)}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-all duration-200 cursor-pointer ${
              filterStatus === tab.id
                ? 'bg-primary-container text-on-primary font-semibold shadow-2xs'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
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
