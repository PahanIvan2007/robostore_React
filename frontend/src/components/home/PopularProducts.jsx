import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const products = [
  {
    id: 1,
    name: 'RoboHome Pro X1',
    price: 159990,
    oldPrice: 189990,
    rating: 4.9,
    reviews: 234,
    image: 'robot-1',
    category: 'home',
    badge: 'Хит продаж',
  },
  {
    id: 2,
    name: 'BusinessBot 5000',
    price: 459990,
    rating: 4.8,
    reviews: 89,
    image: 'robot-2',
    category: 'business',
    badge: 'Новинка',
  },
  {
    id: 3,
    name: 'CleanMaster Junior',
    price: 79990,
    oldPrice: 99990,
    rating: 4.7,
    reviews: 567,
    image: 'robot-3',
    category: 'home',
    badge: '-20%',
  },
  {
    id: 4,
    name: 'GuardBot Security',
    price: 299990,
    rating: 4.9,
    reviews: 156,
    image: 'robot-4',
    category: 'business',
    badge: null,
  },
];

export default function PopularProducts() {
  const { addItem } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title mb-0">Популярные товары</h2>
          <Link to="/catalog" className="text-primary-600 hover:text-primary-700 font-medium">
            Смотреть все →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card group">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl flex items-center justify-center overflow-hidden">
                  <div className="w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">R</span>
                  </div>
                </div>
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-robot-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                    <Heart size={18} />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                    <Eye size={18} />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>
                
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-primary-600">{formatPrice(product.price)}</span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-400 line-through ml-2">
                        {formatPrice(product.oldPrice)}
                      </span>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => addItem(product)}
                  className="w-full mt-3 bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} />
                  В корзину
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
