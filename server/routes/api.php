<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WhatsAppController;
use Inertia\Inertia;

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

Route::get('/whatsapp/status', [WhatsAppController::class, 'checkStatus']);

Route::post('/whatsapp/send', [WhatsAppController::class, 'sendNotification']);

Route::post('/send-whatsapp', [WhatsAppController::class, 'sendNotification']);