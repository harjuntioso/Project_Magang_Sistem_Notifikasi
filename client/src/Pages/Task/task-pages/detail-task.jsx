import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../../../axiosClient';
import Swal from 'sweetalert2';
import {
  FaSpinner, FaInfoCircle, FaUser, FaBuilding, FaTag,
  FaCalendarAlt, FaClock, FaClipboardList, FaCheckCircle, FaTimesCircle,
  FaPaperclip, FaComment, FaDownload, FaSyncAlt, FaExclamationTriangle, FaUserTie, FaFileAlt
} from 'react-icons/fa'; // Tambah icons yang dibutuhkan

const TaskDetailPage = () => {
  const { id } = useParams(); // Mendapatkan ID tugas dari URL
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosClient.get(`/tasks/${id}`); // Panggil API show TaskController
        setTask(response.data);
      } catch (err) {
        console.error("Failed to fetch task details:", err.response || err);
        setError("Gagal memuat detail tugas. Tugas mungkin tidak ditemukan atau terjadi kesalahan.");
        Swal.fire('Error', 'Gagal memuat detail tugas.', 'error');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTaskDetails();
    }
  }, [id]); // Fetch ulang jika ID berubah

  // Helper untuk format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Helper untuk format ukuran file
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Helper untuk warna prioritas
  const getPriorityColorClass = (priority) => {
    switch (priority) {
      case 'Urgent': return 'text-red-600';
      case 'High': return 'text-orange-600';
      case 'Medium': return 'text-yellow-600';
      case 'Normal': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  // Helper untuk warna status
  const getStatusBadgeColorClass = (statusName) => {
    switch (statusName) {
        case 'Pending Approval (Requester Supervisor)': return 'bg-purple-100 text-purple-800';
        case 'Pending Acceptance (Receiver)': return 'bg-blue-100 text-blue-800';
        case 'Accepted': return 'bg-indigo-100 text-indigo-800';
        case 'In Progress': return 'bg-teal-100 text-teal-800';
        case 'Completed': return 'bg-green-100 text-green-800';
        case 'Rejected (Supervisor)': return 'bg-red-100 text-red-800';
        case 'Rejected (Receiver)': return 'bg-red-100 text-red-800';
        case 'Revision Requested': return 'bg-yellow-100 text-yellow-800';
        case 'Cancelled': return 'bg-gray-100 text-gray-800';
        default: return 'bg-gray-100 text-gray-800';
    }
  };


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
        <p>Memuat detail tugas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-neutral-50 min-h-screen text-center text-red-600">
        <p className="text-xl font-semibold mb-4">Error Memuat Tugas</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="p-8 bg-neutral-50 min-h-screen text-center text-gray-600">
        <p className="text-xl font-semibold mb-4">Tugas Tidak Ditemukan</p>
        <p>Detail tugas dengan ID {id} tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <FaInfoCircle className="w-8 h-8 text-gray-700" />
        Detail Tugas: {task.title}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri: Informasi Dasar & Status */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Informasi Dasar Tugas */}
          <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <h2 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
              <FaClipboardList className="w-5 h-5 text-blue-500" />
              Informasi Umum Tugas
            </h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Judul Tugas:</strong> {task.title}</p>
              <p><strong>Tujuan:</strong> {task.purpose || 'N/A'}</p>
              <p><strong>Deskripsi:</strong></p>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="whitespace-pre-wrap">{task.description}</p>
              </div>
            </div>
          </section>

          {/* Status & Alur Kerja */}
          <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-teal-500">
            <h2 className="text-xl font-semibold mb-4 text-teal-700 flex items-center gap-2">
              <FaCheckCircle className="w-5 h-5 text-teal-500" />
              Status & Alur Kerja
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Status Saat Ini:</strong>{' '}
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadgeColorClass(task.currentStatus?.name)}`}>
                    {task.currentStatus?.name || 'N/A'}
                </span>
              </p>
              <p><strong>Pengaju:</strong> {task.requester?.name || 'N/A'} ({task.requestedByDepartment?.name || 'N/A'})</p>
              <p><strong>Diajukan Pada:</strong> {formatDate(task.created_at)}</p>
              <p><strong>Departemen Tujuan:</strong> {task.assignedToDepartment?.name || 'N/A'}</p>
              <p><strong>Prioritas:</strong> <span className={getPriorityColorClass(task.priority)}>{task.priority}</span></p>
              <p><strong>Batas Waktu:</strong> {task.deadline ? new Date(task.deadline).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</p>
              <p><strong>Terakhir Diperbarui Oleh:</strong> {task.lastActionBy?.name || 'Sistem'}</p>
              <p><strong>Terakhir Diperbarui Pada:</strong> {formatDate(task.updated_at)}</p>
            </div>
          </section>

          {/* Detail Approval/Assignment */}
          <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
            <h2 className="text-xl font-semibold mb-4 text-orange-700 flex items-center gap-2">
              <FaUserTie className="w-5 h-5 text-orange-500" />
              Detail Persetujuan & Penugasan
            </h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Disetujui Oleh:</strong> {task.approver?.name || 'Menunggu Persetujuan'}</p>
              <p><strong>Disetujui Pada:</strong> {task.approved_at ? formatDate(task.approved_at) : 'N/A'}</p>
              <p><strong>Ditugaskan Kepada:</strong> {task.assignee?.name || 'Belum Ditugaskan'}</p>
              <p><strong>Ditugaskan Pada:</strong> {task.assigned_at ? formatDate(task.assigned_at) : 'N/A'}</p>
              
              {task.rejection_reason && (
                <div className="bg-red-50 p-3 rounded-lg border border-red-300 text-red-700">
                  <p className="font-semibold flex items-center gap-2"><FaTimesCircle /> Alasan Ditolak:</p>
                  <p className="whitespace-pre-wrap mt-1">{task.rejection_reason}</p>
                </div>
              )}
              {task.revision_notes && (
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-300 text-yellow-700">
                  <p className="font-semibold flex items-center gap-2"><FaSyncAlt /> Catatan Revisi:</p>
                  <p className="whitespace-pre-wrap mt-1">{task.revision_notes}</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Kolom Kanan: Lampiran & Komentar */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          {/* Lampiran */}
          <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <h2 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2">
              <FaPaperclip className="w-5 h-5 text-purple-500" />
              Lampiran ({task.attachments?.length || 0})
            </h2>
            {task.attachments && task.attachments.length > 0 ? (
              <ul className="space-y-2">
                {task.attachments.map((attachment) => (
                  <li key={attachment.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 text-sm flex items-center gap-2">
                      <FaFileAlt className="text-blue-500" /> {attachment.file_name} ({formatFileSize(attachment.file_size)})
                    </span>
                    <a
                      // Or use: <Link to={attachment.url} ...> if you want client-side routing
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                      download
                    >
                      <FaDownload />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">Tidak ada lampiran.</p>
            )}
          </section>

          {/* Komentar */}
          <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <h2 className="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2">
              <FaComment className="w-5 h-5 text-green-500" />
              Komentar ({task.comments?.length || 0})
            </h2>
            {task.comments && task.comments.length > 0 ? (
              <ul className="space-y-4">
                {task.comments.map((comment) => (
                  <li key={comment.id} className="border-b border-gray-200 pb-3 last:border-b-0">
                    <p className="text-sm text-gray-800">
                      <strong>{comment.user?.name || 'Pengguna Tidak Dikenal'}:</strong> {comment.comment}
                    </p>
                    <span className="text-xs text-gray-500">{formatDate(comment.created_at)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">Belum ada komentar.</p>
            )}
            {/* Form Tambah Komentar (opsional) */}
            <div className="mt-4">
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-sm"
                rows="3"
                placeholder="Tambahkan komentar..."
              ></textarea>
              <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600">
                Kirim Komentar
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;