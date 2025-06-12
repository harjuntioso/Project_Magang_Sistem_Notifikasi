import React, { useState } from 'react';
import {
  FaMoneyBillWave,  // Ikon utama untuk pembayaran
  FaCalendarAlt,    // Jadwal
  FaCheckCircle,    // Dibayar
  FaClock,          // Menunggu
  FaTimesCircle,    // Jatuh tempo
  FaSearch,         // Cari
  FaFilter,         // Filter
  FaFileDownload,   // Unduh
  FaDollarSign,     // Jumlah
  FaClipboardList
} from 'react-icons/fa';

const PaymentScheduleStatusPage = () => {
  const [payments, setPayments] = useState([
    // Data dummy pembayaran
    { id: 'PAY001', invoiceNumber: 'INV-2025-06-001', vendorName: 'PT Solusi Abadi', amount: 15000000, dueDate: '2025-06-20', paymentDate: null, status: 'Menunggu Pembayaran' },
    { id: 'PAY002', invoiceNumber: 'INV-2025-05-010', vendorName: 'CV Kreasi Digital', amount: 8000000, dueDate: '2025-06-05', paymentDate: '2025-06-05', status: 'Sudah Dibayar' },
    { id: 'PAY003', invoiceNumber: 'INV-2025-04-025', vendorName: 'UD Lestari Perkasa', amount: 2500000, dueDate: '2025-05-10', paymentDate: null, status: 'Jatuh Tempo' },
    { id: 'PAY004', invoiceNumber: 'INV-2025-06-002', vendorName: 'PT Cahaya Logistik', amount: 4000000, dueDate: '2025-06-25', paymentDate: null, status: 'Menunggu Pembayaran' },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterVendor, setFilterVendor] = useState('All');

  const filteredPayments = payments.filter(payment =>
    (filterStatus === 'All' || payment.status === filterStatus) &&
    (filterVendor === 'All' || payment.vendorName === filterVendor) &&
    (payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
     payment.vendorName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Sudah Dibayar': return 'bg-green-200 text-green-800';
      case 'Menunggu Pembayaran': return 'bg-blue-200 text-blue-800';
      case 'Jatuh Tempo': return 'bg-red-200 text-red-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const handleMarkAsPaid = (id) => {
    if (window.confirm(`Tandai pembayaran untuk faktur ID ${id} sebagai sudah dibayar?`)) {
      alert(`Pembayaran ID ${id} ditandai selesai.`);
      setPayments(payments.map(p =>
        p.id === id ? { ...p, status: 'Sudah Dibayar', paymentDate: new Date().toISOString().slice(0, 10) } : p
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
      <h1 className="text-3xl font-bold text-secondary-dark mb-8 flex items-center gap-3">
        <FaMoneyBillWave className="w-8 h-8 text-secondary" />
        Jadwal & Status Pembayaran
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Pantau jadwal pembayaran yang akan datang dan status pembayaran yang telah dilakukan kepada vendor.
      </p>

      {/* Filter Pembayaran */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-secondary">
        <h2 className="text-xl font-semibold mb-4 text-secondary-dark flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-secondary" />
          Filter Pembayaran
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="search-payment" className="block text-gray-700 font-medium mb-1">Cari Pembayaran</label>
            <input
              type="text"
              id="search-payment"
              placeholder="No. Faktur, Nama Vendor..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-status" className="block text-gray-700 font-medium mb-1">Status</label>
            <select
              id="filter-status"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">Semua Status</option>
              <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
              <option value="Sudah Dibayar">Sudah Dibayar</option>
              <option value="Jatuh Tempo">Jatuh Tempo</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-vendor" className="block text-gray-700 font-medium mb-1">Nama Vendor</label>
            <select
              id="filter-vendor"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
              value={filterVendor}
              onChange={(e) => setFilterVendor(e.target.value)}
            >
              <option value="All">Semua Vendor</option>
              <option value="PT Solusi Abadi">PT Solusi Abadi</option>
              <option value="CV Kreasi Digital">CV Kreasi Digital</option>
              <option value="UD Lestari Perkasa">UD Lestari Perkasa</option>
              {/* Tambahkan vendor lain */}
            </select>
          </div>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2">
            <FaFileDownload className="w-4 h-4" /> Unduh Laporan
          </button>
        </div>
      </section>

      {/* Tabel Jadwal Pembayaran */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaClipboardList className="w-5 h-5 text-primary" />
          Daftar Pembayaran ({filteredPayments.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">No. Faktur</th>
                <th className="py-3 px-6 text-left">Vendor</th>
                <th className="py-3 px-6 text-right">Jumlah</th>
                <th className="py-3 px-6 text-left">Tgl. Jatuh Tempo</th>
                <th className="py-3 px-6 text-left">Tgl. Pembayaran</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{payment.invoiceNumber}</td>
                    <td className="py-3 px-6 text-left">{payment.vendorName}</td>
                    <td className="py-3 px-6 text-right">{formatRupiah(payment.amount)}</td>
                    <td className="py-3 px-6 text-left">{payment.dueDate}</td>
                    <td className="py-3 px-6 text-left">{payment.paymentDate || '-'}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}>
                        {payment.status === 'Jatuh Tempo' && <FaTimesCircle className="inline-block mr-1" />}
                        {payment.status === 'Sudah Dibayar' && <FaCheckCircle className="inline-block mr-1" />}
                        {payment.status === 'Menunggu Pembayaran' && <FaClock className="inline-block mr-1" />}
                        {payment.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {payment.status === 'Menunggu Pembayaran' || payment.status === 'Jatuh Tempo' ? (
                        <button onClick={() => handleMarkAsPaid(payment.id)} className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-600 transition-colors flex items-center justify-center gap-1 mx-auto">
                          <FaCheckCircle /> Bayar
                        </button>
                      ) : (
                        <button className="text-blue-500 hover:text-blue-700 text-sm">Detail</button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">Tidak ada pembayaran yang ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default PaymentScheduleStatusPage;