import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: ReactNode;
  action?: ReactNode;
}

// หัวเรื่องของแต่ละหน้า (ตัวอักษรไล่สี + แอนิเมชันตอนเข้า)
export default function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 animate-fade-up">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-slate-900 via-blue-900 to-indigo-800 bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}
