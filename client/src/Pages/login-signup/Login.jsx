import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useRef, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import Swal from 'sweetalert2'; // Import SweetAlert2

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth(); // Menggunakan fungsi login dari AuthContext
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Untuk redirect

  const onSubmit = (ev) => {
    ev.preventDefault();
    setLoading(true);

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        login(data.user, data.token); // Memanggil fungsi login dari AuthContext
        Swal.fire({ // SweetAlert untuk sukses
          icon: 'success',
          title: 'Login Berhasil!',
          text: 'Anda telah berhasil login.',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          navigate('/dashboard'); // Arahkan ke dashboard setelah alert sukses
        });
      })
      .catch((err) => {
        const response = err.response;
        let errorMessage = "Terjadi kesalahan yang tidak diketahui. Silakan coba lagi.";
        if (response && response.status === 422) {
          errorMessage = response.data.message || "Email atau password salah.";
        } else if (response && response.data && response.data.message) {
            errorMessage = response.data.message;
        }

        Swal.fire({ // SweetAlert untuk error
          icon: 'error',
          title: 'Login Gagal!',
          text: errorMessage,
          confirmButtonText: 'Oke'
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-100 p-4 sm:p-8">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg p-8 bg-white rounded-xl shadow-2xl border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Selamat Datang!
          </h1>
          <p className="text-gray-600 mt-2">Login ke akun internal Anda</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              ref={emailRef}
              id="email"
              type="email"
              placeholder="Email Perusahaan Anda"
              required
              className="w-full px-4 py-3 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              ref={passwordRef}
              id="password"
              type="password"
              placeholder="Password Anda"
              required
              className="w-full px-4 py-3 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-3 text-white font-bold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memuat...
              </>
            ) : (
              'Login'
            )}
          </button>
          <p className="text-sm text-center text-gray-600 mt-4">
            Belum terdaftar?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
            >
              Buat Akun
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}