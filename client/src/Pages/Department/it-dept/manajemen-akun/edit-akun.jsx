import React, { useState, useEffect } from 'react';
import {
  FaUserCog,      // Ikon utama
  FaSave,         // Simpan
  FaTimes,        // Batal
  FaInfoCircle,   // Informasi Umum
  FaAddressCard,  // Data Pribadi
  FaBriefcase,    // Data Pekerjaan
  FaUnlockAlt,    // Akun Login & Hak Akses
} from 'react-icons/fa';
// Import useParams jika menggunakan React Router untuk mendapatkan ID dari URL
// import { useParams } from 'react-router-dom';

const EditUserAccountPage = () => {
  // const { id } = useParams(); // Jika menggunakan React Router untuk ID
  const [formData, setFormData] = useState({
    id: '', // Ini akan diisi dari data yang diambil
    username: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    department: '',
    jobTitle: '',
    hireDate: '',
    employeeStatus: '',
    role: '', // Role akses sistem
    accountStatus: '', // Active, Inactive, Locked
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulasi pengambilan data akun dari API berdasarkan ID
    const fetchAccountData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Ganti dengan panggilan API sesungguhnya
        const dummyData = {
          id: 'USR001',
          username: 'budi.s',
          fullName: 'Budi Santoso',
          email: 'budi.s@perusahaan.com',
          phoneNumber: '081234567890',
          address: 'Jl. Contoh No. 123, Jakarta',
          department: 'Operasional',
          jobTitle: 'Supervisor Operasional',
          hireDate: '2023-01-15',
          employeeStatus: 'Aktif',
          role: 'Supervisor',
          accountStatus: 'Active',
        };
        // Jika menggunakan useParams, bisa lakukan:
        // const response = await api.get(`/users/${id}`);
        // setFormData(response.data);
        setFormData(dummyData); // Menggunakan dummy data
      } catch (err) {
        setError('Gagal memuat data akun. Silakan coba lagi.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, []); // [] agar hanya berjalan sekali saat komponen dimuat

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Mengupdate data akun...');
    console.log('Data Akun Diperbarui:', formData);
    // Logika untuk mengirim data ke backend
    // Setelah berhasil, mungkin arahkan kembali ke halaman daftar akun atau tampilkan pesan sukses
  };

  if (loading) {
    return (
      <div className="p-8 bg-neutral-50 min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
        <p className="ml-4 text-gray-700">Memuat data akun...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-neutral-50 min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 mb-8 flex items-center gap-3">
        <FaUserCog className="w-8 h-8 text-blue-500" />
        Edit Akun Pengguna: {formData.fullName}
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Perbarui informasi detail akun pengguna, termasuk data pribadi, pekerjaan, dan hak akses.
      </p>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
        <h2 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
          <FaAddressCard className="w-5 h-5 text-blue-500" />
          Data Pribadi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="fullName" className="block text-gray-700 font-medium mb-1">Nama Lengkap <span className="text-red-500">*</span></label>
            <input type="text" id="fullName" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value={formData.fullName} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email Perusahaan <span className="text-red-500">*</span></label>
            <input type="email" id="email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-1">Nomor Telepon</label>
            <input type="tel" id="phoneNumber" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value={formData.phoneNumber} onChange={handleChange} />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-gray-700 font-medium mb-1">Alamat Lengkap</label>
            <textarea id="address" rows="2" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value={formData.address} onChange={handleChange}></textarea>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2 border-t pt-6 mt-6">
          <FaBriefcase className="w-5 h-5 text-primary" />
          Data Pekerjaan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="department" className="block text-gray-700 font-medium mb-1">Departemen <span className="text-red-500">*</span></label>
            <select id="department" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" value={formData.department} onChange={handleChange} required>
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
            <label htmlFor="jobTitle" className="block text-gray-700 font-medium mb-1">Jabatan <span className="text-red-500">*</span></label>
            <input type="text" id="jobTitle" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" value={formData.jobTitle} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="hireDate" className="block text-gray-700 font-medium mb-1">Tanggal Bergabung <span className="text-red-500">*</span></label>
            <input type="date" id="hireDate" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" value={formData.hireDate} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="employeeStatus" className="block text-gray-700 font-medium mb-1">Status Karyawan <span className="text-red-500">*</span></label>
            <select id="employeeStatus" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" value={formData.employeeStatus} onChange={handleChange} required>
              <option value="Aktif">Aktif</option>
              <option value="Cuti Panjang">Cuti Panjang</option>
              <option value="Nonaktif">Nonaktif</option>
              {/* Tambahkan status lain jika ada */}
            </select>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-accent-dark flex items-center gap-2 border-t pt-6 mt-6">
          <FaUnlockAlt className="w-5 h-5 text-accent" />
          Pengaturan Akun & Hak Akses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="username" className="block text-gray-700 font-medium mb-1">Username <span className="text-red-500">*</span></label>
            <input type="text" id="username" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent" value={formData.username} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="role" className="block text-gray-700 font-medium mb-1">Role/Hak Akses <span className="text-red-500">*</span></label>
            <select id="role" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent" value={formData.role} onChange={handleChange} required>
              <option value="">Pilih Role</option>
              <option value="Admin">Admin</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Staff">Staff</option>
              <option value="Guest">Guest</option>
              {/* Tambahkan role lain sesuai kebutuhan */}
            </select>
          </div>
          <div>
            <label htmlFor="accountStatus" className="block text-gray-700 font-medium mb-1">Status Akun <span className="text-red-500">*</span></label>
            <select id="accountStatus" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent" value={formData.accountStatus} onChange={handleChange} required>
              <option value="Active">Aktif</option>
              <option value="Inactive">Tidak Aktif</option>
              <option value="Locked">Terkunci</option>
              <option value="Suspended">Ditangguhkan</option>
            </select>
          </div>
          <div className="flex items-center mt-6 md:mt-0">
            <button type="button" className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors duration-200 flex items-center gap-2">
              <FaKey className="w-4 h-4" /> Reset Password
            </button>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-4 mt-8">
          <button type="button" onClick={() => alert('Batal mengedit akun.')} className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-200 flex items-center gap-2">
            <FaTimes className="w-4 h-4" /> Batal
          </button>
          <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
            <FaSave className="w-4 h-4" /> Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserAccountPage;