import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../axiosClient'; // Menggunakan axiosClient
import Swal from 'sweetalert2'; // Import SweetAlert2

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (password !== confirmPassword) {
            Swal.fire({ // SweetAlert untuk error password tidak cocok
                icon: 'error',
                title: 'Pendaftaran Gagal!',
                text: 'Password tidak cocok.',
                confirmButtonText: 'Oke'
            });
            setLoading(false);
            return;
        }

        try {
            const response = await axiosClient.post('/register', { 
                name,
                email,
                password
            });
            Swal.fire({ // SweetAlert untuk sukses pendaftaran
                icon: 'success',
                title: 'Pendaftaran Berhasil!',
                text: 'Akun Anda telah berhasil dibuat. Silakan login.',
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                navigate('/login'); // Arahkan ke halaman login setelah alert sukses
            });
        } catch (error) {
            console.error('Signup error:', error);
            let errorMessage = "Pendaftaran gagal. Terjadi kesalahan pada server.";
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            } else if (error.response && error.response.data && error.response.data.errors) {
                // Handle validation errors from Laravel if any
                const errors = error.response.data.errors;
                errorMessage = Object.values(errors).flat().join('\n'); // Join all error messages
            }

            Swal.fire({ // SweetAlert untuk error pendaftaran
                icon: 'error',
                title: 'Pendaftaran Gagal!',
                text: errorMessage,
                confirmButtonText: 'Oke'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-neutral-100 p-4 sm:p-8">
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg p-8 bg-white rounded-xl shadow-2xl border border-gray-200">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        Daftar Akun Baru
                    </h1>
                    <p className="text-gray-600 mt-2">Buat akun internal Anda</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="sr-only">Nama Lengkap</label>
                        <input
                            className="w-full px-4 py-3 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            id="name"
                            type="text"
                            placeholder="Nama Lengkap Anda"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="sr-only">Email Perusahaan</label>
                        <input
                            className="w-full px-4 py-3 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            id="email"
                            type="email"
                            placeholder="Email Perusahaan Anda"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            className="w-full px-4 py-3 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            id="password"
                            type="password"
                            placeholder="Password Anda"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="sr-only">Konfirmasi Password</label>
                        <input
                            className="w-full px-4 py-3 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            id="confirmPassword"
                            type="password"
                            placeholder="Konfirmasi Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        className={`w-full px-4 py-3 text-white font-bold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${
                            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                        }`}
                        type="submit"
                        disabled={loading}
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
                            'Daftar Akun'
                        )}
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-600">
                    Sudah punya akun?{' '}
                    <Link to="/login" className="font-medium text-blue-600 hover:text-blue-800 hover:underline focus:outline-none">
                        Login di sini
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;