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
      "Water-resistant plywood built for boats, docks and anywhere moisture is a constant threat.",
    image:
      "https://images.unsplash.com/photo-1601058268499-e52658b8bb88?w=800&q=80",
  },
  {
    _id: "cat-2",
    name: "Hardwood Plywood",
    description:
      "Furniture-grade panels faced in oak, birch and maple veneer for cabinetry and fine joinery.",
    image:
      "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=800&q=80",
  },
  {
    _id: "cat-3",
    name: "Structural Plywood",
    description:
      "Rated sheathing for roofs, walls and floors where load-bearing strength matters most.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
  },
  {
    _id: "cat-4",
    name: "Decorative Veneer",
    description:
      "Book-matched veneer sheets for feature walls, doors and statement furniture pieces.",
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80",
  },
];

let items: StoredItem[] = [
  {
    _id: "item-1",
    name: "BS 1088 Marine Ply 18mm",
    description:
      "Premium okoume-faced marine plywood, void-free core, WBP glue bond. The standard choice for hulls and wet environments.",
    price: 84.5,
    category: "cat-1",
    images: [
      "https://images.unsplash.com/photo-1601058268499-e52658b8bb88?w=1000&q=80",
    ],
    specifications: {
      thickness: "18mm",
      size: "2440 x 1220mm",
      grade: "BS 1088",
      brand: "Ridgeline Marine",
    },
  },
  {
    _id: "item-2",
    name: "Marine Ply 12mm",
    description:
      "Lighter-duty marine grade panel for cabin interiors and lightweight boat builds.",
    price: 58.0,
    category: "cat-1",
    images: [
      "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=1000&q=80",
    ],
    specifications: {
      thickness: "12mm",
      size: "2440 x 1220mm",
      grade: "BS 1088",
      brand: "Ridgeline Marine",
    },
  },
  {
    _id: "item-3",
    name: "Birch Faced Plywood 15mm",
    description:
      "Baltic birch core with a clear birch face veneer both sides. A cabinetmaker favorite for its stable, void-free edges.",
    price: 76.25,
    category: "cat-2",
    images: [
      "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=1000&q=80",
    ],
    specifications: {
      thickness: "15mm",
      size: "2440 x 1220mm",
      grade: "B/BB",
      brand: "Nordic Birch Co.",
    },
  },
  {
    _id: "item-4",
    name: "Oak Veneer Plywood 18mm",
    description:
      "Red oak veneer over a hardwood core, pre-sanded and ready to finish. Ideal for visible cabinetry faces.",
    price: 92.0,
    category: "cat-2",
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1000&q=80",
    ],
    specifications: {
      thickness: "18mm",
      size: "2440 x 1220mm",
      grade: "A/B",
      brand: "Heritage Hardwoods",
    },
  },
  {
    _id: "item-5",
    name: "CDX Structural Sheathing 12mm",
    description:
      "Construction-grade structural plywood rated for roof decking, wall sheathing and subfloors.",
    price: 41.75,
    category: "cat-3",
    images: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&q=80",
    ],
    specifications: {
      thickness: "12mm",
      size: "2440 x 1220mm",
      grade: "CDX",
      brand: "Ridgeline Structural",
    },
  },
  {
    _id: "item-6",
    name: "T&G Flooring Ply 22mm",
    description:
      "Tongue-and-groove structural flooring panel engineered for stiff, squeak-free subfloors.",
    price: 63.9,
    category: "cat-3",
    images: [
      "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=1000&q=80",
    ],
    specifications: {
      thickness: "22mm",
      size: "2440 x 590mm",
      grade: "T&G",
      brand: "Ridgeline Structural",
    },
  },
  {
    _id: "item-7",
    name: "Walnut Decorative Veneer Panel",
    description:
      "Book-matched American walnut veneer panel for feature walls and statement joinery.",
    price: 118.0,
    category: "cat-4",
    images: [
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=1000&q=80",
    ],
    specifications: {
      thickness: "6mm",
      size: "2440 x 1220mm",
      grade: "AA",
      brand: "Heritage Hardwoods",
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

export const mockApi = {
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
    if (email === "admin@ridgeline.test" && password === "plywood123") {
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
