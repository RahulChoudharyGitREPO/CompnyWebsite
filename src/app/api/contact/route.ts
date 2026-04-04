import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!process.env.RESEND_API_KEY) {
      console.error("DEBUG: RESEND_API_KEY is missing");
      return NextResponse.json(
        { error: "Email service not configured correctly" },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    if (!name || !email || !subject || !message) {
      console.warn("DEBUG: Missing required fields", { name, email, subject, message });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: "GigtechOrbit Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "rahulrajwwe2@gmail.com",
      subject: `New Message: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (data.error) {
      console.error("DEBUG: Resend API responded with error", data.error);
      throw new Error(data.error.message || "Resend API error");
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("DEBUG: High-level Resend Error:", {
      message: error.message,
      stack: error.stack,
      env: process.env.NODE_ENV
    });
    return NextResponse.json(
      { error: error.message || "Failed to send email" },
      { status: 500 }
    );
  }
}
