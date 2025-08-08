import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiClock, FiTool, FiCalendar } = FiIcons;

function WelcomeScreen({ onStartBooking }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto bg-primary-600 rounded-full flex items-center justify-center mb-4">
            <SafeIcon icon={FiTool} className="text-white text-3xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Simbauto</h1>
          <div className="h-1 w-16 bg-primary-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Bienvenido a Simbauto
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Reserva tu cita en menos de un minuto
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <SafeIcon icon={FiClock} className="text-primary-600 text-xl" />
            </div>
            <p className="text-sm text-gray-600">Rápido</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <SafeIcon icon={FiCalendar} className="text-primary-600 text-xl" />
            </div>
            <p className="text-sm text-gray-600">Fácil</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <SafeIcon icon={FiTool} className="text-primary-600 text-xl" />
            </div>
            <p className="text-sm text-gray-600">Profesional</p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStartBooking}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-200 text-lg"
        >
          Reservar cita
        </motion.button>
      </motion.div>
    </div>
  );
}

export default WelcomeScreen;