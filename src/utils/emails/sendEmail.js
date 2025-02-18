import nodemailer from "nodemailer";
import EventEmitter from "events";

export const myEventEmitter = new EventEmitter();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASS,
  },
});

export async function sendEmail(receiverEmail, subject, html) {
  // send mail with defined transport object
  await transporter.sendMail({
    from: `Book Store application 📕📢 <${process.env.SENDER_EMAIL}>`, // sender address
    to: receiverEmail, // list of receivers
    subject, // Subject line
    html, // html body
  });
}

myEventEmitter.on(process.env.SEND_EMAIL_EVENT, sendEmail);
