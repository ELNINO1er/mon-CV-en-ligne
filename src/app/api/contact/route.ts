import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { profile } from "@/data/profile";

export const runtime = "nodejs";
const attempts = new Map<string, { count: number; expires: number }>();

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== request.nextUrl.origin) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  if (Number(request.headers.get("content-length")) > 16000) {
    return NextResponse.json({ error: "Message too long" }, { status: 413 });
  }
  let data;
  try { data = await request.json(); } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (!data || typeof data !== "object") return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const { name, email, message, type, website } = data;
  if (website) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  if (typeof name !== "string" || !name.trim() || name.length > 100 || /[\r\n]/.test(name) ||
      typeof email !== "string" || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof message !== "string" || message.trim().length < 10 || message.length > 5000 ||
      typeof type !== "string" || type.length > 100 || /[\r\n]/.test(type)) {
    return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
  }
  const now = Date.now();
  for (const [key, value] of attempts) if (value.expires < now) attempts.delete(key);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rate = attempts.get(ip) || { count: 0, expires: now + 15 * 60 * 1000 };
  if (rate.count >= 5) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  rate.count++;
  attempts.set(ip, rate);
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.replace(/\s/g, "");
  if (!user || !pass) return NextResponse.json({ error: "Email unavailable" }, { status: 503 });
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com", port: 465, secure: true,
    auth: { user, pass }, connectionTimeout: 10000, socketTimeout: 15000,
  });
  try {
    const result = await transport.sendMail({
      from: { name: "RoroDev — Portfolio", address: user },
      to: profile.email,
      replyTo: { name: name.trim(), address: email.trim() },
      subject: `[Portfolio · ${type}] ${name.trim()}`,
      text: `Nouveau message depuis le portfolio RoroDev\n\nNom : ${name.trim()}\nEmail : ${email.trim()}\nProjet : ${type}\n\n${message.trim()}`,
      disableFileAccess: true, disableUrlAccess: true,
    });
    if (!result.accepted.length) throw new Error("Recipient rejected");
    return NextResponse.json({ sent: true });
  } catch {
    return NextResponse.json({ error: "Sending failed" }, { status: 502 });
  } finally { transport.close(); }
}
