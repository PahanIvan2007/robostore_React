import { useState } from 'react';
import { Search, Plus, Phone, Mail, ShoppingBag, MessageSquare } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';

const clients = [
  { id: 1, name: 'Алексей Петров', email: 'alexey@example.com', phone: '+7 (999) 123-45-67', orders: 5, totalSpent: 459990, lastOrder: '16.04.2026', tag: 'Постоянный' },
  { id: 2, name: 'Мария Сидорова', email: 'maria@example.com', phone: '+7 (999) 234-56-78', orders: 2, totalSpent: 159980, lastOrder: '16.04.2026', tag: null },
  { id: 3, name: 'Иван Козлов', email: 'ivan@example.com', phone: '+7 (999) 345-67-89', orders: 8, totalSpent: 899990, lastOrder: '15.04.2026', tag: 'VIP' },
  { id: 4, name: 'Елена Волкова', email: 'elena@example.com', phone: '+7 (999) 456-78-90', orders: 1, totalSpent: 49990, lastOrder: '15.04.2026', tag: 'Новый' },
  { id: 5, name: 'Дмитрий Новиков', email: 'dmitriy@example.com', phone: '+7 (999) 567-89-01', orders: 3, totalSpent: 599990, lastOrder: '14.04.2026', tag: null },
  { id: 6, name: 'Анна Кузнецова', email: 'anna@example.com', phone: '+7 (999) 678-90-12', orders: 4, totalSpent: 299960, lastOrder: '14.04.2026', tag: 'Проблемный' },
];

const tagColors = {
  'Постоянный': 'bg-green-100 text-green-700',
  'VIP': 'bg-purple-100 text-purple-700',
  'Новый': 'bg-blue-100 text-blue-700',
  'Проблемный': 'bg-red-100 text-red-700',
};

export default function ManagerClients() {
  const [search, setSearch] = useState('');

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(search.toLowerCase()) ||
    client.email.toLowerCase().includes(search.toLowerCase()) ||
    client.phone.includes(search)
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar role="manager" />
      
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Клиенты</h1>
            <p className="text-gray-500">База клиентов</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0ea5e9] text-white rounded-lg hover:bg-[#0284c7]">
            <Plus size={20} />
            Создать заказ
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="p-4 border-b">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Поиск по имени, email или телефону..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Клиент</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Контакты</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Заказов</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Сумма покупок</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Последний заказ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Метка</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium">{client.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <Mail size={14} /> {client.email}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <Phone size={14} /> {client.phone}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{client.orders}</td>
                    <td className="px-6 py-4 font-semibold">{new Intl.NumberFormat('ru-RU').format(client.totalSpent)} ₽</td>
                    <td className="px-6 py-4 text-gray-500">{client.lastOrder}</td>
                    <td className="px-6 py-4">
                      {client.tag && (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${tagColors[client.tag]}`}>
                          {client.tag}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-500 hover:text-[#0ea5e9] hover:bg-blue-50 rounded-lg" title="Заказы">
                          <ShoppingBag size={18} />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-[#0ea5e9] hover:bg-blue-50 rounded-lg" title="Написать">
                          <MessageSquare size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
