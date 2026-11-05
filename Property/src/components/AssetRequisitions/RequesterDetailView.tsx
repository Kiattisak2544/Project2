import React, { useState } from 'react';
import type { Requisition, RepairRecord, CleaningRecord } from './types';
import { requisitionStatus, repairStatus } from './status';

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

  const userRequisitions = requisitions.filter((r) => r.name === requesterName);
  const userRepairs = repairs.filter((r) => r.requesterName === requesterName);
  const userCleanings = cleanings.filter((c) => c.requesterName === requesterName);

  const sampleItem = userRequisitions[0];
  const role = sampleItem?.role || 'พนักงาน';
  const dept = sampleItem?.dept || 'ไม่ระบุแผนก';
  const avatar = sampleItem?.avatar || requesterName.slice(0, 2);

  const totalRequisitions = userRequisitions.length;
  const totalRepairs = userRepairs.length;
  const totalCleanings = userCleanings.length;

  const getStatusBadgeClass = (status: Requisition['status']) => requisitionStatus[status].badge;
  const getRepairBadgeClass = (status: RepairRecord['status']) => repairStatus[status].badge;

  return (
    <div className="flex flex-col gap-6 animate-fade-in text-on-surface">
      {/* Back button and Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-surface-container-lowest border border-outline-variant/50 rounded-lg text-xs font-semibold text-on-surface hover:bg-surface-container hover:text-primary transition shadow-2xs cursor-pointer"
        >
          <span>←</span>
          <span>กลับไปยังรายการขอเบิก</span>
        </button>

        <div className="text-xs text-on-surface-variant flex items-center gap-1.5">
          <span>การขอเบิก</span>
          <span className="text-outline-variant">/</span>
          <span className="text-on-surface font-medium">ประวัติรายบุคคล: {requesterName}</span>
        </div>
      </div>

      {/* Profile Card & Stats */}
      <div className="relative overflow-hidden bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-sm p-5 sm:p-6 animate-fade-up">
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Profile Details */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary-fixed text-primary font-bold text-xl flex items-center justify-center shrink-0 shadow-2xs">
              {avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-on-surface">{requesterName}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-primary-fixed text-on-primary-fixed border border-primary-fixed-dim">
                  {dept}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-1">
                ตำแหน่ง: <span className="font-medium text-on-surface">{role}</span>
              </p>
              <p className="text-[11px] text-outline mt-0.5">
                ประวัติการครอบครองสินทรัพย์ แจ้งซ่อมบำรุง และบันทึกการทำความสะอาด
              </p>
            </div>
          </div>

          {/* Interactive Stat Tiles */}
          <div className="grid grid-cols-3 gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('requisitions')}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                activeTab === 'requisitions'
                  ? 'bg-surface-container border-primary ring-2 ring-primary/20'
                  : 'bg-surface-container-low border-outline-variant/40 hover:bg-surface-container'
              }`}
            >
              <div className="text-[11px] text-on-surface-variant font-medium flex items-center gap-1">
                <span>📦</span>
                <span>สินทรัพย์</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-primary mt-1 font-mono">
                {totalRequisitions} <span className="text-xs font-normal text-on-surface-variant">รายการ</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('repairs')}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                activeTab === 'repairs'
                  ? 'bg-surface-container border-secondary ring-2 ring-secondary/20'
                  : 'bg-surface-container-low border-outline-variant/40 hover:bg-surface-container'
              }`}
            >
              <div className="text-[11px] text-on-surface-variant font-medium flex items-center gap-1">
                <span>🔧</span>
                <span>แจ้งซ่อม</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-secondary mt-1 font-mono">
                {totalRepairs} <span className="text-xs font-normal text-on-surface-variant">ครั้ง</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('cleanings')}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                activeTab === 'cleanings'
                  ? 'bg-surface-container border-tertiary ring-2 ring-tertiary/20'
                  : 'bg-surface-container-low border-outline-variant/40 hover:bg-surface-container'
              }`}
            >
              <div className="text-[11px] text-on-surface-variant font-medium flex items-center gap-1">
                <span>🧼</span>
                <span>บริการ</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-tertiary-container mt-1 font-mono">
                {totalCleanings} <span className="text-xs font-normal text-on-surface-variant">ครั้ง</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-outline-variant/40 text-xs font-semibold gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('requisitions')}
          className={`pb-3 px-3 transition border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === 'requisitions'
              ? 'border-primary text-primary'
              : 'border-transparent text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span>📦 สินทรัพย์ในครอบครอง ({totalRequisitions})</span>
        </button>

        <button
          onClick={() => setActiveTab('repairs')}
          className={`pb-3 px-3 transition border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === 'repairs'
              ? 'border-secondary text-secondary'
              : 'border-transparent text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span>🔧 บันทึกการแจ้งซ่อม ({totalRepairs})</span>
        </button>

        <button
          onClick={() => setActiveTab('cleanings')}
          className={`pb-3 px-3 transition border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === 'cleanings'
              ? 'border-tertiary text-tertiary-container'
              : 'border-transparent text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span>🧼 การทำความสะอาดและดูแล ({totalCleanings})</span>
        </button>
      </div>

      {/* Tab 1: Requisitions Table */}
      {activeTab === 'requisitions' && (
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-sm overflow-hidden animate-fade-up">
          <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low/40">
            <div>
              <h3 className="text-sm font-bold text-on-surface">สินทรัพย์ที่อยู่ในความครอบครองของ {requesterName}</h3>
              <p className="text-xs text-on-surface-variant">ครอบคลุมทั้งรายการเบิกใช้งานถาวรและยืมชั่วคราว</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-surface-container text-primary rounded-lg font-mono">
              {totalRequisitions} รายการ
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-surface-container border-b border-outline-variant/40 text-on-surface-variant font-semibold uppercase">
                  <th className="py-3 px-4">รหัสคำขอ</th>
                  <th className="py-3 px-4">รายละเอียดสินทรัพย์</th>
                  <th className="py-3 px-4">รหัสสินทรัพย์</th>
                  <th className="py-3 px-4">ประเภท</th>
                  <th className="py-3 px-4">วันที่ขอเบิก</th>
                  <th className="py-3 px-4">กำหนดคืน</th>
                  <th className="py-3 px-4">สถานะ</th>
                  <th className="py-3 px-4 text-center">ดำเนินการ</th>
                </tr>
              </thead>
              <tbody className="divide-y-0">
                {userRequisitions.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-10 text-outline">
                      ไม่พบประวัติการเบิกสินทรัพย์ของพนักงานท่านนี้
                    </td>
                  </tr>
                ) : (
                  userRequisitions.map((item, i) => (
                    <tr
                      key={item.id}
                      className={`hover:bg-surface-container/40 transition-colors animate-fade-up ${
                        i % 2 === 0 ? 'bg-surface-container-lowest' : 'bg-surface-container-low/50'
                      }`}
                    >
                      <td className="py-3.5 px-4 font-bold text-primary font-mono">{item.id}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-on-surface">{item.asset}</div>
                        <div className="text-[11px] text-on-surface-variant">{item.category}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-outline">{item.tag}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 bg-surface-container text-on-surface rounded text-[11px]">
                          {item.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-on-surface-variant">{item.date}</td>
                      <td className="py-3.5 px-4 text-on-surface-variant">{item.dueDate}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadgeClass(
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
                            className="px-2.5 py-1 border border-outline-variant/50 rounded-lg text-secondary hover:bg-surface-container hover:text-primary transition text-xs font-medium cursor-pointer shadow-2xs"
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

      {/* Tab 2: Repairs Table */}
      {activeTab === 'repairs' && (
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-sm overflow-hidden animate-fade-up">
          <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low/40">
            <div>
              <h3 className="text-sm font-bold text-on-surface">ประวัติการแจ้งซ่อมและบริการ</h3>
              <p className="text-xs text-on-surface-variant">รายการแจ้งซ่อม สถานะการแก้ไข และช่างผู้รับผิดชอบ</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-surface-container text-secondary rounded-lg font-mono">
              {totalRepairs} รายการ
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-surface-container border-b border-outline-variant/40 text-on-surface-variant font-semibold uppercase">
                  <th className="py-3 px-4">รหัสแจ้งซ่อม</th>
                  <th className="py-3 px-4">สินทรัพย์</th>
                  <th className="py-3 px-4">อาการเสีย</th>
                  <th className="py-3 px-4">วันที่แจ้ง</th>
                  <th className="py-3 px-4">ช่างผู้รับผิดชอบ</th>
                  <th className="py-3 px-4">สถานะ</th>
                  <th className="py-3 px-4">หมายเหตุ</th>
                </tr>
              </thead>
              <tbody className="divide-y-0">
                {userRepairs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-outline">
                      ไม่พบประวัติการแจ้งซ่อมของพนักงานท่านนี้
                    </td>
                  </tr>
                ) : (
                  userRepairs.map((repair, i) => (
                    <tr
                      key={repair.id}
                      className={`hover:bg-surface-container/40 transition-colors animate-fade-up ${
                        i % 2 === 0 ? 'bg-surface-container-lowest' : 'bg-surface-container-low/50'
                      }`}
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-secondary">{repair.id}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-on-surface">{repair.asset}</div>
                        <div className="text-[11px] font-mono text-outline">{repair.tag}</div>
                      </td>
                      <td className="py-3.5 px-4 text-on-surface max-w-xs">{repair.issue}</td>
                      <td className="py-3.5 px-4 text-on-surface-variant whitespace-nowrap">{repair.reportDate}</td>
                      <td className="py-3.5 px-4 text-on-surface font-medium">{repair.technician || '-'}</td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getRepairBadgeClass(
                            repair.status
                          )}`}
                        >
                          {repair.statusText}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[11px] text-on-surface-variant max-w-xs">
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

      {/* Tab 3: Cleanings Table */}
      {activeTab === 'cleanings' && (
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-sm overflow-hidden animate-fade-up">
          <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low/40">
            <div>
              <h3 className="text-sm font-bold text-on-surface">บันทึกการทำความสะอาดและสุขอนามัย</h3>
              <p className="text-xs text-on-surface-variant">การบำรุงรักษาเชิงป้องกันและการฆ่าเชื้อตามรอบเวลา</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-surface-container text-tertiary-container rounded-lg font-mono">
              {totalCleanings} ครั้ง
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-surface-container border-b border-outline-variant/40 text-on-surface-variant font-semibold uppercase">
                  <th className="py-3 px-4">รหัสบันทึก</th>
                  <th className="py-3 px-4">สินทรัพย์</th>
                  <th className="py-3 px-4">ประเภทบริการ</th>
                  <th className="py-3 px-4">วันที่ทำ</th>
                  <th className="py-3 px-4">ผู้ดำเนินการ</th>
                  <th className="py-3 px-4">รอบถัดไป</th>
                  <th className="py-3 px-4">สถานะ</th>
                </tr>
              </thead>
              <tbody className="divide-y-0">
                {userCleanings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-outline">
                      ไม่พบประวัติการทำความสะอาดของพนักงานท่านนี้
                    </td>
                  </tr>
                ) : (
                  userCleanings.map((clean, index) => (
                    <tr
                      key={clean.id}
                      className={`hover:bg-surface-container/40 transition-colors animate-fade-up ${
                        index % 2 === 0 ? 'bg-surface-container-lowest' : 'bg-surface-container-low/50'
                      }`}
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-tertiary-container">
                        {clean.id}
                        <span className="ml-1 text-[10px] text-outline font-normal">
                          (#{userCleanings.length - index})
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-on-surface">{clean.asset}</div>
                        <div className="text-[11px] font-mono text-outline">{clean.tag}</div>
                      </td>
                      <td className="py-3.5 px-4 text-on-surface font-medium">
                        <div className="flex items-center gap-1.5">
                          <span className="text-tertiary">✨</span>
                          <span>{clean.serviceType}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-on-surface-variant whitespace-nowrap">{clean.date}</td>
                      <td className="py-3.5 px-4 text-on-surface-variant">{clean.performedBy}</td>
                      <td className="py-3.5 px-4 text-secondary font-medium whitespace-nowrap">
                        📅 {clean.nextScheduledDate}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border bg-tertiary-fixed text-on-tertiary-fixed border-tertiary-fixed-dim/40">
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
