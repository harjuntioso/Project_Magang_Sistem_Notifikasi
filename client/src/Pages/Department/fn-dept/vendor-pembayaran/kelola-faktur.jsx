import React, { useState } from 'react';
import {
  FaFileInvoiceDollar, // Ikon utama untuk faktur
  FaSearch,            // Cari
  FaFilter,            // Filter
  FaPlusCircle,        // Unggah faktur baru
  FaCheckCircle,       // Verifikasi/Setujui
  FaClock,             // Menunggu
  FaEye,               // Lihat Detail
  FaFileDownload,      // Unduh faktur
  FaFileUpload,        // Unggah
  FaClipboardList,
  FaChartBar
} from 'react-icons/fa';

const ManageIncomingInvoicesPage = () => {
  const [invoices, setInvoices] = useState([
    // Data dummy faktur masuk
    { id: 'INV001', invoiceNumber: 'INV-2025-06-001', vendorName: 'PT Solusi Abadi', amount: 15000000, receivedDate: '2025-06-10', dueDate: '2025-06-20', status: 'Menunggu Verifikasi', attachedFile: 'invoice_SA001.pdf' },
    { id: 'INV002', invoiceNumber: 'INV-2025-06-002', vendorName: 'PT Cahaya Logistik', amount: 4000000, receivedDate: '2025-06-11', dueDate: '2025-06-25', status: 'Menunggu Verifikasi', attachedFile: 'invoice_CL002.pdf' },
    { id: 'INV003', invoiceNumber: 'INV-2025-05-010', vendorName: 'CV Kreasi Digital', amount: 8000000, receivedDate: '2025-06-01', dueDate: '2025-06-05', status: 'Diverifikasi', attachedFile: 'invoice_KD010.pdf' },
    { id: 'INV004', invoiceNumber: 'INV-2025-05-025', vendorName: 'UD Lestari Perkasa', amount: 2500000, receivedDate: '2025-05-01', dueDate: '2025-05-10', status: 'Ditolak', attachedFile: 'invoice_UL025.pdf' },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Menunggu Verifikasi'); // Default: hanya menunggu verifikasi
  const [filterVendor, setFilterVendor] = useState('All');

  const filteredInvoices = invoices.filter(invoice =>
    (filterStatus === 'All' || invoice.status === filterStatus) &&
    (filterVendor === 'All' || invoice.vendorName === filterVendor) &&
    (invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
     invoice.vendorName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Menunggu Verifikasi': return 'bg-orange-200 text-orange-800';
      case 'Diverifikasi': return 'bg-green-200 text-green-800';
      case 'Ditolak': return 'bg-red-200 text-red-800';
      case 'Menunggu Pembayaran': return 'bg-blue-200 text-blue-800'; // Jika ada status ini
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const handleVerifyInvoice = (id) => {
    if (window.confirm(`Verifikasi faktur ID ${id}?`)) {
      alert(`Faktur ID ${id} berhasil diverifikasi.`);
      setInvoices(invoices.map(inv =>
        inv.id === id ? { ...inv, status: 'Diverifikasi' } : inv
      ));
      // Logika update ke backend
    }
  };

  const handleRejectInvoice = (id) => {
    if (window.confirm(`Tolak faktur ID ${id}?`)) {
      alert(`Faktur ID ${id} ditolak.`);
      setInvoices(invoices.map(inv =>
        inv.id === id ? { ...inv, status: 'Ditolak' } : inv
      ));
      // Logika update ke backend
    }
  };

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-info-dark mb-8 flex items-center gap-3">
        <FaFileInvoiceDollar className="w-8 h-8 text-info" />
        Kelola Faktur Masuk
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Proses dan verifikasi semua faktur yang diterima dari vendor.
      </p>

      {/* Filter Faktur */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-info">
        <h2 className="text-xl font-semibold mb-4 text-info-dark flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-info" />
          Filter Faktur
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="search-invoice" className="block text-gray-700 font-medium mb-1">Cari Faktur</label>
            <input
              type="text"
              id="search-invoice"
              placeholder="No. Faktur, Vendor..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-info focus:border-info"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-status" className="block text-gray-700 font-medium mb-1">Status Faktur</label>
            <select
              id="filter-status"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-info focus:border-info"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
              <option value="Diverifikasi">Diverifikasi</option>
              <option value="Ditolak">Ditolak</option>
              <option value="All">Semua Status</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-vendor" className="block text-gray-700 font-medium mb-1">Nama Vendor</label>
            <select
              id="filter-vendor"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-info focus:border-info"
              value={filterVendor}
              onChange={(e) => setFilterVendor(e.target.value)}
            >
              <option value="All">Semua Vendor</option>
              <option value="PT Solusi Abadi">PT Solusi Abadi</option>
              <option value="CV Kreasi Digital">CV Kreasi Digital</option>
              {/* Tambahkan vendor lain */}
            </select>
          </div>
          <button className="px-6 py-2 bg-info text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2">
            <FaFileUpload className="w-4 h-4" /> Unggah Faktur
          </button>
        </div>
      </section>

      {/* Tabel Daftar Faktur Masuk */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaClipboardList className="w-5 h-5 text-primary" />
          Daftar Faktur Masuk ({filteredInvoices.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">No. Faktur</th>
                <th className="py-3 px-6 text-left">Vendor</th>
                <th className="py-3 px-6 text-right">Jumlah</th>
                <th className="py-3 px-6 text-left">Tgl. Diterima</th>
                <th className="py-3 px-6 text-left">Tgl. Jatuh Tempo</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{invoice.invoiceNumber}</td>
                    <td className="py-3 px-6 text-left">{invoice.vendorName}</td>
                    <td className="py-3 px-6 text-right">{formatRupiah(invoice.amount)}</td>
                    <td className="py-3 px-6 text-left">{invoice.receivedDate}</td>
                    <td className="py-3 px-6 text-left">{invoice.dueDate}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {invoice.status === 'Menunggu Verifikasi' && (
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleVerifyInvoice(invoice.id)}
                            className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-600 transition-colors"
                          >
                            Verifikasi
                          </button>
                          <button
                            onClick={() => handleRejectInvoice(invoice.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600 transition-colors"
                          >
                            Tolak
                          </button>
                        </div>
                      )}
                      {invoice.status !== 'Menunggu Verifikasi' && (
                        <div className="flex justify-center items-center gap-2">
                          <a href={`/faktur/${invoice.attachedFile}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 text-lg" title="Lihat Faktur">
                            <FaEye />
                          </a>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">Tidak ada faktur dengan status "{filterStatus}".</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Ringkasan Faktur (Opsional) */}
      <section className="bg-white rounded-xl shadow-md p-6 mt-8 border-l-4 border-secondary">
        <h2 className="text-xl font-semibold mb-4 text-secondary-dark flex items-center gap-2">
          <FaChartBar className="w-5 h-5 text-secondary" />
          Ringkasan Faktur
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-gray-500 text-sm">Total Faktur Bulan Ini</p>
            <p className="text-2xl font-bold text-secondary">15</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Jumlah Menunggu Verifikasi</p>
            <p className="text-2xl font-bold text-orange-500">3</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Nilai Faktur (Bulan Ini)</p>
            <p className="text-2xl font-bold text-green-700">{formatRupiah(85000000)}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManageIncomingInvoicesPage;