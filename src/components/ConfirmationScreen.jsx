import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { SHOP_DATA } from '../constants/shopData';

const { FiCheckCircle, FiHome, FiPhone, FiMail, FiMapPin, FiCalendar } = FiIcons;

function ConfirmationScreen({ onBackToWelcome }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md mx-auto"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
            <SafeIcon icon={FiCheckCircle} className="text-green-600 text-4xl" />
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-4">¡Solicitud enviada!</h1>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <p className="text-gray-600 leading-relaxed">
              Gracias por tu solicitud. El equipo de{' '}
              <span className="font-semibold text-primary-500">Taller Lira Motors</span> revisará la
              disponibilidad y se pondrá en contacto contigo para confirmar tu cita.
            </p>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4">¿Qué sigue?</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <span className="text-primary-600 text-sm font-bold">1</span>
              </div>
              <p className="text-gray-600 text-sm">Revisaremos tu solicitud en las próximas horas</p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <span className="text-primary-600 text-sm font-bold">2</span>
              </div>
              <p className="text-gray-600 text-sm">Te contactaremos para confirmar fecha y hora</p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <span className="text-primary-600 text-sm font-bold">3</span>
              </div>
              <p className="text-gray-600 text-sm">¡Ven al taller en la fecha acordada!</p>
            </div>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-8"
        >
          <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
            <h4 className="font-medium text-primary-800 mb-3">¿Necesitas contactarnos?</h4>
            <div className="space-y-2">
              <div className="flex items-center text-primary-700">
                <SafeIcon icon={FiPhone} className="mr-2 text-sm" />
                <a href={`tel:${SHOP_DATA.phone}`} className="text-sm hover:underline">
                  {SHOP_DATA.phone}
                </a>
              </div>
              <div className="flex items-center text-primary-700">
                <SafeIcon icon={FiPhone} className="mr-2 text-sm" />
                <a href={`tel:${SHOP_DATA.mobile}`} className="text-sm hover:underline">
                  {SHOP_DATA.mobile} (Móvil)
                </a>
              </div>
              <div className="flex items-center text-primary-700">
                <SafeIcon icon={FiMail} className="mr-2 text-sm" />
                <a href={`mailto:${SHOP_DATA.email}`} className="text-sm hover:underline">
                  {SHOP_DATA.email}
                </a>
              </div>
              <div className="flex items-center text-primary-700">
                <SafeIcon icon={FiMapPin} className="mr-2 text-sm" />
                <span className="text-sm">{SHOP_DATA.address}</span>
              </div>
              <div className="flex items-center text-primary-700">
                <SafeIcon icon={FiCalendar} className="mr-2 text-sm" />
                <span className="text-sm">L–V 09:00–14:00 / 16:00–20:00</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back to Home Button */}
        <motion.div className="space-y-3">
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBackToWelcome}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center"
          >
            <SafeIcon icon={FiHome} className="mr-2" />
            Volver al inicio
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
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ConfirmationScreen;