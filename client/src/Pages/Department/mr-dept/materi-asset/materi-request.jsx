import React, { useState } from 'react';
import {
  FaPlusCircle,      // Ikon utama
  FaSave,            // Simpan
  FaTimes,           // Batal
  FaFileAlt,         // Jenis materi
  FaInfoCircle,      // Informasi umum
  FaCalendarAlt,     // Deadline
  FaPaperclip,       // Lampiran
} from 'react-icons/fa';

const MaterialRequestPage = () => {
  const [formData, setFormData] = useState({
    requestTitle: '',
    materialType: '', // e.g., "Poster", "Video", "Artikel", "Infografis"
    description: '',
    purpose: '',
    targetAudience: '',
    deadline: '',
    priority: 'Normal',
    budgetEstimate: '',
    notes: '',
    attachments: [], // Untuk file lampiran
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
    alert('Pengajuan pembuatan materi berhasil dikirim!');
    console.log('Data Pengajuan Materi:', formData);
    // Logika untuk mengirim data ke backend (termasuk file lampiran)
    // Setelah berhasil, reset form atau arahkan ke halaman daftar pengajuan
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-700 mb-8 flex items-center gap-3">
        <FaPlusCircle className="w-8 h-8 text-purple-500" />
        Ajukan Pembuatan Materi Baru
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Gunakan formulir ini untuk mengajukan permintaan pembuatan materi pemasaran atau promosi.
      </p>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
        <h2 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2">
          <FaInfoCircle className="w-5 h-5 text-purple-500" />
          Detail Pengajuan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="requestTitle" className="block text-gray-700 font-medium mb-1">Judul Pengajuan <span className="text-red-500">*</span></label>
            <input type="text" id="requestTitle" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" value={formData.requestTitle} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="materialType" className="block text-gray-700 font-medium mb-1">Jenis Materi <span className="text-red-500">*</span></label>
            <select id="materialType" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" value={formData.materialType} onChange={handleChange} required>
              <option value="">Pilih Jenis Materi</option>
              <option value="Poster">Poster/Banner</option>
              <option value="Video">Video Promosi</option>
              <option value="Artikel">Artikel/Blog Post</option>
              <option value="Infografis">Infografis</option>
              <option value="Sosial Media Konten">Konten Media Sosial</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-1">Deskripsi Lengkap Materi <span className="text-red-500">*</span></label>
            <textarea id="description" rows="4" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" value={formData.description} onChange={handleChange} required></textarea>
            <p className="text-gray-500 text-sm mt-1">Jelaskan kebutuhan, isi, dan elemen kunci materi.</p>
          </div>
          <div>
            <label htmlFor="purpose" className="block text-gray-700 font-medium mb-1">Tujuan Penggunaan <span className="text-red-500">*</span></label>
            <input type="text" id="purpose" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" value={formData.purpose} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="targetAudience" className="block text-gray-700 font-medium mb-1">Target Audiens</label>
            <input type="text" id="targetAudience" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" value={formData.targetAudience} onChange={handleChange} />
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2 border-t pt-6 mt-6">
          <FaCalendarAlt className="w-5 h-5 text-blue-500" />
          Jadwal & Anggaran
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="deadline" className="block text-gray-700 font-medium mb-1">Batas Waktu Selesai <span className="text-red-500">*</span></label>
            <input type="date" id="deadline" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value={formData.deadline} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="priority" className="block text-gray-700 font-medium mb-1">Prioritas</label>
            <select id="priority" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value={formData.priority} onChange={handleChange}>
              <option value="Normal">Normal</option>
              <option value="Medium">Medium</option>
              <option value="High">Tinggi</option>
              <option value="Urgent">Sangat Mendesak</option>
            </select>
          </div>
          <div>
            <label htmlFor="budgetEstimate" className="block text-gray-700 font-medium mb-1">Estimasi Anggaran (Opsional)</label>
            <input type="number" id="budgetEstimate" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value={formData.budgetEstimate} onChange={handleChange} min="0" />
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2 border-t pt-6 mt-6">
          <FaPaperclip className="w-5 h-5 text-green-500" />
          Lampiran & Catatan
        </h2>
        <div className="mb-6">
          <label htmlFor="attachments" className="block text-gray-700 font-medium mb-1">Lampiran (File Referensi/Contoh)</label>
          <input type="file" id="attachments" multiple className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" onChange={handleFileChange} />
          <p className="text-gray-500 text-sm mt-1">Unggah file seperti draf awal, referensi gambar, atau brief.</p>
          {formData.attachments.length > 0 && (
            <div className="mt-2 text-gray-600 text-sm">
              File terlampir: {formData.attachments.map(file => file.name).join(', ')}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="notes" className="block text-gray-700 font-medium mb-1">Catatan Tambahan</label>
          <textarea id="notes" rows="3" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" value={formData.notes} onChange={handleChange}></textarea>
        </div>


        {/* Tombol Aksi */}
        <div className="flex justify-end gap-4 mt-8">
          <button type="button" onClick={() => alert('Batal mengajukan materi.')} className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-200 flex items-center gap-2">
            <FaTimes className="w-4 h-4" /> Batal
          </button>
          <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
            <FaSave className="w-4 h-4" /> Kirim Pengajuan
          </button>
        </div>
      </form>
    </div>
  );
};

export default MaterialRequestPage;