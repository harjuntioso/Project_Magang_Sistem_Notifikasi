import React, { useState, useEffect } from 'react';
import {
  FaShieldAlt,      // Ikon utama untuk keamanan
  FaChartLine,      // Grafik/Tren
  FaBell,           // Notifikasi/Ancaman
  FaFilter,         // Filter
  FaSearch,         // Cari
  FaExclamationTriangle, // Peringatan
  FaCheckCircle,    // Status Normal
  FaBug,            // Ancaman
  FaServer,         // Perangkat Jaringan
  FaCalendarAlt
} from 'react-icons/fa';

const NetworkSecurityMonitoringPage = () => {
  const [securityStatus, setSecurityStatus] = useState({
    threatsDetected: 5,
    criticalAlerts: 1,
    lastScan: '2025-06-11 08:00 WIB',
    networkStatus: 'Normal',
  });

  const [recentAlerts, setRecentAlerts] = useState([
    { id: 1, type: 'Critical', source: 'Firewall', description: 'Upaya akses tidak sah dari IP asing (192.168.1.100)', timestamp: '2025-06-11 09:15 WIB' },
    { id: 2, type: 'Warning', source: 'Antivirus Server', description: 'Malware terdeteksi di workstation KRY005', timestamp: '2025-06-11 09:00 WIB' },
    { id: 3, type: 'Info', source: 'Login Log', description: 'Login gagal berulang dari KRY010', timestamp: '2025-06-10 17:30 WIB' },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All'); // Critical, Warning, Info

  const filteredAlerts = recentAlerts.filter(alert =>
    (filterType === 'All' || alert.type === filterType) &&
    (alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
     alert.source.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getAlertTypeColor = (type) => {
    switch (type) {
      case 'Critical': return 'text-red-600';
      case 'Warning': return 'text-orange-500';
      case 'Info': return 'text-blue-500';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-red-700 mb-8 flex items-center gap-3">
        <FaShieldAlt className="w-8 h-8 text-red-500" />
        Pemantauan Keamanan Jaringan
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Pantau status keamanan jaringan dan deteksi ancaman secara *real-time* untuk melindungi aset perusahaan.
      </p>

      {/* Stat Cards Keamanan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="rounded-xl shadow-md p-5 flex flex-col items-center justify-center text-center border-t-4 border-green-500 bg-green-100">
          <div className="mb-2"><FaCheckCircle className="w-6 h-6 text-green-500" /></div>
          <h2 className="text-base font-semibold text-green-700">Status Jaringan</h2>
          <p className="text-3xl font-bold mt-2 text-green-500">{securityStatus.networkStatus}</p>
        </div>
        <div className="rounded-xl shadow-md p-5 flex flex-col items-center justify-center text-center border-t-4 border-red-500 bg-red-100">
          <div className="mb-2"><FaBug className="w-6 h-6 text-red-500" /></div>
          <h2 className="text-base font-semibold text-red-700">Ancaman Terdeteksi</h2>
          <p className="text-3xl font-bold mt-2 text-red-500">{securityStatus.threatsDetected}</p>
        </div>
        <div className="rounded-xl shadow-md p-5 flex flex-col items-center justify-center text-center border-t-4 border-orange-500 bg-orange-100">
          <div className="mb-2"><FaExclamationTriangle className="w-6 h-6 text-orange-500" /></div>
          <h2 className="text-base font-semibold text-orange-700">Peringatan Kritis</h2>
          <p className="text-3xl font-bold mt-2 text-orange-500">{securityStatus.criticalAlerts}</p>
        </div>
        <div className="rounded-xl shadow-md p-5 flex flex-col items-center justify-center text-center border-t-4 border-blue-500 bg-blue-100">
          <div className="mb-2"><FaCalendarAlt className="w-6 h-6 text-blue-500" /></div>
          <h2 className="text-base font-semibold text-blue-700">Scan Terakhir</h2>
          <p className="text-xl font-bold mt-2 text-blue-500">{securityStatus.lastScan.split(' ')[0]}</p>
          <p className="text-xs text-blue-500">{securityStatus.lastScan.split(' ')[1]} {securityStatus.lastScan.split(' ')[2]}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Card: Peringatan & Log Terkini */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
          <h2 className="text-xl font-semibold mb-4 text-red-700 flex items-center gap-2">
            <FaBell className="w-5 h-5 text-red-500" />
            Peringatan & Log Terkini
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end mb-4">
            <div>
              <label htmlFor="search-alert" className="block text-gray-700 font-medium mb-1">Cari Peringatan</label>
              <input
                type="text"
                id="search-alert"
                placeholder="Deskripsi, Sumber..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="filter-alert-type" className="block text-gray-700 font-medium mb-1">Jenis Peringatan</label>
              <select
                id="filter-alert-type"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="All">Semua Jenis</option>
                <option value="Critical">Kritis</option>
                <option value="Warning">Peringatan</option>
                <option value="Info">Info</option>
              </select>
            </div>
          </div>
          <ul className="space-y-3 text-gray-700">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map(alert => (
                <li key={alert.id} className="pb-2 border-b border-gray-100 last:border-b-0">
                  <p className={`font-semibold ${getAlertTypeColor(alert.type)}`}>[{alert.type}] {alert.description}</p>
                  <p className="text-gray-500 text-xs mt-1">Sumber: {alert.source} | Waktu: {alert.timestamp}</p>
                </li>
              ))
            ) : (
              <p className="text-gray-500">Tidak ada peringatan terkini yang ditemukan.</p>
            )}
          </ul>
        </section>

        {/* Card: Statistik Keamanan & Tren (Placeholder Grafik) */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <h2 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2">
            <FaChartLine className="w-5 h-5 text-purple-500" />
            Statistik Keamanan & Tren
          </h2>
          <div className="text-gray-500 text-sm">
            <p>*Area ini akan menampilkan grafik atau bagan interaktif untuk tren ancaman, kerentanan, atau aktivitas mencurigakan dari waktu ke waktu.</p>
            <div className="bg-gray-100 h-40 flex items-center justify-center text-gray-400 rounded-lg mt-3">
              [Grafik Tren Keamanan]
            </div>
            <div className="text-right mt-4">
              <a href="/management/it/keamanan/analisis" className="text-sm text-purple-500 hover:underline">
                Lihat Analisis Lengkap &rarr;
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NetworkSecurityMonitoringPage;