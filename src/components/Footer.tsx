import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Linkedin, ArrowUp } from 'lucide-react';

interface FooterProps {
  onPageChange: (page: string) => void;
}

export default function Footer({ onPageChange }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="elite-footer" className="bg-slate-950 text-slate-400 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand presentation */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-serif font-bold text-base">
                EI
              </div>
              <span className="text-xl font-semibold tracking-wider text-white font-sans uppercase">
                Elite <span className="text-amber-400">Immo</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Depuis plus de 15 ans, Elite Immo accompagne les acquéreurs et vendeurs du monde entier dans leurs projets d'immobilier d'exception et d'investissements haut de gamme en France et en Europe.
            </p>
            <div className="flex space-x-3 pt-2">
              <a
                id="social-instagram"
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-slate-300 hover:text-amber-400 hover:border-amber-400 hover:bg-amber-400/5 transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                id="social-facebook"
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-slate-300 hover:text-amber-400 hover:border-amber-400 hover:bg-amber-400/5 transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                id="social-linkedin"
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-slate-300 hover:text-amber-400 hover:border-amber-400 hover:bg-amber-400/5 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-white font-sans text-sm font-semibold tracking-wider uppercase border-b border-amber-500/20 pb-2 inline-block">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onPageChange('home')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange('listings')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Propriétés d'Exception
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange('gallery')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Galerie & Médias
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange('about')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  L'Agence & Équipe
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange('contact')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Prendre Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact details */}
          <div className="space-y-4">
            <h3 className="text-white font-sans text-sm font-semibold tracking-wider uppercase border-b border-amber-500/20 pb-2 inline-block">
              Notre Bureau
            </h3>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  42 Avenue Montaigne,<br />
                  75008 Paris, France
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-mono">+33 1 45 67 89 10</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-mono">contact@elite-immo.fr</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white font-sans text-sm font-semibold tracking-wider uppercase border-b border-amber-500/20 pb-2 inline-block">
              Elite Newsletter
            </h3>
            <p className="text-xs leading-relaxed text-slate-400">
              Recevez mensuellement nos opportunités exclusives d'investissement hors-marché.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm text-white focus:outline-none focus:border-amber-500 focus:bg-white/10 transition-colors placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 p-1.5 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors cursor-pointer"
                  aria-label="S'abonner"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              {subscribed && (
                <p id="subscription-success" className="text-xs text-emerald-400 font-medium animate-pulse">
                  Inscription validée. Bienvenue au cercle d'initiés.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Elite Immo Premium. Tous droits réservés.</p>
          <div className="flex space-x-8 mt-4 sm:mt-0">
            <a href="#" className="hover:text-amber-500">Mentions Légales</a>
            <a href="#" className="hover:text-amber-500">Politique de Confidentialité</a>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 hover:text-amber-500 transition-colors"
            >
              <span>Haut de page</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
