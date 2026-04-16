import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Какой срок гарантии на роботов?',
    answer: 'На все товары предоставляется официальная гарантия производителя. Стандартный срок — 12 месяцев, на некоторые модели — до 24 месяцев. Также доступно расширенное гарантийное обслуживание.',
  },
  {
    question: 'Как осуществляется доставка?',
    answer: 'Доставляем по всей России: курьером до двери, в пункт выдачи СДЭК, Boxberry или Почтой России. Сроки: 1-5 дней в зависимости от региона. Бесплатная доставка при заказе от 10 000 ₽.',
  },
  {
    question: 'Можно ли оплатить в рассрочку?',
    answer: 'Да! Предлагаем рассрочку от 0% до 24 месяцев через банки-партнёры: Сбербанк, Тинькофф, Альфа-Банк. Одобрение онлайн за 2 минуты, без первоначального взноса.',
  },
  {
    question: 'Что входит в комплект поставки?',
    answer: 'Каждый робот поставляется с: зарядным устройством, документацией на русском языке, гарантийным талоном, базовым набором аксессуаров. Подробный список зависит от модели.',
  },
  {
    question: 'Есть ли обучение по использованию?',
    answer: 'Предоставляем бесплатное онлайн-обучение для каждого клиента. Также доступны видеоинструкции, база знаний и техническая поддержка 24/7.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="section-title text-center">Частые вопросы</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
