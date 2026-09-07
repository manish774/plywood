// Placeholder data used only while VITE_USE_MOCK=true (backend not wired up yet).
// Delete this file once real API integration lands everywhere.
//
// Every method below is typed to match its real counterpart in ../api/*.ts
// exactly, so USE_MOCK can flip between mock and real implementations
// without call sites caring which one is active.

import type {
  AdminLoginResponse,
  Category,
  CategoryInput,
  Contact,
  ContactInput,
  DeleteResponse,
  Item,
  ItemInput,
  MessageResponse,
  Settings,
  SettingsInput,
  User,
  VerifyOtpResponse,
} from "../types/models";

// Internal storage shape for items: category is always the plain id string
// here; `populateItem` resolves it to a full Category the way the real API
// does on GET responses.
type StoredItem = Omit<Item, "category"> & { category: string };

let categories: Category[] = [
  {
    _id: "cat-1",
    name: "Marine Plywood",
    description:
      "BWP (IS:710) grade waterproof plywood built to survive Jharkhand's monsoon humidity — for kitchens, bathrooms and outdoor cabinetry.",
    image:
      "https://images.unsplash.com/photo-1601058268499-e52658b8bb88?w=800&q=80",
  },
  {
    _id: "cat-2",
    name: "Commercial Plywood",
    description:
      "MR grade (IS:303) general-purpose plywood for everyday furniture, wardrobes and interior fit-outs at a value price.",
    image:
      "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=800&q=80",
  },
  {
    _id: "cat-3",
    name: "Block Board",
    description:
      "Lightweight wood-strip core boards for wardrobe shutters, partitions and long panels where solid plywood would be overkill.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
  },
  {
    _id: "cat-4",
    name: "Flush Doors",
    description:
      "Factory-finished flush doors in laminate and veneer finishes, ready to hang for home and office interiors.",
    image:
      "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=800&q=80",
  },
  {
    _id: "cat-5",
    name: "Decorative Laminates",
    description:
      "Sunmica-style laminate sheets in glossy, matte and textured finishes to dress up furniture, wardrobes and counters.",
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80",
  },
  {
    _id: "cat-6",
    name: "Decorative Veneer",
    description:
      "Natural wood veneer sheets for feature walls, panelling and premium furniture faces.",
    image:
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=800&q=80",
  },
];

let items: StoredItem[] = [
  // Marine Plywood
  {
    _id: "item-1",
    name: "CenturyPly Sainik 710 Marine Plywood 19mm",
    description:
      "ISI-marked BWP (IS:710) grade marine plywood with a phenol-bonded core. Fully boiling-waterproof — the shop's top pick for kitchens and bathroom units.",
    price: 5800,
    category: "cat-1",
    images: [
      "https://images.unsplash.com/photo-1601058268499-e52658b8bb88?w=1000&q=80",
    ],
    specifications: {
      thickness: "19mm",
      size: "2440 x 1220mm (8x4 ft)",
      grade: "BWP - IS:710",
      brand: "CenturyPly",
    },
  },
  {
    _id: "item-2",
    name: "Greenply Marine Gold BWP Plywood 18mm",
    description:
      "Termite and borer resistant marine-grade plywood with a hardwood core, built for long-term moisture exposure.",
    price: 5200,
    category: "cat-1",
    images: [
      "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=1000&q=80",
    ],
    specifications: {
      thickness: "18mm",
      size: "2440 x 1220mm (8x4 ft)",
      grade: "BWP - IS:710",
      brand: "Greenply",
    },
  },
  {
    _id: "item-3",
    name: "Kitply Marine Plus Plywood 12mm",
    description:
      "Mid-thickness marine plywood suited to bathroom cabinets, outdoor shutters and utility furniture.",
    price: 3600,
    category: "cat-1",
    images: [
      "https://images.unsplash.com/photo-1601058268499-e52658b8bb88?w=1000&q=80",
    ],
    specifications: {
      thickness: "12mm",
      size: "2440 x 1220mm (8x4 ft)",
      grade: "BWP - IS:710",
      brand: "Kitply",
    },
  },

  // Commercial Plywood
  {
    _id: "item-4",
    name: "Greenply Ecotec MR Grade Plywood 19mm",
    description:
      "Moisture-resistant (IS:303) commercial plywood for wardrobes, cabinets and general carpentry work.",
    price: 3000,
    category: "cat-2",
    images: [
      "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=1000&q=80",
    ],
    specifications: {
      thickness: "19mm",
      size: "2440 x 1220mm (8x4 ft)",
      grade: "MR - IS:303",
      brand: "Greenply",
    },
  },
  {
    _id: "item-5",
    name: "CenturyPly Sainik 303 Commercial Plywood 12mm",
    description:
      "Everyday-use commercial plywood with a strong core and smooth face, ready for painting or laminate finishing.",
    price: 2400,
    category: "cat-2",
    images: [
      "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=1000&q=80",
    ],
    specifications: {
      thickness: "12mm",
      size: "2440 x 1220mm (8x4 ft)",
      grade: "MR - IS:303",
      brand: "CenturyPly",
    },
  },
  {
    _id: "item-6",
    name: "Archidply MR Commercial Plywood 6mm",
    description:
      "Thin-panel commercial plywood for backing panels, drawer bottoms and light partition work.",
    price: 1450,
    category: "cat-2",
    images: [
      "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=1000&q=80",
    ],
    specifications: {
      thickness: "6mm",
      size: "2440 x 1220mm (8x4 ft)",
      grade: "MR - IS:303",
      brand: "Archidply",
    },
  },

  // Block Board
  {
    _id: "item-7",
    name: "Duro Gold Block Board 25mm",
    description:
      "Seasoned wood-strip core block board for wardrobe shutters and table tops needing a lightweight, screw-holding panel.",
    price: 3100,
    category: "cat-3",
    images: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&q=80",
    ],
    specifications: {
      thickness: "25mm",
      size: "2440 x 1220mm (8x4 ft)",
      grade: "BWR - IS:1659",
      brand: "Duro",
    },
  },
  {
    _id: "item-8",
    name: "Archidply Platinum Block Board 19mm",
    description:
      "Balanced-core block board for partitions, false ceilings and long wardrobe panels.",
    price: 2600,
    category: "cat-3",
    images: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&q=80",
    ],
    specifications: {
      thickness: "19mm",
      size: "2440 x 1220mm (8x4 ft)",
      grade: "BWR - IS:1659",
      brand: "Archidply",
    },
  },
  {
    _id: "item-9",
    name: "CenturyPly Sainik Block Board 19mm",
    description:
      "Termite-resistant block board built for wardrobe and cabinet carcasses where full plywood weight isn't needed.",
    price: 2850,
    category: "cat-3",
    images: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&q=80",
    ],
    specifications: {
      thickness: "19mm",
      size: "2440 x 1220mm (8x4 ft)",
      grade: "BWR - IS:1659",
      brand: "CenturyPly",
    },
  },

  // Flush Doors
  {
    _id: "item-10",
    name: "CenturyPly Century Flush Door (Laminated) 32mm",
    description:
      "Solid-core flush door with factory-laminated finish on both faces — ready to hang for bedrooms and offices.",
    price: 4500,
    category: "cat-4",
    images: [
      "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=1000&q=80",
    ],
    specifications: {
      thickness: "32mm",
      size: "2100 x 900mm (7x3 ft)",
      grade: "Solid Core",
      brand: "CenturyPly",
    },
  },
  {
    _id: "item-11",
    name: "Greenply Decorative Veneer Flush Door 35mm",
    description:
      "Premium flush door with a natural veneer face, pre-fit for polishing — a popular choice for main entry doors.",
    price: 5200,
    category: "cat-4",
    images: [
      "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=1000&q=80",
    ],
    specifications: {
      thickness: "35mm",
      size: "2100 x 900mm (7x3 ft)",
      grade: "Solid Core",
      brand: "Greenply",
    },
  },
  {
    _id: "item-12",
    name: "Kitply Moulded Flush Door 30mm",
    description:
      "Budget-friendly moulded-skin flush door for internal rooms, stores and utility spaces.",
    price: 3800,
    category: "cat-4",
    images: [
      "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=1000&q=80",
    ],
    specifications: {
      thickness: "30mm",
      size: "2100 x 750mm (7x2.5 ft)",
      grade: "Hollow Core",
      brand: "Kitply",
    },
  },

  // Decorative Laminates
  {
    _id: "item-13",
    name: "Merino Laminate Sheet — High Gloss 1mm",
    description:
      "High-gloss decorative laminate sheet for wardrobe shutters, kitchen cabinets and modular furniture.",
    price: 1450,
    category: "cat-5",
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1000&q=80",
    ],
    specifications: {
      thickness: "1mm",
      size: "2440 x 1220mm (8x4 ft)",
      grade: "HPL - High Gloss",
      brand: "Merino",
    },
  },
  {
    _id: "item-14",
    name: "Greenlam Laminate Sheet — Matte Finish 1mm",
    description:
      "Fingerprint-resistant matte laminate for a contemporary, low-maintenance furniture surface.",
    price: 1650,
    category: "cat-5",
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1000&q=80",
    ],
    specifications: {
      thickness: "1mm",
      size: "2440 x 1220mm (8x4 ft)",
      grade: "HPL - Matte",
      brand: "Greenlam",
    },
  },
  {
    _id: "item-15",
    name: "Stylam Textured Laminate Sheet 0.8mm",
    description:
      "Wood-grain textured laminate for a natural look on wardrobes, doors and office furniture at an economical price.",
    price: 950,
    category: "cat-5",
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1000&q=80",
    ],
    specifications: {
      thickness: "0.8mm",
      size: "2440 x 1220mm (8x4 ft)",
      grade: "HPL - Textured",
      brand: "Stylam",
    },
  },

  // Decorative Veneer
  {
    _id: "item-16",
    name: "Archidply Natural Teak Veneer Sheet 4mm",
    description:
      "Book-matched natural teak veneer for feature walls, doors and premium cabinetry faces.",
    price: 3200,
    category: "cat-6",
    images: [
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=1000&q=80",
    ],
    specifications: {
      thickness: "4mm",
      size: "2440 x 1220mm (8x4 ft)",
      grade: "Natural - AA",
      brand: "Archidply",
    },
  },
  {
    _id: "item-17",
    name: "Greenply Walnut Veneer Sheet 4mm",
    description:
      "Rich dark walnut veneer sheet for statement furniture pieces and TV unit panelling.",
    price: 3800,
    category: "cat-6",
    images: [
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=1000&q=80",
    ],
    specifications: {
      thickness: "4mm",
      size: "2440 x 1220mm (8x4 ft)",
      grade: "Natural - AA",
      brand: "Greenply",
    },
  },
  {
    _id: "item-18",
    name: "CenturyPly Oak Veneer Sheet 3mm",
    description:
      "Light oak veneer sheet, pre-sanded and ready to polish — a favourite for modern wardrobe interiors.",
    price: 2900,
    category: "cat-6",
    images: [
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=1000&q=80",
    ],
    specifications: {
      thickness: "3mm",
      size: "2440 x 1220mm (8x4 ft)",
      grade: "Natural - A",
      brand: "CenturyPly",
    },
  },
];

const delay = (ms = 350): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

let categorySeq = categories.length + 1;
let itemSeq = items.length + 1;

// Mirrors the real API: GET responses return `category` populated as a full
// Category object, but writes accept/store a plain category id string.
function populateItem(item: StoredItem): Item {
  const category = categories.find((c) => c._id === item.category) || null;
  return { ...item, category };
}

interface MockApiError extends Error {
  response?: { status: number; data: { error?: string; message?: string } };
}

function apiError(status: number, message: string): MockApiError {
  const err = new Error(message) as MockApiError;
  err.response = { status, data: { error: message, message } };
  return err;
}

// Mock-only in-memory state for the customer auth + inquiries flows.
let inquiries: Contact[] = [];
let inquirySeq = 1;
let mockUser: User | null = null;
let mockOtp: string | null = null;

let settings: Settings = {
  _id: "settings-1",
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
};

export const mockApi = {
  async getSettings(): Promise<Settings> {
    await delay();
    return { ...settings };
  },
  async updateSettings(data: SettingsInput): Promise<Settings> {
    await delay();
    settings = { ...settings, ...data };
    return { ...settings };
  },

  async listCategories(): Promise<Category[]> {
    await delay();
    return categories.map((c) => ({ ...c }));
  },
  async getCategory(id: string): Promise<Category> {
    await delay();
    const found = categories.find((c) => c._id === id);
    if (!found) throw new Error("Category not found");
    return { ...found };
  },
  async createCategory(data: CategoryInput): Promise<Category> {
    await delay();
    const created: Category = { _id: `cat-${categorySeq++}`, description: "", image: "", ...data };
    categories = [...categories, created];
    return created;
  },
  async updateCategory(id: string, data: Partial<CategoryInput>): Promise<Category> {
    await delay();
    categories = categories.map((c) => (c._id === id ? { ...c, ...data } : c));
    const updated = categories.find((c) => c._id === id);
    if (!updated) throw new Error("Category not found");
    return updated;
  },
  async deleteCategory(id: string): Promise<DeleteResponse> {
    await delay();
    categories = categories.filter((c) => c._id !== id);
    items = items.filter((i) => i.category !== id);
    return { message: "Category deleted", id };
  },

  async listItems(categoryId?: string): Promise<Item[]> {
    await delay();
    const filtered = categoryId
      ? items.filter((i) => i.category === categoryId)
      : items;
    return filtered.map(populateItem);
  },
  async getItem(id: string): Promise<Item> {
    await delay();
    const found = items.find((i) => i._id === id);
    if (!found) throw new Error("Item not found");
    return populateItem(found);
  },
  async createItem(data: ItemInput): Promise<Item> {
    await delay();
    const created: StoredItem = {
      _id: `item-${itemSeq++}`,
      description: "",
      images: [],
      ...data,
      specifications: {
        thickness: data.specifications?.thickness ?? "",
        size: data.specifications?.size ?? "",
        grade: data.specifications?.grade ?? "",
        brand: data.specifications?.brand ?? "",
      },
    };
    items = [...items, created];
    return populateItem(created);
  },
  async updateItem(id: string, data: Partial<ItemInput>): Promise<Item> {
    await delay();
    items = items.map((i) =>
      i._id === id
        ? {
            ...i,
            ...data,
            specifications: data.specifications
              ? {
                  thickness: data.specifications.thickness ?? i.specifications.thickness,
                  size: data.specifications.size ?? i.specifications.size,
                  grade: data.specifications.grade ?? i.specifications.grade,
                  brand: data.specifications.brand ?? i.specifications.brand,
                }
              : i.specifications,
          }
        : i
    );
    const updated = items.find((i) => i._id === id);
    if (!updated) throw new Error("Item not found");
    return populateItem(updated);
  },
  async deleteItem(id: string): Promise<DeleteResponse> {
    await delay();
    items = items.filter((i) => i._id !== id);
    return { message: "Item deleted", id };
  },

  async submitContact(data: ContactInput): Promise<Contact> {
    await delay();
    const created: Contact = {
      _id: `contact-${inquirySeq++}`,
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      message: data.message,
      itemName: data.itemName || "",
      item: data.itemId || null,
      user: mockUser ? mockUser.id : null,
      status: "pending",
      adminReply: "",
      repliedAt: null,
      createdAt: new Date().toISOString(),
    };
    inquiries = [created, ...inquiries];
    return created;
  },

  async listInquiries(): Promise<Contact[]> {
    await delay();
    return inquiries;
  },

  async login(email: string, password: string): Promise<AdminLoginResponse> {
    await delay();
    if (email === "admin@swastikplywood.test" && password === "plywood123") {
      return { token: "mock-jwt-token-for-local-dev" };
    }
    throw apiError(401, "Invalid email or password");
  },

  async userRegister(name: string, email: string, phone: string): Promise<MessageResponse> {
    await delay();
    mockUser = { id: "user-1", name, email, phone };
    mockOtp = "123456";
    return { message: "OTP sent to email. Verify to complete registration." };
  },
  async userLogin(email: string): Promise<MessageResponse> {
    await delay();
    if (!mockUser || mockUser.email !== email) {
      throw apiError(404, "No verified account found for this email. Please register first.");
    }
    mockOtp = "123456";
    return { message: "OTP sent to email." };
  },
  async userVerifyOtp(email: string, otp: string): Promise<VerifyOtpResponse> {
    await delay();
    if (!mockUser || otp !== mockOtp) {
      throw apiError(400, "Invalid OTP");
    }
    return { token: "mock-user-jwt-token", user: mockUser };
  },
  async userResendOtp(_email: string): Promise<MessageResponse> {
    await delay();
    mockOtp = "123456";
    return { message: "OTP resent to email." };
  },
  async userMe(): Promise<User> {
    await delay();
    if (!mockUser) throw apiError(404, "User not found");
    return mockUser;
  },

  async listMyInquiries(): Promise<Contact[]> {
    await delay();
    return inquiries.filter((inq) => inq.user);
  },
  async acknowledgeInquiry(id: string, message: string): Promise<Contact> {
    await delay();
    inquiries = inquiries.map((inq) =>
      inq._id === id
        ? { ...inq, status: "acknowledged", adminReply: message, repliedAt: new Date().toISOString() }
        : inq
    );
    const updated = inquiries.find((inq) => inq._id === id);
    if (!updated) throw new Error("Inquiry not found");
    return updated;
  },
};
