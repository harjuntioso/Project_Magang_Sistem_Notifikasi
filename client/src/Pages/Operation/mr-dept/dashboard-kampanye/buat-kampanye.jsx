import React, { useState } from 'react';
import {
  FaPlusCircle,   // Ikon utama
  FaSave,         // Simpan
  FaTimes,        // Batal
  FaInfoCircle,   // Informasi Umum
  FaMoneyBillWave, // Anggaran
  FaTarget,       // Target
  FaCalendarAlt,  // Jadwal
  FaClipboardList
} from 'react-icons/fa';
import { TbTargetArrow } from "react-icons/tb";

const CreateCampaignPage = () => {
  const [formData, setFormData] = useState({
    campaignName: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: '',
    targetAudience: '',
    channels: [], // Contoh: ['Social Media', 'Email', 'Website']
    goals: '',
    status: 'Planned', // Default status
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleChannelChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const newChannels = checked
        ? [...prev.channels, value]
        : prev.channels.filter(channel => channel !== value);
      return { ...prev, channels: newChannels };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Membuat kampanye baru...');
    console.log('Data Kampanye Baru:', formData);
    // Logika untuk mengirim data ke backend
    // Setelah berhasil, mungkin arahkan ke halaman ringkasan kampanye atau tampilkan pesan sukses
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-red-700 mb-8 flex items-center gap-3">
        <FaPlusCircle className="w-8 h-8 text-red-500" />
        Buat Kampanye Pemasaran Baru
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Isi formulir di bawah untuk merencanakan dan meluncurkan kampanye pemasaran baru Anda.
      </p>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
        <h2 className="text-xl font-semibold mb-4 text-red-700 flex items-center gap-2">
          <FaInfoCircle className="w-5 h-5 text-red-500" />
          Informasi Umum Kampanye
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="campaignName" className="block text-gray-700 font-medium mb-1">Nama Kampanye <span className="text-red-500">*</span></label>
            <input type="text" id="campaignName" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" value={formData.campaignName} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="status" className="block text-gray-700 font-medium mb-1">Status Kampanye <span className="text-red-500">*</span></label>
            <select id="status" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" value={formData.status} onChange={handleChange} required>
              <option value="Planned">Terencana</option>
              <option value="Active">Aktif</option>
              <option value="Paused">Dijeda</option>
              <option value="Completed">Selesai</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-1">Deskripsi Kampanye</label>
            <textarea id="description" rows="3" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" value={formData.description} onChange={handleChange}></textarea>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2 border-t pt-6 mt-6">
          <FaCalendarAlt className="w-5 h-5 text-purple-500" />
          Jadwal & Anggaran
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="startDate" className="block text-gray-700 font-medium mb-1">Tanggal Mulai <span className="text-red-500">*</span></label>
            <input type="date" id="startDate" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" value={formData.startDate} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-gray-700 font-medium mb-1">Tanggal Selesai <span className="text-red-500">*</span></label>
            <input type="date" id="endDate" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" value={formData.endDate} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="budget" className="block text-gray-700 font-medium mb-1">Anggaran Kampanye (Rp) <span className="text-red-500">*</span></label>
            <input type="number" id="budget" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" value={formData.budget} onChange={handleChange} required min="0" />
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2 border-t pt-6 mt-6">
          <TbTargetArrow className="w-5 h-5 text-blue-500" />
          Target & Saluran
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="targetAudience" className="block text-gray-700 font-medium mb-1">Target Audiens</label>
            <textarea id="targetAudience" rows="2" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value={formData.targetAudience} onChange={handleChange}></textarea>
            <p className="text-gray-500 text-sm mt-1">Contoh: Keluarga muda, remaja, wisatawan.</p>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Saluran Pemasaran</label>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-blue-600 rounded" value="Social Media" checked={formData.channels.includes('Social Media')} onChange={handleChannelChange} />
                <span className="ml-2 text-gray-700">Media Sosial</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-blue-600 rounded" value="Email Marketing" checked={formData.channels.includes('Email Marketing')} onChange={handleChannelChange} />
                <span className="ml-2 text-gray-700">Email Marketing</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-blue-600 rounded" value="Website/SEO" checked={formData.channels.includes('Website/SEO')} onChange={handleChannelChange} />
                <span className="ml-2 text-gray-700">Website/SEO</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-blue-600 rounded" value="Offline Event" checked={formData.channels.includes('Offline Event')} onChange={handleChannelChange} />
                <span className="ml-2 text-gray-700">Event Offline</span>
              </label>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2 border-t pt-6 mt-6">
          <FaClipboardList className="w-5 h-5 text-green-500" />
          Tujuan & Metrik
        </h2>
        <div>
          <label htmlFor="goals" className="block text-gray-700 font-medium mb-1">Tujuan Kampanye</label>
          <textarea id="goals" rows="3" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" value={formData.goals} onChange={handleChange}></textarea>
          <p className="text-gray-500 text-sm mt-1">Contoh: Meningkatkan leads 20%, meningkatkan konversi 5%.</p>
        </div>


        {/* Tombol Aksi */}
        <div className="flex justify-end gap-4 mt-8">
          <button type="button" onClick={() => alert('Batal membuat kampanye.')} className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-200 flex items-center gap-2">
            <FaTimes className="w-4 h-4" /> Batal
          </button>
          <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
            <FaSave className="w-4 h-4" /> Simpan Kampanye
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCampaignPage;