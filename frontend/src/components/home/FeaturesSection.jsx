import { Shield, HeadphonesIcon, GraduationCap, Truck } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Официальный партнёр',
    description: 'Авторизованный дистрибьютор ведущих брендов робототехники',
  },
  {
    icon: HeadphonesIcon,
    title: 'Техническая поддержка 24/7',
    description: 'Круглосуточная помощь специалистов по настройке и обслуживанию',
  },
  {
    icon: GraduationCap,
    title: 'Обучение и документы',
    description: 'Курсы, сертификаты и полная документация на русском языке',
  },
  {
    icon: Truck,
    title: 'Доставка по всей России',
    description: 'Быстрая доставка курьером, в пункт выдачи или на склад',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
