import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { randomInt } from "crypto";
import bcrypt from "bcryptjs";

export const getPublicUser = (user) => ({
  _id: user._id,
  fullName: user.fullName,
  email: user.email,
  profilePic: user.profilePic,
  userId: user.userId,
  isVerified: user.isVerified,
});

export const createVerificationOtp = async (user) => {
  const otp = generateOtp();
  user.emailOtp = await bcrypt.hash(otp, 10);
  user.emailOtpExpiry = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes
  user.emailOtpLastSent = new Date();
  await user.save();
  await sendVerificationOtp(user, otp);
};


// Generating JWT token valid for 7 days.
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, //  7 days in MiliSecond
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    // sameSite: "none", // CSRF attacks cross-site request forgery attacks
    // secure: process.env.NODE_ENV !== "development",
  });

  return token;
};

export const generateUserId = (fullName) => {

  const firstName =
    fullName
      .trim()
      .split(" ")[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

  const timePart =
    Date.now().toString().slice(-5);

  const randomPart =
    Math.floor(10 + Math.random() * 90);

  return `${firstName}${timePart}${randomPart}`;
};


const EMAIL_FROM = process.env.EMAIL_FROM;

export const sendVerificationOtp = async (user, otp) => {
  const host = process.env.HOST || "smtp.gmail.com";
  const mailPort = Number(process.env.SMTP_PORT) || 587;
  const USERNAME = process.env.GMAIL_USER;
  const PASSWORD = process.env.GMAIL_PASS;

  if (!USERNAME || !PASSWORD) {
    throw new Error("Missing SMTP credentials. Set GMAIL_USER and GMAIL_PASS in .env.");
  }

  const transporter = nodemailer.createTransport({
    host,
    port: mailPort,
    secure: mailPort === 465,
    auth: {
      user: USERNAME,
      pass: PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: EMAIL_FROM,
    to: user.email,
    subject: "Verify your email for getting started with Chit Chat",
    html: `
      <p>Hi ${user.fullName},</p>
      <p>Your OTP for verifying your email is: <strong>${otp}</strong></p>
      <p>This OTP is valid for 5 minutes.</p>
      <p>If you did not request this, please ignore this email.</p>
      <p>Thanks,<br/>Chit Chat Team</p>
    `,
  });
};
export const generateOtp = () => {
  return randomInt(100000, 1000000).toString();
};
