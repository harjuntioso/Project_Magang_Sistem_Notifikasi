import React, { useState } from 'react';
import {
  FaFileAlt,      // Ikon utama untuk dokumen
  FaSearch,       // Cari
  FaFilter,       // Filter
  FaFileDownload, // Unduh
  FaCalendarAlt,  // Tanggal
  FaTag,          // Kategori
  FaGlobe,        // Terpublikasi
  FaPlusCircle,   // Buat baru
} from 'react-icons/fa';

const PressReleaseArchivePage = () => {
  const [pressReleases, setPressReleases] = useState([
    // Data dummy press release
    { id: 'PR001', title: 'Pembukaan Wahana Baru "Petualangan Angkasa"', date: '2025-06-01', category: 'Wahana Baru', status: 'Published', link: '/pr/release/wahana-angkasa.pdf' },
    { id: 'PR002', title: 'Laporan CSR Tahunan Perusahaan', date: '2025-05-10', category: 'CSR', status: 'Published', link: '/pr/release/csr-report.pdf' },
    { id: 'PR003', title: 'Peningkatan Protokol Keamanan di Taman Hiburan', date: '2025-04-20', category: 'Keamanan', status: 'Published', link: '/pr/release/keamanan.pdf' },
    { id: 'PR004', title: 'Kolaborasi dengan Brand X untuk Event Musim Panas', date: '2025-03-15', category: 'Event', status: 'Published', link: '/pr/release/event-musim-panas.pdf' },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua');

  const filteredPressReleases = pressReleases.filter(pr =>
    (filterCategory === 'Semua' || pr.category === filterCategory) &&
    (pr.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-8 flex items-center gap-3">
        <FaFileAlt className="w-8 h-8 text-green-500" />
        Arsip Press Release
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Telusuri dan unduh semua *press release* yang telah diterbitkan oleh perusahaan.
      </p>

      {/* Filter dan Aksi Cepat */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-green-500">
        <h2 className="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2">
          <FaSearch className="w-5 h-5 text-green-500" />
          Filter & Aksi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label htmlFor="search-pr" className="block text-gray-700 font-medium mb-1">Cari Press Release</label>
            <input
              type="text"
              id="search-pr"
              placeholder="Judul Press Release..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-category" className="block text-gray-700 font-medium mb-1">Kategori</label>
            <select
              id="filter-category"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="Semua">Semua Kategori</option>
              <option value="Wahana Baru">Wahana Baru</option>
              <option value="CSR">CSR</option>
              <option value="Keamanan">Keamanan</option>
              <option value="Event">Event</option>
              {/* Tambahkan kategori lain sesuai kebutuhan */}
            </select>
          </div>
          <a href="/management/pemasaran/pr/buat-press-release" className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center justify-center gap-2">
            <FaPlusCircle className="w-4 h-4" /> Buat PR Baru
          </a>
        </div>
      </section>

      {/* Tabel Daftar Press Release */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaGlobe className="w-5 h-5 text-primary" />
          Daftar Press Release ({filteredPressReleases.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Judul</th>
                <th className="py-3 px-6 text-left">Tanggal</th>
                <th className="py-3 px-6 text-left">Kategori</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredPressReleases.length > 0 ? (
                filteredPressReleases.map((pr) => (
                  <tr key={pr.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{pr.title}</td>
                    <td className="py-3 px-6 text-left">{pr.date}</td>
                    <td className="py-3 px-6 text-left flex items-center gap-2"><FaTag className="text-xs text-gray-500" />{pr.category}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${
                        pr.status === 'Published' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'
                      }`}>
                        {pr.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <a href={pr.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 text-lg" title="Unduh">
                        <FaFileDownload />
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">Tidak ada press release ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default PressReleaseArchivePage;