import type { Request, Response } from 'express';
import Settings from '../models/Settings';

interface SettingsBody {
  shopName?: string;
  shortName?: string;
  tagline?: string;
  logoUrl?: string;
  address?: string;
  mapUrl?: string;
  whatsappNumber?: string;
  phone?: string;
  hours?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  ownerName?: string;
  ownerPhone?: string;
}

// There is exactly one settings document; create it (with schema defaults)
// on first read instead of requiring a separate seed step.
async function getOrCreateSettings() {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({});
  }
  return settings;
}

async function getSettings(req: Request, res: Response): Promise<void> {
  const settings = await getOrCreateSettings();
  res.json(settings);
}

async function updateSettings(req: Request<unknown, unknown, SettingsBody>, res: Response): Promise<void> {
  const {
    shopName,
    shortName,
    tagline,
    logoUrl,
    address,
    mapUrl,
    whatsappNumber,
    phone,
    hours,
    instagramUrl,
    facebookUrl,
    ownerName,
    ownerPhone,
  } = req.body;

  await getOrCreateSettings();

  const settings = await Settings.findOneAndUpdate(
    {},
    {
      shopName,
      shortName,
      tagline,
      logoUrl,
      address,
      mapUrl,
      whatsappNumber,
      phone,
      hours,
      instagramUrl,
      facebookUrl,
      ownerName,
      ownerPhone,
    },
    { new: true, runValidators: true, omitUndefined: true }
  );

  res.json(settings);
}

export { getSettings, updateSettings };
