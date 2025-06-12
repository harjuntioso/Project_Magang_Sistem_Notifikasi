import React from 'react';
import {
  FaCalendarAlt,
  FaBullhorn,
  FaHistory,
  FaFileAlt, // Untuk dokumen pengumuman
  FaSearch, // Untuk fitur pencarian
} from 'react-icons/fa';

const ArsipPage = () => {
  // Data dummy untuk arsip pengumuman dan event
  const archivedAnnouncements = [
    { id: 3, title: 'Pembaharuan Prosedur Keamanan', date: '2025-04-15', category: 'Umum' },
    { id: 4, title: 'Hasil Survei Kepuasan Karyawan', date: '2025-03-01', category: 'HRD' },
    // Tambahkan lebih banyak data dummy atau ambil dari API
  ];

  const archivedEvents = [
    { id: 3, title: 'Lomba Olahraga Antar Departemen', date: '2024-12-10', type: 'Sosial' },
    { id: 4, title: 'Webinar Produktivitas Digital', date: '2024-11-20', type: 'Pelatihan' },
    // Tambahkan lebih banyak data dummy atau ambil dari API
  ];

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-warning-dark mb-8 flex items-center gap-3">
        <FaHistory className="w-8 h-8 text-warning" />
        Arsip Pengumuman & Event
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Telusuri kembali pengumuman penting dan event perusahaan yang telah berlalu.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Card: Arsip Pengumuman Perusahaan */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-warning">
          <h2 className="text-xl font-semibold mb-4 text-warning-dark flex items-center gap-2">
            <FaBullhorn className="w-5 h-5 text-warning" />
            Arsip Pengumuman Perusahaan
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Cari pengumuman..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-warning focus:border-warning"
            />
            <ul className="space-y-2 text-gray-700">
              {archivedAnnouncements.map(ann => (
                <li key={ann.id} className="flex flex-col border-b border-gray-100 pb-2 last:border-b-0">
                  <a href={`/informasi/pengumuman/detail/${ann.id}`} className="font-medium text-blue-700 hover:underline">{ann.title}</a>
                  <span className="text-gray-500 text-xs mt-1">{new Date(ann.date).toLocaleDateString('id-ID')} | {ann.category}</span>
                </li>
              ))}
            </ul>
            <div className="text-right mt-4">
              <a href="/informasi/pengumuman/semua" className="text-sm text-warning hover:underline">Lihat Semua Pengumuman &rarr;</a>
            </div>
          </div>
        </section>

        {/* Card: Kalender & Arsip Event */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
          <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
            <FaCalendarAlt className="w-5 h-5 text-primary" />
            Kalender & Arsip Event
          </h2>
          <div className="space-y-4">
            <p className="text-gray-500 text-sm">*Akan menampilkan kalender interaktif atau daftar event.</p>
            <ul className="space-y-2 text-gray-700 mt-3">
              {archivedEvents.map(event => (
                <li key={event.id} className="flex flex-col border-b border-gray-100 pb-2 last:border-b-0">
                  <a href={`/informasi/event/detail/${event.id}`} className="font-medium text-blue-700 hover:underline">{event.title}</a>
                  <span className="text-gray-500 text-xs mt-1">{new Date(event.date).toLocaleDateString('id-ID')} | {event.type}</span>
                </li>
              ))}
            </ul>
            <div className="text-right mt-4">
              <a href="/informasi/kalender/semua" className="text-sm text-primary hover:underline">Lihat Semua Event &rarr;</a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ArsipPage;