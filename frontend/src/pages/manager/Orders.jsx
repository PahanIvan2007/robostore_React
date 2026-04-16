import { useState } from 'react';
import { Search, Filter, Eye, Check, X, Truck, Package } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';

const orders = [
  { id: '12345', date: '16.04.2026', customer: 'Алексей Петров', phone: '+7 (999) 123-45-67', total: 159990, status: 'Новый', items: 2 },
  { id: '12344', date: '16.04.2026', customer: 'Мария Сидорова', phone: '+7 (999) 234-56-78', total: 79990, status: 'Обработан', items: 1 },
  { id: '12343', date: '15.04.2026', customer: 'Иван Козлов', phone: '+7 (999) 345-67-89', total: 299990, status: 'Отправлен', items: 1 },
  { id: '12342', date: '15.04.2026', customer: 'Елена Волкова', phone: '+7 (999) 456-78-90', total: 49990, status: 'Новый', items: 3 },
  { id: '12341', date: '14.04.2026', customer: 'Дмитрий Новиков', phone: '+7 (999) 567-89-01', total: 459990, status: 'Ожидает оплату', items: 1 },
  { id: '12340', date: '14.04.2026', customer: 'Анна Кузнецова', phone: '+7 (999) 678-90-12', total: 89990, status: 'Доставлен', items: 2 },
  { id: '12339', date: '13.04.2026', customer: 'Сергей Морозов', phone: '+7 (999) 789-01-23', total: 199990, status: 'Доставлен', items: 1 },
  { id: '12338', date: '13.04.2026', customer: 'Ольга Соколова', phone: '+7 (999) 890-12-34', total: 79990, status: 'Отменён', items: 1 },
];

const statusOptions = ['Все', 'Новый', 'Обработан', 'Отправлен', 'Доставлен', 'Ожидает оплату', 'Отменён'];
const statusColors = {
  'Новый': 'bg-blue-100 text-blue-700',
  'Обработан': 'bg-yellow-100 text-yellow-700',
  'Отправлен': 'bg-green-100 text-green-700',
  'Доставлен': 'bg-gray-100 text-gray-700',
  'Ожидает оплату': 'bg-orange-100 text-orange-700',
  'Отменён': 'bg-red-100 text-red-700',
};

export default function ManagerOrders() {
  const [filter, setFilter] = useState('Все');
  const [search, setSearch] = useState('');

  const filteredOrders = orders.filter(order => {
    if (filter !== 'Все' && order.status !== filter) return false;
    if (search && !order.customer.toLowerCase().includes(search.toLowerCase()) && !order.id.includes(search)) return false;
    return true;
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar role="manager" />
      
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Заказы</h1>
          <p className="text-gray-500">Управление заказами</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="p-4 border-b flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Поиск по клиенту или номеру заказа..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === status
                      ? 'bg-[#0ea5e9] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Заказ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Клиент</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Дата</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Сумма</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="font-medium">#{order.id}</span>
                      <span className="text-gray-500 text-sm ml-2">({order.items} товара)</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.phone}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 font-semibold">{new Intl.NumberFormat('ru-RU').format(order.total)} ₽</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-500 hover:text-[#0ea5e9] hover:bg-blue-50 rounded-lg" title="Просмотр">
                          <Eye size={18} />
                        </button>
                        {order.status === 'Новый' && (
                          <>
                            <button className="p-2 text-green-500 hover:bg-green-50 rounded-lg" title="Подтвердить">
                              <Check size={18} />
                            </button>
                            <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg" title="Отменить">
                              <X size={18} />
                            </button>
                          </>
                        )}
                        {order.status === 'Обработан' && (
                          <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg" title="Отправить">
                            <Truck size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Заказы не найдены</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
