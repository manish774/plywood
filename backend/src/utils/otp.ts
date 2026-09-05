const OTP_LENGTH = 6;
const OTP_TTL_MINUTES: number = Number(process.env.OTP_EXPIRY_MINUTES) || 10;

function generateOtp(): string {
  const min = 10 ** (OTP_LENGTH - 1);
  const max = 10 ** OTP_LENGTH - 1;
  return String(Math.floor(min + Math.random() * (max - min + 1)));
}

function otpExpiry(): Date {
  return new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);
}

export { generateOtp, otpExpiry, OTP_TTL_MINUTES };
