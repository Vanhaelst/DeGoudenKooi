import { NextResponse } from "next/server";

const url = "https://api.brevo.com/v3/smtp/email";

export async function POST(req, res) {
  const body = (await req.json()) ?? {};
  const { templateId, data } = body ?? {};

  console.log("sendMail route", templateId, data);

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      templateId: templateId,
      sender: data.sender,
      to: [data.to],
      replyTo: data.replyTo,
      params: data.params,
    }),
  };

  const result = await fetch(url, options)
    .then((res) => res.json())
    .then((json) => ({ status: 200, ...json }))
    .catch((err) => console.error(err));

  console.log("result", result);

  return NextResponse.json(result, { status: 200 });
}
