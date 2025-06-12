import React, { useState } from 'react';
import {
  FaCheckCircle,    // Icon utama untuk verifikasi
  FaUserEdit,       // Pengajuan menunggu
  FaHistory,        // Riwayat
  FaSearch,         // Pencarian/Filter
  FaCalendarCheck,  // Cuti
  FaProcedures,     // Sakit
  FaHandshake,      // Izin lain
} from 'react-icons/fa';

const AbsensiVerificationPage = () => {
  const [filterStatus, setFilterStatus] = useState('Menunggu'); // Menunggu, Disetujui, Ditolak
  const [pendingRequests, setPendingRequests] = useState([
    // Data dummy pengajuan
    { id: 1, nama: 'Bayu Prakoso', jenis: 'Cuti Tahunan', tanggalMulai: '2025-06-15', tanggalSelesai: '2025-06-17', status: 'Menunggu', diajukanOleh: 'HRD Manager' },
    { id: 2, nama: 'Dewi Anggraini', jenis: 'Izin Sakit', tanggalMulai: '2025-06-10', tanggalSelesai: '2025-06-10', status: 'Menunggu', diajukanOleh: 'Self' },
    { id: 3, nama: 'Cahyo Wibowo', jenis: 'Cuti Melahirkan', tanggalMulai: '2025-07-01', tanggalSelesai: '2025-09-30', status: 'Menunggu', diajukanOleh: 'HRD Manager' },
  ]);

  const handleApprove = (id) => {
    alert(`Pengajuan ID ${id} disetujui.`);
    setPendingRequests(pendingRequests.filter(req => req.id !== id)); // Hapus dari daftar menunggu
    // Logika untuk mengirim persetujuan ke backend
  };

  const handleReject = (id) => {
    alert(`Pengajuan ID ${id} ditolak.`);
    setPendingRequests(pendingRequests.filter(req => req.id !== id)); // Hapus dari daftar menunggu
    // Logika untuk mengirim penolakan ke backend
  };

  const filteredRequests = pendingRequests.filter(req => {
    // Implementasi filter berdasarkan status, jenis, dll.
    return req.status === filterStatus;
  });


  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-info-dark mb-8 flex items-center gap-3">
        <FaCheckCircle className="w-8 h-8 text-info" />
        Verifikasi Pengajuan Absen
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Tinjau dan proses pengajuan cuti, sakit, atau izin lainnya dari karyawan.
      </p>

      {/* Filter Status */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-info">
        <h2 className="text-xl font-semibold mb-4 text-info-dark flex items-center gap-2">
          <FaSearch className="w-5 h-5 text-info" />
          Filter Pengajuan
        </h2>
        <div className="flex flex-wrap gap-4 items-center">
          <label htmlFor="filter-status" className="block text-gray-700 font-medium">Tampilkan Status:</label>
          <select
            id="filter-status"
            className="p-2 border border-gray-300 rounded-lg focus:ring-info focus:border-info"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="Menunggu">Menunggu Tindakan</option>
            <option value="Disetujui">Disetujui</option>
            <option value="Ditolak">Ditolak</option>
          </select>
        </div>
      </section>

      {/* Daftar Pengajuan */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaUserEdit className="w-5 h-5 text-primary" />
          Daftar Pengajuan ({filterStatus})
        </h2>
        {filteredRequests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Nama Karyawan</th>
                  <th className="py-3 px-6 text-left">Jenis Pengajuan</th>
                  <th className="py-3 px-6 text-left">Tanggal Mulai</th>
                  <th className="py-3 px-6 text-left">Tanggal Selesai</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm font-light">
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{req.nama}</td>
                    <td className="py-3 px-6 text-left">{req.jenis}</td>
                    <td className="py-3 px-6 text-left">{req.tanggalMulai}</td>
                    <td className="py-3 px-6 text-left">{req.tanggalSelesai}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${
                        req.status === 'Menunggu' ? 'bg-orange-200 text-orange-800' :
                        req.status === 'Disetujui' ? 'bg-green-200 text-green-800' :
                        'bg-red-200 text-red-800'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {req.status === 'Menunggu' && (
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleApprove(req.id)}
                            className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-600 transition-colors"
                          >
                            Setujui
                          </button>
                          <button
                            onClick={() => handleReject(req.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600 transition-colors"
                          >
                            Tolak
                          </button>
                        </div>
                      )}
                      {req.status !== 'Menunggu' && (
                        <button className="text-blue-500 hover:text-blue-700 text-sm">Detail</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">Tidak ada pengajuan dengan status "{filterStatus}".</p>
        )}
      </section>

      {/* Riwayat Verifikasi (Opsional, bisa di halaman terpisah lagi) */}
      <section className="bg-white rounded-xl shadow-md p-6 mt-8 border-l-4 border-secondary">
        <h2 className="text-xl font-semibold mb-4 text-secondary-dark flex items-center gap-2">
          <FaHistory className="w-5 h-5 text-secondary" />
          Riwayat Verifikasi
        </h2>
        <p className="text-gray-500">Lihat daftar pengajuan yang telah disetujui atau ditolak.</p>
        <div className="text-right mt-4">
          <a href="/management/hrd/absensi/riwayat-verifikasi" className="text-sm text-secondary hover:underline">
            Lihat Riwayat Lengkap &rarr;
          </a>
        </div>
      </section>
    </div>
  );
};

export default AbsensiVerificationPage;