<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
// use Symfony\Component\Process\Process; // Hapus jika tidak digunakan
// use Symfony\Component\Process\Exception\ProcessFailedException; // Hapus jika tidak digunakan
// use Illuminate\Support\Str; // Hapus jika tidak digunakan
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class WhatsAppController extends Controller
{
    /**
     * Check the status of the WhatsApp service.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkStatus()
    {
        try {
            // Pastikan WHATSAPP_SERVICE_STATUS_URL ada di .env
            $statusUrl = env('WHATSAPP_SERVICE_URL', 'http://localhost:3001') . '/status';
            $response = Http::timeout(5)->get($statusUrl); 
            return response()->json($response->json(), $response->status());
        } catch (\Exception $e) {
            Log::error('Exception checking WhatsApp service status: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengecek status WhatsApp service',
                'technical' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Send a WhatsApp notification via an external service (non-static API endpoint).
     * This method is intended to be called via an API route (e.g., /api/whatsapp/send).
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendNotification(Request $request)
    {
        $validatedData = $request->validate([
            'number' => 'required|string',
            'message' => 'required|string',
        ]);

        Log::info("Incoming WhatsApp send request via API endpoint", ['number' => $validatedData['number'], 'message_preview' => substr($validatedData['message'], 0, 50) . '...']);

        // Panggil method static untuk logika inti pengiriman
        $success = self::sendNotificationStatic($validatedData['number'], $validatedData['message']);

        if ($success) {
            return response()->json(['message' => 'WhatsApp notification sent successfully!']);
        } else {
            return response()->json(['message' => 'Failed to send WhatsApp notification.'], 500);
        }
    }

    /**
     * Send WhatsApp notification (static helper method).
     * This method can be called internally by other controllers (e.g., TaskController).
     *
     * @param string $number The recipient's phone number.
     * @param string $message The message to send.
     * @return bool True if notification was successfully sent via the service, false otherwise.
     */
    public static function sendNotificationStatic(string $number, string $message): bool
    {
        $whatsappServiceUrl = env('WHATSAPP_SERVICE_URL'); // URL service WhatsApp Anda
        // $apiKey = env('WHATSAPP_API_KEY'); // API Key jika ada

        if (!$whatsappServiceUrl) {
            Log::error('WhatsApp service URL is not configured (WHATSAPP_SERVICE_URL missing). Static call failed.');
            return false;
        }

        try {
                $response = Http::timeout(10)->post($whatsappServiceUrl . '/send-message', [ 
                    'number' => $number, 
                    'message' => $message,
                ]);

            if ($response->successful()) {
                Log::info('WhatsApp notification sent via service (static call):', ['number' => $number, 'status' => $response->status(), 'response' => $response->json()]);
                return true;
            } else {
                Log::error('Failed to send WhatsApp notification via service (static call):', ['number' => $number, 'status' => $response->status(), 'response' => $response->json()]);
                return false;
            }
        } catch (\Exception $e) {
            Log::error('Exception while sending WhatsApp notification (static call):', ['error' => $e->getMessage(), 'number' => $number]);
            return false;
        }
    }
}