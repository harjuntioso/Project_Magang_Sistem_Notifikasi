<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log; 
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        Log::info('--- Laravel Register Request Debug ---', [
            'request_all' => $request->all(),
            'request_headers' => $request->headers->all(),
            'x_xsrf_token_header' => $request->header('X-XSRF-TOKEN'),
            'session_token' => $request->session()->token(),
        ]);

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', 'min:6'],
            'phone' => ['required', 'string', 'max:20'],
            'department_id' => ['required', 'integer', 'exists:departments,id'],
            'role_id' => ['required', 'integer', 'exists:roles,id'],

        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'department_id' => $request->department_id,
            'role_id' => $request->role_id,
        ]);

        Log::info('--- Laravel Register Success ---', ['user_id' => $user->id]);

        return response()->json([
            'message' => 'Pendaftaran berhasil!',
        ], 201);
    }

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
            Log::warning('--- Laravel Login Failed ---', ['email' => $request->email]);
            throw ValidationException::withMessages([
                'email' => ['Email atau password salah.'],
            ]);
        }

        $user = $request->user();
        $token = $user->createToken('auth_token')->plainTextToken;

        Log::info('--- Laravel Login Success ---', ['user_id' => $user->id, 'token_issued' => substr($token, 0, 10) . '...']); // Jangan log full token

        return response()->json([
            'user' => $user,
            'token' => $token,
            'message' => 'Login berhasil!'
        ]);
    }

    public function getCsrfCookie(Request $request)
    {
        Log::info('--- Laravel CSRF Cookie Request Debug ---', [
            'request_headers' => $request->headers->all(),
            'session_id' => $request->session()->getId(),
            'session_token_from_session' => $request->session()->token(),
        ]);
        return response()->json(['message' => 'CSRF cookie obtained successfully']);
    }

    public function logout(Request $request)
    {
        Log::info('--- Laravel Logout Request Debug ---', [
            'request_all' => $request->all(),
            'request_headers' => $request->headers->all(),
            'x_xsrf_token_header' => $request->header('X-XSRF-TOKEN'),
            'session_token' => $request->session()->token(),
        ]);

        Auth::logout();

        Log::info('--- Laravel Logout Success ---', ['user_id' => $request->user() ? $request->user()->id : 'guest']);

        return response()->json(['message' => 'Logout berhasil!']);
    }
}