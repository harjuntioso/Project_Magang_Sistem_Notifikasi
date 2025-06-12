import React, { useState } from 'react';
import {
  FaCalendarCheck, // Ikon utama untuk cuti
  FaUserCheck,     // Persetujuan
  FaUserTimes,     // Penolakan
  FaClock,         // Waktu
  FaFileAlt,       // Detail
  FaSearch,        // Cari
  FaFilter,        // Filter
  FaHistory,       // Riwayat
  FaEnvelopeOpenText, // Untuk pengajuan dengan dokumen
} from 'react-icons/fa';

const PersetujuanCutiPage = () => {
  const [daftarPengajuan, setDaftarPengajuan] = useState([
    // Data dummy pengajuan cuti
    { id: 1, nama: 'Budi Santoso', departemen: 'Operasional', jenis: 'Cuti Tahunan', tanggalMulai: '2025-07-01', tanggalSelesai: '2025-07-05', durasi: 5, status: 'Menunggu', catatan: 'Untuk liburan keluarga.', dokumen: null },
    { id: 2, nama: 'Siti Nurhayati', departemen: 'HRD', jenis: 'Cuti Sakit', tanggalMulai: '2025-06-25', tanggalSelesai: '2025-06-25', durasi: 1, status: 'Menunggu', catatan: 'Demam tinggi.', dokumen: 'surat_dokter_siti.pdf' },
    { id: 3, nama: 'Joko Widodo', departemen: 'Keuangan', jenis: 'Cuti Melahirkan', tanggalMulai: '2025-07-01', tanggalSelesai: '2025-09-30', durasi: 92, status: 'Menunggu', catatan: 'Mendampingi istri melahirkan.', dokumen: 'surat_nikah_joko.pdf' },
    { id: 4, nama: 'Ayu Lestari', departemen: 'Pemasaran', jenis: 'Cuti Tahunan', tanggalMulai: '2025-06-20', tanggalSelesai: '2025-06-22', durasi: 3, status: 'Disetujui', catatan: '', dokumen: null }, // Contoh yang sudah disetujui
    { id: 5, nama: 'Cahyo Wibowo', departemen: 'IT', jenis: 'Cuti Pribadi', tanggalMulai: '2025-06-28', tanggalSelesai: '2025-06-28', durasi: 1, status: 'Menunggu', catatan: 'Mengurus keperluan pribadi.', dokumen: null },
  ]);

  const [filterStatus, setFilterStatus] = useState('Menunggu');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSetujui = (id) => {
    const updatedDaftar = daftarPengajuan.map(pengajuan =>
      pengajuan.id === id ? { ...pengajuan, status: 'Disetujui' } : pengajuan
    );
    setDaftarPengajuan(updatedDaftar);
    alert(`Pengajuan cuti untuk ${daftarPengajuan.find(p => p.id === id).nama} disetujui.`);
    // Logika untuk mengirim persetujuan ke backend
  };

  const handleTolak = (id) => {
    const updatedDaftar = daftarPengajuan.map(pengajuan =>
      pengajuan.id === id ? { ...pengajuan, status: 'Ditolak' } : pengajuan
    );
    setDaftarPengajuan(updatedDaftar);
    alert(`Pengajuan cuti untuk ${daftarPengajuan.find(p => p.id === id).nama} ditolak.`);
    // Logika untuk mengirim penolakan ke backend
  };

  const filteredPengajuan = daftarPengajuan.filter(pengajuan =>
    pengajuan.status === filterStatus &&
    (pengajuan.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
     pengajuan.departemen.toLowerCase().includes(searchTerm.toLowerCase()) ||
     pengajuan.jenis.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      {/* Judul Halaman */}
      <h1 className="text-3xl font-bold text-primary-dark mb-8 flex items-center gap-3">
        <FaCalendarCheck className="w-8 h-8 text-primary" />
        Persetujuan Cuti Karyawan
      </h1>

      {/* Deskripsi Halaman */}
      <p className="text-gray-600 mb-10 text-lg">
        Tinjau dan proses pengajuan cuti dari karyawan dengan cepat dan efisien.
      </p>

      {/* Filter Pengajuan */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-primary" />
          Filter Pengajuan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label htmlFor="filter-status" className="block text-gray-700 font-medium mb-1">Status Pengajuan</label>
            <select
              id="filter-status"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="Menunggu">Menunggu Tindakan</option>
              <option value="Disetujui">Disetujui</option>
              <option value="Ditolak">Ditolak</option>
            </select>
          </div>
          <div>
            <label htmlFor="search-pengajuan" className="block text-gray-700 font-medium mb-1">Cari Pengajuan</label>
            <input
              type="text"
              id="search-pengajuan"
              placeholder="Nama, Departemen, Jenis Cuti..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200 flex items-center justify-center gap-2">
            <FaSearch className="w-4 h-4" /> Cari
          </button>
        </div>
      </section>

      {/* Daftar Pengajuan Cuti */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-accent">
        <h2 className="text-xl font-semibold mb-4 text-accent-dark flex items-center gap-2">
          <FaUserCheck className="w-5 h-5 text-accent" />
          Daftar Pengajuan Cuti ({filteredPengajuan.length} item)
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nama</th>
                <th className="py-3 px-6 text-left">Departemen</th>
                <th className="py-3 px-6 text-left">Jenis Cuti</th>
                <th className="py-3 px-6 text-left">Mulai - Selesai</th>
                <th className="py-3 px-6 text-left">Durasi (hari)</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-center">Catatan/Dokumen</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredPengajuan.length > 0 ? (
                filteredPengajuan.map((pengajuan) => (
                  <tr key={pengajuan.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{pengajuan.nama}</td>
                    <td className="py-3 px-6 text-left">{pengajuan.departemen}</td>
                    <td className="py-3 px-6 text-left">{pengajuan.jenis}</td>
                    <td className="py-3 px-6 text-left">{pengajuan.tanggalMulai} - {pengajuan.tanggalSelesai}</td>
                    <td className="py-3 px-6 text-left">{pengajuan.durasi}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${
                        pengajuan.status === 'Menunggu' ? 'bg-orange-200 text-orange-800' :
                        pengajuan.status === 'Disetujui' ? 'bg-green-200 text-green-800' :
                        'bg-red-200 text-red-800'
                      }`}>
                        {pengajuan.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {pengajuan.catatan && <p className="text-xs text-gray-500">{pengajuan.catatan}</p>}
                      {pengajuan.dokumen && (
                        <a href={`/dokumen/cuti/${pengajuan.dokumen}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-xs flex items-center justify-center gap-1 mt-1">
                          <FaEnvelopeOpenText /> Lihat Dokumen
                        </a>
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      {pengajuan.status === 'Menunggu' && (
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleSetujui(pengajuan.id)}
                            className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-600 transition-colors"
                          >
                            Setujui
                          </button>
                          <button
                            onClick={() => handleTolak(pengajuan.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600 transition-colors"
                          >
                            Tolak
                          </button>
                        </div>
                      )}
                      {pengajuan.status !== 'Menunggu' && (
                        <button className="text-blue-500 hover:text-blue-700 text-sm">Detail</button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-4 text-center text-gray-500">Tidak ada pengajuan {filterStatus.toLowerCase()}.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Riwayat Pengajuan Cuti (Opsional: bisa di halaman terpisah lagi) */}
      <section className="bg-white rounded-xl shadow-md p-6 mt-8 border-l-4 border-info">
        <h2 className="text-xl font-semibold mb-4 text-info-dark flex items-center gap-2">
          <FaHistory className="w-5 h-5 text-info" />
          Riwayat Pengajuan Cuti
        </h2>
        <p className="text-gray-500">Telusuri daftar pengajuan cuti yang telah diproses.</p>
        <div className="text-right mt-4">
          <a href="/management/hrd/cuti/riwayat-semua" className="text-sm text-info hover:underline">
            Lihat Riwayat Lengkap &rarr;
          </a>
        </div>
      </section>
    </div>
  );
};

export default PersetujuanCutiPage;