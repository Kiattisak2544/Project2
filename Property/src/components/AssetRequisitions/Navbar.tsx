import React, { useState } from 'react';

interface NavbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onToggleMenu: () => void;
  onToggleCollapse: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  search,
  onSearchChange,
  onToggleMenu,
  onToggleCollapse,
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // ฟังก์ชันออกจากระบบ
  const handleLogout = () => {
    const isConfirm = window.confirm('คุณต้องการออกจากระบบ (Log out) ใช่หรือไม่?');
    if (isConfirm) {
      alert('ออกจากระบบเรียบร้อยแล้ว');
      setIsProfileOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
      {/* ฝั่งซ้าย: ปุ่ม Baker Menu (☰) + Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            if (window.innerWidth < 1024) {
              onToggleMenu();     // มือถือ: เปิด Drawer
            } else {
              onToggleCollapse(); // จอคอม: หด/ขยาย Sidebar
            }
          }}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200 transition"
          title="สลับเมนู (Baker Menu)"
        >
          ☰
        </button>

        <div className="text-xs text-slate-500 hidden sm:block">
          หน้าหลัก / จัดการทรัพย์สิน /{' '}
          <span className="font-bold text-slate-800">รายการเบิกทรัพย์สิน</span>
        </div>
      </div>

      {/* ฝั่งขวา: ช่องค้นหา + ส่วน Profile */}
      <div className="flex items-center gap-3">
        {/* ช่องค้นหาด่วน */}
        <div className="w-36 sm:w-64">
          <input
            type="text"
            placeholder="ค้นหาด่วน..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-blue-600 outline-none"
          />
        </div>

        {/* ส่วน Profile ผู้ใช้งาน และ เมนู Log out */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition text-left"
          >
            <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs shrink-0">
              นก
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <div className="text-xs font-semibold text-slate-800">นรินทร์</div>
              <div className="text-[10px] text-slate-400">Admin</div>
            </div>
            <span className="text-[10px] text-slate-400 hidden sm:inline">▼</span>
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
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-40 text-xs">
              <div className="px-3.5 py-2 border-b border-slate-100">
                <div className="font-semibold text-slate-900">นรินทร์ เกียรติสกุล</div>
                <div className="text-[11px] text-slate-400">narin.k@enterprise.co.th</div>
                <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-semibold rounded-full">
                  ผู้ดูแลระบบ (Admin)
                </span>
              </div>

              <div className="py-1">
                <button
                  type="button"
                  onClick={() => {
                    alert('เปิดหน้าข้อมูลส่วนตัว (My Profile)');
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 text-slate-600 hover:bg-slate-50 flex items-center gap-2.5"
                >
                  <span>👤</span>
                  <span>ข้อมูลส่วนตัว (Profile)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    alert('เปิดหน้าตั้งค่าบัญชี (Settings)');
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 text-slate-600 hover:bg-slate-50 flex items-center gap-2.5"
                >
                  <span>⚙️</span>
                  <span>การตั้งค่าบัญชี (Settings)</span>
                </button>
              </div>

              <div className="border-t border-slate-100 my-1" />

              {/* ปุ่ม Log out */}
              <button
                type="button"
                onClick={handleLogout}
                className="w-full text-left px-3.5 py-2 text-rose-600 hover:bg-rose-50 font-semibold flex items-center gap-2.5 transition"
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
