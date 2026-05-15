import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from './translations';
import { 
  Menu, X, Globe, ChevronUp, MapPin, Phone, Mail, 
  Hammer, Square, Brush, Paintbrush, LayoutGrid, 
  DoorOpen, DoorClosed, Grid3X3, Bath, Home, Fence, 
  Layout, AppWindow, Star, ShieldCheck, Users, 
  DollarSign, FileBadge, Clock, MessageCircle, Ruler
} from 'lucide-react';

const serviceIcons: Record<string, any> = {
  Hammer, Square, Brush, Paintbrush, LayoutGrid, DoorOpen, DoorClosed, Grid3X3, Bath, Home, Fence, Layout, AppWindow, Ruler
};

const whyIcons: Record<string, any> = {
  Star, ShieldCheck, Users, DollarSign, FileBadge, Clock
};

function LogoImg({ className = "", fallbackClassName = "" }: { className?: string, fallbackClassName?: string }) {
  const [error, setError] = useState(false);
  
  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center ${fallbackClassName}`}>
        <div className="font-black text-primary leading-none">M</div>
      </div>
    );
  }
  
  return (
    <img 
      src="./logo.png" 
      alt="Millan Construcciones LLC Logo" 
      className={`object-contain ${className}`}
      onError={() => setError(true)}
      loading="eager"
      /* @ts-ignore fetchPriority is a valid attribute but not fully typed in some React versions */
      fetchPriority="high"
      decoding="sync"
    />
  );
}

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Optimización de scroll más rápida y ligera
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => setLang(lang === 'en' ? 'es' : 'en');
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1000);
  };

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#whyus', label: t.nav.whyUs },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-primary selection:text-black">
      {/* Navbar: Sin blur para máximo rendimiento */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-[#0a0a0a] shadow-md shadow-primary/5 py-3 border-b border-white/5' : 'bg-gradient-to-b from-black/90 to-transparent py-5 border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <a href="#home" className="flex items-center gap-2 text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1 -ml-1">
                <LogoImg className="w-10 h-10 md:w-12 md:h-12" fallbackClassName="w-10 h-10 md:w-12 md:h-12 text-3xl bg-neutral-900 rounded-lg border border-white/10" />
                <div className="flex flex-col justify-center">
                  <span className="text-primary leading-none overflow-hidden">MILLAN</span>
                  <span className="font-light tracking-widest text-[0.55rem] sm:text-[0.6rem] hidden sm:block mt-0.5 text-white/80">CONSTRUCCIONES LLC</span>
                </div>
              </a>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-sm font-medium hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-sm px-1">
                  {link.label}
                </a>
              ))}
              <button 
                onClick={toggleLang} 
                className="flex items-center gap-2 bg-white/10 hover:bg-primary border border-white/10 hover:border-primary hover:text-black transition-colors px-4 py-2 rounded-full text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Toggle language"
              >
                <Globe size={16} />
                {lang === 'en' ? 'ESPAÑOL' : 'ENGLISH'}
              </button>
            </nav>

            {/* Mobile Controls */}
            <div className="flex items-center gap-3 md:hidden">
              <button 
                onClick={toggleLang} 
                className="flex items-center justify-center bg-white/5 hover:bg-primary border border-white/10 hover:text-black transition-colors w-9 h-9 rounded-full text-xs font-bold text-white uppercase focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Toggle language"
              >
                {lang === 'en' ? 'ES' : 'EN'}
              </button>
              {/* Mobile Menu Toggle */}
              <button 
                className="text-white hover:text-primary transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-primary rounded-md" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-neutral-950 border-t border-white/10 overflow-hidden"
            >
              <div className="flex flex-col px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <a 
                    key={link.href} 
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="text-base font-medium text-white/80 hover:text-primary hover:bg-white/5 px-4 py-3 rounded-lg transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-neutral-950">
          <div className="relative z-10 text-center max-w-5xl mx-auto px-4 flex flex-col items-center mt-10 md:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-32 h-32 md:w-48 md:h-48 rounded-2xl bg-[#0a0a0a] border border-white/10 flex flex-col items-center justify-center mb-8 shadow-xl relative overflow-hidden p-4"
            >
              <LogoImg className="w-full h-full drop-shadow-lg" fallbackClassName="text-4xl md:text-[5rem]" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none"></div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
            >
              <span className="block">{lang === 'en' ? 'Professional' : 'Servicios Profesionales de'}</span>
              <span className="text-secondary text-primary mt-2 block">{lang === 'en' ? 'Construction & Remodeling' : 'Construcción y Remodelación'}</span>
              <span className="block">{lang === 'en' ? 'Services' : ''}</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-base md:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto font-medium"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <a href="#contact" className="inline-block bg-primary hover:bg-primary-hover text-black font-bold text-lg px-8 py-4 rounded-xl transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-white">
                {t.hero.cta}
              </a>
            </motion.div>
          </div>
        </section>

        {/* ABOUT SECTION (Reducidas animaciones complejas de scroll para máximo rendimiento) */}
        <section id="about" className="py-24 bg-[#0a0a0a] border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary uppercase tracking-wider text-xs font-bold mb-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  {t.about.title}
                </div>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                  <span className="text-primary">Millan</span> Construcciones LLC
                </h2>
                <div className="w-16 h-1 bg-primary rounded-full"></div>
                <p className="text-neutral-300 text-lg leading-relaxed">
                  {t.about.text}
                </p>
                <ul className="space-y-4 pt-4">
                  {t.whyChooseUs.items.slice(0,3).map((item, i) => {
                     const IconComponent = whyIcons[item.icon] || Star;
                     return (
                        <li key={i} className="flex items-center gap-4 text-neutral-200 bg-neutral-900/50 p-4 rounded-xl border border-white/5">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <IconComponent size={20} />
                          </div>
                          <span className="font-semibold">{item.title}</span>
                        </li>
                     );
                  })}
                </ul>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4 }}
                className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden border border-white/10 group bg-neutral-900 transform-gpu"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <img 
                    src="./PlaceHolder.png" 
                    alt="About Millan Construcciones" 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-24 bg-black border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 uppercase tracking-wider text-xs font-bold mb-4">
                <Ruler size={14} className="text-primary"/>
                {t.services.title}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold">
                {t.hero.title.includes('Services') ? 'Our' : 'Nuestros'} <span className="text-primary">{lang === 'en' ? 'Expertise' : 'Especialidades'}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {t.services.items.map((srv, idx) => {
                const IconComponent = serviceIcons[srv.icon] || Ruler;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.3, delay: (idx % 4) * 0.05 }}
                    className="group bg-[#0a0a0a] border border-white/5 hover:border-primary/40 rounded-2xl p-5 md:p-6 transition-all duration-200 hover:bg-neutral-900 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 relative overflow-hidden flex flex-col transform-gpu"
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-black rounded-xl border border-white/10 flex items-center justify-center mb-4 md:mb-5 group-hover:bg-primary group-hover:border-primary transition-colors text-primary group-hover:text-black">
                      <IconComponent size={24} className="md:w-7 md:h-7" />
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-white group-hover:text-primary transition-colors pr-4 mt-auto">
                      {srv.name}
                    </h3>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* GALLERY SECTION */}
        <section id="gallery" className="py-24 bg-[#0a0a0a] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">{t.gallery.title}</h2>
              <p className="text-neutral-400 max-w-2xl mx-auto px-4">Explore some of our recent construction and remodeling projects.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 auto-rows-[200px] sm:auto-rows-[250px] md:auto-rows-[300px]">
              {[1,2,3,4,5,6].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.3, delay: (idx % 3) * 0.05 }}
                  className={`group relative rounded-xl md:rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 cursor-pointer flex items-center justify-center transform-gpu ${idx === 0 || idx === 3 ? 'md:col-span-2' : ''}`}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <img 
                      src={`./Proyecto ${item}.png`} 
                      alt={`Project ${item}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 md:w-14 md:h-14 border-2 border-primary rounded-full flex items-center justify-center text-primary transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-black/50 shadow-md">
                      <Star size={20} className="md:w-6 md:h-6" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section id="whyus" className="py-24 bg-black border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">{t.whyChooseUs.title}</h2>
              <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {t.whyChooseUs.items.map((item, idx) => {
                const IconComponent = whyIcons[item.icon] || Star;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.3, delay: (idx % 3) * 0.05 }}
                    className="flex flex-col items-center text-center p-6 md:p-8 rounded-2xl md:rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-primary/30 transition-colors hover:bg-neutral-900 group"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-black border border-primary/20 flex items-center justify-center text-primary mb-4 md:mb-6 group-hover:scale-110 transition-transform transform-gpu">
                      <IconComponent size={28} className="md:w-8 md:h-8" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4 }}
                className="space-y-8 md:space-y-10"
              >
                <div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.contact.title}</h2>
                  <p className="text-neutral-400 text-lg">Ready to start your project? Contact us today for a free estimate.</p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-primary/20 text-primary">{t.contact.info}</h3>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-black border border-white/10 flex items-center justify-center text-primary shrink-0">
                      <MapPin size={24} className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="mt-1">
                      <h4 className="text-white font-medium text-base md:text-lg">Location</h4>
                      <p className="text-neutral-400">{t.contact.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-black border border-white/10 flex items-center justify-center text-primary shrink-0">
                      <Phone size={24} className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="mt-1">
                      <h4 className="text-white font-medium text-base md:text-lg">Phone</h4>
                      <a href="tel:+1234567890" className="text-neutral-400 hover:text-primary transition-colors text-base md:text-lg">+1 (234) 567-890</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-black border border-white/10 flex items-center justify-center text-primary shrink-0">
                      <Mail size={24} className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="mt-1">
                      <h4 className="text-white font-medium text-base md:text-lg">Email</h4>
                      <a href="mailto:info@millanconstrucciones.com" className="text-neutral-400 hover:text-primary transition-colors flex-wrap break-all">info@millanconstrucciones.com</a>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4 }}
              >
                <form 
                  className="bg-black p-6 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 shadow-lg relative overflow-hidden" 
                  onSubmit={handleFormSubmit}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-orange-400 to-primary"></div>
                  
                  <h3 className="text-2xl font-bold mb-6 md:mb-8">Send us a message</h3>
                  
                  <div className="space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-2">
                         <label className="text-sm text-neutral-400 font-medium">{t.contact.name}</label>
                         <input required type="text" className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm text-neutral-400 font-medium">{t.contact.phone}</label>
                         <input required type="tel" className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="+1 (555) 000-0000" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-sm text-neutral-400 font-medium">{t.contact.email}</label>
                       <input required type="email" className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="john@example.com" />
                    </div>

                    <div className="space-y-2">
                       <label className="text-sm text-neutral-400 font-medium">{t.contact.message}</label>
                       <textarea required rows={4} className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none" placeholder="Tell us about your project..."></textarea>
                    </div>

                    <button 
                      type="submit"
                      disabled={formStatus !== 'idle'}
                      className="w-full bg-primary hover:bg-primary-hover disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed text-black font-bold text-base md:text-lg px-8 py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      {formStatus === 'idle' ? (
                        <>
                          {t.contact.send}
                          <MessageCircle size={20} />
                        </>
                      ) : formStatus === 'submitting' ? (
                        <span className="flex items-center gap-2">
                          <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 text-green-500">
                          <ShieldCheck size={20} />
                          Sent Successfully!
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-black py-10 md:py-12 border-t border-white/10 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-neutral-500">
          <div className="text-xl md:text-2xl font-bold tracking-tighter mb-4 flex items-center justify-center gap-2">
            <span className="text-primary">MILLAN</span> <span className="text-white">CONSTRUCCIONES LLC</span>
          </div>
          <p className="mb-4 text-sm md:text-base">&copy; {new Date().getFullYear()} Millan Construcciones LLC. {t.footer.rights}</p>
          <div className="flex justify-center gap-6 mt-6 opacity-70">
            <a href="#" className="hover:text-primary transition-colors text-sm md:text-base">Facebook</a>
            <a href="#" className="hover:text-primary transition-colors text-sm md:text-base">Instagram</a>
            <a href="#" className="hover:text-primary transition-colors text-sm md:text-base">HomeAdvisor</a>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a 
        href="https://wa.me/1234567890" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className="fixed bottom-6 right-6 w-12 h-12 md:w-14 md:h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 z-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 md:w-8 md:h-8">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>

      {/* BACK TO TOP */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-24 right-6 w-10 h-10 md:w-12 md:h-12 bg-neutral-800 text-white border border-white/10 rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-black hover:border-primary transition-colors z-40 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <ChevronUp size={24} className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
