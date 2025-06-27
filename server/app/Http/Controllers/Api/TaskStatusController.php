<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TaskStatus; // Import model TaskStatus Anda
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log; // Untuk logging
use Illuminate\Validation\ValidationException; // Untuk validasi error

class TaskStatusController extends Controller
{
    /**
     * Display a listing of the task statuses.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $taskStatuses = TaskStatus::all(); // Mengambil semua status tugas
            return response()->json($taskStatuses);
        } catch (\Exception $e) {
            Log::error('Failed to fetch task statuses:', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return response()->json(['message' => 'Failed to fetch task statuses.', 'debug_error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified task status.
     *
     * @param  \App\Models\TaskStatus  $taskStatus
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(TaskStatus $taskStatus) // Menggunakan Route Model Binding
    {
        try {
            return response()->json($taskStatus);
        } catch (\Exception $e) {
            Log::error('Failed to fetch task status:', ['id' => $taskStatus->id, 'error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return response()->json(['message' => 'Task status not found or failed to fetch.', 'debug_error' => $e->getMessage()], 404);
        }
    }

    /**
     * Store a newly created task status in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255|unique:task_statuses,name',
                'description' => 'nullable|string',
                'color_code' => 'nullable|string|max:7', // Contoh: #FFFFFF
            ]);

            $taskStatus = TaskStatus::create($validatedData);

            Log::info('Task status created successfully:', ['id' => $taskStatus->id, 'name' => $taskStatus->name]);
            return response()->json([
                'message' => 'Task status created successfully!',
                'task_status' => $taskStatus,
            ], 201);
        } catch (ValidationException $e) {
            Log::warning('Task status validation failed during store:', ['errors' => $e->errors()]);
            return response()->json(['message' => 'Validation Error', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Failed to store task status:', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return response()->json(['message' => 'Failed to store task status.', 'debug_error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified task status in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TaskStatus  $taskStatus
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(Request $request, TaskStatus $taskStatus) // Menggunakan Route Model Binding
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255|unique:task_statuses,name,' . $taskStatus->id, // Abaikan ID sendiri
                'description' => 'nullable|string',
                'color_code' => 'nullable|string|max:7',
            ]);

            $taskStatus->update($validatedData);

            Log::info('Task status updated successfully:', ['id' => $taskStatus->id, 'name' => $taskStatus->name]);
            return response()->json([
                'message' => 'Task status updated successfully!',
                'task_status' => $taskStatus,
            ]); // Default 200 OK
        } catch (ValidationException $e) {
            Log::warning('Task status validation failed during update:', ['id' => $taskStatus->id, 'errors' => $e->errors()]);
            return response()->json(['message' => 'Validation Error', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Failed to update task status:', ['id' => $taskStatus->id, 'error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return response()->json(['message' => 'Failed to update task status.', 'debug_error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified task status from storage.
     *
     * @param  \App\Models\TaskStatus  $taskStatus
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(TaskStatus $taskStatus) // Menggunakan Route Model Binding
    {
        try {
            $taskStatusName = $taskStatus->name;
            $taskStatusId = $taskStatus->id;

            // Periksa apakah ada tugas yang masih menggunakan status ini
            // Jika ada, mungkin perlu kebijkan: tolak hapus atau ubah status tugas tsb
            if ($taskStatus->tasks()->exists()) { // Asumsi ada relasi tasks() di model TaskStatus
                return response()->json([
                    'message' => 'Cannot delete task status. It is currently used by existing tasks.',
                    'task_status' => $taskStatus // Kirim kembali status yang gagal dihapus
                ], 409); // Conflict status
            }

            $taskStatus->delete();

            Log::info('Task status deleted successfully:', ['id' => $taskStatusId, 'name' => $taskStatusName]);
            return response()->json(['message' => 'Task status deleted successfully!'], 204); // 204 No Content

        } catch (\Exception $e) {
            Log::error('Failed to delete task status:', ['id' => $taskStatus->id, 'error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return response()->json(['message' => 'Failed to delete task status.', 'debug_error' => $e->getMessage()], 500);
        }
    }
}