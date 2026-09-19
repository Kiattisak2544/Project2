import React from 'react';

interface FilterBarProps {
  filterDept: string;
  onDeptChange: (value: string) => void;
  filterStatus: string;
  onStatusChange: (value: string) => void;
}

const statusTabs = [
  { id: 'all', label: 'ทั้งหมด' },
  { id: 'pending', label: 'รออนุมัติ' },
  { id: 'approved', label: 'อนุมัติแล้ว' },
  { id: 'completed', label: 'ส่งมอบแล้ว' },
  { id: 'rejected', label: 'ยกเลิก' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  filterDept,
  onDeptChange,
  filterStatus,
  onStatusChange,
}) => {
  return (
    <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
      {/* กรองตามแผนก */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500">แผนก:</span>
        <select
          value={filterDept}
          onChange={(e) => onDeptChange(e.target.value)}
          className="text-xs border border-slate-200 bg-slate-50 px-3 py-1.5 rounded-lg outline-none cursor-pointer"
        >
          <option value="all">ทุกแผนก</option>
          <option value="ไอที">ฝ่ายไอที (IT)</option>
          <option value="บุคคล">ฝ่ายบุคคล (HR)</option>
          <option value="การเงิน">ฝ่ายการเงิน</option>
          <option value="การตลาด">ฝ่ายการตลาด</option>
        </select>
      </div>

      {/* ปุ่มแท็บเลือกสถานะ */}
      <div className="flex bg-slate-100 p-1 rounded-lg gap-1 text-xs overflow-x-auto">
        {statusTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onStatusChange(tab.id)}
            className={`px-3 py-1 rounded-md whitespace-nowrap transition ${
              filterStatus === tab.id
                ? 'bg-white text-blue-700 font-bold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
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
