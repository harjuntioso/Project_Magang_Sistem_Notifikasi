<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ChatController extends Controller
{
        public function index()
    {
        return response()->json([
            ['id' => 1, 'message' => 'Hello!'],
            ['id' => 2, 'message' => 'Hi there!']
        ]);
    }
}


