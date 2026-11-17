import React from 'react';
import { store } from '../services/store';
import { UserRole } from '../types/insurance';
import { ShieldCheck, User, Briefcase, FileCheck, CreditCard, ClipboardList, Crown } from 'lucide-react';

interface RoleSwitcherProps {
  navigate?: (path: string) => void;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ navigate }) => {
  const currentUser = store.getCurrentUser();
  const currentRole = currentUser?.accountType || 'super_admin';

  const roles: { role: UserRole; label: string; icon: React.ReactNode; desc: string; route: string }[] = [
    { role: 'super_admin', label: 'Super Admin', icon: <ShieldCheck className="w-3.5 h-3.5" />, desc: 'Full System Control, Departments, Branches & Audits', route: '/admin' },
    { role: 'executive', label: 'Executive', icon: <Crown className="w-3.5 h-3.5" />, desc: 'Executive KPI Oversight & Reports', route: '/admin' },
    { role: 'operator', label: 'Operator / Agent', icon: <Briefcase className="w-3.5 h-3.5" />, desc: 'Sales Operations & Assisted Customer Registration', route: '/operator' },
    { role: 'finance', label: 'Finance', icon: <CreditCard className="w-3.5 h-3.5" />, desc: 'Paid Transactions, Filters & Exports', route: '/admin' },
    { role: 'underwriter', label: 'Underwriter', icon: <FileCheck className="w-3.5 h-3.5" />, desc: 'Risk Adjudication, Quotations & Issuance', route: '/staff' },
    { role: 'claims_officer', label: 'Claims Officer', icon: <ClipboardList className="w-3.5 h-3.5" />, desc: 'Claims Investigation & Settlements', route: '/staff' },
    { role: 'customer', label: 'Customer', icon: <User className="w-3.5 h-3.5" />, desc: 'My Policies, Applications & Pay', route: '/portal' }
  ];

  return (
    <div className="bg-[#022b2d] text-white border-b border-[#006B6E]/60 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-[#7DC242] uppercase tracking-wider text-[11px]">System Environment:</span>
        <span className="text-slate-200">Oromia Insurance S.C. (OIC) Digital Platform</span>
        <span className="text-slate-400">·</span>
        <span className="text-[#9ad864] font-mono text-[11px]">Enterprise Operations</span>
      </div>

      <div className="flex flex-wrap items-center gap-1 bg-[#011c1d]/80 p-0.5 rounded-lg border border-[#006B6E]/60">
        <span className="text-[11px] text-slate-300 px-2">Switch Workspace:</span>
        {roles.map((item) => {
          const isActive =
            currentRole === item.role ||
            (item.role === 'super_admin' && currentRole === 'admin');
          return (
            <button
              key={item.role}
              onClick={() => {
                store.switchRole(item.role);
                if (navigate) {
                  navigate(item.route);
                }
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#7DC242] text-[#022b2d] font-semibold shadow-sm'
                  : 'text-slate-200 hover:text-white hover:bg-[#006B6E]/70'
              }`}
              title={item.desc}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
