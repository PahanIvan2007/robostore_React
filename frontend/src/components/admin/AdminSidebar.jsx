import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Users, Package, MessageSquare, Settings, LogOut, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function AdminSidebar({ role = 'manager' }) {
  const location = useLocation();
  
  const managerMenu = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/manager' },
    { icon: ShoppingCart, label: 'Заказы', path: '/manager/orders' },
    { icon: Users, label: 'Клиенты', path: '/manager/clients' },
    { icon: Package, label: 'Товары', path: '/manager/products' },
    { icon: MessageSquare, label: 'Сообщения', path: '/manager/messages' },
  ];

  const adminMenu = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Package, label: 'Каталог', path: '/admin/catalog' },
    { icon: ShoppingCart, label: 'Заказы', path: '/admin/orders' },
    { icon: Users, label: 'Клиенты', path: '/admin/clients' },
    { icon: MessageSquare, label: 'Рассылки', path: '/admin/marketing' },
    { icon: Settings, label: 'Настройки', path: '/admin/settings' },
  ];

  const sysadminMenu = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/sysadmin' },
    { icon: Package, label: 'Файлы', path: '/sysadmin/files' },
    { icon: Database, label: 'База данных', path: '/sysadmin/database' },
    { icon: Server, label: 'Серверы', path: '/sysadmin/servers' },
    { icon: Activity, label: 'Мониторинг', path: '/sysadmin/monitoring' },
    { icon: Shield, label: 'Безопасность', path: '/sysadmin/security' },
    { icon: Settings, label: 'Настройки', path: '/sysadmin/settings' },
  ];

  const menu = role === 'sysadmin' ? sysadminMenu : role === 'admin' ? adminMenu : managerMenu;

  return (
    <aside className="w-64 bg-[#1a1a2e] text-white flex flex-col h-screen fixed left-0 top-0">
      <div className="p-4 border-b border-gray-700">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#0ea5e9] to-[#0369a1] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <div>
            <span className="font-bold text-lg">RoboStore</span>
            <span className="block text-xs text-gray-400 capitalize">{role === 'sysadmin' ? 'Системный админ' : role === 'admin' ? 'Администратор' : 'Менеджер'}</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'bg-[#0ea5e9] text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span>На сайт</span>
        </Link>
      </div>
    </aside>
  );
}

const Database = ({ size }) => (
  <svg width={size || 20} height={size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M3 5V19A9 3 0 0 0 21 19V5"/>
    <path d="M3 12A9 3 0 0 0 21 12"/>
  </svg>
);

const Server = ({ size }) => (
  <svg width={size || 20} height={size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
    <line x1="6" y1="6" x2="6.01" y2="6"/>
    <line x1="6" y1="18" x2="6.01" y2="18"/>
  </svg>
);

const Activity = ({ size }) => (
  <svg width={size || 20} height={size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);

const Shield = ({ size }) => (
  <svg width={size || 20} height={size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
