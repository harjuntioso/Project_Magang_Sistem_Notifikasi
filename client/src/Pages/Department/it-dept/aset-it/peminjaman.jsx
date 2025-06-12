import React, { useState } from 'react';
import {
  FaExchangeAlt,   // Ikon utama
  FaPlusCircle,    // Pinjam baru
  FaUndo,          // Kembalikan
  FaSearch,        // Cari
  FaFilter,        // Filter
  FaClock,         // Status
  FaUser,          // Peminjam
  FaLaptopCode,    // Perangkat
} from 'react-icons/fa';

const ItLoanReturnPage = () => {
  const [loans, setLoans] = useState([
    // Data dummy peminjaman
    { id: 'LOAN001', deviceId: 'LT005', deviceName: 'Laptop Direktur Utama', borrower: 'Direktur Utama', loanDate: '2025-06-01', returnDateExpected: '2025-06-30', returnDateActual: null, status: 'On Loan' },
    { id: 'LOAN002', deviceId: 'MBL001', deviceName: 'Smartphone Operasional', borrower: 'Supervisor Operasional', loanDate: '2025-05-10', returnDateExpected: '2025-06-10', returnDateActual: '2025-06-10', status: 'Returned' },
    { id: 'LOAN003', deviceId: 'PC001', deviceName: 'Desktop PC Lantai 1', borrower: 'Staff HRD', loanDate: '2025-06-05', returnDateExpected: '2025-06-12', returnDateActual: null, status: 'On Loan' },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('On Loan'); // Default: hanya yang sedang dipinjam

  const filteredLoans = loans.filter(loan =>
    (filterStatus === 'All' || loan.status === filterStatus) &&
    (loan.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     loan.borrower.toLowerCase().includes(searchTerm.toLowerCase()) ||
     loan.deviceId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleReturnDevice = (loanId) => {
    if (window.confirm(`Apakah Anda yakin perangkat ini (${loanId}) sudah dikembalikan?`)) {
      alert(`Perangkat untuk peminjaman ${loanId} berhasil dikembalikan.`);
      // Logika untuk memperbarui status di backend
      setLoans(loans.map(loan =>
        loan.id === loanId ? { ...loan, status: 'Returned', returnDateActual: new Date().toISOString().slice(0, 10) } : loan
      ));
    }
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-primary-dark mb-8 flex items-center gap-3">
        <FaExchangeAlt className="w-8 h-8 text-primary" />
        Peminjaman & Pengembalian Aset IT
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Kelola proses peminjaman dan pengembalian perangkat IT oleh karyawan.
      </p>

      {/* Filter dan Aksi Cepat */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-primary" />
          Filter Peminjaman
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label htmlFor="search-loan" className="block text-gray-700 font-medium mb-1">Cari Peminjaman</label>
            <input
              type="text"
              id="search-loan"
              placeholder="Nama Perangkat, Peminjam, ID..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-status" className="block text-gray-700 font-medium mb-1">Status Peminjaman</label>
            <select
              id="filter-status"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">Semua Status</option>
              <option value="On Loan">Sedang Dipinjam</option>
              <option value="Returned">Sudah Dikembalikan</option>
              <option value="Overdue">Jatuh Tempo</option>
            </select>
          </div>
          <a href="/management/it/aset/peminjaman/buat-baru" className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200 flex items-center justify-center gap-2">
            <FaPlusCircle className="w-4 h-4" /> Pinjam Baru
          </a>
        </div>
      </section>

      {/* Tabel Daftar Peminjaman */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-accent">
        <h2 className="text-xl font-semibold mb-4 text-accent-dark flex items-center gap-2">
          <FaClipboardList className="w-5 h-5 text-accent" />
          Daftar Peminjaman ({filteredLoans.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID Peminjaman</th>
                <th className="py-3 px-6 text-left">Perangkat IT</th>
                <th className="py-3 px-6 text-left">Peminjam</th>
                <th className="py-3 px-6 text-left">Tanggal Pinjam</th>
                <th className="py-3 px-6 text-left">Tgl. Kembali (Estimasi)</th>
                <th className="py-3 px-6 text-left">Tgl. Kembali (Aktual)</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredLoans.length > 0 ? (
                filteredLoans.map((loan) => (
                  <tr key={loan.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left font-medium">{loan.id}</td>
                    <td className="py-3 px-6 text-left flex items-center gap-2 whitespace-nowrap">
                      <FaLaptopCode className="text-sm" /> {loan.deviceName} ({loan.deviceId})
                    </td>
                    <td className="py-3 px-6 text-left">{loan.borrower}</td>
                    <td className="py-3 px-6 text-left">{loan.loanDate}</td>
                    <td className="py-3 px-6 text-left">{loan.returnDateExpected}</td>
                    <td className="py-3 px-6 text-left">{loan.returnDateActual || '-'}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${
                        loan.status === 'On Loan' ? 'bg-blue-200 text-blue-800' :
                        loan.status === 'Returned' ? 'bg-green-200 text-green-800' :
                        'bg-red-200 text-red-800' // Untuk Overdue
                      }`}>
                        {loan.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {loan.status === 'On Loan' && (
                        <button onClick={() => handleReturnDevice(loan.id)} className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-600 transition-colors flex items-center justify-center gap-1 mx-auto">
                          <FaUndo /> Kembalikan
                        </button>
                      )}
                      {loan.status === 'Returned' && (
                        <button className="text-blue-500 hover:text-blue-700 text-sm">Detail</button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-4 text-center text-gray-500">Tidak ada riwayat peminjaman yang ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ItLoanReturnPage;