<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\WhatsAppController;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Public routes (tidak memerlukan autentikasi)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/sanctum/csrf-cookie', [AuthController::class, 'getCsrfCookie']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Di sini Anda bisa menambahkan endpoint API lainnya yang memerlukan autentikasi
    // Contoh:
    // Route::get('/dashboard/stats', function() { /* ... */ });
    // Route::get('/dashboard/activities', function() { /* ... */ });
    // Route::apiResource('/users', UserController::class); // Untuk manajemen user oleh admin
    // ... dan semua API untuk departemen yang sudah kita desain sebelumnya
});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::get('/chats', [ChatController::class, 'index']);

Route::get('/user', [UserController::class, 'index']);

Route::get('/whatsapp/status', [WhatsAppController::class, 'checkStatus']);

Route::post('/whatsapp/send', [WhatsAppController::class, 'sendNotification']);

Route::post('/send-whatsapp', [WhatsAppController::class, 'sendNotification']);