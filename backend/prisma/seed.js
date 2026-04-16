require('dotenv').config();
const { PrismaClient } = require('../generated/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@robostore.ru' },
    update: {},
    create: {
      email: 'admin@robostore.ru',
      password: adminPassword,
      name: 'Администратор',
      phone: '+78001234567',
      role: 'ADMIN',
    },
  });

  const manager = await prisma.user.upsert({
    where: { email: 'manager@robostore.ru' },
    update: {},
    create: {
      email: 'manager@robostore.ru',
      password: userPassword,
      name: 'Менеджер',
      phone: '+78001234568',
      role: 'MANAGER',
    },
  });

  const testUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password: userPassword,
      name: 'Иван Петров',
      phone: '+79991234567',
      role: 'USER',
    },
  });

  const homeCategory = await prisma.category.upsert({
    where: { slug: 'home' },
    update: {},
    create: {
      name: 'Домашние роботы',
      slug: 'home',
      order: 1,
    },
  });

  const businessCategory = await prisma.category.upsert({
    where: { slug: 'business' },
    update: {},
    create: {
      name: 'Бизнес-роботы',
      slug: 'business',
      order: 2,
    },
  });

  const industrialCategory = await prisma.category.upsert({
    where: { slug: 'industrial' },
    update: {},
    create: {
      name: 'Промышленные',
      slug: 'industrial',
      order: 3,
    },
  });

  const entertainmentCategory = await prisma.category.upsert({
    where: { slug: 'entertainment' },
    update: {},
    create: {
      name: 'Развлечения',
      slug: 'entertainment',
      order: 4,
    },
  });

  const products = [
    {
      name: 'RoboHome Pro X1',
      slug: 'robohome-pro-x1',
      description: 'Флагманский домашний робот с искусственным интеллектом. Оснащён камерой 4K, 8 микрофонами для голосового управления и многофункциональной системой навигации.',
      price: 159990,
      oldPrice: 189990,
      categoryId: homeCategory.id,
      brand: 'RoboCorp',
      rating: 4.9,
      reviewsCount: 234,
      inStock: true,
      stock: 15,
    },
    {
      name: 'BusinessBot 5000',
      slug: 'businessbot-5000',
      description: 'Профессиональный бизнес-робот для офисов и конференц-залов. Автоматическое распознавание лиц, запись встреч и умная навигация.',
      price: 459990,
      categoryId: businessCategory.id,
      brand: 'TechBot',
      rating: 4.8,
      reviewsCount: 89,
      inStock: true,
      stock: 8,
    },
    {
      name: 'CleanMaster Junior',
      slug: 'cleanmaster-junior',
      description: 'Компактный робот-пылесос с функцией влажной уборки. Умное планирование маршрута и автоматическая подзарядка.',
      price: 79990,
      oldPrice: 99990,
      categoryId: homeCategory.id,
      brand: 'SmartMech',
      rating: 4.7,
      reviewsCount: 567,
      inStock: true,
      stock: 42,
    },
    {
      name: 'GuardBot Security',
      slug: 'guardbot-security',
      description: 'Робот-охранник с камерой 360°, ночным видением и системой оповещения. Интеграция с умным домом.',
      price: 299990,
      categoryId: businessCategory.id,
      brand: 'AutoRobo',
      rating: 4.9,
      reviewsCount: 156,
      inStock: true,
      stock: 5,
    },
    {
      name: 'RoboChef Kitchen',
      slug: 'robochef-kitchen',
      description: 'Робот-повар для домашней кухни. Готовит более 1000 рецептов, автоматическое добавление ингредиентов.',
      price: 199990,
      categoryId: homeCategory.id,
      brand: 'FutureTech',
      rating: 4.6,
      reviewsCount: 78,
      inStock: false,
      stock: 0,
    },
    {
      name: 'DeliveryDrone Air',
      slug: 'deliverydrone-air',
      description: 'Дрон для доставки небольших посылок. Автоматический полёт по GPS, грузоподъёмность до 5 кг.',
      price: 89990,
      categoryId: entertainmentCategory.id,
      brand: 'RoboCorp',
      rating: 4.5,
      reviewsCount: 123,
      inStock: true,
      stock: 20,
    },
    {
      name: 'FactoryArm Pro',
      slug: 'factoryarm-pro',
      description: 'Промышленный манипулятор с 6 осями движения. Точность до 0.01 мм, грузоподъёмность 20 кг.',
      price: 1299990,
      categoryId: industrialCategory.id,
      brand: 'AutoRobo',
      rating: 4.9,
      reviewsCount: 45,
      inStock: true,
      stock: 3,
    },
    {
      name: 'PetBuddy Animal',
      slug: 'petbuddy-animal',
      description: 'Интерактивный робот-питомец для детей. Имитирует поведение кошки или собаки, обучаем командам.',
      price: 49990,
      categoryId: entertainmentCategory.id,
      brand: 'TechBot',
      rating: 4.7,
      reviewsCount: 289,
      inStock: true,
      stock: 35,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        ...product,
        images: ['https://via.placeholder.com/600x600?text=Robot'],
        specs: {
          processor: 'AI Neural Engine X1',
          camera: '4K Ultra HD',
          battery: '5000 mAh',
          weight: '3.5 kg',
        },
      },
    });
  }

  console.log('Seeding completed!');
  console.log('Admin: admin@robostore.ru / admin123');
  console.log('Manager: manager@robostore.ru / user123');
  console.log('User: user@example.com / user123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
