import React from 'react';

export const KpiCards: React.FC = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <span className="text-xs text-slate-500">คำขอเบิกทั้งหมด</span>
        <div className="text-2xl font-bold text-slate-900 mt-1">1,284</div>
        <span className="text-[11px] text-emerald-600 font-medium">↑ +14% จากเดือนก่อน</span>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <span className="text-xs text-slate-500">รอการอนุมัติ</span>
        <div className="text-2xl font-bold text-amber-600 mt-1">18</div>
        <span className="text-[11px] text-amber-600 font-medium">รอดำเนินการด่วน 2 รายการ</span>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <span className="text-xs text-slate-500">อนุมัติแล้ว</span>
        <div className="text-2xl font-bold text-blue-700 mt-1">42</div>
        <span className="text-[11px] text-slate-400">พร้อมนัดรับอุปกรณ์</span>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <span className="text-xs text-slate-500">ส่งมอบสำเร็จเดือนนี้</span>
        <div className="text-2xl font-bold text-slate-900 mt-1">316</div>
        <span className="text-[11px] text-slate-400">ความพึงพอใจ 98.4%</span>
      </div>
    </div>
  );
};

export default KpiCards;
