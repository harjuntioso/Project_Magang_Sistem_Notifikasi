import { useState, useEffect } from 'react';
import { checkWhatsAppStatus } from '../../axiosClient';
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
  FaClipboardList, // Baru: untuk dokumen/cuti menunggu
  FaCheckCircle,   // Baru: untuk status sistem normal
  FaTimesCircle,   // Baru: untuk status sistem error
  FaSpinner,       // Baru: untuk loading status sistem
  FaTasks,         // Baru: untuk tugas mendatang
  FaUserCheck,     // Baru: untuk karyawan hadir
  FaMoneyBillWave, // Baru: untuk pengajuan biaya
  FaQuestionCircle,
} from 'react-icons/fa';

// Data Dummy (Diperbarui dengan Stat Cards baru)
const stats = [
  {
    title: 'Pengguna Online',
    value: 5, // Data ini harus diambil secara dinamis
    icon: <FaUserFriends className="w-6 h-6 text-primary" />,
    border: 'border-primary',
    text: 'text-primary-dark',
    valueColor: 'text-primary',
    bg: 'bg-primary-light',
  },
  {
    title: 'Notifikasi Baru',
    value: 2, // Data ini harus diambil secara dinamis
    icon: <FaBell className="w-6 h-6 text-accent" />,
    border: 'border-accent',
    text: 'text-accent-dark',
    valueColor: 'text-accent',
    bg: 'bg-accent-light',
  },
  {
    title: 'Tiket Helpdesk Terbuka',
    value: 7, // Data ini harus diambil secara dinamis
    icon: <FaHeadset className="w-6 h-6 text-orange-500" />, // Menggunakan warna baru untuk 'warning'
    border: 'border-orange-500',
    text: 'text-orange-700',
    valueColor: 'text-orange-500',
    bg: 'bg-orange-100',
  },
  // {
  //   title: 'Pengajuan Cuti Menunggu',
  //   value: 3, // Data ini harus diambil secara dinamis
  //   icon: <FaCalendarAlt className="w-6 h-6 text-cyan-500" />, // Menggunakan warna baru untuk 'info'
  //   border: 'border-cyan-500',
  //   text: 'text-cyan-700',
  //   valueColor: 'text-cyan-500',
  //   bg: 'bg-cyan-100',
  // },
  {
    title: 'Dokumen Menunggu Persetujuan',
    value: 4, // Data ini harus diambil secara dinamis
    icon: <FaClipboardList className="w-6 h-6 text-indigo-500" />,
    border: 'border-indigo-500',
    text: 'text-indigo-700',
    valueColor: 'text-indigo-500',
    bg: 'bg-indigo-100',
  },
  {
    title: 'Karyawan Hadir Hari Ini',
    value: 120, // Data ini harus diambil secara dinamis dari sistem absensi
    icon: <FaUserCheck className="w-6 h-6 text-green-600" />,
    border: 'border-green-600',
    text: 'text-green-800',
    valueColor: 'text-green-600',
    bg: 'bg-green-100',
  },
  {
    title: 'Tugas Mendatang (3 Hari)',
    value: 8, // Data ini harus diambil secara dinamis dari sistem manajemen proyek
    icon: <FaTasks className="w-6 h-6 text-red-500" />,
    border: 'border-red-500',
    text: 'text-red-700',
    valueColor: 'text-red-500',
    bg: 'bg-red-100',
  },
  // {
  //   title: 'Pengajuan Biaya Menunggu',
  //   value: 6, // Data ini harus diambil secara dinamis dari sistem keuangan
  //   icon: <FaMoneyBillWave className="w-6 h-6 text-purple-500" />,
  //   border: 'border-purple-500',
  //   text: 'text-purple-700',
  //   valueColor: 'text-purple-500',
  //   bg: 'bg-purple-100',
  // },
];

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

// Dummy data untuk status sistem internal lainnya
const internalSystemStatus = [
  { name: 'Sistem Absensi', status: 'connected', description: 'Normal' },
  { name: 'Sistem Proyek', status: 'disconnected', description: 'Perawatan terjadwal' },
  { name: 'Intranet Perusahaan', status: 'connected', description: 'Normal' },
  { name: 'Sistem Reservasi', status: 'connected', description: 'Normal' }, // Contoh untuk tempat hiburan
  { name: 'Sistem Tiketing', status: 'error', description: 'Gangguan minor' }, // Contoh lain
];


const Dashboard = () => {
  const [whatsAppStatus, setWhatsAppStatus] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [loadingWhatsApp, setLoadingWhatsApp] = useState(true);

  useEffect(() => {
    const fetchWhatsAppConnectionStatus = async () => {
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
    // Refresh status setiap 15 detik
    const interval = setInterval(fetchWhatsAppConnectionStatus, 15000);

    return () => clearInterval(interval);
  }, []);

  // Fungsi untuk mendapatkan icon status sistem
  const getSystemStatusIcon = (status) => {
    switch (status) {
      case 'connected':
        return <FaCheckCircle className="w-4 h-4 text-green-500" />;
      case 'disconnected':
        return <FaTimesCircle className="w-4 h-4 text-red-500" />;
      case 'connecting':
        return <FaSpinner className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'error':
        return <FaTimesCircle className="w-4 h-4 text-yellow-500" />; // Ganti icon error untuk minor
      default:
        return <FaQuestionCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
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
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 flex flex-col gap-8">

          {/* System Overview - Status WhatsApp dan Sistem Internal Lainnya */}
          {/* <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-info">
            <h2 className="text-xl font-semibold mb-3 text-info-dark flex items-center gap-2">
              <FaChartBar className="w-5 h-5 text-info" />
              Ringkasan Sistem
            </h2>
            <div className="flex flex-col md:flex-row gap-6 items-center mb-6 pb-6 border-b border-gray-100">
              <div className="flex-1">
                <p className="text-gray-600 text-lg">
                  Status Koneksi WhatsApp:{' '}
                  <span className={`font-semibold ${whatsAppStatus === 'connected' ? 'text-green-500' : 'text-red-500'}`}>
                    {loadingWhatsApp ? 'Memuat...' : whatsAppStatus || 'Tidak Diketahui'}
                  </span>
                </p>
                {whatsAppStatus === 'disconnected' && qrCode && (
                  <div className="mt-4 p-4 bg-red-50 rounded-lg text-red-700 text-sm">
                    <p className="font-semibold mb-2">Perhatian: WhatsApp terputus.</p>
                    <p>Harap pindai QR Code di bawah untuk menghubungkan kembali:</p>
                    <img src={qrCode} alt="WhatsApp QR Code" className="w-40 h-40 mx-auto mt-3 border border-gray-300" />
                  </div>
                )}
                {whatsAppStatus === 'connecting' && (
                  <p className="mt-2 text-info">Sedang mencoba menghubungkan kembali...</p>
                )}
                <p className="text-gray-500 text-sm mt-3">
                  Terakhir diperiksa:{' '}
                  <span className="font-mono text-gray-400">
                    {new Date().toLocaleTimeString('id-ID')}
                  </span>
                </p>
              </div>
              <div className="md:w-1/4 flex items-center justify-center">
                <FaCogs className="w-20 h-20 text-gray-200" />
              </div>
            </div> */}
            {/* Status Sistem Internal Lainnya */}
            {/* <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Status Sistem Internal Lainnya:</h3>
                <ul className="space-y-2">
                    {internalSystemStatus.map((system, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                            {getSystemStatusIcon(system.status)}
                            <span className="font-medium text-gray-700">{system.name}:</span>
                            <span className={`font-semibold ${system.status === 'connected' ? 'text-green-500' : system.status === 'disconnected' ? 'text-red-500' : 'text-yellow-500'}`}>
                                {system.status === 'connected' ? 'Normal' : system.status === 'disconnected' ? 'Terputus' : 'Perhatian'}
                            </span>
                            <span className="text-gray-500 text-sm">({system.description})</span>
                        </li>
                    ))}
                </ul>
            </div>
          </section> */}

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