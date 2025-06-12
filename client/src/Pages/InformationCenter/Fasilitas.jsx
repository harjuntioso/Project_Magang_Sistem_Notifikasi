import React from 'react';
import {
  FaMapMarkerAlt,
  FaMap,
  FaBus,
  FaBuilding, // Gedung
  FaRestroom, // Fasilitas umum
  FaWifi, // Konektivitas
  FaRoad, 
  FaCar,
  FaCoffee
} from 'react-icons/fa';

const FasilitasPage = () => {
  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-700 mb-8 flex items-center gap-3">
        <FaMapMarkerAlt className="w-8 h-8 text-purple-500" />
        Fasilitas & Lokasi
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Informasi lengkap mengenai lokasi kantor, denah area, dan fasilitas yang tersedia untuk karyawan.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Card: Denah Kantor & Area Hiburan */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <h2 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2">
            <FaMap className="w-5 h-5 text-purple-500" />
            Denah Kantor & Area Hiburan
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li><a href="/informasi/denah-kantor/lantai-1" className="flex items-center gap-2 hover:text-purple-700 hover:underline"><FaBuilding className="text-sm" /> Denah Lantai 1 (Lobi & Umum)</a></li>
            <li><a href="/informasi/denah-kantor/lantai-2" className="flex items-center gap-2 hover:text-purple-700 hover:underline"><FaBuilding className="text-sm" /> Denah Lantai 2 (Area Kerja Departemen)</a></li>
            <li><a href="/informasi/denah-kantor/area-tamsya" className="flex items-center gap-2 hover:text-purple-700 hover:underline"><FaMapMarkerAlt className="text-sm" /> Denah Area Tamsya</a></li>
            {/* Tambahkan link ke gambar denah atau PDF */}
          </ul>
        </section>

        {/* Card: Akses & Transportasi */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
            <FaBus className="w-5 h-5 text-blue-500" />
            Akses & Transportasi
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li><a href="/informasi/akses-transportasi/panduan" className="flex items-center gap-2 hover:text-blue-700 hover:underline"><FaRoad className="text-sm" /> Panduan Rute Menuju Kantor</a></li>
            <li><a href="/informasi/akses-transportasi/parkir" className="flex items-center gap-2 hover:text-blue-700 hover:underline"><FaCar className="text-sm" /> Informasi Area Parkir Karyawan</a></li>
            <li><a href="/informasi/akses-transportasi/shuttle" className="flex items-center gap-2 hover:text-blue-700 hover:underline"><FaBus className="text-sm" /> Jadwal Shuttle Bus Perusahaan</a></li>
          </ul>
        </section>

        {/* Card: Fasilitas Umum Karyawan */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <h2 className="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2">
            <FaBuilding className="w-5 h-5 text-green-500" />
            Fasilitas Umum Karyawan
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li><a href="/informasi/fasilitas/kantin" className="flex items-center gap-2 hover:text-green-700 hover:underline"><FaCoffee className="text-sm" /> Kantin & Area Makan</a></li>
            <li><a href="/informasi/fasilitas/ruang-istirahat" className="flex items-center gap-2 hover:text-green-700 hover:underline"><FaRestroom className="text-sm" /> Ruang Istirahat & Mushola</a></li>
            <li><a href="/informasi/fasilitas/wifi" className="flex items-center gap-2 hover:text-green-700 hover:underline"><FaWifi className="text-sm" /> Akses Wi-Fi Karyawan</a></li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default FasilitasPage;