import React, { useState } from 'react';
import {
  FaTools,          // Ikon utama untuk suku cadang
  FaWarehouse,      // Stok
  FaSearch,         // Cari
  FaFilter,         // Filter
  FaPlusCircle,     // Tambah stok baru
  FaExclamationTriangle, // Stok rendah
  FaCheckCircle,    // Stok cukup
  FaFileDownload,   // Unduh
} from 'react-icons/fa';

const SparePartsStockPage = () => {
  const [parts, setParts] = useState([
    // Data dummy suku cadang
    { id: 'SP001', name: 'Roda Roller Coaster (Kecil)', currentStock: 5, minStock: 3, unit: 'pcs', supplier: 'Supplier A', lastUpdate: '2025-06-01' },
    { id: 'SP002', name: 'Filter Air Wahana Kolam', currentStock: 2, minStock: 5, unit: 'pcs', supplier: 'Supplier B', lastUpdate: '2025-06-05' },
    { id: 'SP003', name: 'Bohlam Lampu Dekorasi', currentStock: 50, minStock: 20, unit: 'pcs', supplier: 'Supplier C', lastUpdate: '2025-05-20' },
    { id: 'SP004', name: 'Sensor Keamanan Wahana X', currentStock: 1, minStock: 2, unit: 'pcs', supplier: 'Supplier D', lastUpdate: '2025-06-08' },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // All, Low Stock, Sufficient Stock
  const [filterSupplier, setFilterSupplier] = useState('All');

  const filteredParts = parts.filter(part => {
    const isLowStock = part.currentStock < part.minStock;
    return (
      (filterStatus === 'All' || (filterStatus === 'Low Stock' && isLowStock) || (filterStatus === 'Sufficient Stock' && !isLowStock)) &&
      (filterSupplier === 'All' || part.supplier === filterSupplier) &&
      (part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       part.supplier.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const getStockStatus = (current, min) => {
    if (current < min) return 'Low Stock';
    return 'Sufficient Stock';
  };

  const getStockStatusColor = (status) => {
    if (status === 'Low Stock') return 'bg-red-200 text-red-800';
    return 'bg-green-200 text-green-800';
  };

  const handleOrderMore = (partId, partName) => {
    alert(`Mengarahkan untuk memesan ${partName} lebih banyak.`);
    // Arahkan ke halaman permintaan bahan baku/barang dengan pre-filled data
    // Contoh: navigate(`/management/ops/permintaan-bahan-baku/buat?partId=${partId}`);
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-orange-700 mb-8 flex items-center gap-3">
        <FaTools className="w-8 h-8 text-orange-500" />
        Pemantauan Stok Suku Cadang
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Pantau level stok suku cadang untuk wahana dan atraksi, serta lakukan pemesanan ulang saat dibutuhkan.
      </p>

      {/* Filter dan Aksi Cepat */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-orange-500">
        <h2 className="text-xl font-semibold mb-4 text-orange-700 flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-orange-500" />
          Filter Stok
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="search-part" className="block text-gray-700 font-medium mb-1">Cari Suku Cadang</label>
            <input
              type="text"
              id="search-part"
              placeholder="Nama, Supplier..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-status" className="block text-gray-700 font-medium mb-1">Status Stok</label>
            <select
              id="filter-status"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">Semua</option>
              <option value="Low Stock">Stok Rendah</option>
              <option value="Sufficient Stock">Stok Cukup</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-supplier" className="block text-gray-700 font-medium mb-1">Supplier</label>
            <select
              id="filter-supplier"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              value={filterSupplier}
              onChange={(e) => setFilterSupplier(e.target.value)}
            >
              <option value="All">Semua Supplier</option>
              <option value="Supplier A">Supplier A</option>
              <option value="Supplier B">Supplier B</option>
              <option value="Supplier C">Supplier C</option>
              {/* Tambahkan supplier lain */}
            </select>
          </div>
          <div className="md:col-span-1 flex flex-col sm:flex-row gap-2">
            <a href="/management/ops/permintaan-bahan-baku/buat" className="px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2">
              <FaPlusCircle className="w-4 h-4" /> Ajukan Permintaan
            </a>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2">
              <FaFileDownload className="w-4 h-4" /> Unduh Data
            </button>
          </div>
        </div>
      </section>

      {/* Tabel Pemantauan Stok Suku Cadang */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaWarehouse className="w-5 h-5 text-primary" />
          Daftar Suku Cadang ({filteredParts.length} item)
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nama Suku Cadang</th>
                <th className="py-3 px-6 text-left">Stok Saat Ini</th>
                <th className="py-3 px-6 text-left">Stok Minimum</th>
                <th className="py-3 px-6 text-left">Status Stok</th>
                <th className="py-3 px-6 text-left">Supplier</th>
                <th className="py-3 px-6 text-left">Terakhir Diperbarui</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredParts.length > 0 ? (
                filteredParts.map((part) => (
                  <tr key={part.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{part.name}</td>
                    <td className="py-3 px-6 text-left">{part.currentStock} {part.unit}</td>
                    <td className="py-3 px-6 text-left">{part.minStock} {part.unit}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getStockStatusColor(getStockStatus(part.currentStock, part.minStock))}`}>
                        {getStockStatus(part.currentStock, part.minStock) === 'Low Stock' && <FaExclamationTriangle className="inline-block mr-1" />}
                        {getStockStatus(part.currentStock, part.minStock) === 'Sufficient Stock' && <FaCheckCircle className="inline-block mr-1" />}
                        {getStockStatus(part.currentStock, part.minStock)}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">{part.supplier}</td>
                    <td className="py-3 px-6 text-left text-xs text-gray-500">{part.lastUpdate}</td>
                    <td className="py-3 px-6 text-center">
                      {getStockStatus(part.currentStock, part.minStock) === 'Low Stock' && (
                        <button onClick={() => handleOrderMore(part.id, part.name)} className="bg-orange-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-orange-600 transition-colors flex items-center justify-center gap-1 mx-auto">
                          <FaPlusCircle /> Pesan
                        </button>
                      )}
                      {getStockStatus(part.currentStock, part.minStock) !== 'Low Stock' && (
                        <button className="text-blue-500 hover:text-blue-700 text-sm">Detail</button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">Tidak ada suku cadang ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default SparePartsStockPage;