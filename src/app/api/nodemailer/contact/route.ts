import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const { name, email, message, subject } = await req.json()

    // Nodemailer Transporter Setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // HTML Email Template (For Admin)
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Inquiry</title>
        <style>
          body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .container { background-color: #f9f9f9; border-radius: 5px; padding: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
          .logo { display: block; width: 120px; margin: 0 auto 20px; }
          h1 { color: #FACC15; text-align: center; }
          .message { background-color: #ffffff; border-left: 4px solid #FACC15; padding: 15px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 20px; font-size: 0.8em; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="https://yzgm9kgloi90e8nh.public.blob.vercel-storage.com/IndianTravelTour-HHXMUA0dlj3o1vINmifgLVRNv23m3a" alt="Indian Travel Tour" class="logo">
          <h1>New Contact Inquiry</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div class="message">
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
        </div>
        <div class="footer">
          <p>© 2025 Indian Travel Tour. All rights reserved.</p>
        </div>
      </body>
      </html>
    `

    // Admin Email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: ["work.nikhileshrana@gmail.com", "contactravelforce@gmail.com"],
      subject: `New Inquiry from ${name} - Indian Travel Tour`,
      html: htmlContent,
    }

    // HTML Response Email (For User)
    const userHtmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Your Inquiry</title>
        <style>
          body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .container { background-color: #f9f9f9; border-radius: 5px; padding: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
          .logo { display: block; width: 120px; margin: 0 auto 20px; }
          h1 { color: #FACC15; text-align: center; }
          .cta-button { display: inline-block; background-color: #FACC15; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 20px; font-size: 0.8em; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="https://yzgm9kgloi90e8nh.public.blob.vercel-storage.com/IndianTravelTour-HHXMUA0dlj3o1vINmifgLVRNv23m3a" alt="Indian Travel Tour" class="logo">
          <h1>Thank You for Reaching Out, ${name}!</h1>
          <p>We have received your message and our team will get back to you shortly.</p>
          <p>For quick assistance, feel free to reach us at <a href="mailto:contactravelforce@gmail.com">contactravelforce@gmail.com</a></p>
          <p>We are also available on whatsapp, +91 9811171495</p>
          <a href="https://indiantraveltour.in" class="cta-button">Visit Our Website</a>
        </div>
        <div class="footer">
          <p>© 2025 Indian Travel Tour. All rights reserved.</p>
        </div>
      </body>
      </html>
    `

    // Acknowledgment Email to User
    const userFeedback = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thank You for Your Inquiry - Indian Travel Tour`,
      html: userHtmlContent,
    }

    // Send Emails
    const info = await transporter.sendMail(mailOptions)
    const sendToUser = await transporter.sendMail(userFeedback)

    return NextResponse.json({ success: true, info }, { status: 200 })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}

