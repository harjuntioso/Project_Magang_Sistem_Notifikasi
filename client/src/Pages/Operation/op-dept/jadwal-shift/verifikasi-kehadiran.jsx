import React, { useState } from 'react';
import {
  FaUserCheck,      // Ikon utama
  FaCalendarAlt,    // Pilih tanggal
  FaSearch,         // Filter
  FaCheckCircle,    // Hadir
  FaUserTimes,      // Tidak Hadir
  FaClock,          // Jam
  FaMapMarkerAlt,   // Area
  FaClipboardList
} from 'react-icons/fa';

const VerifyShiftAttendancePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10)); // Tanggal hari ini
  const [shiftsForDate, setShiftsForDate] = useState([
    // Data dummy shift untuk tanggal terpilih
    { id: 'SFT001', area: 'Wahana Utama', time: '08:00 - 16:00', assignedStaff: [
      { id: 'STAFF001', name: 'Andi Nugroho', status: 'Hadir' },
      { id: 'STAFF003', name: 'Citra Dewi', status: 'Tidak Hadir' }, // Contoh tidak hadir
    ]},
    { id: 'SFT002', area: 'Loket Tiket', time: '09:00 - 17:00', assignedStaff: [
      { id: 'STAFF002', name: 'Budi Santoso', status: 'Hadir' },
    ]},
    // ... tambahkan data dummy shift lainnya
  ]);

  const handleStatusChange = (shiftId, staffId, status) => {
    const newShifts = shiftsForDate.map(shift => {
      if (shift.id === shiftId) {
        return {
          ...shift,
          assignedStaff: shift.assignedStaff.map(staff =>
            staff.id === staffId ? { ...staff, status: status } : staff
          )
        };
      }
      return shift;
    });
    setShiftsForDate(newShifts);
    // Logika untuk menyimpan status kehadiran ke backend
  };

  const handleLoadShifts = () => {
    alert(`Memuat shift untuk tanggal: ${selectedDate}`);
    // Di sini Anda akan memanggil API untuk memuat data shift berdasarkan tanggal
    // dan memperbarui state `setShiftsForDate`
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-8 flex items-center gap-3">
        <FaUserCheck className="w-8 h-8 text-green-500" />
        Verifikasi Kehadiran Shift
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Verifikasi kehadiran petugas dan staf lapangan untuk setiap shift kerja yang terjadwal.
      </p>

      {/* Filter Tanggal */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-green-500">
        <h2 className="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2">
          <FaCalendarAlt className="w-5 h-5 text-green-500" />
          Pilih Tanggal Verifikasi
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div>
            <label htmlFor="selected-date" className="block text-gray-700 font-medium mb-1">Tanggal Shift</label>
            <input
              type="date"
              id="selected-date"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <button onClick={handleLoadShifts} className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center justify-center gap-2">
            <FaSearch className="w-4 h-4" /> Muat Shift
          </button>
        </div>
      </section>

      {/* Daftar Shift untuk Tanggal Terpilih */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaClipboardList className="w-5 h-5 text-primary" />
          Shift untuk {new Date(selectedDate).toLocaleDateString('id-ID')} ({shiftsForDate.length} Shift)
        </h2>

        {shiftsForDate.length > 0 ? (
          <div className="space-y-6">
            {shiftsForDate.map(shift => (
              <div key={shift.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-md" /> {shift.area}
                  </h3>
                  <span className="text-sm font-medium text-gray-600 flex items-center gap-1">
                    <FaClock className="text-sm" /> {shift.time}
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead>
                      <tr className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
                        <th className="py-2 px-4 text-left">Petugas</th>
                        <th className="py-2 px-4 text-left">Status Kehadiran</th>
                        <th className="py-2 px-4 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm font-light">
                      {shift.assignedStaff.map(staff => (
                        <tr key={staff.id} className="border-b border-gray-200 hover:bg-gray-100">
                          <td className="py-2 px-4 whitespace-nowrap">{staff.name}</td>
                          <td className="py-2 px-4">
                            <span className={`py-1 px-3 rounded-full text-xs font-semibold ${
                              staff.status === 'Hadir' ? 'bg-green-200 text-green-800' :
                              staff.status === 'Tidak Hadir' ? 'bg-red-200 text-red-800' :
                              'bg-orange-200 text-orange-800'
                            }`}>
                              {staff.status}
                            </span>
                          </td>
                          <td className="py-2 px-4 text-center">
                            <div className="flex justify-center gap-2">
                              <button onClick={() => handleStatusChange(shift.id, staff.id, 'Hadir')} className="text-green-500 hover:text-green-700 text-lg" title="Tandai Hadir">
                                <FaCheckCircle />
                              </button>
                              <button onClick={() => handleStatusChange(shift.id, staff.id, 'Tidak Hadir')} className="text-red-500 hover:text-red-700 text-lg" title="Tandai Tidak Hadir">
                                <FaUserTimes />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">Tidak ada shift terjadwal untuk tanggal ini.</p>
        )}
      </section>
    </div>
  );
};

export default VerifyShiftAttendancePage;