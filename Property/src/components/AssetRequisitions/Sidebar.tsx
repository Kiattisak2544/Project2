import React from 'react';
import { currentUser } from '../../constants/currentUser';
import { menuItems, type PageId } from './navigation';

interface SidebarProps {
  isMenuOpen: boolean;
  isCollapsed: boolean;
  activePage: PageId;
  pendingCount: number;
  onNavigate: (page: PageId) => void;
  onCloseMenu: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isMenuOpen,
  isCollapsed,
  activePage,
  pendingCount,
  onNavigate,
  onCloseMenu,
}) => {
  return (
    <>
      {/* ม่านดำพื้นหลัง เมื่อเปิดเมนูบนมือถือ */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-30 lg:hidden animate-fade-in"
          onClick={onCloseMenu}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 h-screen flex flex-col z-40 overflow-hidden text-slate-300
          bg-linear-to-b from-slate-950 via-[#0a1a4d] to-slate-950
          transition-[width,translate] duration-500 ease-out-expo ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-20 w-64' : 'w-64'}`}
      >
        {/* แสงฟุ้งตกแต่งพื้นหลัง */}
        <div className="pointer-events-none absolute -top-24 -left-20 w-64 h-64 rounded-full bg-blue-600/25 blur-3xl animate-float" />
        <div className="pointer-events-none absolute bottom-10 -right-24 w-56 h-56 rounded-full bg-indigo-500/15 blur-3xl animate-float [animation-delay:-3s]" />

        {/* หัวข้อโลโก้ */}
        <div className="relative p-4 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-11 h-11 rounded-xl bg-linear-to-br from-blue-500 via-indigo-500 to-violet-500 bg-[length:200%_200%] animate-gradient-pan text-white font-bold flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30">
              EA
            </div>
            {!isCollapsed && (
              <div className="animate-fade-in whitespace-nowrap">
                <h2 className="text-sm font-bold text-white leading-tight tracking-wide">Asset Core</h2>
                <span className="text-xs text-slate-400">ระบบจัดการทรัพย์สิน</span>
              </div>
            )}
          </div>

          {/* ปุ่มกากบาทปิดเมนู (แสดงเฉพาะบนมือถือ) */}
          <button
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
            onClick={onCloseMenu}
            aria-label="ปิดเมนู"
          >
            ✕
          </button>
        </div>

        {/* รายการปุ่มเมนู */}
        <nav className="relative p-3 flex-1 flex flex-col gap-1 overflow-y-auto text-xs font-medium">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 py-2 h-8">
            {!isCollapsed && 'เมนูหลัก'}
          </div>

          {menuItems.map((item, i) => {
            const active = item.id === activePage;
            const badge = item.id === 'requisitions' && pendingCount > 0 ? pendingCount : null;
            return (
              <button
                key={item.id}
                type="button"
                title={isCollapsed ? item.label : undefined}
                onClick={() => onNavigate(item.id)}
                style={{ animationDelay: `${80 + i * 60}ms` }}
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-left cursor-pointer transition-all duration-300 animate-fade-up ${
                  active
                    ? 'bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30'
                    : 'hover:bg-white/5 hover:text-white hover:translate-x-1'
                }`}
              >
                <span className={`text-base transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {item.icon}
                </span>
                {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
                {badge !== null &&
                  (isCollapsed ? (
                    <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-rose-500 animate-pulse-ring" />
                  ) : (
                    <span
                      className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-5 text-center ${
                        active ? 'bg-white/20 text-white' : 'bg-rose-500 text-white animate-pulse-ring'
                      }`}
                    >
                      {badge}
                    </span>
                  ))}
              </button>
            );
          })}
        </nav>

        {/* ข้อมูลผู้ใช้งานด้านล่าง */}
        <div className="relative p-3 border-t border-white/5">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5">
            <div className="relative w-9 h-9 rounded-full bg-linear-to-br from-blue-400 to-indigo-600 text-white font-semibold flex items-center justify-center text-xs shrink-0">
              {currentUser.avatar}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
            </div>
            {!isCollapsed && (
              <div className="truncate text-xs animate-fade-in">
                <div className="font-semibold text-white">{currentUser.name}</div>
                <div className="text-[10px] text-slate-400">{currentUser.role}</div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
