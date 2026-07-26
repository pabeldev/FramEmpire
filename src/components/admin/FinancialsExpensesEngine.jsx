import React, { useState } from 'react';
import { DollarSign, TrendingUp, CreditCard, PieChart, CheckCircle2, ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';
import { OVERHEAD_EXPENSES } from '../../data/creativeData';

export default function FinancialsExpensesEngine({ userRole }) {
  const [expenses, setExpenses] = useState(OVERHEAD_EXPENSES);

  const totalOverhead = expenses.reduce((acc, e) => acc + parseInt(e.monthlyCost.replace('$', '')), 0);

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-[#070913] p-4 sm:p-6 rounded-2xl border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="neon-badge border-emerald-400 text-emerald-300">AGENCY FINANCIAL ENGINE</span>
            <span className="text-xs text-slate-300">• Logged in as <strong className="text-white">{userRole}</strong></span>
          </div>
          <h2 className="font-['Creato_Display'] text-xl sm:text-3xl font-extrabold text-white mt-1">
            Financials, Overhead Expenses & Profitability Engine
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Project Net Profit Index, monthly software subscriptions, and overhead cost tracking.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="neon-card p-4 sm:p-5 border-emerald-500/30 space-y-2">
          <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">Gross Monthly Revenue</span>
          <p className="text-xl sm:text-2xl font-extrabold text-white font-['Creato_Display']">$185,000</p>
          <p className="text-[11px] text-green-400 font-semibold">+22.4% vs last month</p>
        </div>

        <div className="neon-card p-4 sm:p-5 border-red-500/30 space-y-2">
          <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">Total Monthly Overhead</span>
          <p className="text-xl sm:text-2xl font-extrabold text-red-400 font-['Creato_Display']">${totalOverhead.toLocaleString()}/mo</p>
          <p className="text-[11px] text-slate-400">Software, Server & Render Licenses</p>
        </div>

        <div className="neon-card p-4 sm:p-5 border-green-500/30 space-y-2">
          <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">Net Profit Margin</span>
          <p className="text-xl sm:text-2xl font-extrabold text-green-400 font-['Creato_Display']">68.2% ($126,100)</p>
          <p className="text-[11px] text-green-400 font-semibold">High Profitability Margin</p>
        </div>

        <div className="neon-card p-4 sm:p-5 border-cyan-500/30 space-y-2">
          <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">Pending Client Invoices</span>
          <p className="text-xl sm:text-2xl font-extrabold text-yellow-400 font-['Creato_Display']">$18,000</p>
          <p className="text-[11px] text-cyan-300">2 Invoices Awaiting Settlement</p>
        </div>
      </div>

      {/* Software Subscriptions & Overhead Expenses Table */}
      <div className="neon-card p-5 sm:p-6 border-emerald-500/30 space-y-4">
        <h3 className="font-['Creato_Display'] font-bold text-base text-white">Overhead & Software Subscription Tracker</h3>
        
        <div className="space-y-3">
          {expenses.map((exp) => (
            <div key={exp.id} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold shrink-0">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs sm:text-sm">{exp.item}</h4>
                  <span className="neon-badge text-[8px]">{exp.category}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 sm:text-right">
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Cost</span>
                  <span className="text-xs font-extrabold text-red-400 font-['Creato_Display']">{exp.monthlyCost}/mo</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Renewal Date</span>
                  <span className="text-xs font-bold text-cyan-300">{exp.renewalDate}</span>
                </div>
                <span className="neon-badge text-[9px] bg-green-500/20 text-green-300 border-green-500/30">{exp.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
