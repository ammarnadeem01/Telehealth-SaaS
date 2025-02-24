import nodemailer from "nodemailer";
export const sendEmail = async (
  to: string,
  subject: string,
  message: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nadeemammar04@gmail.com",
        pass: process.env.APP_PASSWORD,
      },
    });
    const mailOptions = {
      from: "nadeemammar04@gmail.com",
      to,
      subject,
      html: message,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
