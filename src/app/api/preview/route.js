import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token =
    searchParams.get("token") || searchParams.get("x-craft-live-preview");
  const uri = searchParams.get("uri");

  if (!token) {
    return NextResponse.json({ message: "No preview token" }, { status: 401 });
  }

  if (!uri) {
    return NextResponse.json({ message: "No URI provided" }, { status: 401 });
  }

  // Redirect to the URI with the token as a query parameter
  redirect(`/${uri}?x-craft-live-preview=${token}`);
}
