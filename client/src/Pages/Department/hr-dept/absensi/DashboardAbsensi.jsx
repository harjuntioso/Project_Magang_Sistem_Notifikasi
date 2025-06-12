import React from 'react';
import {
  FaCalendarAlt,    // Icon utama untuk absensi
  FaChartLine,      // Dashboard/Analisis
  FaUsers,          // Karyawan
  FaUserCheck,      // Hadir
  FaUserTimes,      // Tidak Hadir
  FaClock,          // Waktu
  FaMapMarkerAlt,   // Lokasi
  FaPercentage,     // Persentase
} from 'react-icons/fa';

const AbsensiDashboardPage = () => {
  // Data Dummy untuk Dashboard Absensi
  const totalKaryawan = 150;
  const hadirHariIni = 140;
  const tidakHadirHariIni = 10;
  const persentaseKehadiran = ((hadirHariIni / totalKaryawan) * 100).toFixed(1);
  const rataRataTerlambat = '15 menit';
  const karyawanTerlambat = 5;

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-primary-dark mb-8 flex items-center gap-3">
        <FaChartLine className="w-8 h-8 text-primary" />
        Dashboard Absensi Karyawan
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Lihat ringkasan dan analisis data kehadiran karyawan secara *real-time*.
      </p>

      {/* Stat Cards untuk Dashboard Absensi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Total Karyawan */}
        <div className="rounded-xl shadow-md p-5 flex flex-col items-center justify-center text-center border-t-4 border-primary bg-primary-light">
          <div className="mb-2"><FaUsers className="w-6 h-6 text-primary" /></div>
          <h2 className="text-base font-semibold text-primary-dark">Total Karyawan</h2>
          <p className="text-3xl font-bold mt-2 text-primary">{totalKaryawan}</p>
        </div>
        {/* Hadir Hari Ini */}
        <div className="rounded-xl shadow-md p-5 flex flex-col items-center justify-center text-center border-t-4 border-green-500 bg-green-100">
          <div className="mb-2"><FaUserCheck className="w-6 h-6 text-green-500" /></div>
          <h2 className="text-base font-semibold text-green-700">Hadir Hari Ini</h2>
          <p className="text-3xl font-bold mt-2 text-green-500">{hadirHariIni}</p>
        </div>
        {/* Tidak Hadir Hari Ini */}
        <div className="rounded-xl shadow-md p-5 flex flex-col items-center justify-center text-center border-t-4 border-red-500 bg-red-100">
          <div className="mb-2"><FaUserTimes className="w-6 h-6 text-red-500" /></div>
          <h2 className="text-base font-semibold text-red-700">Tidak Hadir Hari Ini</h2>
          <p className="text-3xl font-bold mt-2 text-red-500">{tidakHadirHariIni}</p>
        </div>
        {/* Persentase Kehadiran */}
        <div className="rounded-xl shadow-md p-5 flex flex-col items-center justify-center text-center border-t-4 border-blue-500 bg-blue-100">
          <div className="mb-2"><FaPercentage className="w-6 h-6 text-blue-500" /></div>
          <h2 className="text-base font-semibold text-blue-700">Persentase Kehadiran</h2>
          <p className="text-3xl font-bold mt-2 text-blue-500">{persentaseKehadiran}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Card: Kinerja Kehadiran */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-accent">
          <h2 className="text-xl font-semibold mb-4 text-accent-dark flex items-center gap-2">
            <FaChartLine className="w-5 h-5 text-accent" />
            Kinerja Kehadiran
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li><span className="font-semibold">Karyawan Terlambat Hari Ini:</span> {karyawanTerlambat} Orang</li>
            <li><span className="font-semibold">Rata-rata Keterlambatan:</span> {rataRataTerlambat}</li>
            <li><span className="font-semibold">Absen Tanpa Keterangan (Minggu Ini):</span> 2 Kasus</li>
          </ul>
          <div className="text-right mt-4">
            <a href="/management/hrd/absensi/laporan" className="text-sm text-accent hover:underline">
              Lihat Laporan Lebih Detail &rarr;
            </a>
          </div>
        </section>

        {/* Card: Peta Kehadiran Karyawan (Placeholder) */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-info">
          <h2 className="text-xl font-semibold mb-4 text-info-dark flex items-center gap-2">
            <FaMapMarkerAlt className="w-5 h-5 text-info" />
            Peta Kehadiran Karyawan
          </h2>
          <div className="text-gray-500 text-sm">
            <p>*Area ini akan menampilkan visualisasi peta atau denah kantor dengan lokasi *check-in* karyawan (jika sistem mendukung).</p>
            <div className="bg-gray-100 h-40 flex items-center justify-center text-gray-400 rounded-lg mt-3">
              [Visualisasi Peta atau Denah]
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AbsensiDashboardPage;