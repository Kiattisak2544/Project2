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

  const choose = (action: () => void) => () => {
    setIsProfileOpen(false);
    action();
  };

  return (
    <header className="sticky top-0 z-20 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/40 px-4 sm:px-8 py-3 flex items-center justify-between gap-4 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Left: Sidebar toggle button + Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => {
            if (window.innerWidth < 1024) {
              onToggleMenu();
            } else {
              onToggleCollapse();
            }
          }}
          className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary border border-outline-variant/50 transition-all active:scale-95 cursor-pointer"
          title="เปิด/ปิด เมนู"
        >
          ☰
        </button>

        <div className="text-xs text-on-surface-variant hidden sm:flex items-center gap-1.5 truncate">
          <span className="text-secondary font-medium">สำนักงานใหญ่ (อาคาร A)</span>
          <span className="text-outline-variant">/</span>
          <span>การจัดการสินทรัพย์</span>
          <span className="text-outline-variant">/</span>
          <span key={pageTitle} className="font-semibold text-primary inline-block animate-fade-up">
            {pageTitle}
          </span>
        </div>
      </div>

      {/* Right: Search, Date pill, Notifications & Profile */}
      <div className="flex items-center gap-3">
        {/* Quick Search */}
        <div className="relative w-36 sm:w-64 group">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xs transition group-focus-within:text-secondary">
            🔍
          </span>
          <input
            type="text"
            placeholder="ค้นหารายการ, แท็ก, ชื่อ..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-8 pr-7 py-2 text-xs bg-surface-container-lowest border border-outline-variant/60 rounded-lg outline-none text-on-surface placeholder:text-outline transition-all focus:border-secondary focus:ring-2 focus:ring-secondary/20"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface text-[10px] p-1 cursor-pointer animate-fade-in"
              aria-label="ล้างการค้นหา"
            >
              ✕
            </button>
          )}
        </div>

        {/* User Profile & Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-lg border border-outline-variant/50 bg-surface-container-lowest hover:bg-surface-container transition text-left cursor-pointer shadow-2xs"
          >
            <div className="w-7 h-7 rounded-full bg-primary-fixed text-primary font-bold flex items-center justify-center text-xs shrink-0">
              {currentUser.avatar}
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <div className="text-xs font-semibold text-on-surface">{currentUser.name.split(' ')[0]}</div>
              <div className="text-[10px] text-secondary font-medium">ผู้ดูแลระบบ</div>
            </div>
            <span
              className={`text-[10px] text-outline-variant hidden sm:inline transition-transform duration-200 ${
                isProfileOpen ? 'rotate-180' : ''
              }`}
            >
              ▼
            </span>
          </button>

          {/* Backdrop for closing dropdown */}
          {isProfileOpen && (
            <div
              className="fixed inset-0 z-30"
              onClick={() => setIsProfileOpen(false)}
            />
          )}

          {/* Profile Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-60 origin-top-right bg-surface-container-lowest rounded-xl shadow-xl ring-1 ring-outline-variant/40 py-2 z-40 text-xs animate-pop-in border border-outline-variant/30">
              <div className="px-3.5 py-2 border-b border-outline-variant/30">
                <div className="font-semibold text-on-surface">{currentUser.name}</div>
                <div className="text-[11px] text-on-surface-variant">{currentUser.email}</div>
                <span className="inline-block mt-1 px-2 py-0.5 bg-primary-fixed text-on-primary-fixed text-[10px] font-semibold rounded-sm">
                  {currentUser.role}
                </span>
              </div>

              <div className="py-1">
                <button
                  type="button"
                  onClick={choose(onOpenProfile)}
                  className="w-full text-left px-3.5 py-2 text-on-surface hover:bg-surface-container hover:pl-5 flex items-center gap-2.5 transition-all duration-150 cursor-pointer"
                >
                  <span>👤</span>
                  <span>โปรไฟล์ส่วนตัว</span>
                </button>

                <button
                  type="button"
                  onClick={choose(onOpenSettings)}
                  className="w-full text-left px-3.5 py-2 text-on-surface hover:bg-surface-container hover:pl-5 flex items-center gap-2.5 transition-all duration-150 cursor-pointer"
                >
                  <span>⚙️</span>
                  <span>ตั้งค่าบัญชี</span>
                </button>
              </div>

              <div className="border-t border-outline-variant/30 my-1" />

              <button
                type="button"
                onClick={choose(onLogout)}
                className="w-full text-left px-3.5 py-2 text-error hover:bg-error-container/40 hover:pl-5 font-semibold flex items-center gap-2.5 transition-all duration-150 cursor-pointer"
              >
                <span>🚪</span>
                <span>ออกจากระบบ</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
