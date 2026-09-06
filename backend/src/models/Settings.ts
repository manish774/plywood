import mongoose, { Document, Schema } from 'mongoose';

// Singleton document: exactly one Settings row holds the shop's editable
// branding/contact info, managed from the admin Customization tab.
export interface ISettings extends Document {
  shopName: string;
  shortName: string;
  tagline: string;
  logoUrl: string;
  address: string;
  mapUrl: string;
  whatsappNumber: string;
  phone: string;
  hours: string;
}

const settingsSchema = new Schema<ISettings>(
  {
    shopName: { type: String, trim: true, default: 'Swastik Plywood And Decor' },
    shortName: { type: String, trim: true, default: 'Swastik' },
    tagline: { type: String, trim: true, default: 'Plywood And Decor' },
    logoUrl: { type: String, trim: true, default: '' },
    address: { type: String, trim: true, default: 'Ranchi - Ramgarh Rd, Ormanjhi, Ranchi, Jharkhand 835219' },
    mapUrl: { type: String, trim: true, default: 'https://maps.app.goo.gl/FZTYgzruo6NTY3ML9' },
    whatsappNumber: { type: String, trim: true, default: '919031440979' },
    phone: { type: String, trim: true, default: '+91 90314 40979' },
    hours: { type: String, trim: true, default: 'Mon–Sat, 7am–5pm' },
  },
  { timestamps: true }
);

export default mongoose.model<ISettings>('Settings', settingsSchema);
