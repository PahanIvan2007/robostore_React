import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw, Check, ChevronDown, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import MainLayout from '../components/layout/MainLayout';

const product = {
  id: 1,
  name: 'RoboHome Pro X1',
  price: 159990,
  oldPrice: 189990,
  rating: 4.9,
  reviews: 234,
  category: 'home',
  inStock: true,
  deliveryTime: '1-2 дня',
  warranty: '2 года',
  description: 'RoboHome Pro X1 — флагманский домашний робот с искусственным интеллектом. Оснащён камерой 4K, 8 микрофонами для голосового управления и многофункциональной системой навигации. Способен выполнять широкий спектр домашних задач.',
  specs: [
    { label: 'Процессор', value: 'AI Neural Engine X1' },
    { label: 'Камера', value: '4K Ultra HD' },
    { label: 'Автономность', value: 'До 12 часов' },
    { label: 'Вес', value: '3.5 кг' },
    { label: 'Высота', value: '35 см' },
    { label: 'Wi-Fi', value: 'Wi-Fi 6E' },
    { label: 'Bluetooth', value: '5.3' },
    { label: 'Аккумулятор', value: '5000 mAh' },
  ],
  includes: [
    'Робот RoboHome Pro X1',
    'Зарядная станция',
    'Блок питания',
    'USB-C кабель',
    'Документация',
    'Гарантийный талон',
  ],
  images: ['main', 'front', 'side', 'back'],
};

const accessories = [
  { id: 101, name: 'Дополнительный аккумулятор', price: 12990 },
  { id: 102, name: 'Запасные щётки (комплект)', price: 2990 },
  { id: 103, name: 'Защитный кейс', price: 7990 },
];

export default function ProductPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [specsOpen, setSpecsOpen] = useState(true);
  const [deliveryOpen, setDeliveryOpen] = useState(false);

  const formatPrice = (price) => new Intl.NumberFormat('ru-RU').format(price) + ' ₽';

  return (
    <MainLayout>
      <div className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/">Главная</Link>
            <span>/</span>
            <Link to="/catalog">Каталог</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl aspect-square flex items-center justify-center mb-4">
              <div className="w-64 h-64 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-8xl font-bold">R</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center ${
                    selectedImage === i ? 'ring-2 ring-primary-500' : ''
                  }`}
                >
                  <span className="text-gray-400">{i + 1}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{product.rating}</span>
              </div>
              <span className="text-gray-500">({product.reviews} отзывов)</span>
              <span className="mx-2">•</span>
              <span className="text-green-600 font-medium flex items-center gap-1">
                <Check size={16} /> В наличии
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

            <div className="mb-6">
              <span className="text-4xl font-bold text-primary-600">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <span className="text-xl text-gray-400 line-through ml-3">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
              {product.oldPrice && (
                <span className="ml-3 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                  -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                </span>
              )}
            </div>

            <div className="border-t border-b border-gray-200 py-4 my-6">
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Truck size={18} />
                  <span>Доставка: {product.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield size={18} />
                  <span>Гарантия: {product.warranty}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-4">{product.description}</p>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-600">Количество:</span>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100"
                >
                  <Minus size={18} />
                </button>
                <span className="px-4 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-100"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    addItem(product);
                  }
                }}
                className="flex-1 btn-primary flex items-center justify-center gap-2 text-lg py-4"
              >
                <ShoppingCart size={22} />
                В корзину
              </button>
              <button className="px-6 py-4 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                <Heart size={22} />
              </button>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 text-green-700">
                <Check size={20} />
                <span className="font-medium">Быстрое оформление</span>
              </div>
              <p className="text-green-600 text-sm mt-1">
                Оформите заказ за 2 минуты без регистрации
              </p>
            </div>

            <div className="border rounded-xl overflow-hidden">
              <button
                onClick={() => setSpecsOpen(!specsOpen)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50"
              >
                <span className="font-semibold">Характеристики</span>
                <ChevronDown className={specsOpen ? 'rotate-180' : ''} />
              </button>
              {specsOpen && (
                <div className="divide-y">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="px-6 py-3 flex justify-between">
                      <span className="text-gray-600">{spec.label}</span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Комплектация</h2>
            <div className="bg-white rounded-xl border p-6">
              <ul className="space-y-3">
                {product.includes.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check size={14} className="text-green-600" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Аксессуары</h2>
            <div className="space-y-4">
              {accessories.map((acc) => (
                <div key={acc.id} className="bg-white rounded-xl border p-4 flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">📦</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{acc.name}</h3>
                    <p className="text-primary-600 font-semibold">{formatPrice(acc.price)}</p>
                  </div>
                  <button
                    onClick={() => addItem(acc)}
                    className="p-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
