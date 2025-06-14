import React, { useEffect, useState } from 'react'; // Import useEffect dan useState
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Hapus Route, Routes karena sudah di App.js
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import './index.css';
import ErrorBoundary from './Components/common/ErrorBoundary';
import { Notifications } from '@mantine/notifications';
import { MantineProvider } from '@mantine/core';
import { AuthProvider } from './Context/AuthContext';
import axiosClient from './axiosClient'; // Import axiosClient Anda

const root = ReactDOM.createRoot(document.getElementById('root'));

// Komponen baru untuk memuat CSRF cookie
const AppInitializer = () => {
  const [csrfLoaded, setCsrfLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Meminta CSRF cookie dari Laravel
    axiosClient.get('/sanctum/csrf-cookie')
      .then(() => {
        setCsrfLoaded(true);
      })
      .catch((err) => {
        console.error("Gagal memuat CSRF cookie:", err);
        setError("Gagal memuat aplikasi. Mohon periksa koneksi atau coba lagi nanti.");
        // Di sini Anda mungkin ingin menampilkan pesan error ke pengguna
      });
  }, []); // [] agar hanya berjalan sekali saat mounting

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-700">
        <p>{error}</p>
      </div>
    );
  }

  if (!csrfLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
        <p>Memuat aplikasi, harap tunggu...</p>
      </div>
    );
  }

  // Setelah CSRF cookie dimuat, render aplikasi utama
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <BrowserRouter>
            <AuthProvider>
              <MantineProvider withGlobalStyles withNormalizeCSS>
                <Notifications />
                <App />
              </MantineProvider>
            </AuthProvider>
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

// Render AppInitializer sebagai komponen root
root.render(
  <AppInitializer />
);