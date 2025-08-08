import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheckCircle, FiHome, FiPhone, FiMail } = FiIcons;

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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            ¡Solicitud enviada!
          </h1>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <p className="text-gray-600 leading-relaxed">
              Gracias por tu solicitud. El equipo de <span className="font-semibold text-primary-600">Simbauto</span> revisará 
              la disponibilidad y se pondrá en contacto contigo para confirmar tu cita.
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
                <span className="text-sm">123 456 789</span>
              </div>
              <div className="flex items-center text-primary-700">
                <SafeIcon icon={FiMail} className="mr-2 text-sm" />
                <span className="text-sm">info@simbauto.com</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back to Home Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBackToWelcome}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center"
        >
          <SafeIcon icon={FiHome} className="mr-2" />
          Volver al inicio
        </motion.button>
      </motion.div>
    </div>
  );
}

export default ConfirmationScreen;