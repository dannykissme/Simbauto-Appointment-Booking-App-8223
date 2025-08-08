import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import BookingForm from './components/BookingForm';
import ConfirmationScreen from './components/ConfirmationScreen';

function App() {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [bookingData, setBookingData] = useState(null);

  const handleStartBooking = () => {
    setCurrentStep('form');
  };

  const handleFormSubmit = (data) => {
    setBookingData(data);
    setCurrentStep('confirmation');
  };

  const handleBackToWelcome = () => {
    setCurrentStep('welcome');
    setBookingData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence mode="wait">
        {currentStep === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <WelcomeScreen onStartBooking={handleStartBooking} />
          </motion.div>
        )}

        {currentStep === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <BookingForm onSubmit={handleFormSubmit} onBack={handleBackToWelcome} />
          </motion.div>
        )}

        {currentStep === 'confirmation' && (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ConfirmationScreen onBackToWelcome={handleBackToWelcome} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;