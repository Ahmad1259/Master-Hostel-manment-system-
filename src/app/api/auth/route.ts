import { NextRequest, NextResponse } from "next/server";
import { authLimiters } from "@/lib/rate-limiter";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

    // Sliding-window rate limiter: max 10 failed logins per 15 minutes per IP
    const rateCheck = authLimiters.loginLimiter(ip);
    if (!rateCheck.success) {
      return NextResponse.json(
        {
          error: "Authentication threshold exceeded. IP temporarily throttled for 15 minutes.",
          resetTimeMs: rateCheck.resetTimeMs,
        },
        { status: 429 }
      );
    }

    const { email, password, turnstileToken } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required credentials." },
        { status: 400 }
      );
    }

    // Demo Authorized Credentials for Warden & Bursar
    if (
      (email === "warden@grandpavilion.pk" && password === "Warden2026Secure!") ||
      (email === "accountant@grandpavilion.pk" && password === "Audit2026Secure!") ||
      (email === "admin@grandpavilion.pk" && password === "Admin2026Secure!")
    ) {
      return NextResponse.json({
        success: true,
        user: {
          name: email.includes("warden") ? "Maj. (R) Tariq Mehmood" : "Muhammad Asim Qureshi",
          role: email.includes("warden") ? "WARDEN" : "ACCOUNTANT",
          email,
        },
      });
    }

    return NextResponse.json(
      { error: "Invalid operational credentials provided." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication system error." },
      { status: 500 }
    );
  }
}
