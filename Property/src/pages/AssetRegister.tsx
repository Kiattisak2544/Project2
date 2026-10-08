import { useState } from 'react';
import type { Requisition } from '../components/AssetRequisitions/types';
import AssetCard from './AssetCard';
import PageHeader from './PageHeader';

interface AssetRegisterProps {
  requisitions: Requisition[];
  search: string;
  onSelect: (item: Requisition) => void;
}

// ทะเบียนทรัพย์สิน: แสดงทรัพย์สินที่ถูกเบิกออกไป (ไม่รวมคำขอที่ถูกยกเลิก) เป็นการ์ด
export default function AssetRegister({ requisitions, search, onSelect }: AssetRegisterProps) {
  const [category, setCategory] = useState('all');

  const assets = requisitions.filter((r) => r.status !== 'rejected');
  const categories = [...new Set(assets.map((a) => a.category))];
  const q = search.toLowerCase();
  const visible = assets.filter(
    (a) =>
      (category === 'all' || a.category === category) &&
      [a.asset, a.tag, a.name, a.category].some((v) => v.toLowerCase().includes(q))
  );

  return (
    <>
      <PageHeader title="ทะเบียนทรัพย์สิน (Asset Register)" subtitle={`ทรัพย์สินที่อยู่ในความครอบครองของพนักงาน ${assets.length} รายการ`} />

      {/* ชิปเลือกหมวดหมู่ */}
      <div className="flex flex-wrap gap-2 animate-fade-up" style={{ animationDelay: '120ms' }}>
        {['all', ...categories].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={`px-3.5 py-1.5 rounded-full text-xs border transition-all duration-300 cursor-pointer ${
              category === c
                ? 'bg-linear-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-lg shadow-blue-600/30 scale-105'
                : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-700'
            }`}
          >
            {c === 'all' ? 'ทั้งหมด' : c}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-14 text-center text-xs text-slate-400 animate-fade-in">
          <div className="text-3xl mb-2">📦</div>
          ไม่พบทรัพย์สินที่ตรงกับเงื่อนไข
        </div>
      ) : (
        <div key={category} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {visible.map((item, i) => (
            <AssetCard key={item.id} item={item} onViewDetails={onSelect} delay={150 + i * 60} />
          ))}
        </div>
      )}
    </>
  );
}
