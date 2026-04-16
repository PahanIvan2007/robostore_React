import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, Heart } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cart = useCart();
  const user = useAuth();
  const navigate = useNavigate();

  const cartItemsCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const categories = [
    { name: 'Домашние роботы', path: '/catalog?category=home' },
    { name: 'Бизнес-роботы', path: '/catalog?category=business' },
    { name: 'Промышленные', path: '/catalog?category=industrial' },
    { name: 'Развлечения', path: '/catalog?category=entertainment' },
    { name: 'Аксессуары', path: '/catalog?category=accessories' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-gray-900">RoboStore</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {categories.slice(0, 4).map((cat) => (
              <Link
                key={cat.name}
                to={cat.path}
                className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <Search size={20} />
            </button>

            <Link
              to="/favorites"
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors hidden sm:block"
            >
              <Heart size={20} />
            </Link>

            <Link
              to="/cart"
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors relative"
            >
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-robot-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            <Link
              to={user ? '/account' : '/login'}
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <User size={20} />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="py-4 border-t">
            <div className="relative">
              <input
                type="search"
                placeholder="Поиск роботов..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                autoFocus
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
        )}
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={cat.path}
                className="block py-2 text-gray-600 hover:text-primary-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
