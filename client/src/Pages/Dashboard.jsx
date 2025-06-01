import { useState, useEffect } from 'react';
import StatusCard from '../Components/Layout/StatusCard';
import { checkWhatsAppStatus } from '../axiosClient';
import {
  FaUsers,
  FaUserFriends,
  FaChartBar,
  FaHistory,
  FaBell,
  FaEnvelopeOpenText,
  FaCogs,
} from 'react-icons/fa';

const stats = [
  {
    title: 'Users Online',
    value: 5,
    icon: <FaUserFriends className="w-6 h-6 text-primary" />,
    border: 'border-primary',
    text: 'text-primary-dark',
    valueColor: 'text-primary',
    bg: 'bg-primary-light',
  },
  {
    title: 'Total Users',
    value: 10,
    icon: <FaUsers className="w-6 h-6 text-secondary" />,
    border: 'border-secondary',
    text: 'text-secondary-dark',
    valueColor: 'text-secondary',
    bg: 'bg-secondary-light',
  },
  {
    title: 'Notifications',
    value: 2,
    icon: <FaBell className="w-6 h-6 text-accent" />,
    border: 'border-accent',
    text: 'text-accent-dark',
    valueColor: 'text-accent',
    bg: 'bg-accent-light',
  },
  {
    title: 'Messages',
    value: 12,
    icon: <FaEnvelopeOpenText className="w-6 h-6 text-muted" />,
    border: 'border-muted',
    text: 'text-muted-dark',
    valueColor: 'text-muted',
    bg: 'bg-muted-light',
  },
];

const recentActivities = [
  { time: '2 min ago', activity: 'User John sent a message.' },
  { time: '10 min ago', activity: 'System status checked.' },
  { time: '30 min ago', activity: 'User Anna joined.' },
];

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
    <div className="p-8 bg-neutral-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`rounded-xl shadow-md p-5 flex flex-col items-center border-t-4 ${stat.border} ${stat.bg}`}
          >
            <h2 className={`text-base font-semibold mb-1 flex items-center gap-2 ${stat.text}`}>
              {stat.icon}
              {stat.title}
            </h2>
            <p className={`text-2xl font-medium mt-2 ${stat.valueColor}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2 flex flex-col gap-8">
          <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
            <h2 className="text-lg font-semibold mb-3 text-primary-dark flex items-center gap-2">
              <FaChartBar className="w-5 h-5 text-primary" />
              System Overview
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <p className="text-gray-600">
                  WhatsApp status:{' '}
                  <span className="font-mono text-primary font-semibold">
                    {status || 'Loading...'}
                  </span>
                </p>
                <p className="text-gray-600 mt-2">
                  Last checked:{' '}
                  <span className="font-mono text-gray-400">
                    {new Date().toLocaleTimeString()}
                  </span>
                </p>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <FaCogs className="w-14 h-14 text-gray-200" />
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-accent">
            <h2 className="text-lg font-semibold mb-3 text-accent-dark flex items-center gap-2">
              <FaHistory className="w-5 h-5 text-accent" />
              Recent Activity
            </h2>
            <ul className="text-gray-600 space-y-2 text-sm">
              {recentActivities.map((item, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>{item.activity}</span>
                  <span className="text-gray-400">{item.time}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
