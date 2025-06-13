import React, { useState, useEffect } from 'react';
import {
  FaChartBar,        // Ikon utama
  FaClipboardList,   // Proyek
  FaPlayCircle,      // Aktif
  FaCheckCircle,     // Selesai
  FaTasks,           // Tugas
  FaUsers,           // Anggota Tim
  FaCalendarAlt,     // Deadline
  FaPlusCircle,      // Buat baru
} from 'react-icons/fa';

const ProjectDashboardPage = () => {
  const [projectStats, setProjectStats] = useState({
    activeProjects: 3,
    completedProjects: 8,
    totalTasksOpen: 45,
    upcomingDeadlines: 5, // dalam 7 hari
  });

  const [recentProjects, setRecentProjects] = useState([
    { id: 'PROJ001', name: 'Implementasi Sistem HRIS Baru', status: 'In Progress', progress: 75, deadline: '2025-08-31', manager: 'Siti Nurhayati (HRD)' },
    { id: 'PROJ002', name: 'Pengembangan Wahana Air Baru', status: 'In Progress', progress: 50, deadline: '2025-12-15', manager: 'Budi Santoso (Operasional)' },
    { id: 'PROJ003', name: 'Kampanye Pemasaran Liburan Akhir Tahun', status: 'In Progress', progress: 30, deadline: '2025-11-30', manager: 'Ayu Lestari (Pemasaran)' },
    // ... tambahkan data dummy proyek terbaru
  ]);

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-700 mb-8 flex items-center gap-3">
        <FaChartBar className="w-8 h-8 text-gray-500" />
        Dashboard Proyek Lintas Departemen
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Lihat ringkasan dan status terkini semua proyek yang sedang berjalan di perusahaan.
      </p>

      {/* Stat Cards Proyek */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="rounded-xl shadow-md p-5 flex flex-col items-center justify-center text-center border-t-4 border-gray-500 bg-gray-100">
          <div className="mb-2"><FaPlayCircle className="w-6 h-6 text-gray-500" /></div>
          <h2 className="text-base font-semibold text-gray-700">Proyek Aktif</h2>
          <p className="text-3xl font-bold mt-2 text-gray-500">{projectStats.activeProjects}</p>
        </div>
        <div className="rounded-xl shadow-md p-5 flex flex-col items-center justify-center text-center border-t-4 border-green-500 bg-green-100">
          <div className="mb-2"><FaCheckCircle className="w-6 h-6 text-green-500" /></div>
          <h2 className="text-base font-semibold text-green-700">Proyek Selesai (Tahun Ini)</h2>
          <p className="text-3xl font-bold mt-2 text-green-500">{projectStats.completedProjects}</p>
        </div>
        <div className="rounded-xl shadow-md p-5 flex flex-col items-center justify-center text-center border-t-4 border-blue-500 bg-blue-100">
          <div className="mb-2"><FaTasks className="w-6 h-6 text-blue-500" /></div>
          <h2 className="text-base font-semibold text-blue-700">Tugas Terbuka</h2>
          <p className="text-3xl font-bold mt-2 text-blue-500">{projectStats.totalTasksOpen}</p>
        </div>
        <div className="rounded-xl shadow-md p-5 flex flex-col items-center justify-center text-center border-t-4 border-orange-500 bg-orange-100">
          <div className="mb-2"><FaCalendarAlt className="w-6 h-6 text-orange-500" /></div>
          <h2 className="text-base font-semibold text-orange-700">Deadline Mendatang</h2>
          <p className="text-3xl font-bold mt-2 text-orange-500">{projectStats.upcomingDeadlines}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Card: Proyek Terkini */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-500">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
              <FaClipboardList className="w-5 h-5 text-gray-500" />
              Proyek Aktif Terkini
            </h2>
            <a href="/management/umum/manajemen-proyek/buat" className="text-sm text-gray-500 hover:underline flex items-center gap-1">
              <FaPlusCircle className="text-sm" /> Buat Proyek Baru
            </a>
          </div>
          <ul className="space-y-4">
            {recentProjects.length > 0 ? (
              recentProjects.map(project => (
                <li key={project.id} className="pb-2 border-b border-gray-100 last:border-b-0">
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  <p className="text-gray-600 text-sm">Status: <span className="font-medium text-blue-600">{project.status}</span></p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-1">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                  </div>
                  <p className="text-gray-600 text-xs mt-1">Progress: {project.progress}% | Deadline: {project.deadline}</p>
                  <p className="text-gray-500 text-xs mt-1">Manajer: {project.manager}</p>
                  <div className="text-right mt-2">
                    <a href={`/management/umum/manajemen-proyek/detail/${project.id}`} className="text-blue-500 hover:underline text-sm">Lihat Detail</a>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500">Tidak ada proyek aktif terkini.</p>
            )}
          </ul>
        </section>

        {/* Card: Kinerja Proyek Keseluruhan (Placeholder Grafik) */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
            <FaChartBar className="w-5 h-5 text-blue-500" />
            Kinerja Proyek Keseluruhan
          </h2>
          <div className="text-gray-500 text-sm">
            <p>*Area ini akan menampilkan grafik atau bagan interaktif untuk analisis kinerja proyek (misalnya, jumlah proyek per status, tren penyelesaian, alokasi anggaran).</p>
            <div className="bg-gray-100 h-40 flex items-center justify-center text-gray-400 rounded-lg mt-3">
              [Grafik Kinerja Proyek]
            </div>
            <div className="text-right mt-4">
              <a href="/management/umum/manajemen-proyek/analisis" className="text-sm text-blue-500 hover:underline">
                Akses Dashboard Analisis &rarr;
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectDashboardPage;