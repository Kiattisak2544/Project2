// Pages in the Corporate Asset Management System
export type PageId = 'dashboard' | 'assets' | 'requisitions' | 'transfers' | 'maintenance';

export const menuItems: { id: PageId; icon: string; label: string }[] = [
  { id: 'dashboard', icon: '📊', label: 'ภาพรวมแดชบอร์ด' },
  { id: 'assets', icon: '📦', label: 'ทะเบียนสินทรัพย์' },
  { id: 'requisitions', icon: '📝', label: 'การขอเบิกสินทรัพย์' },
  { id: 'transfers', icon: '🔄', label: 'ประวัติการโอนย้าย' },
  { id: 'maintenance', icon: '🔧', label: 'การบำรุงรักษาและบริการ' },
];

export const pageLabel = (id: PageId) => menuItems.find((m) => m.id === id)?.label ?? '';
