import React, { useState } from "react";
import type { Requisition } from "./types";

interface InsertDataProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newItem: Requisition) => void;
}

export default function InsertData({ isOpen, onClose, onSave }: InsertDataProps) {
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        dept: "ฝ่ายไอที (IT)",
        company: "",
        asset: "",
        category: "คอมพิวเตอร์พกพา",
        tag: "",
        type: "เบิกถาวร",
        dueDate: "",
        notes: "",
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.asset) {
            alert("กรุณากรอกชื่อผู้ขอเบิกและรายการทรัพย์สิน");
            return;
        }

        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const newRequisition: Requisition = {
            id: `REQ-2026-${randomNum}`,
            name: formData.name,
            role: formData.role || "พนักงานทั่วไป",
            dept: formData.dept,
            company: formData.company,
            avatar: formData.name.slice(0, 2),
            asset: formData.asset,
            category: formData.category,
            tag: formData.tag || `AST-GEN-${randomNum}`,
            date: new Date().toLocaleDateString("th-TH", {
                day: "numeric",
                month: "short",
                year: "numeric",
            }),
            dueDate: formData.dueDate || "ไม่ระบุ",
            type: formData.type,
            status: "pending",
            statusText: "รอการอนุมัติ",
            notes: formData.notes,
        };

        onSave(newRequisition);
        onClose();
    };

    const Department = [
        { label: "-- กรุณาเลือกแผนก --", value: "" },
        { label: "ฝ่ายไอที", value: "ฝ่ายไอที (IT)" },
        { label: "ฝ่ายบุคคล", value: "ฝ่ายบุคคล (HR)" },
        { label: "ฝ่ายการเงิน", value: "ฝ่ายการเงิน" },
        { label: "ฝ่ายการตลาด", value: "ฝ่ายการตลาด" },
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

    return (
        <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* หัวข้อ Modal / Card */}
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
                        onClick={onClose}
                        type="button"
                        className="text-slate-400 hover:text-slate-600 p-1 text-lg rounded-lg hover:bg-slate-100 transition"
                    >
                        ✕
                    </button>
                </div>

                {/* แบบฟอร์มกรอกข้อมูล */}
                <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
                    {/* ชื่อผู้ขอ & ตำแหน่ง */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-slate-700 font-medium mb-1">
                                ชื่อ-นามสกุล ผู้ขอเบิก <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="เช่น สมชาย ใจดี"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                            />
                        </div>
                        <div>
                            <label className="block text-slate-700 font-medium mb-1">
                                ตำแหน่ง
                            </label>
                            <input
                                type="text"
                                placeholder="เช่น Frontend Developer"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                            />
                        </div>
                    </div>

                    {/* แผนก */}
                    <div>
                        <label className="block text-slate-700 font-medium mb-1">
                            แผนกสังกัด <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.dept}
                            onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 bg-white"
                        >
                            {
                                Department.map(Option => (
                                    <option key={Option.value} value={Option.value}>{Option.label}</option>
                                ))
                            }
                        </select>
                    </div>

                    {/* รายการทรัพย์สิน & หมวดหมู่ */}
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-3">
                        <div className="border w-full h-full px-3 py-2 rounded-lg ">
                            <div className="w-full h-full">
                                <label className="block text-slate-700 font-medium mb-1 relative bottom-1/3 z-10 ">
                                    <span className="bg-white">รายการทรัพย์สิน</span> <span className="text-red-500">*</span>
                                </label>
                                {/* <input
                                    type="text"
                                    required
                                    placeholder="เช่น Dell UltraSharp 27"
                                    value={formData.asset}
                                    onChange={(e) => setFormData({ ...formData, asset: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                                /> */}
                                <label className="block text-slate-700 font-small relative" htmlFor="assetname">ชื่อทรัพย์สิน</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <input className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800" type="text" />
                                    <input className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800" type="text" />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* รหัสทรัพย์สิน (Asset Tag) & ประเภทคำขอ */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-slate-700 font-medium mb-1">
                                รหัสทรัพย์สิน (Asset Tag)
                            </label>
                            <input
                                type="text"
                                placeholder="เช่น AST-IT-2026-0099"
                                value={formData.tag}
                                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                            />
                        </div>
                        <div>
                            <label className="block text-slate-700 font-medium mb-1">
                                ประเภทการเบิก
                            </label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 bg-white"
                            >
                                <option value="เบิกถาวร">เบิกถาวร</option>
                                <option value="ยืมชั่วคราว">ยืมชั่วคราว</option>
                            </select>
                        </div>
                    </div>

                    {/* กำหนดคืน (ถ้ายืม) */}
                    {formData.type === "ยืมชั่วคราว" && (
                        <div>
                            <label className="block text-slate-700 font-medium mb-1">
                                กำหนดคืน
                            </label>
                            <input
                                type="date"
                                value={formData.dueDate}
                                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                            />
                        </div>
                    )}

                    {/* หมายเหตุ */}
                    <div>
                        <label className="block text-slate-700 font-medium mb-1">
                            เหตุผลหรือหมายเหตุเพิ่มเติม
                        </label>
                        <textarea
                            rows={2}
                            placeholder="ระบุวัตถุประสงค์การใช้งาน..."
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 resize-none"
                        />
                    </div>

                    {/* ปุ่มบันทึก & ยกเลิก */}
                    <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
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
}
