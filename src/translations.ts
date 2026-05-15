export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      services: "Services",
      gallery: "Gallery",
      whyUs: "Why Us",
      contact: "Contact",
    },
    hero: {
      title: "Professional Construction & Remodeling Services",
      subtitle: "Building your dreams with precision, quality, and trust. Professional solutions for every project in Everett, WA.",
      cta: "Get Free Estimate",
    },
    about: {
      title: "About Us",
      text: "Millan Construcciones LLC delivers high-quality construction and remodeling services with professionalism, precision, and trust. We transform homes and spaces with durable finishes and exceptional craftsmanship.",
    },
    services: {
      title: "Our Services",
      items: [
        { name: "Interior Demolition", icon: "Hammer" },
        { name: "Drywall / Sheetrock", icon: "Square" },
        { name: "Wall & Ceiling Texture", icon: "Brush" },
        { name: "Interior / Exterior Painting", icon: "Paintbrush" },
        { name: "Flooring Installation", icon: "LayoutGrid" },
        { name: "Baseboards, Trim & Door", icon: "DoorOpen" },
        { name: "Interior / Exterior Door Installation", icon: "DoorClosed" },
        { name: "Cabinets / Backsplash", icon: "Grid3X3" },
        { name: "Bathroom Remodeling", icon: "Bath" },
        { name: "Siding Installation & Repair", icon: "Home" },
        { name: "Fence Installation", icon: "Fence" },
        { name: "Deck & Porch Construction", icon: "Layout" },
        { name: "Windows & Exterior", icon: "AppWindow" },
      ],
    },
    gallery: {
      title: "Our Work",
    },
    whyChooseUs: {
      title: "Why Choose Us",
      items: [
        { title: "Professional Quality", icon: "Star" },
        { title: "Reliable Service", icon: "ShieldCheck" },
        { title: "Experienced Team", icon: "Users" },
        { title: "Affordable Pricing", icon: "DollarSign" },
        { title: "Licensed & Insured", icon: "FileBadge" },
        { title: "Fast Project Delivery", icon: "Clock" },
      ],
    },
    contact: {
      title: "Contact Us",
      name: "Your Name",
      email: "Your Email",
      phone: "Your Phone",
      message: "Your Message",
      send: "Send Message",
      info: "Contact Information",
      address: "Everett, WA",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      about: "Nosotros",
      services: "Servicios",
      gallery: "Galería",
      whyUs: "Por qué elegirnos",
      contact: "Contacto",
    },
    hero: {
      title: "Servicios Profesionales de Construcción y Remodelación",
      subtitle: "Construyendo sus sueños con precisión, calidad y confianza. Soluciones profesionales para cada proyecto en Everett, WA.",
      cta: "Solicitar Presupuesto",
    },
    about: {
      title: "Sobre Nosotros",
      text: "Millan Construcciones LLC ofrece servicios de construcción y remodelación de alta calidad con profesionalismo, precisión y confianza. Transformamos hogares y espacios con acabados duraderos y excelente mano de obra.",
    },
    services: {
      title: "Nuestros Servicios",
      items: [
        { name: "Demolición Interior", icon: "Hammer" },
        { name: "Drywall / Sheetrock", icon: "Square" },
        { name: "Textura de Paredes y Techos", icon: "Brush" },
        { name: "Pintura Interior / Exterior", icon: "Paintbrush" },
        { name: "Instalación de Pisos", icon: "LayoutGrid" },
        { name: "Zócalos, Molduras y Puertas", icon: "DoorOpen" },
        { name: "Instalación de Puertas Int/Ext", icon: "DoorClosed" },
        { name: "Gabinetes / Backsplash", icon: "Grid3X3" },
        { name: "Remodelación de Baños", icon: "Bath" },
        { name: "Instalación y Reparación de Siding", icon: "Home" },
        { name: "Instalación de Cercas", icon: "Fence" },
        { name: "Construcción de Decks y Porches", icon: "Layout" },
        { name: "Ventanas y Exterior", icon: "AppWindow" },
      ],
    },
    gallery: {
      title: "Nuestro Trabajo",
    },
    whyChooseUs: {
      title: "Por Qué Elegirnos",
      items: [
        { title: "Calidad Profesional", icon: "Star" },
        { title: "Servicio Confiable", icon: "ShieldCheck" },
        { title: "Equipo Experimentado", icon: "Users" },
        { title: "Precios Accesibles", icon: "DollarSign" },
        { title: "Licenciados y Asegurados", icon: "FileBadge" },
        { title: "Entrega Rápida", icon: "Clock" },
      ],
    },
    contact: {
      title: "Contáctenos",
      name: "Su Nombre",
      email: "Su Correo",
      phone: "Su Teléfono",
      message: "Su Mensaje",
      send: "Enviar Mensaje",
      info: "Información de Contacto",
      address: "Everett, WA",
    },
    footer: {
      rights: "Todos los derechos reservados.",
    },
  },
};

export type Language = 'en' | 'es';
export type Translation = typeof translations.en;
