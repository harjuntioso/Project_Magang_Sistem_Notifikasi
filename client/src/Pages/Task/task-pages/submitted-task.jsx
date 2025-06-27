import React, { useState, useEffect } from 'react'; // <<<--- Tambah useEffect
import {
  FaPaperPlane, FaSearch, FaFilter, FaEye, FaClipboardList,
  FaClock, FaCheckCircle, FaTimesCircle, FaSyncAlt, FaTimes, // FaTimes untuk tombol batal
  FaSpinner, // Untuk loading
} from 'react-icons/fa';
import { useAuth } from '../../../Context/AuthContext'; // <<<--- Tambah useAuth
import axiosClient from '../../../axiosClient'; // <<<--- Tambah axiosClient
import Swal from 'sweetalert2'; // <<<--- Tambah Swal

const SubmittedTasksPage = () => {
  const { user } = useAuth(); // User yang sedang login
  const userId = user?.id; // ID user yang login

  // State untuk daftar tugas yang diajukan
  const [myTasks, setMyTasks] = useState([]); // <<<--- Hapus dummy data di sini
  // State untuk loading
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [loadingStatuses, setLoadingStatuses] = useState(true); // Loading untuk status tugas
  const [loadingDepartments, setLoadingDepartments] = useState(true); // Loading untuk departemen

  // State untuk filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDeptTo, setFilterDeptTo] = useState('All');

  // State untuk menyimpan daftar status tugas dan departemen dari backend
  const [allTaskStatuses, setAllTaskStatuses] = useState([]);
  const [allDepartments, setAllDepartments] = useState([]);


  // Helper untuk mendapatkan ID status berdasarkan nama
  const getStatusIdByName = (name) => {
    const status = allTaskStatuses.find(s => s.name === name);
    return status ? status.id : null;
  };

  const getStatusColor = (statusName) => { // Menggunakan statusName, bukan status object
    switch (statusName) {
      case 'Menunggu Persetujuan Atasan': return 'bg-purple-200 text-purple-800';
      case 'Menunggu Proses di Penerima': return 'bg-orange-200 text-orange-800';
      case 'Selesai': return 'bg-green-200 text-green-800';
      case 'Ditolak Penerima': return 'bg-red-200 text-red-800';
      case 'Ditolak Atasan': return 'bg-red-200 text-red-800';
      case 'Pengajuan Revisi': return 'bg-yellow-200 text-yellow-800';
      case 'Cancelled': return 'bg-gray-200 text-gray-800'; // Tambah warna untuk status 'Cancelled'
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  // EFFECT PERTAMA: Untuk memuat status tugas dan departemen dari backend (sekali)
  useEffect(() => {
    const fetchMasterData = async () => {
      setLoadingStatuses(true);
      setLoadingDepartments(true);
      try {
        const statusesResponse = await axiosClient.get('/tasks/task-statuses');
        setAllTaskStatuses(statusesResponse.data);
        setLoadingStatuses(false);

        const departmentsResponse = await axiosClient.get('/departments');
        setAllDepartments(departmentsResponse.data);
        setLoadingDepartments(false);
      } catch (error) {
        console.error("Gagal memuat master data:", error.response || error);
        Swal.fire('Error', 'Gagal memuat data utama untuk tugas saya.', 'error');
      }
    };
    fetchMasterData();
  }, []);

  // EFFECT KEDUA: Untuk memuat tugas saya (berjalan saat filter atau user berubah)
  useEffect(() => {
    // Pastikan user dan master data sudah dimuat sebelum fetch tasks
    if (userId && !loadingStatuses && !loadingDepartments) {
      fetchMySubmittedTasks();
    } else if (!userId && user) { // User login tapi tidak punya ID
        Swal.fire('Info', 'User ID tidak ditemukan. Tidak dapat memuat tugas Anda.', 'info');
        setLoadingTasks(false);
    }
  }, [searchTerm, filterStatus, filterDeptTo, userId, loadingStatuses, loadingDepartments]);


  const fetchMySubmittedTasks = async () => {
    setLoadingTasks(true);
    try {
      const params = {
        requester_id: userId, // Filter berdasarkan user yang login
        status_name: filterStatus === 'All' ? null : filterStatus, // Mengirim nama status
        assigned_to_department_id: filterDeptTo === 'All' ? null : filterDeptTo, // Mengirim ID departemen tujuan
        search: searchTerm,
      };
      
      // <<< Endpoint BARU untuk mengambil tugas yang diajukan oleh user >>>
      const response = await axiosClient.get('/tasks/my-submitted', { params });
      setMyTasks(response.data);
    } catch (error) {
      console.error("Gagal memuat tugas saya:", error.response || error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Gagal memuat daftar tugas Anda.',
      });
    } finally {
      setLoadingTasks(false);
    }
  };

  // --- Aksi 'Ajukan Revisi' ---
  const handleResubmitRevision = async (task) => {
    // Tugas ini statusnya harus 'Pengajuan Revisi'
    const { value: notes } = await Swal.fire({
      title: 'Ajukan Kembali Tugas Revisi?',
      input: 'textarea',
      inputLabel: `Tambahkan catatan untuk pengajuan revisi ulang tugas "${task.title}":`,
      inputPlaceholder: 'Catatan revisi...',
      showCancelButton: true,
      confirmButtonText: 'Ajukan Ulang',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#ffc107',
    });

    if (notes !== undefined) { // Cek jika pengguna klik 'Ajukan Ulang' (bukan 'Batal')
      const pendingApprovalStatusId = getStatusIdByName('Pending Approval (Requester Supervisor)');
      if (!pendingApprovalStatusId) {
        Swal.fire('Error', 'Status "Pending Approval (Requester Supervisor)" tidak ditemukan. Hubungi admin.', 'error');
        return;
      }

      Swal.fire({ title: 'Memproses...', html: 'Mengajukan revisi ulang...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
      try {
        await axiosClient.put(`/tasks/${task.id}`, {
          current_status_id: pendingApprovalStatusId, // Kembalikan ke status menunggu persetujuan atasan
          revision_notes: notes, // Catatan revisi baru
          last_action_by_id: user.id,
          // Opsional: reset approver_id, approved_at, rejection_reason
          approver_id: null,
          approved_at: null,
          rejection_reason: null,
        });
        Swal.fire('Berhasil!', 'Tugas berhasil diajukan ulang untuk direvisi.', 'success');
        fetchMySubmittedTasks(); // Refresh daftar tugas
      } catch (error) {
        console.error("Gagal mengajukan revisi tugas:", error.response || error);
        let errorMessage = 'Gagal mengajukan revisi tugas. Silakan coba lagi.';
        if (error.response?.data?.message) errorMessage = error.response.data.message;
        else if (error.response?.data?.errors) errorMessage = Object.values(error.response.data.errors).flat().join('\n');
        Swal.fire('Error', errorMessage, 'error');
      }
    }
  };

  // --- Aksi 'Batalkan Pengajuan' ---
  const handleCancelSubmission = async (task) => {
    const result = await Swal.fire({
      title: 'Batalkan Pengajuan Tugas Ini?',
      text: `Anda yakin ingin membatalkan tugas "${task.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Batalkan!',
      cancelButtonText: 'Tidak',
    });

    if (result.isConfirmed) {
      const cancelledStatusId = getStatusIdByName('Cancelled');
      if (!cancelledStatusId) {
        Swal.fire('Error', 'Status "Cancelled" tidak ditemukan. Hubungi admin.', 'error');
        return;
      }

      Swal.fire({ title: 'Memproses...', html: 'Membatalkan pengajuan...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
      try {
        await axiosClient.put(`/tasks/${task.id}`, {
          current_status_id: cancelledStatusId,
          last_action_by_id: user.id,
          rejection_reason: 'Dibatalkan oleh pengaju.', // Catatan pembatalan
          // Opsional: reset approver_id, approved_at, assignee_id, assigned_at, revision_notes
          approver_id: null,
          approved_at: null,
          assignee_id: null,
          assigned_at: null,
          revision_notes: null,
        });
        Swal.fire('Dibatalkan!', 'Pengajuan tugas berhasil dibatalkan.', 'success');
        fetchMySubmittedTasks(); // Refresh daftar tugas
      } catch (error) {
        console.error("Gagal membatalkan pengajuan:", error.response || error);
        let errorMessage = 'Gagal membatalkan pengajuan. Silakan coba lagi.';
        if (error.response?.data?.message) errorMessage = error.response.data.message;
        else if (error.response?.data?.errors) errorMessage = Object.values(error.response.data.errors).flat().join('\n');
        Swal.fire('Error', errorMessage, 'error');
      }
    }
  };


  if (loadingTasks || loadingStatuses || loadingDepartments) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
        <p>{loadingStatuses || loadingDepartments ? 'Memuat data utama...' : 'Memuat tugas Anda...'}</p>
      </div>
    );
  }

  // Tampilkan pesan jika user tidak punya ID
  if (!userId) {
    return (
      <div className="p-8 bg-neutral-50 min-h-screen text-center text-gray-600">
        <p className="text-xl font-semibold mb-4">Akses Ditolak</p>
        <p>User ID tidak ditemukan. Tidak dapat memuat tugas yang Anda ajukan.</p>
        <p className="text-sm mt-2">Mohon login kembali atau hubungi administrator sistem.</p>
      </div>
    );
  }


  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-700 mb-8 flex items-center gap-3">
        <FaPaperPlane className="w-8 h-8 text-purple-500" />
        Tugas Saya (Yang Diajukan)
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Lacak status dan riwayat semua tugas atau permintaan yang Anda ajukan ke departemen lain.
      </p>

      {/* Filter Tugas */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-purple-500">
        <h2 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-purple-500" />
          Filter Tugas Saya
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="search-my-task" className="block text-gray-700 font-medium mb-1">Cari Tugas</label>
            <input
              type="text"
              id="search-my-task"
              placeholder="Judul Tugas, Dept. Tujuan..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-status" className="block text-gray-700 font-medium mb-1">Status</label>
            <select
              id="filter-status"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">Semua Status</option>
              {allTaskStatuses.map(status => (
                <option key={status.id} value={status.name}>{status.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filter-dept-to" className="block text-gray-700 font-medium mb-1">Departemen Tujuan</label>
            <select
              id="filter-dept-to"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              value={filterDeptTo}
              onChange={(e) => setFilterDeptTo(e.target.value)}
            >
              <option value="All">Semua Departemen</option>
              {allDepartments.map(dep => (
                <option key={dep.id} value={dep.id}>{dep.name}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Tabel Tugas Saya */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaClipboardList className="w-5 h-5 text-primary" />
          Daftar Tugas Anda ({myTasks.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Judul Tugas</th>
                <th className="py-3 px-6 text-left">Departemen Tujuan</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Terakhir Diperbarui</th>
                <th className="py-3 px-6 text-center">Catatan/Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {myTasks.length > 0 ? (
                myTasks.map((task) => (
                  <tr key={task.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{task.title}</td>
                    <td className="py-3 px-6 text-left">{task.assigned_to_department?.name}</td> {/* Menggunakan relasi */}
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getStatusColor(task.current_status?.name)}`}> {/* Menggunakan relasi */}
                        {task.current_status?.name === 'Menunggu Persetujuan Atasan' && <FaClock className="inline-block mr-1" />}
                        {task.current_status?.name === 'Menunggu Proses di Penerima' && <FaClock className="inline-block mr-1" />}
                        {task.current_status?.name === 'Selesai' && <FaCheckCircle className="inline-block mr-1" />}
                        {task.current_status?.name === 'Ditolak Penerima' && <FaTimesCircle className="inline-block mr-1" />}
                        {task.current_status?.name === 'Ditolak Atasan' && <FaTimesCircle className="inline-block mr-1" />}
                        {task.current_status?.name === 'Pengajuan Revisi' && <FaSyncAlt className="inline-block mr-1" />}
                        {task.current_status?.name === 'Cancelled' && <FaTimes className="inline-block mr-1" />} {/* Tambah ikon batal */}
                        {task.current_status?.name}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left text-xs text-gray-500">{new Date(task.updated_at).toLocaleDateString('id-ID')}</td> {/* Menggunakan updated_at */}
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <a href={`/task-exchange/detail/${task.id}`} className="text-blue-500 hover:text-blue-700 text-lg" title="Lihat Detail">
                          <FaEye />
                        </a>
                        {/* Tombol Aksi berdasarkan Status */}
                        {task.current_status?.name === 'Pengajuan Revisi' && (
                          <button onClick={() => handleResubmitRevision(task)} className="text-purple-500 hover:text-purple-700 text-lg" title="Ajukan Revisi">
                            <FaSyncAlt />
                          </button>
                        )}
                        {(task.current_status?.name === 'Menunggu Persetujuan Atasan' || task.current_status?.name === 'Menunggu Proses di Penerima') && (
                          <button onClick={() => handleCancelSubmission(task)} className="text-red-500 hover:text-red-700 text-lg" title="Batalkan Pengajuan">
                            <FaTimes />
                          </button>
                        )}
                      </div>
                      {task.revision_notes && <p className="text-xs text-gray-500 mt-1">Revisi: {task.revision_notes}</p>} {/* Menggunakan revision_notes */}
                      {task.rejection_reason && <p className="text-xs text-gray-500 mt-1">Ditolak: {task.rejection_reason}</p>} {/* Menggunakan rejection_reason */}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">Belum ada tugas yang Anda ajukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default SubmittedTasksPage;