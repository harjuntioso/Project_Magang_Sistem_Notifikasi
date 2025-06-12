import React from 'react';
import { Route, Routes } from 'react-router-dom'; // No need to import BrowserRouter here
import Layout from './Components/Layout/Layout';
import Dashboard from './Pages/top-navigation/Dashboard';
import Messages from './Pages/Messages';
import SendMassage from './Pages/SendMassage';
import Contacts from './Pages/Contact';
import Login from './Pages/login-signup/Login';
import AddUser from './Pages/AddUser';
import CompanyUpdate from './Pages/top-navigation/CompanyUpdate';
import ManagementOperationPage from './Pages/top-navigation/ManagementOpration';
import ItManagementPage from './Pages/Department/it-dept/it-main';
import MarketingManagementPage from './Pages/Department/mr-dept/mr-main';
import GeneralManagementPage from './Pages/Department/gr-dept/gr-main';
import HrdManagementPage from './Pages/Department/hr-dept/hr-main';
import OpsManagementPage from './Pages/Department/op-dept/op-main';
import FinanceManagementPage from './Pages/Department/fn-dept/fn-main';
import SettingsPage from './Pages/top-navigation/Settings';
import FormulirPage from './Pages/InformationCenter/Formulir';
import ArsipPage from './Pages/InformationCenter/Arsip';
import FasilitasPage from './Pages/InformationCenter/Fasilitas';
import PanduanPage from './Pages/InformationCenter/Panduan';
import DirektoriPage from './Pages/InformationCenter/Direktori';
import KebijakanPage from './Pages/InformationCenter/Kebijakan';
import AbsensiDashboardPage from './Pages/Department/hr-dept/absensi/DashboardAbsensi';
import AbsensiReportPage from './Pages/Department/hr-dept/absensi/LaporanKehadiran';
import AbsensiVerificationPage from './Pages/Department/hr-dept/absensi/VerifikasiPengajuanAbsen';
import KalenderCutiPage from './Pages/Department/hr-dept/cuti-izin/KalenderCuti';
import KelolaKuotaCutiPage from './Pages/Department/hr-dept/cuti-izin/KuotaCuti';
import PersetujuanCutiPage from './Pages/Department/hr-dept/cuti-izin/PersetujuanCuti';
import DaftarKaryawanPage from './Pages/Department/hr-dept/data-karyawan/DaftarKaryawan';
import RiwayatKaryawanPage from './Pages/Department/hr-dept/data-karyawan/RiwayatKaryawan';
import TambahKaryawanPage from './Pages/Department/hr-dept/data-karyawan/TambahKaryawanBaru';
import RecruitmentManagementPage from './Pages/Department/hr-dept/data-karyawan/ManajemenRekurtmen';
import ProsesGajiBulananPage from './Pages/Department/hr-dept/penggajian/GajiBulanan';
import LaporanPenggajianPage from './Pages/Department/hr-dept/penggajian/LaporanPenggajian';
import CashFlowReportPage from './Pages/Department/fn-dept/laporan-keuangan/laporan-arus-kas';
import ProfitLossReportPage from './Pages/Department/fn-dept/laporan-keuangan/laporan-laba-rugi';
import BudgetMonitoringPage from './Pages/Department/fn-dept/laporan-keuangan/pemantuan-anggran';
import ExpenseHistoryPage from './Pages/Department/fn-dept/pengajuan-persetujuan/riwayat-pengajuan';
import ExpenseVerificationPage from './Pages/Department/fn-dept/pengajuan-persetujuan/pengajuan-biaya';
import ActiveVendorListPage from './Pages/Department/fn-dept/vendor-pembayaran/daftar-vendor'; 
import PaymentScheduleStatusPage from './Pages/Department/fn-dept/vendor-pembayaran/status-pembayaran';
import ManageIncomingInvoicesPage from './Pages/Department/fn-dept/vendor-pembayaran/kelola-faktur';
import NonItInventoryListPage from './Pages/Department/gr-dept/aset-perusahaan/invent-non-it';
import ProcurementRequestPage from './Pages/Department/gr-dept/aset-perusahaan/pengadaan-barang'
import AssetHistoryLocationPage from './Pages/Department/gr-dept/aset-perusahaan/riwayat-aset';
import FacilityListMapPage from './Pages/Department/gr-dept/fasilitas/daftar-fasilitas';
import ReportFacilityIssuePage from './Pages/Department/gr-dept/fasilitas/lapor-fasilitas';
import MeetingRoomBookingPage from './Pages/Department/gr-dept/fasilitas/pemesanan-ruangan';
import CreateNewProjectPage from './Pages/Department/gr-dept/manajemen-proyek/buat-proyek';
import ProjectDashboardPage from './Pages/Department/gr-dept/manajemen-proyek/dashboard-proyek';
import ProjectProgressMonitoringPage from './Pages/Department/gr-dept/manajemen-proyek/progres-proyek';
import ItMaintenanceSchedulePage from './Pages/Department/it-dept/aset-it/pemeliharaan';
import ItLoanReturnPage from './Pages/Department/it-dept/aset-it/peminjaman';
import ItDeviceListPage from './Pages/Department/it-dept/aset-it/perangkat-it';
import CreateNewTicketPage from './Pages/Department/it-dept/helpdesk/create-tciket';
import OpenSupportTicketsPage from './Pages/Department/it-dept/helpdesk/help-ticket';
import ClosedTicketHistoryPage from './Pages/Department/it-dept/helpdesk/riwayat-ticket';
import AccessAuthorizationPage from './Pages/Department/it-dept/keamanan/akeses';
import UserAccountListPage from './Pages/Department/it-dept/manajemen-akun/daftar-akun';
import EditUserAccountPage from './Pages/Department/it-dept/manajemen-akun/edit-akun';
import NetworkSecurityMonitoringPage from './Pages/Department/it-dept/keamanan/kemanan-jaringan';
import SecurityIncidentReportingPage from './Pages/Department/it-dept/keamanan/laporan-insiden';
import CreateCampaignPage from './Pages/Department/mr-dept/dashboard-kampanye/buat-kampanye';
import CampaignAnalyticsPage from './Pages/Department/mr-dept/dashboard-kampanye/data-kampanye';
import CampaignOverviewPage from './Pages/Department/mr-dept/dashboard-kampanye/kampanye-aktif';
import PartnershipCollaborationPage from './Pages/Department/mr-dept/masyarakat-media/kolaborasi-kemitraan';
import MediaContacsPages from './Pages/Department/mr-dept/masyarakat-media/kontak-media';
import PressReleasePage from './Pages/Department/mr-dept/masyarakat-media/press-release';
import DigitalAssetLibraryPage from './Pages/Department/mr-dept/materi-asset/aset-digital';
import BrandGuideLinesPage from './Pages/Department/mr-dept/materi-asset/brand-logo';
import MaterialRequestPage from './Pages/Department/mr-dept/materi-asset/materi-request';
import MaterialRequestOpsPage from './Pages/Department/op-dept/inventaris/bahan-baku';
import AttractionInventoryListPage from './Pages/Department/op-dept/inventaris/daftar-inventaris';
import SparePartsStockPage from './Pages/Department/op-dept/inventaris/stock-suku-cadang';
import RoutineMaintenanceSchedulePage from './Pages/Department/op-dept/jadwal-pemeliharaan/jadwal-pemeliharaan';
import DamageRepairReportPage from './Pages/Department/op-dept/jadwal-pemeliharaan/riwayat-pemeliharaan';
import AttractionMaintenanceHistoryPage from './Pages/Department/op-dept/jadwal-pemeliharaan/laporan-pemeliharaan';
import CreateEditShiftSchedulePage from './Pages/Department/op-dept/jadwal-shift/atur-shift';
import ShiftPerformanceReportPage from './Pages/Department/op-dept/jadwal-shift/laporan-kinerja';
import VerifyShiftAttendancePage from './Pages/Department/op-dept/jadwal-shift/verifikasi-kehadiran';
import OpenIncidentListPage from './Pages/Department/op-dept/laporan-insiden/daftar-insiden';
import ReportNewIncidentPage from './Pages/Department/op-dept/laporan-insiden/laporan-insiden';
import AreaSecurityMonitoringPage from './Pages/Department/op-dept/laporan-insiden/pemantuan-keamanan';


function App() {
  return (
    // 

    <Layout>
      <Routes>
        {/* // Default // */}
        <Route path="/" element={<Dashboard />} />

        {/* // Top Navigation // */}
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/comp-info" element={<CompanyUpdate />} />
        <Route path="/mg-opr" element={<ManagementOperationPage />} />
        <Route path="/settings" element={<SettingsPage /> } />

        {/* // Login // */}
        <Route path="/login" element={<Login />} />

        <Route path="/add-users" element={<AddUser />} />

        <Route path="/send-message" element={<SendMassage />} />

        {/* // Department // */}
        <Route path="/department/it-dept" element={<ItManagementPage />} />
        <Route path="/department/mr-dept" element={<MarketingManagementPage />} />
        <Route path="/department/gr-dept" element={<GeneralManagementPage />} />
        <Route path="/department/hr-dept" element={<HrdManagementPage />} />
        <Route path="/department/op-dept" element={<OpsManagementPage />} />
        <Route path="/department/fn-dept" element={<FinanceManagementPage />} />

        {/* // Not Found // */}
        <Route path="*" element={<h1>Not Found</h1>} />

        {/*// Information Center//*/}
        <Route path="/InformationCenter/formulir" element={<FormulirPage />} />
        <Route path="/InformationCenter/arsip" element={<ArsipPage />} />
        <Route path="/InformationCenter/fasilitas" element={<FasilitasPage />} />
        <Route path="/InformationCenter/panduan" element={<PanduanPage />} />
        <Route path="/InformationCenter/direktori" element={<DirektoriPage />} />
        <Route path="/InformationCenter/kebijakan" element={<KebijakanPage />} />

        {/*// Management Operation */}
        {/* HR Department */}
        {/* Absensi */}
        <Route path="/management-operation/hr-dept/absen/dashboard-absensi" element={<AbsensiDashboardPage/>}/>
        <Route path="/management-operation/hr-dept/absen/laporan-absensi" element={<AbsensiReportPage/>}/>
        <Route path="/management-operation/hr-dept/absen/verifikasi-absensi" element={<AbsensiVerificationPage/>}/>
        {/* cuti-izin */}
        <Route path="/management-operation/hr-dept/cuti-izin/kalender-cuti" element={<KalenderCutiPage/>}/>
        <Route path="/management-operation/hr-dept/cuti-izin/kuota-cuti" element={<KelolaKuotaCutiPage/>}/>
        <Route path="/management-operation/hr-dept/cuti-izin/persetujuan-cuti" element={<PersetujuanCutiPage/>}/>
        {/* data-karywan */}
        <Route path="/management-operation/hr-dept/data-karyawan/daftar-karywan" element={<DaftarKaryawanPage/>}/>
        <Route path="/management-operation/hr-dept/data-karyawan/riwayat-karyawan" element={<RiwayatKaryawanPage/>}/>
        <Route path="/management-operation/hr-dept/data-karyawan/tambah-karywan" element={<TambahKaryawanPage/>}/>
        <Route path="/management-operation/hr-dept/data-karyawan/manajemen-rekurtmen" element={<RecruitmentManagementPage/>}/>
        {/* penggajian */}
        <Route path="/management-operation/hr-dept/penggajian/gaji-bulanan" element={<ProsesGajiBulananPage/>}/>
        <Route path="/management-operation/hr-dept/penggajian/laporan-penggajian" element={<LaporanPenggajianPage />}/>

        {/* Operasional Lapangan Department */}
        {/* inventaris */}
        <Route path="/op-dept/inventaris/bahan-baku" element={<MaterialRequestOpsPage/>}/>
        <Route path="/op-dept/inventaris/daftar-inventaris" element={<AttractionInventoryListPage/>}/>
        <Route path="/op-dept/inventaris/stock-suku-cadang" element={<SparePartsStockPage/>}/>
        {/* jadwal-pemeliharaan */}   
        <Route path="/op-dept/jadwal-pemeliharaan/jadwal-pemeliharaan" element={<RoutineMaintenanceSchedulePage/>}/>
        <Route path="/op-dept/jadwal-pemeliharaan/riwayat-pemeliharaan" element={<DamageRepairReportPage/>}/>
        <Route path="/op-dept/jadwal-pemeliharaan/laporan-pemeliharaan" element={<AttractionMaintenanceHistoryPage />}/>
        {/* jadwal-shift */}
        <Route path="/op-dept/jadwal-shift/atur-shift" element={<CreateEditShiftSchedulePage/>}/>
        <Route path="/op-dept/jadwal-shift/laporan-kinerja" element={<ShiftPerformanceReportPage/>}/>
        <Route path="/op-dept/jadawl-shift/verifikasi-kehadiran" element={<VerifyShiftAttendancePage/>}/>
        {/* laporan-insiden */}
        <Route path="/op-dept/laporan-insiden/daftar-inside" element={<OpenIncidentListPage />}/>
        <Route path="/op-dept/laporan-insiden/laporan-insiden" element={<ReportNewIncidentPage/>}/>
        <Route path="/op-dept/laporan-insiden/pemantuan-keamanan" element={<AreaSecurityMonitoringPage/>}/>

        {/* Finance Department  */}
        {/* laporan-keuangan */}
        <Route path="/fn-dept/laporan-keuangan/laporan-laba-rugi" element={<CashFlowReportPage />}/>
        <Route path="/fn-dept/laporan-keuangan/laporan-arus-kas" element={<ProfitLossReportPage />}/>
        <Route path="/fn-dept/laporan-keuangan/pemantuan-anggran" element={<BudgetMonitoringPage />}/>
        {/* pengajuan-persetujuan */}
        <Route path="/fn-dept/pengajuan-persetujuan/pengajuan-biaya" element={<ExpenseVerificationPage/>}/>
        <Route path="/fn-dept/pengajuan-persetujuan/riwayat-pengajuan" element={<ExpenseHistoryPage   />}/>
        {/* vendor */}
        <Route path="/fn-dept/vendor-pembayaran/status-pembayaran" element={<PaymentScheduleStatusPage />}/>
        <Route path="/fn-dept/vendor-pembayaran/kelola-faktur" element={<ActiveVendorListPage />}/>
        <Route path="/fn-dept/vendor-pembayaran/daftar-vendor" element={<ManageIncomingInvoicesPage />}/>

        {/* IT Department */}
        {/* aset-it */}
        <Route path="/it-dept/aset-it/pemeliharaan" element={<ItMaintenanceSchedulePage />}/>
        <Route path="/it-dept/aset-it/peminjaman" element={<ItLoanReturnPage />}/>
        <Route path="/it-dept/aset-it/perangkat-it" element={<ItDeviceListPage  />}/>
        {/* helpdesk */}
        <Route path="/it-dept/helpdesk/create-ticket" element={<CreateNewTicketPage />}/>
        <Route path="/it-dept/helpdesk/help-ticket" element={<OpenSupportTicketsPage  />}/>
        <Route path="/it-dept/helpdesk/riwayat-ticket" element={<ClosedTicketHistoryPage />}/>
        {/* keamanan */}
        <Route path="/it-dept/keamanan/akeses" element={<AccessAuthorizationPage />}/>
        <Route path="/it-dept/keamanan/kemanan-jaringan" element={<NetworkSecurityMonitoringPage />}/>
        <Route path="/it-dept/keamanan/laporan-insiden" element={<SecurityIncidentReportingPage />}/>
        {/* manajemen-akun */}
        <Route path="/it-dept/manajemen-akun/daftar-akun" element={<UserAccountListPage />}/>
        <Route path="/it-dept/manajemen-akun/edit-akun" element={<EditUserAccountPage />}/>


        {/* Marketing Department */}
         {/* dashboard-kampanye */}
        <Route path="/mr-dept/dashboard-kampanye/buat-kampanye" element={<CreateCampaignPage />}/>
        <Route path="/mr-dept/dashboard-kampanye/data-kampanye" element={<CampaignAnalyticsPage />}/>
        <Route path="/mr-dept/dashboard-kampanye/kampanye-aktif" element={<CampaignOverviewPage />}/>
         {/* kmasyarakat-media */}
        <Route path="/mr-dept/masyarakat-media/kolaborasi-kemitraan" element={<PartnershipCollaborationPage />}/>
        <Route path="/mr-dept/masyarakat-media/kontak-media" element={<MediaContacsPages />}/>
        <Route path="/mr-dept/masyarakat-media/press-release" element={<PressReleasePage />}/>
         {/* materi-asset */}
        <Route path="/mr-dept/materi-asset/aset-digital" element={<DigitalAssetLibraryPage />}/>
        <Route path="/mr-dept/materi-asset/brand-logo" element={<BrandGuideLinesPage />}/>
        <Route path="/mr-dept/materi-asset/materi-request" element={<MaterialRequestPage />}/>

        {/* General Department */}
        {/* aset-perusahaan/ */}
        <Route path="/gr-dept/aset-perusahaan/invent-non-it" element={<NonItInventoryListPage  />}/>
        <Route path="/gr-dept/aset-perusahaan/pengadaan-barang" element={< ProcurementRequestPage />}/>
        <Route path="/gr-dept/aset-perusahaan/riwayat-aset" element={< AssetHistoryLocationPage />}/>
        {/* fasilitas*/}
        <Route path="/gr-dept/fasilitas/daftar-fasilitas" element={<FacilityListMapPage />}/>
        <Route path="/gr-dept/fasilitas/lapor-fasilitas'" element={<ReportFacilityIssuePage />}/>
        <Route path="/gr-dept/fasilitas/pemesanan-ruangan" element={<MeetingRoomBookingPage />}/>
        {/* manajemen-proyek */}
        <Route path="/gr-dept/manajemen-proyek/buat-proyek" element={<CreateNewProjectPage />}/>
        <Route path="/gr-dept/manajemen-proyek/dashboard-proyek" element={<ProjectDashboardPage />}/>
        <Route path="/gr-dept/manajemen-proyek/progres-proyek" element={<ProjectProgressMonitoringPage />}/>

      </Routes>
    </Layout>
  );
}

export default App;
