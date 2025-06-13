import React, { useState, useEffect } from 'react';
import {
  FaTasks,           // Ikon utama
  FaChartLine,       // Progress
  FaClipboardList,   // Tugas
  FaCalendarAlt,     // Timeline
  FaUsers,           // Tim
  FaCheckCircle,     // Selesai
  FaHourglassHalf,   // Tertunda
  FaPlayCircle,      // Sedang Berjalan
  FaInfoCircle,      // Detail
  FaSpinner,         // Loading
  FaFilter
} from 'react-icons/fa';

const ProjectProgressMonitoringPage = () => {
  const [projectId, setProjectId] = useState('PROJ001'); // State untuk memilih proyek
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulasi pengambilan data proyek dari API berdasarkan projectId
    const fetchProjectData = async () => {
      setLoading(true);
      setError(null);
      try {
        const dummyProjects = {
          'PROJ001': {
            id: 'PROJ001',
            name: 'Implementasi Sistem HRIS Baru',
            description: 'Proyek implementasi sistem Human Resources Information System yang baru untuk seluruh karyawan.',
            manager: 'Siti Nurhayati (HRD)',
            startDate: '2025-06-01',
            endDate: '2025-08-31',
            budget: 75000000,
            status: 'In Progress',
            overallProgress: 75,
            teamMembers: ['KRY002 (HRD)', 'KRY005 (IT)', 'KRY001 (Ops)'],
            tasks: [
              { id: 1, name: 'Analisis Kebutuhan', status: 'Completed', progress: 100, assignedTo: 'Siti', deadline: '2025-06-15' },
              { id: 2, name: 'Migrasi Data', status: 'In Progress', progress: 60, assignedTo: 'Cahyo', deadline: '2025-07-30' },
              { id: 3, name: 'Pelatihan Pengguna', status: 'Planned', progress: 0, assignedTo: 'Siti', deadline: '2025-08-15' },
              { id: 4, name: 'Uji Coba Sistem', status: 'Planned', progress: 0, assignedTo: 'Budi', deadline: '2025-08-25' },
            ],
          },
          'PROJ002': {
            id: 'PROJ002',
            name: 'Pengembangan Wahana Air Baru',
            description: 'Pengembangan wahana air baru di area timur taman hiburan.',
            manager: 'Budi Santoso (Operasional)',
            startDate: '2025-01-01',
            endDate: '2025-12-15',
            budget: 500000000,
            status: 'In Progress',
            overallProgress: 50,
            teamMembers: ['KRY001 (Ops)', 'KRY003 (Keuangan)', 'KRY004 (Pemasaran)'],
            tasks: [
                { id: 1, name: 'Desain Konsep', status: 'Completed', progress: 100, assignedTo: 'Budi', deadline: '2025-03-01' },
                { id: 2, name: 'Perizinan', status: 'In Progress', progress: 80, assignedTo: 'Joko', deadline: '2025-06-30' },
                { id: 3, name: 'Konstruksi Tahap 1', status: 'In Progress', progress: 40, assignedTo: 'Budi', deadline: '2025-09-30' },
            ],
          },
        };
        // Ganti dengan panggilan API sesungguhnya
        // const response = await api.get(`/projects/${projectId}`);
        // setProject(response.data);
        setProject(dummyProjects[projectId]); // Menggunakan dummy data
      } catch (err) {
        setError('Gagal memuat data proyek. Silakan pilih proyek lain atau coba lagi.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProjectData();
    }
  }, [projectId]); // Re-run effect jika projectId berubah

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTaskStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-200 text-green-800';
      case 'In Progress': return 'bg-blue-200 text-blue-800';
      case 'Planned': return 'bg-gray-200 text-gray-800';
      case 'Overdue': return 'bg-red-200 text-red-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-orange-700 mb-8 flex items-center gap-3">
        <FaTasks className="w-8 h-8 text-orange-500" />
        Pemantauan Progress Proyek
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Pantau detail, tugas, dan progres proyek-proyek lintas departemen secara mendalam.
      </p>

      {/* Pemilihan Proyek */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-orange-500">
        <h2 className="text-xl font-semibold mb-4 text-orange-700 flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-orange-500" />
          Pilih Proyek
        </h2>
        <div>
          <label htmlFor="select-project" className="block text-gray-700 font-medium mb-1">Pilih Proyek untuk Dipantau</label>
          <select
            id="select-project"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          >
            <option value="">-- Pilih Proyek --</option>
            <option value="PROJ001">Implementasi Sistem HRIS Baru</option>
            <option value="PROJ002">Pengembangan Wahana Air Baru</option>
            <option value="PROJ003">Kampanye Pemasaran Liburan Akhir Tahun</option>
            {/* Opsi proyek dari data backend Anda */}
          </select>
        </div>
      </section>

      {loading && (
        <div className="flex items-center justify-center py-10">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
          <p className="ml-4 text-gray-700">Memuat detail proyek...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {!loading && !error && project && (
        <>
          {/* Ringkasan Proyek */}
          <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-primary">
            <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
              <FaInfoCircle className="w-5 h-5 text-primary" />
              Detail Proyek: {project.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <p><span className="font-semibold">ID Proyek:</span> {project.id}</p>
                <p><span className="font-semibold">Manajer Proyek:</span> {project.manager}</p>
                <p><span className="font-semibold">Periode:</span> {project.startDate} - {project.endDate}</p>
                <p><span className="font-semibold">Anggaran:</span> {formatRupiah(project.budget)}</p>
              </div>
              <div>
                <p><span className="font-semibold">Status:</span> {project.status}</p>
                <p><span className="font-semibold">Progress Keseluruhan:</span> {project.overallProgress}%</p>
                <p className="mt-2 text-gray-600 text-sm">{project.description}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="font-semibold text-gray-700 mb-2 flex items-center gap-2"><FaUsers className="text-sm" /> Anggota Tim:</p>
              <div className="flex flex-wrap gap-2">
                {project.teamMembers.map((member, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{member}</span>
                ))}
              </div>
            </div>
          </section>

          {/* Progress Bar Keseluruhan */}
          <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-green-500">
            <h2 className="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2">
              <FaChartLine className="w-5 h-5 text-green-500" />
              Progress Proyek: {project.overallProgress}%
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
              <div className="bg-green-600 h-4 rounded-full" style={{ width: `${project.overallProgress}%` }}></div>
            </div>
          </section>

          {/* Daftar Tugas Proyek */}
          <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-accent">
            <h2 className="text-xl font-semibold mb-4 text-accent-dark flex items-center gap-2">
              <FaClipboardList className="w-5 h-5 text-accent" />
              Daftar Tugas Proyek ({project.tasks.length})
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Tugas</th>
                    <th className="py-3 px-6 text-left">Ditugaskan Kepada</th>
                    <th className="py-3 px-6 text-left">Deadline</th>
                    <th className="py-3 px-6 text-left">Progress (%)</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm font-light">
                  {project.tasks.length > 0 ? (
                    project.tasks.map((task) => (
                      <tr key={task.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{task.name}</td>
                        <td className="py-3 px-6 text-left">{task.assignedTo}</td>
                        <td className="py-3 px-6 text-left">{task.deadline}</td>
                        <td className="py-3 px-6 text-left">
                            <div className="w-20 bg-gray-200 rounded-full h-2.5">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${task.progress}%` }}></div>
                            </div>
                            <span className="text-xs text-gray-500 mt-1 block">{task.progress}%</span>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getTaskStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <button className="text-blue-500 hover:text-blue-700 text-sm">Detail</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-4 text-center text-gray-500">Tidak ada tugas ditemukan untuk proyek ini.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="text-right mt-4">
              <a href={`/management/umum/manajemen-proyek/detail/${projectId}/tugas`} className="text-sm text-accent hover:underline">
                Kelola Semua Tugas &rarr;
              </a>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default ProjectProgressMonitoringPage;