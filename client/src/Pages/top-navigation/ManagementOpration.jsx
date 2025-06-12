import {
  FaBriefcase,
  FaUsers,
  FaChartBar,
  FaCalendarAlt,
  FaBell,
  FaCogs,
  FaWarehouse,
  FaMoneyBillWave,
  FaClipboardList,
  FaHandshake,
  FaTools,
  FaUserCog,
  FaRoad,
  FaHeadset,
  FaBullhorn,
  FaEnvelopeOpenText,
  FaLink    
} from 'react-icons/fa';
import { Link } from "react-router-dom";

const ManagementOperationPage = () => {
  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Manajemen Operasional Departemen</h1>

      {/* Deskripsi Singkat */}
      <p className="text-gray-600 mb-10 text-lg">
        {/*  */}
      </p>

      {/* Grid Menu Departemen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

        {/* Departemen: HRD (Sumber Daya Manusia) */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
          <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
            <FaUsers className="w-5 h-5 text-primary" />
            Human Resources (HRD)
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/management-operation/hr-dept/absen/dashboard-absensi" className="flex items-center gap-2 hover:text-primary-dark hover:underline">
                <FaCalendarAlt className="text-sm" /> Kelola Absensi Karyawan
              </Link>
            </li>
            <li>
              <Link to="/management-operation/hr-dept/cuti-izin/kalender-cuti" className="flex items-center gap-2 hover:text-primary-dark hover:underline">
                <FaClipboardList className="text-sm" /> Persetujuan Cuti & Izin
              </Link>
            </li>
            <li>
              <Link to="/management-operation/hr-dept/data-karyawan/manajemen-rekurtmen" className="flex items-center gap-2 hover:text-primary-dark hover:underline">
                <FaBriefcase className="text-sm" /> Manajemen Rekrutmen
              </Link>
            </li>
            <li>
              <Link to="/management-operation/hr-dept/data-karyawan/daftar-karywan" className="flex items-center gap-2 hover:text-primary-dark hover:underline">
                <FaUserCog className="text-sm" /> Database & Profil Karyawan
              </Link>
            </li>
            <li>
              <Link to="/management-operation/hr-dept/penggajian/gaji-bulanan" className="flex items-center gap-2 hover:text-primary-dark hover:underline">
                <FaMoneyBillWave className="text-sm" /> Pengelolaan Penggajian
              </Link>
            </li>
          </ul>
          <div className="text-right mt-4">
            <Link to="/department/hr-dept" className="text-sm text-primary hover:underline">
              Lihat Semua Fitur HRD &rarr;
            </Link>
          </div>
        </section>
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-accent">
          <h2 className="text-xl font-semibold mb-4 text-accent-dark flex items-center gap-2">
            <FaCogs className="w-5 h-5 text-accent" />
            Operasional Lapangan
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/department/op-dept" className="flex items-center gap-2 hover:text-accent-dark hover:underline">
                <FaCalendarAlt className="text-sm" /> Penjadwalan Shift Petugas
              </Link>
            </li>
            <li>
              <Link to="/department/op-dept" className="flex items-center gap-2 hover:text-accent-dark hover:underline">
                <FaWarehouse className="text-sm" /> Inventaris & Stok Atraksi
              </Link>
            </li>
            <li>
              <Link to="/department/op-dept" className="flex items-center gap-2 hover:text-accent-dark hover:underline">
                <FaTools className="text-sm" /> Laporan & Jadwal Pemeliharaan
              </Link>
            </li>
            <li>
              <Link to="/department/op-dept" className="flex items-center gap-2 hover:text-accent-dark hover:underline">
                <FaBell className="text-sm" /> Penanganan Laporan Insiden
              </Link>
            </li>
            <li>
              <Link to="/department/op-dept" className="flex items-center gap-2 hover:text-accent-dark hover:underline">
                <FaRoad className="text-sm" /> Manajemen Transportasi Internal
              </Link>
            </li>
          </ul>
          <div className="text-right mt-4">
            <Link to="/department/op-dept" className="text-sm text-accent hover:underline">
              Lihat Semua Fitur Operasional &rarr;
            </Link>
          </div>
        </section>

        {/* Departemen: Keuangan */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-secondary">
          <h2 className="text-xl font-semibold mb-4 text-secondary-dark flex items-center gap-2">
            <FaMoneyBillWave className="w-5 h-5 text-secondary" />
            Keuangan
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/department/fn-dept" className="flex items-center gap-2 hover:text-secondary-dark hover:underline">
                <FaClipboardList className="text-sm" /> Persetujuan Pengajuan Biaya
              </Link>
            </li>
            <li>
              <Link to="/department/fn-dept" className="flex items-center gap-2 hover:text-secondary-dark hover:underline">
                <FaChartBar className="text-sm" /> Laporan Keuangan & Anggaran
              </Link>
            </li>
            <li>
              <Link to="/department/fn-dept" className="flex items-center gap-2 hover:text-secondary-dark hover:underline">
                <FaHandshake className="text-sm" /> Manajemen Vendor & Pembayaran
              </Link>
            </li>
          </ul>
          <div className="text-right mt-4">
            <Link to="/department/fn-dept" className="text-sm text-secondary hover:underline">
              Lihat Semua Fitur Keuangan &rarr;
            </Link>
          </div>
        </section>

        {/* Departemen: IT & Sistem */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-info">
          <h2 className="text-xl font-semibold mb-4 text-info-dark flex items-center gap-2">
            <FaHeadset className="w-5 h-5 text-info" />
            IT & Sistem
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/department/it-dept" className="flex items-center gap-2 hover:text-info-dark hover:underline">
                <FaBell className="text-sm" /> Tiket Helpdesk & Dukungan
              </Link>
            </li>
            <li>
              <Link to="/department/it-dept" className="flex items-center gap-2 hover:text-info-dark hover:underline">
                <FaWarehouse className="text-sm" /> Inventaris Aset IT
              </Link>
            </li>
            <li>
              <Link to="/department/it-dept" className="flex items-center gap-2 hover:text-info-dark hover:underline">
                <FaUserCog className="text-sm" /> Manajemen Akun Pengguna
              </Link>
            </li>
          </ul>
          <div className="text-right mt-4">
            <Link to="/department/it-dept" className="text-sm text-info hover:underline">
              Lihat Semua Fitur IT &rarr;
            </Link>
          </div>
        </section>

        {/* Departemen: Pemasaran & Komunikasi */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
          <h2 className="text-xl font-semibold mb-4 text-red-700 flex items-center gap-2">
            <FaBullhorn className="w-5 h-5 text-red-500" />
            Pemasaran & Komunikasi
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/department/mr-dept" className="flex items-center gap-2 hover:text-red-700 hover:underline">
                <FaChartBar className="text-sm" /> Dashboard Kampanye Pemasaran
              </Link>
            </li>
            <li>
              <Link to="/department/mr-dept" className="flex items-center gap-2 hover:text-red-700 hover:underline">
                <FaEnvelopeOpenText className="text-sm" /> Akses Materi Promosi
              </Link>
            </li>
            <li>
              <Link to="/department/mr-dept" className="flex items-center gap-2 hover:text-red-700 hover:underline">
                <FaLink className="text-sm" /> Media & Kolaborasi Eksternal
              </Link>
            </li>
          </ul>
          <div className="text-right mt-4">
            <Link to="/department/mr-dept" className="text-sm text-red-500 hover:underline">
              Lihat Semua Fitur Pemasaran &rarr;
            </Link>
          </div>
        </section>

        {/* Departemen: Lainnya / Umum (Opsional) */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-400">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
            <FaBriefcase className="w-5 h-5 text-gray-500" />
            Umum & Administrasi
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="/department/gr-dept" className="flex items-center gap-2 hover:text-gray-700 hover:underline">
                <FaClipboardList className="text-sm" /> Manajemen Proyek Lintas Departemen
              </Link>
            </li>
            <li>
              <Link to="/department/gr-dept" className="flex items-center gap-2 hover:text-gray-700 hover:underline">
                <FaTools className="text-sm" /> Pemesanan & Pengelolaan Fasilitas
              </Link>
            </li>
            <li>
              <Link to="/department/gr-dept" className="flex items-center gap-2 hover:text-gray-700 hover:underline">
                <FaWarehouse className="text-sm" /> Inventaris Aset Perusahaan
              </Link>
            </li>
          </ul>
          <div className="text-right mt-4">
            <Link to="/department/gr-dept" className="text-sm text-gray-500 hover:underline">
              Lihat Semua Fitur Umum &rarr;
            </Link>
          </div>
     </section> 
      </div>
    </div> 
  );
};

export default ManagementOperationPage;