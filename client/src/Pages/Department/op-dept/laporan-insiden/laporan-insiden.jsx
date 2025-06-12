import React, { useState } from 'react';
import {
  FaExclamationTriangle, // Ikon utama
  FaSave,                // Simpan
  FaTimes,               // Batal
  FaInfoCircle,          // Informasi umum
  FaPaperclip,           // Lampiran
  FaMapMarkerAlt,        // Lokasi
  FaCalendarAlt,         // Tanggal/Waktu
  FaUser,                // Pelapor
  FaClipboardList,       // Detail
} from 'react-icons/fa';

const ReportNewIncidentPage = () => {
  const [formData, setFormData] = useState({
    incidentTitle: '',
    incidentType: '', // e.g., "Kecelakaan Pengunjung", "Kerusakan Fasilitas Mayor", "Insiden Keamanan", "Keluhan Serius"
    incidentDate: '',
    incidentTime: '',
    location: '', // e.g., "Wahana X", "Area Food Court", "Pintu Masuk"
    description: '',
    impactLevel: 'Minor', // e.g., "Minor", "Moderate", "Major", "Critical"
    reportedBy: '', // Bisa pre-filled
    reporterContact: '',
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
    alert('Laporan insiden berhasil dikirim!');
    console.log('Data Laporan Insiden:', formData);
    // Logika untuk mengirim data ke backend
    // Setelah berhasil, reset form atau arahkan ke halaman daftar insiden terbuka
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-red-700 mb-8 flex items-center gap-3">
        <FaExclamationTriangle className="w-8 h-8 text-red-500" />
        Lapor Insiden Baru
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Gunakan formulir ini untuk melaporkan insiden operasional atau keselamatan yang terjadi di area tamsya/hiburan.
      </p>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
        <h2 className="text-xl font-semibold mb-4 text-red-700 flex items-center gap-2">
          <FaInfoCircle className="w-5 h-5 text-red-500" />
          Detail Insiden
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="incidentTitle" className="block text-gray-700 font-medium mb-1">Judul Insiden <span className="text-red-500">*</span></label>
            <input type="text" id="incidentTitle" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" value={formData.incidentTitle} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="incidentType" className="block text-gray-700 font-medium mb-1">Jenis Insiden <span className="text-red-500">*</span></label>
            <select id="incidentType" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" value={formData.incidentType} onChange={handleChange} required>
              <option value="">Pilih Jenis Insiden</option>
              <option value="Kecelakaan Pengunjung">Kecelakaan Pengunjung</option>
              <option value="Kerusakan Fasilitas Mayor">Kerusakan Fasilitas Mayor</option>
              <option value="Insiden Keamanan">Insiden Keamanan</option>
              <option value="Keluhan Serius">Keluhan Pengunjung Serius</option>
              <option value="Medis">Insiden Medis</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
          <div>
            <label htmlFor="incidentDate" className="block text-gray-700 font-medium mb-1">Tanggal Insiden <span className="text-red-500">*</span></label>
            <input type="date" id="incidentDate" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" value={formData.incidentDate} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="incidentTime" className="block text-gray-700 font-medium mb-1">Waktu Insiden <span className="text-red-500">*</span></label>
            <input type="time" id="incidentTime" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" value={formData.incidentTime} onChange={handleChange} required />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="location" className="block text-gray-700 font-medium mb-1">Lokasi Insiden <span className="text-red-500">*</span></label>
            <input type="text" id="location" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" value={formData.location} onChange={handleChange} required />
            <p className="text-gray-500 text-sm mt-1">Contoh: "Wahana X", "Area Food Court A", "Pintu Masuk Utama".</p>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-1">Deskripsi Lengkap Insiden <span className="text-red-500">*</span></label>
            <textarea id="description" rows="4" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" value={formData.description} onChange={handleChange} required></textarea>
            <p className="text-gray-500 text-sm mt-1">Jelaskan secara rinci apa yang terjadi, siapa yang terlibat, dan tindakan awal yang diambil.</p>
          </div>
          <div>
            <label htmlFor="impactLevel" className="block text-gray-700 font-medium mb-1">Tingkat Dampak</label>
            <select id="impactLevel" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" value={formData.impactLevel} onChange={handleChange}>
              <option value="Minor">Minor (Tidak ada cedera/Kerugian kecil)</option>
              <option value="Moderate">Moderate (Cedera ringan/Kerugian sedang)</option>
              <option value="Major">Major (Cedera serius/Kerugian besar)</option>
              <option value="Critical">Critical (Fatal/Sangat besar)</option>
            </select>
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
          <label htmlFor="attachments" className="block text-gray-700 font-medium mb-1">Lampiran (Foto/Video/Dokumen)</label>
          <input type="file" id="attachments" multiple className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary" onChange={handleFileChange} />
          <p className="text-gray-500 text-sm mt-1">Unggah foto/video lokasi, dokumen terkait, atau laporan awal.</p>
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
          <button type="button" onClick={() => alert('Batal melaporkan insiden.')} className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-200 flex items-center gap-2">
            <FaTimes className="w-4 h-4" /> Batal
          </button>
          <button type="submit" className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 flex items-center gap-2">
            <FaSave className="w-4 h-4" /> Laporkan Insiden
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportNewIncidentPage;