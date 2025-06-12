import React, { useState } from 'react';
import {
  FaHandshake,    // Ikon utama
  FaUsers,        // Mitra/Pihak
  FaPlusCircle,   // Ajukan/Tambah baru
  FaSearch,       // Cari
  FaCheckCircle,  // Status aktif
  FaClock,        // Status menunggu
  FaFileAlt,      // Detail perjanjian
  FaFilter
} from 'react-icons/fa';

const PartnershipCollaborationPage = () => {
  const [partnerships, setPartnerships] = useState([
    // Data dummy kemitraan
    { id: 'PART001', name: 'Brand XYZ', type: 'Sponsor Event', status: 'Aktif', startDate: '2025-01-01', endDate: '2025-12-31', contactPerson: 'Budi (budi@xyz.com)' },
    { id: 'PART002', name: 'Influencer Mega', type: 'Influencer Campaign', status: 'Aktif', startDate: '2025-06-01', endDate: '2025-08-31', contactPerson: 'Mega (mega@email.com)' },
    { id: 'PART003', name: 'Media ABC', type: 'Kerja Sama Liputan', status: 'Menunggu Persetujuan', startDate: '2025-07-01', endDate: 'N/A', contactPerson: 'Contact ABC (info@abc.com)' },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');

  const filteredPartnerships = partnerships.filter(partnership =>
    (filterStatus === 'Semua' || partnership.status === filterStatus) &&
    (partnership.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     partnership.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
     partnership.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-orange-700 mb-8 flex items-center gap-3">
        <FaHandshake className="w-8 h-8 text-orange-500" />
        Kolaborasi & Kemitraan
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Kelola semua bentuk kolaborasi dan kemitraan eksternal untuk mengembangkan jangkauan perusahaan.
      </p>

      {/* Filter dan Aksi Cepat */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-orange-500">
        <h2 className="text-xl font-semibold mb-4 text-orange-700 flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-orange-500" />
          Filter & Aksi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label htmlFor="search-partnership" className="block text-gray-700 font-medium mb-1">Cari Kemitraan</label>
            <input
              type="text"
              id="search-partnership"
              placeholder="Nama Mitra, Tipe, Kontak..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-status" className="block text-gray-700 font-medium mb-1">Status Kemitraan</label>
            <select
              id="filter-status"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="Semua">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Menunggu Persetujuan">Menunggu Persetujuan</option>
              <option value="Selesai">Selesai</option>
              {/* Tambahkan status lain jika ada */}
            </select>
          </div>
          <a href="/management/pemasaran/pr/kolaborasi/ajuan-baru" className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2">
            <FaPlusCircle className="w-4 h-4" /> Ajukan Kemitraan Baru
          </a>
        </div>
      </section>

      {/* Tabel Daftar Kemitraan */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaUsers className="w-5 h-5 text-primary" />
          Daftar Kolaborasi & Kemitraan ({filteredPartnerships.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nama Mitra</th>
                <th className="py-3 px-6 text-left">Tipe Kemitraan</th>
                <th className="py-3 px-6 text-left">Periode</th>
                <th className="py-3 px-6 text-left">Kontak Person</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredPartnerships.length > 0 ? (
                filteredPartnerships.map((partnership) => (
                  <tr key={partnership.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{partnership.name}</td>
                    <td className="py-3 px-6 text-left">{partnership.type}</td>
                    <td className="py-3 px-6 text-left">{partnership.startDate} - {partnership.endDate}</td>
                    <td className="py-3 px-6 text-left">{partnership.contactPerson}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${
                        partnership.status === 'Aktif' ? 'bg-green-200 text-green-800' :
                        partnership.status === 'Menunggu Persetujuan' ? 'bg-orange-200 text-orange-800' :
                        'bg-gray-200 text-gray-800'
                      }`}>
                        {partnership.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button className="text-blue-500 hover:text-blue-700 text-sm">Detail</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 text-center text-gray-500">Tidak ada kemitraan ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bagian Ajuan Kemitraan Menunggu (Opsional) */}
      <section className="bg-white rounded-xl shadow-md p-6 mt-8 border-l-4 border-info">
        <h2 className="text-xl font-semibold mb-4 text-info-dark flex items-center gap-2">
          <FaClock className="w-5 h-5 text-info" />
          Ajuan Kemitraan Menunggu
        </h2>
        <p className="text-gray-500">Lihat ajuan kemitraan baru yang perlu ditinjau.</p>
        <div className="text-right mt-4">
          <a href="/management/pemasaran/pr/kolaborasi/ajuan-review" className="text-sm text-info hover:underline">
            Tinjau Ajuan &rarr;
          </a>
        </div>
      </section>
    </div>
  );
};

export default PartnershipCollaborationPage;