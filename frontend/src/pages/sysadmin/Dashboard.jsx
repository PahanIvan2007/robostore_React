import { Link } from 'react-router-dom';
import { Server, Database, HardDrive, Cpu, Wifi, Shield, AlertTriangle, CheckCircle, Clock, Activity } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';

const serverStatus = [
  { name: 'web-01', type: 'Web Server', status: 'online', cpu: 34, ram: 67, disk: 45 },
  { name: 'api-01', type: 'API Server', status: 'online', cpu: 28, ram: 52, disk: 38 },
  { name: 'db-01', type: 'PostgreSQL', status: 'online', cpu: 15, ram: 78, disk: 62 },
  { name: 'cache-01', type: 'Redis', status: 'online', cpu: 8, ram: 34, disk: 12 },
];

const recentLogs = [
  { time: '14:32:15', level: 'info', message: 'API request completed in 45ms' },
  { time: '14:32:10', level: 'info', message: 'User login successful: user@example.com' },
  { time: '14:31:58', level: 'warning', message: 'High memory usage on db-01 (78%)' },
  { time: '14:31:45', level: 'error', message: 'Failed login attempt from 192.168.1.105' },
  { time: '14:31:30', level: 'info', message: 'Backup completed successfully' },
];

const levelColors = {
  info: 'bg-blue-100 text-blue-700',
  warning: 'bg-yellow-100 text-yellow-700',
  error: 'bg-red-100 text-red-700',
};

export default function SysadminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar role="sysadmin" />
      
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Системный мониторинг</h1>
          <p className="text-gray-500">Состояние серверов и инфраструктуры</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <Server className="text-white" size={24} />
              </div>
              <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                <CheckCircle size={16} /> Online
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">4</h3>
            <p className="text-gray-500">Активных серверов</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Activity className="text-white" size={24} />
              </div>
              <span className="text-sm text-gray-500">99.9%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">12ms</h3>
            <p className="text-gray-500">Среднее время отклика</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <HardDrive className="text-white" size={24} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">2.4 TB</h3>
            <p className="text-gray-500">Использовано хранилища</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                <AlertTriangle className="text-white" size={24} />
              </div>
              <span className="text-red-600 text-sm font-medium">1</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">2</h3>
            <p className="text-gray-500">Активных предупреждений</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Серверы</h2>
              <Link to="/sysadmin/servers" className="text-[#0ea5e9] hover:underline text-sm">
                Управление →
              </Link>
            </div>
            <div className="divide-y">
              {serverStatus.map((server, i) => (
                <div key={i} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${server.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`} />
                      <div>
                        <p className="font-medium">{server.name}</p>
                        <p className="text-sm text-gray-500">{server.type}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      server.status === 'online' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {server.status === 'online' ? 'Online' : 'Offline'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'CPU', value: server.cpu },
                      { label: 'RAM', value: server.ram },
                      { label: 'Disk', value: server.disk },
                    ].map((metric, j) => (
                      <div key={j}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-500">{metric.label}</span>
                          <span className="font-medium">{metric.value}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              metric.value > 80 ? 'bg-red-500' : metric.value > 60 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${metric.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Последние логи</h2>
              <Link to="/sysadmin/logs" className="text-[#0ea5e9] hover:underline text-sm">
                Все логи →
              </Link>
            </div>
            <div className="divide-y max-h-96 overflow-y-auto">
              {recentLogs.map((log, i) => (
                <div key={i} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs text-gray-400 font-mono">{log.time}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${levelColors[log.level]}`}>
                      {log.level}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{log.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">SSL Сертификаты</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium">robostore.ru</p>
                  <p className="text-sm text-gray-500">Действителен до 15.08.2026</p>
                </div>
                <Shield className="text-green-600" size={20} />
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium">api.robostore.ru</p>
                  <p className="text-sm text-yellow-700">Истекает через 14 дней</p>
                </div>
                <AlertTriangle className="text-yellow-500" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Бэкапы</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">База данных</p>
                  <p className="text-sm text-gray-500">Последний: сегодня 03:00</p>
                </div>
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Файлы</p>
                  <p className="text-sm text-gray-500">Последний: вчера 02:00</p>
                </div>
                <span className="text-green-600 text-sm">✓</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Быстрые действия</h2>
            <div className="space-y-2">
              <Link
                to="/sysadmin/deploy"
                className="block p-3 border rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <p className="font-medium">Деплой приложения</p>
                <p className="text-sm text-gray-500">Выкатка новой версии</p>
              </Link>
              <Link
                to="/sysadmin/cache"
                className="block p-3 border rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <p className="font-medium">Очистить кэш</p>
                <p className="text-sm text-gray-500">Redis и CDN</p>
              </Link>
              <Link
                to="/sysadmin/maintenance"
                className="block p-3 border rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors"
              >
                <p className="font-medium text-red-600">Режим обслуживания</p>
                <p className="text-sm text-gray-500">Включить/выключить</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
