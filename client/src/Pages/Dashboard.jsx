import { useState, useEffect } from 'react';
import StatusCard from '../Components/Layout/StatusCard';
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
    const interval = setInterval(fetchStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8"></h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <StatusCard status={status} qrCode={qrCode} loading={loading} />
        </div>
        <div className="col-span-2 flex flex-col gap-6">
          {/* Example dashboard widgets */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">System Overview</h2>
            <p className="text-gray-600">WhatsApp status: <span className="font-mono">{status || 'Loading...'}</span></p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
            <p className="text-gray-600">No recent activity.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
