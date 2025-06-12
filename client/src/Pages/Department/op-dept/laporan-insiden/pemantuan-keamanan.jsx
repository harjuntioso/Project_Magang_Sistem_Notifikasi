import React, { useState } from 'react';
import {
  FaShieldAlt,      // Ikon utama untuk keamanan
  FaVideo,          // CCTV
  FaWalking,        // Patroli
  FaMapMarkerAlt,   // Area
  FaBell,           // Notifikasi/Alarm
  FaFilter,         // Filter
  FaSearch,         // Cari
  FaCheckCircle,    // Status Aman
  FaExclamationTriangle, // Perlu perhatian
  FaClipboardList,  // Log
} from 'react-icons/fa';

const AreaSecurityMonitoringPage = () => {
  const [securityAreas, setSecurityAreas] = useState([
    // Data dummy area keamanan
    { id: 'AREA001', name: 'Pintu Masuk Utama', status: 'Aman', lastChecked: '2025-06-11 15:30', cctvStatus: 'Online', patrolStatus: 'Normal' },
    { id: 'AREA002', name: 'Wahana X (Area Tertentu)', status: 'Aman', lastChecked: '2025-06-11 15:00', cctvStatus: 'Online', patrolStatus: 'Normal' },
    { id: 'AREA003', name: 'Zona Food Court A', status: 'Perhatian', lastChecked: '2025-06-11 14:00', cctvStatus: 'Offline', patrolStatus: 'Normal' },
    { id: 'AREA004', name: 'Area Parkir VIP', status: 'Aman', lastChecked: '2025-06-11 15:45', cctvStatus: 'Online', patrolStatus: 'Rutin' },
    // ... tambahkan data dummy area
  ]);

  const [securityLogs, setSecurityLogs] = useState([
    // Data dummy log keamanan
    { id: 1, area: 'Pintu Masuk Utama', event: 'Sistem Alarm Diaktifkan', timestamp: '2025-06-11 15:35', status: 'Resolved' },
    { id: 2, area: 'Zona Food Court A', event: 'Kamera CCTV Offline', timestamp: '2025-06-11 14:00', status: 'Unresolved' },
    { id: 3, area: 'Wahana X', event: 'Patroli Selesai', timestamp: '2025-06-11 15:10', status: 'Info' },
    // ... tambahkan data dummy log
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterArea, setFilterArea] = useState('All');
  const [filterLogStatus, setFilterLogStatus] = useState('All');

  const filteredAreas = securityAreas.filter(area =>
    (filterArea === 'All' || area.name === filterArea) &&
    (area.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredLogs = securityLogs.filter(log =>
    (filterLogStatus === 'All' || log.status === filterLogStatus) &&
    (filterArea === 'All' || log.area === filterArea) &&
    (log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
     log.area.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getAreaStatusColor = (status) => {
    switch (status) {
      case 'Aman': return 'bg-green-200 text-green-800';
      case 'Perhatian': return 'bg-orange-200 text-orange-800';
      case 'Bahaya': return 'bg-red-200 text-red-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const getLogStatusColor = (status) => {
    switch (status) {
      case 'Resolved': return 'text-green-600';
      case 'Unresolved': return 'text-red-600';
      case 'Info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-secondary-dark mb-8 flex items-center gap-3">
        <FaShieldAlt className="w-8 h-8 text-secondary" />
        Pemantauan Keamanan Area
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Pantau status keamanan area tamsya/hiburan, termasuk status CCTV, patroli, dan *log* kejadian.
      </p>

      {/* Overview Status Area */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-secondary">
        <h2 className="text-xl font-semibold mb-4 text-secondary-dark flex items-center gap-2">
          <FaMapMarkerAlt className="w-5 h-5 text-secondary" />
          Status Keamanan Area
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {securityAreas.map(area => (
            <div key={area.id} className="rounded-lg border p-3 flex flex-col items-center justify-center text-center bg-gray-50">
              <p className="text-lg font-semibold text-gray-800 mb-1">{area.name}</p>
              <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getAreaStatusColor(area.status)}`}>
                {area.status === 'Perhatian' && <FaExclamationTriangle className="inline-block mr-1" />}
                {area.status === 'Aman' && <FaCheckCircle className="inline-block mr-1" />}
                {area.status}
              </span>
              <p className="text-gray-500 text-xs mt-2">Terakhir Cek: {area.lastChecked}</p>
              <p className="text-gray-500 text-xs flex items-center gap-1"><FaVideo className="text-sm" /> CCTV: {area.cctvStatus}</p>
              <p className="text-gray-500 text-xs flex items-center gap-1"><FaWalking className="text-sm" /> Patroli: {area.patrolStatus}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Log Aktivitas Keamanan */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaClipboardList className="w-5 h-5 text-primary" />
          Log Aktivitas Keamanan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-4">
          <div>
            <label htmlFor="search-log" className="block text-gray-700 font-medium mb-1">Cari Log</label>
            <input
              type="text"
              id="search-log"
              placeholder="Event, Area..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-area" className="block text-gray-700 font-medium mb-1">Area</label>
            <select
              id="filter-area"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              value={filterArea}
              onChange={(e) => setFilterArea(e.target.value)}
            >
              <option value="All">Semua Area</option>
              {securityAreas.map(area => <option key={area.id} value={area.name}>{area.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="filter-log-status" className="block text-gray-700 font-medium mb-1">Status Log</label>
            <select
              id="filter-log-status"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              value={filterLogStatus}
              onChange={(e) => setFilterLogStatus(e.target.value)}
            >
              <option value="All">Semua</option>
              <option value="Resolved">Diselesaikan</option>
              <option value="Unresolved">Belum Diselesaikan</option>
              <option value="Info">Info</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Waktu</th>
                <th className="py-3 px-6 text-left">Area</th>
                <th className="py-3 px-6 text-left">Peristiwa</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap text-xs text-gray-500">{log.timestamp}</td>
                    <td className="py-3 px-6 text-left">{log.area}</td>
                    <td className="py-3 px-6 text-left">{log.event}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`font-semibold ${getLogStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">Tidak ada log keamanan yang ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AreaSecurityMonitoringPage;