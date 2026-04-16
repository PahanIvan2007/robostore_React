import { useState } from 'react';
import { Gift, Send } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Gift className="w-8 h-8 text-white" />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4">
          Подпишитесь на рассылку
        </h2>
        <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
          Получайте первыми информацию о новинках, эксклюзивных предложениях и скидках до 30%.
          За подписку — скидка 500 ₽ на первый заказ!
        </p>
        
        {submitted ? (
          <div className="bg-white/20 rounded-xl p-6 max-w-md mx-auto">
            <p className="text-white font-medium">
              Спасибо за подписку! Проверьте почту — письмо с промокодом уже там.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ваш email"
              required
              className="flex-1 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
            >
              <Send size={20} />
              Подписаться
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
