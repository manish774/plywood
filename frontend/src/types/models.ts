// Shared domain types for the Plywood Shop frontend.
// Mirrors the backend Mongoose schemas (backend/src/models) and the
// response shapes produced by backend/src/controllers.

export interface Category {
  _id: string;
  name: string;
  description: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

// Body accepted by POST /categories and PUT /categories/:id.
export interface CategoryInput {
  name: string;
  description?: string;
  image?: string;
}

export interface ItemSpecifications {
  thickness: string;
  size: string;
  grade: string;
  brand: string;
}

export interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
  // GET responses populate `category` as a full Category (or `null` if the
  // referenced category no longer exists); write payloads (see ItemInput)
  // send/store a plain category id string.
  category: Category | string | null;
  images: string[];
  specifications: ItemSpecifications;
  createdAt?: string;
  updatedAt?: string;
}

// Body accepted by POST /items and PUT /items/:id.
export interface ItemInput {
  name: string;
  description?: string;
  price: number;
  category: string;
  images?: string[];
  specifications?: Partial<ItemSpecifications>;
}

export type ContactStatus = "pending" | "acknowledged";

// The minimal shape Contact.user is populated with on GET /contact
// (Contact.find().populate('user', 'name email phone')).
export interface ContactUserSummary {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  itemName?: string;
  item?: string | null;
  user?: string | ContactUserSummary | null;
  status: ContactStatus;
  adminReply: string;
  repliedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

// Body accepted by POST /contact.
export interface ContactInput {
  name: string;
  email: string;
  phone?: string;
  message: string;
  itemName?: string;
  itemId?: string;
}

// Response shape for DELETE /categories/:id and DELETE /items/:id.
export interface DeleteResponse {
  message: string;
  id: string;
}

// Generic `{ message }` response (register/login/resend-otp on the user
// auth flow, all of which only ever confirm an OTP was sent).
export interface MessageResponse {
  message: string;
}

// The shopper account shape returned by the user-auth flow (authController's
// `publicUser()` helper) — POST /auth/verify-otp's `user` field and the
// GET /auth/me response body.
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

// POST /admin/login response.
export interface AdminLoginResponse {
  token: string;
}

// POST /auth/verify-otp response.
export interface VerifyOtpResponse {
  token: string;
  user: User;
}

// Singleton shop settings, editable from the admin Customization tab.
export interface Settings {
  _id: string;
  shopName: string;
  shortName: string;
  tagline: string;
  logoUrl: string;
  address: string;
  mapUrl: string;
  whatsappNumber: string;
  phone: string;
  hours: string;
  instagramUrl: string;
  facebookUrl: string;
  ownerName: string;
  ownerPhone: string;
  createdAt?: string;
  updatedAt?: string;
}

// Body accepted by PUT /settings.
export type SettingsInput = Partial<Omit<Settings, "_id" | "createdAt" | "updatedAt">>;
