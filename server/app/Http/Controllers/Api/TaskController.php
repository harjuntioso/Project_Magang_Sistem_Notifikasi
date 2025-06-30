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
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Task  $task  The Task model instance (Route Model Binding).
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(Request $request, Task $task)
    {
        try {
            $task->load('requester', 'assignedToDepartment', 'currentStatus', 'requestedByDepartment'); // Load 'requestedByDepartment' juga
            $oldStatus = $task->currentStatus;

            $validatedData = $request->validate([
                'title' => 'sometimes|required|string|max:255',
                'description' => 'sometimes|required|string',
                'purpose' => 'nullable|string|max:255',
                'task_category_id' => 'sometimes|required|integer|exists:task_categories,id',
                'requester_id' => 'sometimes|required|integer|exists:users,id',
                'requested_by_department_id' => 'sometimes|required|integer|exists:departments,id',
                'assigned_to_department_id' => 'sometimes|required|integer|exists:departments,id',
                'priority' => 'sometimes|required|string|in:Normal,Medium,High,Urgent',
                'deadline' => 'nullable|date',
                'notes' => 'nullable|string',
                'approver_id' => 'nullable|integer|exists:users,id', // Tambahkan validasi untuk approver_id
                'approved_at' => 'nullable|date',               // Tambahkan validasi untuk approved_at
                'assignee_id' => 'nullable|integer|exists:users,id',   // Tambahkan validasi untuk assignee_id
                'assigned_at' => 'nullable|date',               // Tambahkan validasi untuk assigned_at
                'current_status_id' => 'sometimes|required|integer|exists:task_statuses,id',
                'rejection_reason' => 'nullable|string',
                'revision_notes' => 'nullable|string',
            ]);

            $validatedData['last_action_by_id'] = $request->user()->id;

            $task->update($validatedData);

            $task->load([
                'requester', 'requestedByDepartment', 'assignedToDepartment',
                'approver', 'assignee', 'category', 'currentStatus',
                'attachments', 'comments.user', 'lastActionBy'
            ]);



            Log::info('Task updated successfully:', ['task_id' => $task->id, 'updated_by' => $request->user()->id, 'old_status_id' => $oldStatus->id, 'new_status_id' => $task->currentStatus->id]);

            // --- Logika Notifikasi WhatsApp Setelah Update Status Task ---
            $requester = $task->requester;
            $requesterPhone = $requester ? $requester->phone : null;
            $currentStatusName = $task->currentStatus->name;
            $taskTitle = $task->title;

            $assignedToDeptSupervisorPhone = null;
            if ($task->assigned_to_department_id) {
                $assignedToDeptSupervisorPhone = $this->getSupervisorPhoneNumberByDepartmentId($task->assigned_to_department_id);
            }

            // Dapatkan ID status dari database untuk perbandingan
            $approvedStatus = TaskStatus::where('name', 'Approved')->first(); // Ini adalah status 'Approved' yang sudah ada
            $pendingAcceptanceStatus = TaskStatus::where('name', 'Pending Acceptance (Receiver)')->first(); // KUNCI UTAMA
            $rejectedSupervisorStatus = TaskStatus::where('name', 'Rejected (Supervisor)')->first();
            $revisionRequestedStatus = TaskStatus::where('name', 'Revision Requested')->first();
            $acceptedStatus = TaskStatus::where('name', 'Accepted')->first();
            $inProgressStatus = TaskStatus::where('name', 'In Progress')->first();
            $completedStatus = TaskStatus::where('name', 'Completed')->first();
            $rejectedReceiverStatus = TaskStatus::where('name', 'Rejected (Receiver)')->first();

            // Pastikan semua status yang diperlukan ditemukan
            if (!$approvedStatus || !$pendingAcceptanceStatus || !$rejectedSupervisorStatus ||
                !$revisionRequestedStatus || !$acceptedStatus || !$completedStatus || !$rejectedReceiverStatus) {
                Log::critical('One or more required TaskStatus records are missing for notification logic in TaskController@update.');
                // Pertimbangkan untuk melemparkan exception atau mengembalikan response error
                return response()->json(['message' => 'Internal Server Error: Task statuses not fully configured for update notifications.'], 500);
            }

            if ($oldStatus->id !== $task->currentStatus->id) {
                switch ($task->currentStatus->id) { // Menggunakan ID status untuk keakuratan
                    // KASUS PENTING: SPV Pengaju MENYETUJUI
                    case ($pendingAcceptanceStatus->id): // Jika statusnya berubah menjadi 'Pending Acceptance (Receiver)'
                        // Ini berarti SPV Pengaju sudah menyetujui, dan sekarang tugas menunggu Dept Tujuan
                        if ($assignedToDeptSupervisorPhone) {
                            $message = "Halo, Supervisor Departemen " . $task->assignedToDepartment->name . "! Tugas baru '" . $taskTitle . "' dari Departemen " . $task->requestedByDepartment->name . " telah disetujui oleh atasan pengaju dan menunggu untuk diterima departemen Anda. Cek di sistem.";
                            $this->sendWhatsAppNotification($assignedToDeptSupervisorPhone, $message);
                        } else {
                            Log::warning('No Supervisor phone for assigned dept to notify when task is pending acceptance.');
                        }
                        // Notifikasi ke Requester bahwa tugasnya sudah disetujui atasan
                        if ($requesterPhone) {
                            $messageRequester = "Halo, " . $requester->name . "! Tugas Anda '" . $taskTitle . "' telah DISETEJUI oleh atasan departemen Anda dan sekarang menunggu proses di departemen tujuan (" . $task->assignedToDepartment->name . "). Cek di sistem.";
                            $this->sendWhatsAppNotification($requesterPhone, $messageRequester);
                        }
                        break;

                    case ($rejectedSupervisorStatus->id):
                        if ($requesterPhone) {
                            $message = "Halo, " . $requester->name . "! Tugas Anda '" . $taskTitle . "' telah DITOLAK oleh atasan. Alasan: " . ($task->rejection_reason ?: 'Tidak ada alasan spesifik.'). " Cek di sistem.";
                            $this->sendWhatsAppNotification($requesterPhone, $message);
                        }
                        break;

                    case ($revisionRequestedStatus->id): // Ketika Officer Minta Revisi ke SPV Tujuan
                        if ($assignedToDeptSupervisorPhone) {
                            $messageSpv = "Halo, Supervisor Departemen " . $task->assignedToDepartment->name . "! Officer " . $task->assignee->name . " meminta REVISI untuk tugas '" . $taskTitle . "'. Catatan: " . ($task->revision_notes ?: 'Tidak ada catatan spesifik.'). " Mohon segera dicek di sistem.";
                            $this->sendWhatsAppNotification($assignedToDeptSupervisorPhone, $messageSpv);
                        }
                        // Juga, bisa notifikasi ke Requester bahwa tugasnya memerlukan revisi (dari Officer)
                        if ($requesterPhone) {
                            $messageRequester = "Halo, " . $requester->name . "! Tugas Anda '" . $taskTitle . "' dari Departemen " . $task->assignedToDepartment->name . " membutuhkan REVISI. Catatan: " . ($task->revision_notes ?: 'Tidak ada catatan spesifik.'). " Cek di sistem.";
                            $this->sendWhatsAppNotification($requesterPhone, $messageRequester);
                        }
                        break;
                        
                    case ($acceptedStatus->id): // Ketika SPV Dept Tujuan MENERIMA & MENUGASKAN
                        if ($task->assignee && $task->assignee->phone) {
                            $message = "Halo, " . $task->assignee->name . "! Anda memiliki tugas baru '" . $taskTitle . "' dari Departemen " . $task->requestedByDepartment->name . ". Tugas ini telah ditugaskan kepada Anda oleh SPV Anda. Mohon segera dicek di sistem dan mulai dikerjakan. Cek di sistem.";
                            $this->sendWhatsAppNotification($task->assignee->phone, $message);
                        } else {
                            Log::warning('No assignee phone or assignee not found for notification upon task acceptance and assignment.');
                        }
                        // Juga, mungkin notifikasi ke requester bahwa tugasnya sudah diterima dan ditugaskan.
                        if ($requesterPhone) {
                            $messageRequester = "Halo, " . $requester->name . "! Tugas Anda '" . $taskTitle . "' telah DITERIMA dan DITUGASKAN kepada Officer (" . $task->assignee->name . ") di Departemen " . $task->assignedToDepartment->name . ". Cek di sistem.";
                            $this->sendWhatsAppNotification($requesterPhone, $messageRequester);
                        }
                        break;

                    case ($inProgressStatus->id): // Ketika Officer memulai pengerjaan
                        // Notifikasi ke Requester dan/atau SPV Departemen Tujuan bahwa tugas sudah mulai dikerjakan
                        if ($requesterPhone) {
                            $messageRequester = "Halo, " . $requester->name . "! Tugas Anda '" . $taskTitle . "' sekarang SEDANG DIKERJAKAN oleh Officer di Departemen " . $task->assignedToDepartment->name . ". Cek di sistem.";
                            $this->sendWhatsAppNotification($requesterPhone, $messageRequester);
                        }
                        break;

                    case ($completedStatus->id): // Ketika Officer menandai selesai
                        if ($requesterPhone) {
                            $message = "Halo, " . $requester->name . "! Tugas Anda '" . $taskTitle . "' telah SELESAI dikerjakan oleh Departemen " . $task->assignedToDepartment->name . ". Cek di sistem.";
                            $this->sendWhatsAppNotification($requesterPhone, $message);
                        }
                        // Notifikasi ke SPV Departemen Tujuan bahwa tugas sudah selesai
                        if ($assignedToDeptSupervisorPhone) {
                            $messageSpv = "Halo, Supervisor Departemen " . $task->assignedToDepartment->name . "! Tugas '" . $taskTitle . "' telah diselesaikan oleh " . $task->assignee->name . ". Mohon segera dicek di sistem.";
                            $this->sendWhatsAppNotification($assignedToDeptSupervisorPhone, $messageSpv);
                        }
                        break;

                    case ($rejectedReceiverStatus->id):
                        if ($requesterPhone) {
                            $message = "Halo, " . $requester->name . "! Tugas Anda '" . $taskTitle . "' telah DITOLAK oleh Departemen " . $task->assignedToDepartment->name . ". Alasan: " . ($task->rejection_reason ?: 'Tidak ada alasan spesifik.'). " Cek di sistem.";
                            $this->sendWhatsAppNotification($requesterPhone, $message);
                        }
                        break;
                }
            }

            return response()->json(['message' => 'Task updated successfully!', 'task' => $task]);

        } catch (ValidationException $e) {
            Log::warning('Task update validation failed:', ['errors' => $e->errors(), 'request_data' => $request->all()]);
            return response()->json(['message' => 'Validation Error', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Task update failed unexpectedly:', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString(), 'request_data' => $request->all()]);
            return response()->json(['message' => 'Server Error: ' . $e->getMessage()], 500);
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
     * Get counts for dashboard task statistics based on user's role and department.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTaskCounts(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            Log::error('Unauthorized access to getTaskCounts: No authenticated user found.');
            return response()->json(['message' => 'Unauthorized. Please log in again.'], 401);
        }

        $userId = $user->id;
        $userRoleId = $user->role_id;
        $userDepartmentId = $user->department_id;

        // Dapatkan ID status yang relevan dari database
        $pendingApprovalStatus = TaskStatus::where('name', 'Pending Approval (Requester Supervisor)')->first();
        $pendingAcceptanceStatus = TaskStatus::where('name', 'Pending Acceptance (Receiver)')->first();
        $revisionRequestedStatus = TaskStatus::where('name', 'Revision Requested')->first();
        $acceptedStatus = TaskStatus::where('name', 'Accepted')->first();
        $inProgressStatus = TaskStatus::where('name', 'In Progress')->first();
        $completedStatus = TaskStatus::where('name', 'Completed')->first();
        $rejectedManagerStatus = TaskStatus::where('name', 'Rejected (Supervisor)')->first();
        $rejectedReceiverStatus = TaskStatus::where('name', 'Rejected (Receiver)')->first();
        $cancelledStatus = TaskStatus::where('name', 'Cancelled')->first();

        // Dapatkan ID role
        $managerRole = Role::where('name', 'Manager')->first();
        $supervisorRole = Role::where('name', 'Supervisor')->first();
        $adminRole = Role::where('name', 'Admin')->first();
        $officerRole = Role::where('name', 'Officer')->first();

        // --- VERIFIKASI KEBERADAAN STATUS DAN ROLE ---
        if (
            !$pendingApprovalStatus || !$pendingAcceptanceStatus || !$revisionRequestedStatus ||
            !$acceptedStatus || !$inProgressStatus || !$completedStatus ||
            !$rejectedManagerStatus || !$rejectedReceiverStatus || !$cancelledStatus
        ) {
            Log::critical('Missing one or more required TaskStatus records in getTaskCounts. Please check TaskStatusSeeder and database.');
            return response()->json(['message' => 'Internal Server Error: Task statuses not fully configured.'], 500);
        }
        if (!$managerRole || !$supervisorRole || !$adminRole || !$officerRole) {
            Log::critical('Missing one or more required Role records (Manager, Supervisor, Admin, Officer) in getTaskCounts. Please check RoleSeeder and database.');
            return response()->json(['message' => 'Internal Server Error: User roles not fully configured.'], 500);
        }
        // ---------------------------------------------------------------------

        // Inisialisasi semua count ke 0
        $counts = [
            'pendingApprovalByMe' => 0,
            'incomingToMyDept' => 0,
            'myTasksPendingProcessing' => 0,
            'myTasksPendingMySupervisorApproval' => 0,
            'myAssignedTasks' => 0, // <-- TAMBAH COUNT BARU DI INISIALISASI
            'allTasksTotal' => 0,
        ];

        // 1. Tugas Menunggu Persetujuan Saya (Hanya untuk Supervisor/Manager departemen pengaju)
        if (($managerRole && $userRoleId == $managerRole->id) || ($supervisorRole && $userRoleId == $supervisorRole->id)) {
            if ($userDepartmentId) {
                $counts['pendingApprovalByMe'] = Task::where('current_status_id', $pendingApprovalStatus->id)
                                                    ->where('requested_by_department_id', $userDepartmentId)
                                                    ->whereNull('approver_id')
                                                    ->count();
            }
        }

        // 2. Tugas Baru Masuk ke Dept. Saya (Untuk Supervisor, Manager, Officer di dept. penerima)
        // Catatan: Ini harusnya hanya untuk SPV/Manager yang Menerima. Officer akan melihat di 'myAssignedTasks'.
        // Jadi, ubah role di frontend TaskExchangeDashboardPage.jsx untuk 'incomingToMyDept' menjadi ['Supervisor', 'Manager']
        if ($userDepartmentId) {
            $counts['incomingToMyDept'] = Task::where('assigned_to_department_id', $userDepartmentId)
                                            ->where('current_status_id', $pendingAcceptanceStatus->id)
                                            ->whereNull('assignee_id') // Memastikan belum ada yang ditugaskan di departemen penerima
                                            ->count();
        }

        // 3. Tugas Saya Menunggu Diproses (untuk pengaju: sudah disetujui/diterima, belum selesai, belum ditolak)
        $counts['myTasksPendingProcessing'] = Task::where('requester_id', $userId)
                                                ->whereIn('current_status_id', [
                                                    $pendingAcceptanceStatus->id,
                                                    $acceptedStatus->id,
                                                    $inProgressStatus->id,
                                                ])
                                                ->whereNotIn('current_status_id', [
                                                    $completedStatus->id,
                                                    $rejectedManagerStatus->id,
                                                    $rejectedReceiverStatus->id,
                                                    $revisionRequestedStatus->id,
                                                    $cancelledStatus->id,
                                                ])
                                                ->count();

        // 4. Tugas Saya Menunggu Persetujuan Atasan (Hanya untuk Officer)
        if ($officerRole && $userRoleId == $officerRole->id) {
            $counts['myTasksPendingMySupervisorApproval'] = Task::where('requester_id', $userId)
                                                                ->where('current_status_id', $pendingApprovalStatus->id)
                                                                ->count();
        }

        // 5. Tugas Ditugaskan Kepada Saya (BARU untuk Officer yang ditugaskan)
        if ($officerRole && $userRoleId == $officerRole->id) {
            $counts['myAssignedTasks'] = Task::where('assignee_id', $userId)
                                            ->whereIn('current_status_id', [
                                                $acceptedStatus->id, // Sudah diterima oleh SPV Dept Tujuan dan ditugaskan ke officer
                                                $inProgressStatus->id, // Sedang dikerjakan officer
                                                $revisionRequestedStatus->id, // Officer meminta revisi
                                            ])
                                            ->whereNotIn('current_status_id', [ // Kecualikan yang sudah selesai atau ditolak
                                                $completedStatus->id,
                                                $rejectedReceiverStatus->id,
                                                $cancelledStatus->id,
                                            ])
                                            ->count();
        }

        // 6. Total Tugas Sistem (Hanya untuk Admin)
        if ($adminRole && $userRoleId == $adminRole->id) {
            $counts['allTasksTotal'] = Task::count();
        }

        return response()->json($counts);
    }

     /**
     * Get tasks assigned to the authenticated user's department.
     * These are tasks for the receiving department to accept/process.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getIncomingTasks(Request $request)
    {
        try {
            $user = $request->user(); // User yang sedang login

            if (!$user || is_null($user->department_id)) {
                // Return 403 jika user tidak terautentikasi atau tidak memiliki departemen
                Log::warning('Unauthorized or unassigned user trying to fetch incoming tasks.', ['user_id' => $user ? $user->id : 'null']);
                return response()->json(['message' => 'Unauthorized or no department associated.'], 403);
            }

            // Dapatkan ID departemen user yang sedang login
            $loggedInUserDepartmentId = $user->department_id;

            // Dapatkan ID status yang relevan dari database
            $pendingAcceptanceStatus = TaskStatus::where('name', 'Pending Acceptance (Receiver)')->first();
            $acceptedStatus = TaskStatus::where('name', 'Accepted')->first();
            $inProgressStatus = TaskStatus::where('name', 'In Progress')->first();
            $revisionRequestedStatus = TaskStatus::where('name', 'Revision Requested')->first();
            $rejectedReceiverStatus = TaskStatus::where('name', 'Rejected (Receiver)')->first();
            $completedStatus = TaskStatus::where('name', 'Completed')->first();
            $rejectedManagerStatus = TaskStatus::where('name', 'Rejected (Supervisor)')->first(); // Juga perlu untuk filter 'All'

            if (
                !$pendingAcceptanceStatus || !$acceptedStatus || !$inProgressStatus ||
                !$revisionRequestedStatus || !$rejectedReceiverStatus || !$completedStatus || !$rejectedManagerStatus
            ) {
                Log::critical('Missing one or more required TaskStatus records for incoming tasks logic.');
                return response()->json(['message' => 'Internal Server Error: Task statuses not fully configured for incoming tasks.'], 500);
            }

            // Mulai query
            $query = Task::query();

            // Filter utama: tugas yang ditugaskan ke departemen user yang login
            $query->where('assigned_to_department_id', $loggedInUserDepartmentId);

            // Filter berdasarkan status dari frontend
            $filterStatusName = $request->input('status'); // Diterima sebagai nama status

            if ($filterStatusName && $filterStatusName !== 'All') {
                $statusObject = TaskStatus::where('name', $filterStatusName)->first();
                if ($statusObject) {
                    $query->where('current_status_id', $statusObject->id);
                } else {
                    Log::warning('Invalid task status filter received for incoming tasks.', ['status_name' => $filterStatusName]);
                    // Jangan crash, abaikan filter status jika tidak valid
                }
            } else {
                // Default: jika filterStatus 'All' atau tidak ada, tampilkan status yang aktif di departemen penerima
                $query->whereIn('current_status_id', [
                    $pendingAcceptanceStatus->id,
                    $acceptedStatus->id,
                    $inProgressStatus->id,
                    $revisionRequestedStatus->id,
                    // Opsional: tampilkan juga yang sudah ditolak/selesai jika 'All'
                    $rejectedReceiverStatus->id,
                    $completedStatus->id,
                ]);
            }


            // Filter berdasarkan pencarian
            if ($request->has('search')) {
                $search = $request->input('search');
                $query->where(function($q) use ($search) {
                    $q->where('title', 'like', '%'.$search.'%')
                      ->orWhere('description', 'like', '%'.$search.'%');
                });
            }

            // Filter berdasarkan prioritas
            if ($request->has('priority') && $request->input('priority') !== 'All') {
                $query->where('priority', $request->input('priority'));
            }

            // Filter berdasarkan departemen pengaju (jika ditambahkan di frontend)
            if ($request->has('requester_department_id') && $request->input('requester_department_id') !== 'All') {
                $query->where('requested_by_department_id', $request->input('requester_department_id'));
            }

            // Load relasi yang dibutuhkan untuk tampilan tabel
            $tasks = $query->with([
                'requester',
                'requestedByDepartment',
                'assignedToDepartment',
                'category',
                'currentStatus',
                'assignee' // Untuk menampilkan siapa yang ditugaskan
            ])->get();

            return response()->json($tasks);

        } catch (\Exception $e) {
            Log::error('Caught exception in getIncomingTasks:', ['error_message' => $e->getMessage(), 'file' => $e->getFile(), 'line' => $e->getLine(), 'trace' => $e->getTraceAsString()]);
            return response()->json(['message' => 'Failed to fetch incoming tasks. An unexpected error occurred.', 'debug_error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get tasks submitted by the authenticated user.
     * This is for the "My Submitted Tasks" page.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getMySubmittedTasks(Request $request)
    {
        try {
            $user = $request->user(); // User yang sedang login

            if (!$user) {
                Log::error('Unauthorized access to getMySubmittedTasks: No authenticated user found.');
                return response()->json(['message' => 'Authentication required or session invalid.'], 401);
            }

            // Dapatkan ID user yang login
            $loggedInUserId = $user->id;

            // Dapatkan ID status yang relevan dari database (untuk filtering dan logging)
            $allTaskStatuses = TaskStatus::all()->keyBy('name'); // Ambil semua status dan index by name

            // Pastikan semua status yang akan digunakan dalam query ada
            $requiredStatuses = [
                'Pending Approval (Requester Supervisor)', // Sudah benar
                'Pending Acceptance (Receiver)',       // <<<--- UBAH DARI 'Menunggu Proses di Penerima'
                'Accepted',                             // <<<--- UBAH DARI 'Diterima & Sedang Dikerjakan'
                'Revision Requested',                   // <<<--- UBAH DARI 'Pengajuan Revisi'
                'Completed',                            // <<<--- UBAH DARI 'Selesai'
                'Rejected (Receiver)',                  // <<<--- UBAH DARI 'Ditolak Penerima'
                'Rejected (Supervisor)',                // <<<--- UBAH DARI 'Ditolak Atasan' (Karena di DB: Rejected (Supervisor))
                'Cancelled'                             // <<<--- UBAH DARI 'Cancelled'
            ];
            foreach ($requiredStatuses as $statusName) {
                if (!$allTaskStatuses->has($statusName)) {
                    Log::critical('Missing required TaskStatus record in getMySubmittedTasks: ' . $statusName);
                    return response()->json(['message' => 'Internal Server Error: Task statuses not fully configured for submitted tasks.'], 500);
                }
            }


            // Mulai query: tugas yang diajukan oleh user yang login
            $query = Task::query();
            $query->where('requester_id', $loggedInUserId);

            // Filter berdasarkan status dari frontend
            $filterStatusName = $request->input('status_name'); // Diterima sebagai nama status

            if ($filterStatusName && $filterStatusName !== 'All') {
                if ($allTaskStatuses->has($filterStatusName)) {
                    $query->where('current_status_id', $allTaskStatuses[$filterStatusName]->id);
                } else {
                    Log::warning('Invalid task status filter received for my submitted tasks.', ['status_name' => $filterStatusName]);
                    // Jangan crash, abaikan filter status jika tidak valid
                }
            }

            // Filter berdasarkan departemen tujuan
            if ($request->has('assigned_to_department_id') && $request->input('assigned_to_department_id') !== 'All') {
                $query->where('assigned_to_department_id', $request->input('assigned_to_department_id'));
            }

            // Filter berdasarkan pencarian
            if ($request->has('search')) {
                $search = $request->input('search');
                $query->where(function($q) use ($search) {
                    $q->where('title', 'like', '%'.$search.'%')
                      ->orWhere('description', 'like', '%'.$search.'%');
                });
            }

            // Load relasi yang dibutuhkan untuk tampilan tabel
            $tasks = $query->with([
                'assignedToDepartment', // Departemen tujuan
                'currentStatus',        // Status saat ini
                'requester',            // User pengaju (untuk memastikan data lengkap)
            ])->get();

            return response()->json($tasks);

        } catch (\Exception $e) {
            // Log detail exception untuk debugging lebih lanjut
            Log::error('Caught exception in getMySubmittedTasks:', ['error_message' => $e->getMessage(), 'file' => $e->getFile(), 'line' => $e->getLine(), 'trace' => $e->getTraceAsString()]);
            return response()->json(['message' => 'Failed to fetch your submitted tasks. An unexpected error occurred.', 'debug_error' => $e->getMessage()], 500);
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

    /**
     * Get tasks assigned directly to the authenticated user (Officer's view).
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getMyAssignedTasks(Request $request)
    {
        try {
            $user = $request->user(); // User yang sedang login

            if (!$user || is_null($user->id)) {
                Log::warning('Unauthorized or invalid user trying to fetch assigned tasks.', ['user_id' => $user ? $user->id : 'null']);
                return response()->json(['message' => 'Unauthorized. Please log in again.'], 401);
            }

            $loggedInUserId = $user->id;

            // Dapatkan ID status yang relevan dari database
            $acceptedStatus = TaskStatus::where('name', 'Accepted')->first();
            $inProgressStatus = TaskStatus::where('name', 'In Progress')->first();
            $completedStatus = TaskStatus::where('name', 'Completed')->first();
            $revisionRequestedStatus = TaskStatus::where('name', 'Revision Requested')->first();
            // Tambahkan status lain yang relevan untuk officer, misal 'Rejected (Receiver)' jika perlu dilihat

            if (!$acceptedStatus || !$inProgressStatus || !$completedStatus || !$revisionRequestedStatus) {
                Log::critical('Missing one or more required TaskStatus records for getMyAssignedTasks logic.');
                return response()->json(['message' => 'Internal Server Error: Task statuses not fully configured for assigned tasks.'], 500);
            }

            $query = Task::query();

            // Filter utama: tugas yang ditugaskan kepada user yang login
            $query->where('assignee_id', $loggedInUserId);

            // Filter berdasarkan status dari frontend
            $filterStatusName = $request->input('status');

            if ($filterStatusName && $filterStatusName !== 'All') {
                $statusObject = TaskStatus::where('name', $filterStatusName)->first();
                if ($statusObject) {
                    $query->where('current_status_id', $statusObject->id);
                } else {
                    Log::warning('Invalid task status filter received for assigned tasks.', ['status_name' => $filterStatusName]);
                }
            } else {
                // Default: jika filter 'All' atau tidak ada, tampilkan status yang relevan untuk Officer
                $query->whereIn('current_status_id', [
                    $acceptedStatus->id,
                    $inProgressStatus->id,
                    $revisionRequestedStatus->id,
                    // Opsional: $completedStatus->id, jika officer ingin melihat tugas yang sudah selesai
                    // Opsional: $rejectedReceiverStatus->id, jika officer ingin melihat tugas yang ditolak oleh departemen penerima
                ]);
            }

            // Filter berdasarkan pencarian
            if ($request->has('search')) {
                $search = $request->input('search');
                $query->where(function($q) use ($search) {
                    $q->where('title', 'like', '%'.$search.'%')
                    ->orWhere('description', 'like', '%'.$search.'%');
                });
            }

            // Filter berdasarkan prioritas
            if ($request->has('priority') && $request->input('priority') !== 'All') {
                $query->where('priority', $request->input('priority'));
            }

            // Load relasi yang dibutuhkan untuk tampilan tabel
            $tasks = $query->with([
                'requester', 'requestedByDepartment', 'assignedToDepartment',
                'category', 'currentStatus', 'assignee'
            ])->get();

            return response()->json($tasks);

        } catch (\Exception $e) {
            Log::error('Caught exception in getMyAssignedTasks:', ['error_message' => $e->getMessage(), 'file' => $e->getFile(), 'line' => $e->getLine(), 'trace' => $e->getTraceAsString()]);
            return response()->json(['message' => 'Failed to fetch assigned tasks. An unexpected error occurred.', 'debug_error' => $e->getMessage()], 500);
        }
    }
}