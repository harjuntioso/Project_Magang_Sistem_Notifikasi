import React, { useState } from 'react';
import {
  FaUsers,        // Ikon utama
  FaSearch,       // Pencarian
  FaFilter,       // Filter
  FaEdit,         // Edit
  FaTrash,        // Hapus
  FaUserPlus,     // Tambah karyawan
  FaFileDownload, // Unduh data
  FaUserCircle,   // Profil
} from 'react-icons/fa';

const DaftarKaryawanPage = () => {
  const [daftarKaryawan, setDaftarKaryawan] = useState([
    // Data dummy karyawan
    { id: 'KRY001', nama: 'Budi Santoso', email: 'budi.s@perusahaan.com', departemen: 'Operasional', jabatan: 'Supervisor Operasional', status: 'Aktif' },
    { id: 'KRY002', nama: 'Siti Nurhayati', email: 'siti.n@perusahaan.com', departemen: 'HRD', jabatan: 'Staff HRD', status: 'Aktif' },
    { id: 'KRY003', nama: 'Joko Widodo', email: 'joko.w@perusahaan.com', departemen: 'Keuangan', jabatan: 'Akuntan', status: 'Aktif' },
    { id: 'KRY004', nama: 'Ayu Lestari', email: 'ayu.l@perusahaan.com', departemen: 'Pemasaran', jabatan: 'Spesialis Pemasaran', status: 'Aktif' },
    { id: 'KRY005', nama: 'Cahyo Wibowo', email: 'cahyo.w@perusahaan.com', departemen: 'IT', jabatan: 'IT Support', status: 'Aktif' },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartemen, setFilterDepartemen] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Aktif');

  const filteredKaryawan = daftarKaryawan.filter(karyawan =>
    karyawan.status === filterStatus &&
    (filterDepartemen === 'Semua' || karyawan.departemen === filterDepartemen) &&
    (karyawan.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
     karyawan.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     karyawan.jabatan.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEditKaryawan = (id) => {
    alert(`Mengedit data karyawan ID: ${id}`);
    // Arahkan ke halaman edit karyawan atau buka modal
    // Contoh: navigate(`/management/hrd/data-karyawan/edit/${id}`);
  };

  const handleDeleteKaryawan = (id, nama) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus karyawan ${nama}?`)) {
      alert(`Menghapus karyawan ID: ${id}`);
      setDaftarKaryawan(daftarKaryawan.filter(k => k.id !== id));
      // Logika untuk menghapus dari backend
    }
  };

  const handleDownloadData = () => {
    alert('Mengunduh data karyawan...');
    // Logika untuk mengunduh data (misal: CSV)
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      {/* Judul Halaman */}
      <h1 className="text-3xl font-bold text-info-dark mb-8 flex items-center gap-3">
        <FaUsers className="w-8 h-8 text-info" />
        Daftar Karyawan Aktif
      </h1>

      {/* Deskripsi Halaman */}
      <p className="text-gray-600 mb-10 text-lg">
        Lihat dan kelola informasi dasar karyawan aktif di perusahaan.
      </p>

      {/* Filter dan Aksi Cepat */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-info">
        <h2 className="text-xl font-semibold mb-4 text-info-dark flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-info" />
          Filter & Aksi Cepat
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="search-karyawan" className="block text-gray-700 font-medium mb-1">Cari Karyawan</label>
            <input
              type="text"
              id="search-karyawan"
              placeholder="Nama, Email, Jabatan..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-info focus:border-info"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-departemen" className="block text-gray-700 font-medium mb-1">Departemen</label>
            <select
              id="filter-departemen"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-info focus:border-info"
              value={filterDepartemen}
              onChange={(e) => setFilterDepartemen(e.target.value)}
            >
              <option value="Semua">Semua Departemen</option>
              <option value="Operasional">Operasional</option>
              <option value="HRD">HRD</option>
              <option value="Keuangan">Keuangan</option>
              <option value="Pemasaran">Pemasaran</option>
              <option value="IT">IT</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-status" className="block text-gray-700 font-medium mb-1">Status</label>
            <select
              id="filter-status"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-info focus:border-info"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="Aktif">Aktif</option>
              <option value="Nonaktif">Nonaktif</option>
              {/* Status lain jika ada (cuti panjang, suspended, dll.) */}
            </select>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <a href="/management/hrd/data-karyawan/tambah" className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200 flex items-center justify-center gap-2">
              <FaUserPlus className="w-4 h-4" /> Tambah Baru
            </a>
            <button onClick={handleDownloadData} className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2">
              <FaFileDownload className="w-4 h-4" /> Unduh Data
            </button>
          </div>
        </div>
      </section>

      {/* Tabel Daftar Karyawan */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaUsers className="w-5 h-5 text-primary" />
          Daftar Karyawan ({filteredKaryawan.length} orang)
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Nama</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Departemen</th>
                <th className="py-3 px-6 text-left">Jabatan</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredKaryawan.length > 0 ? (
                filteredKaryawan.map((karyawan) => (
                  <tr key={karyawan.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left">{karyawan.id}</td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <a href={`/management/hrd/data-karyawan/profil/${karyawan.id}`} className="text-blue-600 hover:underline flex items-center gap-2">
                        <FaUserCircle /> {karyawan.nama}
                      </a>
                    </td>
                    <td className="py-3 px-6 text-left">{karyawan.email}</td>
                    <td className="py-3 px-6 text-left">{karyawan.departemen}</td>
                    <td className="py-3 px-6 text-left">{karyawan.jabatan}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${
                        karyawan.status === 'Aktif' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                      }`}>
                        {karyawan.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <button onClick={() => handleEditKaryawan(karyawan.id)} className="text-blue-500 hover:text-blue-700 text-lg" title="Edit">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDeleteKaryawan(karyawan.id, karyawan.nama)} className="text-red-500 hover:text-red-700 text-lg" title="Hapus">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">Tidak ada karyawan ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DaftarKaryawanPage;