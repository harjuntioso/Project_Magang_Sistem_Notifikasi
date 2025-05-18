import React, { useState, useEffect } from 'react';
import StatusCard from '../Components/Layout/StatusCard';
import SendMessageForm from '../Components/Layout/SendMassageForm';
import { checkWhatsAppStatus } from '../axiosClient';

const Dashboard = () => {
  const [status, setStatus] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
      
      <StatusCard 
        status={status} 
        qrCode={qrCode} 
        loading={loading} 
      />
      
      <SendMessageForm />
    </div>
  );
};

export default Dashboard;