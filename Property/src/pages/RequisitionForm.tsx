import React, { useState } from 'react';
import type { Requisition } from '../components/AssetRequisitions/types';
import { currentUser } from '../constants/currentUser';

interface RequisitionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newItem: Requisition) => void;
}

const CATEGORIES = [
  { label: 'คอมพิวเตอร์พกพา', value: 'คอมพิวเตอร์พกพา' },
  { label: 'แท็บเล็ต', value: 'แท็บเล็ต' },
  { label: 'อุปกรณ์ต่อพ่วง', value: 'อุปกรณ์ต่อพ่วง' },
  { label: 'เฟอร์นิเจอร์', value: 'เฟอร์นิเจอร์' },
  { label: 'โสตทัศนูปกรณ์', value: 'โสตทัศนูปกรณ์' },
  { label: 'อุปกรณ์เครือข่าย', value: 'อุปกรณ์เครือข่าย' },
];

const COMPANIES = ['ตึกน้ำเงิน', 'ตึกน้ำเงินสติล', 'ฮาร์ดแวร์ฌฮาส์', 'ตึกน้ำเงินรีเทล'];

const DEPARTMENTS = [
  { label: 'ฝ่ายไอที (IT)', value: 'ฝ่ายไอที (IT)' },
  { label: 'ฝ่ายบุคคล (HR)', value: 'ฝ่ายบุคคล (HR)' },
  { label: 'ฝ่ายการเงิน', value: 'ฝ่ายการเงิน' },
  { label: 'ฝ่ายการตลาด', value: 'ฝ่ายการตลาด' },
  { label: 'ฝ่ายออกแบบ (Design)', value: 'ฝ่ายออกแบบ (Design)' },
  { label: 'ฝ่ายบริหาร', value: 'ฝ่ายบริหาร' },
];

const initialFormState = {
  asset: '',
  category: 'คอมพิวเตอร์พกพา',
  tag: '',
  type: 'เบิกถาวร',
  dueDate: '',
  quantity: '1',
  reason: '',
  company: currentUser.company,
  dept: currentUser.dept,
};

const RequisitionForm: React.FC<RequisitionFormProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState(initialFormState);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.asset) {
      alert('กรุณากรอกรายการทรัพย์สิน');
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newRequisition: Requisition = {
      id: `REQ-2026-${randomNum}`,
      name: currentUser.name,
      role: currentUser.role,
      dept: formData.dept,
      company: formData.company,
      avatar: currentUser.avatar,
      asset: formData.asset,
      category: formData.category,
      tag: formData.tag || `AST-GEN-${randomNum}`,
      date: new Date().toLocaleDateString('th-TH', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      dueDate: formData.dueDate || 'ไม่ระบุ',
      type: formData.type,
      status: 'pending',
      statusText: 'รอการอนุมัติ',
      notes: formData.reason || undefined,
    };

    onSave(newRequisition);
    setFormData(initialFormState);
    onClose();
  };

  const handleClose = () => {
    setFormData(initialFormState);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              สร้างคำขอเบิกทรัพย์สิน
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              กรอกข้อมูลเพื่อดำเนินการเบิกทรัพย์สินขององค์กร
            </p>
          </div>
          <button
            onClick={handleClose}
            type="button"
            className="text-slate-400 hover:text-slate-600 p-1 text-lg rounded-lg hover:bg-slate-100 transition"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          {/* Requester Name (auto-filled, read-only) */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3">
            <label className="block text-slate-500 font-medium mb-1">ผู้ขอเบิก (ดึงจากระบบอัตโนมัติ)</label>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                {currentUser.avatar}
              </div>
              <div>
                <div className="font-semibold text-slate-800">{currentUser.name}</div>
                <div className="text-[11px] text-slate-400">
                  {currentUser.role} · {currentUser.dept}
                </div>
              </div>
            </div>
          </div>

          {/* Department & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                แผนกสังกัด <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.dept}
                onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 bg-white"
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                บริษัท <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 bg-white"
              >
                {COMPANIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Asset Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                รายการทรัพย์สิน <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="เช่น Dell UltraSharp 27"
                value={formData.asset}
                onChange={(e) => setFormData({ ...formData, asset: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">หมวดหมู่</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Asset Tag & Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-medium mb-1">รหัสทรัพย์สิน (Asset Tag)</label>
              <input
                type="text"
                placeholder="เช่น AST-IT-2026-0099"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">จำนวน</label>
              <input
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
            </div>
          </div>

          {/* Type & Due date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-medium mb-1">ประเภทการเบิก</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 bg-white"
              >
                <option value="เบิกถาวร">เบิกถาวร</option>
                <option value="ยืมชั่วคราว">ยืมชั่วคราว</option>
              </select>
            </div>

            {formData.type === 'ยืมชั่วคราว' && (
              <div>
                <label className="block text-slate-700 font-medium mb-1">กำหนดคืน</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                />
              </div>
            )}
          </div>

          {/* Reason / Notes */}
          <div>
            <label className="block text-slate-700 font-medium mb-1">เหตุผลในการขอเบิก</label>
            <textarea
              rows={2}
              placeholder="ระบุวัตถุประสงค์การใช้งาน..."
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 resize-none"
            />
          </div>

          {/* Request date (read-only info) */}
          <div className="bg-slate-50 rounded-lg px-3 py-2 text-slate-500 flex items-center gap-2">
            <span>📅</span>
            <span>
              วันที่ขอเบิก:{' '}
              <span className="font-semibold text-slate-700">
                {new Date().toLocaleDateString('th-TH', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </span>
          </div>

          {/* Submit & Cancel */}
          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-sm transition"
            >
              บันทึกคำขอเบิก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequisitionForm;
