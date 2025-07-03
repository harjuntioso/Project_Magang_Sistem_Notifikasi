import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  FiHome,
  FiMessageSquare,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import { SiTask, SiLibreofficebase } from "react-icons/si";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useAuth } from '../../../Context/AuthContext';
import Swal from 'sweetalert2'; 

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { user } = useAuth();

  const navItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/comp-info', icon: IoIosInformationCircleOutline, label: 'Information' },
    { path: '/task-exchange', icon: SiTask, label: 'Tasks' },
    { path: '/mg-opr', icon: SiLibreofficebase, label: 'Operation' },
    // Kontak hanya untuk Manager dan Admin
    ...(user && (user.role === 'Manager' || user.role === 'Admin')
      ? [{ path: '/contacts', icon: FiUsers, label: 'Contacts' }]
      : []),
    { path: '/settings', icon: FiSettings, label: 'Settings' },
  ];

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
      let timerInterval;
      Swal.fire({
        title: 'Memproses Logout...',
        html: 'Mohon tunggu...',
        timer: 5000, // Durasi maksimal loading (sesuaikan)
        timerProgressBar: true,
        allowOutsideClick: false, // Tidak bisa diklik di luar pop-up
        didOpen: () => {
          Swal.showLoading(); // Tampilkan indikator loading
          // Opsi: Anda bisa update teks loading jika perlu
          // const b = Swal.getHtmlContainer().querySelector('b')
          // timerInterval = setInterval(() => {
          //   b.textContent = Swal.getTimerLeft()
          // }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
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
    <aside className={`bg-gray-800 text-white h-screen flex flex-col ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 ease-in-out`}>
      {/* Sidebar Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        {!isCollapsed && (
          <h1 className="text-xl font-bold whitespace-nowrap">Sistem</h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-full hover:bg-gray-700"
        >
          {isCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `
                  flex items-center p-3 rounded-lg transition-colors
                  ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'}
                  ${isCollapsed ? 'justify-center' : ''}
                `}
              >
                <item.icon className="flex-shrink-0" size={20} />
                {!isCollapsed && <span className="ml-3 whitespace-nowrap">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer (Tombol Logout) */}
      <div className={`p-4 border-t border-gray-700 ${isCollapsed ? 'flex justify-center' : ''}`}>
        <button
          onClick={handleLogout} // Panggil fungsi handleLogout
          className="flex items-center text-gray-300 hover:text-white transition-colors w-full p-3 rounded-lg hover:bg-gray-700"
        >
          <FiLogOut size={20} />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;