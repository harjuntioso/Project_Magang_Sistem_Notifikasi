import React, { useState } from 'react';
import {
  FaShoppingCart,   // Ikon utama
  FaSave,           // Simpan
  FaTimes,          // Batal
  FaInfoCircle,     // Informasi Umum
  FaListAlt,        // Daftar Barang
  FaUser,           // Pemohon
  FaCalendarAlt,    // Tanggal
  FaPaperclip,      // Lampiran
} from 'react-icons/fa';

const MaterialRequestOpsPage = () => {
  const [formData, setFormData] = useState({
    requestTitle: '',
    requesterName: '', // Bisa pre-filled
    requesterDepartment: 'Operasional Lapangan', // Bisa pre-filled
    requesterContact: '',
    items: [{ name: '', quantity: 1, unit: '', rationale: '' }], // Array untuk daftar barang
    purpose: '', // Misal: Untuk perawatan wahana X, untuk operasional food stall
    urgency: 'Normal',
    preferredVendor: '',
    budgetEstimate: '',
    attachments: [],
    notes: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = formData.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const handleAddItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { name: '', quantity: 1, unit: '', rationale: '' }]
    }));
  };

  const handleRemoveItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, attachments: Array.from(e.target.files) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Permintaan bahan baku/barang berhasil dikirim!');
    console.log('Data Permintaan Bahan Baku/Barang:', formData);
    // Logika untuk mengirim data ke backend (termasuk file lampiran)
    // Setelah berhasil, reset form atau arahkan ke halaman riwayat permintaan
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 mb-8 flex items-center gap-3">
        <FaShoppingCart className="w-8 h-8 text-blue-500" />
        Permintaan Bahan Baku/Barang
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Ajukan permintaan pembelian bahan baku, suku cadang, atau barang lainnya untuk operasional lapangan.
      </p>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
        <h2 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
          <FaInfoCircle className="w-5 h-5 text-blue-500" />
          Informasi Permintaan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="requestTitle" className="block text-gray-700 font-medium mb-1">Judul Permintaan <span className="text-red-500">*</span></label>
            <input type="text" id="requestTitle" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value={formData.requestTitle} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="requesterName" className="block text-gray-700 font-medium mb-1">Nama Pemohon <span className="text-red-500">*</span></label>
            <input type="text" id="requesterName" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value={formData.requesterName} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="requesterDepartment" className="block text-gray-700 font-medium mb-1">Departemen Pemohon</label>
            <input type="text" id="requesterDepartment" className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" value={formData.requesterDepartment} readOnly />
          </div>
          <div>
            <label htmlFor="requesterContact" className="block text-gray-700 font-medium mb-1">Kontak Pemohon (Email/Telepon) <span className="text-red-500">*</span></label>
            <input type="text" id="requesterContact" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value={formData.requesterContact} onChange={handleChange} required />
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2 border-t pt-6 mt-6">
          <FaListAlt className="w-5 h-5 text-primary" />
          Daftar Bahan Baku/Barang
        </h2>
        {formData.items.map((item, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 border border-gray-200 rounded-lg relative">
            <h3 className="md:col-span-4 text-md font-semibold text-gray-800 flex items-center gap-2">
              Item #{index + 1}
              {formData.items.length > 1 && (
                <button type="button" onClick={() => handleRemoveItem(index)} className="ml-auto text-red-500 hover:text-red-700">
                  <FaTimesCircle className="w-5 h-5" />
                </button>
              )}
            </h3>
            <div>
              <label htmlFor={`item-name-${index}`} className="block text-gray-700 font-medium mb-1">Nama Barang <span className="text-red-500">*</span></label>
              <input type="text" id="name" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} required />
            </div>
            <div>
              <label htmlFor={`item-quantity-${index}`} className="block text-gray-700 font-medium mb-1">Jumlah <span className="text-red-500">*</span></label>
              <input type="number" id="quantity" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} min="1" required />
            </div>
            <div>
              <label htmlFor={`item-unit-${index}`} className="block text-gray-700 font-medium mb-1">Satuan</label>
              <input type="text" id="unit" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" value={item.unit} onChange={(e) => handleItemChange(index, 'unit', e.target.value)} placeholder="Buah, Liter, Pack..." />
            </div>
            <div className="md:col-span-full">
              <label htmlFor={`item-rationale-${index}`} className="block text-gray-700 font-medium mb-1">Alasan Permintaan <span className="text-red-500">*</span></label>
              <textarea id="rationale" rows="2" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" value={item.rationale} onChange={(e) => handleItemChange(index, 'rationale', e.target.value)} required></textarea>
            </div>
          </div>
        ))}
        <button type="button" onClick={handleAddItem} className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2 mt-4">
          <FaPlusCircle className="w-4 h-4" /> Tambah Barang Lain
        </button>

        <h2 className="text-xl font-semibold mb-4 text-secondary-dark flex items-center gap-2 border-t pt-6 mt-6">
          <FaCalendarAlt className="w-5 h-5 text-secondary" />
          Tujuan & Prioritas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="purpose" className="block text-gray-700 font-medium mb-1">Tujuan Penggunaan Barang</label>
            <input type="text" id="purpose" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary" value={formData.purpose} onChange={handleChange} />
            <p className="text-gray-500 text-sm mt-1">Contoh: Untuk operasional Food Court A, Perawatan Wahana X.</p>
          </div>
          <div>
            <label htmlFor="urgency" className="block text-gray-700 font-medium mb-1">Tingkat Urgensi</label>
            <select id="urgency" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary" value={formData.urgency} onChange={handleChange}>
              <option value="Normal">Normal</option>
              <option value="Medium">Medium</option>
              <option value="High">Tinggi (Mendesak)</option>
            </select>
          </div>
          <div>
            <label htmlFor="preferredVendor" className="block text-gray-700 font-medium mb-1">Vendor Pilihan (Opsional)</label>
            <input type="text" id="preferredVendor" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary" value={formData.preferredVendor} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="budgetEstimate" className="block text-gray-700 font-medium mb-1">Estimasi Anggaran (Rp)</label>
            <input type="number" id="budgetEstimate" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary" value={formData.budgetEstimate} onChange={handleChange} min="0" />
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-info-dark flex items-center gap-2 border-t pt-6 mt-6">
          <FaPaperclip className="w-5 h-5 text-info" />
          Lampiran & Catatan Tambahan
        </h2>
        <div className="mb-6">
          <label htmlFor="attachments" className="block text-gray-700 font-medium mb-1">Lampiran (Spesifikasi/Gambar)</label>
          <input type="file" id="attachments" multiple className="w-full p-3 border border-gray-300 rounded-lg focus:ring-info focus:border-info" onChange={handleFileChange} />
          <p className="text-gray-500 text-sm mt-1">Unggah dokumen spesifikasi, gambar referensi, atau kutipan harga.</p>
          {formData.attachments.length > 0 && (
            <div className="mt-2 text-gray-600 text-sm">
              File terlampir: {formData.attachments.map(file => file.name).join(', ')}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="notes" className="block text-gray-700 font-medium mb-1">Catatan Tambahan (Opsional)</label>
          <textarea id="notes" rows="3" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-info focus:border-info" value={formData.notes} onChange={handleChange}></textarea>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-4 mt-8">
          <button type="button" onClick={() => alert('Batal mengajukan permintaan.')} className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-200 flex items-center gap-2">
            <FaTimes className="w-4 h-4" /> Batal
          </button>
          <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
            <FaSave className="w-4 h-4" /> Kirim Permintaan
          </button>
        </div>
      </form>
    </div>
  );
};

export default MaterialRequestOpsPage;