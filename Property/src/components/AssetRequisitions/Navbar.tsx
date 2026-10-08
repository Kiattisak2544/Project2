import React, { useState } from 'react';
import { currentUser } from '../../constants/currentUser';

interface NavbarProps {
  pageTitle: string;
  search: string;
  onSearchChange: (value: string) => void;
  onToggleMenu: () => void;
  onToggleCollapse: () => void;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  pageTitle,
  search,
  onSearchChange,
  onToggleMenu,
  onToggleCollapse,
  onOpenProfile,
  onOpenSettings,
  onLogout,
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // ปิด dropdown แล้วทำคำสั่งที่เลือก
  const choose = (action: () => void) => () => {
    setIsProfileOpen(false);
    action();
  };

  return (
    <header className="sticky top-0 z-20 glass border-b border-slate-200/70 px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
      {/* ฝั่งซ้าย: ปุ่ม Baker Menu (☰) + Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => {
            if (window.innerWidth < 1024) {
              onToggleMenu();     // มือถือ: เปิด Drawer
            } else {
              onToggleCollapse(); // จอคอม: หด/ขยาย Sidebar
            }
          }}
          className="p-2 rounded-xl text-slate-600 hover:bg-white hover:text-blue-700 hover:shadow-md border border-slate-200 transition-all duration-300 active:scale-90 cursor-pointer"
          title="สลับเมนู (Baker Menu)"
        >
          ☰
        </button>

        <div className="text-xs text-slate-500 hidden sm:block truncate">
          หน้าหลัก / จัดการทรัพย์สิน /{' '}
          <span key={pageTitle} className="font-bold text-slate-800 inline-block animate-fade-up">
            {pageTitle}
          </span>
        </div>
      </div>

      {/* ฝั่งขวา: ช่องค้นหา + ส่วน Profile */}
      <div className="flex items-center gap-3">
        {/* ช่องค้นหาด่วน */}
        <div className="relative w-36 sm:w-64 group">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs transition group-focus-within:text-blue-600">
            🔍
          </span>
          <input
            type="text"
            placeholder="ค้นหาด่วน..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-8 pr-7 py-2 text-xs bg-white/70 border border-slate-200 rounded-xl outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:shadow-lg"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-[10px] p-1 cursor-pointer animate-fade-in"
              aria-label="ล้างคำค้นหา"
            >
              ✕
            </button>
          )}
        </div>

        {/* ส่วน Profile ผู้ใช้งาน และ เมนู Log out */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-xl border border-slate-200 bg-white/70 hover:bg-white hover:shadow-md transition-all duration-300 text-left cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
              {currentUser.avatar}
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <div className="text-xs font-semibold text-slate-800">{currentUser.name.split(' ')[0]}</div>
              <div className="text-[10px] text-slate-400">Admin</div>
            </div>
            <span
              className={`text-[10px] text-slate-400 hidden sm:inline transition-transform duration-300 ${
                isProfileOpen ? 'rotate-180' : ''
              }`}
            >
              ▼
            </span>
          </button>

          {/* ฉากหลังใสสำหรับคลิกเพื่อปิดเมนู */}
          {isProfileOpen && (
            <div
              className="fixed inset-0 z-30"
              onClick={() => setIsProfileOpen(false)}
            />
          )}

          {/* เมนู Dropdown ของ Profile */}
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-60 origin-top-right bg-white rounded-2xl shadow-2xl shadow-slate-900/15 ring-1 ring-slate-900/5 py-2 z-40 text-xs animate-pop-in">
              <div className="px-3.5 py-2 border-b border-slate-100">
                <div className="font-semibold text-slate-900">{currentUser.name}</div>
                <div className="text-[11px] text-slate-400">{currentUser.email}</div>
                <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-semibold rounded-full">
                  {currentUser.role}
                </span>
              </div>

              <div className="py-1">
                <button
                  type="button"
                  onClick={choose(onOpenProfile)}
                  className="w-full text-left px-3.5 py-2 text-slate-600 hover:bg-slate-50 hover:pl-5 flex items-center gap-2.5 transition-all duration-200 cursor-pointer"
                >
                  <span>👤</span>
                  <span>ข้อมูลส่วนตัว (Profile)</span>
                </button>

                <button
                  type="button"
                  onClick={choose(onOpenSettings)}
                  className="w-full text-left px-3.5 py-2 text-slate-600 hover:bg-slate-50 hover:pl-5 flex items-center gap-2.5 transition-all duration-200 cursor-pointer"
                >
                  <span>⚙️</span>
                  <span>การตั้งค่าบัญชี (Settings)</span>
                </button>
              </div>

              <div className="border-t border-slate-100 my-1" />

              {/* ปุ่ม Log out */}
              <button
                type="button"
                onClick={choose(onLogout)}
                className="w-full text-left px-3.5 py-2 text-rose-600 hover:bg-rose-50 hover:pl-5 font-semibold flex items-center gap-2.5 transition-all duration-200 cursor-pointer"
              >
                <span>🚪</span>
                <span>ออกจากระบบ (Log out)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
