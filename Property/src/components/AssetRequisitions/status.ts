import type { Requisition, RepairRecord } from './types';

// ข้อความสถานะและสไตล์ Badge ของคำขอเบิกสินทรัพย์ (อิงโทเค็นการออกแบบ Google Stitch)
export const requisitionStatus: Record<Requisition['status'], { text: string; badge: string; dot: string }> = {
  pending: {
    text: 'รออนุมัติ',
    badge: 'bg-surface-container-high text-secondary border-outline-variant/60',
    dot: 'bg-secondary'
  },
  approved: {
    text: 'อนุมัติแล้ว',
    badge: 'bg-tertiary-fixed text-on-tertiary-fixed border-tertiary-fixed-dim/40',
    dot: 'bg-tertiary'
  },
  completed: {
    text: 'ส่งมอบแล้ว',
    badge: 'bg-primary-fixed text-primary border-primary-fixed-dim',
    dot: 'bg-primary'
  },
  rejected: {
    text: 'ปฏิเสธ',
    badge: 'bg-error-container text-on-error-container border-error/30',
    dot: 'bg-error'
  },
};

export const repairStatus: Record<RepairRecord['status'], { text: string; badge: string }> = {
  pending: {
    text: 'รอการตรวจสอบ',
    badge: 'bg-error-container text-on-error-container border-error/30'
  },
  in_progress: {
    text: 'กำลังดำเนินการ',
    badge: 'bg-secondary-fixed text-on-secondary-fixed border-secondary-fixed-dim'
  },
  completed: {
    text: 'ซ่อมแซมเสร็จสิ้น',
    badge: 'bg-tertiary-fixed text-on-tertiary-fixed border-tertiary-fixed-dim/40'
  },
};

// จัดรูปแบบวันที่ภาษาไทย เช่น "19 ก.ย. 2026"
export const formatDate = (date: Date) =>
  date.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
export const formatThaiDate = formatDate;
