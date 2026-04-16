import { Link } from 'react-router-dom';
import { ShoppingCart, Users, Package, AlertTriangle, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';

const stats = [
  { label: 'Новые заказы', value: 12, icon: ShoppingCart, color: 'bg-blue-500', change: '+3 сегодня' },
  { label: 'Выручка за день', value: '156 780 ₽', icon: TrendingUp, color: 'bg-green-500', change: '+12% к вчера' },
  { label: 'Клиентов онлайн', value: 8, icon: Users, color: 'bg-purple-500', change: 'Сейчас на сайте' },
  { label: 'Нет в наличии', value: 3, icon: AlertTriangle, color: 'bg-red-500', change: 'Требуют внимания' },
];

const recentOrders = [
  { id: '12345', customer: 'Алексей Петров', total: 159990, status: 'Новый', time: '5 мин назад' },
  { id: '12344', customer: 'Мария Сидорова', total: 79990, status: 'Обработан', time: '15 мин назад' },
  { id: '12343', customer: 'Иван Козлов', total: 299990, status: 'Отправлен', time: '32 мин назад' },
  { id: '12342', customer: 'Елена Волкова', total: 49990, status: 'Новый', time: '45 мин назад' },
  { id: '12341', customer: 'Дмитрий Новиков', total: 459990, status: 'Ожидает оплату', time: '1 час назад' },
];

const statusColors = {
  'Новый': 'bg-blue-100 text-blue-700',
  'Обработан': 'bg-yellow-100 text-yellow-700',
  'Отправлен': 'bg-green-100 text-green-700',
  'Ожидает оплату': 'bg-orange-100 text-orange-700',
};

export default function ManagerDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar role="manager" />
      
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Обзор текущей ситуации</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="text-white" size={24} />
                </div>
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Последние заказы</h2>
              <Link to="/manager/orders" className="text-[#0ea5e9] hover:underline text-sm">
                Все заказы →
              </Link>
            </div>
            <div className="divide-y">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="text-gray-500" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">#{order.id}</p>
                      <p className="text-sm text-gray-500">{order.customer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{new Intl.NumberFormat('ru-RU').format(order.total)} ₽</p>
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Быстрые действия</h2>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              <Link
                to="/manager/orders/new"
                className="p-4 border rounded-xl hover:border-[#0ea5e9] hover:bg-blue-50 transition-colors"
              >
                <ShoppingCart className="w-8 h-8 text-[#0ea5e9] mb-2" />
                <p className="font-medium">Создать заказ</p>
                <p className="text-sm text-gray-500">От имени клиента</p>
              </Link>
              <Link
                to="/manager/clients/search"
                className="p-4 border rounded-xl hover:border-[#0ea5e9] hover:bg-blue-50 transition-colors"
              >
                <Users className="w-8 h-8 text-[#0ea5e9] mb-2" />
                <p className="font-medium">Найти клиента</p>
                <p className="text-sm text-gray-500">По телефону или email</p>
              </Link>
              <Link
                to="/manager/messages"
                className="p-4 border rounded-xl hover:border-[#0ea5e9] hover:bg-blue-50 transition-colors"
              >
                <Clock className="w-8 h-8 text-[#0ea5e9] mb-2" />
                <p className="font-medium">Ответить в чат</p>
                <p className="text-sm text-gray-500">5 неотвеченных</p>
              </Link>
              <Link
                to="/manager/products"
                className="p-4 border rounded-xl hover:border-[#0ea5e9] hover:bg-blue-50 transition-colors"
              >
                <AlertTriangle className="w-8 h-8 text-red-500 mb-2" />
                <p className="font-medium">Пополнить склад</p>
                <p className="text-sm text-gray-500">3 товара закончились</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
