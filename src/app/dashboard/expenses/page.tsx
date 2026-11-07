"use client";

import React, { useState } from "react";
import { useApp } from "../../../lib/store";
import { formatCurrency, formatDate } from "../../../lib/utils";
import {
  TrendingDown,
  Plus,
  Printer,
  Search,
  Filter,
  DollarSign,
  Coffee,
  Shirt,
  Lock,
  Zap,
  ShoppingBag,
  Flame,
  Droplet,
  Wifi,
  Wrench,
  X,
  CreditCard,
} from "lucide-react";

export default function ExpensesPage() {
  const {
    expenses,
    auxiliaryIncome,
    addExpense,
    addAuxiliaryIncome,
    t,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"expenses" | "auxiliary">("expenses");
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);

  // New Expense State
  const [newExpense, setNewExpense] = useState({
    propertyId: "prop-gulberg",
    category: "Electricity" as const,
    title: "",
    amount: 0,
    date: new Date().toISOString().split("T")[0],
    status: "PAID" as const,
  });

  // New Auxiliary State
  const [newAuxIncome, setNewAuxIncome] = useState({
    propertyId: "prop-gulberg",
    source: "TUCK_SHOP" as const,
    title: "",
    amount: 0,
    date: new Date().toISOString().split("T")[0],
    note: "",
  });

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.title || newExpense.amount <= 0) return;
    addExpense(newExpense);
    setShowAddExpenseModal(false);
    setNewExpense({
      propertyId: "prop-gulberg",
      category: "Electricity",
      title: "",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      status: "PAID",
    });
  };

  const handleCreateAuxIncome = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuxIncome.title || newAuxIncome.amount <= 0) return;
    addAuxiliaryIncome(newAuxIncome);
    setShowAddIncomeModal(false);
    setNewAuxIncome({
      propertyId: "prop-gulberg",
      source: "TUCK_SHOP",
      title: "",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      note: "",
    });
  };

  const totalExpenseAmount = expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const totalAuxiliaryAmount = auxiliaryIncome.reduce((acc, aux) => acc + aux.amount, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-caption font-mono uppercase text-brass tracking-widest">
            Module 05 • Outflows &amp; Ancillary Revenue
          </span>
          <h1 className="font-serif text-title tracking-tight text-ink mt-0.5">
            {t.expensesTitle}
          </h1>
          <p className="text-body text-ink-muted">
            {t.expensesSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 border border-border bg-canvas-surface hover:bg-canvas-subtle text-ink px-3.5 py-2 text-caption font-medium uppercase tracking-wider transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-brass" />
            <span>Print Ledger</span>
          </button>

          {activeTab === "expenses" ? (
            <button
              onClick={() => setShowAddExpenseModal(true)}
              className="inline-flex items-center gap-2 bg-brass hover:bg-brass-hover text-white px-4 py-2 text-caption font-medium uppercase tracking-wider transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.btnRecordExpense}</span>
            </button>
          ) : (
            <button
              onClick={() => setShowAddIncomeModal(true)}
              className="inline-flex items-center gap-2 bg-brass hover:bg-brass-hover text-white px-4 py-2 text-caption font-medium uppercase tracking-wider transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Ancillary Inflow</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab("expenses")}
          className={`py-3 px-6 text-caption font-medium transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === "expenses"
              ? "border-brass text-brass font-serif text-subhead"
              : "border-transparent text-ink-muted hover:text-ink"
          }`}
        >
          <TrendingDown className="w-4 h-4" />
          <span>Operational Expenditures ({formatCurrency(totalExpenseAmount)})</span>
        </button>

        <button
          onClick={() => setActiveTab("auxiliary")}
          className={`py-3 px-6 text-caption font-medium transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === "auxiliary"
              ? "border-brass text-brass font-serif text-subhead"
              : "border-transparent text-ink-muted hover:text-ink"
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Ancillary Revenue Channels ({formatCurrency(totalAuxiliaryAmount)})</span>
        </button>
      </div>

      {activeTab === "expenses" ? (
        <div className="space-y-6">
          {/* Categorized Breakdown Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="border border-border bg-canvas-surface p-4">
              <span className="text-micro font-mono text-ink-muted uppercase">Electricity (LESCO)</span>
              <p className="text-xl font-serif text-ink tracking-tight font-medium font-tabular mt-1">
                {formatCurrency(
                  expenses
                    .filter((e) => e.category === "Electricity")
                    .reduce((a, b) => a + b.amount, 0)
                )}
              </p>
            </div>

            <div className="border border-border bg-canvas-surface p-4">
              <span className="text-micro font-mono text-ink-muted uppercase">Mess Groceries</span>
              <p className="text-xl font-serif text-ink tracking-tight font-medium font-tabular mt-1">
                {formatCurrency(
                  expenses
                    .filter((e) => e.category === "Groceries")
                    .reduce((a, b) => a + b.amount, 0)
                )}
              </p>
            </div>

            <div className="border border-border bg-canvas-surface p-4">
              <span className="text-micro font-mono text-ink-muted uppercase">Gas (SNGPL)</span>
              <p className="text-xl font-serif text-ink tracking-tight font-medium font-tabular mt-1">
                {formatCurrency(
                  expenses
                    .filter((e) => e.category === "Gas")
                    .reduce((a, b) => a + b.amount, 0)
                )}
              </p>
            </div>

            <div className="border border-border bg-canvas-surface p-4">
              <span className="text-micro font-mono text-ink-muted uppercase">Fiber Leased Line</span>
              <p className="text-xl font-serif text-ink tracking-tight font-medium font-tabular mt-1">
                {formatCurrency(
                  expenses
                    .filter((e) => e.category === "Internet")
                    .reduce((a, b) => a + b.amount, 0)
                )}
              </p>
            </div>
          </div>

          {/* Expenses Table */}
          <div className="border border-border bg-canvas-surface overflow-x-auto">
            <table className="w-full text-left text-body border-collapse">
              <thead>
                <tr className="border-b border-border bg-canvas-subtle text-micro font-mono text-ink-muted uppercase">
                  <th className="p-3 font-semibold">Expenditure Item</th>
                  <th className="p-3 font-semibold">Classification</th>
                  <th className="p-3 font-semibold">Disbursed Date</th>
                  <th className="p-3 font-semibold">Disbursed Value</th>
                  <th className="p-3 font-semibold text-right">Settlement Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {expenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-canvas-subtle/50 transition-colors">
                    <td className="p-3">
                      <p className="font-serif text-subhead font-medium text-ink leading-tight">
                        {exp.title}
                      </p>
                      <p className="text-micro text-ink-muted font-mono">
                        Voucher: {exp.id}
                      </p>
                    </td>

                    <td className="p-3">
                      <span className="border border-border bg-canvas-subtle px-2 py-0.5 text-caption font-mono font-medium text-ink">
                        {exp.category}
                      </span>
                    </td>

                    <td className="p-3 font-mono text-caption text-ink-muted">
                      {formatDate(exp.date)}
                    </td>

                    <td className="p-3 font-mono font-medium text-caption text-ink">
                      {formatCurrency(exp.amount)}
                    </td>

                    <td className="p-3 text-right">
                      <span className="inline-block text-micro font-mono uppercase bg-emerald-50 text-emerald-800 border border-emerald-300 px-2 py-0.5">
                        {exp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Auxiliary Income View */
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="border border-border bg-canvas-surface p-4">
              <span className="text-micro font-mono text-ink-muted uppercase">Provisions Tuck Shop</span>
              <p className="text-xl font-serif text-brass tracking-tight font-medium font-tabular mt-1">
                {formatCurrency(
                  auxiliaryIncome
                    .filter((a) => a.source === "TUCK_SHOP")
                    .reduce((x, y) => x + y.amount, 0)
                )}
              </p>
            </div>

            <div className="border border-border bg-canvas-surface p-4">
              <span className="text-micro font-mono text-ink-muted uppercase">Excess Laundry Care</span>
              <p className="text-xl font-serif text-brass tracking-tight font-medium font-tabular mt-1">
                {formatCurrency(
                  auxiliaryIncome
                    .filter((a) => a.source === "LAUNDRY")
                    .reduce((x, y) => x + y.amount, 0)
                )}
              </p>
            </div>

            <div className="border border-border bg-canvas-surface p-4">
              <span className="text-micro font-mono text-ink-muted uppercase">Luggage Vault Lockers</span>
              <p className="text-xl font-serif text-brass tracking-tight font-medium font-tabular mt-1">
                {formatCurrency(
                  auxiliaryIncome
                    .filter((a) => a.source === "LOCKER_RENT")
                    .reduce((x, y) => x + y.amount, 0)
                )}
              </p>
            </div>

            <div className="border border-border bg-canvas-surface p-4">
              <span className="text-micro font-mono text-ink-muted uppercase">Total Ancillary Gross</span>
              <p className="text-xl font-serif text-emerald-800 tracking-tight font-medium font-tabular mt-1">
                {formatCurrency(totalAuxiliaryAmount)}
              </p>
            </div>
          </div>

          <div className="border border-border bg-canvas-surface overflow-x-auto">
            <table className="w-full text-left text-body border-collapse">
              <thead>
                <tr className="border-b border-border bg-canvas-subtle text-micro font-mono text-ink-muted uppercase">
                  <th className="p-3 font-semibold">Ancillary Receipt</th>
                  <th className="p-3 font-semibold">Source Channel</th>
                  <th className="p-3 font-semibold">Realized Date</th>
                  <th className="p-3 font-semibold text-right">Inflow Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {auxiliaryIncome.map((aux) => (
                  <tr key={aux.id} className="hover:bg-canvas-subtle/50 transition-colors">
                    <td className="p-3">
                      <p className="font-serif text-subhead font-medium text-ink leading-tight">
                        {aux.title}
                      </p>
                      <p className="text-micro text-ink-muted font-mono">
                        Ref: {aux.id}
                      </p>
                    </td>

                    <td className="p-3">
                      <span className="border border-border bg-canvas-subtle px-2 py-0.5 text-caption font-mono font-medium text-brass">
                        {aux.source}
                      </span>
                    </td>

                    <td className="p-3 font-mono text-caption text-ink-muted">
                      {formatDate(aux.date)}
                    </td>

                    <td className="p-3 font-mono font-medium text-caption text-emerald-800 text-right">
                      +{formatCurrency(aux.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Record Expense Modal */}
      {showAddExpenseModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-canvas-surface border border-border w-full max-w-md p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="font-serif text-subhead text-ink font-medium">
                Post Operational Disbursal
              </h3>
              <button
                onClick={() => setShowAddExpenseModal(false)}
                className="text-ink-muted hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateExpense} className="space-y-4">
              <div>
                <label className="block text-caption font-medium text-ink mb-1">
                  Category *
                </label>
                <select
                  value={newExpense.category}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, category: e.target.value as any })
                  }
                  className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass"
                >
                  <option value="Electricity">Electricity (LESCO)</option>
                  <option value="Groceries">Mess Groceries &amp; Poultry</option>
                  <option value="Gas">Gas (SNGPL)</option>
                  <option value="Water">Water (WASA / RO Plant)</option>
                  <option value="Internet">Internet (Fiber Lines)</option>
                  <option value="Repairs">Repairs &amp; Maintenance</option>
                  <option value="Rent">Property Lease Rent</option>
                  <option value="Other">Miscellaneous Auxiliary</option>
                </select>
              </div>

              <div>
                <label className="block text-caption font-medium text-ink mb-1">
                  Expenditure Description *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. LESCO Commercial 3-Phase Tariff"
                  value={newExpense.title}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, title: e.target.value })
                  }
                  className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-caption font-medium text-ink mb-1">
                    Amount (Rs.) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newExpense.amount}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, amount: Number(e.target.value) })
                    }
                    className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass font-mono"
                  />
                </div>

                <div>
                  <label className="block text-caption font-medium text-ink mb-1">
                    Disbursal Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newExpense.date}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, date: e.target.value })
                    }
                    className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowAddExpenseModal(false)}
                  className="px-4 py-2 border border-border text-caption text-ink-muted hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brass text-white text-caption font-medium hover:bg-brass-hover transition-colors"
                >
                  Commit Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Record Auxiliary Income Modal */}
      {showAddIncomeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-canvas-surface border border-border w-full max-w-md p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="font-serif text-subhead text-ink font-medium">
                Log Ancillary Revenue Inflow
              </h3>
              <button
                onClick={() => setShowAddIncomeModal(false)}
                className="text-ink-muted hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAuxIncome} className="space-y-4">
              <div>
                <label className="block text-caption font-medium text-ink mb-1">
                  Revenue Source *
                </label>
                <select
                  value={newAuxIncome.source}
                  onChange={(e) =>
                    setNewAuxIncome({ ...newAuxIncome, source: e.target.value as any })
                  }
                  className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass"
                >
                  <option value="TUCK_SHOP">Provisions Dispensary / Tuck Shop</option>
                  <option value="LAUNDRY">Excess Quota Laundry</option>
                  <option value="LOCKER_RENT">Heavy Luggage Vault Locker</option>
                  <option value="VENDING">Hydration &amp; Coffee Vending</option>
                  <option value="OTHER">Other Miscellaneous</option>
                </select>
              </div>

              <div>
                <label className="block text-caption font-medium text-ink mb-1">
                  Receipt Description *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Evening Study Beverage &amp; Snack Sales"
                  value={newAuxIncome.title}
                  onChange={(e) =>
                    setNewAuxIncome({ ...newAuxIncome, title: e.target.value })
                  }
                  className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-caption font-medium text-ink mb-1">
                    Amount (Rs.) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newAuxIncome.amount}
                    onChange={(e) =>
                      setNewAuxIncome({ ...newAuxIncome, amount: Number(e.target.value) })
                    }
                    className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass font-mono"
                  />
                </div>

                <div>
                  <label className="block text-caption font-medium text-ink mb-1">
                    Realized Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newAuxIncome.date}
                    onChange={(e) =>
                      setNewAuxIncome({ ...newAuxIncome, date: e.target.value })
                    }
                    className="w-full border border-border px-3 py-2 text-body bg-canvas focus:outline-hidden focus:border-brass font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowAddIncomeModal(false)}
                  className="px-4 py-2 border border-border text-caption text-ink-muted hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brass text-white text-caption font-medium hover:bg-brass-hover transition-colors"
                >
                  Commit Inflow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
