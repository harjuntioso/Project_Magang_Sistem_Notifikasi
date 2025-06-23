import React, { useState, useEffect } from 'react';
import {
  FaPaperPlane, 
  FaSave, 
  FaTimes, 
  FaInfoCircle, 
  FaTag,
  FaCalendarAlt, 
  FaPaperclip, 
  FaUser, 
  FaBuilding,
  FaSpinner, 
  FaCheckCircle, 
  FaExclamationCircle,
} from 'react-icons/fa';
import { useAuth } from '../../../Context/AuthContext';
import axiosClient from '../../../axiosClient';
import Swal from 'sweetalert2';

const SubmitNewTaskPage = () => {
  const { user } = useAuth();
  const [loadingSubmission, setLoadingSubmission] = useState(false);
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [allDepartments, setAllDepartments] = useState([]);
  const [allTaskCategories, setAllTaskCategories] = useState([]);
  const [filteredTaskCategories, setFilteredTaskCategories] = useState([]);

  // Definisi initial form data untuk reset
  const initialFormData = {
    taskTitle: '',
    taskCategory: '', 
    description: '',
    purpose: '',
    departmentTo: '', 
    deadline: '',
    priority: 'Normal',
    attachments: [],
    notes: '',
    requesterName: '', 
    requesterDepartment: '', 

    requester_id: null,
    requested_by_department_id: null, 
    assigned_to_department_id: null,  
    task_category_id: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});

  // Effect untuk mengisi data requester saat user tersedia
  useEffect(() => {
    if (user) {
      setFormData(prevFormData => ({
        ...prevFormData,
        requesterName: user.name || '',
        requesterDepartment: user.department?.name || 'N/A',
        requester_id: user.id,
        requested_by_department_id: user.department?.id || null, // ID departemen user

      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        requesterName: '',
        requesterDepartment: '',
        requester_id: null,
        requested_by_department_id: null,
      }));
    }
  }, [user]);

  // Effect untuk memuat departemen dan kategori dari backend
  useEffect(() => {
    const fetchMasterData = async () => {
      setLoadingDepartments(true);
      setLoadingCategories(true);
      try {
        const departmentsResponse = await axiosClient.get('/departments');
        setAllDepartments(departmentsResponse.data);
        setLoadingDepartments(false);

        const categoriesResponse = await axiosClient.get('/task-categories');
        setAllTaskCategories(categoriesResponse.data);
        setLoadingCategories(false);
      } catch (error) {
        console.error("Gagal memuat master data:", error.response || error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Gagal memuat daftar departemen atau kategori tugas.',
        });
        setLoadingDepartments(false);
        setLoadingCategories(false);
      }
    };
    fetchMasterData();
  }, []);

  // Effect untuk memfilter kategori berdasarkan departemen tujuan yang dipilih
  useEffect(() => {
    if (formData.departmentTo) {
      const selectedDept = allDepartments.find(
        dep => dep.name === formData.departmentTo
      );
      if (selectedDept) {
        const categoriesForDept = allTaskCategories.filter(
          cat => cat.department_id === selectedDept.id || cat.department_id === null
        );
        setFilteredTaskCategories(categoriesForDept);

        // Update assigned_to_department_id saat departemen tujuan dipilih
        setFormData(prev => ({
          ...prev,
          assigned_to_department_id: selectedDept.id,
          task_category_id: null, // Reset kategori ID
          taskCategory: '', // Reset nama kategori
        }));
      }
    } else {
      setFilteredTaskCategories([]);
      setFormData(prev => ({
        ...prev,
        assigned_to_department_id: null,
        task_category_id: null,
        taskCategory: '',
      }));
    }
  }, [formData.departmentTo, allDepartments, allTaskCategories]);

  // Effect untuk mengupdate task_category_id saat kategori dipilih
  useEffect(() => {
    if (formData.taskCategory) {
      const selectedCategory = allTaskCategories.find(
        cat => cat.name === formData.taskCategory
      );
      if (selectedCategory) {
        setFormData(prev => ({
          ...prev,
          task_category_id: selectedCategory.id,
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        task_category_id: null,
      }));
    }
  }, [formData.taskCategory, allTaskCategories]);

  const validateForm = () => {
    const errors = {};
    if (!formData.taskTitle) errors.taskTitle = 'Judul tugas wajib diisi.';
    if (!formData.departmentTo) errors.departmentTo = 'Departemen tujuan wajib diisi.';
    if (!formData.taskCategory) errors.taskCategory = 'Kategori tugas wajib diisi.';
    if (!formData.description) errors.description = 'Deskripsi tugas wajib diisi.';
    if (!formData.deadline) errors.deadline = 'Batas waktu selesai wajib diisi.';

    // Validasi ID yang akan dikirim ke backend
    if (!formData.requester_id) errors.requester_id = 'ID Pemohon tidak ditemukan. Silakan refresh atau login ulang.';
    if (!formData.requested_by_department_id) errors.requested_by_department_id = 'ID Departemen Pemohon tidak ditemukan.';
    if (!formData.assigned_to_department_id) errors.assigned_to_department_id = 'ID Departemen Tujuan tidak valid.';
    if (!formData.task_category_id) errors.task_category_id = 'ID Kategori Tugas tidak valid.';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (formErrors[id]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, attachments: Array.from(e.target.files) }));
    if (formErrors.attachments) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.attachments;
        return newErrors;
      });
    }
  };

  const handleResetForm = () => {
    setFormData(initialFormData); // Reset ke initial state
    setFormErrors({}); // Hapus error
    setLoadingSubmission(false); // Pastikan loading mati
    // Swal.close() jika ada modal Swal yang terbuka dari proses sebelumnya
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      Swal.fire({
        icon: 'error',
        title: 'Validasi Gagal!',
        text: 'Mohon lengkapi semua field yang wajib diisi dan perbaiki kesalahan.',
        confirmButtonText: 'Oke',
      });
      return;
    }

    setLoadingSubmission(true);
    Swal.fire({
      title: 'Mengajukan Tugas...',
      html: 'Mohon tunggu, proses pengiriman data dan lampiran.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const payload = new FormData();
    payload.append('title', formData.taskTitle);
    payload.append('description', formData.description);
    payload.append('purpose', formData.purpose);
    payload.append('task_category_id', formData.task_category_id);
    payload.append('requester_id', formData.requester_id);
    payload.append('requested_by_department_id', formData.requested_by_department_id); // <<< Sesuai DB
    payload.append('assigned_to_department_id', formData.assigned_to_department_id);   // <<< Sesuai DB
    payload.append('priority', formData.priority);
    payload.append('deadline', formData.deadline);
    payload.append('notes', formData.notes);

    formData.attachments.forEach((file, index) => {
      payload.append(`attachments[${index}]`, file);
    });

    try {
      const response = await axiosClient.post('/tasks', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'Pengajuan Berhasil!',
        text: 'Tugas telah berhasil diajukan dan menunggu persetujuan atasan Anda.',
      });
      handleResetForm(); // Reset form setelah sukses
    } catch (error) {
      console.error("Gagal mengajukan tugas:", error.response || error);
      let errorMessage = 'Terjadi kesalahan saat mengajukan tugas. Silakan coba lagi.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.errors) {
        const validationErrors = Object.values(error.response.data.errors).flat().join('\n');
        errorMessage = `Validasi Gagal:\n${validationErrors}`;
        // Jika ingin menampilkan error per field, bisa setFormErrors(error.response.data.errors) di sini
      }

      Swal.fire({
        icon: 'error',
        title: 'Pengajuan Gagal!',
        text: errorMessage,
      });
    } finally {
      setLoadingSubmission(false);
    }
  };

  // Menggunakan allDepartments, bukan hardcoded departments
  const selectedDepartmentCategories = allDepartments.find(
    dep => dep.name === formData.departmentTo
  )?.categories || [];

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-8 flex items-center gap-3">
        <FaPaperPlane className="w-8 h-8 text-green-500" />
        Ajukan Tugas / Permintaan Baru
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Gunakan formulir ini untuk mengajukan tugas atau permintaan ke departemen lain.
      </p>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
        <h2 className="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2">
          <FaInfoCircle className="w-5 h-5 text-green-500" />
          Detail Pengajuan Tugas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="requesterName" className="block text-gray-700 font-medium mb-1">Nama Pemohon</label>
            <input type="text" id="requesterName" className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" value={formData.requesterName} readOnly />
          </div>
          <div>
            <label htmlFor="requesterDepartment" className="block text-gray-700 font-medium mb-1">Departemen Pemohon</label>
            <input type="text" id="requesterDepartment" className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" value={formData.requesterDepartment} readOnly />
          </div>
          <div>
            <label htmlFor="taskTitle" className="block text-gray-700 font-medium mb-1">Judul Tugas / Permintaan <span className="text-red-500">*</span></label>
            <input type="text" id="taskTitle" className={`w-full p-3 border rounded-lg focus:ring-green-500 focus:border-green-500 ${formErrors.taskTitle ? 'border-red-500' : 'border-gray-300'}`} value={formData.taskTitle} onChange={handleChange} required />
            {formErrors.taskTitle && <p className="text-red-500 text-xs italic mt-1">{formErrors.taskTitle}</p>}
          </div>
          <div>
            <label htmlFor="departmentTo" className="block text-gray-700 font-medium mb-1">Tujuan Departemen <span className="text-red-500">*</span></label>
            <select
              id="departmentTo"
              className={`w-full p-3 border rounded-lg focus:ring-green-500 focus:border-green-500 ${formErrors.departmentTo ? 'border-red-500' : 'border-gray-300'}`}
              value={formData.departmentTo}
              onChange={handleChange}
              required
              disabled={loadingDepartments}
            >
              <option value="">{loadingDepartments ? 'Memuat Departemen...' : 'Pilih Departemen'}</option>
              {!loadingDepartments && allDepartments.map(dep => (
                <option key={dep.id} value={dep.name}>{dep.name}</option>
              ))}
            </select>
            {formErrors.departmentTo && <p className="text-red-500 text-xs italic mt-1">{formErrors.departmentTo}</p>}
          </div>
          {formData.departmentTo && (
            <div>
              <label htmlFor="taskCategory" className="block text-gray-700 font-medium mb-1">Kategori Tugas <span className="text-red-500">*</span></label>
              <select
                id="taskCategory"
                className={`w-full p-3 border rounded-lg focus:ring-green-500 focus:border-green-500 ${formErrors.taskCategory ? 'border-red-500' : 'border-gray-300'}`}
                value={formData.taskCategory}
                onChange={handleChange}
                required
                disabled={loadingCategories || filteredTaskCategories.length === 0}
              >
                <option value="">{loadingCategories ? 'Memuat Kategori...' : 'Pilih Kategori'}</option>
                {!loadingCategories && filteredTaskCategories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              {formErrors.taskCategory && <p className="text-red-500 text-xs italic mt-1">{formErrors.taskCategory}</p>}
            </div>
          )}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-1">Deskripsi Lengkap Tugas <span className="text-red-500">*</span></label>
            <textarea id="description" rows="4" className={`w-full p-3 border rounded-lg focus:ring-green-500 focus:border-green-500 ${formErrors.description ? 'border-red-500' : 'border-gray-300'}`} value={formData.description} onChange={handleChange} required></textarea>
            {formErrors.description && <p className="text-red-500 text-xs italic mt-1">{formErrors.description}</p>}
            <p className="text-gray-500 text-sm mt-1">Jelaskan tugas secara rinci, termasuk output yang diharapkan.</p>
          </div>
          <div>
            <label htmlFor="purpose" className="block text-gray-700 font-medium mb-1">Tujuan Pengajuan Tugas</label>
            <input type="text" id="purpose" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" value={formData.purpose} onChange={handleChange} />
            <p className="text-gray-500 text-sm mt-1">Mengapa tugas ini perlu dilakukan?</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2 border-t pt-6 mt-6">
          <FaCalendarAlt className="w-5 h-5 text-purple-500" />
          Prioritas & Jadwal
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="deadline" className="block text-gray-700 font-medium mb-1">Batas Waktu Selesai (Target) <span className="text-red-500">*</span></label>
            <input type="date" id="deadline" className={`w-full p-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500 ${formErrors.deadline ? 'border-red-500' : 'border-gray-300'}`} value={formData.deadline} onChange={handleChange} required />
            {formErrors.deadline && <p className="text-red-500 text-xs italic mt-1">{formErrors.deadline}</p>}
          </div>
          <div>
            <label htmlFor="priority" className="block text-gray-700 font-medium mb-1">Prioritas</label>
            <select id="priority" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" value={formData.priority} onChange={handleChange}>
              <option value="Normal">Normal</option>
              <option value="Medium">Medium</option>
              <option value="High">Tinggi</option>
              <option value="Urgent">Sangat Mendesak</option>
            </select>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2 border-t pt-6 mt-6">
          <FaPaperclip className="w-5 h-5 text-blue-500" />
          Lampiran & Catatan Tambahan
        </h2>
        <div className="mb-6">
          <label htmlFor="attachments" className="block text-gray-700 font-medium mb-1">Lampiran (File Referensi/Contoh)</label>
          <input type="file" id="attachments" multiple className={`w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${formErrors.attachments ? 'border-red-500' : 'border-gray-300'}`} onChange={handleFileChange} />
          {formErrors.attachments && <p className="text-red-500 text-xs italic mt-1">{formErrors.attachments}</p>}
          <p className="text-gray-500 text-sm mt-1">Unggah file seperti brief, data, atau referensi.</p>
          {formData.attachments.length > 0 && (
            <div className="mt-2 text-gray-600 text-sm">
              File terlampir: {formData.attachments.map(file => file.name).join(', ')}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="notes" className="block text-gray-700 font-medium mb-1">Catatan Tambahan (Opsional)</label>
          <textarea id="notes" rows="3" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value={formData.notes} onChange={handleChange}></textarea>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-4 mt-8">
          <button type="button" onClick={handleResetForm} className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-200 flex items-center gap-2" disabled={loadingSubmission}>
            <FaTimes className="w-4 h-4" /> Batal
          </button>
          <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2" disabled={loadingSubmission}>
            {loadingSubmission ? (
              <>
                <FaSpinner className="animate-spin h-4 w-4" /> Mengajukan...
              </>
            ) : (
              <>
                <FaSave className="w-4 h-4" /> Ajukan Tugas
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitNewTaskPage;