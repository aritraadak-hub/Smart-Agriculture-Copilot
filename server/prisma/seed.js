import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Smart Agriculture Copilot seeding...');

  const hashedPassword = await bcrypt.hash('farmer123', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'farmer@smartagri.org' },
    update: {},
    create: {
      name: 'Ramesh Patel',
      email: 'farmer@smartagri.org',
      phone: '+91 9876543210',
      password: hashedPassword,
      state: 'Punjab',
      district: 'Ludhiana',
      preferredLanguage: 'en',
      role: 'FARMER',
      isVerified: true,
      farms: {
        create: [
          {
            name: 'Green Harvest Valley',
            area: 12.5,
            areaUnit: 'acres',
            state: 'Punjab',
            district: 'Ludhiana',
            village: 'Khanna',
            soilType: 'Alluvial Soil',
            irrigationType: 'Canal & Borewell',
            latitude: 30.901,
            longitude: 75.8573,
            crops: {
              create: [
                {
                  name: 'Wheat (PBW 550)',
                  variety: 'High Yield Semi-Dwarf',
                  plantingDate: new Date('2025-11-15'),
                  expectedHarvest: new Date('2026-04-10'),
                  status: 'GROWING',
                  healthScore: 92,
                  area: 7.5,
                  notes: 'Sown with happy seeder. Good germination rate.',
                },
                {
                  name: 'Mustard (Pusa Mustard 30)',
                  variety: 'Canola type low erucic',
                  plantingDate: new Date('2025-10-20'),
                  expectedHarvest: new Date('2026-03-15'),
                  status: 'GROWING',
                  healthScore: 88,
                  area: 5.0,
                  notes: 'First irrigation completed. Applied urea dose.',
                },
              ],
            },
            soilReadings: {
              create: [
                {
                  userId: '',
                  nitrogen: 42,
                  phosphorus: 18,
                  potassium: 165,
                  ph: 6.8,
                  moisture: 28.5,
                  temperature: 24.2,
                  organicMatter: 1.2,
                  source: 'IoT Soil Sensor Node 1',
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log(`✅ Demo user created: ${user.name} (${user.email})`);

  const marketData = [
    { crop: 'Wheat', state: 'Punjab', district: 'Ludhiana', market: 'Khanna Mandi', minPrice: 2275, maxPrice: 2450, modalPrice: 2380, priceDate: new Date() },
    { crop: 'Wheat', state: 'Haryana', district: 'Karnal', market: 'Karnal Grain Market', minPrice: 2250, maxPrice: 2420, modalPrice: 2350, priceDate: new Date() },
    { crop: 'Wheat', state: 'Uttar Pradesh', district: 'Meerut', market: 'Meerut APMC', minPrice: 2180, maxPrice: 2350, modalPrice: 2290, priceDate: new Date() },
    { crop: 'Wheat', state: 'Madhya Pradesh', district: 'Indore', market: 'Indore Mandi', minPrice: 2300, maxPrice: 2550, modalPrice: 2480, priceDate: new Date() },

    { crop: 'Paddy (Basmati)', state: 'Punjab', district: 'Amritsar', market: 'Amritsar APMC', minPrice: 3800, maxPrice: 4250, modalPrice: 4100, priceDate: new Date() },
    { crop: 'Paddy (Common)', state: 'West Bengal', district: 'Burdwan', market: 'Burdwan Central', minPrice: 2180, maxPrice: 2320, modalPrice: 2250, priceDate: new Date() },
    { crop: 'Paddy (Common)', state: 'Telangana', district: 'Warangal', market: 'Warangal Mandi', minPrice: 2200, maxPrice: 2340, modalPrice: 2280, priceDate: new Date() },

    { crop: 'Maize', state: 'Karnataka', district: 'Davangere', market: 'Davangere APMC', minPrice: 1950, maxPrice: 2200, modalPrice: 2120, priceDate: new Date() },
    { crop: 'Maize', state: 'Bihar', district: 'Begusarai', market: 'Begusarai Mandi', minPrice: 1900, maxPrice: 2150, modalPrice: 2050, priceDate: new Date() },

    { crop: 'Cotton (Long Staple)', state: 'Gujarat', district: 'Rajkot', market: 'Rajkot APMC', minPrice: 6800, maxPrice: 7550, modalPrice: 7280, priceDate: new Date() },
    { crop: 'Cotton (Medium Staple)', state: 'Maharashtra', district: 'Nagpur', market: 'Nagpur Mandi', minPrice: 6500, maxPrice: 7200, modalPrice: 6950, priceDate: new Date() },

    { crop: 'Tomato', state: 'Maharashtra', district: 'Nashik', market: 'Pimplgaon Market', minPrice: 1200, maxPrice: 1800, modalPrice: 1550, priceDate: new Date() },
    { crop: 'Tomato', state: 'Karnataka', district: 'Kolar', market: 'Kolar APMC', minPrice: 1100, maxPrice: 1750, modalPrice: 1480, priceDate: new Date() },

    { crop: 'Potato', state: 'Uttar Pradesh', district: 'Agra', market: 'Agra Mandi', minPrice: 1050, maxPrice: 1400, modalPrice: 1250, priceDate: new Date() },
    { crop: 'Potato', state: 'West Bengal', district: 'Hooghly', market: 'Hooghly APMC', minPrice: 1150, maxPrice: 1500, modalPrice: 1350, priceDate: new Date() },

    { crop: 'Mustard Seed', state: 'Rajasthan', district: 'Bharatpur', market: 'Bharatpur Mandi', minPrice: 5200, maxPrice: 5850, modalPrice: 5600, priceDate: new Date() },
    { crop: 'Mustard Seed', state: 'Haryana', district: 'Bhiwani', market: 'Bhiwani APMC', minPrice: 5150, maxPrice: 5750, modalPrice: 5520, priceDate: new Date() },

    { crop: 'Soybean', state: 'Madhya Pradesh', district: 'Ujjain', market: 'Ujjain Mandi', minPrice: 4300, maxPrice: 4850, modalPrice: 4620, priceDate: new Date() },
    { crop: 'Soybean', state: 'Maharashtra', district: 'Latur', market: 'Latur APMC', minPrice: 4250, maxPrice: 4780, modalPrice: 4550, priceDate: new Date() },
  ];

  for (const item of marketData) {
    await prisma.marketPrice.create({ data: item });
  }
  console.log(`✅ Seeded ${marketData.length} market price records.`);

  const sampleNotifications = [
    {
      userId: user.id,
      title: 'Rainfall Advisory Alert 🌧️',
      message: 'Moderate to heavy rain expected in Ludhiana district within 36 hours. Postpone pesticide spraying.',
      type: 'WEATHER_ALERT',
      isRead: false,
    },
    {
      userId: user.id,
      title: 'Market Price Increase 📈',
      message: 'Wheat modal price in Khanna Mandi increased by 5.2% today to ₹2,380/quintal.',
      type: 'MARKET_PRICE',
      isRead: false,
    },
    {
      userId: user.id,
      title: 'PM-KISAN 17th Installment Reminder 🏛️',
      message: 'Ensure e-KYC is completed before March 31 to receive the upcoming ₹2,000 direct benefit transfer.',
      type: 'SCHEME_DEADLINE',
      isRead: true,
    },
  ];

  for (const notif of sampleNotifications) {
    await prisma.notification.create({ data: notif });
  }

  console.log('🎉 Seeding complete successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
