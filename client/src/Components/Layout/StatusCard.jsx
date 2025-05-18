import React from 'react';

const StatusCard = ({ status, qrCode, loading }) => {
  const getStatusColor = () => {
    if (loading) return 'bg-gray-200';
    if (status === 'connected') return 'bg-green-500';
    if (status === 'disconnected') return 'bg-red-500';
    return 'bg-yellow-500';
  };

  const getStatusText = () => {
    if (loading) return 'Loading...';
    if (status === 'connected') return 'Connected to WhatsApp';
    if (status === 'disconnected') return 'Disconnected - Scan QR Code';
    return 'Connecting...';
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-4">
        <div className={`w-4 h-4 rounded-full ${getStatusColor()}`}></div>
        <span className="font-medium">{getStatusText()}</span>
      </div>
      
      {qrCode && status === 'disconnected' && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Scan this QR code with WhatsApp:</p>
          <img 
            src={`data:image/png;base64,${qrCode}`} 
            alt="WhatsApp QR Code" 
            className="w-48 h-48 mx-auto"
          />
        </div>
      )}
    </div>
  );
};

export default StatusCard;