import React, { useState } from 'react';
import {
  FaHandshake,       // Ikon utama untuk vendor
  FaSearch,          // Cari
  FaFilter,          // Filter
  FaPlusCircle,      // Tambah vendor baru
  FaEdit,            // Edit detail vendor
  FaTrash,           // Hapus vendor
  FaBuilding,        // Tipe Vendor (Perusahaan)
  FaUserTie,         // Kontak Person
  FaPhone,           // Telepon
  FaEnvelope,        // Email
  FaDollarSign,      // Keuangan
  FaFileDownload
} from 'react-icons/fa';

const ActiveVendorListPage = () => {
  const [vendors, setVendors] = useState([
    // Data dummy vendor aktif
    { id: 'VEN001', name: 'PT Solusi Abadi', type: 'Penyedia Bahan Baku', contactPerson: 'Budi (0812-XXXX)', email: 'admin@solusiabadi.com', status: 'Aktif', contractEndDate: '2025-12-31', lastPayment: '2025-05-20' },
    { id: 'VEN002', name: 'CV Kreasi Digital', type: 'Jasa Pemasaran', contactPerson: 'Siti (0813-XXXX)', email: 'info@kreasidigital.com', status: 'Aktif', contractEndDate: '2026-03-15', lastPayment: '2025-06-05' },
    { id: 'VEN003', name: 'UD Lestari Perkasa', type: 'Penyedia Perlengkapan Kantor', contactPerson: 'Joko (0878-XXXX)', email: 'ud.lestari@email.com', status: 'Aktif', contractEndDate: '2025-09-30', lastPayment: '2025-04-10' },
    { id: 'VEN004', name: 'PT Cahaya Logistik', type: 'Jasa Pengiriman', contactPerson: 'Ayu (0857-XXXX)', email: 'logistik@cahaya.com', status: 'Aktif', contractEndDate: '2025-11-20', lastPayment: '2025-05-25' },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('Aktif'); // Default: hanya vendor aktif
  const [editingVendorId, setEditingVendorId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const filteredVendors = vendors.filter(vendor =>
    vendor.status === filterStatus &&
    (filterType === 'All' || vendor.type === filterType) &&
    (vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
     vendor.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEditClick = (vendor) => {
    setEditingVendorId(vendor.id);
    setEditFormData({ ...vendor });
  };

  const handleSaveEdit = (id) => {
    // Logika untuk menyimpan perubahan ke backend
    alert(`Data vendor ${editFormData.name} berhasil diperbarui.`);
    setVendors(vendors.map(v => v.id === id ? editFormData : v));
    setEditingVendorId(null);
    setEditFormData({});
  };

  const handleCancelEdit = () => {
    setEditingVendorId(null);
    setEditFormData({});
  };

  const handleDeleteVendor = (id, name) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus vendor "${name}"?`)) {
      alert(`Vendor ID: ${id} dihapus.`);
      setVendors(vendors.filter(v => v.id !== id));
      // Logika untuk menghapus dari backend
    }
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-primary-dark mb-8 flex items-center gap-3">
        <FaHandshake className="w-8 h-8 text-primary" />
        Daftar Vendor Aktif
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Kelola dan pantau semua vendor yang memiliki kerja sama aktif dengan perusahaan.
      </p>

      {/* Filter dan Aksi Cepat */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-primary" />
          Filter & Aksi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
          <div>
            <label htmlFor="search-vendor" className="block text-gray-700 font-medium mb-1">Cari Vendor</label>
            <input
              type="text"
              id="search-vendor"
              placeholder="Nama, Kontak, Email..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-type" className="block text-gray-700 font-medium mb-1">Tipe Vendor</label>
            <select
              id="filter-type"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">Semua Tipe</option>
              <option value="Penyedia Bahan Baku">Penyedia Bahan Baku</option>
              <option value="Jasa Pemasaran">Jasa Pemasaran</option>
              <option value="Penyedia Perlengkapan Kantor">Perlengkapan Kantor</option>
              <option value="Jasa Pengiriman">Jasa Pengiriman</option>
              {/* Tambahkan tipe vendor lain */}
            </select>
          </div>
          <div>
            <label htmlFor="filter-status" className="block text-gray-700 font-medium mb-1">Status</label>
            <select
              id="filter-status"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="Aktif">Aktif</option>
              <option value="Nonaktif">Nonaktif</option>
              <option value="All">Semua Status</option>
            </select>
          </div>
          <div className="md:col-span-2 flex flex-col sm:flex-row gap-2">
            <a href="/management/keuangan/vendor/tambah" className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200 flex items-center justify-center gap-2">
              <FaPlusCircle className="w-4 h-4" /> Tambah Vendor
            </a>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2">
              <FaFileDownload className="w-4 h-4" /> Unduh Data
            </button>
          </div>
        </div>
      </section>

      {/* Tabel Daftar Vendor */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-accent">
        <h2 className="text-xl font-semibold mb-4 text-accent-dark flex items-center gap-2">
          <FaBuilding className="w-5 h-5 text-accent" />
          Daftar Vendor ({filteredVendors.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nama Vendor</th>
                <th className="py-3 px-6 text-left">Tipe</th>
                <th className="py-3 px-6 text-left">Kontak Person</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Tgl. Akhir Kontrak</th>
                <th className="py-3 px-6 text-left">Terakhir Dibayar</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredVendors.length > 0 ? (
                filteredVendors.map((vendor) => (
                  <tr key={vendor.id} className="border-b border-gray-200 hover:bg-gray-50">
                    {editingVendorId === vendor.id ? (
                      <>
                        <td className="py-3 px-6"><input type="text" value={editFormData.name} onChange={(e) => setEditFormData({...editFormData, name: e.target.value})} className="w-full p-1 border rounded" /></td>
                        <td className="py-3 px-6"><input type="text" value={editFormData.type} onChange={(e) => setEditFormData({...editFormData, type: e.target.value})} className="w-full p-1 border rounded" /></td>
                        <td className="py-3 px-6"><input type="text" value={editFormData.contactPerson} onChange={(e) => setEditFormData({...editFormData, contactPerson: e.target.value})} className="w-full p-1 border rounded" /></td>
                        <td className="py-3 px-6"><input type="email" value={editFormData.email} onChange={(e) => setEditFormData({...editFormData, email: e.target.value})} className="w-full p-1 border rounded" /></td>
                        <td className="py-3 px-6"><input type="date" value={editFormData.contractEndDate} onChange={(e) => setEditFormData({...editFormData, contractEndDate: e.target.value})} className="w-full p-1 border rounded" /></td>
                        <td className="py-3 px-6 text-gray-500">{editFormData.lastPayment}</td>
                        <td className="py-3 px-6"><select value={editFormData.status} onChange={(e) => setEditFormData({...editFormData, status: e.target.value})} className="w-full p-1 border rounded">
                          <option value="Aktif">Aktif</option>
                          <option value="Nonaktif">Nonaktif</option>
                          </select></td>
                        <td className="py-3 px-6 text-center">
                          <button onClick={() => handleSaveEdit(vendor.id)} className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-600 mr-2">Simpan</button>
                          <button onClick={handleCancelEdit} className="bg-gray-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-gray-600">Batal</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{vendor.name}</td>
                        <td className="py-3 px-6 text-left">{vendor.type}</td>
                        <td className="py-3 px-6 text-left flex items-center gap-1"><FaUserTie className="text-xs text-gray-500" />{vendor.contactPerson}</td>
                        <td className="py-3 px-6 text-left flex items-center gap-1"><FaEnvelope className="text-xs text-gray-500" />{vendor.email}</td>
                        <td className="py-3 px-6 text-left text-sm">{vendor.contractEndDate}</td>
                        <td className="py-3 px-6 text-left text-sm">{vendor.lastPayment}</td>
                        <td className="py-3 px-6 text-left">
                          <span className={`py-1 px-3 rounded-full text-xs font-semibold ${
                            vendor.status === 'Aktif' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                          }`}>
                            {vendor.status}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex justify-center items-center gap-2">
                            <button onClick={() => handleEditClick(vendor)} className="text-blue-500 hover:text-blue-700 text-lg" title="Edit">
                              <FaEdit />
                            </button>
                            <button onClick={() => handleDeleteVendor(vendor.id, vendor.name)} className="text-red-500 hover:text-red-700 text-lg" title="Hapus">
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-4 text-center text-gray-500">Tidak ada vendor aktif ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ActiveVendorListPage;