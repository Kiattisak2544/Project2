import React from 'react';
import { currentUser } from '../constants/currentUser';

const RequesterInfo: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-lg flex items-center justify-center shadow-md shrink-0">
          {currentUser.avatar}
        </div>

        {/* Profile info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 truncate">{currentUser.name}</h3>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-100 shrink-0">
              {currentUser.role}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            แผนก: <span className="font-medium text-slate-700">{currentUser.dept}</span>
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            บริษัท: <span className="font-medium text-slate-700">{currentUser.company}</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">{currentUser.email}</p>
        </div>
      </div>
    </div>
  );
};

export default RequesterInfo;
