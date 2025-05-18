import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Alert = ({ type, message, onClose }) => {
  const getAlertClass = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-400 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-400 text-red-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-400 text-yellow-700';
      default:
        return 'bg-blue-100 border-blue-400 text-blue-700';
    }
  };

  return (
    <div className={`${getAlertClass()} border px-4 py-3 rounded relative mb-4`}>
      <span className="block sm:inline">{message}</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <XMarkIcon 
          className="h-5 w-5 cursor-pointer" 
          onClick={onClose}
        />
      </span>
    </div>
  );
};

export default Alert;