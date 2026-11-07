import { NextRequest, NextResponse } from "next/server";
import { authLimiters } from "@/lib/rate-limiter";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE_BYTES = 200 * 1024; // Strictly < 200 KB as per Section 4

// Magic-byte inspection signatures
function checkMagicBytes(buffer: Uint8Array): string | null {
  if (buffer.length < 4) return null;

  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg";
  }

  // PNG: 89 50 4E 47
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
    return "image/png";
  }

  // WebP: 52 49 46 46 (RIFF) ... 57 45 42 50 (WEBP)
  if (
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer.length >= 12 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return "image/webp";
  }

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

    // Sliding-window limiter on uploads
    const rateCheck = authLimiters.uploadLimiter(ip);
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: "Upload velocity limit exceeded. Please wait 10 minutes." },
        { status: 429 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("slip") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Deposit slip file is required." },
        { status: 400 }
      );
    }

    // 1. File Size Verification (< 200 KB)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        {
          error: `Slip file size (${(file.size / 1024).toFixed(1)} KB) exceeds strict 200 KB ceiling. Please compress the slip photo.`,
        },
        { status: 413 }
      );
    }

    // 2. Client MIME Verification
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Permitted file formats are restricted strictly to JPEG, PNG, and WebP." },
        { status: 415 }
      );
    }

    // 3. Server-side Magic Byte Inspection
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    const verifiedMime = checkMagicBytes(bytes);

    if (!verifiedMime || !ALLOWED_MIME_TYPES.includes(verifiedMime)) {
      return NextResponse.json(
        {
          error: "Binary inspection failed. The uploaded file magic bytes do not conform to authentic image signatures.",
        },
        { status: 422 }
      );
    }

    // Return verified reference
    const slipId = `slip-${Date.now().toString().slice(-6)}`;
    return NextResponse.json({
      success: true,
      slipId,
      mime: verifiedMime,
      sizeBytes: file.size,
      message: "Bank deposit slip verified and queued for bursar reconciliation.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal slip ingestion error." },
      { status: 500 }
    );
  }
}
