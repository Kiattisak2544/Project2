import React from 'react';

interface SidebarProps {
  isMenuOpen: boolean;
  isCollapsed: boolean;
  onCloseMenu: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isMenuOpen,
  isCollapsed,
  onCloseMenu,
}) => {
  return (
    <>
      {/* ม่านดำพื้นหลัง เมื่อเปิดเมนูบนมือถือ */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-30 lg:hidden"
          onClick={onCloseMenu}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 h-screen bg-white border-r border-slate-200 flex flex-col z-40 transition-all duration-300 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-20' : 'w-64'}`}
      >
        {/* หัวข้อโลโก้ */}
        <div className="p-4 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-lg bg-blue-700 text-white font-bold flex items-center justify-center shrink-0">
              EA
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-sm font-bold text-slate-900 leading-tight">Asset Core</h2>
                <span className="text-xs text-slate-400">ระบบจัดการทรัพย์สิน</span>
              </div>
            )}
          </div>

          {/* ปุ่มกากบาทปิดเมนู (แสดงเฉพาะบนมือถือ) */}
          <button
            className="lg:hidden p-1 text-slate-400 hover:text-slate-600"
            onClick={onCloseMenu}
          >
            ✕
          </button>
        </div>

        {/* รายการปุ่มเมนู */}
        <nav className="p-3 flex-1 flex flex-col gap-1 overflow-y-auto text-xs font-medium">
          <div className="text-[11px] font-bold text-slate-400 uppercase px-2 py-1">
            {!isCollapsed && 'เมนูหลัก'}
          </div>

          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 w-full text-left">
            <span>📊</span>
            {!isCollapsed && <span>แดชบอร์ดภาพรวม</span>}
          </button>

          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 w-full text-left">
            <span>📦</span>
            {!isCollapsed && <span>ทะเบียนทรัพย์สิน</span>}
          </button>

          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-50 text-blue-700 font-semibold w-full text-left">
            <span>📝</span>
            {!isCollapsed && (
              <>
                <span>รายการเบิกทรัพย์สิน</span>
                <span className="ml-auto bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded-full">2</span>
              </>
            )}
          </button>

          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 w-full text-left">
            <span>🔄</span>
            {!isCollapsed && <span>ประวัติการโอนย้าย</span>}
          </button>

          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 w-full text-left">
            <span>🔧</span>
            {!isCollapsed && <span>ซ่อมบำรุง / ตรวจนับ</span>}
          </button>
        </nav>

        {/* ข้อมูลผู้ใช้งานด้านล่าง */}
        <div className="p-3 border-t border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-semibold flex items-center justify-center text-xs shrink-0">
              นก
            </div>
            {!isCollapsed && (
              <div className="truncate text-xs">
                <div className="font-semibold text-slate-800">นรินทร์ เกียรติสกุล</div>
                <div className="text-[10px] text-slate-400">Admin ผู้ดูแลระบบ</div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
