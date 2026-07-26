import React, { useState } from 'react';
import { DollarSign, CheckCircle2, AlertCircle, Clock, Plus, Check, ShieldCheck, UserPlus, TrendingUp, PieChart } from 'lucide-react';
import { INITIAL_PAYROLL, EMPLOYEES } from '../../data/creativeData';

export default function PayrollManager({ userRole }) {
  const [payrollList, setPayrollList] = useState(INITIAL_PAYROLL);
  const [payrollApproved, setPayrollApproved] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    baseSalary: '$5,000',
    notes: 'Monthly Base Salary'
  });

  const totalBudget = payrollList.reduce((acc, p) => acc + parseInt(p.baseSalary.replace('$', '').replace(',', '')), 0);
  const totalDisbursed = payrollList.filter(p => p.status === 'Paid').reduce((acc, p) => acc + parseInt(p.baseSalary.replace('$', '').replace(',', '')), 0);
  const pendingAmount = totalBudget - totalDisbursed;

  const handleToggleStatus = (id, newStatus) => {
    setPayrollList(payrollList.map(p => {
      if (p.id === id) {
        return {
          ...p,
          status: newStatus,
          disburseDate: newStatus === 'Paid' ? new Date().toISOString().split('T')[0] : p.disburseDate
        };
      }
      return p;
    }));
  };

  const handleApproveAllPayroll = () => {
    setPayrollList(payrollList.map(p => ({
      ...p,
      status: 'Paid',
      disburseDate: new Date().toISOString().split('T')[0]
    })));
    setPayrollApproved(true);
  };

  const handleAddEmployeePayroll = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.role) return;

    const newPay = {
      id: `pay-${Date.now()}`,
      empId: `emp-${Date.now()}`,
      name: formData.name,
      role: formData.role,
      baseSalary: formData.baseSalary,
      status: 'Unpaid / Due',
      disburseDate: 'Pending',
      notes: formData.notes
    };

    setPayrollList([...payrollList, newPay]);
    setShowAddModal(false);
    setFormData({ name: '', role: '', baseSalary: '$5,000', notes: 'Monthly Base Salary' });
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-green-950/80 via-slate-900 to-[#070913] p-4 sm:p-6 rounded-2xl border border-green-500/30 shadow-[0_0_20px_rgba(74,222,128,0.15)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="neon-badge border-green-400 text-green-300">HR PAYROLL & SALARY CLEARANCE</span>
            <span className="text-xs text-slate-300">• Logged in as <strong className="text-white">{userRole}</strong></span>
          </div>
          <h2 className="font-['Creato_Display'] text-xl sm:text-3xl font-extrabold text-white mt-1">
            HR Overview & Monthly Salary Clearance Hub
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Review monthly salary sheets, approve team payroll, clear manual employee payments, and monitor salary-to-revenue ratio.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleApproveAllPayroll}
            disabled={payrollApproved}
            className={`neon-button-primary py-2.5 px-5 text-xs justify-center shrink-0 ${
              payrollApproved ? 'opacity-60 cursor-not-allowed' : 'shadow-[0_0_20px_rgba(74,222,128,0.4)]'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{payrollApproved ? '✓ Monthly Payroll Approved' : 'Approve Monthly Payroll'}</span>
          </button>
        </div>
      </div>

      {/* Financial Summary & Payroll Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="neon-card p-4 sm:p-5 border-green-500/30 space-y-2">
          <div className="flex items-center justify-between text-green-400">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">Total Monthly Budget</span>
            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-white font-['Creato_Display']">${totalBudget.toLocaleString()}</p>
          <p className="text-[11px] text-green-400 font-semibold">{payrollList.length} Team Members</p>
        </div>

        <div className="neon-card p-4 sm:p-5 border-cyan-500/30 space-y-2">
          <div className="flex items-center justify-between text-cyan-400">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">Disbursed Salary</span>
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-green-400 font-['Creato_Display']">${totalDisbursed.toLocaleString()}</p>
          <p className="text-[11px] text-cyan-300 font-semibold">{payrollList.filter(p => p.status === 'Paid').length} Paid</p>
        </div>

        <div className="neon-card p-4 sm:p-5 border-red-500/30 space-y-2">
          <div className="flex items-center justify-between text-red-400">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">Pending Clearance</span>
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-red-400 font-['Creato_Display']">${pendingAmount.toLocaleString()}</p>
          <p className="text-[11px] text-yellow-400 font-semibold">{payrollList.filter(p => p.status !== 'Paid').length} Awaiting Clearance</p>
        </div>

        <div className="neon-card p-4 sm:p-5 border-purple-500/30 space-y-2">
          <div className="flex items-center justify-between text-purple-400">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">Payroll to Revenue Ratio</span>
            <PieChart className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-white font-['Creato_Display']">23.7%</p>
          <p className="text-[11px] text-slate-300 font-semibold">Healthy (&lt;35% Threshold)</p>
        </div>

      </div>

      {/* Salary Payment Status Tracker Table */}
      <div className="neon-card p-5 sm:p-6 border-green-500/20 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="font-['Creato_Display'] font-bold text-base text-white">Salary Payment Status Tracker & Manual Clearance</h3>
            <p className="text-xs text-slate-400">Click manual status buttons to clear salary from Unpaid to Paid instantly.</p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="neon-button-secondary py-2 px-4 text-xs shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Quick Add New Employee</span>
          </button>
        </div>

        {/* Table List */}
        <div className="space-y-3">
          {payrollList.map((pay) => {
            const isPaid = pay.status === 'Paid';
            const isUnpaid = pay.status === 'Unpaid / Due';
            const isHold = pay.status === 'Hold / Delayed';

            return (
              <div
                key={pay.id}
                className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                {/* Employee Name & Role */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-900 border border-green-500/30 flex items-center justify-center font-bold text-green-400 font-['Creato_Display']">
                    {pay.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{pay.name}</h4>
                    <p className="text-[11px] text-slate-400">{pay.role}</p>
                  </div>
                </div>

                {/* Base Salary & Notes */}
                <div className="space-y-0.5 sm:text-right">
                  <span className="text-sm font-extrabold text-cyan-300 font-['Creato_Display']">{pay.baseSalary}</span>
                  <p className="text-[10px] text-slate-400">{pay.notes}</p>
                </div>

                {/* Status Badge */}
                <div>
                  <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                    isPaid
                      ? 'bg-green-500/20 text-green-300 border border-green-500/40'
                      : isUnpaid
                      ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                      : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
                  }`}>
                    {pay.status}
                  </span>
                </div>

                {/* Manual Clearance Action Toggles */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleToggleStatus(pay.id, 'Paid')}
                    className={`px-3 py-1.5 rounded-lg font-bold text-[11px] flex items-center gap-1 transition-all ${
                      isPaid
                        ? 'bg-green-500/20 text-green-300 border border-green-500/40'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-green-500/40 hover:text-green-300'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Paid</span>
                  </button>

                  <button
                    onClick={() => handleToggleStatus(pay.id, 'Unpaid / Due')}
                    className={`px-3 py-1.5 rounded-lg font-bold text-[11px] transition-all ${
                      isUnpaid
                        ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-red-500/40 hover:text-red-400'
                    }`}
                  >
                    Unpaid
                  </button>

                  <button
                    onClick={() => handleToggleStatus(pay.id, 'Hold / Delayed')}
                    className={`px-3 py-1.5 rounded-lg font-bold text-[11px] transition-all ${
                      isHold
                        ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-yellow-500/40 hover:text-yellow-300'
                    }`}
                  >
                    Hold
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
          <div className="neon-card max-w-md w-full border-green-400 p-6 sm:p-8 relative space-y-6">
            
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white">✕</button>

            <div className="space-y-1">
              <h3 className="font-['Creato_Display'] text-xl font-extrabold text-white">Add New Employee Profile</h3>
              <p className="text-xs text-slate-400">Quick onboard for monthly payroll calculation.</p>
            </div>

            <form onSubmit={handleAddEmployeePayroll} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Employee Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rayan Ahmed"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-900 border border-green-500/30 rounded-xl p-3 text-white outline-none focus:border-green-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Role Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Junior 3D Animator"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-slate-900 border border-green-500/30 rounded-xl p-3 text-white outline-none focus:border-green-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Base Monthly Salary ($)</label>
                <input
                  type="text"
                  required
                  placeholder="$5,500"
                  value={formData.baseSalary}
                  onChange={(e) => setFormData({ ...formData, baseSalary: e.target.value })}
                  className="w-full bg-slate-900 border border-green-500/30 rounded-xl p-3 text-cyan-300 font-bold outline-none"
                />
              </div>

              <button
                type="submit"
                className="neon-button-primary w-full justify-center py-3 text-xs font-extrabold"
              >
                <span>Save Employee Profile</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
