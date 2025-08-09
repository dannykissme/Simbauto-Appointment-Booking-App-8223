import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { SERVICE_OPTIONS, SHOP_DATA } from '../constants/shopData';
import { getTomorrowDate, generateAvailableTimeSlots, getDayOfWeek, formatDate } from '../utils/dateUtils';

const { FiArrowLeft, FiUser, FiPhone, FiMail, FiTool, FiCalendar, FiMessageSquare, FiSend, FiClock, FiAlertCircle } = FiIcons;

function BookingForm({ onSubmit, onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: '',
    comments: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  // Update available time slots when date changes
  useEffect(() => {
    if (formData.date) {
      const slots = generateAvailableTimeSlots(formData.date);
      setAvailableTimeSlots(slots);
      
      // Reset time if current selection is not available
      if (formData.time && !slots.includes(formData.time)) {
        setFormData(prev => ({ ...prev, time: '' }));
      }
    }
  }, [formData.date]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    } else if (!/^\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Introduce un teléfono válido (9 dígitos)';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Introduce un email válido';
    }
    
    if (!formData.service) {
      newErrors.service = 'Selecciona un tipo de servicio';
    }
    
    if (!formData.date) {
      newErrors.date = 'Selecciona una fecha';
    }
    
    if (!formData.time) {
      newErrors.time = 'Selecciona una hora';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar la política de privacidad';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare data for webhook
      const webhookData = {
        ...formData,
        service: SERVICE_OPTIONS.find(opt => opt.value === formData.service)?.label,
        timestamp: new Date().toISOString(),
        negocio: "Taller Lira Motors",
        origen: "Greta App"
      };
      
      // Send to webhook (Make/Zapier integration)
      // Replace with your actual webhook URL
      const webhookUrl = 'YOUR_WEBHOOK_URL_HERE';
      
      if (webhookUrl !== 'YOUR_WEBHOOK_URL_HERE') {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData),
        });
      }
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit(formData);
    } catch (error) {
      console.error('Error sending form:', error);
      // In a real app, you might want to show an error message
      // For now, we'll still proceed to confirmation
      onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTimeSlots = () => {
    if (!formData.date) {
      return (
        <p className="text-sm text-gray-500 italic">
          Selecciona una fecha para ver los horarios disponibles
        </p>
      );
    }
    
    if (availableTimeSlots.length === 0) {
      return (
        <div className="flex items-center text-amber-600">
          <SafeIcon icon={FiAlertCircle} className="mr-2" />
          <p className="text-sm">No hay horarios disponibles para esta fecha</p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-4 gap-2">
        {availableTimeSlots.map(time => (
          <button
            key={time}
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, time }))}
            className={`p-2 rounded-md text-sm font-medium transition-colors
              ${formData.time === time 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {time}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center mb-6"
        >
          <button
            onClick={onBack}
            className="p-2 mr-3 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Volver atrás"
          >
            <SafeIcon icon={FiArrowLeft} className="text-gray-600 text-xl" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Reservar cita</h1>
            <p className="text-sm text-gray-500">Taller Lira Motors</p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded-xl shadow-sm"
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              <SafeIcon icon={FiUser} className="inline mr-2" />
              Nombre y apellidos *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Tu nombre completo"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              <SafeIcon icon={FiPhone} className="inline mr-2" />
              Teléfono de contacto *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="123 456 789"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              <SafeIcon icon={FiMail} className="inline mr-2" />
              Email (opcional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="tu@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Service */}
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
              <SafeIcon icon={FiTool} className="inline mr-2" />
              Tipo de servicio *
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                errors.service ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              {SERVICE_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              <SafeIcon icon={FiCalendar} className="inline mr-2" />
              Fecha *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={getTomorrowDate()}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
            
            {formData.date && (
              <div className="mt-2 text-sm text-gray-600">
                {formatDate(formData.date)}
              </div>
            )}
          </div>

          {/* Time Slots */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <SafeIcon icon={FiClock} className="inline mr-2" />
              Hora *
            </label>
            {renderTimeSlots()}
            {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
          </div>

          {/* Comments */}
          <div>
            <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
              <SafeIcon icon={FiMessageSquare} className="inline mr-2" />
              Comentarios adicionales (opcional)
            </label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
              placeholder="Cualquier información adicional que consideres importante..."
            />
          </div>

          {/* Terms */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="acceptTerms" className={`font-medium ${errors.acceptTerms ? 'text-red-500' : 'text-gray-700'}`}>
                Acepto la política de privacidad y protección de datos *
              </label>
              <p className="text-gray-500">
                Tus datos serán tratados para gestionar tu cita y contactarte.
              </p>
              {errors.acceptTerms && (
                <p className="text-red-500 text-sm mt-1">{errors.acceptTerms}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center ${
              isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-500 hover:bg-primary-600 shadow-lg'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Enviando...
              </div>
            ) : (
              <div className="flex items-center">
                <SafeIcon icon={FiSend} className="mr-2" />
                Enviar solicitud
              </div>
            )}
          </motion.button>
        </motion.form>
        
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white p-4 rounded-xl shadow-sm"
        >
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700">¿Necesitas ayuda?</p>
              <p className="text-sm text-gray-500">Llámanos al {SHOP_DATA.phone}</p>
            </div>
            <a
              href={SHOP_DATA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <svg 
                className="w-4 h-4 mr-2" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default BookingForm;