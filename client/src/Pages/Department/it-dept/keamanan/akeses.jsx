import React, { useState } from 'react';
import {
  FaLock,           // Ikon utama untuk akses
  FaUserCog,        // Pengaturan user
  FaUserShield,     // Role
  FaSearch,         // Cari
  FaPlusCircle,     // Tambah
  FaEdit,           // Edit
  FaTrash,          // Hapus
  FaServer,         // Sumber Daya
} from 'react-icons/fa';

const AccessAuthorizationPage = () => {
  const [accessRules, setAccessRules] = useState([
    // Data dummy aturan akses
    { id: 1, userGroup: 'Departemen HRD', resource: 'Sistem HRIS', accessLevel: 'Full Access', lastUpdated: '2025-01-01', managedBy: 'Admin IT' },
    { id: 2, userGroup: 'Departemen Keuangan', resource: 'Sistem Akuntansi', accessLevel: 'Full Access', lastUpdated: '2025-01-01', managedBy: 'Admin IT' },
    { id: 3, userGroup: 'Semua Karyawan', resource: 'Intranet Perusahaan', accessLevel: 'Read Only', lastUpdated: '2025-02-15', managedBy: 'Admin IT' },
    { id: 4, userGroup: 'Manajer Operasional', resource: 'Dashboard Operasional', accessLevel: 'View Only', lastUpdated: '2025-05-01', managedBy: 'Admin IT' },
    { id: 5, userGroup: 'Tim Pemasaran', resource: 'File Server (Marketing)', accessLevel: 'Write Access', lastUpdated: '2025-03-20', managedBy: 'Admin IT' },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterUserGroup, setFilterUserGroup] = useState('All');
  const [filterResource, setFilterResource] = useState('All');

  const filteredRules = accessRules.filter(rule =>
    (filterUserGroup === 'All' || rule.userGroup === filterUserGroup) &&
    (filterResource === 'All' || rule.resource === filterResource) &&
    (rule.userGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
     rule.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
     rule.accessLevel.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEditRule = (id) => {
    alert(`Mengedit aturan akses ID: ${id}`);
    // Arahkan ke halaman edit aturan akses atau buka modal
  };

  const handleDeleteRule = (id, group, resource) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus aturan akses untuk ${group} ke ${resource}?`)) {
      alert(`Aturan akses ID: ${id} dihapus.`);
      setAccessRules(accessRules.filter(rule => rule.id !== id));
      // Logika untuk menghapus dari backend
    }
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-accent-dark mb-8 flex items-center gap-3">
        <FaLock className="w-8 h-8 text-accent" />
        Pengaturan Akses & Otorisasi
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Kelola hak akses dan otorisasi pengguna ke berbagai sistem dan sumber daya perusahaan.
      </p>

      {/* Filter dan Aksi Cepat */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-accent">
        <h2 className="text-xl font-semibold mb-4 text-accent-dark flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-accent" />
          Filter Aturan Akses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="search-rule" className="block text-gray-700 font-medium mb-1">Cari Aturan</label>
            <input
              type="text"
              id="search-rule"
              placeholder="Grup Pengguna, Sumber Daya..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-user-group" className="block text-gray-700 font-medium mb-1">Grup Pengguna</label>
            <select
              id="filter-user-group"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
              value={filterUserGroup}
              onChange={(e) => setFilterUserGroup(e.target.value)}
            >
              <option value="All">Semua Grup</option>
              <option value="Departemen HRD">Departemen HRD</option>
              <option value="Departemen Keuangan">Departemen Keuangan</option>
              <option value="Semua Karyawan">Semua Karyawan</option>
              {/* Tambahkan grup pengguna lain */}
            </select>
          </div>
          <div>
            <label htmlFor="filter-resource" className="block text-gray-700 font-medium mb-1">Sumber Daya</label>
            <select
              id="filter-resource"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
              value={filterResource}
              onChange={(e) => setFilterResource(e.target.value)}
            >
              <option value="All">Semua Sumber Daya</option>
              <option value="Sistem HRIS">Sistem HRIS</option>
              <option value="Sistem Akuntansi">Sistem Akuntansi</option>
              <option value="Intranet Perusahaan">Intranet Perusahaan</option>
              {/* Tambahkan sumber daya lain */}
            </select>
          </div>
          <a href="/management/it/keamanan/akses/tambah" className="px-6 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2">
            <FaPlusCircle className="w-4 h-4" /> Tambah Aturan
          </a>
        </div>
      </section>

      {/* Tabel Daftar Aturan Akses */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaUserShield className="w-5 h-5 text-primary" />
          Daftar Aturan Akses ({filteredRules.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Grup Pengguna</th>
                <th className="py-3 px-6 text-left">Sumber Daya</th>
                <th className="py-3 px-6 text-left">Level Akses</th>
                <th className="py-3 px-6 text-left">Terakhir Diperbarui</th>
                <th className="py-3 px-6 text-left">Dikelola Oleh</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredRules.length > 0 ? (
                filteredRules.map((rule) => (
                  <tr key={rule.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{rule.userGroup}</td>
                    <td className="py-3 px-6 text-left">{rule.resource}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${
                        rule.accessLevel.includes('Full') ? 'bg-green-200 text-green-800' :
                        rule.accessLevel.includes('View') || rule.accessLevel.includes('Read') ? 'bg-blue-200 text-blue-800' :
                        'bg-gray-200 text-gray-800'
                      }`}>
                        {rule.accessLevel}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left text-xs text-gray-500">{rule.lastUpdated}</td>
                    <td className="py-3 px-6 text-left">{rule.managedBy}</td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <button onClick={() => handleEditRule(rule.id)} className="text-blue-500 hover:text-blue-700 text-lg" title="Edit">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDeleteRule(rule.id, rule.userGroup, rule.resource)} className="text-red-500 hover:text-red-700 text-lg" title="Hapus">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 text-center text-gray-500">Tidak ada aturan akses ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AccessAuthorizationPage;