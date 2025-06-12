import React, { useState, useEffect } from 'react';
import {
  FaChartLine,      // Ikon utama
  FaRunning,        // Kampanye Aktif
  FaChartBar,       // Metrik
  FaMoneyBillWave,  // Anggaran
  FaUsers,          // Leads/Audiens
  FaPlusCircle,     // Buat baru
  FaSearch,         // Filter/Cari
} from 'react-icons/fa';

const CampaignOverviewPage = () => {
  const [activeCampaigns, setActiveCampaigns] = useState([
    // Data dummy kampanye aktif
    { id: 'CAMP001', name: 'Promo Liburan Sekolah 2025', status: 'Berjalan', startDate: '2025-06-01', endDate: '2025-07-31', budget: 50000000, leads: 3200, conversionRate: 2.5, roi: 120 },
    { id: 'CAMP002', name: 'Diskon Spesial Hari Raya', status: 'Berjalan', startDate: '2025-06-15', endDate: '2025-07-15', budget: 40000000, leads: 2850, conversionRate: 1.8, roi: 110 },
    { id: 'CAMP003', name: 'Brand Awareness Q3', status: 'Berjalan', startDate: '2025-07-01', endDate: '2025-09-30', budget: 35000000, leads: 2500, conversionRate: 1.0, roi: 95 },
    // Tambahkan lebih banyak data dummy
  ]);

  const [filterTerm, setFilterTerm] = useState('');

  const filteredCampaigns = activeCampaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
    campaign.status.toLowerCase().includes(filterTerm.toLowerCase())
  );

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
      <h1 className="text-3xl font-bold text-red-700 mb-8 flex items-center gap-3">
        <FaChartLine className="w-8 h-8 text-red-500" />
        Ringkasan Kampanye Aktif
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Pantau kinerja dan status kampanye pemasaran Anda yang sedang berjalan.
      </p>

      {/* Filter dan Aksi Cepat */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-red-500">
        <h2 className="text-xl font-semibold mb-4 text-red-700 flex items-center gap-2">
          <FaSearch className="w-5 h-5 text-red-500" />
          Cari Kampanye
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <input
            type="text"
            placeholder="Cari nama kampanye atau status..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-all duration-200"
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
          />
          <a href="/management/pemasaran/campaign/buat" className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2">
            <FaPlusCircle className="w-4 h-4" /> Buat Kampanye Baru
          </a>
        </div>
      </section>

      {/* Tabel Daftar Kampanye Aktif */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaRunning className="w-5 h-5 text-primary" />
          Daftar Kampanye Aktif ({filteredCampaigns.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nama Kampanye</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Periode</th>
                <th className="py-3 px-6 text-right">Anggaran</th>
                <th className="py-3 px-6 text-right">Leads</th>
                <th className="py-3 px-6 text-right">Konversi (%)</th>
                <th className="py-3 px-6 text-right">ROI (%)</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredCampaigns.length > 0 ? (
                filteredCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{campaign.name}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${
                        campaign.status === 'Berjalan' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800' // Tambahkan warna untuk status lain jika ada
                      }`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">{campaign.startDate} - {campaign.endDate}</td>
                    <td className="py-3 px-6 text-right">{formatRupiah(campaign.budget)}</td>
                    <td className="py-3 px-6 text-right">{campaign.leads.toLocaleString('id-ID')}</td>
                    <td className="py-3 px-6 text-right">{campaign.conversionRate}%</td>
                    <td className="py-3 px-6 text-right">{campaign.roi}%</td>
                    <td className="py-3 px-6 text-center">
                      <a href={`/management/pemasaran/campaign/detail/${campaign.id}`} className="text-blue-500 hover:text-blue-700 text-sm">Lihat Detail</a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-4 text-center text-gray-500">Tidak ada kampanye aktif ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bagian Ringkasan Metrik (opsional, bisa digabung dengan stat cards jika tidak terlalu banyak) */}
      <section className="bg-white rounded-xl shadow-md p-6 mt-8 border-l-4 border-blue-500">
        <h2 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
          <FaChartBar className="w-5 h-5 text-blue-500" />
          Metrik Kinerja Utama
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 text-sm">Total Leads Bulan Ini:</p>
            <p className="text-2xl font-bold text-blue-700">{campaignStats.newLeadsThisMonth.toLocaleString('id-ID')}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Total Anggaran Terpakai:</p>
            <p className="text-2xl font-bold text-blue-700">{formatRupiah(campaignStats.totalBudgetSpent)}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CampaignOverviewPage;