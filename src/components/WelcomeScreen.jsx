import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { SHOP_DATA } from '../constants/shopData';

const { FiClock, FiTool, FiCalendar, FiPhone, FiMail, FiMapPin } = FiIcons;

function WelcomeScreen({ onStartBooking }) {
  return (
    <div className="min-h-screen flex flex-col justify-between px-4 py-8 bg-white">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto w-full"
      >
        {/* Logo sin círculo */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="mx-auto mb-4 max-w-xs">
            <img
              src="/assets/logo-lira-motors.png"
              alt="Logo Taller Lira Motors"
              className="w-full h-auto object-contain"
              onError={(e) => {
                e.currentTarget.outerHTML = '<span class="text-gray-900 text-3xl font-bold">Lira Motors</span>';
              }}
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">{SHOP_DATA.name}</h1>
          <div className="h-1 w-24 bg-primary-500 mx-auto rounded-full mb-4"></div>
          <p className="text-xl text-gray-700">
            Reserva tu cita en menos de un minuto
          </p>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row gap-8 max-w-6xl mx-auto w-full my-8">
        {/* Left Side - Features */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:w-1/2 space-y-8"
        >
          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <SafeIcon icon={FiClock} className="text-primary-500 text-2xl" />
              </div>
              <p className="text-sm font-medium text-gray-800">Rápido</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <SafeIcon icon={FiCalendar} className="text-primary-500 text-2xl" />
              </div>
              <p className="text-sm font-medium text-gray-800">Fácil</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <SafeIcon icon={FiTool} className="text-primary-500 text-2xl" />
              </div>
              <p className="text-sm font-medium text-gray-800">Profesional</p>
            </div>
          </div>
          
          {/* Info Cards */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center mb-2">
                <SafeIcon icon={FiClock} className="text-primary-500 mr-2" />
                <h3 className="font-semibold">Horario</h3>
              </div>
              <p className="text-sm text-gray-600">
                Lunes a Viernes: 09:00–14:00 / 16:00–20:00
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center mb-2">
                <SafeIcon icon={FiMapPin} className="text-primary-500 mr-2" />
                <h3 className="font-semibold">Dirección</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {SHOP_DATA.address}
              </p>
              <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
                <iframe 
                  src={SHOP_DATA.googleMapsUrl}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Taller Lira Motors"
                ></iframe>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center mb-2">
                <SafeIcon icon={FiPhone} className="text-primary-500 mr-2" />
                <h3 className="font-semibold">Contacto</h3>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <a href={`tel:${SHOP_DATA.phone}`} className="hover:text-primary-500">
                    Teléfono: {SHOP_DATA.phone}
                  </a>
                </p>
                <p className="text-sm text-gray-600">
                  <a href={`tel:${SHOP_DATA.mobile}`} className="hover:text-primary-500">
                    Móvil: {SHOP_DATA.mobile}
                  </a>
                </p>
                <p className="text-sm text-gray-600">
                  <a href={`mailto:${SHOP_DATA.email}`} className="hover:text-primary-500">
                    Email: {SHOP_DATA.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Right Side - CTA */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5, delay: 0.6 }}
          className="md:w-1/2 flex flex-col justify-center"
        >
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ¿Necesitas una cita en nuestro taller?
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Reserva online de forma fácil y rápida. Selecciona el servicio que necesitas,
              elige fecha y hora, y te contactaremos para confirmar tu cita.
            </p>
            
            <div className="space-y-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onStartBooking}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-200 text-lg"
                aria-label="Reservar cita"
              >
                Reservar cita
              </motion.button>
              
              <a 
                href={SHOP_DATA.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center bg-white hover:bg-gray-50 text-primary-500 border border-primary-500 font-semibold py-3 px-6 rounded-xl transition-all duration-200"
              >
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-center text-gray-500 text-sm mt-8"
      >
        <p>© {new Date().getFullYear()} Taller Lira Motors. Todos los derechos reservados.</p>
      </motion.div>
    </div>
  );
}

export default WelcomeScreen;
