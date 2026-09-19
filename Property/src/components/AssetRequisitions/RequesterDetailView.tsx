import React, { useState } from 'react';
import type { Requisition, RepairRecord, CleaningRecord } from '../AssetRequisitions/types';

interface RequesterDetailViewProps {
  requesterName: string;
  requisitions: Requisition[];
  repairs: RepairRecord[];
  cleanings: CleaningRecord[];
  onBack: () => void;
  onSelectRequisition?: (item: Requisition) => void;
}

export const RequesterDetailView: React.FC<RequesterDetailViewProps> = ({
  requesterName,
  requisitions,
  repairs,
  cleanings,
  onBack,
  onSelectRequisition,
}) => {
  const [activeTab, setActiveTab] = useState<'requisitions' | 'repairs' | 'cleanings'>('requisitions');

  // ข้อมูลของบุคคลนี้
  const userRequisitions = requisitions.filter((r) => r.name === requesterName);
  const userRepairs = repairs.filter((r) => r.requesterName === requesterName);
  const userCleanings = cleanings.filter((c) => c.requesterName === requesterName);

  // ดึงข้อมูลโปรไฟล์เบื้องต้นจากรายการที่มี
  const sampleItem = userRequisitions[0];
  const role = sampleItem?.role || 'พนักงาน';
  const dept = sampleItem?.dept || 'ไม่ระบุแผนก';
  const avatar = sampleItem?.avatar || requesterName.slice(0, 2);

  // สถิติสรุป
  const totalRequisitions = userRequisitions.length;
  const totalRepairs = userRepairs.length;
  const totalCleanings = userCleanings.length;

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

  const getRepairBadgeClass = (status: RepairRecord['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'in_progress':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'pending':
        return 'bg-rose-50 text-rose-700 border-rose-200';
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 1. ปุ่มย้อนกลับและ Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-700 transition shadow-xs cursor-pointer"
        >
          <span>←</span>
          <span>กลับสู่หน้ารายการเบิก</span>
        </button>

        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <span>รายการเบิก</span>
          <span>/</span>
          <span className="text-slate-700 font-medium">ประวัติผู้ขอเบิก: {requesterName}</span>
        </div>
      </div>

      {/* 2. การ์ดโปรไฟล์ผู้ขอเบิกและสถิติกิจกรรม */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* ข้อมูลโปรไฟล์ส่วนตัว */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-xl flex items-center justify-center shadow-md shrink-0">
              {avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">{requesterName}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-100">
                  {dept}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                ตำแหน่ง: <span className="font-medium text-slate-700">{role}</span>
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                ตรวจสอบรายการทรัพย์สิน ประวัติการแจ้งซ่อม และประวัติการทำความสะอาด
              </p>
            </div>
          </div>

          {/* การ์ดสถิติ 3 ช่องแบบ Interactive */}
          <div className="grid grid-cols-3 gap-3 shrink-0">
            {/* สถิติ 1: รายการเบิก */}
            <button
              onClick={() => setActiveTab('requisitions')}
              className={`p-3 rounded-xl border text-left transition cursor-pointer ${activeTab === 'requisitions'
                ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-500/20'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
            >
              <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                <span>📦</span>
                <span>เบิกทรัพย์สิน</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-blue-700 mt-1">
                {totalRequisitions} <span className="text-xs font-normal text-slate-500">รายการ</span>
              </div>
            </button>

            {/* สถิติ 2: แจ้งซ่อม */}
            <button
              onClick={() => setActiveTab('repairs')}
              className={`p-3 rounded-xl border text-left transition cursor-pointer ${activeTab === 'repairs'
                ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-500/20'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
            >
              <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                <span>🔧</span>
                <span>ประวัติแจ้งซ่อม</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-amber-600 mt-1">
                {totalRepairs} <span className="text-xs font-normal text-slate-500">ครั้ง</span>
              </div>
            </button>

            {/* สถิติ 3: ทำความสะอาด */}
            <button
              onClick={() => setActiveTab('cleanings')}
              className={`p-3 rounded-xl border text-left transition cursor-pointer ${activeTab === 'cleanings'
                ? 'bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-500/20'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
            >
              <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                <span>🧼</span>
                <span>ทำความสะอาด</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-emerald-600 mt-1">
                {totalCleanings} <span className="text-xs font-normal text-slate-500">ครั้ง</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 3. แท็บควบคุมการแสดงผล */}
      <div className="flex border-b border-slate-200 text-xs font-semibold gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('requisitions')}
          className={`pb-3 px-3 transition border-b-2 flex items-center gap-2 cursor-pointer ${activeTab === 'requisitions'
            ? 'border-blue-600 text-blue-700'
            : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
        >
          <span>📦 รายการทรัพย์สินที่เบิก ({totalRequisitions})</span>
        </button>

        <button
          onClick={() => setActiveTab('repairs')}
          className={`pb-3 px-3 transition border-b-2 flex items-center gap-2 cursor-pointer ${activeTab === 'repairs'
            ? 'border-amber-600 text-amber-700'
            : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
        >
          <span>🔧 ประวัติการแจ้งซ่อม ({totalRepairs} ครั้ง)</span>
        </button>

        <button
          onClick={() => setActiveTab('cleanings')}
          className={`pb-3 px-3 transition border-b-2 flex items-center gap-2 cursor-pointer ${activeTab === 'cleanings'
            ? 'border-emerald-600 text-emerald-700'
            : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
        >
          <span>🧼 ประวัติการทำความสะอาด & บำรุงรักษา ({totalCleanings} ครั้ง)</span>
        </button>
      </div>

      {/* 4. เนื้อหาตามแท็บที่เลือก */}

      {/* TAB 1: ประวัติการเบิกทรัพย์สิน */}
      {activeTab === 'requisitions' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div>
              <h3 className="text-sm font-bold text-slate-800">รายการทรัพย์สินที่ {requesterName} ได้เบิกใช้งาน</h3>
              <p className="text-xs text-slate-500 mt-0.5">รวมทั้งรายการเบิกถาวรและยืมชั่วคราว</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-blue-100 text-blue-800 rounded-lg">
              {totalRequisitions} รายการ
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                  <th className="py-3 px-4">รหัสคำขอ</th>
                  <th className="py-3 px-4">รายการทรัพย์สิน</th>
                  <th className="py-3 px-4">รหัสแท็ก</th>
                  <th className="py-3 px-4">ประเภท</th>
                  <th className="py-3 px-4">วันที่ขอ</th>
                  <th className="py-3 px-4">กำหนดคืน</th>
                  <th className="py-3 px-4">สถานะ</th>
                  <th className="py-3 px-4 text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {userRequisitions.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-10 text-slate-400">
                      ไม่พบประวัติการเบิกทรัพย์สิน
                    </td>
                  </tr>
                ) : (
                  userRequisitions.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-4 font-bold text-blue-700 font-mono">{item.id}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-900">{item.asset}</div>
                        <div className="text-[11px] text-slate-400">{item.category}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-500">{item.tag}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px]">
                          {item.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">{item.date}</td>
                      <td className="py-3.5 px-4 text-slate-600">{item.dueDate}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${getStatusBadgeClass(
                            item.status
                          )}`}
                        >
                          {item.statusText}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {onSelectRequisition && (
                          <button
                            onClick={() => onSelectRequisition(item)}
                            className="px-2.5 py-1 border border-slate-200 rounded text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition text-xs font-medium cursor-pointer"
                          >
                            ดูรายละเอียด
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ประวัติการแจ้งซ่อม */}
      {activeTab === 'repairs' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div>
              <h3 className="text-sm font-bold text-slate-800">ประวัติการแจ้งซ่อมและแจ้งปัญหาอุปกรณ์</h3>
              <p className="text-xs text-slate-500 mt-0.5">บันทึกการส่งซ่อม สถานะการแก้ไข และช่างผู้รับผิดชอบ</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-lg">
              แจ้งซ่อม {totalRepairs} ครั้ง
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                  <th className="py-3 px-4">รหัสแจ้งซ่อม</th>
                  <th className="py-3 px-4">อุปกรณ์ที่แจ้ง</th>
                  <th className="py-3 px-4">อาการเสีย / ปัญหา</th>
                  <th className="py-3 px-4">วันที่แจ้ง</th>
                  <th className="py-3 px-4">ช่างผู้ดูแล</th>
                  <th className="py-3 px-4">สถานะ</th>
                  <th className="py-3 px-4">หมายเหตุช่าง</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {userRepairs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-slate-400">
                      ไม่พบประวัติการแจ้งซ่อมของบุคคลนี้
                    </td>
                  </tr>
                ) : (
                  userRepairs.map((repair) => (
                    <tr key={repair.id} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-amber-600">{repair.id}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800">{repair.asset}</div>
                        <div className="text-[11px] font-mono text-slate-400">{repair.tag}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 max-w-xs">{repair.issue}</td>
                      <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">{repair.reportDate}</td>
                      <td className="py-3.5 px-4 text-slate-700 font-medium">{repair.technician || '-'}</td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${getRepairBadgeClass(
                            repair.status
                          )}`}
                        >
                          {repair.statusText}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[11px] text-slate-500 max-w-xs">
                        {repair.notes || '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ประวัติการทำความสะอาด */}
      {activeTab === 'cleanings' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div>
              <h3 className="text-sm font-bold text-slate-800">ประวัติการทำความสะอาด & บำรุงรักษาอุปกรณ์</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                ประวัติการบำรุงรักษาอุปกรณ์เพื่อสุขอนามัยและยืดอายุการใช้งาน
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg">
                ทำความสะอาดไปแล้ว {totalCleanings} ครั้ง
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                  <th className="py-3 px-4">รหัสบันทึก</th>
                  <th className="py-3 px-4">รายการอุปกรณ์</th>
                  <th className="py-3 px-4">ประเภทการทำความสะอาด</th>
                  <th className="py-3 px-4">วันที่ทำ</th>
                  <th className="py-3 px-4">ผู้ดำเนินการ</th>
                  <th className="py-3 px-4">รอบทำความสะอาดถัดไป</th>
                  <th className="py-3 px-4">สถานะ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {userCleanings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-slate-400">
                      ไม่พบประวัติการทำความสะอาดของอุปกรณ์บุคคลนี้
                    </td>
                  </tr>
                ) : (
                  userCleanings.map((clean, index) => (
                    <tr key={clean.id} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-600">
                        {clean.id}
                        <span className="ml-1 text-[10px] text-slate-400 font-normal">
                          (ครั้งที่ {userCleanings.length - index})
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800">{clean.asset}</div>
                        <div className="text-[11px] font-mono text-slate-400">{clean.tag}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 font-medium">
                        <div className="flex items-center gap-1.5">
                          <span className="text-emerald-500">✨</span>
                          <span>{clean.serviceType}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">{clean.date}</td>
                      <td className="py-3.5 px-4 text-slate-600">{clean.performedBy}</td>
                      <td className="py-3.5 px-4 text-blue-700 font-medium whitespace-nowrap">
                        📅 {clean.nextScheduledDate}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold border bg-emerald-50 text-emerald-700 border-emerald-200">
                          {clean.statusText}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequesterDetailView;
