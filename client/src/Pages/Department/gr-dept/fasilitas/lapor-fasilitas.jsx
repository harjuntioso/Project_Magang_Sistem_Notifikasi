import React, { useState } from 'react';
import {
  FaExclamationTriangle, // Ikon utama
  FaSave,                // Simpan
  FaTimes,               // Batal
  FaInfoCircle,          // Informasi umum
  FaPaperclip,           // Lampiran
  FaBuilding,            // Lokasi
  FaTools,               // Jenis masalah
  FaUser,                // Pelapor
} from 'react-icons/fa';

const ReportFacilityIssuePage = () => {
  const [formData, setFormData] = useState({
    issueTitle: '',
    location: '', // e.g., "Lantai 2, Ruang Meeting Utama", "Toilet Wanita Lantai 1", "Area Parkir"
    issueType: '', // e.g., "Kerusakan Fisik", "Kebersihan", "Listrik/Air", "Pendingin Ruangan"
    description: '',
    urgency: 'Normal',
    reportedBy: '', // Bisa pre-filled
    reporterContact: '', // Email/Telepon pelapor
    attachments: [],
    notes: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, attachments: Array.from(e.target.files) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Laporan kerusakan fasilitas berhasil dikirim!');
    console.log('Data Laporan Kerusakan:', formData);
    // Logika untuk mengirim data ke backend (termasuk file lampiran)
    // Setelah berhasil, reset form atau arahkan ke halaman riwayat laporan
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-red-700 mb-8 flex items-center gap-3">
        <FaExclamationTriangle className="w-8 h-8 text-red-500" />
        Lapor Kerusakan Fasilitas
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Gunakan formulir ini untuk melaporkan kerusakan atau masalah pada fasilitas kantor.
      </p>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
        <h2 className="text-xl font-semibold mb-4 text-red-700 flex items-center gap-2">
          <FaInfoCircle className="w-5 h-5 text-red-500" />
          Detail Masalah
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="issueTitle" className="block text-gray-700 font-medium mb-1">Judul Masalah <span className="text-red-500">*</span></label>
            <input type="text" id="issueTitle" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" value={formData.issueTitle} onChange={handleChange} required />
            <p className="text-gray-500 text-sm mt-1">Contoh: "AC Ruang Rapat tidak dingin", "Toilet tersumbat".</p>
          </div>
          <div>
            <label htmlFor="location" className="block text-gray-700 font-medium mb-1">Lokasi Masalah <span className="text-red-500">*</span></label>
            <input type="text" id="location" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" value={formData.location} onChange={handleChange} required />
            <p className="text-gray-500 text-sm mt-1">Contoh: "Lantai 2, Ruang HRD", "Area Parkir Motor".</p>
          </div>
          <div>
            <label htmlFor="issueType" className="block text-gray-700 font-medium mb-1">Jenis Masalah <span className="text-red-500">*</span></label>
            <select id="issueType" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" value={formData.issueType} onChange={handleChange} required>
              <option value="">Pilih Jenis Masalah</option>
              <option value="Kerusakan Fisik">Kerusakan Fisik (Meja, Kursi, Dinding)</option>
              <option value="Kebersihan">Kebersihan</option>
              <option value="Listrik/Air">Listrik/Air</option>
              <option value="Pendingin Ruangan">Pendingin Ruangan (AC)</option>
              <option value="Perlengkapan Kantor">Perlengkapan Kantor (Proyektor, Whiteboard)</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
          <div>
            <label htmlFor="urgency" className="block text-gray-700 font-medium mb-1">Tingkat Urgensi</label>
            <select id="urgency" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" value={formData.urgency} onChange={handleChange}>
              <option value="Normal">Normal</option>
              <option value="Medium">Medium</option>
              <option value="High">Tinggi (Mendesak)</option>
              <option value="Critical">Sangat Kritis (Bahaya)</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-1">Deskripsi Lengkap Masalah <span className="text-red-500">*</span></label>
            <textarea id="description" rows="4" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" value={formData.description} onChange={handleChange} required></textarea>
            <p className="text-gray-500 text-sm mt-1">Jelaskan masalah secara rinci, termasuk kapan dan bagaimana terjadi.</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2 border-t pt-6 mt-6">
          <FaUser className="w-5 h-5 text-primary" />
          Informasi Pelapor
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="reportedBy" className="block text-gray-700 font-medium mb-1">Nama Pelapor <span className="text-red-500">*</span></label>
            <input type="text" id="reportedBy" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" value={formData.reportedBy} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="reporterContact" className="block text-gray-700 font-medium mb-1">Kontak Pelapor (Email/Telepon) <span className="text-red-500">*</span></label>
            <input type="text" id="reporterContact" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" value={formData.reporterContact} onChange={handleChange} required />
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-secondary-dark flex items-center gap-2 border-t pt-6 mt-6">
          <FaPaperclip className="w-5 h-5 text-secondary" />
          Lampiran & Catatan Tambahan
        </h2>
        <div className="mb-6">
          <label htmlFor="attachments" className="block text-gray-700 font-medium mb-1">Lampiran (Foto/Video)</label>
          <input type="file" id="attachments" multiple className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary" onChange={handleFileChange} />
          <p className="text-gray-500 text-sm mt-1">Unggah foto atau video kerusakan untuk membantu tim fasilitas.</p>
          {formData.attachments.length > 0 && (
            <div className="mt-2 text-gray-600 text-sm">
              File terlampir: {formData.attachments.map(file => file.name).join(', ')}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="notes" className="block text-gray-700 font-medium mb-1">Catatan Tambahan (Opsional)</label>
          <textarea id="notes" rows="3" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary" value={formData.notes} onChange={handleChange}></textarea>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-4 mt-8">
          <button type="button" onClick={() => alert('Batal melaporkan kerusakan.')} className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-200 flex items-center gap-2">
            <FaTimes className="w-4 h-4" /> Batal
          </button>
          <button type="submit" className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 flex items-center gap-2">
            <FaSave className="w-4 h-4" /> Laporkan Kerusakan
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportFacilityIssuePage;