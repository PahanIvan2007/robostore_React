import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, Tag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import MainLayout from '../components/layout/MainLayout';

export default function CartPage() {
  const { items, total, updateQuantity, removeItem } = useCart();

  const formatPrice = (price) => new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
  
  const deliveryCost = total >= 10000 ? 0 : 490;
  const totalWithDelivery = total + deliveryCost;

  if (items.length === 0) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Корзина пуста</h1>
          <p className="text-gray-600 mb-8">Добавьте товары в корзину, чтобы оформить заказ</p>
          <Link to="/catalog" className="btn-primary inline-flex items-center gap-2">
            Перейти в каталог
            <ArrowRight size={20} />
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/">Главная</Link>
            <span>/</span>
            <span className="text-gray-900">Корзина</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Корзина</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border divide-y">
              {items.map((item) => (
                <div key={item.id} className="p-6 flex gap-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl font-bold text-primary-400">R</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link to={`/product/${item.id}`} className="font-semibold text-gray-900 hover:text-primary-600">
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">Артикул: {item.id.toString().padStart(6, '0')}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <div className="flex items-end justify-between mt-4">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary-600">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <p className="text-sm text-gray-500">{formatPrice(item.price)} за шт.</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <Link to="/catalog" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2">
                <ArrowRight size={20} className="rotate-180" />
                Продолжить покупки
              </Link>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-6">Оформление заказа</h2>
              
              <div className="mb-6">
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
                  <Tag className="text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Промокод"
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                  <button className="text-primary-600 font-medium text-sm">Применить</button>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Товары ({items.length})</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Доставка</span>
                  <span>{deliveryCost === 0 ? 'Бесплатно' : formatPrice(deliveryCost)}</span>
                </div>
                {deliveryCost > 0 && (
                  <p className="text-xs text-gray-500">
                    Бесплатная доставка при заказе от 10 000 ₽
                  </p>
                )}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold">
                  <span>Итого</span>
                  <span className="text-primary-600">{formatPrice(totalWithDelivery)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full btn-primary text-center text-lg py-4"
              >
                Оформить заказ
              </Link>

              <p className="text-xs text-gray-500 text-center mt-4">
                Нажимая кнопку, вы соглашаетесь с публичной офертой
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
