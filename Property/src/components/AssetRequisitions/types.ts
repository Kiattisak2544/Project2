// ==========================================
// ข้อมูลจำลองและ Type Definition
// ==========================================

export interface Requisition {
  id: string;             // รหัสคำขอ เช่น REQ-2026-0891
  name: string;           // ชื่อผู้ขอเบิก
  role: string;           // ตำแหน่ง
  dept: string;           // แผนก
  company: string;        // บริษัทผู้เบิก (ตึกน้ำ, ตึกน้ำเงินสติล, ฮาร์ดแวร์ฌฮาส์, ตึกน้ำเงินรีเทล)
  avatar: string;         // ตัวอักษรย่อรูปโปรไฟล์
  asset: string;          // รายการทรัพย์สิน
  category: string;       // หมวดหมู่
  tag: string;            // รหัสทรัพย์สิน (Asset Tag)
  date: string;           // วันที่ขอ
  dueDate: string;        // กำหนดคืน
  type: string;           // ประเภท (ยืมชั่วคราว / เบิกถาวร)
  status: 'pending' | 'approved' | 'completed' | 'rejected'; // สถานะ
  statusText: string;     // ข้อความสถานะภาษาไทย
  notes?: string;         // หมายเหตุเพิ่มเติม
}

// ประวัติการแจ้งซ่อม (Repair / Maintenance Record)
export interface RepairRecord {
  id: string;             // รหัสแจ้งซ่อม เช่น REP-2026-0031
  requesterName: string;  // ผู้แจ้งซ่อม
  asset: string;          // รายการทรัพย์สิน
  tag: string;            // รหัสแท็กทรัพย์สิน
  issue: string;          // ปัญหา / อาการเสีย
  reportDate: string;     // วันที่แจ้งซ่อม
  status: 'pending' | 'in_progress' | 'completed'; // สถานะการซ่อม
  statusText: string;     // ข้อความสถานะ
  technician?: string;    // ช่าง / ผู้รับผิดชอบ
  completedDate?: string; // วันที่ซ่อมเสร็จ
  cost?: string;          // ค่าใช้จ่าย
  notes?: string;         // บันทึกการแก้ไข
}

// ประวัติการทำความสะอาด / บำรุงรักษา (Cleaning & Service Record)
export interface CleaningRecord {
  id: string;             // รหัสการคลีนนิ่ง เช่น CLN-2026-0105
  requesterName: string;  // ผู้ครอบครองทรัพย์สิน
  asset: string;          // รายการทรัพย์สิน
  tag: string;            // รหัสแท็กทรัพย์สิน
  serviceType: string;    // ประเภทการทำความสะอาด (เช่น Deep Clean, เช็ดล้างพัดลมระบายความร้อน, ฆ่าเชื้อ)
  date: string;           // วันที่ทำความสะอาด
  performedBy: string;    // เจ้าหน้าที่ / ทีมผู้ดำเนินการ
  nextScheduledDate: string; // รอบถัดไปที่ต้องทำความสะอาด
  status: 'completed' | 'scheduled';
  statusText: string;     // สถานะ
}

// Helper array of companies for mock data assignment
const companies = ['ตึกน้ำเงิน', 'ตึกน้ำเงินสติล', 'ฮาร์ดแวร์ฌฮาส์', 'ตึกน้ำเงินรีเทล'];

export const mockData: Requisition[] = [
  {
    id: 'REQ-2026-0891',
    name: 'สิทธิชัย เจริญกิจกุล',
    role: 'DevOps Engineer',
    dept: 'ฝ่ายไอที (IT)',
    company: companies[0],
    avatar: 'สช',
    asset: 'MacBook Pro 16" (Apple M3 Max)',
    category: 'คอมพิวเตอร์พกพา',
    tag: 'AST-IT-2026-0042',
    date: '19 ก.ย. 2026',
    dueDate: '19 ก.ย. 2028',
    type: 'เบิกถาวร',
    status: 'approved',
    statusText: 'อนุมัติแล้ว',
    notes: 'สำหรับใช้พัฒนาระบบ Cloud & Server Infrastructure'
  },
  {
    id: 'REQ-2026-0890',
    name: 'กานดา พรหมมินทร์',
    role: 'HR Officer',
    dept: 'ฝ่ายบุคคล (HR)',
    company: companies[1],
    avatar: 'กพ',
    asset: 'iPad Pro 11" M4 + Apple Pencil',
    category: 'แท็บเล็ต',
    tag: 'AST-HR-2026-0118',
    date: '18 ก.ย. 2026',
    dueDate: '25 ก.ย. 2026',
    type: 'ยืมชั่วคราว',
    status: 'pending',
    statusText: 'รอการอนุมัติ',
    notes: 'ใช้จัดกิจกรรมอบรมพนักงานใหม่'
  },
  {
    id: 'REQ-2026-0889',
    name: 'ธนวัฒน์ เลิศไพบูลย์',
    role: 'Accountant',
    dept: 'ฝ่ายการเงิน',
    company: companies[2],
    avatar: 'ธล',
    asset: 'จอภาพ Dell UltraSharp 27" 4K',
    category: 'อุปกรณ์ต่อพ่วง',
    tag: 'AST-FA-2025-0955',
    date: '17 ก.ย. 2026',
    dueDate: '17 ก.ย. 2029',
    type: 'เบิกถาวร',
    status: 'completed',
    statusText: 'ส่งมอบแล้ว',
    notes: 'ติดตั้งที่โต๊ะทำงานชั้น 14 สำนักงานใหญ่'
  },
  {
    id: 'REQ-2026-0888',
    name: 'พิมพ์ชนก สุขสวัสดิ์',
    role: 'Brand Manager',
    dept: 'ฝ่ายการตลาด',
    company: companies[3],
    avatar: 'พช',
    asset: 'เก้าอี้เพื่อสุขภาพ Ergonomic Steelcase',
    category: 'เฟอร์นิเจอร์',
    tag: 'AST-OF-2026-0083',
    date: '15 ก.ย. 2026',
    dueDate: '-',
    type: 'เบิกถาวร',
    status: 'approved',
    statusText: 'อนุมัติแล้ว'
  },
  {
    id: 'REQ-2026-0887',
    name: 'วรพล ภัทรเดชา',
    role: 'Event Officer',
    dept: 'ฝ่ายสื่อสารองค์กร',
    company: companies[0],
    avatar: 'วภ',
    asset: 'โปรเจกเตอร์พกพา Epson Laser FHD',
    category: 'โสตทัศนูปกรณ์',
    tag: 'AST-AV-2024-0312',
    date: '14 ก.ย. 2026',
    dueDate: '20 ก.ย. 2026',
    type: 'ยืมชั่วคราว',
    status: 'pending',
    statusText: 'รอการอนุมัติ',
    notes: 'ใช้สำหรับงานสัมมนาประจำปี'
  },
  {
    id: 'REQ-2026-0886',
    name: 'อนุสรณ์ รุ่งเรืองกิจ',
    role: 'Network Engineer',
    dept: 'ฝ่ายไอที (IT)',
    company: companies[1],
    avatar: 'อร',
    asset: 'เครื่องสำรองไฟ APC Smart-UPS',
    category: 'อุปกรณ์เครือข่าย',
    tag: 'AST-IT-2025-0721',
    date: '10 ก.ย. 2026',
    dueDate: '-',
    type: 'เบิกถาวร',
    status: 'rejected',
    statusText: 'ไม่อนุมัติ',
    notes: 'มีเครื่องสำรองทดแทนในสต็อกแล้ว'
  },
  {
    id: 'REQ-2026-0882',
    name: 'สิทธิชัย เจริญกิจกุล',
    role: 'DevOps Engineer',
    dept: 'ฝ่ายไอที (IT)',
    company: companies[2],
    avatar: 'สช',
    asset: 'คีย์บอร์ดไร้สาย Keychron K2 Pro',
    category: 'อุปกรณ์ต่อพ่วง',
    tag: 'AST-IT-2026-0039',
    date: '02 ก.ย. 2026',
    dueDate: '-',
    type: 'เบิกถาวร',
    status: 'completed',
    statusText: 'ส่งมอบแล้ว',
    notes: 'ใช้งานร่วมกับเครื่องแล็ปท็อปหลัก'
  },
  {
    id: 'REQ-2026-0875',
    name: 'กานดา พรหมมินทร์',
    role: 'HR Officer',
    dept: 'ฝ่ายบุคคล (HR)',
    company: companies[3],
    avatar: 'กพ',
    asset: 'โน้ตบุ๊ก Lenovo ThinkPad T14 Gen 4',
    category: 'คอมพิวเตอร์พกพา',
    tag: 'AST-HR-2025-0044',
    date: '15 ส.ค. 2026',
    dueDate: '15 ส.ค. 2028',
    type: 'เบิกถาวร',
    status: 'completed',
    statusText: 'ส่งมอบแล้ว'
  }
];

// ข้อมูลจำลองประวัติการแจ้งซ่อม
export const mockRepairData: RepairRecord[] = [
  {
    id: 'REP-2026-0042',
    requesterName: 'สิทธิชัย เจริญกิจกุล',
    asset: 'MacBook Pro 16" (Apple M3 Max)',
    tag: 'AST-IT-2026-0042',
    issue: 'พอร์ต Thunderbolt 4 ช่องซ้ายหลวม ชาร์จไฟเข้าติดๆ ดับๆ',
    reportDate: '12 ก.ย. 2026',
    status: 'in_progress',
    statusText: 'กำลังซ่อมแซม',
    technician: 'ประสิทธิ์ ช่างไอที',
    notes: 'ส่งศูนย์ Apple Authorized Service Provider ตรวจเช็กแผงวงจร I/O'
  },
  {
    id: 'REP-2026-0018',
    requesterName: 'สิทธิชัย เจริญกิจกุล',
    asset: 'คีย์บอร์ดไร้สาย Keychron K2 Pro',
    tag: 'AST-IT-2026-0039',
    issue: 'ปุ่ม Spacebar ฝืดและตอบสนองช้า',
    reportDate: '05 ก.ย. 2026',
    status: 'completed',
    statusText: 'ซ่อมเสร็จสิ้น',
    technician: 'ประสิทธิ์ ช่างไอที',
    completedDate: '06 ก.ย. 2026',
    notes: 'ทำความสะอาด Switch และเปลี่ยน Stabilizer ใหม่'
  },
  {
    id: 'REP-2026-0035',
    requesterName: 'กานดา พรหมมินทร์',
    asset: 'โน้ตบุ๊ก Lenovo ThinkPad T14 Gen 4',
    tag: 'AST-HR-2025-0044',
    issue: 'แบตเตอรี่เสื่อมสภาพ เก็บประจุได้ไม่ถึง 1 ชั่วโมง',
    reportDate: '20 ส.ค. 2026',
    status: 'completed',
    statusText: 'ซ่อมเสร็จสิ้น',
    technician: 'ธนา ช่างเทคนิค',
    completedDate: '22 ส.ค. 2026',
    notes: 'เปลี่ยนแบตเตอรี่แท้ OEM 57Wh เรียบร้อย ทดสอบ Run Test ผ่าน'
  },
  {
    id: 'REP-2026-0027',
    requesterName: 'ธนวัฒน์ เลิศไพบูลย์',
    asset: 'จอภาพ Dell UltraSharp 27" 4K',
    tag: 'AST-FA-2025-0955',
    issue: 'สาย DisplayPort มีสัญญาณกะพริบเวลากระทบโต๊ะ',
    reportDate: '08 ก.ย. 2026',
    status: 'completed',
    statusText: 'ซ่อมเสร็จสิ้น',
    technician: 'ประสิทธิ์ ช่างไอที',
    completedDate: '09 ก.ย. 2026',
    notes: 'เปลี่ยนสายสัญญาณ DP 1.4 คุณภาพสูงเส้นใหม่'
  },
  {
    id: 'REP-2026-0050',
    requesterName: 'วรพล ภัทรเดชา',
    asset: 'โปรเจกเตอร์พกพา Epson Laser FHD',
    tag: 'AST-AV-2024-0312',
    issue: 'พัดลมระบายความร้อนเสียงดังผิดปกติและเครื่องตัดการทำงานหลังเปิด 30 นาที',
    reportDate: '16 ก.ย. 2026',
    status: 'pending',
    statusText: 'รอคิวตรวจสอบ',
    technician: 'รอจ่ายงาน',
    notes: 'รอช่างภายนอกเข้าตรวจสอบไส้กรองและพัดลม'
  }
];

// ข้อมูลจำลองประวัติการทำความสะอาด & บำรุงรักษา
export const mockCleaningData: CleaningRecord[] = [
  {
    id: 'CLN-2026-0088',
    requesterName: 'สิทธิชัย เจริญกิจกุล',
    asset: 'MacBook Pro 16" (Apple M3 Max)',
    tag: 'AST-IT-2026-0042',
    serviceType: 'Deep Clean & เป่าฝุ่นช่องระบายความร้อน',
    date: '10 ก.ย. 2026',
    performedBy: 'ทีม Service Desk',
    nextScheduledDate: '10 ธ.ค. 2026',
    status: 'completed',
    statusText: 'ทำความสะอาดแล้ว'
  },
  {
    id: 'CLN-2026-0062',
    requesterName: 'สิทธิชัย เจริญกิจกุล',
    asset: 'คีย์บอร์ดไร้สาย Keychron K2 Pro',
    tag: 'AST-IT-2026-0039',
    serviceType: 'ถอด Keycaps ล้างคราบไขมัน และเช็ดน้ำยาแอนตี้แบคทีเรีย',
    date: '04 ก.ย. 2026',
    performedBy: 'ทีม IT Support',
    nextScheduledDate: '04 ธ.ค. 2026',
    status: 'completed',
    statusText: 'ทำความสะอาดแล้ว'
  },
  {
    id: 'CLN-2026-0031',
    requesterName: 'สิทธิชัย เจริญกิจกุล',
    asset: 'โต๊ะทำงานและเก้าอี้ Ergonomic ประจำจุด',
    tag: 'AST-OF-2025-0102',
    serviceType: 'พ่นน้ำยาฆ่าเชื้อ & ซักเบาะเก้าอี้ด้วยเครื่องดูดระบบไอน้ำ',
    date: '15 ส.ค. 2026',
    performedBy: 'บริษัทรับเหมาทำความสะอาด Green Clean',
    nextScheduledDate: '15 พ.ย. 2026',
    status: 'completed',
    statusText: 'ทำความสะอาดแล้ว'
  },
  {
    id: 'CLN-2026-0095',
    requesterName: 'กานดา พรหมมินทร์',
    asset: 'iPad Pro 11" M4 + Apple Pencil',
    tag: 'AST-HR-2026-0118',
    serviceType: 'ทำความสะอาดหน้าจอ ขจัดคราบมัน และฆ่าเชื้อเคสยาง',
    date: '18 ก.ย. 2026',
    performedBy: 'เจ้าหน้าที่ไอที (Service Desk)',
    nextScheduledDate: '18 ต.ค. 2026',
    status: 'completed',
    statusText: 'ทำความสะอาดแล้ว'
  },
  {
    id: 'CLN-2026-0074',
    requesterName: 'กานดา พรหมมินทร์',
    asset: 'โน้ตบุ๊ก Lenovo ThinkPad T14 Gen 4',
    tag: 'AST-HR-2025-0044',
    serviceType: 'ทำความสะอาดคีย์บอร์ด สเปรย์ลมเป่าฝุ่นและเช็ดจอภาพ',
    date: '25 ส.ค. 2026',
    performedBy: 'ทีม IT Support',
    nextScheduledDate: '25 พ.ย. 2026',
    status: 'completed',
    statusText: 'ทำความสะอาดแล้ว'
  },
  {
    id: 'CLN-2026-0055',
    requesterName: 'ธนวัฒน์ เลิศไพบูลย์',
    asset: 'จอภาพ Dell UltraSharp 27" 4K',
    tag: 'AST-FA-2025-0955',
    serviceType: 'เช็ดทำความสะอาดหน้าจอด้วยน้ำยา Anti-Static เฉพาะทาง',
    date: '10 ก.ย. 2026',
    performedBy: 'ทีม IT Support',
    nextScheduledDate: '10 ธ.ค. 2026',
    status: 'completed',
    statusText: 'ทำความสะอาดแล้ว'
  },
  {
    id: 'CLN-2026-0041',
    requesterName: 'พิมพ์ชนก สุขสวัสดิ์',
    asset: 'เก้าอี้เพื่อสุขภาพ Ergonomic Steelcase',
    tag: 'AST-OF-2026-0083',
    serviceType: 'ซักเบาะผ้าและฉีดพ่นเคลือบกันฝุ่น/คราบสกปรก',
    date: '01 ก.ย. 2026',
    performedBy: 'บริษัท Green Clean',
    nextScheduledDate: '01 ธ.ค. 2026',
    status: 'completed',
    statusText: 'ทำความสะอาดแล้ว'
  },
  {
    id: 'CLN-2026-0022',
    requesterName: 'วรพล ภัทรเดชา',
    asset: 'โปรเจกเตอร์พกพา Epson Laser FHD',
    tag: 'AST-AV-2024-0312',
    serviceType: 'เป่าฝุ่นทำความสะอาดช่องลมระบายอากาศและเลนส์กระจก',
    date: '05 ก.ย. 2026',
    performedBy: 'ทีมช่างภาพและเสียง',
    nextScheduledDate: '05 พ.ย. 2026',
    status: 'completed',
    statusText: 'ทำความสะอาดแล้ว'
  }
];
