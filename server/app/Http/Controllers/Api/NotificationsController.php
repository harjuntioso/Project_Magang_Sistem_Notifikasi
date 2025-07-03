<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class NotificationController extends Controller
{
    public function getUserNotifications(int $userId)
    {
        try {
            if (auth()->user()->id != $userId) {
                return response()->json(['message' => 'Unauthorized access to notifications.'], 403);
            }

            $notifications = Notification::where('user_id', $userId)
                                         ->orderBy('created_at', 'desc')
                                         ->limit(10)
                                         ->get();

            $unreadCount = Notification::where('user_id', $userId)
                                       ->where('is_read', false)
                                       ->count();

            return response()->json([
                'notifications' => $notifications,
                'unread_count' => $unreadCount,
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching user notifications:', ['user_id' => $userId, 'error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to fetch notifications.'], 500);
        }
    }

    public function markAllAsRead(int $userId)
    {
        try {
            if (auth()->user()->id != $userId) {
                return response()->json(['message' => 'Unauthorized action.'], 403);
            }

            Notification::where('user_id', $userId)
                        ->where('is_read', false)
                        ->update([
                            'is_read' => true,
                            'read_at' => now(),
                        ]);

            return response()->json(['message' => 'All notifications marked as read.']);
        } catch (\Exception $e) {
            Log::error('Error marking all notifications as read:', ['user_id' => $userId, 'error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to mark notifications as read.'], 500);
        }
    }
}