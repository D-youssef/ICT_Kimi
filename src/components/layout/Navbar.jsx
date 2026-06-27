import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, BarChart2, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  const navLinks = [
    { path: '/', label: t('nav.home', 'Home') },
    { path: '/fvg', label: t('nav.fvg', 'FVG Entry') },
    { path: '/cisd', label: t('nav.cisd', 'CISD Entry') },
    { path: '/fibonacci', label: t('nav.fibonacci', 'Fibonacci') },
    { path: '/orderblock', label: t('nav.orderblock', 'Order Block') },
    { path: '/patterns', label: t('nav.patterns', 'Candle Patterns') },
    { path: '/liquidity', label: t('nav.liquidity', 'Liquidity') },
    { path: '/checklist', label: t('nav.checklist', 'Checklist') },
    { path: '/sessions', label: t('nav.sessions', 'Sessions') },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[var(--color-brand-bg)]/80 backdrop-blur-md border-b border-[var(--color-brand-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <BarChart2 className="h-8 w-8 text-[var(--color-ict-fvg)]" />
            <span className="font-bold text-xl tracking-tight text-white">ICT Journal</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="flex items-baseline space-x-2 space-x-reverse rtl:space-x-reverse">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => clsx(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors mx-1",
                    isActive 
                      ? "bg-[var(--color-brand-card)] text-white border border-[var(--color-brand-border)]"
                      : "text-gray-300 hover:bg-[var(--color-brand-card)] hover:text-white"
                  )}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 bg-black/30 hover:bg-black/50 text-gray-300 rounded-md transition-colors border border-white/5"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-bold">{i18n.language === 'en' ? 'AR' : 'EN'}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-gray-300 p-2"
            >
              <Globe className="w-5 h-5" />
              <span className="text-sm font-bold">{i18n.language === 'en' ? 'AR' : 'EN'}</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[var(--color-brand-card)] focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-[var(--color-brand-bg)] border-b border-[var(--color-brand-border)]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => clsx(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  isActive 
                    ? "bg-[var(--color-brand-card)] text-white"
                    : "text-gray-300 hover:bg-[var(--color-brand-card)] hover:text-white"
                )}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
