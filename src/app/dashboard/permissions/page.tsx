"use client";

import React, { useState } from "react";
import { useApp } from "../../../lib/store";
import {
  ShieldAlert,
  ShieldCheck,
  Check,
  X,
  Lock,
  UserCheck,
  Briefcase,
  Layers,
  Receipt,
  TrendingDown,
  Users,
} from "lucide-react";

export default function PermissionsPage() {
  const { staff, updateStaffPermissions, t } = useApp();
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleToggle = (
    staffId: string,
    field: "canManageFees" | "canManageRooms" | "canManageExpenses" | "canManageStaff"
  ) => {
    const member = staff.find((s) => s.id === staffId);
    if (!member) return;

    const updatedPermissions = {
      ...member.permissions,
      [field]: !member.permissions[field],
    };

    updateStaffPermissions(staffId, updatedPermissions);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-caption font-mono uppercase text-brass tracking-widest">
            Security &amp; RBAC Compartmentalization
          </span>
          <h1 className="font-serif text-title tracking-tight text-ink mt-0.5">
            {t.permissionsTitle}
          </h1>
          <p className="text-body text-ink-muted">
            {t.permissionsSubtitle}
          </p>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-2 border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-caption text-emerald-800 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Cryptographic Session Tokens Updated</span>
          </div>
        )}
      </div>

      {/* RBAC Description Card */}
      <div className="border border-border bg-canvas-surface p-5 space-y-2">
        <div className="flex items-center gap-2 text-caption font-mono text-brass uppercase tracking-wider">
          <Lock className="w-4 h-4" />
          <span>Strict Zero-Trust Role-Based Access Framework</span>
        </div>
        <p className="text-body text-ink-muted leading-relaxed">
          In accordance with enterprise data protection, credentials granted to staff members restrict access to server actions, API endpoints, and private client views. An Accountant has zero visibility over student disciplinary notes, while a Hostel Warden is barred from auditing commercial partner distributions.
        </p>
      </div>

      {/* Granular Permission Matrix Table */}
      <div className="border border-border bg-canvas-surface overflow-x-auto">
        <table className="w-full text-left text-body border-collapse">
          <thead>
            <tr className="border-b border-border bg-canvas-subtle text-[11px] font-mono text-ink-muted uppercase">
              <th className="p-3 font-semibold">Staff Identity &amp; Role</th>
              <th className="p-3 font-semibold text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <Receipt className="w-3.5 h-3.5 text-brass" />
                  <span>Fees &amp; Challans</span>
                </div>
              </th>
              <th className="p-3 font-semibold text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-brass" />
                  <span>Rooms &amp; Beds</span>
                </div>
              </th>
              <th className="p-3 font-semibold text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <TrendingDown className="w-3.5 h-3.5 text-brass" />
                  <span>Expenses &amp; Ledger</span>
                </div>
              </th>
              <th className="p-3 font-semibold text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-brass" />
                  <span>Staff &amp; Payroll</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {staff.map((stf) => (
              <tr key={stf.id} className="hover:bg-canvas-subtle/50 transition-colors">
                <td className="p-3">
                  <p className="font-serif text-subhead font-medium text-ink leading-tight">
                    {stf.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-mono border border-border bg-canvas-subtle px-1.5 py-0.2 text-ink">
                      {stf.role}
                    </span>
                    <span className="text-[10px] font-mono text-ink-muted">
                      ID: {stf.id}
                    </span>
                  </div>
                </td>

                {/* canManageFees */}
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleToggle(stf.id, "canManageFees")}
                    className={`w-8 h-8 mx-auto border flex items-center justify-center transition-colors ${
                      stf.permissions.canManageFees
                        ? "bg-emerald-700 border-emerald-700 text-white"
                        : "bg-zinc-100 border-zinc-300 text-zinc-400 hover:border-zinc-400"
                    }`}
                    title={stf.permissions.canManageFees ? "Revoke Fee Access" : "Grant Fee Access"}
                  >
                    {stf.permissions.canManageFees ? (
                      <Check className="w-4 h-4 stroke-[2]" />
                    ) : (
                      <X className="w-3.5 h-3.5" />
                    )}
                  </button>
                </td>

                {/* canManageRooms */}
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleToggle(stf.id, "canManageRooms")}
                    className={`w-8 h-8 mx-auto border flex items-center justify-center transition-colors ${
                      stf.permissions.canManageRooms
                        ? "bg-emerald-700 border-emerald-700 text-white"
                        : "bg-zinc-100 border-zinc-300 text-zinc-400 hover:border-zinc-400"
                    }`}
                    title={stf.permissions.canManageRooms ? "Revoke Room Access" : "Grant Room Access"}
                  >
                    {stf.permissions.canManageRooms ? (
                      <Check className="w-4 h-4 stroke-[2]" />
                    ) : (
                      <X className="w-3.5 h-3.5" />
                    )}
                  </button>
                </td>

                {/* canManageExpenses */}
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleToggle(stf.id, "canManageExpenses")}
                    className={`w-8 h-8 mx-auto border flex items-center justify-center transition-colors ${
                      stf.permissions.canManageExpenses
                        ? "bg-emerald-700 border-emerald-700 text-white"
                        : "bg-zinc-100 border-zinc-300 text-zinc-400 hover:border-zinc-400"
                    }`}
                    title={stf.permissions.canManageExpenses ? "Revoke Expense Access" : "Grant Expense Access"}
                  >
                    {stf.permissions.canManageExpenses ? (
                      <Check className="w-4 h-4 stroke-[2]" />
                    ) : (
                      <X className="w-3.5 h-3.5" />
                    )}
                  </button>
                </td>

                {/* canManageStaff */}
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleToggle(stf.id, "canManageStaff")}
                    className={`w-8 h-8 mx-auto border flex items-center justify-center transition-colors ${
                      stf.permissions.canManageStaff
                        ? "bg-emerald-700 border-emerald-700 text-white"
                        : "bg-zinc-100 border-zinc-300 text-zinc-400 hover:border-zinc-400"
                    }`}
                    title={stf.permissions.canManageStaff ? "Revoke Staff Access" : "Grant Staff Access"}
                  >
                    {stf.permissions.canManageStaff ? (
                      <Check className="w-4 h-4 stroke-[2]" />
                    ) : (
                      <X className="w-3.5 h-3.5" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
