import React from 'react';
import {
  FaExchangeAlt,     // Ikon utama untuk pertukaran tugas
  FaPlusCircle,      // Ajukan tugas baru
  FaCheckCircle,     // Persetujuan
  FaInbox,           // Tugas masuk
  FaPaperPlane,      // Tugas saya (yang diajukan)
  FaHistory,         // Riwayat
  FaBell,            // Notifikasi/Status
  FaUserTie,         // Untuk Supervisor/Manager
  FaUsers,           // Untuk Officer
  FaTasks,
  FaClock
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TaskExchangeDashboardPage = () => {
  // Data Dummy untuk Stat Cards
  const userRole = 'Officer'; // Role pengguna, bisa 'Admin', 'Supervisor', 'Officer', dll.
  const userDepartment = 'IT'; 

  const stats = [
    {
      title: 'Tugas Menunggu Persetujuan Saya',
      value: 3, 
      icon: <FaCheckCircle className="w-6 h-6 text-orange-500" />,
      border: 'border-orange-500',
      text: 'text-orange-700',
      valueColor: 'text-orange-500',
      bg: 'bg-orange-100',
      role: 'Supervisor',
    },
    {
      title: 'Tugas Baru Masuk ke Dept. Saya',
      value: 5, 
      icon: <FaInbox className="w-6 h-6 text-blue-500" />,
      border: 'border-blue-500',
      text: 'text-blue-700',
      valueColor: 'text-blue-500',
      bg: 'bg-blue-100',
      role: 'All', 
    },
    {
      title: 'Tugas Saya Menunggu Diproses',
      value: 2,
      icon: <FaClock className="w-6 h-6 text-yellow-500" />,
      border: 'border-yellow-500',
      text: 'text-yellow-700',
      valueColor: 'text-yellow-500',
      bg: 'bg-yellow-100',
      role: 'All',
    },
    {
      title: 'Tugas Saya Menunggu Persetujuan Atasan',
      value: 1, 
      icon: <FaUserTie className="w-6 h-6 text-purple-500" />,
      border: 'border-purple-500',
      text: 'text-purple-700',
      valueColor: 'text-purple-500',
      bg: 'bg-purple-100',
      role: 'Officer',
    },
  ];

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <FaExchangeAlt className="w-8 h-8 text-gray-700" />
        Pertukaran Tugas Antar Departemen
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Ajukan, tinjau, dan kelola tugas atau permintaan yang melibatkan departemen lain untuk alur kerja yang efisien.
      </p>

      {/* Stat Cards yang Sesuai dengan Role/Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => {
          // Tampilkan stat card berdasarkan role
          if (stat.role === 'All' || stat.role === userRole) {
            return (
              <div
                key={stat.title}
                className={`rounded-xl shadow-md p-5 flex flex-col items-center justify-center text-center border-t-4 ${stat.border} ${stat.bg}`}
              >
                <div className="mb-2">{stat.icon}</div>
                <h2 className={`text-base font-semibold ${stat.text}`}>
                  {stat.title}
                </h2>
                <p className={`text-3xl font-bold mt-2 ${stat.valueColor}`}>{stat.value}</p>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Card: Ajukan Tugas Baru */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <h2 className="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2">
            <FaPlusCircle className="w-5 h-5 text-green-500" />
            Ajukan Tugas / Permintaan Baru
          </h2>
          <p className="text-gray-600 mb-4">
            Mulai proses pengajuan tugas ke departemen lain.
          </p>
          <div className="text-right">
            <Link to="/task/submit-task" className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center justify-center gap-2 ml-auto w-fit">
              <FaPaperPlane className="w-4 h-4" /> Ajukan Sekarang
            </Link>
          </div>
        </section>

        {/* Card: Tinjauan & Persetujuan Tugas (untuk Supervisor/Manager) */}
        {userRole === 'Supervisor' && ( // Hanya tampil jika role adalah Supervisor
          <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
            <h2 className="text-xl font-semibold mb-4 text-orange-700 flex items-center gap-2">
              <FaCheckCircle className="w-5 h-5 text-orange-500" />
              Tinjauan & Persetujuan Tugas
            </h2>
            <p className="text-gray-600 mb-4">
              Tinjau dan setujui pengajuan tugas dari staf Anda.
            </p>
            <div className="text-right">
              <Link to="/task/approval-task" className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2 ml-auto w-fit">
                <FaUserTie  className="w-4 h-4" /> Tinjaun Pengajuan
              </Link>
            </div>
          </section>
        )}

        {/* Card: Tugas Masuk ke Departemen Saya (untuk Penerima Tugas) */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
            <FaInbox className="w-5 h-5 text-blue-500" />
            Tugas Masuk ke Departemen {userDepartment}
          </h2>
          <p className="text-gray-600 mb-4">
            Lihat daftar tugas yang diajukan ke departemen Anda dan segera tindak lanjuti.
          </p>
          <div className="text-right">
            <Link to="/task/incoming-task" className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2 ml-auto w-fit">
              <FaInbox  className="w-4 h-4" /> Tinjaun Pengajuan
            </Link>
          </div>
        </section>

        {/* Card: Tugas Saya (Sebagai Pemohon) */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <h2 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2">
            <FaPaperPlane className="w-5 h-5 text-purple-500" />
            Tugas Saya (Yang Diajukan)
          </h2>
          <p className="text-gray-600 mb-4">
            Lacak status dan riwayat tugas yang Anda ajukan.
          </p>
          <div className="text-right">
            <Link to="/task/submitted-task" className="px-6 py-3 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors duration-200 flex items-center justify-center gap-2 ml-auto w-fit">
              <FaTasks className="w-4 h-4" /> Lacak Tugas
            </Link>
          </div>
        </section>

        {/* Card: Riwayat Semua Tugas (untuk Admin/Manajemen Umum) */}
        {userRole === 'Admin' && ( // Hanya tampil jika role adalah Admin atau untuk manajemen umum
          <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-400">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
              <FaHistory className="w-5 h-5 text-gray-500" />
              Riwayat Semua Tugas
            </h2>
            <p className="text-gray-600 mb-4">
              Lihat riwayat lengkap semua pengajuan tugas antar departemen.
            </p>
            <div className="text-right">
              <Link to="/task/history-task" className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center gap-2 ml-auto w-fit">
                <FaHistory className="w-4 h-4" /> Lihat Riwayat
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default TaskExchangeDashboardPage;