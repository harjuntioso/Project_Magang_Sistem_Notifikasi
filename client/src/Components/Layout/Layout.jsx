import React, { useEffect, useRef } from 'react'; 
import Sidebar from './Bar/SideBar'; 
import Topbar from './Bar/NavBar';  
import { useAuth } from '../../Context/AuthContext'; 
import { useNavigate } from 'react-router-dom'; 

const Layout = ({ children }) => {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate(); 

  // Ref untuk menyimpan timer inactivity
  const inactivityTimerRef = useRef(null);
  // Waktu timeout di frontend 
  const INACTIVITY_TIMEOUT = 59 * 60 * 1000; 

  // Fungsi untuk me-reset timer
  const resetInactivityTimer = () => {
    // Hapus timer sebelumnya jika ada
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    // Set timer baru
    inactivityTimerRef.current = setTimeout(() => {
      // Jika timer habis, panggil logout
      console.log('Inactivity detected. Logging out...');
      logout();
      // Redirect manual jika AuthContext tidak menjamin redirect
      navigate('/login');
    }, INACTIVITY_TIMEOUT);
  };

  // Effect untuk menginisialisasi dan membersihkan event listeners
  useEffect(() => {
    // Hanya aktifkan timer jika user sudah login
    if (user) {
      resetInactivityTimer(); // Mulai timer saat komponen mount atau user login

      // Tambahkan event listeners untuk mendeteksi aktivitas
      window.addEventListener('mousemove', resetInactivityTimer);
      window.addEventListener('keydown', resetInactivityTimer);
      window.addEventListener('click', resetInactivityTimer);
      window.addEventListener('scroll', resetInactivityTimer);

      // Cleanup function: hapus event listeners dan timer saat komponen unmount
      return () => {
        if (inactivityTimerRef.current) {
          clearTimeout(inactivityTimerRef.current);
        }
        window.removeEventListener('mousemove', resetInactivityTimer);
        window.removeEventListener('keydown', resetInactivityTimer);
        window.removeEventListener('click', resetInactivityTimer);
        window.removeEventListener('scroll', resetInactivityTimer);
      };
    } else {
      // Jika user tidak login, pastikan timer bersih
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    }
  }, [user]); 


  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar /> 
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4">
          {children} 
        </main>
      </div>
    </div>
  );
};

export default Layout;