import type { Requisition, RepairRecord } from './types';

// ข้อความและสีของสถานะคำขอเบิก (ใช้ร่วมกันทุกหน้า)
export const requisitionStatus: Record<Requisition['status'], { text: string; badge: string; dot: string }> = {
  pending: { text: 'รอการอนุมัติ', badge: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  approved: { text: 'อนุมัติแล้ว', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  completed: { text: 'ส่งมอบแล้ว', badge: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
  rejected: { text: 'ยกเลิก', badge: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500' },
};

export const repairStatus: Record<RepairRecord['status'], { text: string; badge: string }> = {
  pending: { text: 'รอรับเรื่อง', badge: 'bg-rose-50 text-rose-700 border-rose-200' },
  in_progress: { text: 'กำลังซ่อมแซม', badge: 'bg-amber-50 text-amber-700 border-amber-200' },
  completed: { text: 'ซ่อมเสร็จสิ้น', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
};

// วันที่วันนี้ในรูปแบบเดียวกับข้อมูลจำลอง เช่น "8 ต.ค. 2569"
export const formatThaiDate = (date: Date) =>
  date.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
