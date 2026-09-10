// The shop's actual branding/contact info now lives in the backend (Settings
// collection, editable from the admin Customization tab) and is loaded at
// runtime via SettingsContext. These are only the fallback values rendered
// before that fetch resolves (and if it ever fails) — they intentionally
// mirror the backend model's own schema defaults.
export const DEFAULT_SETTINGS = {
  shopName: "Swastik Plywood And Decor",
  shortName: "Swastik",
  tagline: "Plywood And Decor",
  logoUrl: "",
  address: "Ranchi - Ramgarh Rd, Ormanjhi, Ranchi, Jharkhand 835219",
  mapUrl: "https://maps.app.goo.gl/FZTYgzruo6NTY3ML9",
  whatsappNumber: "919031440979",
  phone: "+91 90314 40979",
  hours: "Mon–Sat, 7am–5pm",
  instagramUrl: "",
  facebookUrl: "",
  ownerName: "",
  ownerPhone: "",
  googleRatingValue: 5,
  googleReviewCount: 5,
};
