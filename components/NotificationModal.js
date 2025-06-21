

"use client"; 

import { useEffect, useState } from 'react';

export default function NotificationModal({ message, type, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  
  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose(); 
      }, 3000); 
      return () => clearTimeout(timer); 
    } else {
      setIsVisible(false);
    }
  }, [message, onClose]); 

  if (!isVisible) return null;
 
  const bgColor = type === 'error' ? 'bg-red-500 bg-opacity-70' : type === 'success' ? 'bg-green-500 bg-opacity-70' : 'bg-blue-500 bg-opacity-70';
  const textColor = type === 'error' ? 'text-red-800' : type === 'success' ? 'text-green-800' : 'text-blue-800';
  const darkTextColor = type === 'error' ? 'text-red-100' : type === 'success' ? 'text-green-100' : 'text-blue-100'; 

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 p-4 ${bgColor}`}>
      <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl animate-fade-in-down w-full max-w-sm`}>
        <p className={`text-lg font-semibold text-gray-900 dark:text-white ${textColor} dark:${darkTextColor}`}>{message}</p>
        <button
          onClick={() => { setIsVisible(false); if (onClose) onClose(); }}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 float-right"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
