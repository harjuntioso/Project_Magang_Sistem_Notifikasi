import React, { useState } from 'react';
import {
  FaUsers,        // Ikon utama
  FaSearch,       // Cari
  FaFilter,       // Filter
  FaPlusCircle,   // Tambah akun baru
  FaEdit,         // Edit detail akun
  FaTrash,        // Hapus akun
  FaUnlockAlt,    // Status akun
  FaUserCog,      // Role/Hak Akses
  FaEnvelope,     // Email
  FaFileDownload
} from 'react-icons/fa';

const UserAccountListPage = () => {
  const [userAccounts, setUserAccounts] = useState([
    // Data dummy akun pengguna
    { id: 'USR001', username: 'budi.s', fullName: 'Budi Santoso', email: 'budi.s@perusahaan.com', department: 'Operasional', role: 'Supervisor', status: 'Active', lastLogin: '2025-06-11 10:00' },
    { id: 'USR002', username: 'siti.n', fullName: 'Siti Nurhayati', email: 'siti.n@perusahaan.com', department: 'HRD', role: 'Staff HRD', status: 'Active', lastLogin: '2025-06-11 11:30' },
    { id: 'USR003', username: 'joko.w', fullName: 'Joko Widodo', email: 'joko.w@perusahaan.com', department: 'Keuangan', role: 'Akuntan', status: 'Active', lastLogin: '2025-06-10 09:00' },
    { id: 'USR004', username: 'guest.event', fullName: 'Akun Tamu Event', email: 'guest@perusahaan.com', department: 'N/A', role: 'Guest', status: 'Inactive', lastLogin: null },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('Active'); // Default: hanya akun aktif

  const filteredAccounts = userAccounts.filter(account =>
    account.status === filterStatus &&
    (filterDepartment === 'All' || account.department === filterDepartment) &&
    (filterRole === 'All' || account.role === filterRole) &&
    (account.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
     account.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     account.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEditAccount = (id) => {
    alert(`Mengedit detail akun ID: ${id}`);
    // Arahkan ke halaman edit akun
    // Contoh: navigate(`/management/it/akun/edit/${id}`);
  };

  const handleDeleteAccount = (id, username) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus akun "${username}"?`)) {
      alert(`Menghapus akun ID: ${id}`);
      setUserAccounts(userAccounts.filter(acc => acc.id !== id));
      // Logika untuk menghapus dari backend
    }
  };

  const handleToggleAccountStatus = (id, currentStatus) => {
    alert(`Mengubah status akun ID: ${id} menjadi ${currentStatus === 'Active' ? 'Inactive' : 'Active'}`);
    // Logika untuk memperbarui status di backend
    setUserAccounts(userAccounts.map(acc =>
      acc.id === id ? { ...acc, status: currentStatus === 'Active' ? 'Inactive' : 'Active' } : acc
    ));
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-accent-dark mb-8 flex items-center gap-3">
        <FaUsers className="w-8 h-8 text-accent" />
        Daftar Akun Pengguna
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Kelola dan pantau semua akun pengguna yang terdaftar dalam sistem internal perusahaan.
      </p>

      {/* Filter dan Aksi Cepat */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-accent">
        <h2 className="text-xl font-semibold mb-4 text-accent-dark flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-accent" />
          Filter & Aksi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
          <div>
            <label htmlFor="search-account" className="block text-gray-700 font-medium mb-1">Cari Akun</label>
            <input
              type="text"
              id="search-account"
              placeholder="Username, Nama, Email..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-department" className="block text-gray-700 font-medium mb-1">Departemen</label>
            <select
              id="filter-department"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
            >
              <option value="All">Semua</option>
              <option value="Operasional">Operasional</option>
              <option value="HRD">HRD</option>
              <option value="Keuangan">Keuangan</option>
              <option value="Pemasaran">Pemasaran</option>
              <option value="IT">IT</option>
              <option value="Umum">Umum & Administrasi</option>
              <option value="N/A">N/A (Tamu)</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-role" className="block text-gray-700 font-medium mb-1">Role</label>
            <select
              id="filter-role"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="All">Semua Role</option>
              <option value="Admin">Admin</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Staff">Staff</option>
              <option value="Guest">Guest</option>
              {/* Tambahkan role lain */}
            </select>
          </div>
          <div>
            <label htmlFor="filter-status" className="block text-gray-700 font-medium mb-1">Status Akun</label>
            <select
              id="filter-status"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="Active">Aktif</option>
              <option value="Inactive">Tidak Aktif</option>
              <option value="Locked">Terkunci</option>
            </select>
          </div>
          <div className="md:col-span-1 flex flex-col sm:flex-row gap-2">
            <a href="/management/it/akun/buat" className="px-4 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2">
              <FaPlusCircle className="w-4 h-4" /> Tambah Baru
            </a>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2">
              <FaFileDownload className="w-4 h-4" /> Unduh Data
            </button>
          </div>
        </div>
      </section>

      {/* Tabel Daftar Akun Pengguna */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaUsers className="w-5 h-5 text-primary" />
          Daftar Akun Pengguna ({filteredAccounts.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Username</th>
                <th className="py-3 px-6 text-left">Nama Lengkap</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Departemen</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Terakhir Login</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredAccounts.length > 0 ? (
                filteredAccounts.map((account) => (
                  <tr key={account.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left font-medium">{account.username}</td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">{account.fullName}</td>
                    <td className="py-3 px-6 text-left flex items-center gap-1"><FaEnvelope className="text-xs text-gray-500" />{account.email}</td>
                    <td className="py-3 px-6 text-left">{account.department}</td>
                    <td className="py-3 px-6 text-left">{account.role}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${
                        account.status === 'Active' ? 'bg-green-200 text-green-800' :
                        account.status === 'Inactive' ? 'bg-orange-200 text-orange-800' :
                        'bg-red-200 text-red-800'
                      }`}>
                        {account.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left text-xs text-gray-500">{account.lastLogin || '-'}</td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <button onClick={() => handleEditAccount(account.id)} className="text-blue-500 hover:text-blue-700 text-lg" title="Edit Akun">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleToggleAccountStatus(account.id, account.status)} className={`text-lg ${account.status === 'Active' ? 'text-orange-500 hover:text-orange-700' : 'text-green-500 hover:text-green-700'}`} title={account.status === 'Active' ? 'Nonaktifkan Akun' : 'Aktifkan Akun'}>
                          <FaUnlockAlt />
                        </button>
                        <button onClick={() => handleDeleteAccount(account.id, account.username)} className="text-red-500 hover:text-red-700 text-lg" title="Hapus Akun">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-4 text-center text-gray-500">Tidak ada akun pengguna ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default UserAccountListPage;