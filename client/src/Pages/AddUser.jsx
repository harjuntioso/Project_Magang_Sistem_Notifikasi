import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { sendWhatsAppMessage } from "../axiosClient.js";

export default function UserForm() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [user, setUser] = useState({
    id: null,
    name: '',
    phone: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  //const { setNotification } = useAuth();

  useEffect(() => {
    if (id) {
      setLoading(true);
      // Simulasi pengambilan data user dari backend (dummy)
      setTimeout(() => {
        setUser({
          id,
          name: '',
          phone: '',
          email: '',
          password: '',
          password_confirmation: ''
        });
        setLoading(false);
      }, 500);
    }
  }, [id]);

  const onSubmit = ev => {
    ev.preventDefault();

    // Validasi dasar
    if (!user.name || !user.email || !user.phone) {
      setErrors({
        name: user.name ? null : ['Name is required'],
        email: user.email ? null : ['Email is required'],
        phone: user.phone ? null : ['Phone is required']
      });
      return;
    }

    setErrors(null); // Reset error

    if (user.id) {
      Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, save it!'
      }).then((result) => {
        if (result.isConfirmed) {
          // Simulasi update
          setTimeout(() => {
            Swal.fire('Updated!', 'User has been updated.', 'success');
            navigate('/contacts');
          }, 500);
        }
      });
    }  else {
        // Simulasi pembuatan user baru
        setTimeout(() => {
        Swal.fire('Added!', 'User has been added.', 'success');
        navigate('/contacts');
        }, 500);

        // Kirim pesan WhatsApp (pakai nomor dari user yang baru ditambahkan)
        sendWhatsAppMessage(user.phone, `Selamat datang ${user.name}, akun Anda telah terdaftar!`)
        .then(() => {
            console.log('Pesan WhatsApp berhasil dikirim');
        })
        .catch(err => {
            console.error('Gagal mengirim pesan WhatsApp:', err);
        });
    }

  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        {user.id ? `Update User: ${user.name}` : 'New User'}
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto mt-4">
        {loading && (
          <div className="text-center text-blue-500 font-medium">Loading...</div>
        )}
        {errors && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4 space-y-1 text-sm">
            {Object.keys(errors).map(key =>
              errors[key] ? <p key={key}>{errors[key][0]}</p> : null
            )}
          </div>
        )}

        {!loading && (
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={user.name}
                onChange={ev => setUser({ ...user, name: ev.target.value })}
                placeholder="Enter name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={user.email}
                onChange={ev => setUser({ ...user, email: ev.target.value })}
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={user.phone}
                onChange={ev => setUser({ ...user, phone: ev.target.value })}
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={ev => setUser({ ...user, password: ev.target.value })}
                placeholder="Enter password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password Confirmation</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={ev => setUser({ ...user, password_confirmation: ev.target.value })}
                placeholder="Confirm password"
              />
            </div>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition duration-200"
              type="submit"
            >
              Save
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
