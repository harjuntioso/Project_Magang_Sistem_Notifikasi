import React, { useState, useEffect } from 'react';
import {
  FaCalendarAlt,    // Ikon utama untuk kalender cuti
  FaCalendar,       // Ikon untuk kalender itu sendiri
  FaUserFriends,    // Untuk daftar cuti per karyawan
  FaInfoCircle,     // Untuk detail event
  FaFilter,         // Untuk filter
  FaList,           // Untuk daftar event
  FaSearch,         // Untuk pencarian
  FaChartBar
} from 'react-icons/fa';

// Anda akan mengimpor komponen kalender dari library yang Anda gunakan
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const KalenderCutiPage = () => {
  // Data dummy untuk daftar cuti.
  // Dalam aplikasi nyata, ini akan diambil dari API.
  const [cutiEvents, setCutiEvents] = useState([
    {
      id: 1,
      title: 'Cuti Tahunan - Budi S.',
      start: new Date(2025, 6, 1), // Bulan Juli (0-indexed)
      end: new Date(2025, 6, 5),
      allDay: true,
      resource: { karyawanId: 'KS001', jenisCuti: 'Tahunan' },
    },
    {
      id: 2,
      title: 'Cuti Sakit - Siti N.',
      start: new Date(2025, 6, 10),
      end: new Date(2025, 6, 10),
      allDay: true,
      resource: { karyawanId: 'SN002', jenisCuti: 'Sakit' },
    },
    {
      id: 3,
      title: 'Cuti Melahirkan - Ayu L.',
      start: new Date(2025, 7, 1), // Bulan Agustus
      end: new Date(2025, 9, 30), // Hingga Oktober
      allDay: true,
      resource: { karyawanId: 'AL003', jenisCuti: 'Melahirkan' },
    },
    // ... Tambahkan lebih banyak event cuti
  ]);

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [filterKaryawan, setFilterKaryawan] = useState('');
  const [filterJenisCuti, setFilterJenisCuti] = useState('Semua');

  useEffect(() => {
    // Filter event yang akan datang (contoh: dalam 30 hari ke depan)
    const today = new Date();
    const thirtyDaysLater = new Date();
    thirtyDaysLater.setDate(today.getDate() + 30);

    const filteredUpcoming = cutiEvents.filter(event =>
      new Date(event.start) >= today && new Date(event.start) <= thirtyDaysLater
    ).sort((a, b) => new Date(a.start) - new Date(b.start)); // Urutkan berdasarkan tanggal

    setUpcomingEvents(filteredUpcoming);
  }, [cutiEvents]); // Re-run effect jika cutiEvents berubah

  const handleEventClick = (event) => {
    alert(`Detail Cuti: ${event.title}\nDari: ${event.start.toLocaleDateString()}\nHingga: ${event.end.toLocaleDateString()}\nJenis: ${event.resource.jenisCuti}`);
    // Di sini Anda bisa membuka modal dengan detail lebih lanjut tentang event cuti
  };

  const handleFilterChange = () => {
    // Logika untuk memfilter cutiEvents yang ditampilkan di kalender/daftar
    // Ini akan memanggil API atau memfilter state cutiEvents lokal
    console.log(`Filter diterapkan: Karyawan: ${filterKaryawan}, Jenis Cuti: ${filterJenisCuti}`);
    // Di aplikasi nyata, Anda akan memuat ulang events kalender berdasarkan filter ini
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-info-dark mb-8 flex items-center gap-3">
        <FaCalendarAlt className="w-8 h-8 text-info" />
        Kalender Cuti Terencana Karyawan
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Lihat jadwal cuti seluruh karyawan untuk perencanaan sumber daya yang lebih efektif antar departemen.
      </p>

      {/* Bagian Filter */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-info">
        <h2 className="text-xl font-semibold mb-4 text-info-dark flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-info" />
          Filter Kalender Cuti
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label htmlFor="filter-karyawan" className="block text-gray-700 font-medium mb-1">Cari Karyawan</label>
            <input
              type="text"
              id="filter-karyawan"
              placeholder="Nama Karyawan..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-info focus:border-info"
              value={filterKaryawan}
              onChange={(e) => setFilterKaryawan(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-jenis-cuti" className="block text-gray-700 font-medium mb-1">Jenis Cuti</label>
            <select
              id="filter-jenis-cuti"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-info focus:border-info"
              value={filterJenisCuti}
              onChange={(e) => setFilterJenisCuti(e.target.value)}
            >
              <option value="Semua">Semua Jenis Cuti</option>
              <option value="Tahunan">Cuti Tahunan</option>
              <option value="Sakit">Cuti Sakit</option>
              <option value="Melahirkan">Cuti Melahirkan</option>
              {/* Tambahkan jenis cuti lain sesuai kebutuhan */}
            </select>
          </div>
          <button
            onClick={handleFilterChange}
            className="px-6 py-2 bg-info text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <FaSearch className="w-4 h-4" /> Terapkan Filter
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Bagian Kalender Interaktif */}
        <section className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
          <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
            <FaCalendar className="w-5 h-5 text-primary" />
            Kalender Utama
          </h2>
          <div style={{ height: 600 }}> {/* Tinggi ini penting untuk komponen kalender */}
            {/* Ini adalah placeholder untuk komponen kalender yang sebenarnya */}
            <div className="bg-gray-100 h-full flex items-center justify-center text-gray-400 rounded-lg text-center p-4">
              <p>
                [Komponen Kalender Interaktif seperti **React Big Calendar** atau **FullCalendar** akan muncul di sini.]
                <br />
                Anda perlu menginstal dan mengintegrasikan *library* kalender pilihan Anda.
                <br />
                Contoh: `<Calendar localizer={localizer} events={cutiEvents} startAccessor="start" endAccessor="end" style={{ height: 500 }} onSelectEvent={handleEventClick} />`
              </p>
            </div>
          </div>
        </section>

        {/* Bagian Event Cuti Mendatang */}
        <section className="lg:col-span-1 bg-white rounded-xl shadow-md p-6 border-l-4 border-accent">
          <h2 className="text-xl font-semibold mb-4 text-accent-dark flex items-center gap-2">
            <FaList className="w-5 h-5 text-accent" />
            Cuti Mendatang (30 Hari)
          </h2>
          <ul className="space-y-4 text-gray-700">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map(event => (
                <li key={event.id} className="pb-2 border-b border-gray-100 last:border-b-0">
                  <div className="font-semibold text-lg">{event.title}</div>
                  <div className="text-gray-600 text-sm">
                    {event.start.toLocaleDateString('id-ID')} {event.start.toLocaleDateString() !== event.end.toLocaleDateString() && ` - ${event.end.toLocaleDateString('id-ID')}`}
                  </div>
                  <div className="text-gray-500 text-xs">Jenis: {event.resource.jenisCuti}</div>
                  {/* <button onClick={() => handleEventClick(event)} className="text-blue-500 text-sm hover:underline mt-1">Lihat Detail</button> */}
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-sm">Tidak ada event cuti dalam 30 hari ke depan.</p>
            )}
          </ul>
        </section>

      </div>

      {/* Bagian Statistik Ringkas (Opsional) */}
      <section className="bg-white rounded-xl shadow-md p-6 mt-8 border-l-4 border-secondary">
        <h2 className="text-xl font-semibold mb-4 text-secondary-dark flex items-center gap-2">
          <FaChartBar className="w-5 h-5 text-secondary" />
          Statistik Cuti
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-gray-500 text-sm">Total Cuti Terencana (Bulan Ini)</p>
            <p className="text-2xl font-bold text-secondary">5</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Rata-rata Cuti per Karyawan</p>
            <p className="text-2xl font-bold text-secondary">1.2 hari</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Cuti Tahunan Terbanyak</p>
            <p className="text-2xl font-bold text-secondary">10 hari</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Jumlah Karyawan Cuti Bersamaan</p>
            <p className="text-2xl font-bold text-secondary">3</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default KalenderCutiPage;