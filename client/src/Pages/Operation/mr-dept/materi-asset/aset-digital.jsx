import React, { useState } from 'react';
import {
  FaBook,             // Ikon utama untuk perpustakaan
  FaSearch,           // Cari
  FaFilter,           // Filter
  FaFileImage,        // Gambar
  FaFileVideo,        // Video
  FaFilePdf,          // Dokumen PDF
  FaFileWord,         // Dokumen Word
  FaFilePowerpoint,   // Dokumen PowerPoint
  FaDownload,         // Unduh
  FaPlusCircle,       // Tambah aset baru
  FaFileAlt
} from 'react-icons/fa';

const DigitalAssetLibraryPage = () => {
  const [assets, setAssets] = useState([
    // Data dummy aset digital
    { id: 'AST001', name: 'Logo Perusahaan (Vector)', type: 'Gambar', format: 'SVG', size: '2 MB', lastUpdated: '2025-01-10', tags: ['logo', 'brand'], link: '/assets/logo.svg' },
    { id: 'AST002', name: 'Video Promosi Taman Hiburan', type: 'Video', format: 'MP4', size: '50 MB', lastUpdated: '2025-05-20', tags: ['video', 'promosi'], link: '/assets/promo_video.mp4' },
    { id: 'AST003', name: 'Brosur Paket Keluarga 2025', type: 'Dokumen', format: 'PDF', size: '3 MB', lastUpdated: '2025-04-01', tags: ['brosur', 'paket'], link: '/assets/brosur_keluarga.pdf' },
    { id: 'AST004', name: 'Template Presentasi Branding', type: 'Dokumen', format: 'PPTX', size: '10 MB', lastUpdated: '2024-11-15', tags: ['template', 'presentasi'], link: '/assets/template_pptx.pptx' },
    { id: 'AST005', name: 'Foto Atraksi Utama (HD)', type: 'Gambar', format: 'JPG', size: '8 MB', lastUpdated: '2025-03-05', tags: ['foto', 'atraksi'], link: '/assets/atraksi_utama.jpg' },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('Semua');
  const [filterFormat, setFilterFormat] = useState('Semua');

  const filteredAssets = assets.filter(asset =>
    (filterType === 'Semua' || asset.type === filterType) &&
    (filterFormat === 'Semua' || asset.format.toLowerCase() === filterFormat.toLowerCase()) &&
    (asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     asset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const getFileIcon = (format) => {
    switch (format.toLowerCase()) {
      case 'jpg':
      case 'png':
      case 'jpeg':
      case 'svg': return <FaFileImage className="text-blue-500" />;
      case 'mp4':
      case 'mov':
      case 'avi': return <FaFileVideo className="text-red-500" />;
      case 'pdf': return <FaFilePdf className="text-red-700" />;
      case 'docx':
      case 'doc': return <FaFileWord className="text-blue-700" />;
      case 'pptx':
      case 'ppt': return <FaFilePowerpoint className="text-orange-700" />;
      default: return <FaFileAlt className="text-gray-500" />;
    }
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-700 mb-8 flex items-center gap-3">
        <FaBook className="w-8 h-8 text-purple-500" />
        Perpustakaan Aset Digital
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Akses semua aset digital pemasaran dan promosi, termasuk gambar, video, dan dokumen.
      </p>

      {/* Filter dan Aksi Cepat */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-purple-500">
        <h2 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-purple-500" />
          Filter Aset
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="search-asset" className="block text-gray-700 font-medium mb-1">Cari Aset</label>
            <input
              type="text"
              id="search-asset"
              placeholder="Nama atau Tag Aset..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-type" className="block text-gray-700 font-medium mb-1">Jenis Aset</label>
            <select
              id="filter-type"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="Semua">Semua Jenis</option>
              <option value="Gambar">Gambar</option>
              <option value="Video">Video</option>
              <option value="Dokumen">Dokumen</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-format" className="block text-gray-700 font-medium mb-1">Format</label>
            <select
              id="filter-format"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              value={filterFormat}
              onChange={(e) => setFilterFormat(e.target.value)}
            >
              <option value="Semua">Semua Format</option>
              <option value="JPG">JPG</option>
              <option value="PNG">PNG</option>
              <option value="SVG">SVG</option>
              <option value="MP4">MP4</option>
              <option value="PDF">PDF</option>
              <option value="PPTX">PPTX</option>
              <option value="DOCX">DOCX</option>
            </select>
          </div>
          <a href="/management/pemasaran/materi/unggah" className="px-6 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors duration-200 flex items-center justify-center gap-2">
            <FaPlusCircle className="w-4 h-4" /> Unggah Aset
          </a>
        </div>
      </section>

      {/* Tabel Daftar Aset */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaBook className="w-5 h-5 text-primary" />
          Daftar Aset ({filteredAssets.length} item)
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nama Aset</th>
                <th className="py-3 px-6 text-left">Jenis</th>
                <th className="py-3 px-6 text-left">Format</th>
                <th className="py-3 px-6 text-left">Ukuran</th>
                <th className="py-3 px-6 text-left">Terakhir Diperbarui</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredAssets.length > 0 ? (
                filteredAssets.map((asset) => (
                  <tr key={asset.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{asset.name}</td>
                    <td className="py-3 px-6 text-left flex items-center gap-2">
                      {getFileIcon(asset.format)} {asset.type}
                    </td>
                    <td className="py-3 px-6 text-left">{asset.format}</td>
                    <td className="py-3 px-6 text-left">{asset.size}</td>
                    <td className="py-3 px-6 text-left">{asset.lastUpdated}</td>
                    <td className="py-3 px-6 text-center">
                      <a href={asset.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 text-lg" title="Unduh Aset">
                        <FaDownload />
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 text-center text-gray-500">Tidak ada aset digital ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DigitalAssetLibraryPage;