import nodemailer, { Transporter } from 'nodemailer';
import type { HttpError } from '../middleware/errorHandler';

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: Number(process.env.EMAIL_PORT) === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return transporter;
}

async function sendOtpEmail(to: string, otp: string, { minutes }: { minutes: number }): Promise<void> {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log(`[dev] OTP for ${to}: ${otp} (expires in ${minutes} minutes)`);
    return;
  }

  try {
    await getTransporter().sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject: 'Your Plywood Shop verification code',
      text: `Your verification code is ${otp}. It expires in ${minutes} minutes.`,
      html: `<p>Your verification code is <strong>${otp}</strong>.</p><p>It expires in ${minutes} minutes.</p>`,
    });
  } catch (err) {
    console.error('Failed to send OTP email:', err);
    const deliveryError = new Error('Could not send verification email. Please try again shortly.') as HttpError;
    deliveryError.status = 502;
    throw deliveryError;
  }
}

export { sendOtpEmail };
