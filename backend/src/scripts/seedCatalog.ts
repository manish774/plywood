import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from '../config/db';
import Category from '../models/Category';
import Item from '../models/Item';

// Replaces all categories/items with a realistic Indian plywood-shop catalog
// (real brands, IS-grade specs, INR per-sheet pricing). Run with:
//   npm run seed:catalog
const categories = [
  {
    name: 'Marine Plywood',
    description:
      "BWP (IS:710) grade waterproof plywood built to survive Jharkhand's monsoon humidity — for kitchens, bathrooms and outdoor cabinetry.",
    image: 'https://images.unsplash.com/photo-1601058268499-e52658b8bb88?w=800&q=80',
  },
  {
    name: 'Commercial Plywood',
    description:
      'MR grade (IS:303) general-purpose plywood for everyday furniture, wardrobes and interior fit-outs at a value price.',
    image: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=800&q=80',
  },
  {
    name: 'Block Board',
    description:
      'Lightweight wood-strip core boards for wardrobe shutters, partitions and long panels where solid plywood would be overkill.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
  },
  {
    name: 'Flush Doors',
    description:
      'Factory-finished flush doors in laminate and veneer finishes, ready to hang for home and office interiors.',
    image: 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=800&q=80',
  },
  {
    name: 'Decorative Laminates',
    description:
      'Sunmica-style laminate sheets in glossy, matte and textured finishes to dress up furniture, wardrobes and counters.',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80',
  },
  {
    name: 'Decorative Veneer',
    description:
      'Natural wood veneer sheets for feature walls, panelling and premium furniture faces.',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=800&q=80',
  },
] as const;

type CategoryName = (typeof categories)[number]['name'];

const items: Array<{
  category: CategoryName;
  name: string;
  description: string;
  price: number;
  image: string;
  thickness: string;
  size: string;
  grade: string;
  brand: string;
}> = [
  // Marine Plywood
  {
    category: 'Marine Plywood',
    name: 'CenturyPly Sainik 710 Marine Plywood 19mm',
    description:
      "ISI-marked BWP (IS:710) grade marine plywood with a phenol-bonded core. Fully boiling-waterproof — the shop's top pick for kitchens and bathroom units.",
    price: 5800,
    image: 'https://images.unsplash.com/photo-1601058268499-e52658b8bb88?w=1000&q=80',
    thickness: '19mm',
    size: '2440 x 1220mm (8x4 ft)',
    grade: 'BWP - IS:710',
    brand: 'CenturyPly',
  },
  {
    category: 'Marine Plywood',
    name: 'Greenply Marine Gold BWP Plywood 18mm',
    description:
      'Termite and borer resistant marine-grade plywood with a hardwood core, built for long-term moisture exposure.',
    price: 5200,
    image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=1000&q=80',
    thickness: '18mm',
    size: '2440 x 1220mm (8x4 ft)',
    grade: 'BWP - IS:710',
    brand: 'Greenply',
  },
  {
    category: 'Marine Plywood',
    name: 'Kitply Marine Plus Plywood 12mm',
    description:
      'Mid-thickness marine plywood suited to bathroom cabinets, outdoor shutters and utility furniture.',
    price: 3600,
    image: 'https://images.unsplash.com/photo-1601058268499-e52658b8bb88?w=1000&q=80',
    thickness: '12mm',
    size: '2440 x 1220mm (8x4 ft)',
    grade: 'BWP - IS:710',
    brand: 'Kitply',
  },

  // Commercial Plywood
  {
    category: 'Commercial Plywood',
    name: 'Greenply Ecotec MR Grade Plywood 19mm',
    description:
      'Moisture-resistant (IS:303) commercial plywood for wardrobes, cabinets and general carpentry work.',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=1000&q=80',
    thickness: '19mm',
    size: '2440 x 1220mm (8x4 ft)',
    grade: 'MR - IS:303',
    brand: 'Greenply',
  },
  {
    category: 'Commercial Plywood',
    name: 'CenturyPly Sainik 303 Commercial Plywood 12mm',
    description:
      'Everyday-use commercial plywood with a strong core and smooth face, ready for painting or laminate finishing.',
    price: 2400,
    image: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=1000&q=80',
    thickness: '12mm',
    size: '2440 x 1220mm (8x4 ft)',
    grade: 'MR - IS:303',
    brand: 'CenturyPly',
  },
  {
    category: 'Commercial Plywood',
    name: 'Archidply MR Commercial Plywood 6mm',
    description:
      'Thin-panel commercial plywood for backing panels, drawer bottoms and light partition work.',
    price: 1450,
    image: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=1000&q=80',
    thickness: '6mm',
    size: '2440 x 1220mm (8x4 ft)',
    grade: 'MR - IS:303',
    brand: 'Archidply',
  },

  // Block Board
  {
    category: 'Block Board',
    name: 'Duro Gold Block Board 25mm',
    description:
      'Seasoned wood-strip core block board for wardrobe shutters and table tops needing a lightweight, screw-holding panel.',
    price: 3100,
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&q=80',
    thickness: '25mm',
    size: '2440 x 1220mm (8x4 ft)',
    grade: 'BWR - IS:1659',
    brand: 'Duro',
  },
  {
    category: 'Block Board',
    name: 'Archidply Platinum Block Board 19mm',
    description: 'Balanced-core block board for partitions, false ceilings and long wardrobe panels.',
    price: 2600,
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&q=80',
    thickness: '19mm',
    size: '2440 x 1220mm (8x4 ft)',
    grade: 'BWR - IS:1659',
    brand: 'Archidply',
  },
  {
    category: 'Block Board',
    name: 'CenturyPly Sainik Block Board 19mm',
    description:
      "Termite-resistant block board built for wardrobe and cabinet carcasses where full plywood weight isn't needed.",
    price: 2850,
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&q=80',
    thickness: '19mm',
    size: '2440 x 1220mm (8x4 ft)',
    grade: 'BWR - IS:1659',
    brand: 'CenturyPly',
  },

  // Flush Doors
  {
    category: 'Flush Doors',
    name: 'CenturyPly Century Flush Door (Laminated) 32mm',
    description:
      'Solid-core flush door with factory-laminated finish on both faces — ready to hang for bedrooms and offices.',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=1000&q=80',
    thickness: '32mm',
    size: '2100 x 900mm (7x3 ft)',
    grade: 'Solid Core',
    brand: 'CenturyPly',
  },
  {
    category: 'Flush Doors',
    name: 'Greenply Decorative Veneer Flush Door 35mm',
    description:
      'Premium flush door with a natural veneer face, pre-fit for polishing — a popular choice for main entry doors.',
    price: 5200,
    image: 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=1000&q=80',
    thickness: '35mm',
    size: '2100 x 900mm (7x3 ft)',
    grade: 'Solid Core',
    brand: 'Greenply',
  },
  {
    category: 'Flush Doors',
    name: 'Kitply Moulded Flush Door 30mm',
    description: 'Budget-friendly moulded-skin flush door for internal rooms, stores and utility spaces.',
    price: 3800,
    image: 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=1000&q=80',
    thickness: '30mm',
    size: '2100 x 750mm (7x2.5 ft)',
    grade: 'Hollow Core',
    brand: 'Kitply',
  },

  // Decorative Laminates
  {
    category: 'Decorative Laminates',
    name: 'Merino Laminate Sheet — High Gloss 1mm',
    description: 'High-gloss decorative laminate sheet for wardrobe shutters, kitchen cabinets and modular furniture.',
    price: 1450,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1000&q=80',
    thickness: '1mm',
    size: '2440 x 1220mm (8x4 ft)',
    grade: 'HPL - High Gloss',
    brand: 'Merino',
  },
  {
    category: 'Decorative Laminates',
    name: 'Greenlam Laminate Sheet — Matte Finish 1mm',
    description: 'Fingerprint-resistant matte laminate for a contemporary, low-maintenance furniture surface.',
    price: 1650,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1000&q=80',
    thickness: '1mm',
    size: '2440 x 1220mm (8x4 ft)',
    grade: 'HPL - Matte',
    brand: 'Greenlam',
  },
  {
    category: 'Decorative Laminates',
    name: 'Stylam Textured Laminate Sheet 0.8mm',
    description:
      'Wood-grain textured laminate for a natural look on wardrobes, doors and office furniture at an economical price.',
    price: 950,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1000&q=80',
    thickness: '0.8mm',
    size: '2440 x 1220mm (8x4 ft)',
    grade: 'HPL - Textured',
    brand: 'Stylam',
  },

  // Decorative Veneer
  {
    category: 'Decorative Veneer',
    name: 'Archidply Natural Teak Veneer Sheet 4mm',
    description: 'Book-matched natural teak veneer for feature walls, doors and premium cabinetry faces.',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=1000&q=80',
    thickness: '4mm',
    size: '2440 x 1220mm (8x4 ft)',
    grade: 'Natural - AA',
    brand: 'Archidply',
  },
  {
    category: 'Decorative Veneer',
    name: 'Greenply Walnut Veneer Sheet 4mm',
    description: 'Rich dark walnut veneer sheet for statement furniture pieces and TV unit panelling.',
    price: 3800,
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=1000&q=80',
    thickness: '4mm',
    size: '2440 x 1220mm (8x4 ft)',
    grade: 'Natural - AA',
    brand: 'Greenply',
  },
  {
    category: 'Decorative Veneer',
    name: 'CenturyPly Oak Veneer Sheet 3mm',
    description: 'Light oak veneer sheet, pre-sanded and ready to polish — a favourite for modern wardrobe interiors.',
    price: 2900,
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=1000&q=80',
    thickness: '3mm',
    size: '2440 x 1220mm (8x4 ft)',
    grade: 'Natural - A',
    brand: 'CenturyPly',
  },
];

async function run(): Promise<void> {
  await connectDB();

  const { deletedCount: deletedItems } = await Item.deleteMany({});
  const { deletedCount: deletedCategories } = await Category.deleteMany({});
  console.log(`Cleared ${deletedCategories} categories and ${deletedItems} items.`);

  const categoryIdByName = new Map<CategoryName, mongoose.Types.ObjectId>();
  for (const cat of categories) {
    const created = await Category.create(cat);
    categoryIdByName.set(cat.name, created._id as mongoose.Types.ObjectId);
  }
  console.log(`Inserted ${categories.length} categories.`);

  for (const item of items) {
    const categoryId = categoryIdByName.get(item.category);
    if (!categoryId) throw new Error(`Unknown category "${item.category}" for item "${item.name}"`);
    await Item.create({
      name: item.name,
      description: item.description,
      price: item.price,
      category: categoryId,
      images: [item.image],
      specifications: {
        thickness: item.thickness,
        size: item.size,
        grade: item.grade,
        brand: item.brand,
      },
    });
  }
  console.log(`Inserted ${items.length} items.`);

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error('Failed to seed catalog:', err);
  process.exit(1);
});
