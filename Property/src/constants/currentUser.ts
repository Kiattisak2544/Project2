// =============================================
// Current User Session (Simulated)
// =============================================
// This file centralizes the currently logged-in user's info.
// It mirrors the hardcoded values in Navbar.tsx and Sidebar.tsx.
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
  name: 'admin',
  role: 'Admin',
  dept: 'ฝ่ายไอที (IT)',
  company: 'ตึกน้ำเงิน',
  avatar: 'am',
  email: 'narin.k@enterprise.co.th',
};
