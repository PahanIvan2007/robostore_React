import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, SlidersHorizontal, X, Star, ShoppingCart, Heart, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import MainLayout from '../components/layout/MainLayout';

const allProducts = [
  { id: 1, name: 'RoboHome Pro X1', price: 159990, oldPrice: 189990, rating: 4.9, reviews: 234, category: 'home', inStock: true },
  { id: 2, name: 'BusinessBot 5000', price: 459990, rating: 4.8, reviews: 89, category: 'business', inStock: true },
  { id: 3, name: 'CleanMaster Junior', price: 79990, oldPrice: 99990, rating: 4.7, reviews: 567, category: 'home', inStock: true },
  { id: 4, name: 'GuardBot Security', price: 299990, rating: 4.9, reviews: 156, category: 'business', inStock: false },
  { id: 5, name: 'RoboChef Kitchen', price: 199990, rating: 4.6, reviews: 78, category: 'home', inStock: true },
  { id: 6, name: 'DeliveryDrone Air', price: 89990, rating: 4.5, reviews: 123, category: 'entertainment', inStock: true },
  { id: 7, name: 'FactoryArm Pro', price: 1299990, rating: 4.9, reviews: 45, category: 'industrial', inStock: true },
  { id: 8, name: 'PetBuddy Animal', price: 49990, rating: 4.7, reviews: 289, category: 'entertainment', inStock: true },
  { id: 9, name: 'EducationBot Learn', price: 79990, rating: 4.8, reviews: 167, category: 'business', inStock: true },
  { id: 10, name: 'MedicalAssist Robo', price: 899990, rating: 5.0, reviews: 34, category: 'business', inStock: false },
  { id: 11, name: 'WarehouseBot Move', price: 599990, rating: 4.7, reviews: 56, category: 'industrial', inStock: true },
  { id: 12, name: 'CompanionBot Home', price: 129990, rating: 4.9, reviews: 412, category: 'home', inStock: true },
];

const categories = [
  { id: 'all', name: 'Все товары' },
  { id: 'home', name: 'Домашние' },
  { id: 'business', name: 'Бизнес' },
  { id: 'industrial', name: 'Промышленные' },
  { id: 'entertainment', name: 'Развлечения' },
];

const brands = ['RoboCorp', 'TechBot', 'SmartMech', 'AutoRobo', 'FutureTech'];
const priceRanges = [
  { id: 'all', label: 'Любая цена' },
  { id: '0-50000', label: 'До 50 000 ₽' },
  { id: '50000-150000', label: '50 000 - 150 000 ₽' },
  { id: '150000-500000', label: '150 000 - 500 000 ₽' },
  { id: '500000+', label: 'Более 500 000 ₽' },
];

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  
  const { addItem } = useCart();

  const categoryFilter = searchParams.get('category') || 'all';
  
  const filteredProducts = allProducts.filter(product => {
    if (categoryFilter !== 'all' && product.category !== categoryFilter) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      default: return b.reviews - a.reviews;
    }
  });

  const formatPrice = (price) => new Intl.NumberFormat('ru-RU').format(price) + ' ₽';

  return (
    <MainLayout>
      <div className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary-600">Главная</Link>
            <span>/</span>
            <span className="text-gray-900">Каталог</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className={`lg:w-64 flex-shrink-0 ${filtersOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Фильтры</h3>
                <button 
                  onClick={() => setFiltersOpen(false)}
                  className="lg:hidden text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-3">Категория</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={categoryFilter === cat.id}
                        onChange={() => {
                          if (cat.id === 'all') {
                            searchParams.delete('category');
                          } else {
                            searchParams.set('category', cat.id);
                          }
                          setSearchParams(searchParams);
                        }}
                        className="w-4 h-4 text-primary-600"
                      />
                      <span className="text-gray-600">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-3">Цена</h4>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range.id} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="price" className="w-4 h-4 text-primary-600" />
                      <span className="text-gray-600">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-3">Бренд</h4>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-primary-600 rounded" />
                      <span className="text-gray-600">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Наличие</h4>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-primary-600 rounded" />
                  <span className="text-gray-600">Только в наличии</span>
                </label>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-lg border"
                >
                  <SlidersHorizontal size={18} />
                  Фильтры
                </button>
                <span className="text-gray-600">
                  Найдено: <strong>{sortedProducts.length}</strong> товаров
                </span>
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="popular">По популярности</option>
                  <option value="price-low">Сначала дешевле</option>
                  <option value="price-high">Сначала дороже</option>
                  <option value="rating">По рейтингу</option>
                </select>

                <div className="hidden sm:flex items-center gap-1 bg-white rounded-lg border p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <div key={product.id} className="card group">
                    <div className="relative">
                      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl flex items-center justify-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-3xl font-bold">R</span>
                        </div>
                      </div>
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 rounded-t-xl flex items-center justify-center">
                          <span className="bg-white text-gray-800 px-4 py-2 rounded-lg font-medium">
                            Под заказ
                          </span>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                          <Heart size={18} />
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
                        disabled={!product.inStock}
                        className="w-full mt-3 bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={18} />
                        В корзину
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedProducts.map((product) => (
                  <div key={product.id} className="card p-4 flex gap-6">
                    <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">R</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <Link to={`/product/${product.id}`}>
                            <h3 className="font-semibold text-lg text-gray-900 hover:text-primary-600">
                              {product.name}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{product.rating}</span>
                            <span className="text-sm text-gray-500">({product.reviews} отзывов)</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-bold text-primary-600">{formatPrice(product.price)}</span>
                          {product.oldPrice && (
                            <span className="block text-sm text-gray-400 line-through">
                              {formatPrice(product.oldPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 mt-2 line-clamp-2">
                        Высокотехнологичный робот для {product.category === 'home' ? 'домашнего использования' : product.category === 'business' ? 'бизнес-задач' : product.category === 'industrial' ? 'промышленного применения' : 'развлечений'}.
                      </p>
                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => addItem(product)}
                          disabled={!product.inStock}
                          className="btn-primary flex items-center gap-2"
                        >
                          <ShoppingCart size={18} />
                          В корзину
                        </button>
                        <button className="btn-secondary flex items-center gap-2">
                          <Heart size={18} />
                          В избранное
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
