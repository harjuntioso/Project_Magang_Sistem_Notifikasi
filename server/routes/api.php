<?php

use Illuminate\Support\Facades\Route;

// Import semua Controller yang digunakan di file ini
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\TaskCategoryController;
use App\Http\Controllers\Api\DepartmentController; 
use App\Http\Controllers\Api\UserController;     
use App\Http\Controllers\Api\WhatsAppController; 
use App\Http\Controllers\Api\ChatController;     

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

// --- PUBLIC ROUTES (Tidak memerlukan autentikasi) ---
// Rute-rute ini dapat diakses oleh siapa saja.
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['message' => 'CSRF cookie set']);
});


// --- PROTECTED ROUTES ( ---
Route::middleware('auth:sanctum')->group(function () {

    // Authentikasi & User
    Route::post('/logout', [AuthController::class, 'logout']);
    // Untuk mendapatkan data user yang sedang login (Authenticated User)
    Route::get('/users', [AuthController::class, 'users']);

    Route::get('/tasks/pending-approval', [TaskController::class, 'getPendingApprovalTasks']);

    Route::apiResource('tasks', TaskController::class);

    //Route::get('/tasks/pending-approval', [TaskController::class, 'getPendingApprovalTasks']);

    // Manajemen Kategori Tugas (CRUD Lengkap)
    Route::apiResource('task-categories', TaskCategoryController::class);

    // Manajemen Departemen
    Route::get('/departments', [DepartmentController::class, 'index']);
    Route::get('/departments/{id}', [DepartmentController::class, 'show']);
    // Jika perlu CRUD lengkap: Route::apiResource('departments', DepartmentController::class);


    Route::get('/users', [UserController::class, 'index']); 

    // Fitur WhatsApp
    Route::get('/whatsapp/status', [WhatsAppController::class, 'checkStatus']);
    Route::post('/whatsapp/send', [WhatsAppController::class, 'sendNotification']);
    Route::post('/send-whatsapp', [WhatsAppController::class, 'sendNotification']); 

    // Fitur Chat
    Route::get('/chats', [ChatController::class, 'index']);


});