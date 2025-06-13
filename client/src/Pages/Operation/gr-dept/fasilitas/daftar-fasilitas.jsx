import React, { useState } from 'react';
import {
  FaBuilding,        // Ikon utama
  FaMap,              // Denah
  FaSearch,           // Cari
  FaFilter,           // Filter
  FaInfoCircle,       // Detail
  FaChair,            // Ruangan Rapat
  FaCoffee,           // Kantin
  FaRestroom,         // Toilet/Mushola
  FaWifi,             // Konektivitas
  FaParking,          // Parkir
  FaFirstAid,         // P3K/Klinik
  FaBasketballBall,   // Area Rekreasi
} from 'react-icons/fa';

const FacilityListMapPage = () => {
  const [facilities, setFacilities] = useState([
    // Data dummy fasilitas
    { id: 'FAC001', name: 'Ruang Rapat Utama (Lantai 2)', type: 'Ruangan Rapat', location: 'Lantai 2', description: 'Kapasitas 20 orang, proyektor, videoconference.', status: 'Aktif', denahLink: '/denah/lantai2-ruangrapatutama.pdf' },
    { id: 'FAC002', name: 'Kantin Karyawan', type: 'Area Umum', location: 'Lantai Dasar', description: 'Menyediakan makan siang dan minuman. Buka jam 08:00 - 17:00.', status: 'Aktif', denahLink: '/denah/lantai-dasar.pdf' },
    { id: 'FAC003', name: 'Mushola Pria & Wanita', type: 'Area Umum', location: 'Lantai 1', description: 'Tersedia tempat sholat dan tempat wudhu.', status: 'Aktif', denahLink: '/denah/lantai1.pdf' },
    { id: 'FAC004', name: 'Area Parkir Motor', type: 'Area Eksternal', location: 'Depan Gedung', description: 'Kapasitas 100 motor, hanya untuk karyawan.', status: 'Aktif', denahLink: '/denah/area-parkir.pdf' },
    { id: 'FAC005', name: 'Klinik Kesehatan Perusahaan', type: 'Layanan Darurat', location: 'Lantai Dasar', description: 'P3K dan layanan kesehatan dasar. Buka jam kerja.', status: 'Aktif', denahLink: '/denah/lantai-dasar.pdf' },
    { id: 'FAC006', name: 'Area Hiburan Karyawan', type: 'Area Rekreasi', location: 'Belakang Kantor', description: 'Lapangan basket mini, meja pingpong, area bersantai.', status: 'Aktif', denahLink: '/denah/area-rekreasi.pdf' },
    // ... tambahkan data dummy fasilitas
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterLocation, setFilterLocation] = useState('All');

  const filteredFacilities = facilities.filter(facility =>
    (filterType === 'All' || facility.type === filterType) &&
    (filterLocation === 'All' || facility.location === filterLocation) &&
    (facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     facility.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getFacilityIcon = (type) => {
    switch (type) {
      case 'Ruangan Rapat': return <FaChair className="text-blue-500" />;
      case 'Area Umum':
      case 'Layanan Darurat': return <FaBuilding className="text-green-500" />;
      case 'Area Eksternal': return <FaParking className="text-gray-500" />;
      case 'Area Rekreasi': return <FaBasketballBall className="text-orange-500" />;
      default: return <FaInfoCircle className="text-gray-500" />;
    }
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-8 flex items-center gap-3">
        <FaBuilding className="w-8 h-8 text-green-500" />
        Daftar Fasilitas & Denah
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Temukan informasi lengkap tentang fasilitas perusahaan dan akses denah lokasi.
      </p>

      {/* Filter Fasilitas */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-green-500">
        <h2 className="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2">
          <FaSearch className="w-5 h-5 text-green-500" />
          Filter Fasilitas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="search-facility" className="block text-gray-700 font-medium mb-1">Cari Fasilitas</label>
            <input
              type="text"
              id="search-facility"
              placeholder="Nama, Deskripsi Fasilitas..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-type" className="block text-gray-700 font-medium mb-1">Jenis Fasilitas</label>
            <select
              id="filter-type"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">Semua Jenis</option>
              <option value="Ruangan Rapat">Ruangan Rapat</option>
              <option value="Area Umum">Area Umum</option>
              <option value="Layanan Darurat">Layanan Darurat</option>
              <option value="Area Eksternal">Area Eksternal</option>
              <option value="Area Rekreasi">Area Rekreasi</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-location" className="block text-gray-700 font-medium mb-1">Lokasi</label>
            <select
              id="filter-location"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            >
              <option value="All">Semua Lokasi</option>
              <option value="Lantai Dasar">Lantai Dasar</option>
              <option value="Lantai 1">Lantai 1</option>
              <option value="Lantai 2">Lantai 2</option>
              <option value="Depan Gedung">Depan Gedung</option>
              <option value="Belakang Kantor">Belakang Kantor</option>
              {/* Tambahkan lokasi spesifik lainnya */}
            </select>
          </div>
          <button className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center justify-center gap-2">
            <FaMap className="w-4 h-4" /> Lihat Denah Utama
          </button>
        </div>
      </section>

      {/* Tabel Daftar Fasilitas */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaInfoCircle className="w-5 h-5 text-primary" />
          Daftar Fasilitas ({filteredFacilities.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nama Fasilitas</th>
                <th className="py-3 px-6 text-left">Jenis</th>
                <th className="py-3 px-6 text-left">Lokasi</th>
                <th className="py-3 px-6 text-left">Deskripsi Singkat</th>
                <th className="py-3 px-6 text-center">Denah Detail</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredFacilities.length > 0 ? (
                filteredFacilities.map((facility) => (
                  <tr key={facility.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{facility.name}</td>
                    <td className="py-3 px-6 text-left flex items-center gap-2">
                      {getFacilityIcon(facility.type)} {facility.type}
                    </td>
                    <td className="py-3 px-6 text-left">{facility.location}</td>
                    <td className="py-3 px-6 text-left max-w-sm overflow-hidden text-ellipsis">{facility.description}</td>
                    <td className="py-3 px-6 text-center">
                      {facility.denahLink ? (
                        <a href={facility.denahLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 text-lg" title="Lihat Denah">
                          <FaMap />
                        </a>
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">Tidak ada fasilitas ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default FacilityListMapPage;