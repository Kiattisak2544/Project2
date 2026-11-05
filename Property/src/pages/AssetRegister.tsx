import { useState } from 'react';
import type { Requisition } from '../components/AssetRequisitions/types';
import AssetCard from './AssetCard';
import PageHeader from './PageHeader';

interface AssetRegisterProps {
  requisitions: Requisition[];
  search: string;
  onSelect: (item: Requisition) => void;
}

// ทะเบียนสินทรัพย์: แสดงสินทรัพย์ที่ถูกเบิกออกไป (ไม่รวมคำขอที่ถูกปฏิเสธ) เป็นการ์ด
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
      <PageHeader
        title="ทะเบียนสินทรัพย์"
        subtitle={`สินทรัพย์ที่อยู่ในความครอบครองของพนักงาน (${assets.length} รายการ)`}
      />

      {/* ชิปเลือกหมวดหมู่ */}
      <div className="flex flex-wrap gap-2 animate-fade-up" style={{ animationDelay: '120ms' }}>
        {['all', ...categories].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={`px-3.5 py-1.5 rounded-lg text-xs border transition-all duration-200 cursor-pointer ${
              category === c
                ? 'bg-primary text-on-primary border-primary font-semibold shadow-xs'
                : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/40 hover:bg-surface-container hover:text-primary'
            }`}
          >
            {c === 'all' ? 'ทุกหมวดหมู่' : c}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-14 text-center text-xs text-on-surface-variant animate-fade-in">
          <div className="text-3xl mb-2">📦</div>
          ไม่พบสินทรัพย์ที่ตรงกับเงื่อนไขการค้นหา
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
