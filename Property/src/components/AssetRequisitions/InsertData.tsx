import React, { useState } from "react";
import { companies, type Requisition } from "./types";
import { formatDate } from "./status";
import Modal from "../ui/Modal";

interface InsertDataProps {
  onClose: () => void;
  onSave: (newItem: Requisition) => void;
}

const Department = [
  { label: "ฝ่ายไอที (IT)", value: "ฝ่ายไอที (IT)" },
  { label: "ฝ่ายบุคคล (HR)", value: "ฝ่ายบุคคล (HR)" },
  { label: "ฝ่ายการเงิน", value: "ฝ่ายการเงิน" },
  { label: "ฝ่ายการตลาด", value: "ฝ่ายการตลาด" },
  { label: "ฝ่ายสื่อสารองค์กร", value: "ฝ่ายสื่อสารองค์กร" },
  { label: "ฝ่ายออกแบบ", value: "ฝ่ายออกแบบ" },
  { label: "ฝ่ายบริหาร", value: "ฝ่ายบริหาร" },
];

const Category = [
  { label: "คอมพิวเตอร์พกพา", value: "คอมพิวเตอร์พกพา" },
  { label: "แท็บเล็ต", value: "แท็บเล็ต" },
  { label: "อุปกรณ์ต่อพ่วง", value: "อุปกรณ์ต่อพ่วง" },
  { label: "เฟอร์นิเจอร์", value: "เฟอร์นิเจอร์" },
  { label: "โสตทัศนูปกรณ์", value: "โสตทัศนูปกรณ์" },
  { label: "อุปกรณ์เครือข่าย", value: "อุปกรณ์เครือข่าย" },
];

const inputClass =
  "w-full px-3 py-2 border border-outline-variant/60 rounded-lg outline-none transition text-on-surface bg-surface-container-low/40 focus:bg-surface-container-lowest focus:border-secondary focus:ring-2 focus:ring-secondary/20 placeholder:text-outline";
const labelClass = "block text-on-surface font-semibold mb-1 text-xs";

const stagger = (i: number) => ({ className: "animate-fade-up", style: { animationDelay: `${100 + i * 50}ms` } });

export default function InsertData({ onClose, onSave }: InsertDataProps) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    dept: Department[0].value,
    company: companies[0],
    asset: "",
    category: Category[0].value,
    tag: "",
    type: "เบิกถาวร",
    dueDate: "",
    notes: "",
  });
  const [error, setError] = useState("");

  const set = (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setFormData({ ...formData, [field]: e.target.value });

  return (
    <Modal onClose={onClose} maxWidth="max-w-lg">
      {(close) => {
        const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          if (!formData.name.trim() || !formData.asset.trim()) {
            setError("กรุณากรอกทั้งชื่อผู้ขอเบิกและรายการสินทรัพย์");
            return;
          }

          const randomNum = Math.floor(1000 + Math.random() * 9000);
          const newRequisition: Requisition = {
            id: `REQ-2026-${randomNum}`,
            name: formData.name.trim(),
            role: formData.role || "พนักงาน",
            dept: formData.dept,
            company: formData.company,
            avatar: formData.name.trim().slice(0, 2),
            asset: formData.asset.trim(),
            category: formData.category,
            tag: formData.tag || `AST-GEN-${randomNum}`,
            date: formatDate(new Date()),
            dueDate: formData.type === "ยืมชั่วคราว" && formData.dueDate ? formData.dueDate : "-",
            type: formData.type,
            status: "pending",
            statusText: "รออนุมัติ",
            notes: formData.notes || undefined,
          };

          onSave(newRequisition);
          close();
        };

        return (
          <div className="bg-surface-container-lowest text-on-surface rounded-xl overflow-hidden shadow-xl border border-outline-variant/30">
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b border-outline-variant/30 bg-surface-container-low/40">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold shadow-2xs">
                  ＋
                </span>
                <div>
                  <h2 className="text-base font-bold text-on-surface">สร้างคำขอเบิกสินทรัพย์ใหม่</h2>
                  <p className="text-xs text-on-surface-variant">กรอกข้อมูลผู้ขอและรายละเอียดสินทรัพย์</p>
                </div>
              </div>
              <button
                onClick={close}
                type="button"
                className="w-8 h-8 text-on-surface-variant hover:text-on-surface rounded-lg hover:bg-surface-container transition flex items-center justify-center cursor-pointer"
                aria-label="ปิด"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
              {/* Requester & Role */}
              <div {...stagger(0)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>
                      ชื่อ-นามสกุล ผู้ขอเบิก <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="เช่น สมเกียรติ มั่นคง"
                      value={formData.name}
                      onChange={set("name")}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>ตำแหน่ง</label>
                    <input
                      type="text"
                      placeholder="เช่น วิศวกรซอฟต์แวร์"
                      value={formData.role}
                      onChange={set("role")}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Department & Company */}
              <div {...stagger(1)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>
                      แผนกสังกัด <span className="text-error">*</span>
                    </label>
                    <select value={formData.dept} onChange={set("dept")} className={inputClass}>
                      {Department.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>บริษัทในเครือ</label>
                    <select value={formData.company} onChange={set("company")} className={inputClass}>
                      {companies.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Asset & Category */}
              <div {...stagger(2)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass} htmlFor="assetname">
                      รายการสินทรัพย์ <span className="text-error">*</span>
                    </label>
                    <input
                      id="assetname"
                      type="text"
                      required
                      placeholder="เช่น Dell UltraSharp 27"
                      value={formData.asset}
                      onChange={set("asset")}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>หมวดหมู่</label>
                    <select value={formData.category} onChange={set("category")} className={inputClass}>
                      {Category.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Asset Tag & Type */}
              <div {...stagger(3)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>รหัสสินทรัพย์ (Asset Tag)</label>
                    <input
                      type="text"
                      placeholder="เช่น AST-IT-2026-0099"
                      value={formData.tag}
                      onChange={set("tag")}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>ประเภทการเบิก</label>
                    <select value={formData.type} onChange={set("type")} className={inputClass}>
                      <option value="เบิกถาวร">เบิกถาวร</option>
                      <option value="ยืมชั่วคราว">ยืมชั่วคราว</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Due Date if temporary */}
              {formData.type === "ยืมชั่วคราว" && (
                <div className="animate-fade-up">
                  <label className={labelClass}>กำหนดคืน</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={set("dueDate")}
                    className={inputClass}
                  />
                </div>
              )}

              {/* Notes */}
              <div {...stagger(4)}>
                <label className={labelClass}>วัตถุประสงค์ / หมายเหตุ</label>
                <textarea
                  rows={2}
                  placeholder="ระบุความจำเป็นในการใช้งาน..."
                  value={formData.notes}
                  onChange={set("notes")}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {error && (
                <p className="text-on-error-container bg-error-container border border-error/30 rounded-lg px-3 py-2 animate-pop-in">
                  {error}
                </p>
              )}

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-3 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={close}
                  className="px-4 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-semibold rounded-lg transition cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary-container hover:bg-primary text-on-primary font-semibold rounded-lg shadow-sm transition cursor-pointer"
                >
                  บันทึกคำขอ
                </button>
              </div>
            </form>
          </div>
        );
      }}
    </Modal>
  );
}
