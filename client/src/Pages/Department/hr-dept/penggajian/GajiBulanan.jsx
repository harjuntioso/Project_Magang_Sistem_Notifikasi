import React, { useState, useEffect } from 'react';
import {
  FaMoneyBillWave,  // Ikon utama
  FaPlayCircle,     // Mulai proses
  FaCheckCircle,    // Verifikasi
  FaPrint,          // Cetak slip gaji
  FaSpinner,        // Loading
  FaInfoCircle,     // Info
  FaUsers,          // Karyawan
  FaExclamationTriangle, // Peringatan
  FaClipboardList,
  FaFileAlt
} from 'react-icons/fa';

const ProsesGajiBulananPage = () => {
  const [currentMonth, setCurrentMonth] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState(0); // 0: Ready, 1: Validasi, 2: Hitung, 3: Verifikasi, 4: Selesai
  const [processLog, setProcessLog] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    // Set bulan saat ini secara otomatis
    const date = new Date();
    setCurrentMonth(date.toLocaleString('id-ID', { month: 'long', year: 'numeric' }));
  }, []);

  const simulateProcess = async (stepName, duration = 1000) => {
    return new Promise(resolve => {
      setProcessLog(prev => [...prev, { type: 'info', message: `Memulai langkah: ${stepName}...` }]);
      setTimeout(() => {
        setProcessLog(prev => [...prev, { type: 'success', message: `Langkah ${stepName} selesai.` }]);
        resolve();
      }, duration);
    });
  };

  const handleStartProcess = async () => {
    setIsProcessing(true);
    setProcessLog([]);
    setValidationErrors([]);
    setProcessStep(0);

    setProcessLog(prev => [...prev, { type: 'info', message: `Memulai proses penggajian bulan ${currentMonth}...` }]);

    // Step 1: Validasi Data Karyawan & Absensi
    setProcessStep(1);
    await simulateProcess('Validasi Data Karyawan & Absensi', 2000);
    // Contoh error validasi
    if (Math.random() < 0.2) { // 20% kemungkinan ada error
      setValidationErrors(['Data absensi karyawan ID KRY012 belum lengkap.', 'Data bank karyawan ID KRY045 tidak valid.']);
      setProcessLog(prev => [...prev, { type: 'error', message: 'Validasi menemukan beberapa masalah. Harap periksa detail kesalahan.' }]);
      setIsProcessing(false);
      return;
    }

    // Step 2: Perhitungan Gaji Pokok & Tunjangan
    setProcessStep(2);
    await simulateProcess('Perhitungan Gaji Pokok & Tunjangan', 1500);

    // Step 3: Perhitungan Potongan (Pajak, BPJS, dll.)
    setProcessStep(3);
    await simulateProcess('Perhitungan Potongan (Pajak, BPJS, dll.)', 1500);

    // Step 4: Finalisasi & Generate Slip Gaji
    setProcessStep(4);
    await simulateProcess('Finalisasi & Generate Slip Gaji', 2500);

    setProcessLog(prev => [...prev, { type: 'success', message: `Proses penggajian bulan ${currentMonth} berhasil diselesaikan!` }]);
    setIsProcessing(false);
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      {/* Judul Halaman */}
      <h1 className="text-3xl font-bold text-secondary-dark mb-8 flex items-center gap-3">
        <FaMoneyBillWave className="w-8 h-8 text-secondary" />
        Proses Gaji Bulanan
      </h1>

      {/* Deskripsi Halaman */}
      <p className="text-gray-600 mb-10 text-lg">
        Lakukan proses penggajian bulanan untuk semua karyawan dengan langkah-langkah terstruktur.
      </p>

      {/* Status Proses Penggajian */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-info">
        <h2 className="text-xl font-semibold mb-4 text-info-dark flex items-center gap-2">
          <FaInfoCircle className="w-5 h-5 text-info" />
          Status Proses Penggajian
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-700">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold">Bulan Penggajian:</p>
            <p className="text-2xl font-bold text-blue-700">{currentMonth}</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Status Saat Ini:</p>
            <p className={`text-2xl font-bold ${isProcessing ? 'text-orange-500' : (processStep === 4 ? 'text-green-500' : 'text-gray-500')}`}>
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <FaSpinner className="animate-spin" /> Sedang Diproses...
                </span>
              ) : (
                processStep === 4 ? 'Selesai' : 'Siap Diproses'
              )}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={handleStartProcess}
            disabled={isProcessing}
            className={`px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2 mx-auto ${
              isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-secondary text-white hover:bg-secondary-dark'
            }`}
          >
            {isProcessing ? 'Memulai Proses...' : 'Mulai Proses Penggajian'}
            <FaPlayCircle className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Log Proses & Validasi */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaClipboardList className="w-5 h-5 text-primary" />
          Log Proses & Hasil Validasi
        </h2>
        <div className="h-64 bg-gray-100 p-4 rounded-lg overflow-y-auto font-mono text-sm">
          {processLog.length === 0 && <p className="text-gray-500">Log proses akan muncul di sini setelah Anda memulai.</p>}
          {processLog.map((log, index) => (
            <p key={index} className={`${
              log.type === 'info' ? 'text-gray-700' :
              log.type === 'success' ? 'text-green-600' :
              'text-red-600'
            }`}>
              [{new Date().toLocaleTimeString()}] {log.message}
            </p>
          ))}
          {validationErrors.length > 0 && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <p className="font-semibold flex items-center gap-2 mb-2"><FaExclamationTriangle /> Ditemukan Kesalahan Validasi:</p>
              <ul className="list-disc pl-5">
                {validationErrors.map((error, index) => <li key={index}>{error}</li>)}
              </ul>
            </div>
          )}
        </div>

        {processStep === 4 && !isProcessing && validationErrors.length === 0 && (
          <div className="mt-6 text-center">
            <a href="/management/hrd/penggajian/laporan" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 mx-auto w-fit">
              <FaFileAlt className="w-5 h-5" /> Lihat Laporan Penggajian
            </a>
            <button className="mt-3 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center gap-2 mx-auto w-fit">
              <FaPrint className="w-5 h-5" /> Cetak Semua Slip Gaji
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProsesGajiBulananPage;