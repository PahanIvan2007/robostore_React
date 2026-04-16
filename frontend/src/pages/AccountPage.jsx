import { Link, useNavigate } from 'react-router-dom';
import { User, Package, Heart, Eye, MapPin, Bell, Settings, ChevronRight, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../components/layout/MainLayout';

const menuItems = [
  { icon: Package, label: 'Мои заказы', path: '/account/orders' },
  { icon: Heart, label: 'Избранное', path: '/account/favorites' },
  { icon: Eye, label: 'Просмотренные', path: '/account/viewed' },
  { icon: MapPin, label: 'Адреса доставки', path: '/account/addresses' },
  { icon: Bell, label: 'Уведомления', path: '/account/notifications' },
  { icon: Settings, label: 'Настройки', path: '/account/settings' },
];

const recentOrders = [
  { id: '12345', date: '15.04.2026', total: 159990, status: 'Доставлен' },
  { id: '12340', date: '10.04.2026', total: 79990, status: 'В пути' },
];

export default function AccountPage() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Войдите в аккаунт</h1>
            <p className="text-gray-600 mb-6">Для доступа к личному кабинету необходимо авторизоваться</p>
            <div className="flex gap-4 justify-center">
              <Link to="/login" className="btn-primary">Войти</Link>
              <Link to="/register" className="btn-secondary">Регистрация</Link>
            </div>
          </div>
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
            <span className="text-gray-900">Личный кабинет</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl border p-6">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user.name || 'Пользователь'}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <item.icon size={20} className="text-gray-400" />
                    <span className="text-gray-700">{item.label}</span>
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                >
                  <LogOut size={20} />
                  <span>Выйти</span>
                </button>
              </nav>
            </div>
          </aside>

          <main className="lg:col-span-3 space-y-8">
            <div className="bg-white rounded-xl border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Последние заказы</h2>
                <Link to="/account/orders" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  Все заказы →
                </Link>
              </div>

              {recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                          <Package className="text-primary-600" />
                        </div>
                        <div>
                          <p className="font-semibold">Заказ #{order.id}</p>
                          <p className="text-sm text-gray-500">{order.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="font-semibold">{new Intl.NumberFormat('ru-RU').format(order.total)} ₽</p>
                          <p className="text-sm text-green-600">{order.status}</p>
                        </div>
                        <ChevronRight className="text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">У вас пока нет заказов</p>
                  <Link to="/catalog" className="btn-primary mt-4 inline-block">
                    Перейти в каталог
                  </Link>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border p-6">
                <h2 className="text-lg font-bold mb-4">Персональные данные</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Имя</span>
                    <span>{user.name || 'Не указано'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email</span>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Телефон</span>
                    <span>{user.phone || 'Не указан'}</span>
                  </div>
                </div>
                <Link
                  to="/account/settings"
                  className="mt-4 text-primary-600 hover:text-primary-700 font-medium text-sm inline-block"
                >
                  Редактировать →
                </Link>
              </div>

              <div className="bg-white rounded-xl border p-6">
                <h2 className="text-lg font-bold mb-4">Быстрые ссылки</h2>
                <div className="space-y-2">
                  <Link to="/catalog?category=home" className="block py-2 hover:text-primary-600">
                    Домашние роботы
                  </Link>
                  <Link to="/catalog?category=business" className="block py-2 hover:text-primary-600">
                    Бизнес-роботы
                  </Link>
                  <Link to="/delivery" className="block py-2 hover:text-primary-600">
                    Информация о доставке
                  </Link>
                  <Link to="/warranty" className="block py-2 hover:text-primary-600">
                    Гарантия и возврат
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </MainLayout>
  );
}
