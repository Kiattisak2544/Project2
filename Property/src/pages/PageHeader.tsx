import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: ReactNode;
  action?: ReactNode;
}

export default function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 animate-fade-up">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 rounded-sm bg-primary-fixed text-on-primary-fixed font-mono text-[10px] font-semibold tracking-wider uppercase">
            ระบบบริหารสินทรัพย์องค์กร
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
          <span className="text-[11px] text-secondary font-medium">ข้อมูลเรียลไทม์</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-primary tracking-tight">
          {title}
        </h1>
        <p className="text-xs text-on-surface-variant mt-1">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}
