import React from 'react';
import { currentUser } from '../constants/currentUser';

const RequesterInfo: React.FC = () => {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-xs p-5">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-2xl bg-primary text-on-primary font-bold text-lg flex items-center justify-center shadow-xs shrink-0">
          {currentUser.avatar}
        </div>

        {/* Profile info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-on-surface truncate">{currentUser.name}</h3>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-primary-fixed text-primary border border-primary-fixed-dim shrink-0">
              {currentUser.role}
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            แผนกสังกัด: <span className="font-medium text-on-surface">{currentUser.dept}</span>
          </p>
          <p className="text-xs text-on-surface-variant mt-0.5">
            บริษัทในเครือ: <span className="font-medium text-on-surface">{currentUser.company}</span>
          </p>
          <p className="text-[11px] text-on-surface-variant mt-0.5">{currentUser.email}</p>
        </div>
      </div>
    </div>
  );
};

export default RequesterInfo;
