import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = ({ availableDates, onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Convert string dates to Date objects if they aren't already
  const availableDateObjects = availableDates.map(date => 
    date instanceof Date ? date : new Date(date)
  );

  // Function to check if a date is in the available dates array
  const isDateAvailable = (date) => {
    return availableDateObjects.some(availableDate => 
      availableDate.toDateString() === date.toDateString()
    );
  };

  // Handle date selection
  const handleDateChange = (date) => {
    if (isDateAvailable(date)) {
      setSelectedDate(date);
      onDateSelect(date);
    }
  };

  // Custom tile content to highlight available dates
  const tileContent = ({ date, view }) => {
    if (view === 'month' && isDateAvailable(date)) {
      return <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mt-1"></div>;
    }
    return null;
  };

  // Custom class name for styling different types of dates
  const tileClassName = ({ date, view }) => {
    if (view !== 'month') return '';
    
    let classes = '';
    
    // Style for available dates
    if (isDateAvailable(date)) {
      classes += 'text-black font-medium cursor-pointer hover:bg-blue-100 ';
    } else {
      classes += 'text-gray-300 cursor-not-allowed ';
    }
    
    // Style for selected date
    if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
      classes += 'bg-blue-500 text-white ';
    }
    
    return classes;
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileContent={tileContent}
        tileClassName={tileClassName}
        tileDisabled={({ date }) => !isDateAvailable(date)}
      />
    </div>
  );
};

export default CalendarComponent;