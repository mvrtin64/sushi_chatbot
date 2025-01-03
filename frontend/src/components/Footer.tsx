import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Contacto</h3>
            <div className="space-y-2">
              <p className="flex items-center">
                <span className="mr-2">📧</span>
                <a href="mailto:contacto@sushiBusiness.com" className="hover:text-red-400 transition-colors">
                  contacto@sushiBusiness.com
                </a>
              </p>
              <p className="flex items-center">
                <span className="mr-2">📱</span>
                <a href="tel:+5492234550304" className="hover:text-red-400 transition-colors">
                  +54 9 223 455-0304
                </a>
              </p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400">© 2024 Sabores del Oriente</p>
            <p className="text-sm text-gray-400">Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 