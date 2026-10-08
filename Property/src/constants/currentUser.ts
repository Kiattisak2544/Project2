// =============================================
// Current User Session (Simulated)
// =============================================
// This file centralizes the currently logged-in user's info.
// Used by Navbar, Sidebar and the profile modal.
// Replace this with real auth/session logic when available.

export interface CurrentUser {
  name: string;
  role: string;
  dept: string;
  company: string;
  avatar: string;
  email: string;
}

export const currentUser: CurrentUser = {
  name: 'นรินทร์ เกียรติสกุล',
  role: 'ผู้ดูแลระบบ (Admin)',
  dept: 'ฝ่ายไอที (IT)',
  company: 'ตึกน้ำเงิน',
  avatar: 'นก',
  email: 'narin.k@enterprise.co.th',
};
