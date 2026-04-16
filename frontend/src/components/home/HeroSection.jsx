import { Link } from 'react-router-dom';
import { ArrowRight, Shield, HeadphonesIcon, GraduationCap, Truck } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-robot-dark via-gray-900 to-gray-800 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-20 lg:py-32 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Роботы будущего<br />
              <span className="text-primary-400">уже здесь</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              Официальный дистрибьютор робототехники. Домашние помощники, 
              бизнес-решения и промышленные системы от ведущих мировых производителей.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/catalog" className="btn-primary inline-flex items-center gap-2">
                Смотреть каталог
                <ArrowRight size={20} />
              </Link>
              <Link to="/contacts" className="btn-secondary border-2 border-gray-600 hover:border-white">
                Связаться с нами
              </Link>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary-500 rounded-full blur-3xl opacity-30" />
            <div className="relative bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-8 shadow-2xl">
              <div className="aspect-square bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center">
                <svg className="w-48 h-48 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
