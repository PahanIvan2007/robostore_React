import { Link } from 'react-router-dom';
import { Home, Briefcase, Factory, Gamepad2, Settings } from 'lucide-react';

const categories = [
  { 
    icon: Home, 
    name: 'Домашние роботы', 
    count: 156,
    image: 'from-blue-500 to-blue-700',
    link: '/catalog?category=home'
  },
  { 
    icon: Briefcase, 
    name: 'Бизнес-роботы', 
    count: 89,
    image: 'from-purple-500 to-purple-700',
    link: '/catalog?category=business'
  },
  { 
    icon: Factory, 
    name: 'Промышленные', 
    count: 45,
    image: 'from-orange-500 to-orange-700',
    link: '/catalog?category=industrial'
  },
  { 
    icon: Gamepad2, 
    name: 'Развлечения', 
    count: 78,
    image: 'from-green-500 to-green-700',
    link: '/catalog?category=entertainment'
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="section-title text-center">Категории роботов</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <Link
              key={index}
              to={cat.link}
              className="group relative overflow-hidden rounded-2xl aspect-square"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.image} transition-transform group-hover:scale-105 duration-300`} />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <cat.icon className="w-16 h-16 mb-4 opacity-90" />
                <h3 className="text-xl font-bold mb-2">{cat.name}</h3>
                <p className="text-white/80">{cat.count} товаров</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
