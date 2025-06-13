import React, { useState } from 'react';
import {
  FaCalendarAlt,    // Ikon utama
  FaPlusCircle,     // Buat baru
  FaEdit,           // Edit
  FaSave,           // Simpan
  FaTimes,          // Batal
  FaUsers,          // Petugas
  FaClock,          // Waktu
  FaMapMarkerAlt,   // Lokasi/Area
  FaInfoCircle
} from 'react-icons/fa';

const CreateEditShiftSchedulePage = () => {
  const [scheduleData, setScheduleData] = useState({
    scheduleName: '',
    startDate: '',
    endDate: '',
    shifts: [
      { id: 1, day: 'Senin', area: '', time: '', assignedTo: [] },
      { id: 2, day: 'Selasa', area: '', time: '', assignedTo: [] },
      // ... Anda bisa mengisi lebih banyak baris default atau menambahkannya dinamis
    ],
  });
  const [availableStaff, setAvailableStaff] = useState([
    // Data dummy staf yang tersedia untuk ditugaskan
    { id: 'STAFF001', name: 'Andi Nugroho', role: 'Petugas Wahana' },
    { id: 'STAFF002', name: 'Budi Santoso', role: 'Petugas Loket' },
    { id: 'STAFF003', name: 'Citra Dewi', role: 'Petugas Kebersihan' },
    { id: 'STAFF004', name: 'Dedi Kurniawan', role: 'Petugas Keamanan' },
  ]);
  const [areas, setAreas] = useState(['Wahana Utama', 'Area Anak', 'Loket Tiket', 'Pintu Masuk/Keluar', 'Food Court']);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setScheduleData(prev => ({ ...prev, [id]: value }));
  };

  const handleShiftChange = (index, field, value) => {
    const newShifts = scheduleData.shifts.map((shift, i) =>
      i === index ? { ...shift, [field]: value } : shift
    );
    setScheduleData(prev => ({ ...prev, shifts: newShifts }));
  };

  const handleAddShiftRow = () => {
    setScheduleData(prev => ({
      ...prev,
      shifts: [...prev.shifts, { id: prev.shifts.length + 1, day: '', area: '', time: '', assignedTo: [] }]
    }));
  };

  const handleRemoveShiftRow = (index) => {
    const newShifts = scheduleData.shifts.filter((_, i) => i !== index);
    setScheduleData(prev => ({ ...prev, shifts: newShifts }));
  };

  const handleAssignStaff = (shiftIndex, staffId) => {
    const newShifts = scheduleData.shifts.map((shift, i) => {
      if (i === shiftIndex) {
        const assignedIndex = shift.assignedTo.indexOf(staffId);
        if (assignedIndex > -1) {
          // Hapus jika sudah ada (toggle off)
          return { ...shift, assignedTo: shift.assignedTo.filter(id => id !== staffId) };
        } else {
          // Tambah jika belum ada (toggle on)
          return { ...shift, assignedTo: [...shift.assignedTo, staffId] };
        }
      }
      return shift;
    });
    setScheduleData(prev => ({ ...prev, shifts: newShifts }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Jadwal shift berhasil disimpan!');
    console.log('Jadwal Shift Disimpan:', scheduleData);
    // Logika untuk mengirim data ke backend
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-accent-dark mb-8 flex items-center gap-3">
        <FaCalendarAlt className="w-8 h-8 text-accent" />
        Buat & Atur Jadwal Shift
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Rencanakan dan atur jadwal shift kerja untuk petugas lapangan dan staf departemen operasional.
      </p>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-accent">
        <h2 className="text-xl font-semibold mb-4 text-accent-dark flex items-center gap-2">
          <FaInfoCircle className="w-5 h-5 text-accent" />
          Detail Jadwal
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="scheduleName" className="block text-gray-700 font-medium mb-1">Nama Jadwal <span className="text-red-500">*</span></label>
            <input type="text" id="scheduleName" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent" value={scheduleData.scheduleName} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="startDate" className="block text-gray-700 font-medium mb-1">Tanggal Mulai <span className="text-red-500">*</span></label>
            <input type="date" id="startDate" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent" value={scheduleData.startDate} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-gray-700 font-medium mb-1">Tanggal Selesai <span className="text-red-500">*</span></label>
            <input type="date" id="endDate" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent" value={scheduleData.endDate} onChange={handleChange} required />
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2 border-t pt-6 mt-6">
          <FaClock className="w-5 h-5 text-primary" />
          Detail Shift
        </h2>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Hari</th>
                <th className="py-3 px-6 text-left">Area Penugasan</th>
                <th className="py-3 px-6 text-left">Waktu Shift</th>
                <th className="py-3 px-6 text-left">Petugas Ditugaskan</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {scheduleData.shifts.map((shift, index) => (
                <tr key={shift.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6">
                    <select value={shift.day} onChange={(e) => handleShiftChange(index, 'day', e.target.value)} className="p-1 border rounded w-24">
                      <option value="">Pilih Hari</option>
                      {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-6">
                    <select value={shift.area} onChange={(e) => handleShiftChange(index, 'area', e.target.value)} className="p-1 border rounded w-36">
                      <option value="">Pilih Area</option>
                      {areas.map(area => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-6">
                    <input type="text" value={shift.time} onChange={(e) => handleShiftChange(index, 'time', e.target.value)} placeholder="08:00 - 16:00" className="p-1 border rounded w-32" />
                  </td>
                  <td className="py-3 px-6">
                    <div className="flex flex-wrap gap-1">
                      {availableStaff.map(staff => (
                        <label key={staff.id} className="inline-flex items-center text-xs">
                          <input
                            type="checkbox"
                            className="form-checkbox text-blue-600 rounded"
                            checked={shift.assignedTo.includes(staff.id)}
                            onChange={() => handleAssignStaff(index, staff.id)}
                          />
                          <span className="ml-1">{staff.name.split(' ')[0]}</span> {/* Hanya nama depan */}
                        </label>
                      ))}
                    </div>
                    {shift.assignedTo.length > 0 && (
                      <p className="text-gray-500 text-xs mt-1">
                        Terpilih: {shift.assignedTo.map(id => availableStaff.find(s => s.id === id)?.name.split(' ')[0]).join(', ')}
                      </p>
                    )}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button type="button" onClick={() => handleRemoveShiftRow(index)} className="text-red-500 hover:text-red-700 text-lg" title="Hapus Shift">
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="button" onClick={handleAddShiftRow} className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2">
          <FaPlusCircle className="w-4 h-4" /> Tambah Baris Shift
        </button>

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-4 mt-8">
          <button type="button" onClick={() => alert('Batal mengatur jadwal shift.')} className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-200 flex items-center gap-2">
            <FaTimes className="w-4 h-4" /> Batal
          </button>
          <button type="submit" className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center gap-2">
            <FaSave className="w-4 h-4" /> Simpan Jadwal
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditShiftSchedulePage;