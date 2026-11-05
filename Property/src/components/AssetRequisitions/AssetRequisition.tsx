import { useState } from "react";
import {
  mockData,
  mockRepairData,
  mockCleaningData,
  type Requisition,
  type RepairRecord,
  type CleaningRecord,
} from './types';
import { requisitionStatus, repairStatus, formatDate } from './status';
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
  const [requisitions, setRequisitions] = useState<Requisition[]>(mockData);
  const [repairs, setRepairs] = useState<RepairRecord[]>(mockRepairData);
  const [cleanings, setCleanings] = useState<CleaningRecord[]>(mockCleaningData);

  const [activePage, setActivePage] = useState<PageId>('requisitions');
  const [openModal, setOpenModal] = useState<ModalName>(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDept, setFilterDept] = useState('all');
  const [selectedItem, setSelectedItem] = useState<Requisition | null>(null);
  const [selectedRequesterName, setSelectedRequesterName] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [settings, setSettings] = useState<Settings>({ reduceMotion: false, showToasts: true });
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const { toasts, notify: pushToast, dismiss } = useToast();
  const notify: typeof pushToast = (message, tone) => {
    if (settings.showToasts) pushToast(message, tone);
  };

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

  const updateRequisitionStatus = (id: string, status: Requisition['status']) => {
    setRequisitions((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status, statusText: requisitionStatus[status].text } : r))
    );
    const messages: Partial<Record<Requisition['status'], [string, 'success' | 'error']>> = {
      approved: [`อนุมัติคำขอ ${id} เรียบร้อยแล้ว`, 'success'],
      rejected: [`ปฏิเสธคำขอ ${id} แล้ว`, 'error'],
      completed: [`บันทึกการส่งมอบ ${id} เรียบร้อยแล้ว`, 'success'],
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
          completedDate: next === 'completed' ? formatDate(new Date()) : r.completedDate,
        };
      })
    );
    notify(`อัปเดตสถานะงานซ่อม ${id} เรียบร้อยแล้ว`);
  };

  const logCleaning = (source: CleaningRecord) => {
    const today = new Date();
    const nextRound = new Date(today);
    nextRound.setMonth(nextRound.getMonth() + 3);
    const record: CleaningRecord = {
      ...source,
      id: `CLN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: formatDate(today),
      nextScheduledDate: formatDate(nextRound),
      status: 'completed',
      statusText: 'เสร็จสิ้น',
    };
    setCleanings((prev) => [record, ...prev]);
    notify(`บันทึกการทำความสะอาดและบริการสำหรับ ${source.asset} เรียบร้อยแล้ว`);
  };

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

  if (isLoggedOut) {
    return (
      <div className={`${motionClass} min-h-screen flex items-center justify-center p-4 bg-surface-container-low text-on-surface font-sans`}>
        <div className="w-full max-w-sm rounded-2xl bg-surface-container-lowest border border-outline-variant/40 p-8 text-center shadow-xl animate-scale-in">
          <div className="mx-auto w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-bold text-base shadow-sm">
            EA
          </div>
          <h1 className="mt-5 text-lg font-bold text-on-surface">ออกจากระบบแล้ว</h1>
          <p className="mt-1 text-xs text-on-surface-variant">ขอบคุณที่ใช้งานระบบบริหารจัดการสินทรัพย์องค์กร</p>
          <button
            type="button"
            onClick={() => {
              setIsLoggedOut(false);
              notify('เข้าสู่ระบบเรียบร้อยแล้ว', 'info');
            }}
            className="mt-6 w-full py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-sm font-semibold shadow-sm transition-all cursor-pointer"
          >
            เข้าสู่ระบบอีกครั้ง
          </button>
        </div>
        <ToastViewport toasts={toasts} onDismiss={dismiss} />
      </div>
    );
  }

  return (
    <div className={`${motionClass} flex min-h-screen bg-surface text-on-surface font-sans relative`}>
      {/* 1. Global Navigation Sidebar */}
      <Sidebar
        isMenuOpen={isMenuOpen}
        isCollapsed={isCollapsed}
        activePage={activePage}
        pendingCount={pendingCount}
        onNavigate={navigate}
        onCloseMenu={() => setIsMenuOpen(false)}
      />

      {/* 2. Main Content Area */}
      <div className="relative flex-1 flex flex-col min-w-0">
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
              <RequesterDetailView
                requesterName={selectedRequesterName}
                requisitions={requisitions}
                repairs={repairs}
                cleanings={cleanings}
                onBack={() => setSelectedRequesterName(null)}
                onSelectRequisition={(item) => setSelectedItem(item)}
              />
            ) : (
              <>
                <PageHeader
                  title="การขอเบิกสินทรัพย์องค์กร"
                  subtitle={
                    <>
                      ตรวจสอบ ติดตามสถานะ และดำเนินการอนุมัติการเบิกใช้อุปกรณ์ในองค์กร (คลิกที่{' '}
                      <span className="font-semibold text-secondary">ชื่อผู้ขอเบิก</span> เพื่อดูประวัติรายบุคคล)
                    </>
                  }
                  action={
                    <button
                      onClick={() => setOpenModal('insert')}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-on-primary hover:bg-primary-container rounded-lg text-xs font-semibold shadow-sm hover:shadow transition-all cursor-pointer"
                    >
                      + สร้างคำขอเบิกใหม่
                    </button>
                  }
                />

                <KpiCards requisitions={requisitions} activeStatus={filterStatus} onSelectStatus={setFilterStatus} />

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

      {/* 3. Detail Modal */}
      {selectedItem && (
        <DetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onUpdateStatus={updateRequisitionStatus}
        />
      )}

      {/* 4. Form and Account Modals */}
      {openModal === 'insert' && (
        <InsertData
          onClose={() => setOpenModal(null)}
          onSave={(newItem) => {
            setRequisitions((prev) => [newItem, ...prev]);
            notify(`สร้างคำขอเบิก ${newItem.id} เรียบร้อยแล้ว`);
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
