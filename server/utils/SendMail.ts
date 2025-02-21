import nodemailer from "nodemailer";
export const sendEmail = async (to: string, subject: string, text: string) => {
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
      to: "ammarpk2004@gmail.com",
      subject: process.env.SUBJECT_LOGIN,
      text: "Your email client does not support HTML emails. Please enable HTML to view the full content.",
      html: process.env.TEXT_LOGIN,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
