import React, { useState } from 'react';
import {
  FaWarehouse,      // Ikon utama untuk inventaris
  FaSearch,         // Cari
  FaFilter,         // Filter
  FaPlusCircle,     // Tambah aset baru
  FaEdit,           // Edit detail aset
  FaTrash,          // Hapus aset
  FaChair,          // Furnitur
  FaUtensils,       // Peralatan Dapur
  FaToolbox,        // Perlengkapan Umum
  FaMapMarkerAlt,   // Lokasi
  FaFileDownload
} from 'react-icons/fa';

const NonItInventoryListPage = () => {
  const [assets, setAssets] = useState([
    // Data dummy aset non-IT
    { id: 'ASTN001', name: 'Meja Kantor Eksekutif', type: 'Furnitur', brand: 'Ikea', serial: 'MEJIK001', location: 'Kantor Direktur Utama', status: 'Good', lastMaintenance: '2025-01-10' },
    { id: 'ASTN002', name: 'Kursi Ergonomis', type: 'Furnitur', brand: 'Herman Miller', serial: 'KUREGM002', location: 'Lantai 2 - Area Kerja', status: 'Good', lastMaintenance: '2025-01-10' },
    { id: 'ASTN003', name: 'Mesin Kopi Otomatis', type: 'Peralatan Dapur', brand: 'Delonghi', serial: 'MKOTM003', location: 'Pantry Lantai 1', status: 'Good', lastMaintenance: '2025-05-01' },
    { id: 'ASTN004', name: 'Whiteboard Besar', type: 'Perlengkapan Kantor', brand: 'Standard', serial: 'WHTBD004', location: 'Ruang Rapat Utama', status: 'Good', lastMaintenance: '2025-02-20' },
    { id: 'ASTN005', name: 'Kulkas Pantry', type: 'Peralatan Dapur', brand: 'Sharp', serial: 'KLKSPNT005', location: 'Pantry Lantai 2', status: 'Service Needed', lastMaintenance: '2025-03-15' },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterLocation, setFilterLocation] = useState('All');

  const filteredAssets = assets.filter(asset =>
    (filterType === 'All' || asset.type === filterType) &&
    (filterStatus === 'All' || asset.status === filterStatus) &&
    (filterLocation === 'All' || asset.location.includes(filterLocation)) &&
    (asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     asset.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
     asset.serial.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getAssetIcon = (type) => {
    switch (type) {
      case 'Furnitur': return <FaChair className="text-brown-500" />;
      case 'Peralatan Dapur': return <FaUtensils className="text-orange-500" />;
      case 'Perlengkapan Kantor': return <FaToolbox className="text-blue-500" />;
      default: return <FaWarehouse className="text-gray-500" />;
    }
  };

  const handleEditAsset = (id) => {
    alert(`Mengedit detail aset ID: ${id}`);
    // Arahkan ke halaman edit aset atau buka modal
    // Contoh: navigate(`/management/umum/aset/edit/${id}`);
  };

  const handleDeleteAsset = (id, name) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus aset "${name}"?`)) {
      alert(`Menghapus aset ID: ${id}`);
      setAssets(assets.filter(a => a.id !== id));
      // Logika untuk menghapus dari backend
    }
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-yellow-700 mb-8 flex items-center gap-3">
        <FaWarehouse className="w-8 h-8 text-yellow-500" />
        Daftar Inventaris Non-IT
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Kelola inventaris lengkap semua aset non-IT perusahaan, termasuk furnitur, peralatan kantor, dan perlengkapan umum.
      </p>

      {/* Filter dan Aksi Cepat */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-yellow-500">
        <h2 className="text-xl font-semibold mb-4 text-yellow-700 flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-yellow-500" />
          Filter & Aksi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
          <div>
            <label htmlFor="search-asset" className="block text-gray-700 font-medium mb-1">Cari Aset</label>
            <input
              type="text"
              id="search-asset"
              placeholder="Nama, Serial, Brand..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-type" className="block text-gray-700 font-medium mb-1">Jenis Aset</label>
            <select
              id="filter-type"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">Semua Jenis</option>
              <option value="Furnitur">Furnitur</option>
              <option value="Peralatan Dapur">Peralatan Dapur</option>
              <option value="Perlengkapan Kantor">Perlengkapan Kantor</option>
              {/* Tambahkan jenis aset lain */}
            </select>
          </div>
          <div>
            <label htmlFor="filter-status" className="block text-gray-700 font-medium mb-1">Status</label>
            <select
              id="filter-status"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">Semua Status</option>
              <option value="Good">Baik</option>
              <option value="Minor Damage">Rusak Minor</option>
              <option value="Major Damage">Rusak Parah</option>
              <option value="Service Needed">Perlu Perbaikan</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-location" className="block text-gray-700 font-medium mb-1">Lokasi</label>
            <select
              id="filter-location"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            >
              <option value="All">Semua Lokasi</option>
              <option value="Lantai 1">Lantai 1</option>
              <option value="Lantai 2">Lantai 2</option>
              <option value="Pantry Lantai 1">Pantry Lantai 1</option>
              <option value="Kantor Direktur Utama">Kantor Direktur Utama</option>
              {/* Tambahkan lokasi spesifik lainnya */}
            </select>
          </div>
          <div className="md:col-span-1 flex flex-col sm:flex-row gap-2">
            <a href="/management/umum/aset-perusahaan/tambah" className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors duration-200 flex items-center justify-center gap-2">
              <FaPlusCircle className="w-4 h-4" /> Tambah Baru
            </a>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2">
              <FaFileDownload className="w-4 h-4" /> Unduh Data
            </button>
          </div>
        </div>
      </section>

      {/* Tabel Daftar Aset Non-IT */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaWarehouse className="w-5 h-5 text-primary" />
          Daftar Aset Non-IT ({filteredAssets.length} item)
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Nama Aset</th>
                <th className="py-3 px-6 text-left">Jenis</th>
                <th className="py-3 px-6 text-left">Lokasi</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Perawatan Terakhir</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredAssets.length > 0 ? (
                filteredAssets.map((asset) => (
                  <tr key={asset.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left font-medium">{asset.id}</td>
                    <td className="py-3 px-6 text-left whitespace-nowrap flex items-center gap-2">
                      {getAssetIcon(asset.type)} {asset.name}
                    </td>
                    <td className="py-3 px-6 text-left">{asset.type}</td>
                    <td className="py-3 px-6 text-left flex items-center gap-1"><FaMapMarkerAlt className="text-xs text-gray-500" />{asset.location}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${
                        asset.status === 'Good' ? 'bg-green-200 text-green-800' :
                        asset.status === 'Service Needed' ? 'bg-orange-200 text-orange-800' :
                        'bg-red-200 text-red-800'
                      }`}>
                        {asset.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left text-xs text-gray-500">{asset.lastMaintenance}</td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <button onClick={() => handleEditAsset(asset.id)} className="text-blue-500 hover:text-blue-700 text-lg" title="Edit">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDeleteAsset(asset.id, asset.name)} className="text-red-500 hover:text-red-700 text-lg" title="Hapus">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">Tidak ada aset non-IT ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default NonItInventoryListPage;