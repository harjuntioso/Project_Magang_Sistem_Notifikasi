import React, { useState, useEffect, useRef } from 'react'; // <<<--- Tambah useRef
import { FiBell, FiSearch, FiMenu, FiUser, FiLogOut, FiXCircle } from 'react-icons/fi'; // <<<--- Tambah FiXCircle
import { useAuth } from '../../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axiosClient from '../../../axiosClient'; // <<<--- Pastikan axiosClient diimpor
import { Link } from 'react-router-dom';

const NavBar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]); // State untuk notifikasi
  const [unreadCount, setUnreadCount] = useState(0); // State untuk jumlah notifikasi belum dibaca
  const [showNotifications, setShowNotifications] = useState(false); // State untuk menampilkan dropdown notifikasi
  const notificationRef = useRef(null); // Ref untuk mendeteksi klik di luar dropdown

  // Effect untuk menutup dropdown notifikasi saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Effect untuk memuat notifikasi saat komponen dimuat atau user berubah
  useEffect(() => {
    if (user && user.id) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const response = await axiosClient.get(`/notifications/${user.id}`); // Endpoint baru di backend
      setNotifications(response.data.notifications);
      setUnreadCount(response.data.unread_count);
    } catch (error) {
      console.error("Gagal memuat notifikasi:", error.response || error);
      // Swal.fire('Error', 'Gagal memuat notifikasi.', 'error'); // Mungkin terlalu sering muncul jika ada banyak error
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    // Jika dropdown dibuka dan ada notifikasi belum dibaca, tandai semua sebagai dibaca
    if (!showNotifications && unreadCount > 0) {
      markAllAsRead();
    }
  };

  const markAllAsRead = async () => {
    try {
      await axiosClient.post(`/notifications/${user.id}/mark-all-read`); // Endpoint baru
      setUnreadCount(0); // Reset jumlah belum dibaca di frontend
      // Opsional: perbarui status `is_read` di state `notifications` jika diperlukan
      setNotifications(prev => prev.map(notif => ({ ...notif, is_read: true })));
    } catch (error) {
      console.error("Gagal menandai notifikasi sebagai sudah dibaca:", error.response || error);
    }
  };

  const handleLogout = async () => {
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
      Swal.fire({
        title: 'Memproses Logout...',
        html: 'Mohon tunggu...',
        timer: 5000,
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
      });
      try {
        await logout();
        Swal.fire({
          icon: 'success',
          title: 'Berhasil Keluar!',
          text: 'Anda telah berhasil keluar dari akun Anda.',
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/login');
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
    <header className="bg-white shadow-sm z-10 sticky top-0"> {/* Tambah sticky top-0 agar tetap di atas */}
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
          <div className="relative" ref={notificationRef}> {/* Tambahkan ref di sini */}
            <button
              onClick={handleNotificationClick}
              className="p-2 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 relative focus:outline-none"
            >
              <FiBell size={20} />
              {unreadCount > 0 && ( // Tampilkan lingkaran notifikasi jika ada pesan belum dibaca
                <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center -mt-1 -mr-1">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Dropdown Notifikasi */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200 animate-fade-in">
                <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">Notifikasi</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-blue-500 text-sm hover:underline"
                    >
                      Tandai Semua Sudah Dibaca
                    </button>
                  )}
                </div>
                {notifications.length > 0 ? (
                  <div className="max-h-60 overflow-y-auto custom-scrollbar"> {/* Batasi tinggi dan tambah scrollbar */}
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`flex items-start px-4 py-3 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 ${
                          !notif.is_read ? 'bg-blue-50 bg-opacity-70 font-medium' : 'text-gray-700'
                        }`}
                        // Opsional: tambahkan onClick untuk menavigasi ke detail tugas atau menandai 1 notifikasi dibaca
                        // onClick={() => handleIndividualNotificationClick(notif)}
                      >
                        <div className="flex-shrink-0 mt-1">
                          <FiBell className={`${!notif.is_read ? 'text-blue-600' : 'text-gray-400'}`} size={16} />
                        </div>
                        <div className="ml-3 text-sm">
                          <p className={`${!notif.is_read ? 'font-semibold' : 'font-normal'}`}>
                            {notif.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(notif.created_at).toLocaleString('id-ID', {
                              day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500 text-sm">
                    Tidak ada notifikasi baru.
                  </div>
                )}
                <div className="px-4 py-2 border-t border-gray-200 text-center">
                    <Link to="/notifications" className="text-blue-500 text-sm hover:underline">
                        Lihat Semua Notifikasi
                    </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Info & Logout */}
          {user ? (
            <>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <FiUser size={18} />
                </div>
                <div className="ml-2 hidden md:block">
                  <span className="block text-sm font-medium text-gray-700 whitespace-nowrap">
                    {user.name || 'Pengguna'}
                  </span>
                  <span className="block text-xs text-gray-500 whitespace-nowrap">
                    {user.department?.name || 'N/A'} ({user.role?.name || 'N/A'})
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 rounded-md text-gray-500 hover:text-red-600 hover:bg-gray-100 focus:outline-none"
                title="Logout"
              >
                <FiLogOut size={20} />
              </button>
            </>
          ) : (
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