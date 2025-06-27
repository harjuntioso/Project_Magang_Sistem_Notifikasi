import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import {
  FaExchangeAlt,
  FaPlusCircle,
  FaCheckCircle,
  FaInbox,
  FaPaperPlane,
  FaHistory,
  FaBell,
  FaUserTie,
  FaUsers,
  FaTasks,
  FaClock,
  FaSpinner, 
} from 'react-icons/fa';
import { useAuth } from '../../Context/AuthContext';
import axiosClient from '../../axiosClient'; 

const TaskExchangeDashboardPage = () => {
  const { user } = useAuth(); 
  const [taskCounts, setTaskCounts] = useState({
    pendingApprovalByMe: 0,
    incomingToMyDept: 0,
    myTasksPendingProcessing: 0,
    myTasksPendingMySupervisorApproval: 0,
    allTasksTotal: 0, 
  });
  const [loadingStats, setLoadingStats] = useState(true); // State untuk loading Stat Cards

  // Ambil role dan departemen user yang login
  const userRole = user?.role?.name; 
  const userDepartmentId = user?.department?.id;
  const userId = user?.id; 

  // Effect untuk memuat jumlah tugas dari backend
  useEffect(() => {
    const fetchTaskCounts = async () => {
      if (!user || !userId) { // Pastikan user dan ID-nya sudah ada
        setLoadingStats(false);
        return;
      }
      setLoadingStats(true);
      try {
        const response = await axiosClient.get('/tasks/counts', { 
          params: {
            user_id: userId,
            user_department_id: userDepartmentId,
            user_role: userRole,
          }
        });
        setTaskCounts(response.data);
      } catch (error) {
        console.error("Gagal memuat jumlah tugas untuk dashboard:", error.response || error);
        // Opsional: Tampilkan SweetAlert error
      } finally {
        setLoadingStats(false);
      }
    };

    fetchTaskCounts();
  }, [user, userId, userRole, userDepartmentId]); // Dependency array: jalankan ulang jika data user berubah

  // Data Stat Cards (nilai value diambil dari state taskCounts)
  const stats = [
    {
      title: 'Tugas Menunggu Persetujuan Saya',
      value: taskCounts.pendingApprovalByMe,
      icon: <FaCheckCircle className="w-6 h-6 text-orange-500" />,
      border: 'border-orange-500',
      text: 'text-orange-700',
      valueColor: 'text-orange-500',
      bg: 'bg-orange-100',
      role: 'Supervisor', // Hanya tampil untuk role Supervisor
    },
    {
      title: 'Tugas Baru Masuk ke Dept. Saya',
      value: taskCounts.incomingToMyDept,
      icon: <FaInbox className="w-6 h-6 text-blue-500" />,
      border: 'border-blue-500',
      text: 'text-blue-700',
      valueColor: 'text-blue-500',
      bg: 'bg-blue-100',
      role: 'All', // Atau 'All' jika semua di departemen bisa lihat
    },
    {
      title: 'Tugas Saya Menunggu Diproses',
      value: taskCounts.myTasksPendingProcessing,
      icon: <FaClock className="w-6 h-6 text-yellow-500" />,
      border: 'border-yellow-500',
      text: 'text-yellow-700',
      valueColor: 'text-yellow-500',
      bg: 'bg-yellow-100',
      role: 'All', // Semua role yang mengajukan tugas
    },
    {
      title: 'Tugas Saya Menunggu Persetujuan Atasan',
      value: taskCounts.myTasksPendingMySupervisorApproval,
      icon: <FaUserTie className="w-6 h-6 text-purple-500" />,
      border: 'border-purple-500',
      text: 'text-purple-700',
      valueColor: 'text-purple-500',
      bg: 'bg-purple-100',
      role: 'Officer', // Biasanya Officer yang ajukan ke atasannya
    },
    {
      title: 'Total Tugas Sistem', // Hanya untuk Admin
      value: taskCounts.allTasksTotal,
      icon: <FaTasks className="w-6 h-6 text-gray-500" />,
      border: 'border-gray-500',
      text: 'text-gray-700',
      valueColor: 'text-gray-500',
      bg: 'bg-gray-100',
      role: 'Admin',
    },
  ];

  if (!user) { // Tampilkan loading atau pesan jika user belum dimuat
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
        <p>Memuat data user, harap tunggu...</p>
      </div>
    );
  }

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
        {loadingStats ? (
          <div className="lg:col-span-4 text-center py-10">
            <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
            <p className="text-gray-700">Memuat statistik tugas...</p>
          </div>
        ) : (
          stats.map((stat) => {
            // Logika untuk menampilkan card berdasarkan role (bisa array atau string)
            const showCard = Array.isArray(stat.role)
              ? stat.role.includes(userRole)
              : stat.role === 'All' || stat.role === userRole;

            if (showCard) {
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
          })
        )}
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
        {(userRole === 'Supervisor' || userRole === 'Manager') && ( // Tampil jika role adalah Supervisor atau Manager
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
                <FaUserTie className="w-4 h-4" /> Tinjau Pengajuan
              </Link>
            </div>
          </section>
        )}

        {/* Card: Tugas Masuk ke Departemen Saya (untuk Penerima Tugas) */}
        {(userRole === 'Supervisor' || userRole === 'Manager' || userRole === 'Officer') && ( // Semua role di departemen penerima
          <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <h2 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
              <FaInbox className="w-5 h-5 text-blue-500" />
              Tugas Masuk ke Departemen {user?.department?.name}
            </h2>
            <p className="text-gray-600 mb-4">
              Lihat daftar tugas yang diajukan ke departemen Anda dan segera tindak lanjuti.
            </p>
            <div className="text-right">
              <Link to="/task/incoming-task" className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2 ml-auto w-fit">
                <FaInbox className="w-4 h-4" /> Lihat Tugas
              </Link>
            </div>
          </section>
        )}

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

        {/* Card: Riwayat Semua Tugas (untuk Admin) */}
        {userRole === 'Admin' && ( // Hanya tampil jika role adalah Admin
          <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-400">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
              <FaHistory className="w-5 h-5 text-gray-500" />
              Riwayat Semua Tugas
            </h2>
            <p className="text-gray-600 mb-4">
              Lihat riwayat lengkap semua pengajuan tugas antar departemen.
            </p>
            <div className="text-right">
              <Link to="/task/task-history" className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center gap-2 ml-auto w-fit">
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