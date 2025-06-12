import React, { useState } from 'react';
import {
  FaHistory,        // Ikon utama
  FaUsers,          // Karyawan
  FaSearch,         // Pencarian
  FaFilter,         // Filter
  FaFileDownload,   // Unduh
  FaBuilding,       // Departemen
  FaBriefcase,      // Jabatan
} from 'react-icons/fa';

const RiwayatKaryawanPage = () => {
  const [riwayatData, setRiwayatData] = useState([
    // Data dummy riwayat karyawan
    { id: 1, karyawanId: 'KRY001', nama: 'Budi Santoso', jenisPerubahan: 'Promosi Jabatan', detail: 'Dari Staff Operasional menjadi Supervisor Operasional', tanggal: '2024-01-01' },
    { id: 2, karyawanId: 'KRY002', nama: 'Siti Nurhayati', jenisPerubahan: 'Perubahan Departemen', detail: 'Dari Departemen Umum ke HRD', tanggal: '2023-09-15' },
    { id: 3, karyawanId: 'KRY003', nama: 'Joko Widodo', jenisPerubahan: 'Kenaikan Gaji', detail: 'Penyesuaian gaji tahunan', tanggal: '2024-03-01' },
    { id: 4, karyawanId: 'KRY001', nama: 'Budi Santoso', jenisPerubahan: 'Masa Percobaan Selesai', detail: 'Status karyawan tetap', tanggal: '2023-07-01' },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterJenis, setFilterJenis] = useState('Semua');

  const filteredRiwayat = riwayatData.filter(item =>
    (filterJenis === 'Semua' || item.jenisPerubahan === filterJenis) &&
    (item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.detail.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDownloadRiwayat = () => {
    alert('Mengunduh riwayat karyawan...');
    // Logika untuk mengunduh data
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      {/* Judul Halaman */}
      <h1 className="text-3xl font-bold text-info-dark mb-8 flex items-center gap-3">
        <FaHistory className="w-8 h-8 text-info" />
        Riwayat Karyawan
      </h1>

      {/* Deskripsi Halaman */}
      <p className="text-gray-600 mb-10 text-lg">
        Telusuri catatan riwayat pekerjaan, perubahan status, dan aktivitas penting karyawan.
      </p>

      {/* Filter dan Aksi Cepat */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-info">
        <h2 className="text-xl font-semibold mb-4 text-info-dark flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-info" />
          Filter Riwayat
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
          <div>
            <label htmlFor="search-riwayat" className="block text-gray-700 font-medium mb-1">Cari Riwayat</label>
            <input
              type="text"
              id="search-riwayat"
              placeholder="Nama, Detail Perubahan..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-info focus:border-info"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-jenis" className="block text-gray-700 font-medium mb-1">Jenis Perubahan</label>
            <select
              id="filter-jenis"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-info focus:border-info"
              value={filterJenis}
              onChange={(e) => setFilterJenis(e.target.value)}
            >
              <option value="Semua">Semua Jenis</option>
              <option value="Promosi Jabatan">Promosi Jabatan</option>
              <option value="Perubahan Departemen">Perubahan Departemen</option>
              <option value="Kenaikan Gaji">Kenaikan Gaji</option>
              <option value="Masa Percobaan Selesai">Masa Percobaan Selesai</option>
              {/* Tambahkan jenis perubahan lain */}
            </select>
          </div>
          <button onClick={handleDownloadRiwayat} className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2">
            <FaFileDownload className="w-4 h-4" /> Unduh Riwayat
          </button>
        </div>
      </section>

      {/* Tabel Riwayat Karyawan */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaUsers className="w-5 h-5 text-primary" />
          Detail Riwayat
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nama Karyawan</th>
                <th className="py-3 px-6 text-left">Jenis Perubahan</th>
                <th className="py-3 px-6 text-left">Detail</th>
                <th className="py-3 px-6 text-left">Tanggal</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredRiwayat.length > 0 ? (
                filteredRiwayat.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{item.nama}</td>
                    <td className="py-3 px-6 text-left">{item.jenisPerubahan}</td>
                    <td className="py-3 px-6 text-left">{item.detail}</td>
                    <td className="py-3 px-6 text-left">{item.tanggal}</td>
                    <td className="py-3 px-6 text-center">
                      <button className="text-blue-500 hover:text-blue-700 text-sm">Detail</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">Tidak ada riwayat ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default RiwayatKaryawanPage;