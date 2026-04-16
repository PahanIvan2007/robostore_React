import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, ShoppingCart, Users, Package, DollarSign, Target, BarChart3 } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';

const stats = [
  { label: 'Выручка за месяц', value: '4 567 890 ₽', change: '+18%', positive: true, icon: DollarSign },
  { label: 'Заказов', value: '234', change: '+12%', positive: true, icon: ShoppingCart },
  { label: 'Средний чек', value: '19 521 ₽', change: '+5%', positive: true, icon: BarChart3 },
  { label: 'Новых клиентов', value: '89', change: '-3%', positive: false, icon: Users },
];

const topProducts = [
  { name: 'RoboHome Pro X1', sold: 45, revenue: 7199550 },
  { name: 'BusinessBot 5000', sold: 23, revenue: 10579770 },
  { name: 'CleanMaster Junior', sold: 67, revenue: 5359330 },
  { name: 'GuardBot Security', sold: 18, revenue: 5399820 },
];

const salesData = [
  { day: 'Пн', sales: 125000 },
  { day: 'Вт', sales: 89000 },
  { day: 'Ср', sales: 156000 },
  { day: 'Чт', sales: 178000 },
  { day: 'Пт', sales: 245000 },
  { day: 'Сб', sales: 189000 },
  { day: 'Вс', sales: 98000 },
];

export default function AdminDashboard() {
  const maxSales = Math.max(...salesData.map(d => d.sales));

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar role="admin" />
      
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Админ-панель</h1>
            <p className="text-gray-500">Аналитика и управление магазином</p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <Target className="text-[#0ea5e9]" size={20} />
            <span className="text-sm text-gray-600">Цель на месяц:</span>
            <span className="font-bold text-green-600">5 000 000 ₽</span>
            <span className="text-sm text-gray-500">(91%)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#0ea5e9] rounded-lg flex items-center justify-center">
                  <stat.icon className="text-white" size={24} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.positive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Продажи за неделю</h2>
              <select className="px-3 py-1 border rounded-lg text-sm">
                <option>Эта неделя</option>
                <option>Прошлая неделя</option>
                <option>Этот месяц</option>
              </select>
            </div>
            <div className="h-64 flex items-end justify-between gap-4">
              {salesData.map((day, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-gradient-to-t from-[#0ea5e9] to-[#38bdf8] rounded-t-lg transition-all"
                    style={{ height: `${(day.sales / maxSales) * 200}px` }}
                  />
                  <span className="text-sm text-gray-500">{day.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">Топ товаров</h2>
            <div className="space-y-4">
              {topProducts.map((product, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-[#0ea5e9] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sold} шт.</p>
                  </div>
                  <p className="font-semibold">{new Intl.NumberFormat('ru-RU').format(product.revenue)} ₽</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">Когорты клиентов</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Новые (этот месяц)</span>
                <span className="font-bold">89</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Активные (покупали 30 дней)</span>
                <span className="font-bold">156</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Вернувшиеся (покупали повторно)</span>
                <span className="font-bold">78</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Ушедшие (нет покупок 90 дней)</span>
                <span className="font-bold text-red-600">34</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">Распределение по категориям</h2>
            <div className="space-y-4">
              {[
                { name: 'Домашние роботы', percent: 45, color: 'bg-blue-500' },
                { name: 'Бизнес-роботы', percent: 28, color: 'bg-purple-500' },
                { name: 'Развлечения', percent: 18, color: 'bg-green-500' },
                { name: 'Промышленные', percent: 9, color: 'bg-orange-500' },
              ].map((cat, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">{cat.name}</span>
                    <span className="text-sm font-medium">{cat.percent}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${cat.color} rounded-full`}
                      style={{ width: `${cat.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
