import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from '../config/db';
import Admin from '../models/Admin';

// One-time/idempotent provisioning: creates or updates the staff login record
// in the DB from ADMIN_EMAIL/ADMIN_PASSWORD/ADMIN_NAME in .env. Run with:
//   npm run seed:admin
async function run(): Promise<void> {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || 'Shop Admin';

  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env to seed the staff account');
  }

  await connectDB();

  const normalizedEmail = email.trim().toLowerCase();
  let admin = await Admin.findOne({ email: normalizedEmail }).select('+password');

  if (admin) {
    admin.name = name;
    admin.password = password;
    await admin.save();
    console.log(`Updated existing staff account: ${normalizedEmail}`);
  } else {
    admin = new Admin({ name, email: normalizedEmail, password });
    await admin.save();
    console.log(`Created staff account: ${normalizedEmail}`);
  }

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error('Failed to seed staff account:', err);
  process.exit(1);
});
