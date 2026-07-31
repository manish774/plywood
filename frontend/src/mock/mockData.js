// Placeholder data used only while VITE_USE_MOCK=true (backend not wired up yet).
// Delete this file once real API integration lands everywhere.

let categories = [
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

let items = [
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

const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

let categorySeq = categories.length + 1;
let itemSeq = items.length + 1;

// Mirrors the real API: GET responses return `category` populated as a full
// Category object, but writes accept/store a plain category id string.
function populateItem(item) {
  const categoryId =
    typeof item.category === "object" && item.category !== null
      ? item.category._id
      : item.category;
  const category = categories.find((c) => c._id === categoryId) || null;
  return { ...item, category };
}

function normalizeItemInput(data) {
  const categoryId =
    typeof data.category === "object" && data.category !== null
      ? data.category._id
      : data.category;
  return { ...data, category: categoryId };
}

export const mockApi = {
  async listCategories() {
    await delay();
    return categories.map((c) => ({ ...c }));
  },
  async getCategory(id) {
    await delay();
    const found = categories.find((c) => c._id === id);
    if (!found) throw new Error("Category not found");
    return { ...found };
  },
  async createCategory(data) {
    await delay();
    const created = { _id: `cat-${categorySeq++}`, ...data };
    categories = [...categories, created];
    return created;
  },
  async updateCategory(id, data) {
    await delay();
    categories = categories.map((c) => (c._id === id ? { ...c, ...data } : c));
    return categories.find((c) => c._id === id);
  },
  async deleteCategory(id) {
    await delay();
    categories = categories.filter((c) => c._id !== id);
    items = items.filter((i) => i.category !== id);
    return { success: true };
  },

  async listItems(categoryId) {
    await delay();
    const filtered = categoryId
      ? items.filter((i) => i.category === categoryId)
      : items;
    return filtered.map(populateItem);
  },
  async getItem(id) {
    await delay();
    const found = items.find((i) => i._id === id);
    if (!found) throw new Error("Item not found");
    return populateItem(found);
  },
  async createItem(data) {
    await delay();
    const created = { _id: `item-${itemSeq++}`, ...normalizeItemInput(data) };
    items = [...items, created];
    return populateItem(created);
  },
  async updateItem(id, data) {
    await delay();
    items = items.map((i) =>
      i._id === id ? { ...i, ...normalizeItemInput(data) } : i
    );
    return populateItem(items.find((i) => i._id === id));
  },
  async deleteItem(id) {
    await delay();
    items = items.filter((i) => i._id !== id);
    return { success: true };
  },

  async submitContact(data) {
    await delay();
    return { success: true, ...data };
  },

  _inquiries: [],
  async listInquiries() {
    await delay();
    return this._inquiries;
  },

  async login(email, password) {
    await delay();
    if (email === "admin@ridgeline.test" && password === "plywood123") {
      return { token: "mock-jwt-token-for-local-dev" };
    }
    const err = new Error("Invalid email or password");
    err.response = { status: 401, data: { message: "Invalid email or password" } };
    throw err;
  },
};
