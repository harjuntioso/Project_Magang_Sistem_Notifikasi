import React, { useState, useEffect } from 'react';
import {
  FaChartBar,    // Ikon utama
  FaChartLine,   // Tren
  FaChartPie,    // Distribusi
  FaFilter,      // Filter
  FaCalendarAlt, // Rentang waktu
  FaSearch,      // Cari
  FaFileDownload, // Unduh laporan
} from 'react-icons/fa';

const CampaignAnalyticsPage = () => {
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [dateRange, setDateRange] = useState(''); // Contoh: 'Last 30 Days', 'Custom'
  const [campaignOptions, setCampaignOptions] = useState([
    // Data dummy opsi kampanye
    { id: 'all', name: 'Semua Kampanye' },
    { id: 'CAMP001', name: 'Promo Liburan Sekolah 2025' },
    { id: 'CAMP002', name: 'Diskon Spesial Hari Raya' },
    { id: 'CAMP003', name: 'Brand Awareness Q3' },
    // Tambahkan kampanye lain dari backend Anda
  ]);

  // Data dummy untuk metrik yang akan digambar di grafik
  const [analyticsData, setAnalyticsData] = useState({
    totalLeads: 8550,
    totalConversion: 2.1, // Average
    totalRoi: 105, // Average
    campaignPerformance: [
      { month: 'Jan', leads: 500, conversions: 20 },
      { month: 'Feb', leads: 600, conversions: 25 },
      { month: 'Mar', leads: 700, conversions: 30 },
      { month: 'Apr', leads: 800, conversions: 35 },
      { month: 'May', leads: 900, conversions: 40 },
      { month: 'Jun', leads: 1000, conversions: 45 },
    ],
    // ... data lain untuk berbagai grafik (misal: leads by channel, conversion by audience segment)
  });

  const handleApplyFilter = () => {
    alert(`Menerapkan filter untuk Kampanye: ${selectedCampaign}, Rentang Waktu: ${dateRange}`);
    // Di sini Anda akan memanggil API untuk memuat data analitik berdasarkan filter
  };

  const handleDownloadReport = (format) => {
    alert(`Mengunduh laporan analitik dalam format ${format}...`);
    // Logika untuk mengunduh laporan
  };

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 mb-8 flex items-center gap-3">
        <FaChartBar className="w-8 h-8 text-blue-500" />
        Analisis Data Kampanye
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Analisis kinerja kampanye pemasaran Anda dengan metrik dan visualisasi data yang mendalam.
      </p>

      {/* Filter Analisis */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-blue-500">
        <h2 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-blue-500" />
          Opsi Analisis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label htmlFor="select-campaign" className="block text-gray-700 font-medium mb-1">Pilih Kampanye</label>
            <select
              id="select-campaign"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={selectedCampaign}
              onChange={(e) => setSelectedCampaign(e.target.value)}
            >
              {campaignOptions.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="date-range-analytics" className="block text-gray-700 font-medium mb-1">Rentang Waktu</label>
            <select
              id="date-range-analytics"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="">Pilih Rentang</option>
              <option value="Last 7 Days">7 Hari Terakhir</option>
              <option value="Last 30 Days">30 Hari Terakhir</option>
              <option value="This Quarter">Kuartal Ini</option>
              <option value="Last Quarter">Kuartal Lalu</option>
              <option value="Custom">Kustom...</option>
            </select>
          </div>
          <button
            onClick={handleApplyFilter}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <FaSearch className="w-4 h-4" /> Terapkan Filter
          </button>
        </div>
      </section>

      {/* Metrik Utama Analisis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="rounded-xl shadow-md p-5 flex flex-col items-center justify-center text-center border-t-4 border-green-500 bg-green-100">
          <div className="mb-2"><FaUsers className="w-6 h-6 text-green-500" /></div>
          <h2 className="text-base font-semibold text-green-700">Total Leads</h2>
          <p className="text-3xl font-bold mt-2 text-green-500">{analyticsData.totalLeads.toLocaleString('id-ID')}</p>
        </div>
        <div className="rounded-xl shadow-md p-5 flex flex-col items-center justify-center text-center border-t-4 border-orange-500 bg-orange-100">
          <div className="mb-2"><FaChartPie className="w-6 h-6 text-orange-500" /></div>
          <h2 className="text-base font-semibold text-orange-700">Rata-rata Konversi</h2>
          <p className="text-3xl font-bold mt-2 text-orange-500">{analyticsData.totalConversion}%</p>
        </div>
        <div className="rounded-xl shadow-md p-5 flex flex-col items-center justify-center text-center border-t-4 border-purple-500 bg-purple-100">
          <div className="mb-2"><FaMoneyBillWave className="w-6 h-6 text-purple-500" /></div>
          <h2 className="text-base font-semibold text-purple-700">Rata-rata ROI</h2>
          <p className="text-3xl font-bold mt-2 text-purple-500">{analyticsData.totalRoi}%</p>
        </div>
      </div>

      {/* Bagian Visualisasi Data (Placeholder untuk grafik) */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaChartLine className="w-5 h-5 text-primary" />
          Tren Kinerja Kampanye
        </h2>
        <div className="bg-gray-100 h-64 flex items-center justify-center text-gray-400 rounded-lg p-4 mb-4">
          [Area untuk Grafik Garis/Batang (misal: Leads & Konversi per Bulan)]
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 h-40 flex items-center justify-center text-gray-400 rounded-lg p-4">
            [Grafik Distribusi Leads per Saluran]
          </div>
          <div className="bg-gray-100 h-40 flex items-center justify-center text-gray-400 rounded-lg p-4">
            [Grafik Konversi per Target Audiens]
          </div>
        </div>
        <div className="text-right mt-6">
          <button
            onClick={() => handleDownloadReport('PDF')}
            className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2 text-sm ml-auto mb-2"
          >
            <FaFilePdf className="w-4 h-4" /> Unduh Laporan PDF
          </button>
          <button
            onClick={() => handleDownloadReport('CSV')}
            className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center justify-center gap-2 text-sm ml-auto"
          >
            <FaFileExcel className="w-4 h-4" /> Unduh Data CSV
          </button>
        </div>
      </section>
    </div>
  );
};

export default CampaignAnalyticsPage;