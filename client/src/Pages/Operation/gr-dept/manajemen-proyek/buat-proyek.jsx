import React, { useState } from 'react';
import {
  FaPlusCircle,    // Ikon utama
  FaSave,          // Simpan
  FaTimes,         // Batal
  FaInfoCircle,    // Informasi Umum
  FaUsers,         // Tim Proyek
  FaCalendarAlt,   // Jadwal
  FaTasks,         // Tujuan/Deliverables
  FaMoneyBillWave, // Anggaran
} from 'react-icons/fa';

const CreateNewProjectPage = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    projectManager: '',
    startDate: '',
    endDate: '',
    budget: '',
    status: 'Planned', // Default status
    teamMembers: [], // Contoh: ['KRY001', 'KRY005']
    keyDeliverables: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleTeamMemberChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const newMembers = checked
        ? [...prev.teamMembers, value]
        : prev.teamMembers.filter(member => member !== value);
      return { ...prev, teamMembers: newMembers };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Proyek baru berhasil dibuat!');
    console.log('Data Proyek Baru:', formData);
    // Logika untuk mengirim data ke backend
    // Setelah berhasil, mungkin arahkan ke halaman daftar proyek atau tampilkan pesan sukses
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-700 mb-8 flex items-center gap-3">
        <FaPlusCircle className="w-8 h-8 text-gray-500" />
        Buat Proyek Baru
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Lengkapi formulir di bawah untuk memulai proyek lintas departemen yang baru.
      </p>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-500">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
          <FaInfoCircle className="w-5 h-5 text-gray-500" />
          Informasi Umum Proyek
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="projectName" className="block text-gray-700 font-medium mb-1">Nama Proyek <span className="text-red-500">*</span></label>
            <input type="text" id="projectName" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500" value={formData.projectName} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="projectManager" className="block text-gray-700 font-medium mb-1">Manajer Proyek <span className="text-red-500">*</span></label>
            <input type="text" id="projectManager" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500" value={formData.projectManager} onChange={handleChange} required />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-1">Deskripsi Proyek</label>
            <textarea id="description" rows="3" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500" value={formData.description} onChange={handleChange}></textarea>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2 border-t pt-6 mt-6">
          <FaCalendarAlt className="w-5 h-5 text-blue-500" />
          Jadwal & Anggaran
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="startDate" className="block text-gray-700 font-medium mb-1">Tanggal Mulai <span className="text-red-500">*</span></label>
            <input type="date" id="startDate" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value={formData.startDate} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-gray-700 font-medium mb-1">Tanggal Selesai (Target) <span className="text-red-500">*</span></label>
            <input type="date" id="endDate" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value={formData.endDate} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="budget" className="block text-gray-700 font-medium mb-1">Estimasi Anggaran (Rp)</label>
            <input type="number" id="budget" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value={formData.budget} onChange={handleChange} min="0" />
          </div>
          <div>
            <label htmlFor="status" className="block text-gray-700 font-medium mb-1">Status Proyek <span className="text-red-500">*</span></label>
            <select id="status" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value={formData.status} onChange={handleChange} required>
              <option value="Planned">Terencana</option>
              <option value="In Progress">Sedang Berjalan</option>
              <option value="On Hold">Ditunda</option>
              <option value="Completed">Selesai</option>
            </select>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2 border-t pt-6 mt-6">
          <FaUsers className="w-5 h-5 text-green-500" />
          Tim Proyek
        </h2>
        <div className="mb-6">
          <label htmlFor="teamMembers" className="block text-gray-700 font-medium mb-1">Pilih Anggota Tim</label>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-green-600 rounded" value="KRY001" checked={formData.teamMembers.includes('KRY001')} onChange={handleTeamMemberChange} />
              <span className="ml-2 text-gray-700">Budi Santoso (Operasional)</span>
            </label>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-green-600 rounded" value="KRY002" checked={formData.teamMembers.includes('KRY002')} onChange={handleTeamMemberChange} />
              <span className="ml-2 text-gray-700">Siti Nurhayati (HRD)</span>
            </label>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-green-600 rounded" value="KRY003" checked={formData.teamMembers.includes('KRY003')} onChange={handleTeamMemberChange} />
              <span className="ml-2 text-gray-700">Joko Widodo (Keuangan)</span>
            </label>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-green-600 rounded" value="KRY004" checked={formData.teamMembers.includes('KRY004')} onChange={handleTeamMemberChange} />
              <span className="ml-2 text-gray-700">Ayu Lestari (Pemasaran)</span>
            </label>
          </div>
          <p className="text-gray-500 text-sm mt-2">Pilih karyawan yang terlibat dalam proyek ini.</p>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-orange-700 flex items-center gap-2 border-t pt-6 mt-6">
          <FaTasks className="w-5 h-5 text-orange-500" />
          Tujuan & Deliverables Utama
        </h2>
        <div>
          <label htmlFor="keyDeliverables" className="block text-gray-700 font-medium mb-1">Tujuan dan Deliverables Utama</label>
          <textarea id="keyDeliverables" rows="4" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500" value={formData.keyDeliverables} onChange={handleChange}></textarea>
          <p className="text-gray-500 text-sm mt-1">Jelaskan hasil akhir yang diharapkan dari proyek ini.</p>
        </div>
        <div>
          <label htmlFor="notes" className="block text-gray-700 font-medium mb-1">Catatan Tambahan</label>
          <textarea id="notes" rows="3" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500" value={formData.notes} onChange={handleChange}></textarea>
        </div>


        {/* Tombol Aksi */}
        <div className="flex justify-end gap-4 mt-8">
          <button type="button" onClick={() => alert('Batal membuat proyek.')} className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-200 flex items-center gap-2">
            <FaTimes className="w-4 h-4" /> Batal
          </button>
          <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
            <FaSave className="w-4 h-4" /> Simpan Proyek
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewProjectPage;