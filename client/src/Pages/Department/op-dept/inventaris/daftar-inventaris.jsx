import React, { useState } from 'react';
import {
  FaWarehouse,      // Ikon utama untuk inventaris
  FaSearch,         // Cari
  FaFilter,         // Filter
  FaPlusCircle,     // Tambah atraksi baru
  FaEdit,           // Edit detail
  FaTrash,          // Hapus
  FaGamepad,        // Permainan
  FaUmbrellaBeach,  // Area
  FaInfoCircle,     // Detail
  FaFileDownload,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { LuRollerCoaster } from "react-icons/lu";

const AttractionInventoryListPage = () => {
  const [attractions, setAttractions] = useState([
    // Data dummy inventaris atraksi
    { id: 'ATRK001', name: 'Roller Coaster Fantasi', type: 'Wahana', location: 'Area Utama', status: 'Active', lastMaintenance: '2025-06-01', capacity: 24 },
    { id: 'ATRK002', name: 'Komedi Putar Ajaib', type: 'Permainan', location: 'Area Anak', status: 'Active', lastMaintenance: '2025-05-15', capacity: 30 },
    { id: 'ATRK003', name: 'Rumah Hantu Misteri', type: 'Wahana', location: 'Zona Horor', status: 'Under Maintenance', lastMaintenance: '2025-06-05', capacity: 15 },
    { id: 'ATRK004', name: 'Area Permainan Air', type: 'Area', location: 'Zona Air', status: 'Active', lastMaintenance: '2025-04-10', capacity: 'N/A' },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterLocation, setFilterLocation] = useState('All');

  const filteredAttractions = attractions.filter(attraction =>
    (filterType === 'All' || attraction.type === filterType) &&
    (filterStatus === 'All' || attraction.status === filterStatus) &&
    (filterLocation === 'All' || attraction.location.includes(filterLocation)) &&
    (attraction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     attraction.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getAttractionIcon = (type) => {
    switch (type) {
      case 'Wahana': return <LuRollerCoaster className="text-purple-500" />;
      case 'Permainan': return <FaGamepad className="text-orange-500" />;
      case 'Area': return <FaUmbrellaBeach className="text-blue-500" />;
      default: return <FaInfoCircle className="text-gray-500" />;
    }
  };

  const handleEditAttraction = (id) => {
    alert(`Mengedit detail atraksi ID: ${id}`);
    // Arahkan ke halaman edit atraksi atau buka modal
    // Contoh: navigate(`/management/ops/inventaris-atraksi/edit/${id}`);
  };

  const handleDeleteAttraction = (id, name) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus atraksi "${name}"?`)) {
      alert(`Menghapus atraksi ID: ${id}`);
      setAttractions(attractions.filter(a => a.id !== id));
      // Logika untuk menghapus dari backend
    }
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-secondary-dark mb-8 flex items-center gap-3">
        <FaWarehouse className="w-8 h-8 text-secondary" />
        Daftar Inventaris Atraksi
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Kelola inventaris lengkap semua wahana, permainan, dan peralatan di area hiburan.
      </p>

      {/* Filter dan Aksi Cepat */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-secondary">
        <h2 className="text-xl font-semibold mb-4 text-secondary-dark flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-secondary" />
          Filter & Aksi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
          <div>
            <label htmlFor="search-attraction" className="block text-gray-700 font-medium mb-1">Cari Atraksi</label>
            <input
              type="text"
              id="search-attraction"
              placeholder="Nama, Lokasi..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-type" className="block text-gray-700 font-medium mb-1">Jenis Atraksi</label>
            <select
              id="filter-type"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">Semua Jenis</option>
              <option value="Wahana">Wahana</option>
              <option value="Permainan">Permainan</option>
              <option value="Area">Area</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-status" className="block text-gray-700 font-medium mb-1">Status</label>
            <select
              id="filter-status"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">Semua Status</option>
              <option value="Active">Aktif</option>
              <option value="Under Maintenance">Dalam Perawatan</option>
              <option value="Closed">Ditutup</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-location" className="block text-gray-700 font-medium mb-1">Lokasi</label>
            <select
              id="filter-location"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            >
              <option value="All">Semua Lokasi</option>
              <option value="Area Utama">Area Utama</option>
              <option value="Area Anak">Area Anak</option>
              <option value="Zona Horor">Zona Horor</option>
              <option value="Zona Air">Zona Air</option>
              {/* Tambahkan lokasi spesifik lainnya */}
            </select>
          </div>
          <div className="md:col-span-1 flex flex-col sm:flex-row gap-2">
            <a href="/management/operasional/inventaris-atraksi/tambah" className="px-4 py-2 bg-secondary text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2">
              <FaPlusCircle className="w-4 h-4" /> Tambah Baru
            </a>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2">
              <FaFileDownload className="w-4 h-4" /> Unduh Data
            </button>
          </div>
        </div>
      </section>

      {/* Tabel Daftar Inventaris Atraksi */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaWarehouse className="w-5 h-5 text-primary" />
          Daftar Atraksi ({filteredAttractions.length} item)
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Nama Atraksi</th>
                <th className="py-3 px-6 text-left">Jenis</th>
                <th className="py-3 px-6 text-left">Lokasi</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Kapasitas</th>
                <th className="py-3 px-6 text-left">Terakhir Dirawat</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredAttractions.length > 0 ? (
                filteredAttractions.map((attraction) => (
                  <tr key={attraction.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left font-medium">{attraction.id}</td>
                    <td className="py-3 px-6 text-left whitespace-nowrap flex items-center gap-2">
                      {getAttractionIcon(attraction.type)} {attraction.name}
                    </td>
                    <td className="py-3 px-6 text-left">{attraction.type}</td>
                    <td className="py-3 px-6 text-left flex items-center gap-1"><FaMapMarkerAlt className="text-xs text-gray-500" />{attraction.location}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${
                        attraction.status === 'Active' ? 'bg-green-200 text-green-800' :
                        attraction.status === 'Under Maintenance' ? 'bg-orange-200 text-orange-800' :
                        'bg-red-200 text-red-800'
                      }`}>
                        {attraction.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">{attraction.capacity}</td>
                    <td className="py-3 px-6 text-left text-xs text-gray-500">{attraction.lastMaintenance}</td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <a href={`/management/ops/inventaris-atraksi/detail/${attraction.id}`} className="text-blue-500 hover:text-blue-700 text-lg" title="Lihat Detail">
                          <FaInfoCircle />
                        </a>
                        <button onClick={() => handleEditAttraction(attraction.id)} className="text-purple-500 hover:text-purple-700 text-lg" title="Edit">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDeleteAttraction(attraction.id, attraction.name)} className="text-red-500 hover:text-red-700 text-lg" title="Hapus">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-4 text-center text-gray-500">Tidak ada atraksi ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AttractionInventoryListPage;