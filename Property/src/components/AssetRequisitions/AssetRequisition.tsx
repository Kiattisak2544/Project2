import { useState } from "react";
import {
  mockData,
  mockRepairData,
  mockCleaningData,
  type Requisition,
  type RepairRecord,
  type CleaningRecord,
} from './types';
import { requisitionStatus, repairStatus, formatThaiDate } from './status';
import { pageLabel, type PageId } from './navigation';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import KpiCards from './KpiCards';
import FilterBar from './FilterBar';
import RequisitionTable from './RequisitionTable';
import DetailModal from './DetailModal';
import InsertData from './InsertData';
import RequesterDetailView from './RequesterDetailView';
import { ProfileModal, SettingsModal, LogoutModal, type Settings } from './AccountModals';
import ToastViewport from '../ui/Toast';
import { useToast } from '../ui/useToast';
import PageHeader from '../../pages/PageHeader';
import Dashboard from '../../pages/Dashboard';
import AssetRegister from '../../pages/AssetRegister';
import TransferHistory from '../../pages/TransferHistory';
import Maintenance from '../../pages/Maintenance';

type ModalName = 'insert' | 'profile' | 'settings' | 'logout' | null;

export default function AssetRequisition() {
  // --- ตัวแปร State ที่ใช้ในหน้านี้ ---
  const [requisitions, setRequisitions] = useState<Requisition[]>(mockData); // รายการคำขอทั้งหมด
  const [repairs, setRepairs] = useState<RepairRecord[]>(mockRepairData); // ประวัติการแจ้งซ่อม
  const [cleanings, setCleanings] = useState<CleaningRecord[]>(mockCleaningData); // ประวัติทำความสะอาด

  const [activePage, setActivePage] = useState<PageId>('requisitions'); // หน้าที่เปิดอยู่
  const [openModal, setOpenModal] = useState<ModalName>(null);       // หน้าต่างป๊อปอัปที่เปิดอยู่
  const [search, setSearch] = useState('');                 // คำค้นหา
  const [filterStatus, setFilterStatus] = useState('all');  // สถานะที่เลือก
  const [filterDept, setFilterDept] = useState('all');      // แผนกที่เลือก
  const [selectedItem, setSelectedItem] = useState<Requisition | null>(null); // ไอเทมที่กดดู Popup
  const [selectedRequesterName, setSelectedRequesterName] = useState<string | null>(null); // ชื่อผู้ขอที่เลือกดูประวัติรายคน
  const [isMenuOpen, setIsMenuOpen] = useState(false);       // เปิด/ปิด Baker Menu บนมือถือ
  const [isCollapsed, setIsCollapsed] = useState(false);     // ย่อ/ขยาย Sidebar บนจอคอม
  const [settings, setSettings] = useState<Settings>({ reduceMotion: false, showToasts: true });
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const { toasts, notify: pushToast, dismiss } = useToast();
  const notify: typeof pushToast = (message, tone) => {
    if (settings.showToasts) pushToast(message, tone);
  };

  // --- การนำทาง ---
  const navigate = (page: PageId) => {
    setActivePage(page);
    setSelectedRequesterName(null);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showRequisitionsWithStatus = (status: string) => {
    setFilterStatus(status);
    navigate('requisitions');
  };

  const openRequester = (name: string) => {
    setActivePage('requisitions');
    setSelectedRequesterName(name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- การแก้ไขข้อมูล ---
  const updateRequisitionStatus = (id: string, status: Requisition['status']) => {
    setRequisitions((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status, statusText: requisitionStatus[status].text } : r))
    );
    const messages: Partial<Record<Requisition['status'], [string, 'success' | 'error']>> = {
      approved: [`อนุมัติคำขอ ${id} เรียบร้อย`, 'success'],
      rejected: [`ปฏิเสธคำขอ ${id} แล้ว`, 'error'],
      completed: [`บันทึกการส่งมอบ ${id} เรียบร้อย`, 'success'],
    };
    const msg = messages[status];
    if (msg) notify(msg[0], msg[1]);
  };

  const advanceRepair = (id: string) => {
    setRepairs((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const next: RepairRecord['status'] = r.status === 'pending' ? 'in_progress' : 'completed';
        return {
          ...r,
          status: next,
          statusText: repairStatus[next].text,
          completedDate: next === 'completed' ? formatThaiDate(new Date()) : r.completedDate,
        };
      })
    );
    notify(`อัปเดตสถานะงานซ่อม ${id} แล้ว`);
  };

  const logCleaning = (source: CleaningRecord) => {
    const today = new Date();
    const nextRound = new Date(today);
    nextRound.setMonth(nextRound.getMonth() + 3);
    const record: CleaningRecord = {
      ...source,
      id: `CLN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: formatThaiDate(today),
      nextScheduledDate: formatThaiDate(nextRound),
      status: 'completed',
      statusText: 'ทำความสะอาดแล้ว',
    };
    setCleanings((prev) => [record, ...prev]);
    notify(`บันทึกการทำความสะอาด ${source.asset} แล้ว`);
  };

  // --- กรองข้อมูลตามเงื่อนไข (Search & Filters) ---
  const filteredList = requisitions.filter((item) => {
    const q = search.toLowerCase();
    const matchSearch =
      item.id.toLowerCase().includes(q) ||
      item.name.toLowerCase().includes(q) ||
      item.asset.toLowerCase().includes(q) ||
      item.tag.toLowerCase().includes(q);

    const matchStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchDept = filterDept === 'all' || item.dept === filterDept;

    return matchSearch && matchStatus && matchDept;
  });

  const departments = [...new Set(requisitions.map((r) => r.dept))];
  const pendingCount = requisitions.filter((r) => r.status === 'pending').length;
  const motionClass = settings.reduceMotion ? 'reduce-motion' : '';

  // --- หน้าจอหลังออกจากระบบ ---
  if (isLoggedOut) {
    return (
      <div className={`${motionClass} min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-slate-950 via-[#0a1a4d] to-indigo-950 relative overflow-hidden`}>
        <div className="pointer-events-none absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl animate-float" />
        <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-violet-600/20 blur-3xl animate-float [animation-delay:-3s]" />
        <div className="relative w-full max-w-sm rounded-3xl bg-white/10 ring-1 ring-white/15 backdrop-blur-xl p-8 text-center text-white shadow-2xl animate-scale-in">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-linear-to-br from-blue-500 via-indigo-500 to-violet-500 bg-[length:200%_200%] animate-gradient-pan flex items-center justify-center font-bold shadow-lg shadow-blue-500/40">
            EA
          </div>
          <h1 className="mt-5 text-lg font-bold">ออกจากระบบเรียบร้อยแล้ว</h1>
          <p className="mt-1 text-xs text-slate-300">ขอบคุณที่ใช้งาน Asset Core</p>
          <button
            type="button"
            onClick={() => {
              setIsLoggedOut(false);
              notify('เข้าสู่ระบบอีกครั้งเรียบร้อย', 'info');
            }}
            className="shine mt-6 w-full py-2.5 rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 text-sm font-semibold shadow-lg shadow-blue-600/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            เข้าสู่ระบบอีกครั้ง
          </button>
        </div>
        <ToastViewport toasts={toasts} onDismiss={dismiss} />
      </div>
    );
  }

  return (
    <div className={`${motionClass} flex min-h-screen bg-slate-50 text-slate-800 font-sans relative`}>
      {/* พื้นหลังไล่สีจาง ๆ */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(60rem_30rem_at_100%_-10%,rgb(99_102_241/0.10),transparent),radial-gradient(40rem_25rem_at_0%_110%,rgb(59_130_246/0.08),transparent)]" />

      {/* 1. เมนูแถบด้านข้าง (Sidebar) */}
      <Sidebar
        isMenuOpen={isMenuOpen}
        isCollapsed={isCollapsed}
        activePage={activePage}
        pendingCount={pendingCount}
        onNavigate={navigate}
        onCloseMenu={() => setIsMenuOpen(false)}
      />

      {/* 2. พื้นที่เนื้อหาหลัก (Main Content) */}
      <div className="relative flex-1 flex flex-col min-w-0">
        {/* แถบด้านบน (Navbar พร้อมปุ่ม Baker Menu และ Profile Log out) */}
        <Navbar
          pageTitle={pageLabel(activePage)}
          search={search}
          onSearchChange={setSearch}
          onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
          onOpenProfile={() => setOpenModal('profile')}
          onOpenSettings={() => setOpenModal('settings')}
          onLogout={() => setOpenModal('logout')}
        />

        {/* เนื้อหาหน้าเว็บ (key ทำให้เล่นแอนิเมชันใหม่ทุกครั้งที่เปลี่ยนหน้า) */}
        <main key={`${activePage}-${selectedRequesterName ?? ''}`} className="p-4 sm:p-8 max-w-7xl w-full mx-auto flex flex-col gap-6">
          {activePage === 'dashboard' && (
            <Dashboard
              requisitions={requisitions}
              repairs={repairs}
              onNavigate={navigate}
              onShowStatus={showRequisitionsWithStatus}
              onCreate={() => setOpenModal('insert')}
              onSelect={setSelectedItem}
            />
          )}

          {activePage === 'assets' && (
            <AssetRegister requisitions={requisitions} search={search} onSelect={setSelectedItem} />
          )}

          {activePage === 'transfers' && (
            <TransferHistory requisitions={requisitions} search={search} onSelect={setSelectedItem} />
          )}

          {activePage === 'maintenance' && (
            <Maintenance
              repairs={repairs}
              cleanings={cleanings}
              search={search}
              onAdvanceRepair={advanceRepair}
              onLogCleaning={logCleaning}
              onSelectRequester={openRequester}
            />
          )}

          {activePage === 'requisitions' &&
            (selectedRequesterName ? (
              /* เมื่อผู้ใช้คลิกชื่อผู้ขอเบิก จะแสดงหน้ารายละเอียดของบุคคลนั้น */
              <RequesterDetailView
                requesterName={selectedRequesterName}
                requisitions={requisitions}
                repairs={repairs}
                cleanings={cleanings}
                onBack={() => setSelectedRequesterName(null)}
                onSelectRequisition={(item) => setSelectedItem(item)}
              />
            ) : (
              /* หน้ารายการเบิกทรัพย์สินหลัก */
              <>
                {/* ส่วนหัวเรื่อง + ปุ่มสร้างคำขอ */}
                <PageHeader
                  title="รายการเบิกทรัพย์สิน (Asset Requisitions)"
                  subtitle={
                    <>
                      ตรวจสอบ ติดตามสถานะ และดำเนินการอนุมัติคำขอเบิกทรัพย์สินขององค์กร (สามารถคลิกที่{' '}
                      <span className="font-semibold text-blue-700">ชื่อผู้ขอเบิก</span> เพื่อดูประวัติรายบุคคลได้)
                    </>
                  }
                  action={
                    <button
                      onClick={() => setOpenModal('insert')}
                      className="shine px-4 py-2.5 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/40 active:scale-95 transition-all duration-200 cursor-pointer"
                    >
                      + สร้างคำขอเบิกทรัพย์สิน
                    </button>
                  }
                />

                {/* การ์ดสรุปตัวเลข 4 ช่อง (กดเพื่อกรองสถานะ) */}
                <KpiCards requisitions={requisitions} activeStatus={filterStatus} onSelectStatus={setFilterStatus} />

                {/* แถบฟิลเตอร์ค้นหาและเลือกสถานะ */}
                <FilterBar
                  departments={departments}
                  filterDept={filterDept}
                  onDeptChange={setFilterDept}
                  filterStatus={filterStatus}
                  onStatusChange={setFilterStatus}
                  onReset={() => {
                    setFilterDept('all');
                    setFilterStatus('all');
                  }}
                />

                {/* ตารางแสดงข้อมูลรายการเบิก */}
                <RequisitionTable
                  items={filteredList}
                  totalCount={requisitions.length}
                  onSelect={(item) => setSelectedItem(item)}
                  onSelectRequester={(name) => setSelectedRequesterName(name)}
                />
              </>
            ))}
        </main>
      </div>

      {/* 3. หน้าต่างป๊อปอัปดูรายละเอียด (Modal) */}
      {selectedItem && (
        <DetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onUpdateStatus={updateRequisitionStatus}
        />
      )}

      {/* 4. หน้าต่างการ์ดเพิ่มข้อมูล (Insert Data Card) และเมนูบัญชี */}
      {openModal === 'insert' && (
        <InsertData
          onClose={() => setOpenModal(null)}
          onSave={(newItem) => {
            setRequisitions((prev) => [newItem, ...prev]);
            notify(`สร้างคำขอ ${newItem.id} เรียบร้อย`);
          }}
        />
      )}
      {openModal === 'profile' && <ProfileModal onClose={() => setOpenModal(null)} />}
      {openModal === 'settings' && (
        <SettingsModal settings={settings} onChange={setSettings} onClose={() => setOpenModal(null)} />
      )}
      {openModal === 'logout' && (
        <LogoutModal
          onClose={() => setOpenModal(null)}
          onConfirm={() => {
            setOpenModal(null);
            setIsLoggedOut(true);
          }}
        />
      )}

      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}
