import { OPENING_HOURS } from '../constants/shopData';

/**
 * Gets the day of the week name from a date string
 * @param {string} dateStr - Date string in format YYYY-MM-DD
 * @returns {string} - Day of the week in lowercase
 */
export function getDayOfWeek(dateStr) {
  const date = new Date(dateStr);
  return ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][date.getDay()];
}

/**
 * Checks if a given time is within the business hours for the specified date
 * @param {string} dateStr - Date string in format YYYY-MM-DD
 * @param {string} timeStr - Time string in format HH:MM
 * @returns {boolean} - True if the time is within business hours
 */
export function isWithinBusinessHours(dateStr, timeStr) {
  const dayOfWeek = getDayOfWeek(dateStr);
  const dayHours = OPENING_HOURS[dayOfWeek];
  
  if (!dayHours || dayHours.length === 0) {
    return false; // Closed on this day
  }
  
  // Convert time to minutes for easier comparison
  const [hours, minutes] = timeStr.split(':').map(Number);
  const timeInMinutes = hours * 60 + minutes;
  
  // Check if time falls within any of the open periods for the day
  return dayHours.some(([start, end]) => {
    const [startHours, startMinutes] = start.split(':').map(Number);
    const [endHours, endMinutes] = end.split(':').map(Number);
    
    const startInMinutes = startHours * 60 + startMinutes;
    const endInMinutes = endHours * 60 + endMinutes;
    
    return timeInMinutes >= startInMinutes && timeInMinutes <= endInMinutes;
  });
}

/**
 * Generates available time slots for a given date
 * @param {string} dateStr - Date string in format YYYY-MM-DD
 * @returns {Array<string>} - Array of available time slots in format HH:MM
 */
export function generateAvailableTimeSlots(dateStr) {
  const dayOfWeek = getDayOfWeek(dateStr);
  const dayHours = OPENING_HOURS[dayOfWeek];
  
  if (!dayHours || dayHours.length === 0) {
    return []; // Closed on this day
  }
  
  const slots = [];
  
  dayHours.forEach(([start, end]) => {
    const [startHours, startMinutes] = start.split(':').map(Number);
    const [endHours, endMinutes] = end.split(':').map(Number);
    
    let currentHour = startHours;
    let currentMinute = startMinutes;
    
    // Generate slots in 30-minute increments
    while (
      currentHour < endHours || 
      (currentHour === endHours && currentMinute <= endMinutes - 30)
    ) {
      const formattedHour = String(currentHour).padStart(2, '0');
      const formattedMinute = String(currentMinute).padStart(2, '0');
      slots.push(`${formattedHour}:${formattedMinute}`);
      
      // Increment by 30 minutes
      currentMinute += 30;
      if (currentMinute >= 60) {
        currentHour += 1;
        currentMinute = 0;
      }
    }
  });
  
  return slots;
}

/**
 * Gets the next 8 available time slots starting from tomorrow
 * @returns {Array<{date: string, slots: Array<string>}>} - Array of date and available slot objects
 */
export function getNextAvailableSlots() {
  const result = [];
  let currentDate = new Date();
  let daysChecked = 0;
  
  // Start from tomorrow
  currentDate.setDate(currentDate.getDate() + 1);
  
  while (result.length < 8 && daysChecked < 14) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const dayOfWeek = getDayOfWeek(dateStr);
    const slots = generateAvailableTimeSlots(dateStr);
    
    if (slots.length > 0) {
      result.push({
        date: dateStr,
        dayOfWeek,
        slots
      });
    }
    
    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
    daysChecked++;
  }
  
  return result;
}

/**
 * Format a date string to a more readable format
 * @param {string} dateStr - Date string in format YYYY-MM-DD
 * @returns {string} - Formatted date string (e.g., "Lunes, 15 de julio")
 */
export function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  return date.toLocaleDateString('es-ES', options);
}

/**
 * Get tomorrow's date in YYYY-MM-DD format
 * @returns {string} - Tomorrow's date in YYYY-MM-DD format
 */
export function getTomorrowDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}