import React, { useState, useEffect } from 'react';
import { useSearchParams  } from 'react-router-dom'; // Import useLocation
import StatusCard from '../Components/Layout/StatusCard';
import SendMessageForm from '../Components/Layout/SendMassageForm'; // Perhatikan penulisan nama file, saya asumsikan ini yang benar
import { checkWhatsAppStatus } from '../axiosClient';

const Massage = () => {
  const [status, setStatus] = useState(null);
  const [qrCode, setQrCode] = useState(null); // qrCode tidak digunakan, tapi tidak masalah
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const initialPhoneNumber = searchParams.get("phone") || '';

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await checkWhatsAppStatus();
        setStatus(response.data.status);
        setQrCode(response.data.qr_code || null);
      } catch (error) {
        console.error('Error fetching status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, []); 

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800"></h1>
      
      <StatusCard 
        status={status} 
        loading={loading} 
      />
      
      {/* Teruskan initialPhoneNumber sebagai prop ke SendMessageForm */}
      <SendMessageForm initialPhoneNumber={initialPhoneNumber} />
    </div>
  );
};

export default Massage;