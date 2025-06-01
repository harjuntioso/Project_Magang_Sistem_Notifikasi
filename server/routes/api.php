<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WhatsAppController;
use App\Http\Controllers\Api\UserController;
use Inertia\Inertia;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/whatsapp-sender', function () {
        return Inertia::render('WhatsAppSender');
    });

});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::get('/chats', [ChatController::class, 'index']);

Route::get('/user', [UserController::class, 'index']);

Route::get('/whatsapp/status', [WhatsAppController::class, 'checkStatus']);

Route::post('/whatsapp/send', [WhatsAppController::class, 'sendNotification']);

Route::post('/send-whatsapp', [WhatsAppController::class, 'sendNotification']);