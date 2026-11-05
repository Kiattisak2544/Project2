// =============================================
// ข้อมูลผู้ใช้ปัจจุบัน (จำลอง)
// =============================================
// ไฟล์นี้รวมศูนย์ข้อมูลของผู้ใช้ที่เข้าสู่ระบบในปัจจุบัน
// ใช้โดย Navbar, Sidebar และ Modal โปรไฟล์

export interface CurrentUser {
  name: string;
  role: string;
  dept: string;
  company: string;
  avatar: string;
  email: string;
}

export const currentUser: CurrentUser = {
  name: 'สมเกียรติ มั่นคง',
  role: 'ผู้ดูแลระบบสินทรัพย์ (Admin)',
  dept: 'แผนกไอที',
  company: 'บลู ทาวเวอร์',
  avatar: 'สม',
  email: 'somkiat.m@enterprise.co.th',
};
