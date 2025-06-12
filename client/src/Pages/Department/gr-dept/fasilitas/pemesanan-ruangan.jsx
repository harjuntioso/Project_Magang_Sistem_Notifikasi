import React, { useState } from 'react';
import {
  FaCalendarAlt,    // Ikon utama untuk kalender/pemesanan
  FaChair,          // Ruangan rapat
  FaPlusCircle,     // Buat pemesanan baru
  FaSearch,         // Cari
  FaFilter,         // Filter
  FaCheckCircle,    // Status tersedia
  FaTimesCircle,    // Status tidak tersedia
  FaInfoCircle,     // Detail ruangan
  FaClock,          // Waktu
} from 'react-icons/fa';

const MeetingRoomBookingPage = () => {
  const [meetingRooms, setMeetingRooms] = useState([
    // Data dummy ruangan rapat
    { id: 'ROOM001', name: 'Ruang Rapat Utama (Lantai 2)', capacity: 20, facilities: ['Proyektor', 'Whiteboard', 'Videoconference'], status: 'Available' },
    { id: 'ROOM002', name: 'Ruang Diskusi (Lantai 1)', capacity: 8, facilities: ['Monitor TV', 'Whiteboard'], status: 'Available' },
    { id: 'ROOM003', name: 'Auditorium (Lantai Dasar)', capacity: 50, facilities: ['Sound System', 'Proyektor Besar'], status: 'Booked' },
    { id: 'ROOM004', name: 'Ruang Kreatif (Lantai 3)', capacity: 12, facilities: ['Smart Board', 'Bean Bags'], status: 'Available' },
    // ... tambahkan data dummy ruangan
  ]);

  const [bookings, setBookings] = useState([
    // Data dummy pemesanan
    { id: 'BOOK001', roomId: 'ROOM003', roomName: 'Auditorium (Lantai Dasar)', date: '2025-06-12', time: '10:00-12:00', bookedBy: 'Marketing Dept.', purpose: 'Workshop Strategi Pemasaran' },
    { id: 'BOOK002', roomId: 'ROOM001', roomName: 'Ruang Rapat Utama (Lantai 2)', date: '2025-06-12', time: '14:00-16:00', bookedBy: 'HRD Dept.', purpose: 'Interview Calon Karyawan' },
    { id: 'BOOK003', roomId: 'ROOM002', roomName: 'Ruang Diskusi (Lantai 1)', date: '2025-06-13', time: '09:00-10:00', bookedBy: 'IT Dept.', purpose: 'Rapat Internal Tim' },
    // ... tambahkan data dummy pemesanan
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10)); // Tanggal hari ini
  const [filterRoomName, setFilterRoomName] = useState('');

  const availableRoomsToday = meetingRooms.filter(room => {
    // Simulasi ketersediaan berdasarkan bookings dummy
    const isBooked = bookings.some(booking =>
      booking.roomId === room.id && booking.date === selectedDate
    );
    return !isBooked && room.name.toLowerCase().includes(filterRoomName.toLowerCase());
  });

  const myBookings = bookings.filter(booking => booking.bookedBy === 'Marketing Dept.' && booking.date >= new Date().toISOString().slice(0, 10)); // Contoh: Filter pemesanan user yang login

  const handleBookRoom = (roomId, roomName) => {
    alert(`Mengarahkan ke form pemesanan untuk ${roomName} pada ${selectedDate}.`);
    // Arahkan ke form pemesanan dengan pre-filled data ruangan dan tanggal
    // Contoh: navigate(`/management/umum/fasilitas/pemesanan-ruangan/buat?roomId=${roomId}&date=${selectedDate}`);
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-700 mb-8 flex items-center gap-3">
        <FaCalendarAlt className="w-8 h-8 text-purple-500" />
        Pemesanan Ruangan Rapat
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Lihat ketersediaan ruangan rapat, pesan untuk kebutuhan Anda, dan pantau jadwal pemesanan.
      </p>

      {/* Filter Ketersediaan Ruangan */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-purple-500">
        <h2 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2">
          <FaSearch className="w-5 h-5 text-purple-500" />
          Cari Ketersediaan Ruangan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label htmlFor="selected-date" className="block text-gray-700 font-medium mb-1">Tanggal</label>
            <input
              type="date"
              id="selected-date"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-room-name" className="block text-gray-700 font-medium mb-1">Nama Ruangan</label>
            <input
              type="text"
              id="filter-room-name"
              placeholder="Cari nama ruangan..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              value={filterRoomName}
              onChange={(e) => setFilterRoomName(e.target.value)}
            />
          </div>
          <a href="/management/umum/fasilitas/pemesanan-ruangan/buat" className="px-6 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors duration-200 flex items-center justify-center gap-2">
            <FaPlusCircle className="w-4 h-4" /> Buat Pemesanan
          </a>
        </div>
      </section>

      {/* Tabel Ketersediaan Ruangan Hari Ini */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaCheckCircle className="w-5 h-5 text-primary" />
          Ruangan Tersedia untuk {new Date(selectedDate).toLocaleDateString('id-ID')} ({availableRoomsToday.length} Ruangan)
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nama Ruangan</th>
                <th className="py-3 px-6 text-left">Kapasitas</th>
                <th className="py-3 px-6 text-left">Fasilitas</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {availableRoomsToday.length > 0 ? (
                availableRoomsToday.map((room) => (
                  <tr key={room.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{room.name}</td>
                    <td className="py-3 px-6 text-left">{room.capacity} orang</td>
                    <td className="py-3 px-6 text-left text-xs">{room.facilities.join(', ')}</td>
                    <td className="py-3 px-6 text-left">
                      <span className="py-1 px-3 rounded-full text-xs font-semibold bg-green-200 text-green-800">
                        Tersedia
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button onClick={() => handleBookRoom(room.id, room.name)} className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-600 transition-colors flex items-center justify-center gap-1 mx-auto">
                        <FaPlusCircle /> Pesan
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">Tidak ada ruangan tersedia untuk tanggal ini atau filter yang diterapkan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tabel Pemesanan Saya */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-accent">
        <h2 className="text-xl font-semibold mb-4 text-accent-dark flex items-center gap-2">
          <FaCalendarAlt className="w-5 h-5 text-accent" />
          Pemesanan Saya & Jadwal Mendatang ({myBookings.length})
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Ruangan</th>
                <th className="py-3 px-6 text-left">Tanggal</th>
                <th className="py-3 px-6 text-left">Waktu</th>
                <th className="py-3 px-6 text-left">Tujuan</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {myBookings.length > 0 ? (
                myBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{booking.roomName}</td>
                    <td className="py-3 px-6 text-left">{booking.date}</td>
                    <td className="py-3 px-6 text-left">{booking.time}</td>
                    <td className="py-3 px-6 text-left text-xs">{booking.purpose}</td>
                    <td className="py-3 px-6 text-center">
                      <button className="text-red-500 hover:text-red-700 text-sm">Batalkan</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">Tidak ada pemesanan ruangan mendatang.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default MeetingRoomBookingPage;