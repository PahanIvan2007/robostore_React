import { useState } from 'react';
import { Save, Store, Truck, CreditCard, Bell, Mail } from 'lucide-react';

export default function AdminSettings() {
  const [activeSection, setActiveSection] = useState('store');
  
  const sections = [
    { id: 'store', label: 'Общие настройки', icon: Store },
    { id: 'delivery', label: 'Доставка', icon: Truck },
    { id: 'payment', label: 'Оплата', icon: CreditCard },
    { id: 'notifications', label: 'Уведомления', icon: Bell },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-[#1a1a2e] text-white flex flex-col h-screen fixed left-0 top-0">
        <div className="p-4 border-b border-gray-700">
          <h2 className="font-bold text-lg">Настройки</h2>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === section.id
                  ? 'bg-[#0ea5e9] text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <section.icon size={20} />
              <span>{section.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Настройки магазина</h1>
          <p className="text-gray-500">Конфигурация магазина и интеграций</p>
        </div>

        {activeSection === 'store' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">Общие настройки</h2>
            <div className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Название магазина</label>
                <input
                  type="text"
                  defaultValue="RoboStore"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0ea5e9]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Описание</label>
                <textarea
                  rows={3}
                  defaultValue="RoboStore - магазин роботов и робототехники"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0ea5e9]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="info@robostore.ru"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0ea5e9]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                  <input
                    type="tel"
                    defaultValue="8 800 123-45-67"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0ea5e9]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Адрес</label>
                <input
                  type="text"
                  defaultValue="Москва, ул. Робототехническая, 1"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0ea5e9]"
                />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'delivery' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">Настройки доставки</h2>
            <div className="space-y-6 max-w-2xl">
              <div>
                <h3 className="font-medium mb-4">Способы доставки</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Курьер', price: 490, freeFrom: 10000 },
                    { name: 'СДЭК', price: 290, freeFrom: 10000 },
                    { name: 'Почта России', price: 350, freeFrom: 15000 },
                  ].map((method, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                      <input type="checkbox" defaultChecked className="w-5 h-5 text-[#0ea5e9]" />
                      <div className="flex-1">
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-gray-500">Бесплатно от {new Intl.NumberFormat('ru-RU').format(method.freeFrom)} ₽</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          defaultValue={method.price}
                          className="w-24 px-3 py-2 border rounded-lg text-center"
                        />
                        <span className="text-gray-500">₽</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'payment' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">Способы оплаты</h2>
            <div className="space-y-4 max-w-2xl">
              {[
                { name: 'Банковской картой онлайн', enabled: true },
                { name: 'При получении', enabled: true },
                { name: 'Рассрочка 0%', enabled: true },
                { name: 'СБП (Система быстрых платежей)', enabled: false },
              ].map((method, i) => (
                <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                  <input type="checkbox" defaultChecked={method.enabled} className="w-5 h-5 text-[#0ea5e9]" />
                  <span className="flex-1 font-medium">{method.name}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    method.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {method.enabled ? 'Включено' : 'Выключено'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'notifications' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">Шаблоны уведомлений</h2>
            <div className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email отправителя</label>
                <input
                  type="email"
                  defaultValue="noreply@robostore.ru"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0ea5e9]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Шаблон нового заказа</label>
                <textarea
                  rows={4}
                  defaultValue="Здравствуйте, {name}! Ваш заказ #{order_id} принят."
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0ea5e9]"
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button className="flex items-center gap-2 px-6 py-3 bg-[#0ea5e9] text-white rounded-lg hover:bg-[#0284c7]">
            <Save size={20} />
            Сохранить изменения
          </button>
        </div>
      </main>
    </div>
  );
}
