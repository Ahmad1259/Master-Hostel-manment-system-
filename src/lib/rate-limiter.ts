interface RateLimitRecord {
  timestamps: number[];
}

const memoryStore = new Map<string, RateLimitRecord>();

/**
 * Sliding Window In-Memory Rate Limiter
 * @param identifier IP or user key (e.g. IP + ":login")
 * @param maxRequests Maximum allowable requests within the duration window
 * @param windowMs Window duration in milliseconds
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number,
  windowMs: number
): { success: boolean; remaining: number; resetTimeMs: number } {
  const now = Date.now();
  const record = memoryStore.get(identifier) || { timestamps: [] };

  // Filter out timestamps outside the active window
  const activeTimestamps = record.timestamps.filter(
    (timestamp) => now - timestamp < windowMs
  );

  if (activeTimestamps.length >= maxRequests) {
    const oldest = activeTimestamps[0];
    const resetTimeMs = windowMs - (now - oldest);
    return {
      success: false,
      remaining: 0,
      resetTimeMs: Math.max(0, resetTimeMs),
    };
  }

  activeTimestamps.push(now);
  memoryStore.set(identifier, { timestamps: activeTimestamps });

  return {
    success: true,
    remaining: maxRequests - activeTimestamps.length,
    resetTimeMs: windowMs,
  };
}

// Preconfigured limiters as per Section 4 Security Specification
export const authLimiters = {
  // Max 5 OTPs / password reset attempts per hour per IP
  otpLimiter: (ip: string) => checkRateLimit(`otp:${ip}`, 5, 60 * 60 * 1000),

  // Max 10 failed logins per 15 minutes per IP
  loginLimiter: (ip: string) => checkRateLimit(`login:${ip}`, 10, 15 * 60 * 1000),

  // Max 5 public inquiries per 10 minutes per IP
  inquiryLimiter: (ip: string) => checkRateLimit(`inquiry:${ip}`, 5, 10 * 60 * 1000),

  // Max 10 slip uploads per 10 minutes per IP
  uploadLimiter: (ip: string) => checkRateLimit(`upload:${ip}`, 10, 10 * 60 * 1000),
};
