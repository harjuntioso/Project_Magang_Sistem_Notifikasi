<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;

class WhatsAppController extends Controller
{
    public function checkStatus()
    {
        try {
            $response = Http::get('http://localhost:3001/status'); // pastikan endpoint ini tersedia di Node.js
            return response()->json($response->json(), $response->status());
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengecek status WhatsApp',
                'technical' => $e->getMessage()
            ], 500);
        }
    }


    public function sendNotification(Request $request)
    {
        $number = $request->input('number');
        $message = $request->input('message');
    
        try {
            $response = Http::timeout(10)->post('http://localhost:3001/send-message', [
                'number' => $number,
                'message' => $message,
            ]);
    
            return response()->json($response->json(), $response->status());
    
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal menghubungi service WhatsApp',
                'technical' => $e->getMessage()
            ], 500);
        }
    }


    
}
