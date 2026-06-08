import { useState, useEffect } from 'react';
import { Menu, X, Home, Phone, Info, Image as ImageIcon, Search, KeyRound } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onOpenQuickSearch: () => void;
}

export default function Header({ currentPage, onPageChange, onOpenQuickSearch }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'listings', label: 'Propriétés', icon: KeyRound },
    { id: 'gallery', label: 'Galerie', icon: ImageIcon },
    { id: 'about', label: 'À Propos', icon: Info },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  return (
    <header
      id="elite-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-white/5 py-4'
          : 'bg-gradient-to-b from-black/80 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="btn-logo-home"
          onClick={() => {
            onPageChange('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center space-x-2 group cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
            <span className="text-slate-950 font-serif font-semibold text-xl tracking-tight">EI</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xl font-semibold tracking-wider text-white font-sans uppercase">
              Elite <span className="text-amber-400">Immo</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-slate-400 font-mono">
              Immobilier d'Excellence
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                id={`nav-link-${item.id}`}
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'text-amber-400'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeBubble"
                    className="absolute inset-0 bg-white/5 rounded-full border border-amber-500/20"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            id="btn-quick-search"
            onClick={onOpenQuickSearch}
            className="flex items-center space-x-2 text-sm text-slate-300 hover:text-white px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4 text-amber-400" />
            <span>Rechercher...</span>
          </button>
          <button
            id="btn-header-estimate"
            onClick={() => onPageChange('contact')}
            className="px-5 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 cursor-pointer shadow-md hover:shadow-amber-500/10 hover:from-amber-300 hover:to-amber-500 transition-all duration-300"
          >
            Estimation d'exception
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center space-x-3">
          <button
            id="btn-mobile-search"
            onClick={onOpenQuickSearch}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-300"
          >
            <Search className="w-5 h-5 text-amber-400" />
          </button>
          <button
            id="btn-hamburger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-slate-950/98 backdrop-blur-xl border-b border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    id={`mobile-nav-${item.id}`}
                    key={item.id}
                    onClick={() => {
                      onPageChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive
                        ? 'bg-amber-500/10 text-amber-400 border-l-4 border-amber-500 pl-3'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <div className="pt-4 border-t border-white/10 flex flex-col space-y-2">
                <button
                  id="btn-mobile-estimate"
                  onClick={() => {
                    onPageChange('contact');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-center px-4 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-semibold text-sm shadow-md"
                >
                  Estimation Gratuite
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
