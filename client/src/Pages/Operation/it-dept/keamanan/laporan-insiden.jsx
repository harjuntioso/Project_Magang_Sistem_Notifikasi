import React, { useState } from 'react';
import {
  FaExclamationTriangle, // Ikon utama untuk insiden
  FaSave,                // Simpan
  FaTimes,               // Batal
  FaInfoCircle,          // Informasi umum
  FaPaperclip,           // Lampiran
  FaUser,                // Pelapor
  FaCalendarAlt,         // Tanggal/Waktu Insiden
  FaMapMarkerAlt,        // Lokasi Insiden
  FaClipboardList,       // Detail Insiden
} from 'react-icons/fa';

const SecurityIncidentReportingPage = () => {
  const [formData, setFormData] = useState({
    incidentTitle: '',
    incidentType: '', // e.g., "Phishing", "Malware", "Unauthorized Access", "Data Leak", "Lost Device"
    incidentDate: '',
    incidentTime: '',
    location: '', // e.g., "Workstation KRY005", "Server Database", "Email"
    description: '',
    impact: '', // e.g., "Minor", "Moderate", "Severe"
    reportedBy: '', // Bisa pre-filled
    reporterDepartment: '', // Bisa pre-filled
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
    alert('Laporan insiden keamanan berhasil dikirim!');
    console.log('Data Laporan Insiden:', formData);
    // Logika untuk mengirim data ke backend (termasuk file lampiran)
    // Setelah berhasil, reset form atau arahkan ke halaman riwayat insiden
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-red-700 mb-8 flex items-center gap-3">
        <FaExclamationTriangle className="w-8 h-8 text-red-500" />
        Pelaporan Insiden Keamanan
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Gunakan formulir ini untuk melaporkan setiap insiden atau potensi insiden keamanan yang Anda temukan.
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
            <p className="text-gray-500 text-sm mt-1">Contoh: "Email Phishing", "Komputer Terinfeksi Malware".</p>
          </div>
          <div>
            <label htmlFor="incidentType" className="block text-gray-700 font-medium mb-1">Jenis Insiden <span className="text-red-500">*</span></label>
            <select id="incidentType" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" value={formData.incidentType} onChange={handleChange} required>
              <option value="">Pilih Jenis Insiden</option>
              <option value="Phishing">Phishing/Scam Email</option>
              <option value="Malware">Malware/Virus</option>
              <option value="Unauthorized Access">Akses Tidak Sah</option>
              <option value="Data Leak">Kebocoran Data</option>
              <option value="Lost Device">Perangkat Hilang/Dicuri</option>
              <option value="Network Anomaly">Anomali Jaringan</option>
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
            <label htmlFor="location" className="block text-gray-700 font-medium mb-1">Lokasi/Sumber Insiden <span className="text-red-500">*</span></label>
            <input type="text" id="location" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" value={formData.location} onChange={handleChange} required />
            <p className="text-gray-500 text-sm mt-1">Contoh: "Komputer Budi Santoso", "Server Database Utama", "Email dari vendor X".</p>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-1">Deskripsi Lengkap Insiden <span className="text-red-500">*</span></label>
            <textarea id="description" rows="4" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" value={formData.description} onChange={handleChange} required></textarea>
            <p className="text-gray-500 text-sm mt-1">Jelaskan secara rinci apa yang terjadi, bagaimana Anda menemukannya, dan dampaknya.</p>
          </div>
          <div>
            <label htmlFor="impact" className="block text-gray-700 font-medium mb-1">Estimasi Dampak</label>
            <select id="impact" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" value={formData.impact} onChange={handleChange}>
              <option value="Minor">Minor (Tidak signifikan)</option>
              <option value="Moderate">Moderate (Ada gangguan)</option>
              <option value="Severe">Severe (Sangat mengganggu/Kerugian besar)</option>
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
            <label htmlFor="reporterDepartment" className="block text-gray-700 font-medium mb-1">Departemen Pelapor <span className="text-red-500">*</span></label>
            <select id="reporterDepartment" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" value={formData.reporterDepartment} onChange={handleChange} required>
              <option value="">Pilih Departemen</option>
              <option value="Operasional">Operasional</option>
              <option value="HRD">HRD</option>
              <option value="Keuangan">Keuangan</option>
              <option value="Pemasaran">Pemasaran</option>
              <option value="IT">IT</option>
              <option value="Umum">Umum & Administrasi</option>
            </select>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-secondary-dark flex items-center gap-2 border-t pt-6 mt-6">
          <FaPaperclip className="w-5 h-5 text-secondary" />
          Lampiran & Catatan Tambahan
        </h2>
        <div className="mb-6">
          <label htmlFor="attachments" className="block text-gray-700 font-medium mb-1">Lampiran (Screenshot/Log/Dokumen)</label>
          <input type="file" id="attachments" multiple className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary" onChange={handleFileChange} />
          <p className="text-gray-500 text-sm mt-1">Unggah file yang relevan (tangkapan layar error, log aktivitas, dll.).</p>
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

export default SecurityIncidentReportingPage;