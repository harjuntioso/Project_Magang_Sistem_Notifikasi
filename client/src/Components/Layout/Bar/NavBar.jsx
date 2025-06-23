import React from 'react';
import { FiBell, FiSearch, FiMenu, FiUser, FiLogOut } from 'react-icons/fi'; // <<<--- Tambah FiLogOut
import { useAuth } from '../../../Context/AuthContext'; // Sesuaikan path ini
import { useNavigate } from 'react-router-dom'; // <<<--- Tambah useNavigate
import Swal from 'sweetalert2'; // <<<--- Tambah Swal

const NavBar = ({ toggleSidebar }) => { // Menerima toggleSidebar prop
  const { user, logout } = useAuth(); // Dapatkan user dan fungsi logout dari context
  const navigate = useNavigate();     // Untuk navigasi setelah logout

  const handleLogout = async () => {
    // 1. Konfirmasi Logout dengan SweetAlert2
    const result = await Swal.fire({
      title: 'Anda yakin ingin keluar?',
      text: "Sesi Anda akan diakhiri.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Keluar!',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      // Jika pengguna menekan 'Ya, Keluar!'
      Swal.fire({
        title: 'Memproses Logout...',
        html: 'Mohon tunggu...',
        timer: 5000, // Durasi maksimal loading (sesuaikan)
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
      });

      try {
        await logout(); // Panggil fungsi logout dari AuthContext
        Swal.fire({
          icon: 'success',
          title: 'Berhasil Keluar!',
          text: 'Anda telah berhasil keluar dari akun Anda.',
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/login'); // Arahkan ke halaman login
      } catch (error) {
        console.error("Logout failed:", error);
        Swal.fire({
          icon: 'error',
          title: 'Logout Gagal!',
          text: 'Terjadi kesalahan saat mencoba keluar. Silakan coba lagi.',
          confirmButtonText: 'Oke',
        });
      }
    }
  };

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Section - Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
        >
          <FiMenu size={20} />
        </button>

        {/* Center Section - Search Bar (hidden on mobile) */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Right Section - User Controls & Logout Button */}
        <div className="flex items-center space-x-4">
          {/* Notification Button */}
          <button className="p-2 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 relative">
            <FiBell size={20} />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* User Info & Logout */}
          {user ? ( // Tampilkan jika user sudah login
            <>
              {/* Avatar atau Icon User */}
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <FiUser size={18} />
                </div>
                {/* Nama User dan Departemen/Jabatan */}
                <div className="ml-2 hidden md:block"> {/* Sembunyikan di mobile */}
                  <span className="block text-sm font-medium text-gray-700 whitespace-nowrap">
                    {user.name || 'Pengguna'}
                  </span>
                  <span className="block text-xs text-gray-500 whitespace-nowrap">
                    {user.department?.name || 'N/A'} ({user.role?.name || 'N/A'})
                  </span>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="p-2 rounded-md text-gray-500 hover:text-red-600 hover:bg-gray-100 focus:outline-none" // Tombol logout lebih discreet
                title="Logout"
              >
                <FiLogOut size={20} />
              </button>
            </>
          ) : ( // Tampilkan loading atau placeholder jika user belum dimuat
            <div className="text-gray-500 text-sm">Memuat info user...</div>
          )}
        </div>
      </div>

      {/* Mobile Search Bar (shown only on mobile) */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </header>
  );
};

export default NavBar;