import nodemailer from "nodemailer";

export const sendBookingConfirmationEmail = async (bookingDetails) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Highway Delite" <${process.env.EMAIL_USER}>`,
      to: bookingDetails.userEmail,
      subject: `Booking Confirmed! (Ref ID: ${bookingDetails._id})`,
      html: `
        <h1>Booking Confirmed!</h1>
        <p>Hi ${bookingDetails.userName},</p>
        <p>Your booking for ${bookingDetails.experience.title} is confirmed.</p>
        <ul>
          <li><strong>Booking ID:</strong> ${bookingDetails._id}</li>
          <li><strong>Date:</strong> ${new Date(bookingDetails.bookingDate).toLocaleDateString()}</li>
          <li><strong>Price Paid:</strong> ₹${bookingDetails.pricePaid}</li>
        </ul>
        <p>Thank you for booking with us!</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: " + info.response);
    
  } catch (error) {
    console.error("Error sending email:", error);
  }
};