// app/api/ping/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db"; // adjust path if needed

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ status: "connected" });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return NextResponse.json({ status: "error", error: "DB connection failed" }, { status: 500 });
  }
}
