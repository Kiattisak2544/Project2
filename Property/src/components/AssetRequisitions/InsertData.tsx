import React, { useState } from "react";
import { companies, type Requisition } from "./types";
import { formatThaiDate } from "./status";
import Modal from "../ui/Modal";

interface InsertDataProps {
    onClose: () => void;
    onSave: (newItem: Requisition) => void;
}

const Department = [
    { label: "ฝ่ายไอที", value: "ฝ่ายไอที (IT)" },
    { label: "ฝ่ายบุคคล", value: "ฝ่ายบุคคล (HR)" },
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
    "w-full px-3 py-2 border border-slate-200 rounded-xl outline-none transition-all duration-200 text-slate-800 bg-white hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";
const labelClass = "block text-slate-700 font-medium mb-1";

// แสดงทีละช่องแบบไล่ลำดับ
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
                        setError("กรุณากรอกชื่อผู้ขอเบิกและรายการทรัพย์สิน");
                        return;
                    }

                    const randomNum = Math.floor(1000 + Math.random() * 9000);
                    const newRequisition: Requisition = {
                        id: `REQ-2026-${randomNum}`,
                        name: formData.name.trim(),
                        role: formData.role || "พนักงานทั่วไป",
                        dept: formData.dept,
                        company: formData.company,
                        avatar: formData.name.trim().slice(0, 2),
                        asset: formData.asset.trim(),
                        category: formData.category,
                        tag: formData.tag || `AST-GEN-${randomNum}`,
                        date: formatThaiDate(new Date()),
                        dueDate: formData.type === "ยืมชั่วคราว" && formData.dueDate ? formData.dueDate : "-",
                        type: formData.type,
                        status: "pending",
                        statusText: "รอการอนุมัติ",
                        notes: formData.notes || undefined,
                    };

                    onSave(newRequisition);
                    close();
                };

                return (
                    <div className="p-6">
                        {/* หัวข้อ Modal / Card */}
                        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <span className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
                                    ＋
                                </span>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-800">สร้างคำขอเบิกทรัพย์สิน</h2>
                                    <p className="text-xs text-slate-500 mt-0.5">กรอกข้อมูลเพื่อดำเนินการเบิกทรัพย์สินขององค์กร</p>
                                </div>
                            </div>
                            <button
                                onClick={close}
                                type="button"
                                className="w-8 h-8 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 hover:rotate-90 transition-all duration-300 cursor-pointer"
                                aria-label="ปิด"
                            >
                                ✕
                            </button>
                        </div>

                        {/* แบบฟอร์มกรอกข้อมูล */}
                        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
                            {/* ชื่อผู้ขอ & ตำแหน่ง */}
                            <div {...stagger(0)}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className={labelClass}>
                                            ชื่อ-นามสกุล ผู้ขอเบิก <span className="text-red-500">*</span>
                                        </label>
                                        <input type="text" required placeholder="เช่น สมชาย ใจดี" value={formData.name} onChange={set("name")} className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>ตำแหน่ง</label>
                                        <input type="text" placeholder="เช่น Frontend Developer" value={formData.role} onChange={set("role")} className={inputClass} />
                                    </div>
                                </div>
                            </div>

                            {/* แผนก & บริษัท */}
                            <div {...stagger(1)}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className={labelClass}>
                                            แผนกสังกัด <span className="text-red-500">*</span>
                                        </label>
                                        <select value={formData.dept} onChange={set("dept")} className={inputClass}>
                                            {Department.map((option) => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass}>บริษัท</label>
                                        <select value={formData.company} onChange={set("company")} className={inputClass}>
                                            {companies.map((c) => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* รายการทรัพย์สิน & หมวดหมู่ */}
                            <div {...stagger(2)}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className={labelClass} htmlFor="assetname">
                                            รายการทรัพย์สิน <span className="text-red-500">*</span>
                                        </label>
                                        <input id="assetname" type="text" required placeholder="เช่น Dell UltraSharp 27" value={formData.asset} onChange={set("asset")} className={inputClass} />
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

                            {/* รหัสทรัพย์สิน (Asset Tag) & ประเภทคำขอ */}
                            <div {...stagger(3)}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className={labelClass}>รหัสทรัพย์สิน (Asset Tag)</label>
                                        <input type="text" placeholder="เช่น AST-IT-2026-0099" value={formData.tag} onChange={set("tag")} className={inputClass} />
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

                            {/* กำหนดคืน (ถ้ายืม) */}
                            {formData.type === "ยืมชั่วคราว" && (
                                <div className="animate-fade-up">
                                    <label className={labelClass}>กำหนดคืน</label>
                                    <input type="date" value={formData.dueDate} onChange={set("dueDate")} className={inputClass} />
                                </div>
                            )}

                            {/* หมายเหตุ */}
                            <div {...stagger(4)}>
                                <label className={labelClass}>เหตุผลหรือหมายเหตุเพิ่มเติม</label>
                                <textarea rows={2} placeholder="ระบุวัตถุประสงค์การใช้งาน..." value={formData.notes} onChange={set("notes")} className={`${inputClass} resize-none`} />
                            </div>

                            {error && (
                                <p className="text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2 animate-pop-in">{error}</p>
                            )}

                            {/* ปุ่มบันทึก & ยกเลิก */}
                            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={close}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition cursor-pointer"
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    type="submit"
                                    className="shine px-5 py-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer"
                                >
                                    บันทึกคำขอเบิก
                                </button>
                            </div>
                        </form>
                    </div>
                );
            }}
        </Modal>
    );
}
