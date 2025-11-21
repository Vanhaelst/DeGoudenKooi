import { NextResponse } from "next/server";

export async function POST(req) {
  const { token } = await req.json();

  const secret = process.env.RECAPTCHA_SECRET_KEY;

  // Verify at Google
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secret}&response=${token}`,
    },
  );

  const data = await response.json();

  if (!data.success || data.score < 0.5) {
    console.log("Failed reCAPTCHA", data);
    return NextResponse.json({ message: "Failed reCAPTCHA" }, { status: 400 });
  }

  // The user is valid, continue with logic
  console.log("Success reCAPTCHA", data);
  return NextResponse.json({ message: "Success" });
}
