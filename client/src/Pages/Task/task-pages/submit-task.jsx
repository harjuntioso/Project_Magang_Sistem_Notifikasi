import React, { useState } from 'react';
import {
  FaPaperPlane,      // Ikon utama
  FaSave,            // Simpan
  FaTimes,           // Batal
  FaInfoCircle,      // Informasi umum
  FaTag,             // Kategori
  FaCalendarAlt,     // Deadline
  FaPaperclip,       // Lampiran
  FaUser,            // Pemohon
  FaBuilding,        // Departemen Tujuan
} from 'react-icons/fa';

const SubmitNewTaskPage = () => {
  const [formData, setFormData] = useState({
    taskTitle: '',
    taskCategory: '', // Kategori sesuai departemen tujuan
    description: '',
    purpose: '',
    departmentTo: '', // Departemen yang dituju
    deadline: '',
    priority: 'Normal',
    attachments: [],
    notes: '',
    // Data pemohon (bisa diisi otomatis dari user login)
    requesterName: 'Nama Officer',
    requesterDepartment: 'Departemen Officer',
  });

  const [submissionStatus, setSubmissionStatus] = useState(null); // null, 'success', 'error'

  const departments = [
    { name: 'Operasional', categories: ['Penjadwalan Shift', 'Pemeliharaan', 'Inventaris Atraksi'] },
    { name: 'HRD', categories: ['Data Karyawan', 'Absensi', 'Pelatihan'] },
    { name: 'Keuangan', categories: ['Verifikasi Pembayaran', 'Laporan Keuangan'] },
    { name: 'IT', categories: ['Dukungan Teknis', 'Akses Sistem', 'Jaringan'] },
    { name: 'Pemasaran', categories: ['Desain Materi', 'Konten Media Sosial', 'Riset Pasar'] },
    { name: 'Umum & Administrasi', categories: ['Pengadaan Barang', 'Pengaturan Ruangan', 'Dukungan Umum'] },
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, attachments: Array.from(e.target.files) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus(null); // Reset status
    try {
      // Simulasi pengiriman data ke backend
      console.log('Mengajukan Tugas:', formData);
      // await new Promise(resolve => setTimeout(resolve, 1500)); // Simulasi delay API
      
      // Jika berhasil
      setSubmissionStatus('success');
      alert('Tugas berhasil diajukan! Menunggu persetujuan atasan Anda.');
      // Opsional: Reset form
      setFormData({
        taskTitle: '',
        taskCategory: '',
        description: '',
        purpose: '',
        departmentTo: '',
        deadline: '',
        priority: 'Normal',
        attachments: [],
        notes: '',
        requesterName: 'Nama Officer',
        requesterDepartment: 'Departemen Officer',
      });
    } catch (error) {
      console.error("Gagal mengajukan tugas:", error);
      setSubmissionStatus('error');
      alert('Gagal mengajukan tugas. Silakan coba lagi.');
    }
  };

  const selectedDepartmentCategories = departments.find(
    dep => dep.name === formData.departmentTo
  )?.categories || [];

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-8 flex items-center gap-3">
        <FaPaperPlane className="w-8 h-8 text-green-500" />
        Ajukan Tugas / Permintaan Baru
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Gunakan formulir ini untuk mengajukan tugas atau permintaan ke departemen lain.
      </p>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
        <h2 className="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2">
          <FaInfoCircle className="w-5 h-5 text-green-500" />
          Detail Pengajuan Tugas
        </h2>

        {/* Notifikasi Status Pengajuan */}
        {submissionStatus === 'success' && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Berhasil!</strong>
            <span className="block sm:inline"> Pengajuan Anda telah dikirim dan menunggu persetujuan atasan.</span>
          </div>
        )}
        {submissionStatus === 'error' && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Gagal!</strong>
            <span className="block sm:inline"> Terjadi kesalahan saat mengirim pengajuan.</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="requesterName" className="block text-gray-700 font-medium mb-1">Nama Pemohon</label>
            <input type="text" id="requesterName" className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" value={formData.requesterName} readOnly />
          </div>
          <div>
            <label htmlFor="requesterDepartment" className="block text-gray-700 font-medium mb-1">Departemen Pemohon</label>
            <input type="text" id="requesterDepartment" className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" value={formData.requesterDepartment} readOnly />
          </div>
          <div>
            <label htmlFor="taskTitle" className="block text-gray-700 font-medium mb-1">Judul Tugas / Permintaan <span className="text-red-500">*</span></label>
            <input type="text" id="taskTitle" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" value={formData.taskTitle} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="departmentTo" className="block text-gray-700 font-medium mb-1">Tujuan Departemen <span className="text-red-500">*</span></label>
            <select id="departmentTo" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" value={formData.departmentTo} onChange={handleChange} required>
              <option value="">Pilih Departemen</option>
              {departments.map(dep => (
                <option key={dep.name} value={dep.name}>{dep.name}</option>
              ))}
            </select>
          </div>
          {formData.departmentTo && (
            <div>
              <label htmlFor="taskCategory" className="block text-gray-700 font-medium mb-1">Kategori Tugas <span className="text-red-500">*</span></label>
              <select id="taskCategory" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" value={formData.taskCategory} onChange={handleChange} required>
                <option value="">Pilih Kategori</option>
                {selectedDepartmentCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          )}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-1">Deskripsi Lengkap Tugas <span className="text-red-500">*</span></label>
            <textarea id="description" rows="4" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" value={formData.description} onChange={handleChange} required></textarea>
            <p className="text-gray-500 text-sm mt-1">Jelaskan tugas secara rinci, termasuk output yang diharapkan.</p>
          </div>
          <div>
            <label htmlFor="purpose" className="block text-gray-700 font-medium mb-1">Tujuan Pengajuan Tugas</label>
            <input type="text" id="purpose" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" value={formData.purpose} onChange={handleChange} />
            <p className="text-gray-500 text-sm mt-1">Mengapa tugas ini perlu dilakukan?</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2 border-t pt-6 mt-6">
          <FaCalendarAlt className="w-5 h-5 text-purple-500" />
          Prioritas & Jadwal
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="deadline" className="block text-gray-700 font-medium mb-1">Batas Waktu Selesai (Target) <span className="text-red-500">*</span></label>
            <input type="date" id="deadline" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" value={formData.deadline} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="priority" className="block text-gray-700 font-medium mb-1">Prioritas</label>
            <select id="priority" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" value={formData.priority} onChange={handleChange}>
              <option value="Normal">Normal</option>
              <option value="Medium">Medium</option>
              <option value="High">Tinggi</option>
              <option value="Urgent">Sangat Mendesak</option>
            </select>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2 border-t pt-6 mt-6">
          <FaPaperclip className="w-5 h-5 text-blue-500" />
          Lampiran & Catatan Tambahan
        </h2>
        <div className="mb-6">
          <label htmlFor="attachments" className="block text-gray-700 font-medium mb-1">Lampiran (File Referensi/Contoh)</label>
          <input type="file" id="attachments" multiple className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" onChange={handleFileChange} />
          <p className="text-gray-500 text-sm mt-1">Unggah file seperti brief, data, atau referensi.</p>
          {formData.attachments.length > 0 && (
            <div className="mt-2 text-gray-600 text-sm">
              File terlampir: {formData.attachments.map(file => file.name).join(', ')}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="notes" className="block text-gray-700 font-medium mb-1">Catatan Tambahan (Opsional)</label>
          <textarea id="notes" rows="3" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value={formData.notes} onChange={handleChange}></textarea>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-4 mt-8">
          <button type="button" onClick={() => alert('Batal mengajukan tugas.')} className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-200 flex items-center gap-2">
            <FaTimes className="w-4 h-4" /> Batal
          </button>
          <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
            <FaSave className="w-4 h-4" /> Ajukan Tugas
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitNewTaskPage;