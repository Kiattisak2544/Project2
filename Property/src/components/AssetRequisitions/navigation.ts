// หน้าทั้งหมดในระบบ และเมนูบน Sidebar
export type PageId = 'dashboard' | 'assets' | 'requisitions' | 'transfers' | 'maintenance';

export const menuItems: { id: PageId; icon: string; label: string }[] = [
  { id: 'dashboard', icon: '📊', label: 'แดชบอร์ดภาพรวม' },
  { id: 'assets', icon: '📦', label: 'ทะเบียนทรัพย์สิน' },
  { id: 'requisitions', icon: '📝', label: 'รายการเบิกทรัพย์สิน' },
  { id: 'transfers', icon: '🔄', label: 'ประวัติการโอนย้าย' },
  { id: 'maintenance', icon: '🔧', label: 'ซ่อมบำรุง / ตรวจนับ' },
];

export const pageLabel = (id: PageId) => menuItems.find((m) => m.id === id)?.label ?? '';
