import React, { useState } from 'react';
import {
  FaLaptopCode,    // Ikon utama untuk perangkat IT
  FaSearch,        // Cari
  FaFilter,        // Filter
  FaPlusCircle,    // Tambah perangkat baru
  FaEdit,          // Edit detail perangkat
  FaTrash,         // Hapus perangkat
  FaDesktop,       // Desktop
  FaLaptop,        // Laptop
  FaTabletAlt,     // Tablet
  FaMobileAlt,     // Mobile
  FaPrint,         // Printer
  FaServer,        // Server/Jaringan
  FaInfoCircle,    // Detail
} from 'react-icons/fa';

const ItDeviceListPage = () => {
  const [devices, setDevices] = useState([
    // Data dummy perangkat IT
    { id: 'PC001', name: 'Desktop PC Lantai 1', type: 'Desktop', brand: 'Dell', model: 'OptiPlex 3080', serial: 'SN3080PC001', location: 'Lantai 1 - Ruang HRD', status: 'Available', assignedTo: null, lastMaintenance: '2025-05-01' },
    { id: 'LT005', name: 'Laptop Direktur Utama', type: 'Laptop', brand: 'HP', model: 'Spectre x360', serial: 'SNX360LT005', location: 'Kantor Direksi', status: 'In Use', assignedTo: 'Direktur Utama', lastMaintenance: '2025-04-15' },
    { id: 'PRN002', name: 'Printer Keuangan (Color)', type: 'Printer', brand: 'Epson', model: 'L3110', serial: 'SNL3110PR002', location: 'Ruang Keuangan', status: 'Available', assignedTo: null, lastMaintenance: '2025-06-05' },
    { id: 'SRV001', name: 'Server Database Utama', type: 'Server', brand: 'Dell', model: 'PowerEdge R740', serial: 'SNR740SR001', location: 'Ruang Server', status: 'In Use', assignedTo: 'Tim IT', lastMaintenance: '2025-06-01' },
    { id: 'MBL001', name: 'Smartphone Operasional', type: 'Mobile', brand: 'Samsung', model: 'Galaxy A52', serial: 'SNA52MB001', location: 'Gudang Operasional', status: 'In Use', assignedTo: 'Supervisor Operasional', lastMaintenance: '2025-02-20' },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterLocation, setFilterLocation] = useState('All');

  const filteredDevices = devices.filter(device =>
    (filterType === 'All' || device.type === filterType) &&
    (filterStatus === 'All' || device.status === filterStatus) &&
    (filterLocation === 'All' || device.location.includes(filterLocation)) &&
    (device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     device.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
     device.serial.toLowerCase().includes(searchTerm.toLowerCase()) ||
     (device.assignedTo && device.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'Desktop': return <FaDesktop className="text-blue-500" />;
      case 'Laptop': return <FaLaptop className="text-green-500" />;
      case 'Tablet': return <FaTabletAlt className="text-purple-500" />;
      case 'Mobile': return <FaMobileAlt className="text-red-500" />;
      case 'Printer': return <FaPrint className="text-gray-500" />;
      case 'Server': return <FaServer className="text-orange-500" />;
      default: return <FaLaptopCode className="text-gray-500" />;
    }
  };

  const handleEditDevice = (id) => {
    alert(`Mengedit detail perangkat ID: ${id}`);
    // Arahkan ke halaman edit perangkat atau buka modal
    // Contoh: navigate(`/management/it/aset/edit/${id}`);
  };

  const handleDeleteDevice = (id, name) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus perangkat "${name}"?`)) {
      alert(`Menghapus perangkat ID: ${id}`);
      setDevices(devices.filter(d => d.id !== id));
      // Logika untuk menghapus dari backend
    }
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-info-dark mb-8 flex items-center gap-3">
        <FaLaptopCode className="w-8 h-8 text-info" />
        Daftar Perangkat IT
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Kelola inventaris lengkap semua perangkat IT milik perusahaan, termasuk status dan lokasi.
      </p>

      {/* Filter dan Aksi Cepat */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-info">
        <h2 className="text-xl font-semibold mb-4 text-info-dark flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-info" />
          Filter & Aksi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
          <div>
            <label htmlFor="search-device" className="block text-gray-700 font-medium mb-1">Cari Perangkat</label>
            <input
              type="text"
              id="search-device"
              placeholder="Nama, Serial, Brand, User..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-info focus:border-info"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-type" className="block text-gray-700 font-medium mb-1">Jenis Perangkat</label>
            <select
              id="filter-type"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-info focus:border-info"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">Semua Jenis</option>
              <option value="Desktop">Desktop PC</option>
              <option value="Laptop">Laptop</option>
              <option value="Mobile">Mobile Phone</option>
              <option value="Tablet">Tablet</option>
              <option value="Printer">Printer</option>
              <option value="Server">Server/Jaringan</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-status" className="block text-gray-700 font-medium mb-1">Status</label>
            <select
              id="filter-status"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-info focus:border-info"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">Semua Status</option>
              <option value="Available">Tersedia</option>
              <option value="In Use">Sedang Digunakan</option>
              <option value="Under Maintenance">Dalam Perawatan</option>
              <option value="Broken">Rusak</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-location" className="block text-gray-700 font-medium mb-1">Lokasi</label>
            <select
              id="filter-location"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-info focus:border-info"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            >
              <option value="All">Semua Lokasi</option>
              <option value="Lantai 1">Lantai 1</option>
              <option value="Lantai 2">Lantai 2</option>
              <option value="Ruang Server">Ruang Server</option>
              <option value="Gudang IT">Gudang IT</option>
              {/* Tambahkan lokasi spesifik lainnya */}
            </select>
          </div>
          <div className="md:col-span-1 flex flex-col sm:flex-row gap-2">
            <a href="/management/it/aset/tambah" className="px-4 py-2 bg-info text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2">
              <FaPlusCircle className="w-4 h-4" /> Tambah Baru
            </a>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors duration-200 flex items-center justify-center gap-2">
              <FaFileDownload className="w-4 h-4" /> Unduh Data
            </button>
          </div>
        </div>
      </section>

      {/* Tabel Daftar Perangkat IT */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaLaptopCode className="w-5 h-5 text-primary" />
          Daftar Perangkat IT ({filteredDevices.length} item)
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Nama Perangkat</th>
                <th className="py-3 px-6 text-left">Jenis</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Lokasi</th>
                <th className="py-3 px-6 text-left">Ditugaskan Kepada</th>
                <th className="py-3 px-6 text-left">Terakhir Dirawat</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredDevices.length > 0 ? (
                filteredDevices.map((device) => (
                  <tr key={device.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left font-medium">{device.id}</td>
                    <td className="py-3 px-6 text-left whitespace-nowrap flex items-center gap-2">
                      {getDeviceIcon(device.type)} {device.name}
                    </td>
                    <td className="py-3 px-6 text-left">{device.type}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${
                        device.status === 'Available' ? 'bg-green-200 text-green-800' :
                        device.status === 'In Use' ? 'bg-blue-200 text-blue-800' :
                        device.status === 'Under Maintenance' ? 'bg-orange-200 text-orange-800' :
                        'bg-red-200 text-red-800'
                      }`}>
                        {device.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">{device.location}</td>
                    <td className="py-3 px-6 text-left">{device.assignedTo || '-'}</td>
                    <td className="py-3 px-6 text-left text-xs text-gray-500">{device.lastMaintenance}</td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <a href={`/management/it/aset/detail/${device.id}`} className="text-blue-500 hover:text-blue-700 text-lg" title="Lihat Detail">
                          <FaInfoCircle />
                        </a>
                        <button onClick={() => handleEditDevice(device.id)} className="text-purple-500 hover:text-purple-700 text-lg" title="Edit">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDeleteDevice(device.id, device.name)} className="text-red-500 hover:text-red-700 text-lg" title="Hapus">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-4 text-center text-gray-500">Tidak ada perangkat IT ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ItDeviceListPage;