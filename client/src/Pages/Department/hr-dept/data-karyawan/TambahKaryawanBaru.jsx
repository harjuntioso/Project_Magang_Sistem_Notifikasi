import React, { useState } from 'react';
import {
  FaUserPlus,     // Ikon utama
  FaSave,         // Simpan
  FaTimes,        // Batal
  FaInfoCircle,   // Informasi
  FaAddressCard,  // Data Pribadi
  FaBriefcase,    // Data Pekerjaan
  FaUnlockAlt,    // Akun Login
} from 'react-icons/fa';

const TambahKaryawanPage = () => {
  const [formData, setFormData] = useState({
    namaLengkap: '',
    emailPerusahaan: '',
    tanggalLahir: '',
    alamat: '',
    telepon: '',
    departemen: '',
    jabatan: '',
    tanggalBergabung: '',
    statusKaryawan: 'Aktif',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Menambahkan karyawan baru...');
    console.log('Data Karyawan Baru:', formData);
    // Logika untuk mengirim data ke backend
    // Setelah berhasil, mungkin arahkan ke halaman daftar karyawan atau tampilkan pesan sukses
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      {/* Judul Halaman */}
      <h1 className="text-3xl font-bold text-primary-dark mb-8 flex items-center gap-3">
        <FaUserPlus className="w-8 h-8 text-primary" />
        Tambah Karyawan Baru
      </h1>

      {/* Deskripsi Halaman */}
      <p className="text-gray-600 mb-10 text-lg">
        Lengkapi formulir di bawah untuk menambahkan data karyawan baru ke sistem.
      </p>

      {/* Formulir Tambah Karyawan */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaInfoCircle className="w-5 h-5 text-primary" />
          Data Umum Karyawan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="namaLengkap" className="block text-gray-700 font-medium mb-1">Nama Lengkap <span className="text-red-500">*</span></label>
            <input type="text" id="namaLengkap" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" value={formData.namaLengkap} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="emailPerusahaan" className="block text-gray-700 font-medium mb-1">Email Perusahaan <span className="text-red-500">*</span></label>
            <input type="email" id="emailPerusahaan" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" value={formData.emailPerusahaan} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="tanggalLahir" className="block text-gray-700 font-medium mb-1">Tanggal Lahir <span className="text-red-500">*</span></label>
            <input type="date" id="tanggalLahir" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" value={formData.tanggalLahir} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="telepon" className="block text-gray-700 font-medium mb-1">Nomor Telepon <span className="text-red-500">*</span></label>
            <input type="tel" id="telepon" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" value={formData.telepon} onChange={handleChange} required />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="alamat" className="block text-gray-700 font-medium mb-1">Alamat Lengkap</label>
            <textarea id="alamat" rows="3" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" value={formData.alamat} onChange={handleChange}></textarea>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-accent-dark flex items-center gap-2 border-t pt-6 mt-6">
          <FaBriefcase className="w-5 h-5 text-accent" />
          Data Pekerjaan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="departemen" className="block text-gray-700 font-medium mb-1">Departemen <span className="text-red-500">*</span></label>
            <select id="departemen" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent" value={formData.departemen} onChange={handleChange} required>
              <option value="">Pilih Departemen</option>
              <option value="Operasional">Operasional</option>
              <option value="HRD">HRD</option>
              <option value="Keuangan">Keuangan</option>
              <option value="Pemasaran">Pemasaran</option>
              <option value="IT">IT</option>
              <option value="Umum">Umum & Administrasi</option>
            </select>
          </div>
          <div>
            <label htmlFor="jabatan" className="block text-gray-700 font-medium mb-1">Jabatan <span className="text-red-500">*</span></label>
            <input type="text" id="jabatan" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent" value={formData.jabatan} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="tanggalBergabung" className="block text-gray-700 font-medium mb-1">Tanggal Bergabung <span className="text-red-500">*</span></label>
            <input type="date" id="tanggalBergabung" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent" value={formData.tanggalBergabung} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="statusKaryawan" className="block text-gray-700 font-medium mb-1">Status Karyawan <span className="text-red-500">*</span></label>
            <select id="statusKaryawan" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent" value={formData.statusKaryawan} onChange={handleChange} required>
              <option value="Aktif">Aktif</option>
              <option value="Cuti Panjang">Cuti Panjang</option>
              <option value="Nonaktif">Nonaktif</option>
              {/* Tambahkan status lain jika ada */}
            </select>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-secondary-dark flex items-center gap-2 border-t pt-6 mt-6">
          <FaUnlockAlt className="w-5 h-5 text-secondary" />
          Informasi Akun Login (Opsional)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="username" className="block text-gray-700 font-medium mb-1">Username</label>
            <input type="text" id="username" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary" value={formData.username} onChange={handleChange} />
            <p className="text-gray-500 text-sm mt-1">Username untuk login ke sistem internal.</p>
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password Awal</label>
            <input type="password" id="password" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary" value={formData.password} onChange={handleChange} />
            <p className="text-gray-500 text-sm mt-1">Password awal akan diminta untuk diubah saat login pertama.</p>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-4 mt-8">
          <button type="button" onClick={() => alert('Batal menambahkan karyawan.')} className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-200 flex items-center gap-2">
            <FaTimes className="w-4 h-4" /> Batal
          </button>
          <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
            <FaSave className="w-4 h-4" /> Simpan Karyawan
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahKaryawanPage;