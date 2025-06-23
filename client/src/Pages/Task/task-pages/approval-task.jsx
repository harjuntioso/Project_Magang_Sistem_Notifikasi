import React, { useState, useEffect } from 'react';
import {
  FaCheckCircle, FaUserTie, FaSearch, FaFilter,
  FaEye, FaClipboardList, FaUserCheck, FaUserTimes,
  FaClock, FaSpinner, FaSyncAlt, FaExclamationCircle
} from 'react-icons/fa';
import { useAuth } from '../../../Context/AuthContext';
import axiosClient from '../../../axiosClient';
import Swal from 'sweetalert2';

const ApprovalTaskPage = () => {
  const { user } = useAuth();
  const [tasksToApprove, setTasksToApprove] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterRequester, setFilterRequester] = useState('All');
  const [allRequesters, setAllRequesters] = useState([]);
  const priorityOptions = ['All', 'High', 'Medium', 'Low'];
  const requesterOptions = ['All', ...allRequesters.map(r => r.name)]; // Akan diisi setelah memuat data pemohon
  const [reason, setReason] = useState('');

  useEffect(() => {
    fetchPendingApprovalTasks();
  }, [searchTerm, filterPriority, filterRequester]);

  const [result, setResult] = useState({ isConfirmed: false, value: '' });

  // --- STATE BARU: Untuk menyimpan daftar status tugas dari backend ---
  const [taskStatuses, setTaskStatuses] = useState([]);
  const [loadingStatuses, setLoadingStatuses] = useState(true);

  const getPriorityColor = (priority) => { /* ... */ };

  // --- EFFECT BARU: Untuk memuat status tugas dari backend ---
  useEffect(() => {
    const fetchTaskStatuses = async () => {
      setLoadingStatuses(true);
      try {
        const response = await axiosClient.get('/task-statuses'); // Endpoint untuk TaskStatusController@index
        setTaskStatuses(response.data);
      } catch (error) {
        console.error("Gagal memuat status tugas:", error.response || error);
        Swal.fire('Error', 'Gagal memuat daftar status tugas.', 'error');
      } finally {
        setLoadingStatuses(false);
      }
    };
    fetchTaskStatuses();
  }, []); // Hanya berjalan sekali saat komponen mount

  const fetchPendingApprovalTasks = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get('/tasks/pending-approval', {
        params: {
          search: searchTerm,
          priority: filterPriority === 'All' ? null : filterPriority,
          requester_id: filterRequester === 'All' ? null : filterRequester,
        }
      });
      setTasksToApprove(response.data);

      const uniqueRequestersMap = new Map();
      response.data.forEach(task => {
        if (task.requester) {
          uniqueRequestersMap.set(task.requester.id, task.requester.name);
        }
      });
      const newAllRequesters = Array.from(uniqueRequestersMap, ([id, name]) => ({ id, name }));
      setAllRequesters(newAllRequesters);

    } catch (error) {
      console.error("Gagal memuat tugas menunggu persetujuan:", error.response || error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Gagal memuat daftar tugas menunggu persetujuan.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Pastikan status tugas sudah dimuat sebelum mencoba fetch task
    if (!loadingStatuses) {
      fetchPendingApprovalTasks();
    }
  }, [searchTerm, filterPriority, filterRequester, loadingStatuses]); // Tambah loadingStatuses sebagai dependency

  // Helper untuk mendapatkan ID status berdasarkan nama
  const getStatusIdByName = (name) => {
    const status = taskStatuses.find(s => s.name === name);
    return status ? status.id : null;
  };

  const handleApprove = async (task) => {
    // ... (konfirmasi Swal.fire yang sudah ada)

    if (result.isConfirmed) {
      // ... (Swal.fire loading)

      try {
        const approvedStatusId = getStatusIdByName('Approved');
        const receiverPendingStatusId = getStatusIdByName('Pending Acceptance (Receiver)'); // Status tujuan setelah disetujui

        if (!approvedStatusId || !receiverPendingStatusId) {
          throw new Error("Status IDs for task approval not found. Please contact admin.");
        }

        await axiosClient.put(`/tasks/${task.id}`, {
          current_status_id: approvedStatusId,
          approver_id: user.id,
          // Convert date to string format expected by Laravel (YYYY-MM-DD HH:MM:SS)
          approved_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
          last_action_by_id: user.id,
          // Kita juga perlu mengirim status baru yang akan memicu notifikasi WA ke departemen tujuan
          // Di backend, kita memeriksa oldStatus.id !== task.currentStatus.id
          // Agar notifikasi ke departemen tujuan terkirim, kita update ke 'Approved'
          // dan backend akan memprosesnya.
        });

        Swal.fire('Disetujui!', 'Tugas berhasil disetujui.', 'success');
        fetchPendingApprovalTasks(); // Refresh daftar tugas
      } catch (error) {
        // ... (Error handling)
      }
    }
  };

  const handleReject = async (task) => {
    // ... (konfirmasi Swal.fire dengan input alasan)

    if (reason) {
      // ... (Swal.fire loading)

      try {
        const rejectedStatusId = getStatusIdByName('Rejected (Manager)');

        if (!rejectedStatusId) {
          throw new Error("Status ID for task rejection not found. Please contact admin.");
        }

        await axiosClient.put(`/tasks/${task.id}`, {
          current_status_id: rejectedStatusId,
          rejection_reason: reason,
          last_action_by_id: user.id,
        });

        Swal.fire('Ditolak!', 'Tugas berhasil ditolak.', 'success');
        fetchPendingApprovalTasks(); // Refresh daftar tugas
      } catch (error) {
        // ... (Error handling)
      }
    }
  };

  const handleRequestRevision = async (task) => {
    const { value: notes } = await Swal.fire({
      title: 'Minta Revisi Tugas Ini?',
      input: 'textarea',
      inputLabel: `Berikan catatan revisi yang diperlukan untuk "${task.title}":`,
      inputPlaceholder: 'Catatan revisi wajib diisi...',
      inputValidator: (value) => {
        if (!value) {
          return 'Catatan revisi tidak boleh kosong!';
        }
      },
      showCancelButton: true,
      confirmButtonText: 'Minta Revisi',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#ffc107',
    });

    if (notes) {
      Swal.fire({
        title: 'Memproses...',
        html: 'Mengajukan revisi...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });
      try {
        const revisionStatusId = getStatusIdByName('Revision Requested');

        if (!revisionStatusId) {
          throw new Error("Status ID for revision request not found. Please contact admin.");
        }

        await axiosClient.put(`/tasks/${task.id}`, {
          current_status_id: revisionStatusId,
          revision_notes: notes,
          last_action_by_id: user.id,
        });

        Swal.fire('Revisi Diajukan!', 'Permintaan revisi tugas berhasil diajukan.', 'success');
        fetchPendingApprovalTasks(); // Refresh daftar tugas
      } catch (error) {
        console.error("Gagal mengajukan revisi tugas:", error.response || error);
        let errorMessage = 'Gagal mengajukan revisi tugas. Silakan coba lagi.';
        if (error.response?.data?.errors) {
          errorMessage = Object.values(error.response.data.errors).flat().join('\n');
        }
        Swal.fire('Error', errorMessage, 'error');
      }
    }
  };


  if (loading || loadingStatuses) { // Tampilkan loading jika salah satu data belum siap
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
        <p>{loadingStatuses ? 'Memuat status tugas...' : 'Memuat tugas menunggu persetujuan...'}</p>
      </div>
    );
  }

  // ... (rest of render method)
  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      {/* ... (bagian judul dan deskripsi) ... */}

      {/* Filter Tugas */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-orange-500">
        <h2 className="text-xl font-semibold mb-4 text-orange-700 flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-orange-500" />
          Filter Pengajuan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
          {/* ... (Search, Priority filter) ... */}
          <div>
            <label htmlFor="filter-requester" className="block text-gray-700 font-medium mb-1">Pemohon</label>
            <select
              id="filter-requester"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              value={filterRequester}
              onChange={(e) => setFilterRequester(e.target.value)}
            >
              <option value="All">Semua Pemohon</option>
              {allRequesters.map((requester) => (
                <option key={requester.id} value={requester.id}>{requester.name}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Tabel Pengajuan Tugas */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaClipboardList className="w-5 h-5 text-primary" />
          Daftar Tugas Menunggu Persetujuan ({tasksToApprove.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Judul Tugas</th>
                <th className="py-3 px-6 text-left">Pemohon</th>
                <th className="py-3 px-6 text-left">Departemen Tujuan</th>
                <th className="py-3 px-6 text-left">Deadline</th>
                <th className="py-3 px-6 text-left">Prioritas</th>
                <th className="py-3 px-6 text-left">Diajukan Pada</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {tasksToApprove.length > 0 ? (
                tasksToApprove.map((task) => (
                  <tr key={task.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{task.title}</td>
                    <td className="py-3 px-6 text-left">{task.requester?.name} ({task.requested_by_department?.name})</td>
                    <td className="py-3 px-6 text-left">{task.assigned_to_department?.name}</td>
                    <td className="py-3 px-6 text-left">{task.deadline}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left text-xs text-gray-500">{new Date(task.created_at).toLocaleDateString('id-ID')}</td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <a href={`/task-exchange/detail/${task.id}`} className="text-blue-500 hover:text-blue-700 text-lg" title="Lihat Detail">
                          <FaEye />
                        </a>
                        <button onClick={() => handleApprove(task)} className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-600 transition-colors mr-2">
                          Setujui
                        </button>
                        <button onClick={() => handleReject(task)} className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600 transition-colors mr-2">
                          Tolak
                        </button>
                        <button onClick={() => handleRequestRevision(task)} className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-yellow-600 transition-colors">
                          Revisi
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">Tidak ada tugas menunggu persetujuan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ApprovalTaskPage;