<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\TaskStatus;
use App\Models\TaskCategory;
use App\Models\TaskAttachment;
use App\Models\User;         
use App\Models\Department;     
use App\Models\Role;           
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

// Import WhatsAppController jika method sendNotification ada di sana
use App\Http\Controllers\Api\WhatsAppController;

class TaskController extends Controller
{
    /**
     * Get the phone number of a manager/supervisor for a given department.
     * Assumes a user with role 'Manager' or 'Supervisor' in that department.
     *
     * @param int $departmentId
     * @return string|null The manager's phone number or null if not found.
     */
    private function getSupervisorPhoneNumberByDepartmentId(int $departmentId): ?string
    {
        $supervisorRole = Role::whereIn('name', ['Supervisor'])->first();

        if (!$supervisorRole) {
            Log::warning('Supervisor role not found in database for notification.');
            return null;
        }

        $supervisor = User::where('department_id', $departmentId)
                       ->where('role_id', $supervisorRole->id)
                       ->first();

        return $supervisor ? $supervisor ->phone : null;
    }

    /**
     * Send a WhatsApp notification via a static service method.
     *
     * @param string $number The recipient's phone number.
     * @param string $message The message to send.
     * @return bool True if notification was attempted (service call made), false otherwise.
     */
    private function sendWhatsAppNotification(string $number, string $message): bool
    {
        if (!$number) {
            Log::warning('WhatsApp notification skipped: Phone number is null or empty.', ['message_preview' => substr($message, 0, 50) . '...']);
            return false;
        }
        try {
            // Asumsi WhatsAppController memiliki method sendNotificationStatic yang public static
            WhatsAppController::sendNotificationStatic($number, $message);
            Log::info('WhatsApp notification sent:', ['number' => $number, 'message_preview' => substr($message, 0, 50) . '...']);
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to send WhatsApp notification:', ['number' => $number, 'error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return false;
        }
    }

    /**
     * Display a listing of all tasks.
     * Includes all relevant relations for detailed display.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $tasks = Task::with([
                'requester', 'requestedByDepartment', 'assignedToDepartment',
                'approver', 'assignee', 'category', 'currentStatus', 'lastActionBy'
            ])->get();

            return response()->json($tasks);
        } catch (\Exception $e) {
            Log::error('Failed to fetch tasks:', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return response()->json(['message' => 'Failed to fetch tasks.', 'debug_error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified task.
     *
     * @param  \App\Models\Task  $task  The Task model instance (Route Model Binding).
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Task $task)
    {
        try {
            $task->load([
                'requester', 'requestedByDepartment', 'assignedToDepartment',
                'approver', 'assignee', 'category', 'currentStatus',
                'attachments', 'comments.user', 'lastActionBy'
            ]);
            return response()->json($task);
        } catch (\Exception $e) {
            Log::error('Failed to fetch task details:', ['id' => $task->id, 'error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return response()->json(['message' => 'Task not found or failed to fetch details.', 'debug_error' => $e->getMessage()], 404);
        }
    }

    /**
     * Store a newly created task in storage.
     * This method aligns with the complex task workflow including initial notification.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        Log::info('Incoming Task Submission Request:', $request->all());
        Log::info('Request has files:', ['has_files' => $request->hasFile('attachments')]);

        try {
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'purpose' => 'nullable|string|max:255',
                'task_category_id' => 'required|integer|exists:task_categories,id',
                'requester_id' => 'required|integer|exists:users,id',
                'requested_by_department_id' => 'required|integer|exists:departments,id',
                'assigned_to_department_id' => 'required|integer|exists:departments,id',
                'priority' => 'required|string|in:Normal,Medium,High,Urgent',
                'deadline' => 'nullable|date',
                'notes' => 'nullable|string',
                'attachments' => 'nullable|array|max:5',
                'attachments.*' => 'file|max:5000|mimes:pdf,doc,docx,xls,xlsx,jpg,jpeg,png,gif',
            ]);

            $pendingStatus = TaskStatus::where('name', 'Pending Approval (Requester Supervisor)')->first();
            if (!$pendingStatus) {
                Log::critical('Initial Task Status "Pending Approval (Requester Supervisor)" not found in database for new task submission.');
                return response()->json(['message' => 'Initial task status not configured in backend.'], 500);
            }

            DB::beginTransaction();

            $task = Task::create([
                'title' => $validatedData['title'],
                'description' => $validatedData['description'],
                'purpose' => $validatedData['purpose'],
                'task_category_id' => $validatedData['task_category_id'],
                'requester_id' => $validatedData['requester_id'],
                'requested_by_department_id' => $validatedData['requested_by_department_id'],
                'assigned_to_department_id' => $validatedData['assigned_to_department_id'],
                'priority' => $validatedData['priority'],
                'deadline' => $validatedData['deadline'],
                'notes' => $validatedData['notes'],
                'current_status_id' => $pendingStatus->id,
                'last_action_by_id' => $validatedData['requester_id'],
            ]);

            if ($request->hasFile('attachments')) {
                foreach ($request->file('attachments') as $file) {
                    $fileName = time() . '_' . $file->getClientOriginalName();
                    $filePath = $file->storeAs('task_attachments/' . $task->id, $fileName, 'public');

                    TaskAttachment::create([
                        'task_id' => $task->id,
                        'file_path' => $filePath,
                        'file_name' => $file->getClientOriginalName(),
                        'file_type' => $file->getClientMimeType(),
                        'file_size' => $file->getSize(),
                        'uploaded_by_id' => $validatedData['requester_id'],
                    ]);
                }
            }

            DB::commit();

            Log::info('Task submitted successfully:', ['task_id' => $task->id, 'requester_id' => $task->requester_id]);

            // --- Logika Notifikasi Setelah Tugas Diajukan (ke Atasan Requester) ---
            $requester = User::find($validatedData['requester_id']);
            if ($requester && $requester->department_id) {
                $supervisorPhone = $this->getSupervisorPhoneNumberByDepartmentId($requester->department_id);
                if ($supervisorPhone) {
                    $message = "Halo, Supervisor Departemen " . $requester->department->name . "! Tugas baru '" . $task->title . "' dari " . $requester->name . " membutuhkan persetujuan Anda. Cek di sistem.";
                    $this->sendWhatsAppNotification($supervisorPhone, $message);
                } else {
                    Log::warning('No supervisor phone found for department ' . $requester->department->name . ' to notify upon submission.');
                }
            } else {
                Log::warning('Requester or requester department not found for notification upon submission.');
            }
            // ------------------------------------------------------------------

            return response()->json(['message' => 'Task submitted successfully!', 'task' => $task->load('currentStatus', 'category', 'requester', 'requestedByDepartment', 'assignedToDepartment')], 201);

        } catch (ValidationException $e) {
            DB::rollBack();
            Log::warning('Task submission validation failed:', ['errors' => $e->errors(), 'request_data' => $request->all()]);
            return response()->json(['message' => 'Validation Error', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Task submission failed unexpectedly:', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString(), 'request_data' => $request->all()]);
            return response()->json(['message' => 'Server Error: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified task in storage.
     * This method will handle status changes, assignment, rejection, etc., including related notifications.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Task  $task  The Task model instance (Route Model Binding).
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(Request $request, Task $task)
    {
        try {
            $oldStatus = $task->currentStatus; // Dapatkan objek status lama
            $oldAssigneeId = $task->assignee_id; // Simpan assignee lama

            $validatedData = $request->validate([
                'title' => 'sometimes|required|string|max:255',
                'description' => 'sometimes|required|string',
                'purpose' => 'nullable|string|max:255',
                'task_category_id' => 'sometimes|required|integer|exists:task_categories,id',
                'assigned_to_department_id' => 'sometimes|required|integer|exists:departments,id',
                'approver_id' => 'nullable|integer|exists:users,id',
                'approved_at' => 'nullable|date',
                'assignee_id' => 'nullable|integer|exists:users,id',
                'assigned_at' => 'nullable|date',
                'current_status_id' => 'sometimes|required|integer|exists:task_statuses,id',
                'priority' => 'sometimes|required|string|in:Normal,Medium,High,Urgent',
                'deadline' => 'nullable|date',
                'rejection_reason' => 'nullable|string',
                'revision_notes' => 'nullable|string',
                'last_action_by_id' => 'nullable|integer|exists:users,id',
            ]);

            $validatedData['last_action_by_id'] = $request->user()->id; // Update last_action_by_id ke user yang mengambil aksi

            $task->update($validatedData);

            // Muat ulang relasi setelah update untuk respons yang konsisten
            $task->load([
                'requester', 'requestedByDepartment', 'assignedToDepartment',
                'approver', 'assignee', 'category', 'currentStatus',
                'attachments', 'comments.user', 'lastActionBy'
            ]);

            Log::info('Task updated successfully:', ['task_id' => $task->id, 'updated_by' => $request->user()->id, 'old_status_id' => $oldStatus->id, 'new_status_id' => $task->current_status_id]);

            // --- Logika Notifikasi Setelah Update Status Task ---
            $requester = $task->requester; // User yang mengajukan
            $requesterPhone = $requester ? $requester->phone : null;
            $currentStatusName = $task->currentStatus->name;
            $taskTitle = $task->title;

            // Dapatkan nomor telepon manajer departemen yang dituju (jika status Approved)
            $assignedToDeptSupervisorPhone = null;
            if ($task->assigned_to_department_id) {
                $assignedToDeptSupervisorPhone = $this->getSupervisorPhoneNumberByDepartmentId($task->assigned_to_department_id);
            }

            // Jika ada perubahan status
            if ($oldStatus->id !== $task->currentStatus->id) {
                switch ($currentStatusName) {
                    case 'Approved':
                        // Notifikasi ke Atasan Departemen Tujuan
                        if ($assignedToDeptSupervisorPhone) {
                            $message = "Halo, Supervisor Departemen " . $task->assignedToDepartment->name . "! Tugas baru '" . $taskTitle . "' telah disetujui oleh atasan pengaju dan menunggu untuk diterima departemen Anda. Cek di sistem.";
                            $this->sendWhatsAppNotification($assignedToDeptSupervisorPhone, $message);
                        } else {
                            Log::warning('No supervisor phone found for assigned department ' . $task->assignedToDepartment->name . ' to notify upon approval.');
                        }
                        break;

                    case 'Rejected (Supervisor)':
                        // Notifikasi ke Requester (Officer)
                        if ($requesterPhone) {
                            $message = "Halo, " . $requester->name . "! Tugas Anda '" . $taskTitle . "' telah DITOLAK oleh atasan. Alasan: " . ($task->rejection_reason ?: 'Tidak ada alasan spesifik.'). " Cek di sistem.";
                            $this->sendWhatsAppNotification($requesterPhone, $message);
                        }
                        break;

                    case 'Revision Requested':
                        // Notifikasi ke Requester (Officer)
                        if ($requesterPhone) {
                            $message = "Halo, " . $requester->name . "! Tugas Anda '" . $taskTitle . "' membutuhkan REVISI. Catatan: " . ($task->revision_notes ?: 'Tidak ada catatan spesifik.'). " Cek di sistem.";
                            $this->sendWhatsAppNotification($requesterPhone, $message);
                        }
                        break;

                    case 'Accepted':
                        // Notifikasi ke Requester bahwa tugas sudah diterima dan akan diproses
                        if ($requesterPhone) {
                            $message = "Halo, " . $requester->name . "! Tugas Anda '" . $taskTitle . "' telah DITERIMA oleh Departemen " . $task->assignedToDepartment->name . ". Tugas akan segera diproses. Cek di sistem.";
                            $this->sendWhatsAppNotification($requesterPhone, $message);
                        }
                        // Opsional: notifikasi ke assignee jika sudah ditentukan ($task->assignee)
                        break;

                    case 'In Progress':
                         // Notifikasi ke Requester (opsional, jika dari Accepted ke In Progress)
                        break;

                    case 'Completed':
                        // Notifikasi ke Requester bahwa tugas sudah selesai
                        if ($requesterPhone) {
                            $message = "Halo, " . $requester->name . "! Tugas Anda '" . $taskTitle . "' telah SELESAI dikerjakan oleh Departemen " . $task->assignedToDepartment->name . ". Cek di sistem.";
                            $this->sendWhatsAppNotification($requesterPhone, $message);
                        }
                        break;

                    case 'Rejected (Receiver)':
                        // Notifikasi ke Requester bahwa tugas ditolak oleh departemen penerima
                        if ($requesterPhone) {
                            $message = "Halo, " . $requester->name . "! Tugas Anda '" . $taskTitle . "' telah DITOLAK oleh Departemen " . $task->assignedToDepartment->name . ". Alasan: " . ($task->rejection_reason ?: 'Tidak ada alasan spesifik.'). " Cek di sistem.";
                            $this->sendWhatsAppNotification($requesterPhone, $message);
                        }
                        break;
                }
            }
            // -----------------------------------------------------------

            return response()->json(['message' => 'Task updated successfully!', 'task' => $task]);

        } catch (ValidationException $e) {
            Log::warning('Task update validation failed:', ['id' => $task->id, 'errors' => $e->errors()]);
            return response()->json(['message' => 'Validation Error', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Failed to update task:', ['id' => $task->id, 'error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return response()->json(['message' => 'Failed to update task.', 'debug_error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified task from storage.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Task $task)
    {
        try {
            $taskId = $task->id;
            $task->delete();

            // Opsional: Hapus folder attachment dari storage jika ada
            Storage::disk('public')->deleteDirectory('task_attachments/' . $taskId);

            Log::info('Task deleted successfully:', ['task_id' => $taskId]);
            return response()->json(['message' => 'Task deleted successfully!'], 204);
        } catch (\Exception $e) {
            Log::error('Failed to delete task:', ['id' => $task->id, 'error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return response()->json(['message' => 'Failed to delete task.', 'debug_error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get all departments.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getDepartments()
    {
        try {
            $departments = Department::all();
            return response()->json($departments);
        } catch (\Exception $e) {
            Log::error('Failed to fetch departments:', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return response()->json(['message' => 'Failed to fetch departments'], 500);
        }
    }

    /**
     * Get all task categories.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTaskCategories()
    {
        try {
            $taskCategories = TaskCategory::all();
            return response()->json($taskCategories);
        } catch (\Exception $e) {
            Log::error('Failed to fetch task categories:', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return response()->json(['message' => 'Failed to fetch task categories'], 500);
        }
    }

    /**
     * Get tasks pending approval for the authenticated user's department.
     * This is typically for Managers/Supervisors.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPendingApprovalTasks(Request $request)
    {
        try {
            $user = $request->user();

            if (!$user) {
                Log::error('Unauthorized access to getPendingApprovalTasks: No authenticated user found.');
                return response()->json(['message' => 'Authentication required or session invalid.'], 401);
            }

            if (is_null($user->department_id)) {
                Log::warning('User trying to access pending tasks has no assigned department:', ['user_id' => $user->id, 'user_email' => $user->email]);
                return response()->json(['message' => 'Your account is not associated with a department. Please contact HR/Admin.'], 403);
            }

            $pendingStatus = TaskStatus::where('name', 'Pending Approval (Requester Supervisor)')->first();

            if (!$pendingStatus) {
                Log::critical('Task Status "Pending Approval (Requester Supervisor)" not found in database.');
                return response()->json(['message' => 'Required task status not configured. Contact admin.'], 500);
            }

            $query = Task::query();
            $query->where('current_status_id', $pendingStatus->id);
            $query->where('requested_by_department_id', $user->department_id);
            $query->whereNull('approver_id');

            if ($request->has('search')) {
                $search = $request->input('search');
                $query->where(function($q) use ($search) {
                    $q->where('title', 'like', '%'.$search.'%')
                      ->orWhere('description', 'like', '%'.$search.'%');
                });
            }
            if ($request->has('priority') && $request->input('priority') !== 'All') {
                $query->where('priority', $request->input('priority'));
            }
            if ($request->has('requester_id') && $request->input('requester_id') !== null && $request->input('requester_id') !== 'All') {
                $query->where('requester_id', $request->input('requester_id'));
            }

            $tasks = $query->with([
                'requester', 'requestedByDepartment', 'assignedToDepartment',
                'category', 'currentStatus',
            ])->get();

            return response()->json($tasks);
        } catch (\Exception $e) {
            Log::error('Caught exception in getPendingApprovalTasks:', ['error_message' => $e->getMessage(), 'file' => $e->getFile(), 'line' => $e->getLine(), 'trace' => $e->getTraceAsString()]);
            return response()->json(['message' => 'Failed to fetch pending approval tasks. An unexpected error occurred.', 'debug_error' => $e->getMessage()], 500);
        }
    }
}