"use client";

import React, { useState } from "react";
import { FeeInvoiceItem, StudentItem } from "../lib/mock-data";
import hostelConfig from "../../hostel.config";
import { formatCurrency, formatDate } from "../lib/utils";
import { Send, X, Copy, Check, MessageSquare, Phone } from "lucide-react";

interface WhatsAppSlipModalProps {
  invoice: FeeInvoiceItem | null;
  student?: StudentItem;
  onClose: () => void;
}

export function WhatsAppSlipModal({
  invoice,
  student,
  onClose,
}: WhatsAppSlipModalProps) {
  const [recipient, setRecipient] = useState<"student" | "guardian">("student");
  const [language, setLanguage] = useState<"en" | "ur">("en");
  const [copied, setCopied] = useState(false);

  if (!invoice) return null;

  const phone =
    recipient === "student"
      ? student?.phone || "+92 301 4589210"
      : student?.guardianPhone || "+92 321 8492019";

  const cleanPhone = phone.replace(/\D/g, "");

  // Pre-formatted Official Text
  const messageEn = `*OFFICIAL FEE NOTIFICATION — ${hostelConfig.identity.name.toUpperCase()}*
Reference ID: ${invoice.id}
Resident: ${invoice.studentName}
Chamber: Suite #${invoice.roomNumber}
Billing Cycle: ${invoice.month} ${invoice.year}
----------------------------------------
Base Accommodation Tariff: ${formatCurrency(invoice.amount)}
${invoice.arrears > 0 ? `Arrears Brought Forward: ${formatCurrency(invoice.arrears)}\n` : ""}${invoice.discount > 0 ? `Discretionary Waiver: -${formatCurrency(invoice.discount)}\n` : ""}*Net Payable Balance: ${formatCurrency(invoice.totalDue)}*
Settlement Due Date: ${formatDate(invoice.dueDate)}
----------------------------------------
*BANK SETTLEMENT PARTICULARS:*
Bank: ${hostelConfig.banking.bankName}
Title: ${hostelConfig.banking.accountTitle}
IBAN: ${hostelConfig.banking.iban}

Kindly forward transaction receipt or bank stamped voucher to Warden Desk (${hostelConfig.identity.phone}) within 24 hours.`;

  const messageUr = `*آفیشل فیس نوٹس — ${hostelConfig.identity.name}*
انوائس نمبر: ${invoice.id}
طالب علم کا نام: ${invoice.studentName}
کمرہ نمبر: سویٹ #${invoice.roomNumber}
ماہانہ دورانیہ: ${invoice.month} ${invoice.year}
----------------------------------------
بنیادی ہاسٹل فیس: ${formatCurrency(invoice.amount)}
${invoice.arrears > 0 ? `سابقہ واجب الادا بقایا جات: ${formatCurrency(invoice.arrears)}\n` : ""}${invoice.discount > 0 ? `رعایت: -${formatCurrency(invoice.discount)}\n` : ""}*کل قابلِ ادا رقم: ${formatCurrency(invoice.totalDue)}*
آخری تاریخ ادائیگی: ${formatDate(invoice.dueDate)}
----------------------------------------
*بینک اکاؤنٹ کی تفصیلات:*
بینک کا نام: ${hostelConfig.banking.bankName}
ٹائٹل: ${hostelConfig.banking.accountTitle}
آئی بی این (IBAN): ${hostelConfig.banking.iban}

براہِ کرم ادائیگی کے بعد بینک سلپ یا ٹرانزیکشن رسید وارڈن ڈیسک پر جمع کروائیں۔`;

  const activeMessage = language === "en" ? messageEn : messageUr;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendWhatsApp = () => {
    const encoded = encodeURIComponent(activeMessage);
    const url = `https://wa.me/${cleanPhone}?text=${encoded}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-canvas-surface border border-border w-full max-w-lg p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-brass" />
            <span className="font-serif text-subhead tracking-tight text-ink font-medium">
              Direct WhatsApp Billing Dispatch
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 border border-border text-ink-muted hover:text-ink transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Recipient & Language Toggle */}
        <div className="grid grid-cols-2 gap-3 text-caption">
          <div>
            <label className="block text-ink-muted mb-1.5 font-medium">
              Target Recipient:
            </label>
            <div className="flex border border-border bg-canvas-subtle p-0.5">
              <button
                onClick={() => setRecipient("student")}
                className={`flex-1 py-1.5 transition-colors ${
                  recipient === "student"
                    ? "bg-canvas-surface text-ink font-medium shadow-xs"
                    : "text-ink-muted"
                }`}
              >
                Resident ({student?.phone ? student.phone.slice(-4) : "Cell"})
              </button>
              <button
                onClick={() => setRecipient("guardian")}
                className={`flex-1 py-1.5 transition-colors ${
                  recipient === "guardian"
                    ? "bg-canvas-surface text-ink font-medium shadow-xs"
                    : "text-ink-muted"
                }`}
              >
                Guardian
              </button>
            </div>
          </div>

          <div>
            <label className="block text-ink-muted mb-1.5 font-medium">
              Message Language:
            </label>
            <div className="flex border border-border bg-canvas-subtle p-0.5">
              <button
                onClick={() => setLanguage("en")}
                className={`flex-1 py-1.5 transition-colors ${
                  language === "en"
                    ? "bg-canvas-surface text-ink font-medium shadow-xs"
                    : "text-ink-muted"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage("ur")}
                className={`flex-1 py-1.5 transition-colors ${
                  language === "ur"
                    ? "bg-canvas-surface text-ink font-medium shadow-xs"
                    : "text-ink-muted"
                }`}
              >
                اردو (Urdu)
              </button>
            </div>
          </div>
        </div>

        {/* Message Preview Box */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-caption text-ink-muted">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-brass" />
              <span>Dispatch Destination: {phone}</span>
            </span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 hover:text-ink text-[11px]"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-status-occupied" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
          </div>

          <pre
            className="w-full h-44 p-3 bg-zinc-900 text-zinc-200 text-[11px] font-mono leading-relaxed border border-border overflow-y-auto whitespace-pre-wrap select-all"
            dir={language === "ur" ? "rtl" : "ltr"}
          >
            {activeMessage}
          </pre>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-caption text-ink-muted hover:text-ink border border-border"
          >
            Dismiss
          </button>

          <button
            onClick={handleSendWhatsApp}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white text-caption font-medium tracking-wide transition-colors"
          >
            <Send className="w-3.5 h-3.5 stroke-[1.25]" />
            <span>Open WhatsApp &amp; Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
