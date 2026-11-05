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
      {/* Mobile backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-inverse-surface/60 backdrop-blur-xs z-30 lg:hidden animate-fade-in"
          onClick={onCloseMenu}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 h-screen flex flex-col z-40 overflow-hidden text-on-surface-variant
          bg-surface-container-low border-r border-outline-variant/40 shadow-[0_1px_8px_rgba(0,0,0,0.04)]
          transition-[width,translate] duration-500 ease-out-expo ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-20 w-64' : 'w-64'}`}
      >
        {/* Header / Brand */}
        <div className="h-16 px-4 flex items-center justify-between bg-surface-container border-b border-outline-variant/40 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-primary-container text-on-primary font-bold flex items-center justify-center shrink-0 shadow-sm">
              EA
            </div>
            {!isCollapsed && (
              <div className="animate-fade-in whitespace-nowrap">
                <h2 className="text-sm font-bold text-primary leading-tight tracking-wide">Asset Core</h2>
                <span className="text-[11px] text-on-surface-variant font-mono leading-tight">การจัดการสินทรัพย์</span>
              </div>
            )}
          </div>

          {/* Close button for mobile */}
          <button
            className="lg:hidden p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition cursor-pointer"
            onClick={onCloseMenu}
            aria-label="ปิดเมนู"
          >
            ✕
          </button>
        </div>

        {/* Menu Navigation */}
        <nav className="p-3 flex-1 flex flex-col gap-1 overflow-y-auto text-xs font-medium">
          <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest px-3 py-2 h-8">
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
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-left cursor-pointer transition-all duration-200 animate-fade-up ${
                  active
                    ? 'bg-primary-container text-on-primary font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <span className={`text-base transition-transform duration-200 ${active ? 'scale-105' : 'group-hover:scale-105'}`}>
                  {item.icon}
                </span>
                {!isCollapsed && <span className="whitespace-nowrap font-medium">{item.label}</span>}
                {badge !== null &&
                  (isCollapsed ? (
                    <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-error" />
                  ) : (
                    <span
                      className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-5 text-center ${
                        active ? 'bg-white/20 text-on-primary' : 'bg-error text-on-error'
                      }`}
                    >
                      {badge}
                    </span>
                  ))}
              </button>
            );
          })}
        </nav>

        {/* Footer: Server Status & Current User */}
        <div className="p-3 border-t border-outline-variant/40 flex flex-col gap-2 shrink-0">
          {!isCollapsed && (
            <div className="bg-surface-container-lowest p-2.5 rounded-lg border border-outline-variant/30 shadow-[0_1px_4px_rgba(0,0,0,0.03)] flex flex-col gap-1 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant font-medium">สถานะเซิร์ฟเวอร์</span>
                <span className="inline-flex items-center gap-1 text-tertiary-container font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim inline-block animate-pulse" />
                  ออนไลน์
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant font-medium">สาขา</span>
                <span className="font-mono text-primary font-semibold">สำนักงานใหญ่</span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-surface-container-lowest border border-outline-variant/30">
            <div className="relative w-8 h-8 rounded-full bg-primary-fixed text-primary font-bold flex items-center justify-center text-xs shrink-0">
              {currentUser.avatar}
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-tertiary-fixed-dim ring-2 ring-surface-container-lowest" />
            </div>
            {!isCollapsed && (
              <div className="truncate text-xs animate-fade-in">
                <div className="font-semibold text-on-surface truncate">{currentUser.name}</div>
                <div className="text-[10px] text-on-surface-variant truncate">{currentUser.role}</div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
