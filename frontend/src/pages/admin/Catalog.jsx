import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Image, ToggleLeft, ToggleRight } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';

const products = [
  { id: 1, name: 'RoboHome Pro X1', category: 'Домашние роботы', price: 159990, oldPrice: 189990, stock: 15, status: true },
  { id: 2, name: 'BusinessBot 5000', category: 'Бизнес-роботы', price: 459990, oldPrice: null, stock: 8, status: true },
  { id: 3, name: 'CleanMaster Junior', category: 'Домашние роботы', price: 79990, oldPrice: 99990, stock: 42, status: true },
  { id: 4, name: 'GuardBot Security', category: 'Бизнес-роботы', price: 299990, oldPrice: null, stock: 5, status: true },
  { id: 5, name: 'RoboChef Kitchen', category: 'Домашние роботы', price: 199990, oldPrice: null, stock: 0, status: false },
];

const categories = [
  { id: 1, name: 'Домашние роботы', slug: 'home', products: 45, order: 1 },
  { id: 2, name: 'Бизнес-роботы', slug: 'business', products: 28, order: 2 },
  { id: 3, name: 'Промышленные', slug: 'industrial', products: 12, order: 3 },
  { id: 4, name: 'Развлечения', slug: 'entertainment', products: 23, order: 4 },
  { id: 5, name: 'Аксессуары', slug: 'accessories', products: 67, order: 5 },
];

export default function AdminCatalog() {
  const [activeTab, setActiveTab] = useState('products');
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar role="admin" />
      
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Каталог</h1>
            <p className="text-gray-500">Управление товарами и категориями</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="p-1 border-b flex">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-3 font-medium rounded-t-lg transition-colors ${
                activeTab === 'products' 
                  ? 'bg-white text-[#0ea5e9] shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Товары ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-6 py-3 font-medium rounded-t-lg transition-colors ${
                activeTab === 'categories' 
                  ? 'bg-white text-[#0ea5e9] shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Категории ({categories.length})
            </button>
          </div>

          {activeTab === 'products' && (
            <div>
              <div className="p-4 border-b flex gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Поиск товаров..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0ea5e9]"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#0ea5e9] text-white rounded-lg hover:bg-[#0284c7]">
                  <Plus size={20} />
                  Добавить товар
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Товар</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Категория</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Цена</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">На складе</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Действия</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <span className="text-2xl font-bold text-[#0ea5e9]">R</span>
                            </div>
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-gray-500">ID: {product.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{product.category}</td>
                        <td className="px-6 py-4">
                          <p className="font-semibold">{new Intl.NumberFormat('ru-RU').format(product.price)} ₽</p>
                          {product.oldPrice && (
                            <p className="text-sm text-gray-400 line-through">
                              {new Intl.NumberFormat('ru-RU').format(product.oldPrice)} ₽
                            </p>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`font-medium ${product.stock === 0 ? 'text-red-600' : 'text-gray-600'}`}>
                            {product.stock === 0 ? 'Нет в наличии' : product.stock + ' шт.'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {product.status ? (
                            <span className="flex items-center gap-1 text-green-600">
                              <ToggleRight size={20} /> Активен
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-gray-400">
                              <ToggleLeft size={20} /> Скрыт
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 text-gray-500 hover:text-[#0ea5e9] hover:bg-blue-50 rounded-lg" title="Редактировать">
                              <Edit size={18} />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg" title="Удалить">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div>
              <div className="p-4 border-b">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#0ea5e9] text-white rounded-lg hover:bg-[#0284c7]">
                  <Plus size={20} />
                  Добавить категорию
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Категория</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">URL</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Товаров</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Сортировка</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Действия</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {categories.map((category) => (
                      <tr key={category.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">{category.name}</td>
                        <td className="px-6 py-4 text-gray-500">/catalog?category={category.slug}</td>
                        <td className="px-6 py-4">{category.products}</td>
                        <td className="px-6 py-4">{category.order}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 text-gray-500 hover:text-[#0ea5e9] hover:bg-blue-50 rounded-lg">
                              <Edit size={18} />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
