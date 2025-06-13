import React, { useState } from 'react';
import {
  FaCalendarAlt,    // Ikon utama untuk cuti
  FaUsers,          // Karyawan
  FaEdit,           // Edit kuota
  FaPlus,           // Tambah karyawan/kuota baru
  FaSearch,         // Cari
  FaFileDownload,   // Unduh data
  FaFileUpload,     // Unggah data
} from 'react-icons/fa';

const KelolaKuotaCutiPage = () => {
  const [daftarKaryawan, setDaftarKaryawan] = useState([
    // Data dummy karyawan dan kuota cuti
    { id: 1, nama: 'Budi Santoso', departemen: 'Operasional', kuotaTahunan: 12, sisaTahunan: 7, kuotaSakit: 14, sisaSakit: 10, cutiKhusus: 2 },
    { id: 2, nama: 'Siti Nurhayati', departemen: 'HRD', kuotaTahunan: 12, sisaTahunan: 10, kuotaSakit: 14, sisaSakit: 14, cutiKhusus: 0 },
    { id: 3, nama: 'Joko Widodo', departemen: 'Keuangan', kuotaTahunan: 12, sisaTahunan: 5, kuotaSakit: 14, sisaSakit: 12, cutiKhusus: 1 },
    { id: 4, nama: 'Ayu Lestari', departemen: 'Pemasaran', kuotaTahunan: 12, sisaTahunan: 8, kuotaSakit: 14, sisaSakit: 13, cutiKhusus: 0 },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEditClick = (karyawan) => {
    setEditingId(karyawan.id);
    setEditData({ ...karyawan });
  };

  const handleSaveEdit = (id) => {
    // Logika untuk menyimpan perubahan ke backend
    alert(`Kuota cuti untuk ${editData.nama} berhasil diperbarui!`);
    setDaftarKaryawan(daftarKaryawan.map(k => k.id === id ? editData : k));
    setEditingId(null);
    setEditData({});
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const filteredKaryawan = daftarKaryawan.filter(karyawan =>
    karyawan.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    karyawan.departemen.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      {/* Judul Halaman */}
      <h1 className="text-3xl font-bold text-secondary-dark mb-8 flex items-center gap-3">
        <FaCalendarAlt className="w-8 h-8 text-secondary" />
        Pengelolaan Kuota Cuti Karyawan
      </h1>

      {/* Deskripsi Halaman */}
      <p className="text-gray-600 mb-10 text-lg">
        Kelola dan atur kuota cuti tahunan, cuti sakit, dan cuti khusus untuk setiap karyawan.
      </p>

      {/* Filter dan Aksi Massal */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-secondary">
        <h2 className="text-xl font-semibold mb-4 text-secondary-dark flex items-center gap-2">
          <FaSearch className="w-5 h-5 text-secondary" />
          Filter & Aksi Cepat
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
          <div>
            <label htmlFor="search-karyawan" className="block text-gray-700 font-medium mb-1">Cari Karyawan</label>
            <input
              type="text"
              id="search-karyawan"
              placeholder="Nama atau Departemen..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200 flex items-center justify-center gap-2">
            <FaPlus className="w-4 h-4" /> Tambah Kuota Baru
          </button>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2">
            <FaFileDownload className="w-4 h-4" /> Unduh Data Kuota
          </button>
          {/* <button className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center justify-center gap-2">
            <FaFileUpload className="w-4 h-4" /> Unggah Data Kuota
          </button> */}
        </div>
      </section>

      {/* Tabel Kuota Cuti Karyawan */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaUsers className="w-5 h-5 text-primary" />
          Daftar Kuota Cuti
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nama Karyawan</th>
                <th className="py-3 px-6 text-left">Departemen</th>
                <th className="py-3 px-6 text-left">Kuota Tahunan</th>
                <th className="py-3 px-6 text-left">Sisa Tahunan</th>
                <th className="py-3 px-6 text-left">Kuota Sakit</th>
                <th className="py-3 px-6 text-left">Sisa Sakit</th>
                <th className="py-3 px-6 text-left">Cuti Khusus</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredKaryawan.length > 0 ? (
                filteredKaryawan.map((karyawan) => (
                  <tr key={karyawan.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{karyawan.nama}</td>
                    <td className="py-3 px-6 text-left">{karyawan.departemen}</td>
                    {editingId === karyawan.id ? (
                      <>
                        <td className="py-3 px-6"><input type="number" value={editData.kuotaTahunan} onChange={(e) => setEditData({...editData, kuotaTahunan: parseInt(e.target.value)})} className="w-20 p-1 border rounded" /></td>
                        <td className="py-3 px-6 text-gray-500">{editData.sisaTahunan}</td> {/* Sisa otomatis terhitung */}
                        <td className="py-3 px-6"><input type="number" value={editData.kuotaSakit} onChange={(e) => setEditData({...editData, kuotaSakit: parseInt(e.target.value)})} className="w-20 p-1 border rounded" /></td>
                        <td className="py-3 px-6 text-gray-500">{editData.sisaSakit}</td> {/* Sisa otomatis terhitung */}
                        <td className="py-3 px-6"><input type="number" value={editData.cutiKhusus} onChange={(e) => setEditData({...editData, cutiKhusus: parseInt(e.target.value)})} className="w-20 p-1 border rounded" /></td>
                        <td className="py-3 px-6 text-center">
                          <button onClick={() => handleSaveEdit(karyawan.id)} className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-600 mr-2">Simpan</button>
                          <button onClick={handleCancelEdit} className="bg-gray-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-gray-600">Batal</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-3 px-6 text-left">{karyawan.kuotaTahunan} hari</td>
                        <td className="py-3 px-6 text-left font-semibold text-green-600">{karyawan.sisaTahunan} hari</td>
                        <td className="py-3 px-6 text-left">{karyawan.kuotaSakit} hari</td>
                        <td className="py-3 px-6 text-left font-semibold text-green-600">{karyawan.sisaSakit} hari</td>
                        <td className="py-3 px-6 text-left">{karyawan.cutiKhusus} hari</td>
                        <td className="py-3 px-6 text-center">
                          <button onClick={() => handleEditClick(karyawan)} className="text-blue-500 hover:text-blue-700 text-sm flex items-center justify-center gap-1 mx-auto">
                            <FaEdit /> Edit
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-4 text-center text-gray-500">Tidak ada karyawan yang ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default KelolaKuotaCutiPage;