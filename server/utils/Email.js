import nodemailer from "nodemailer";

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service:'Gmail',
      auth: {
        user:process.env.ORG_EMAIL,
        pass:process.env.EMAIL_PASS
      },
    });

    await transporter.sendMail({
      from: process.env.ORG_EMAIL,
      to: email,
      subject: subject,
      text: text,
    });
    return "email sent successfully";

  } catch (error) {
    return "email not sent";
    console.log(error);
  }
};

export default sendEmail;