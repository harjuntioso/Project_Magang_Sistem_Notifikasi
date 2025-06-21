<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller; // Pastikan ini benar (namespace)

class AuthController extends Controller
{
    /**
     * Handle user registration.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function register(Request $request)
    {
        Log::info('--- Laravel Register Request Debug ---', [
            'request_all' => $request->all(),
            'request_headers' => $request->headers->all(),
            'x_xsrf_token_header' => $request->header('X-XSRF-TOKEN'),
            'session_token' => $request->session()->token(),
        ]);

        $request->validate([
            'uid' => ['required', 'string', 'max:20', 'unique:users'],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', 'min:6'],
            'phone' => ['required', 'string', 'max:20'],
            'department_id' => ['required', 'integer', 'exists:departments,id'],
            'role_id' => ['required', 'integer', 'exists:roles,id'],
        ]);

        $user = User::create([
            'uid' => $request->uid,
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'department_id' => $request->department_id,
            'role_id' => $request->role_id,
        ]);

        Log::info('--- Laravel Register Success ---', ['user_id' => $user->id, 'user_email' => $user->email]);

        return response()->json([
            'message' => 'Pendaftaran berhasil!',
        ], 201);
    }

    /**
     * Handle user login.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function login(Request $request)
    {
        Log::info('--- Laravel Login Request Debug ---', [
            'request_all' => $request->all(),
            'request_headers' => $request->headers->all(),
            'x_xsrf_token_header' => $request->header('X-XSRF-TOKEN'),
            'session_token' => $request->session()->token(),
        ]);

        $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            Log::warning('--- Laravel Login Failed ---', ['email' => $request->email, 'ip_address' => $request->ip()]);
            throw ValidationException::withMessages([
                'email' => ['Email atau password salah.'],
            ]);
        }

        $user = $request->user();
        $token = $user->createToken('auth_token')->plainTextToken;

        Log::info('--- Laravel Login Success ---', [
            'user_uid' => $user->uid,
            'user_email' => $user->email,
            'token_issued_prefix' => substr($token, 0, 10) . '...', // Log prefix instead of full token
        ]);

        return response()->json([
            'user' => $user->load('department', 'role'),
            'token' => $token,
            'message' => 'Login berhasil!'
        ]);
    }

    /**
     * Handle user logout (for Sanctum SPA).
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        $userId = $request->user() ? $request->user()->id : 'guest';
        $userUid = $request->user() ? $request->user()->uid : 'guest';

        Log::info('--- Laravel Logout Request Debug ---', [
            'user_id_attempting_logout' => $userId,
            'user_uid_attempting_logout' => $userUid,
            'request_headers' => $request->headers->all(),
            'x_xsrf_token_header' => $request->header('X-XSRF-TOKEN'),
            'session_token' => $request->session()->token(),
        ]);

        // Hapus token API yang sedang digunakan oleh user yang terautentikasi
        // Ini adalah cara yang benar untuk logout di Laravel Sanctum SPA
        if ($request->user()) {
            $request->user()->currentAccessToken()->delete();
            Log::info('--- Laravel Logout Success ---', [
                'user_uid' => $userUid,
                'token_revoked' => true
            ]);
        } else {
            Log::warning('--- Laravel Logout Failed ---', ['reason' => 'No authenticated user found during logout request']);
        }


        return response()->json(['message' => 'Logout berhasil!']);
    }

    /**
     * Get authenticated user data with their relations.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function user(Request $request)
    {
        // Memuat relasi 'department' dan 'role' bersamaan dengan user
        // Pastikan relasi department() dan role() didefinisikan di App\Models\User
        return response()->json($request->user()->load('department', 'role'));
    }

    /**
     * Get CSRF cookie. This route is typically accessed once when the SPA loads
     * to set the XSRF-TOKEN cookie for subsequent requests.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCsrfCookie(Request $request)
    {
        Log::info('--- Laravel CSRF Cookie Request Debug ---', [
            'request_headers' => $request->headers->all(),
            'session_id' => $request->session()->getId(),
            'session_token_from_session' => $request->session()->token(),
        ]);
        // Laravel secara otomatis akan menempatkan XSRF-TOKEN di cookie response
        // melalui middleware saat request ini diproses.
        return response()->json(['message' => 'CSRF cookie obtained successfully']);
    }
}