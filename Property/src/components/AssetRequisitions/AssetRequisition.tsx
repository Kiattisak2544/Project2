import { useState } from "react";
import {
  mockData,
  mockRepairData,
  mockCleaningData,
  type Requisition,
  type RepairRecord,
  type CleaningRecord,
} from '../AssetRequisitions/types';

import Sidebar from '../AssetRequisitions/Sidebar';
import Navbar from '../AssetRequisitions/Navbar';
import KpiCards from '../AssetRequisitions/KpiCards';
import FilterBar from '../AssetRequisitions/FilterBar';
import RequisitionTable from '../AssetRequisitions/RequisitionTable';
import DetailModal from '../AssetRequisitions/DetailModal';
import InsertData from '../AssetRequisitions/Inser_data.tsx';
import RequesterDetailView from '../AssetRequisitions/RequesterDetailView';

export default function AssetRequisition() {
  // --- ตัวแปร State ที่ใช้ในหน้านี้ ---
  const [requisitions, setRequisitions] = useState<Requisition[]>(mockData); // รายการคำขอทั้งหมด
  const [repairs, setRepairs] = useState<RepairRecord[]>(mockRepairData); // ประวัติการแจ้งซ่อม
  const [cleanings, setCleanings] = useState<CleaningRecord[]>(mockCleaningData); // ประวัติทำความสะอาด

  const [isInsertOpen, setIsInsertOpen] = useState(false);   // เปิด/ปิด Modal เพิ่มข้อมูล
  const [search, setSearch] = useState('');                 // คำค้นหา
  const [filterStatus, setFilterStatus] = useState('all');  // สถานะที่เลือก
  const [filterDept, setFilterDept] = useState('all');      // แผนกที่เลือก
  const [selectedItem, setSelectedItem] = useState<Requisition | null>(null); // ไอเทมที่กดดู Popup
  const [selectedRequesterName, setSelectedRequesterName] = useState<string | null>(null); // ชื่อผู้ขอที่เลือกดูประวัติรายคน
  const [isMenuOpen, setIsMenuOpen] = useState(false);       // เปิด/ปิด Baker Menu บนมือถือ
  const [isCollapsed, setIsCollapsed] = useState(false);     // ย่อ/ขยาย Sidebar บนจอคอม

  // --- กรองข้อมูลตามเงื่อนไข (Search & Filters) ---
  const filteredList = requisitions.filter((item) => {
    const matchSearch =
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.asset.toLowerCase().includes(search.toLowerCase()) ||
      item.tag.toLowerCase().includes(search.toLowerCase());

    const matchStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchDept = filterDept === 'all' || item.dept.includes(filterDept);

    return matchSearch && matchStatus && matchDept;
  });

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* 1. เมนูแถบด้านข้าง (Sidebar) */}
      <Sidebar
        isMenuOpen={isMenuOpen}
        isCollapsed={isCollapsed}
        onCloseMenu={() => setIsMenuOpen(false)}
      />

      {/* 2. พื้นที่เนื้อหาหลัก (Main Content) */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* แถบด้านบน (Navbar พร้อมปุ่ม Baker Menu และ Profile Log out) */}
        <Navbar
          search={search}
          onSearchChange={setSearch}
          onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />

        {/* เนื้อหาหน้าเว็บ */}
        <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto flex flex-col gap-6">
          {selectedRequesterName ? (
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
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                    รายการเบิกทรัพย์สิน (Asset Requisitions)
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    ตรวจสอบ ติดตามสถานะ และดำเนินการอนุมัติคำขอเบิกทรัพย์สินขององค์กร (สามารถคลิกที่ <span className="font-semibold text-blue-700">ชื่อผู้ขอเบิก</span> เพื่อดูประวัติรายบุคคลได้)
                  </p>
                </div>

                <button
                  onClick={() => setIsInsertOpen(true)}
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold shadow-sm transition cursor-pointer"
                >
                  + สร้างคำขอเบิกทรัพย์สิน
                </button>
              </div>

              {/* การ์ดสรุปตัวเลข 4 ช่อง */}
              <KpiCards />

              {/* แถบฟิลเตอร์ค้นหาและเลือกสถานะ */}
              <FilterBar
                filterDept={filterDept}
                onDeptChange={setFilterDept}
                filterStatus={filterStatus}
                onStatusChange={setFilterStatus}
              />

              {/* ตารางแสดงข้อมูลรายการเบิก */}
              <RequisitionTable
                items={filteredList}
                totalCount={requisitions.length}
                onSelect={(item) => setSelectedItem(item)}
                onSelectRequester={(name) => setSelectedRequesterName(name)}
              />
            </>
          )}
        </main>
      </div>

      {/* 3. หน้าต่างป๊อปอัปดูรายละเอียด (Modal) */}
      {selectedItem && (
        <DetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {/* 4. หน้าต่างการ์ดเพิ่มข้อมูล (Insert Data Card) */}
      <InsertData
        isOpen={isInsertOpen}
        onClose={() => setIsInsertOpen(false)}
        onSave={(newItem) => {
          setRequisitions((prev) => [newItem, ...prev]);
        }}
      />
    </div>
  );
}
