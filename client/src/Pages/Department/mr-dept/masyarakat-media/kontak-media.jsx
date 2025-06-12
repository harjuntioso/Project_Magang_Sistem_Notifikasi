import React, { useState } from 'react';
import {
  FaUsers,        // Ikon utama untuk kontak
  FaSearch,       // Cari
  FaFilter,       // Filter
  FaPlusCircle,   // Tambah kontak baru
  FaEdit,         // Edit kontak
  FaTrash,        // Hapus kontak
  FaPhone,        // Telepon
  FaEnvelope,     // Email
  FaLink,         // Website/Sosmed
} from 'react-icons/fa';

const MediaContactsPage = () => {
  const [contacts, setContacts] = useState([
    // Data dummy kontak media
    { id: 'MC001', name: 'Rina Wijaya', organization: 'Detik News', type: 'Jurnalis', email: 'rina.w@detik.com', phone: '081212345678', notes: 'Spesialis berita hiburan' },
    { id: 'MC002', name: 'Andi Pratama', organization: 'Kompas', type: 'Jurnalis', email: 'andi.p@kompas.com', phone: '081387654321', notes: 'Kontak untuk press release umum' },
    { id: 'MC003', name: 'Indah Sari', organization: 'Influencer Lifestyle', type: 'Influencer', email: 'indah.sari@gmail.com', phone: '087856781234', notes: 'Fokus pada segmen keluarga' },
    { id: 'MC004', name: 'Bayu Dirgantara', organization: 'TV Nasional XYZ', type: 'Fotografer Media', email: 'bayu.d@tvxyz.com', phone: '085798765432', notes: 'Kontak untuk liputan visual' },
    // ... tambahkan data dummy lainnya
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('Semua');
  const [editingContactId, setEditingContactId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const filteredContacts = contacts.filter(contact =>
    (filterType === 'Semua' || contact.type === filterType) &&
    (contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     contact.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
     contact.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEditClick = (contact) => {
    setEditingContactId(contact.id);
    setEditFormData({ ...contact });
  };

  const handleSaveEdit = (id) => {
    // Logika untuk menyimpan perubahan ke backend
    alert(`Kontak ${editFormData.name} berhasil diperbarui.`);
    setContacts(contacts.map(c => c.id === id ? editFormData : c));
    setEditingContactId(null);
    setEditFormData({});
  };

  const handleCancelEdit = () => {
    setEditingContactId(null);
    setEditFormData({});
  };

  const handleDeleteContact = (id, name) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus kontak ${name}?`)) {
      alert(`Kontak ID: ${id} dihapus.`);
      setContacts(contacts.filter(c => c.id !== id));
      // Logika untuk menghapus dari backend
    }
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 mb-8 flex items-center gap-3">
        <FaUsers className="w-8 h-8 text-blue-500" />
        Database Kontak Media
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Kelola dan akses informasi kontak jurnalis, *influencer*, dan mitra media penting.
      </p>

      {/* Filter dan Aksi Cepat */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-blue-500">
        <h2 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-blue-500" />
          Filter & Aksi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="search-contact" className="block text-gray-700 font-medium mb-1">Cari Kontak</label>
            <input
              type="text"
              id="search-contact"
              placeholder="Nama, Organisasi, Email..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filter-type" className="block text-gray-700 font-medium mb-1">Tipe Kontak</label>
            <select
              id="filter-type"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="Semua">Semua Tipe</option>
              <option value="Jurnalis">Jurnalis</option>
              <option value="Influencer">Influencer</option>
              <option value="Fotografer Media">Fotografer Media</option>
              {/* Tambahkan tipe lain sesuai kebutuhan */}
            </select>
          </div>
          <div className="md:col-span-2 flex flex-col sm:flex-row gap-2">
            <a href="/management/pemasaran/pr/kontak-media/tambah" className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2">
              <FaPlusCircle className="w-4 h-4" /> Tambah Kontak
            </a>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center justify-center gap-2">
              <FaFileDownload className="w-4 h-4" /> Unduh Data
            </button>
          </div>
        </div>
      </section>

      {/* Tabel Daftar Kontak Media */}
      <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center gap-2">
          <FaUsers className="w-5 h-5 text-primary" />
          Daftar Kontak ({filteredContacts.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nama</th>
                <th className="py-3 px-6 text-left">Organisasi</th>
                <th className="py-3 px-6 text-left">Tipe</th>
                <th className="py-3 px-6 text-left">Kontak</th>
                <th className="py-3 px-6 text-center">Catatan</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <tr key={contact.id} className="border-b border-gray-200 hover:bg-gray-50">
                    {editingContactId === contact.id ? (
                      <>
                        <td className="py-3 px-6"><input type="text" value={editFormData.name} onChange={(e) => setEditFormData({...editFormData, name: e.target.value})} className="w-full p-1 border rounded" /></td>
                        <td className="py-3 px-6"><input type="text" value={editFormData.organization} onChange={(e) => setEditFormData({...editFormData, organization: e.target.value})} className="w-full p-1 border rounded" /></td>
                        <td className="py-3 px-6"><input type="text" value={editFormData.type} onChange={(e) => setEditFormData({...editFormData, type: e.target.value})} className="w-full p-1 border rounded" /></td>
                        <td className="py-3 px-6">
                            <input type="email" value={editFormData.email} onChange={(e) => setEditFormData({...editFormData, email: e.target.value})} className="w-full p-1 border rounded mb-1" placeholder="Email" />
                            <input type="tel" value={editFormData.phone} onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})} className="w-full p-1 border rounded" placeholder="Telepon" />
                        </td>
                        <td className="py-3 px-6"><textarea value={editFormData.notes} onChange={(e) => setEditFormData({...editFormData, notes: e.target.value})} className="w-full p-1 border rounded text-xs" rows="2"></textarea></td>
                        <td className="py-3 px-6 text-center">
                          <button onClick={() => handleSaveEdit(contact.id)} className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-600 mr-2">Simpan</button>
                          <button onClick={handleCancelEdit} className="bg-gray-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-gray-600">Batal</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{contact.name}</td>
                        <td className="py-3 px-6 text-left">{contact.organization}</td>
                        <td className="py-3 px-6 text-left">{contact.type}</td>
                        <td className="py-3 px-6 text-left">
                          <p className="flex items-center gap-1"><FaEnvelope className="text-xs text-gray-500" /> {contact.email}</p>
                          <p className="flex items-center gap-1"><FaPhone className="text-xs text-gray-500" /> {contact.phone}</p>
                        </td>
                        <td className="py-3 px-6 text-left text-xs text-gray-600 max-w-xs overflow-hidden text-ellipsis">{contact.notes}</td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex justify-center items-center gap-2">
                            <button onClick={() => handleEditClick(contact)} className="text-blue-500 hover:text-blue-700 text-lg" title="Edit">
                              <FaEdit />
                            </button>
                            <button onClick={() => handleDeleteContact(contact.id, contact.name)} className="text-red-500 hover:text-red-700 text-lg" title="Hapus">
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 text-center text-gray-500">Tidak ada kontak media ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default MediaContactsPage;