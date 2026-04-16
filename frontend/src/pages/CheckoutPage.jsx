import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, CreditCard, Truck, Package, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../components/layout/MainLayout';

const steps = [
  { id: 1, name: 'Контакты', icon: Package },
  { id: 2, name: 'Доставка', icon: Truck },
  { id: 3, name: 'Оплата', icon: CreditCard },
  { id: 4, name: 'Подтверждение', icon: Check },
];

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    deliveryMethod: 'courier',
    paymentMethod: 'card',
    comment: '',
  });

  const formatPrice = (price) => new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
  const deliveryCost = total >= 10000 ? 0 : 490;
  const totalWithDelivery = total + deliveryCost;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      alert('Заказ успешно оформлен!');
      clearCart();
    }
  };

  if (items.length === 0 && currentStep < 4) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Корзина пуста</h1>
          <Link to="/catalog" className="btn-primary inline-flex items-center gap-2">
            Перейти в каталог
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
            <Link to="/cart">Корзина</Link>
            <span>/</span>
            <span className="text-gray-900">Оформление заказа</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check size={20} />
                  ) : (
                    <step.icon size={20} />
                  )}
                </div>
                <span className={`text-sm mt-2 ${currentStep >= step.id ? 'text-primary-600' : 'text-gray-500'}`}>
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-0.5 mx-2 ${
                    currentStep > step.id ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <div className="bg-white rounded-xl border p-6">
                  <h2 className="text-xl font-bold mb-6">Контактные данные</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Имя и фамилия *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="input-field"
                          placeholder="Иван Петров"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="input-field"
                          placeholder="ivan@email.ru"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Телефон *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="input-field"
                        placeholder="+7 (999) 123-45-67"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="bg-white rounded-xl border p-6">
                  <h2 className="text-xl font-bold mb-6">Способ доставки</h2>
                  <div className="space-y-4">
                    {[
                      { id: 'courier', name: 'Курьером до двери', price: 490, time: '1-2 дня' },
                      { id: 'pickup', name: 'Пункт выдачи СДЭК', price: 290, time: '2-4 дня' },
                      { id: 'mail', name: 'Почта России', price: 350, time: '5-7 дней' },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${
                          formData.deliveryMethod === method.id ? 'border-primary-500 bg-primary-50' : ''
                        }`}
                      >
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value={method.id}
                          checked={formData.deliveryMethod === method.id}
                          onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value })}
                          className="w-5 h-5 text-primary-600"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-gray-500">{method.time}</p>
                        </div>
                        <span className="font-semibold">
                          {method.price === 0 ? 'Бесплатно' : formatPrice(method.price)}
                        </span>
                      </label>
                    ))}
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium mb-2">Адрес доставки</label>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="input-field"
                        placeholder="Город"
                      />
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        className="input-field"
                        placeholder="Индекс"
                      />
                    </div>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="input-field"
                      rows={3}
                      placeholder="Улица, дом, квартира"
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="bg-white rounded-xl border p-6">
                  <h2 className="text-xl font-bold mb-6">Способ оплаты</h2>
                  <div className="space-y-4">
                    {[
                      { id: 'card', name: 'Банковской картой онлайн', icon: CreditCard },
                      { id: 'receipt', name: 'При получении', icon: Package },
                      { id: 'installment', name: 'Рассрочка 0%', icon: CreditCard },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${
                          formData.paymentMethod === method.id ? 'border-primary-500 bg-primary-50' : ''
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                          className="w-5 h-5 text-primary-600"
                        />
                        <method.icon className="text-gray-400" size={24} />
                        <span className="font-medium">{method.name}</span>
                      </label>
                    ))}
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium mb-2">Комментарий к заказу</label>
                    <textarea
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      className="input-field"
                      rows={3}
                      placeholder="Пожелания к заказу, удобное время доставки..."
                    />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="bg-white rounded-xl border p-6 text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Заказ оформлен!</h2>
                  <p className="text-gray-600 mb-2">
                    Номер вашего заказа: <strong>#{Math.floor(Math.random() * 100000)}</strong>
                  </p>
                  <p className="text-gray-600">
                    На email {formData.email} отправлено письмо с подтверждением
                  </p>
                </div>
              )}

              <div className="mt-6 flex gap-4">
                {currentStep > 1 && currentStep < 4 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <ArrowLeft size={20} />
                    Назад
                  </button>
                )}
                {currentStep < 4 && (
                  <button type="submit" className="btn-primary flex-1">
                    {currentStep === 3 ? 'Оплатить заказ' : 'Продолжить'}
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border p-6 sticky top-24">
                <h3 className="font-bold mb-4">Ваш заказ</h3>
                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-primary-400">R</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                        <p className="text-xs text-gray-500">×{item.quantity}</p>
                      </div>
                      <p className="font-semibold text-sm">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Товары</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Доставка</span>
                    <span>{deliveryCost === 0 ? 'Бесплатно' : formatPrice(deliveryCost)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-2 border-t">
                    <span>Итого</span>
                    <span className="text-primary-600">{formatPrice(totalWithDelivery)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
