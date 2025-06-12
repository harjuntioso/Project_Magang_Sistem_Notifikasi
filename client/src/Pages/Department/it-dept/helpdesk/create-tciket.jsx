import React, { useState } from 'react';
import {
  FaPlusCircle,      // Ikon utama
  FaSave,            // Simpan
  FaTimes,           // Batal
  FaInfoCircle,      // Informasi umum
  FaPaperclip,       // Lampiran
  FaUser,            // Pemohon
  FaClipboardList,   // Kategori
  FaExclamationTriangle, // Prioritas
} from 'react-icons/fa';

const CreateNewTicketPage = () => {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    category: '', // e.g., "Hardware", "Software", "Network", "Account Access", "Printer"
    priority: 'Medium',
    requesterName: '', // Bisa pre-filled jika ada user login
    requesterDepartment: '', // Bisa pre-filled
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
    alert('Tiket dukungan berhasil dibuat!');
    console.log('Data Tiket Baru:', formData);
    // Logika untuk mengirim data ke backend (termasuk file lampiran)
    // Setelah berhasil, reset form atau arahkan ke halaman daftar tiket terbuka
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-info-dark mb-8 flex items-center gap-3">
        <FaPlusCircle className="w-8 h-8 text-info" />
        Buat Tiket Dukungan Baru
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Isi formulir ini untuk mengajukan masalah atau permintaan dukungan kepada tim IT.
      </p>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-info">
        <h2 className="text-xl font-semibold mb-4 text-info-dark flex items-center gap-2">
          <FaInfoCircle className="w-5 h-5 text-info" />
          Detail Tiket
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="requesterName" className="block text-gray-700 font-medium mb-1">Nama Pemohon <span className="text-red-500">*</span></label>
            <input type="text" id="requesterName" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-info focus:border-info" value={formData.requesterName} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="requesterDepartment" className="block text-gray-700 font-medium mb-1">Departemen Pemohon <span className="text-red-500">*</span></label>
            <select id="requesterDepartment" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-info focus:border-info" value={formData.requesterDepartment} onChange={handleChange} required>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="subject" className="block text-gray-700 font-medium mb-1">Subjek Tiket <span className="text-red-500">*</span></label>
            <input type="text" id="subject" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-info focus:border-info" value={formData.subject} onChange={handleChange} required />
            <p className="text-gray-500 text-sm mt-1">Contoh: "Tidak bisa login sistem HRIS" atau "Printer macet".</p>
          </div>
          <div>
            <label htmlFor="category" className="block text-gray-700 font-medium mb-1">Kategori Masalah <span className="text-red-500">*</span></label>
            <select id="category" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-info focus:border-info" value={formData.category} onChange={handleChange} required>
              <option value="">Pilih Kategori</option>
              <option value="Hardware">Hardware (Komputer, Monitor, Kabel)</option>
              <option value="Software">Software (Aplikasi, Sistem Operasi)</option>
              <option value="Network">Jaringan/Internet</option>
              <option value="Account Access">Akses Akun/Login</option>
              <option value="Printer">Printer/Scan</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-1">Deskripsi Lengkap Masalah <span className="text-red-500">*</span></label>
            <textarea id="description" rows="4" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-info focus:border-info" value={formData.description} onChange={handleChange} required></textarea>
            <p className="text-gray-500 text-sm mt-1">Jelaskan masalah secara rinci, termasuk langkah-langkah yang sudah dilakukan.</p>
          </div>
          <div>
            <label htmlFor="priority" className="block text-gray-700 font-medium mb-1">Prioritas</label>
            <select id="priority" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-info focus:border-info" value={formData.priority} onChange={handleChange}>
              <option value="Low">Rendah (Tidak mendesak)</option>
              <option value="Medium">Sedang (Perlu perhatian)</option>
              <option value="High">Tinggi (Mengganggu pekerjaan penting)</option>
              <option value="Urgent">Sangat Mendesak (Sistem down/Produksi terhenti)</option>
            </select>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2 border-t pt-6 mt-6">
          <FaPaperclip className="w-5 h-5 text-primary" />
          Lampiran & Catatan Tambahan
        </h2>
        <div className="mb-6">
          <label htmlFor="attachments" className="block text-gray-700 font-medium mb-1">Lampiran (Screenshot/Dokumen)</label>
          <input type="file" id="attachments" multiple className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" onChange={handleFileChange} />
          <p className="text-gray-500 text-sm mt-1">Unggah tangkapan layar (screenshot) atau dokumen relevan untuk membantu tim IT.</p>
          {formData.attachments.length > 0 && (
            <div className="mt-2 text-gray-600 text-sm">
              File terlampir: {formData.attachments.map(file => file.name).join(', ')}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="notes" className="block text-gray-700 font-medium mb-1">Catatan Tambahan (Opsional)</label>
          <textarea id="notes" rows="3" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" value={formData.notes} onChange={handleChange}></textarea>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-4 mt-8">
          <button type="button" onClick={() => alert('Batal membuat tiket.')} className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-200 flex items-center gap-2">
            <FaTimes className="w-4 h-4" /> Batal
          </button>
          <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
            <FaSave className="w-4 h-4" /> Ajukan Tiket
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewTicketPage;