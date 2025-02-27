import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const { startDate, adults, children, name, email, phone, paymentMethod, tourPackageBooked, tourPackagePrice } = await req.json()

    // Nodemailer Transporter Setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Format date
    const formattedDate = new Date(startDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    // HTML Email Template (For Admin)
    const adminHtmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Exciting New Booking Alert! 🎉</title>
        <style>
          body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff700; }
          .container { background-color: #fffde7; border-radius: 15px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .logo { display: block; width: 120px; margin: 0 auto 20px; }
          h1 { color: #ffa000; text-align: center; font-size: 28px; text-shadow: 1px 1px 2px #ffeb3b; }
          .booking-details { background-color: #ffffff; border-left: 4px solid #ffd600; padding: 15px; margin-top: 20px; border-radius: 0 15px 15px 0; }
          .footer { text-align: center; margin-top: 20px; font-size: 0.9em; color: #ffa000; }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="https://yzgm9kgloi90e8nh.public.blob.vercel-storage.com/IndianTravelTour-HHXMUA0dlj3o1vINmifgLVRNv23m3a" alt="Indian Travel Tour" class="logo">
          <h1>🎊 Woohoo! New Booking Alert! 🎊</h1>
          <div class="booking-details">
            <p>🧳 <strong>Tour Package:</strong> ${tourPackageBooked}</p>
            <p>💰 <strong>Package Price: $</strong> ${tourPackagePrice}</p>
            <p>👤 <strong>Name:</strong> ${name}</p>
            <p>📧 <strong>Email:</strong> ${email}</p>
            <p>📞 <strong>Phone:</strong> ${phone}</p>
            <p>🗓️ <strong>Start Date:</strong> ${formattedDate}</p>
            <p>🧑‍🤝‍🧑 <strong>Adults:</strong> ${adults} | 👶 <strong>Children:</strong> ${children}</p>
            <p>💳 <strong>Payment Method:</strong> ${paymentMethod}</p>
          </div>
          <p style="text-align: center; font-weight: bold; color: #ffa000;">Time to roll out the red carpet! 🥳</p>
        </div>
        <div class="footer">
          <p>© 2025 Indian Travel Tour. All rights reserved. Keep spreading the travel joy! ✈️🌟</p>
        </div>
      </body>
      </html>
    `

    // Admin Email
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: ["work.nikhileshrana@gmail.com", "contactravelforce@gmail.com"],
      subject: `🎉 New Booking Alert: ${tourPackageBooked} by ${name}!`,
      html: adminHtmlContent,
    }

    // HTML Response Email (For User)
    const userHtmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Adventure Awaits! 🌟</title>
        <style>
          body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff700; }
          .container { background-color: #fffde7; border-radius: 15px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .logo { display: block; width: 120px; margin: 0 auto 20px; }
          h1 { color: #ffa000; text-align: center; font-size: 28px; text-shadow: 1px 1px 2px #ffeb3b; }
          .booking-summary { background-color: #ffffff; border-left: 4px solid #ffd600; padding: 15px; margin-top: 20px; border-radius: 0 15px 15px 0; }
          .cta-button { display: inline-block; background-color: #ffa000; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 25px; margin-top: 20px; font-weight: bold; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .footer { text-align: center; margin-top: 20px; font-size: 0.9em; color: #ffa000; }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="https://yzgm9kgloi90e8nh.public.blob.vercel-storage.com/IndianTravelTour-HHXMUA0dlj3o1vINmifgLVRNv23m3a" alt="Indian Travel Tour" class="logo">
          <h1>🎉 Yay! Your Adventure is Booked! 🎉</h1>
          <p style="text-align: center; font-size: 18px;">Get ready for an amazing journey, ${name}! 🌈✨</p>
          <div class="booking-summary">
            <p>🧳 <strong>Tour Package:</strong> ${tourPackageBooked}</p>
            <p>💰 <strong>Package Price: $</strong> ${tourPackagePrice}</p>
            <p>🗓️ <strong>Start Date:</strong> ${formattedDate}</p>
            <p>🧑‍🤝‍🧑 <strong>Adults:</strong> ${adults} | 👶 <strong>Children:</strong> ${children}</p>
            <p>💳 <strong>Payment Method:</strong> ${paymentMethod}</p>
          </div>
          <p style="text-align: center;">We're thrilled to have you on board! If you have any questions, just give us a shout. 📞</p>
          <div style="text-align: center;">
            <a href="https://indiantraveltour.in" class="cta-button">Explore More Adventures! 🗺️</a>
          </div>
        </div>
        <div class="footer">
          <p>© 2025 Indian Travel Tour. All rights reserved. Let the countdown to your adventure begin! ⏳🌟</p>
        </div>
      </body>
      </html>
    `

    // User Email
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `🎊 Woohoo! Your ${tourPackageBooked} Adventure is Confirmed!`,
      html: userHtmlContent,
    }

    // Send Emails
    await transporter.sendMail(adminMailOptions)
    await transporter.sendMail(userMailOptions)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}

