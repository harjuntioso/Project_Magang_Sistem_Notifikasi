import { useState, useEffect } from 'react';
import { checkWhatsAppStatus } from '../../axiosClient'; // Pastikan path ini benar
import { useAuth } from '../../Context/AuthContext'; // Import useAuth untuk user info
import axiosClient from '../../axiosClient'; // Import axiosClient untuk API calls

import {
  FaUsers,
  FaUserFriends,
  FaChartBar,
  FaHistory,
  FaBell,
  FaEnvelopeOpenText,
  FaCogs,
  FaBullhorn,
  FaLink,
  FaCalendarAlt,
  FaBook,
  FaHeadset,
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaTasks,
  FaUserCheck,
  FaMoneyBillWave,
  FaQuestionCircle,
  FaInbox,
  FaClock,
  FaUserTie,
} from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth(); // Dapatkan user dari AuthContext

  const [whatsAppStatus, setWhatsAppStatus] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [loadingWhatsApp, setLoadingWhatsApp] = useState(true);

  // STATE BARU UNTUK STATISTIK DARI BACKEND
  const [dashboardStats, setDashboardStats] = useState({
    pendingApprovalByMe: 0,
    incomingToMyDept: 0,
    myTasksPendingProcessing: 0, // Ini adalah tugas yang user ajukan dan masih dalam proses
    myTasksPendingMySupervisorApproval: 0,
    myAssignedTasks: 0, // Tugas yang ditugaskan kepada saya (Officer)
    allTasksTotal: 0,
    // Tambahkan stat lain sesuai kebutuhan jika ada endpoint API-nya
    unreadNotifications: 0, // Akan diambil dari endpoint notifikasi
    onlineUsers: 0, // Akan diambil dari endpoint users online
    openHelpdeskTickets: 0, // Akan diambil dari endpoint helpdesk
    pendingDocumentApprovals: 0, // Akan diambil dari endpoint dokumen
  });
  const [loadingDashboardStats, setLoadingDashboardStats] = useState(true); // Loading untuk semua stat card

  const userRole = user?.role?.name;
  const userDepartmentId = user?.department?.id;
  const userId = user?.id;

  // Effect untuk memuat status koneksi WhatsApp
  useEffect(() => {
    const fetchWhatsAppConnectionStatus = async () => {
      setLoadingWhatsApp(true);
      try {
        const response = await checkWhatsAppStatus();
        setWhatsAppStatus(response.data.status);
        setQrCode(response.data.qr_code || null);
      } catch (error) {
        console.error('Error fetching WhatsApp status:', error);
        setWhatsAppStatus('Error');
      } finally {
        setLoadingWhatsApp(false);
      }
    };

    fetchWhatsAppConnectionStatus();
    const interval = setInterval(fetchWhatsAppConnectionStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  // Effect untuk memuat statistik Dashboard utama
  useEffect(() => {
    const fetchDashboardStats = async () => {
      if (!user || !userId) {
        setLoadingDashboardStats(false);
        return;
      }
      setLoadingDashboardStats(true);
      try {
        const [taskCountsResponse, notificationsResponse] = await Promise.all([
          axiosClient.get('/tasks/counts', { // Endpoint yang sudah ada
            params: {
              user_id: userId,
              user_department_id: userDepartmentId,
              user_role: userRole,
            }
          }),
          // Panggil endpoint notifikasi untuk mendapatkan unreadCount
          axiosClient.get(`/notifications/${userId}`),
          // Tambahkan panggilan API lain untuk stat lainnya di sini
          // misalnya: axiosClient.get('/users/online-count'),
          // axiosClient.get('/helpdesk/open-tickets-count'),
        ]);

        setDashboardStats(prevStats => ({
          ...prevStats,
          ...taskCountsResponse.data, // Menggabungkan data dari task counts
          unreadNotifications: notificationsResponse.data.unread_count, // Notifikasi belum dibaca
          // Update stat lain yang diambil dari API lain di sini
        }));

      } catch (error) {
        console.error("Gagal memuat statistik dashboard:", error.response || error);
        // Tampilkan pesan error jika perlu
      } finally {
        setLoadingDashboardStats(false);
      }
    };

    fetchDashboardStats();
  }, [user, userId, userRole, userDepartmentId]); // Dependensi

  // Data Stat Cards (nilai value diambil dari state dashboardStats)
  // Perhatikan penyesuaian 'value' dan 'role' untuk mencerminkan data dinamis
  const statsConfig = [
    {
      title: 'Pengguna Online',
      value: 'N/A', // Ini perlu diambil dari API users online
      icon: <FaUserFriends className="w-6 h-6 text-primary" />,
      border: 'border-primary', text: 'text-primary-dark', valueColor: 'text-primary', bg: 'bg-primary-light',
      role: 'All',
    },
    {
      title: 'Notifikasi Baru',
      value: dashboardStats.unreadNotifications, // Dari API Notifikasi
      icon: <FaBell className="w-6 h-6 text-accent" />,
      border: 'border-accent', text: 'text-accent-dark', valueColor: 'text-accent', bg: 'bg-accent-light',
      role: 'All', // Semua user bisa punya notifikasi
    },
    {
      title: 'Tiket Helpdesk Terbuka',
      value: 'N/A', // Ini perlu diambil dari API Helpdesk
      icon: <FaHeadset className="w-6 h-6 text-orange-500" />,
      border: 'border-orange-500', text: 'text-orange-700', valueColor: 'text-orange-500', bg: 'bg-orange-100',
      role: 'All',
    },
    {
      title: 'Dokumen Menunggu Persetujuan',
      value: 'N/A', // Ini perlu diambil dari API Dokumen
      icon: <FaClipboardList className="w-6 h-6 text-indigo-500" />,
      border: 'border-indigo-500', text: 'text-indigo-700', valueColor: 'text-indigo-500', bg: 'bg-indigo-100',
      role: 'All',
    },
    {
      title: 'Karyawan Hadir Hari Ini',
      value: 'N/A', // Ini perlu diambil dari API Absensi
      icon: <FaUserCheck className="w-6 h-6 text-green-600" />,
      border: 'border-green-600', text: 'text-green-800', valueColor: 'text-green-600', bg: 'bg-green-100',
      role: 'All',
    },
    {
      title: 'Tugas Mendatang (3 Hari)', // Ini bisa dihitung dari API Tugas yang ditugaskan
      value: dashboardStats.myAssignedTasks, // Menggunakan 'myAssignedTasks' sebagai proxy atau sesuaikan dengan query di backend
      icon: <FaTasks className="w-6 h-6 text-red-500" />,
      border: 'border-red-500', text: 'text-red-700', valueColor: 'text-red-500', bg: 'bg-red-100',
      role: ['Officer'], // Biasanya lebih relevan untuk Officer yang punya tugas langsung
    },
    {
      title: 'Tugas Menunggu Persetujuan Saya', // Khusus SPV Pengaju
      value: dashboardStats.pendingApprovalByMe,
      icon: <FaCheckCircle className="w-6 h-6 text-orange-500" />,
      border: 'border-orange-500', text: 'text-orange-700', valueColor: 'text-orange-500', bg: 'bg-orange-100',
      role: 'Supervisor',
    },
    {
      title: 'Tugas Baru Masuk ke Dept. Saya', // Khusus SPV Departemen Tujuan
      value: dashboardStats.incomingToMyDept,
      icon: <FaInbox className="w-6 h-6 text-blue-500" />,
      border: 'border-blue-500', text: 'text-blue-700', valueColor: 'text-blue-500', bg: 'bg-blue-100',
      role: ['Supervisor', 'Manager'],
    },
    {
      title: 'Tugas Saya Menunggu Diproses', // Tugas yang diajukan oleh user dan belum selesai
      value: dashboardStats.myTasksPendingProcessing,
      icon: <FaClock className="w-6 h-6 text-yellow-500" />,
      border: 'border-yellow-500', text: 'text-yellow-700', valueColor: 'text-yellow-500', bg: 'bg-yellow-100',
      role: 'All',
    },
    {
      title: 'Tugas Saya Menunggu Persetujuan Atasan', // Tugas Officer yang masih di SPVnya
      value: dashboardStats.myTasksPendingMySupervisorApproval,
      icon: <FaUserTie className="w-6 h-6 text-purple-500" />,
      border: 'border-purple-500', text: 'text-purple-700', valueColor: 'text-purple-500', bg: 'bg-purple-100',
      role: 'Officer',
    },
    {
      title: 'Total Tugas Sistem', // Hanya untuk Admin
      value: dashboardStats.allTasksTotal,
      icon: <FaTasks className="w-6 h-6 text-gray-500" />,
      border: 'border-gray-500', text: 'text-gray-700', valueColor: 'text-gray-500', bg: 'bg-gray-100',
      role: 'Admin',
    },
  ];

  // Dummy data (perlu diganti dengan data API sungguhan)
  const recentActivities = [
    { time: '10 menit lalu', activity: 'Status sistem diperiksa.' },
    { time: '1 jam lalu', activity: 'Dokumen "Rencana Q3" diperbarui oleh Siti.' },
    { time: '3 jam lalu', activity: 'Permintaan cuti Budi disetujui HRD.' },
  ];

  const announcements = [
    {
      id: 1,
      title: 'Pengumuman Penting: Perubahan Kebijakan Cuti Tahunan',
      date: '2025-06-01',
      excerpt: 'Mohon diperhatikan perubahan terbaru dalam kebijakan cuti tahunan perusahaan, efektif mulai 1 Juli 2025.',
      link: '/informasi-perusahaan/kebijakan-cuti',
    },
    {
      id: 2,
      title: 'Event Sosial Perusahaan: Family Gathering 2025',
      date: '2025-05-28',
      excerpt: 'Mari bergabung dalam acara Family Gathering tahunan kita di tanggal 15 Juli 2025. Pendaftaran dibuka!',
      link: '/informasi-perusahaan/event/family-gathering',
    },
  ];

  const quickLinks = [
    { name: 'Sistem Absensi', url: '/hrd/absensi', icon: <FaHistory /> },
    { name: 'Ajukan Cuti', url: '/hrd/cuti/ajukan', icon: <FaCalendarAlt /> },
    { name: 'Manajemen Proyek', url: '/manajemen/proyek', icon: <FaChartBar /> },
    { name: 'Pusat Pengetahuan', url: '/informasi-perusahaan/knowledge-base', icon: <FaBook /> },
    { name: 'Helpdesk IT', url: '/layanan/helpdesk', icon: <FaHeadset /> },
  ];

  const internalSystemStatus = [
    { name: 'Sistem Absensi', status: 'connected', description: 'Normal' },
    { name: 'Sistem Proyek', status: 'disconnected', description: 'Perawatan terjadwal' },
    { name: 'Intranet Perusahaan', status: 'connected', description: 'Normal' },
    { name: 'Sistem Reservasi', status: 'connected', description: 'Normal' },
    { name: 'Sistem Tiketing', status: 'error', description: 'Gangguan minor' },
  ];

  const getSystemStatusIcon = (status) => {
    switch (status) {
      case 'connected': return <FaCheckCircle className="w-4 h-4 text-green-500" />;
      case 'disconnected': return <FaTimesCircle className="w-4 h-4 text-red-500" />;
      case 'connecting': return <FaSpinner className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'error': return <FaTimesCircle className="w-4 h-4 text-yellow-500" />;
      default: return <FaQuestionCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  // Tampilkan loading screen jika user belum dimuat atau statistik dashboard sedang dimuat
  if (!user || loadingDashboardStats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
        <p>Memuat data dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      {/* WhatsApp Connection Status Card */}
      {/* <div className="mb-8 p-6 bg-white rounded-xl shadow-md border-l-4 border-blue-500 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-blue-700 flex items-center gap-2">
            <FaBell className="w-5 h-5 text-blue-500" /> Status Koneksi WhatsApp
          </h2>
          {loadingWhatsApp ? (
            <p className="text-gray-600 mt-2 flex items-center gap-2">
              <FaSpinner className="animate-spin" /> Memuat status...
            </p>
          ) : (
            <>
              <p className="text-gray-600 mt-2">
                Status: <span className={`font-semibold ${whatsAppStatus === 'Connected' ? 'text-green-600' : 'text-red-600'}`}>
                  {whatsAppStatus}
                </span>
              </p>
              {whatsAppStatus === 'Disconnected' && qrCode && (
                <div className="mt-4">
                  <p className="text-red-600 font-medium">Harap scan QR Code ini untuk menghubungkan WhatsApp:</p>
                  <img src={qrCode} alt="QR Code" className="w-32 h-32 mt-2 border border-gray-300 rounded-md" />
                </div>
              )}
            </>
          )}
        </div>
      </div> */}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 mb-10">
        {statsConfig.map((stat) => {
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
                <p className={`text-3xl font-bold mt-2 ${stat.valueColor}`}>
                  {stat.value !== undefined && stat.value !== null ? stat.value : 'N/A'}
                </p>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 flex flex-col gap-8">

          {/* Pengumuman Terbaru */}
          <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
            <h2 className="text-xl font-semibold mb-3 text-primary-dark flex items-center gap-2">
              <FaBullhorn className="w-5 h-5 text-primary" />
              Pengumuman Terbaru
            </h2>
            <ul className="space-y-4">
              {announcements.length > 0 ? (
                announcements.map((announcement) => (
                  <li key={announcement.id} className="pb-2 border-b border-gray-100 last:border-b-0">
                    <a href={announcement.link} className="text-lg font-medium text-blue-700 hover:underline">
                      {announcement.title}
                    </a>
                    <p className="text-gray-600 text-sm mt-1">
                      {announcement.excerpt}
                    </p>
                    <span className="text-gray-400 text-xs">{new Date(announcement.date).toLocaleDateString('id-ID')}</span>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">Tidak ada pengumuman terbaru saat ini.</p>
              )}
                {announcements.length > 0 && (
                <div className="text-right mt-4">
                  <a href="/informasi-perusahaan/pengumuman" className="text-sm text-primary hover:underline">
                    Lihat Semua Pengumuman &rarr;
                  </a>
                </div>
              )}
            </ul>
          </section>

          {/* Recent Activities */}
          <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-accent">
            <h2 className="text-xl font-semibold mb-3 text-accent-dark flex items-center gap-2">
              <FaHistory className="w-5 h-5 text-accent" />
              Aktivitas Terkini
            </h2>
            <ul className="text-gray-600 space-y-3 text-sm">
              {recentActivities.length > 0 ? (
                recentActivities.map((item, idx) => (
                  <li key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-2 border-b border-gray-100 last:border-b-0">
                    <span className="font-medium text-gray-700">{item.activity}</span>
                    <span className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-0">{item.time}</span>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">Tidak ada aktivitas terkini.</p>
              )}
                {recentActivities.length > 0 && (
                <div className="text-right mt-4">
                  <a href="/informasi-perusahaan/aktivitas" className="text-sm text-accent hover:underline">
                    Lihat Semua Aktivitas &rarr;
                  </a>
                </div>
              )}
            </ul>
          </section>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-8">

          {/* Tautan Cepat */}
          <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-secondary">
            <h2 className="text-xl font-semibold mb-3 text-secondary-dark flex items-center gap-2">
              <FaLink className="w-5 h-5 text-secondary" />
              Tautan Cepat
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  className="flex items-center gap-3 p-4 bg-gray-500 bg-opacity-5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <span className="text-gray-600 text-xl">{link.icon}</span>
                  <span className="text-gray-800 font-medium">{link.name}</span>
                </a>
              ))}
            </div>
          </section>

          {/* Status Sistem Internal */}
          <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-500">
            <h2 className="text-xl font-semibold mb-3 text-gray-700 flex items-center gap-2">
              <FaCogs className="w-5 h-5 text-gray-500" />
              Status Sistem Internal
            </h2>
            <ul className="space-y-3 text-sm text-gray-700">
              {internalSystemStatus.map((system, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  {getSystemStatusIcon(system.status)}
                  <span className="font-medium">{system.name}:</span>
                  <span>{system.description}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Kalender Event Perusahaan */}
          <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-accent">
            <h2 className="text-xl font-semibold mb-3 text-accent-dark flex items-center gap-2">
              <FaCalendarAlt className="w-5 h-5 text-accent" />
              Event Perusahaan
            </h2>
            <p className="text-gray-500 text-sm">
              *Akan menampilkan event terdekat atau kalender mini.*
            </p>
            <ul className="text-gray-700 text-sm space-y-2 mt-3">
              <li><span className="font-semibold">15 Jun:</span> Workshop Keamanan Data</li>
              <li><span className="font-semibold">20 Jun:</span> Rapat Triwulan Q2</li>
              <li><span className="font-semibold">05 Jul:</span> Training Produk Baru</li>
            </ul>
            <div className="text-right mt-4">
                <a href="/informasi-perusahaan/kalender" className="text-sm text-accent hover:underline">
                    Lihat Semua Event &rarr;
                </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;