import React from 'react';
import {
  FaUserFriends,
  FaUsers,
  FaBell,
  FaPhone, // Untuk kontak telepon
  FaEnvelope, // Untuk email
  FaBuilding, // Untuk lokasi departemen
  FaUserCircle,
  FaHeadset
} from 'react-icons/fa';

const DirektoriPage = () => {
  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-accent-dark mb-8 flex items-center gap-3">
        <FaUserFriends className="w-8 h-8 text-accent" />
        Direktori & Kontak
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Cari kontak karyawan dan departemen dengan cepat, serta temukan nomor darurat penting.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Card: Direktori Karyawan */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-accent">
          <h2 className="text-xl font-semibold mb-4 text-accent-dark flex items-center gap-2">
            <FaUsers className="w-5 h-5 text-accent" />
            Direktori Karyawan
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>Cari karyawan berdasarkan nama, departemen, atau jabatan.</p>
            <input
              type="text"
              placeholder="Cari karyawan..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
            />
            <ul className="space-y-2 mt-3">
              <li><a href="/informasi/direktori-karyawan/detail/siti" className="flex items-center gap-2 hover:text-accent-dark hover:underline"><FaUserCircle className="text-sm" /> Siti Nurhayati (HRD)</a></li>
              <li><a href="/informasi/direktori-karyawan/detail/budi" className="flex items-center gap-2 hover:text-accent-dark hover:underline"><FaUserCircle className="text-sm" /> Budi Santoso (IT)</a></li>
              {/* Data dinamis di sini */}
            </ul>
            <div className="text-right mt-4">
              <a href="/informasi/direktori-karyawan/semua" className="text-sm text-accent hover:underline">Lihat Semua Karyawan &rarr;</a>
            </div>
          </div>
        </section>

        {/* Card: Kontak Departemen */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-secondary">
          <h2 className="text-xl font-semibold mb-4 text-secondary-dark flex items-center gap-2">
            <FaBuilding className="w-5 h-5 text-secondary" />
            Kontak Departemen
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <h3 className="font-semibold">HRD</h3>
              <p className="text-sm flex items-center gap-1"><FaPhone className="text-xs" /> Ext. 101</p>
              <p className="text-sm flex items-center gap-1"><FaEnvelope className="text-xs" /> hrd@perusahaan.com</p>
            </li>
            <li>
              <h3 className="font-semibold">IT Support</h3>
              <p className="text-sm flex items-center gap-1"><FaPhone className="text-xs" /> Ext. 102</p>
              <p className="text-sm flex items-center gap-1"><FaEnvelope className="text-xs" /> it@perusahaan.com</p>
            </li>
            {/* Data dinamis di sini */}
          </ul>
          <div className="text-right mt-4">
              <a href="/informasi/kontak-departemen/semua" className="text-sm text-secondary hover:underline">Lihat Semua Kontak &rarr;</a>
            </div>
        </section>

        {/* Card: Kontak Darurat & Helpdesk */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
          <h2 className="text-xl font-semibold mb-4 text-red-700 flex items-center gap-2">
            <FaBell className="w-5 h-5 text-red-500" />
            Kontak Darurat & Helpdesk
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <h3 className="font-semibold">Helpdesk IT</h3>
              <p className="text-sm flex items-center gap-1"><FaPhone className="text-xs" /> 102 (Internal)</p>
              <p className="text-sm flex items-center gap-1"><FaHeadset className="text-xs" /> <a href="/management/it/helpdesk" className="hover:underline">Ajukan Tiket Online</a></p>
            </li>
            <li>
              <h3 className="font-semibold">Keamanan Perusahaan</h3>
              <p className="text-sm flex items-center gap-1"><FaPhone className="text-xs" /> 112 (Internal)</p>
              <p className="text-sm flex items-center gap-1"><FaPhone className="text-xs" /> 021-xxxx-xxxx (Eksternal)</p>
            </li>
            {/* Data dinamis di sini */}
          </ul>
        </section>

      </div>
    </div>
  );
};

export default DirektoriPage;