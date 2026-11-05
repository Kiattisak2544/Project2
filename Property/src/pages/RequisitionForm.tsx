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

const COMPANIES = ['ตึกน้ำเงิน (Blue Tower)', 'ตึกน้ำเงิน สตีล', 'ฮาร์ดแวร์ เฮาส์', 'ตึกน้ำเงิน รีเทล'];

const DEPARTMENTS = [
  { label: 'ฝ่ายไอที (IT)', value: 'ฝ่ายไอที (IT)' },
  { label: 'ฝ่ายบุคคล (HR)', value: 'ฝ่ายบุคคล (HR)' },
  { label: 'ฝ่ายการเงิน', value: 'ฝ่ายการเงิน' },
  { label: 'ฝ่ายการตลาด', value: 'ฝ่ายการตลาด' },
  { label: 'ฝ่ายสื่อสารองค์กร', value: 'ฝ่ายสื่อสารองค์กร' },
  { label: 'ฝ่ายออกแบบ', value: 'ฝ่ายออกแบบ' },
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
      alert('กรุณากรอกรายการสินทรัพย์');
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
      statusText: 'รออนุมัติ',
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
      className="fixed inset-0 bg-on-surface/40 backdrop-blur-xs flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <div
        className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-outline-variant/40 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-outline-variant/30">
          <div>
            <h2 className="text-lg font-bold text-on-surface">
              สร้างคำขอเบิกสินทรัพย์
            </h2>
            <p className="text-xs text-on-surface-variant mt-0.5">
              กรอกข้อมูลเพื่อดำเนินการขอเบิกใช้อุปกรณ์ขององค์กร
            </p>
          </div>
          <button
            onClick={handleClose}
            type="button"
            className="text-on-surface-variant hover:text-on-surface p-1 text-lg rounded-lg hover:bg-surface-container transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          {/* Requester Name (auto-filled, read-only) */}
          <div className="bg-surface-container-low border border-outline-variant/40 rounded-xl p-3">
            <label className="block text-on-surface-variant font-medium mb-1">ผู้ขอเบิก (ดึงจากระบบอัตโนมัติ)</label>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center text-[10px] shrink-0">
                {currentUser.avatar}
              </div>
              <div>
                <div className="font-semibold text-on-surface">{currentUser.name}</div>
                <div className="text-[11px] text-on-surface-variant">
                  {currentUser.role} · {currentUser.dept}
                </div>
              </div>
            </div>
          </div>

          {/* Department & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-on-surface font-medium mb-1">
                แผนกสังกัด <span className="text-error">*</span>
              </label>
              <select
                value={formData.dept}
                onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                className="w-full px-3 py-2 border border-outline-variant/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-on-surface bg-surface-container-lowest"
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-on-surface font-medium mb-1">
                บริษัทในเครือ <span className="text-error">*</span>
              </label>
              <select
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-2 border border-outline-variant/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-on-surface bg-surface-container-lowest"
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
              <label className="block text-on-surface font-medium mb-1">
                รายการสินทรัพย์ <span className="text-error">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="เช่น จอภาพ Dell UltraSharp 27"
                value={formData.asset}
                onChange={(e) => setFormData({ ...formData, asset: e.target.value })}
                className="w-full px-3 py-2 border border-outline-variant/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-on-surface bg-surface-container-lowest"
              />
            </div>
            <div>
              <label className="block text-on-surface font-medium mb-1">หมวดหมู่</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-outline-variant/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-on-surface bg-surface-container-lowest"
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
              <label className="block text-on-surface font-medium mb-1">รหัสสินทรัพย์ (Asset Tag)</label>
              <input
                type="text"
                placeholder="เช่น AST-IT-2026-0099"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                className="w-full px-3 py-2 border border-outline-variant/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-on-surface bg-surface-container-lowest"
              />
            </div>
            <div>
              <label className="block text-on-surface font-medium mb-1">จำนวน</label>
              <input
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-3 py-2 border border-outline-variant/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-on-surface bg-surface-container-lowest"
              />
            </div>
          </div>

          {/* Type & Due date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-on-surface font-medium mb-1">ประเภทการเบิก</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-outline-variant/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-on-surface bg-surface-container-lowest"
              >
                <option value="เบิกถาวร">เบิกถาวร</option>
                <option value="ยืมชั่วคราว">ยืมชั่วคราว</option>
              </select>
            </div>

            {formData.type === 'ยืมชั่วคราว' && (
              <div>
                <label className="block text-on-surface font-medium mb-1">กำหนดคืน</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-3 py-2 border border-outline-variant/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-on-surface bg-surface-container-lowest"
                />
              </div>
            )}
          </div>

          {/* Reason / Notes */}
          <div>
            <label className="block text-on-surface font-medium mb-1">วัตถุประสงค์ในการขอเบิก</label>
            <textarea
              rows={2}
              placeholder="ระบุความจำเป็นในการใช้งาน..."
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full px-3 py-2 border border-outline-variant/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-on-surface bg-surface-container-lowest resize-none"
            />
          </div>

          {/* Request date (read-only info) */}
          <div className="bg-surface-container-low rounded-lg px-3 py-2 text-on-surface-variant flex items-center gap-2">
            <span>📅</span>
            <span>
              วันที่ขอเบิก:{' '}
              <span className="font-semibold text-on-surface">
                {new Date().toLocaleDateString('th-TH', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </span>
          </div>

          {/* Submit & Cancel */}
          <div className="flex justify-end gap-2 pt-4 border-t border-outline-variant/30">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-medium rounded-lg transition cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-primary hover:bg-primary-container text-white font-semibold rounded-lg shadow-xs transition cursor-pointer"
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
