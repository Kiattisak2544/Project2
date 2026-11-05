// ==========================================
// Mock Data and Type Definitions (ภาษาไทย)
// ==========================================

export interface Requisition {
  id: string;             // รหัสคำขอ เช่น REQ-2026-0891
  name: string;           // ชื่อผู้ขอเบิก
  role: string;           // ตำแหน่ง
  dept: string;           // แผนก
  company: string;        // บริษัทในเครือ
  avatar: string;         // ตัวย่อโปรไฟล์
  asset: string;          // รายการสินทรัพย์
  category: string;       // หมวดหมู่
  tag: string;            // รหัสสินทรัพย์ (Asset Tag)
  date: string;           // วันที่ขอ
  dueDate: string;        // กำหนดคืน
  type: string;           // ประเภท (ยืมชั่วคราว / เบิกถาวร)
  status: 'pending' | 'approved' | 'completed' | 'rejected'; // สถานะ
  statusText: string;     // ข้อความสถานะ
  notes?: string;         // หมายเหตุเพิ่มเติม
}

// บันทึกการซ่อมบำรุง
export interface RepairRecord {
  id: string;             // รหัสแจ้งซ่อม เช่น REP-2026-0031
  requesterName: string;  // ชื่อผู้แจ้ง
  asset: string;          // รายการสินทรัพย์
  tag: string;            // รหัสสินทรัพย์
  issue: string;          // รายละเอียดอาการเสีย
  reportDate: string;     // วันที่แจ้ง
  status: 'pending' | 'in_progress' | 'completed'; // สถานะการซ่อม
  statusText: string;     // ข้อความสถานะ
  technician?: string;    // ช่างผู้รับผิดชอบ
  completedDate?: string; // วันที่ซ่อมเสร็จ
  cost?: string;          // ค่าใช้จ่าย
  notes?: string;         // หมายเหตุ
}

// บันทึกการทำความสะอาดและบริการ
export interface CleaningRecord {
  id: string;             // รหัสบันทึก เช่น CLN-2026-0105
  requesterName: string;  // ผู้ครอบครองสินทรัพย์
  asset: string;          // รายการสินทรัพย์
  tag: string;            // รหัสสินทรัพย์
  serviceType: string;    // ประเภทงานบริการ
  date: string;           // วันที่ทำ
  performedBy: string;    // ผู้ดำเนินการ (ทีมงาน/บริษัท)
  nextScheduledDate: string; // กำหนดการรอบถัดไป
  status: 'completed' | 'scheduled';
  statusText: string;     // ข้อความสถานะ
}

// รายชื่อบริษัทในเครือ
export const companies = ['ตึกน้ำเงิน (Blue Tower)', 'ตึกน้ำเงิน สตีล', 'ฮาร์ดแวร์ เฮาส์', 'ตึกน้ำเงิน รีเทล'];

export const mockData: Requisition[] = [
  {
    id: 'REQ-2026-0891',
    name: 'สิทธิชัย เจริญกิจกุล',
    role: 'วิศวกร DevOps',
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
    notes: 'สำหรับงานพัฒนาระบบ Cloud & Server Infrastructure'
  },
  {
    id: 'REQ-2026-0890',
    name: 'กานดา พรหมมินทร์',
    role: 'เจ้าหน้าที่บุคคล',
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
    statusText: 'รออนุมัติ',
    notes: 'ใช้จัดอบรมหลักสูตรพนักงานใหม่'
  },
  {
    id: 'REQ-2026-0889',
    name: 'ธนวัฒน์ เลิศไพบูลย์',
    role: 'นักบัญชีอาวุโส',
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
    notes: 'ติดตั้งประจำโต๊ะทำงาน ชั้น 14 สำนักงานใหญ่'
  },
  {
    id: 'REQ-2026-0888',
    name: 'พิมพ์ชนก สุขสวัสดิ์',
    role: 'ผู้จัดการแบรนด์',
    dept: 'ฝ่ายการตลาด',
    company: companies[3],
    avatar: 'พส',
    asset: 'เก้าอี้เพื่อสุขภาพ Steelcase Gesture',
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
    role: 'เจ้าหน้าที่กิจกรรม',
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
    statusText: 'รออนุมัติ',
    notes: 'ใช้ในงานสัมมนาประจำปี'
  },
  {
    id: 'REQ-2026-0886',
    name: 'อนุสรณ์ รุ่งเรืองกิจ',
    role: 'วิศวกรระบบเครือข่าย',
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
    statusText: 'ปฏิเสธ',
    notes: 'มีเครื่องสำรองไฟทดแทนพร้อมใช้งานในคลัง'
  },
  {
    id: 'REQ-2026-0882',
    name: 'สิทธิชัย เจริญกิจกุล',
    role: 'วิศวกร DevOps',
    dept: 'ฝ่ายไอที (IT)',
    company: companies[2],
    avatar: 'สช',
    asset: 'คีย์บอร์ดไร้สาย Keychron K2 Pro',
    category: 'อุปกรณ์ต่อพ่วง',
    tag: 'AST-IT-2026-0039',
    date: '2 ก.ย. 2026',
    dueDate: '-',
    type: 'เบิกถาวร',
    status: 'completed',
    statusText: 'ส่งมอบแล้ว',
    notes: 'ใช้งานคู่กับแล็ปท็อปหลัก'
  },
  {
    id: 'REQ-2026-0875',
    name: 'กานดา พรหมมินทร์',
    role: 'เจ้าหน้าที่บุคคล',
    dept: 'ฝ่ายบุคคล (HR)',
    company: companies[3],
    avatar: 'กพ',
    asset: 'แล็ปท็อป Lenovo ThinkPad T14 Gen 4',
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
    issue: 'พอร์ต Thunderbolt 4 ด้านซ้ายหลวม ชาร์จไฟเข้าติดๆ ดับๆ',
    reportDate: '12 ก.ย. 2026',
    status: 'in_progress',
    statusText: 'กำลังดำเนินการ',
    technician: 'ประสิทธิ์ (ช่างไอที)',
    notes: 'ส่งศูนย์บริการ Apple เพื่อตรวจสอบแผงวงจร I/O'
  },
  {
    id: 'REP-2026-0018',
    requesterName: 'สิทธิชัย เจริญกิจกุล',
    asset: 'คีย์บอร์ดไร้สาย Keychron K2 Pro',
    tag: 'AST-IT-2026-0039',
    issue: 'ปุ่ม Spacebar ฝืดและตอบสนองช้า',
    reportDate: '5 ก.ย. 2026',
    status: 'completed',
    statusText: 'ซ่อมแซมเสร็จสิ้น',
    technician: 'ประสิทธิ์ (ช่างไอที)',
    completedDate: '6 ก.ย. 2026',
    notes: 'ทำความสะอาดสวิตช์และเปลี่ยน Stabilizer เรียบร้อย'
  },
  {
    id: 'REP-2026-0035',
    requesterName: 'กานดา พรหมมินทร์',
    asset: 'แล็ปท็อป Lenovo ThinkPad T14 Gen 4',
    tag: 'AST-HR-2025-0044',
    issue: 'แบตเตอรี่เสื่อมสภาพ เก็บประจุได้ไม่ถึง 1 ชั่วโมง',
    reportDate: '20 ส.ค. 2026',
    status: 'completed',
    statusText: 'ซ่อมแซมเสร็จสิ้น',
    technician: 'ธนา (ช่างเทคนิค)',
    completedDate: '22 ส.ค. 2026',
    notes: 'เปลี่ยนแบตเตอรี่แท้ 57Wh ผ่านการทดสอบรันเทสต์'
  },
  {
    id: 'REP-2026-0027',
    requesterName: 'ธนวัฒน์ เลิศไพบูลย์',
    asset: 'จอภาพ Dell UltraSharp 27" 4K',
    tag: 'AST-FA-2025-0955',
    issue: 'สัญญาณสาย DisplayPort ดับกระพริบเมื่อขยับโต๊ะ',
    reportDate: '8 ก.ย. 2026',
    status: 'completed',
    statusText: 'ซ่อมแซมเสร็จสิ้น',
    technician: 'ประสิทธิ์ (ช่างไอที)',
    completedDate: '9 ก.ย. 2026',
    notes: 'เปลี่ยนสายสัญญาณ DP 1.4 คุณภาพสูงเส้นใหม่'
  },
  {
    id: 'REP-2026-0050',
    requesterName: 'วรพล ภัทรเดชา',
    asset: 'โปรเจกเตอร์พกพา Epson Laser FHD',
    tag: 'AST-AV-2024-0312',
    issue: 'พัดลมระบายความร้อนเสียงดังผิดปกติและตัดการทำงานหลัง 30 นาที',
    reportDate: '16 ก.ย. 2026',
    status: 'pending',
    statusText: 'รอการตรวจสอบ',
    technician: 'รอการมอบหมาย',
    notes: 'รอช่างภายนอกเข้าตรวจสอบแผ่นกรองและพัดลม'
  }
];

// ข้อมูลจำลองประวัติการทำความสะอาดและบริการ
export const mockCleaningData: CleaningRecord[] = [
  {
    id: 'CLN-2026-0088',
    requesterName: 'สิทธิชัย เจริญกิจกุล',
    asset: 'MacBook Pro 16" (Apple M3 Max)',
    tag: 'AST-IT-2026-0042',
    serviceType: 'ทำความสะอาดล้ำลึก (Deep Clean) และเป่าฝุ่นช่องระบายความร้อน',
    date: '10 ก.ย. 2026',
    performedBy: 'ทีมบริการ Service Desk',
    nextScheduledDate: '10 ธ.ค. 2026',
    status: 'completed',
    statusText: 'เสร็จสิ้น'
  },
  {
    id: 'CLN-2026-0062',
    requesterName: 'สิทธิชัย เจริญกิจกุล',
    asset: 'คีย์บอร์ดไร้สาย Keychron K2 Pro',
    tag: 'AST-IT-2026-0039',
    serviceType: 'ถอดปุ่มทำความสะอาด ขจัดคราบมัน และเช็ดฆ่าเชื้อแบคทีเรีย',
    date: '4 ก.ย. 2026',
    performedBy: 'ทีมซัพพอร์ตไอที',
    nextScheduledDate: '4 ธ.ค. 2026',
    status: 'completed',
    statusText: 'เสร็จสิ้น'
  },
  {
    id: 'CLN-2026-0031',
    requesterName: 'สิทธิชัย เจริญกิจกุล',
    asset: 'โต๊ะทำงานและเก้าอี้เพื่อสุขภาพ',
    tag: 'AST-OF-2025-0102',
    serviceType: 'ฉีดพ่นน้ำยาฆ่าเชื้อ และดูดฝุ่นระบบไอน้ำร้อนเบาะเก้าอี้',
    date: '15 ส.ค. 2026',
    performedBy: 'บจก. กรีนคลีน เซอร์วิส',
    nextScheduledDate: '15 พ.ย. 2026',
    status: 'completed',
    statusText: 'เสร็จสิ้น'
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
    statusText: 'เสร็จสิ้น'
  },
  {
    id: 'CLN-2026-0074',
    requesterName: 'กานดา พรหมมินทร์',
    asset: 'แล็ปท็อป Lenovo ThinkPad T14 Gen 4',
    tag: 'AST-HR-2025-0044',
    serviceType: 'ทำความสะอาดแป้นพิมพ์ เป่าฝุ่นช่องระบายลม และเช็ดหน้าจอ',
    date: '25 ส.ค. 2026',
    performedBy: 'ทีมซัพพอร์ตไอที',
    nextScheduledDate: '25 พ.ย. 2026',
    status: 'completed',
    statusText: 'เสร็จสิ้น'
  },
  {
    id: 'CLN-2026-0055',
    requesterName: 'ธนวัฒน์ เลิศไพบูลย์',
    asset: 'จอภาพ Dell UltraSharp 27" 4K',
    tag: 'AST-FA-2025-0955',
    serviceType: 'ทำความสะอาดหน้าจอด้วยน้ำยาป้องกันไฟฟ้าสถิตเฉพาะทาง',
    date: '10 ก.ย. 2026',
    performedBy: 'ทีมซัพพอร์ตไอที',
    nextScheduledDate: '10 ธ.ค. 2026',
    status: 'completed',
    statusText: 'เสร็จสิ้น'
  },
  {
    id: 'CLN-2026-0041',
    requesterName: 'พิมพ์ชนก สุขสวัสดิ์',
    asset: 'เก้าอี้เพื่อสุขภาพ Steelcase Gesture',
    tag: 'AST-OF-2026-0083',
    serviceType: 'ซักเบาะผ้าและเคลือบน้ำยากันคราบฝังแน่น',
    date: '1 ก.ย. 2026',
    performedBy: 'บจก. กรีนคลีน เซอร์วิส',
    nextScheduledDate: '1 ธ.ค. 2026',
    status: 'completed',
    statusText: 'เสร็จสิ้น'
  },
  {
    id: 'CLN-2026-0022',
    requesterName: 'วรพล ภัทรเดชา',
    asset: 'โปรเจกเตอร์พกพา Epson Laser FHD',
    tag: 'AST-AV-2024-0312',
    serviceType: 'เป่าฝุ่นช่องระบายอากาศ และทำความสะอาดเลนส์แก้วฉายภาพ',
    date: '5 ก.ย. 2026',
    performedBy: 'ทีมดูแลอุปกรณ์โสตทัศน์',
    nextScheduledDate: '5 พ.ย. 2026',
    status: 'completed',
    statusText: 'เสร็จสิ้น'
  }
];
