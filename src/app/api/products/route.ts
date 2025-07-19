import { NextResponse } from 'next/server';
import { Product } from '@/types';

// Наш импровизированный каталог товаров. В реальном приложении эти данные будут приходить из базы данных.
const products: Product[] = [
  {
    id: 1,
    name: 'Ноутбук ProBook 15',
    price: 95000,
    description: 'Мощный и надежный ноутбук для профессионалов. Оснащен последним процессором и быстрым SSD-накопителем.',
    image: 'https://placehold.co/600x400/EEE/31343C?text=ProBook+15',
    category: 'Электроника',
    brand: 'ProBrand',
  },
  {
    id: 2,
    name: 'Смартфон Galaxy S23',
    price: 78000,
    description: 'Флагманский смартфон с потрясающим дисплеем и продвинутой камерой для лучших снимков.',
    image: 'https://placehold.co/600x400/EEE/31343C?text=Galaxy+S23',
    category: 'Электроника',
    brand: 'SamMobile',
  },
  {
    id: 3,
    name: 'Беспроводные наушники AirSounds 3',
    price: 19500,
    description: 'Кристально чистый звук и активное шумоподавление. Идеальны для музыки и звонков.',
    image: 'https://placehold.co/600x400/EEE/31343C?text=AirSounds+3',
    category: 'Аксессуары',
    brand: 'AudioPhile',
  },
  {
    id: 4,
    name: 'Умные часы Watch GT 5',
    price: 25000,
    description: 'Стильные умные часы с функциями отслеживания здоровья, GPS и долгим временем работы от батареи.',
    image: 'https://placehold.co/600x400/EEE/31343C?text=Watch+GT+5',
    category: 'Аксессуары',
    brand: 'Connecta',
  },
  {
    id: 5,
    name: 'Кожаная куртка "Urban Rider"',
    price: 22000,
    description: 'Классическая кожаная куртка, которая добавит вашему образу брутальности и стиля.',
    image: 'https://placehold.co/600x400/EEE/31343C?text=Urban+Rider',
    category: 'Одежда',
    brand: 'StyleWear',
  },
  {
    id: 6,
    name: 'Игровая консоль PlaySphere 5',
    price: 62000,
    description: 'Погрузитесь в мир игр нового поколения с невероятной графикой и скоростью загрузки.',
    image: 'https://placehold.co/600x400/EEE/31343C?text=PlaySphere+5',
    category: 'Электроника',
    brand: 'GameCorp',
  },
  {
    id: 7,
    name: 'Джинсы "Classic Fit"',
    price: 7500,
    description: 'Удобные и стильные джинсы на каждый день. Изготовлены из качественного денима.',
    image: 'https://placehold.co/600x400/EEE/31343C?text=Classic+Fit',
    category: 'Одежда',
    brand: 'StyleWear',
  },
  {
    id: 8,
    name: 'Кофемашина "Barista Pro"',
    price: 45000,
    description: 'Автоматическая кофемашина для приготовления идеального эспрессо, капучино и латте у вас дома.',
    image: 'https://placehold.co/600x400/EEE/31343C?text=Barista+Pro',
    category: 'Бытовая техника',
    brand: 'HomeChef',
  },
  {
    id: 9,
    name: 'Рюкзак "Traveler"',
    price: 9800,
    description: 'Вместительный и прочный рюкзак для путешествий и повседневного использования.',
    image: 'https://placehold.co/600x400/EEE/31343C?text=Traveler',
    category: 'Аксессуары',
    brand: 'ProBrand',
  },
  {
    id: 10,
    name: '4K Телевизор VisionMax 55"',
    price: 89990,
    description: 'Телевизор с диагональю 55 дюймов, разрешением 4K и технологией Smart TV.',
    image: 'https://placehold.co/600x400/EEE/31343C?text=VisionMax+TV',
    category: 'Электроника',
    brand: 'Connecta',
  }
];

/**
 * @export
 * @async
 * @function GET
 * @description Обработчик GET-запроса для /api/products.
 * Возвращает список всех товаров.
 * @param {Request} request - Объект запроса (не используется в данной функции).
 * @returns {Promise<NextResponse>} - JSON-ответ со списком товаров.
 */
export async function GET(request: Request) {
  // В будущем здесь можно будет добавить логику для фильтрации и пагинации,
  // получая параметры из request.url
  return NextResponse.json(products);
}