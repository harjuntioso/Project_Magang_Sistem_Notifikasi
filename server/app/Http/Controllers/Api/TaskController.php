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
use App\Http\Controllers\Api\WhatsAppController;

class TaskController extends Controller
{
    /**
     * Get the phone number of a manager/supervisor for a given department.
     * 
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
         
            WhatsAppController::sendNotificationStatic($number, $message);
            Log::info('WhatsApp notification sent:', ['number' => $number, 'message_preview' => substr($message, 0, 50) . '...']);
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to send WhatsApp notification:', ['number' => $number, 'error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return false;
        }
    }

    /**
     * Helper to construct the full task detail URL for the frontend.
     *
     * @param int $taskId
     * @return string
     */
    private function getFrontendTaskDetailUrl(int $taskId): string
    {
        $baseUrl = env('FRONTEND_APP_URL');
        if (!$baseUrl) {
            Log::error('FRONTEND_APP_URL not configured in .env. Task detail link will be generic.');
            return '#'; 
        }
        return "{$baseUrl}/task-exchange/detail/{$taskId}";
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
     * 
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
                    $taskDetailLink = $this->getFrontendTaskDetailUrl($task->id);
                     $message = "Halo, Supervisor Departemen " . $requester->department->name . "! Tugas baru '" . $task->title . "' dari " . $requester->name . " membutuhkan persetujuan Anda. Klik link untuk melihat: {$taskDetailLink}";
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
     * 
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Task  $task  The Task model instance (Route Model Binding).
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(Request $request, Task $task)
    {
        try {

            $task->load('requester', 'requestedByDepartment', 'assignedToDepartment', 'currentStatus', 'approver', 'assignee', 'lastActionBy');

            $oldStatus = $task->currentStatus; 

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

            // Set last_action_by_id ke user yang sedang login
            $validatedData['last_action_by_id'] = $request->user()->id;

            $task->update($validatedData); 

           
            $task->load([
                'requester', 'requestedByDepartment', 'assignedToDepartment',
                'approver', 'assignee', 'category', 'currentStatus',
                'attachments', 'comments.user', 'lastActionBy'
            ]);

            Log::info('Task updated successfully:', [
                'task_id' => $task->id,
                'updated_by' => $request->user()->id,
                'old_status_id' => $oldStatus->id,
                'new_status_id' => $task->currentStatus->id,
                'new_status_name' => $task->currentStatus->name,
            ]);

            // --- Logika Notifikasi WhatsApp Setelah Update Status Task ---
            $requester = $task->requester; 
            $requesterPhone = $requester ? $requester->phone : null;
            $currentStatusName = $task->currentStatus->name; 
            $taskTitle = $task->title;
            $taskDetailLink = $this->getFrontendTaskDetailUrl($task->id);

            $assignedToDeptSupervisorPhone = null;
            if ($task->assignedToDepartment) { 
                $assignedToDeptSupervisorPhone = $this->getSupervisorPhoneNumberByDepartmentId($task->assignedToDepartment->id);
            }

             if ($oldStatus->id !== $task->currentStatus->id) {
                switch ($currentStatusName) {
                    case 'Pending Acceptance (Receiver)':
                        if ($assignedToDeptSupervisorPhone) {
                            $message = "Halo, Supervisor Departemen " . ($task->assignedToDepartment->name ?? 'N/A') . "! Tugas baru '" . $taskTitle . "' dari Departemen " . ($task->requestedByDepartment->name ?? 'N/A') . " telah disetujui oleh atasan pengaju dan menunggu untuk diterima departemen Anda. Cek di sistem: {$taskDetailLink}"; // <<<--- Sisipkan link
                            $this->sendWhatsAppNotification($assignedToDeptSupervisorPhone, $message);
                        } else { Log::warning('No Supervisor phone for assigned dept to notify upon approval to Pending Acceptance.'); }
                        if ($requesterPhone) {
                            $messageRequester = "Halo, " . ($requester->name ?? 'Pengaju') . "! Tugas Anda '" . $taskTitle . "' telah DISETEJUI oleh atasan departemen Anda dan sekarang menunggu proses di departemen tujuan (" . ($task->assignedToDepartment->name ?? 'N/A') . "). Cek di sistem: {$taskDetailLink}"; // <<<--- Sisipkan link
                            $this->sendWhatsAppNotification($requesterPhone, $messageRequester);
                        }
                        break;

                    case 'Rejected (Supervisor)':
                        if ($requesterPhone) {
                            $message = "Halo, " . ($requester->name ?? 'Pengaju') . "! Tugas Anda '" . $taskTitle . "' telah DITOLAK oleh atasan. Alasan: " . ($task->rejection_reason ?: 'Tidak ada alasan spesifik.'). ". Cek di sistem: {$taskDetailLink}"; // <<<--- Sisipkan link
                            $this->sendWhatsAppNotification($requesterPhone, $message);
                        }
                        break;

                    case 'Revision Requested':
                        if ($requesterPhone) {
                            $message = "Halo, " . ($requester->name ?? 'Pengaju') . "! Tugas Anda '" . $taskTitle . "' membutuhkan REVISI. Catatan: " . ($task->revision_notes ?: 'Tidak ada catatan spesifik.'). ". Cek di sistem: {$taskDetailLink}"; // <<<--- Sisipkan link
                            $this->sendWhatsAppNotification($requesterPhone, $message);
                        }
                        if ($task->assignee && $task->assignee->department_id == ($task->assignedToDepartment->id ?? null) && $assignedToDeptSupervisorPhone) {
                             $messageSpv = "Halo, Supervisor Departemen " . ($task->assignedToDepartment->name ?? 'N/A') . "! Officer " . ($task->assignee->name ?? 'Pengaju Revisi') . " meminta REVISI untuk tugas '" . $taskTitle . "'. Catatan: " . ($task->revision_notes ?: 'Tidak ada catatan spesifik.'). " Mohon segera dicek di sistem. Cek di sistem: {$taskDetailLink}"; // <<<--- Sisipkan link
                             $this->sendWhatsAppNotification($assignedToDeptSupervisorPhone, $messageSpv);
                        }
                        break;

                    case 'Accepted':
                        if ($task->assignee && $task->assignee->phone) {
                            $messageAssignee = "Halo, " . ($task->assignee->name ?? 'Officer') . "! Anda memiliki tugas baru '" . $taskTitle . "' dari Departemen " . ($task->requestedByDepartment->name ?? 'N/A') . ". Tugas ini telah ditugaskan kepada Anda oleh Supervisor/Manager Anda. Mohon segera dicek di sistem dan mulai dikerjakan. Cek di sistem: {$taskDetailLink}"; // <<<--- Sisipkan link
                            $this->sendWhatsAppNotification($task->assignee->phone, $messageAssignee);
                        } else {
                            Log::warning('No assignee phone or assignee not found for notification upon task acceptance and assignment.', ['task_id' => $task->id, 'assignee_id' => $task->assignee_id ?? 'N/A']);
                        }
                        if ($requesterPhone) {
                            $messageRequester = "Halo, " . ($requester->name ?? 'Pengaju') . "! Tugas Anda '" . $taskTitle . "' telah DITERIMA dan DITUGASKAN kepada Officer (" . ($task->assignee->name ?? 'Officer') . ") di Departemen " . ($task->assignedToDepartment->name ?? 'N/A') . ". Cek di sistem: {$taskDetailLink}"; // <<<--- Sisipkan link
                            $this->sendWhatsAppNotification($requesterPhone, $messageRequester);
                        }
                        break;

                    case 'In Progress':
                        if ($requesterPhone) {
                            $messageRequester = "Halo, " . ($requester->name ?? 'Pengaju') . "! Tugas Anda '" . $taskTitle . "' sekarang SEDANG DIKERJAKAN oleh Officer di Departemen " . ($task->assignedToDepartment->name ?? 'N/A') . ". Cek di sistem: {$taskDetailLink}"; // <<<--- Sisipkan link
                            $this->sendWhatsAppNotification($requesterPhone, $messageRequester);
                        }
                        break;

                    case 'Completed':
                        if ($requesterPhone) {
                            $messageRequester = "Halo, " . ($requester->name ?? 'Pengaju') . "! Tugas Anda '" . $taskTitle . "' telah SELESAI dikerjakan oleh Departemen " . ($task->assignedToDepartment->name ?? 'N/A') . ". Cek di sistem: {$taskDetailLink}"; // <<<--- Sisipkan link
                            $this->sendWhatsAppNotification($requesterPhone, $messageRequester);
                        }
                        if ($assignedToDeptSupervisorPhone) {
                            $messageSpv = "Halo, Supervisor Departemen " . ($task->assignedToDepartment->name ?? 'N/A') . "! Tugas '" . $taskTitle . "' telah diselesaikan oleh " . ($task->assignee->name ?? 'Officer') . ". Mohon segera dicek di sistem. Cek di sistem: {$taskDetailLink}"; // <<<--- Sisipkan link
                            $this->sendWhatsAppNotification($assignedToDeptSupervisorPhone, $messageSpv);
                        }
                        break;

                    case 'Rejected (Receiver)':
                        if ($requesterPhone) {
                            $messageRequester = "Halo, " . ($requester->name ?? 'Pengaju') . "! Tugas Anda '" . $taskTitle . "' telah DITOLAK oleh Departemen " . ($task->assignedToDepartment->name ?? 'N/A') . ". Alasan: " . ($task->rejection_reason ?: 'Tidak ada alasan spesifik.'). ". Cek di sistem: {$taskDetailLink}"; // <<<--- Sisipkan link
                            $this->sendWhatsAppNotification($requesterPhone, $messageRequester);
                        }
                        break;

                    case 'Cancelled':
                        if ($requesterPhone) {
                            $messageRequester = "Halo, " . ($requester->name ?? 'Pengaju') . "! Tugas Anda '" . $taskTitle . "' telah DIBATALKAN. Cek di sistem: {$taskDetailLink}"; // <<<--- Sisipkan link
                            $this->sendWhatsAppNotification($requesterPhone, $messageRequester);
                        }
                        break;
                }
            }

            return response()->json(['message' => 'Task updated successfully!', 'task' => $task]);

        } catch (ValidationException $e) {
            Log::warning('Task update validation failed:', ['id' => $task->id, 'errors' => $e->errors()]);
            return response()->json(['message' => 'Validation Error', 'errors' => $e->errors()], 422);
        } catch (\Exception | \Throwable $e) {
            Log::error('Failed to update task:', ['id' => $task->id ?? 'N/A', 'error' => $e->getMessage(), 'file' => $e->getFile(), 'line' => $e->getLine(), 'trace' => $e->getTraceAsString()]);
            return response()->json(['message' => 'Failed to update task. An unexpected server error occurred.', 'debug_error' => $e->getMessage()], 500);
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

        $pendingApprovalStatus = TaskStatus::where('name', 'Pending Approval (Requester Supervisor)')->first();
        $pendingAcceptanceStatus = TaskStatus::where('name', 'Pending Acceptance (Receiver)')->first();
        $revisionRequestedStatus = TaskStatus::where('name', 'Revision Requested')->first();
        $acceptedStatus = TaskStatus::where('name', 'Accepted')->first();
        $inProgressStatus = TaskStatus::where('name', 'In Progress')->first();
        $completedStatus = TaskStatus::where('name', 'Completed')->first();
        $rejectedManagerStatus = TaskStatus::where('name', 'Rejected (Supervisor)')->first();
        $rejectedReceiverStatus = TaskStatus::where('name', 'Rejected (Receiver)')->first();
        $cancelledStatus = TaskStatus::where('name', 'Cancelled')->first();

        $managerRole = Role::where('name', 'Manager')->first();
        $supervisorRole = Role::where('name', 'Supervisor')->first();
        $adminRole = Role::where('name', 'Admin')->first();
        $officerRole = Role::where('name', 'Officer')->first();

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

        $counts = [
            'pendingApprovalByMe' => 0,
            'incomingToMyDept' => 0,
            'myTasksPendingProcessing' => 0,
            'myTasksPendingMySupervisorApproval' => 0,
            'myAssignedTasks' => 0, 
            'allTasksTotal' => 0,
        ];

        
        if (($managerRole && $userRoleId == $managerRole->id) || ($supervisorRole && $userRoleId == $supervisorRole->id)) {
            if ($userDepartmentId) {
                $counts['pendingApprovalByMe'] = Task::where('current_status_id', $pendingApprovalStatus->id)
                                                    ->where('requested_by_department_id', $userDepartmentId)
                                                    ->whereNull('approver_id')
                                                    ->count();
            }
        }

      
        if ($userDepartmentId) {
            $counts['incomingToMyDept'] = Task::where('assigned_to_department_id', $userDepartmentId)
                                            ->where('current_status_id', $pendingAcceptanceStatus->id)
                                            ->whereNull('assignee_id') 
                                            ->count();
        }

       
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

        if ($officerRole && $userRoleId == $officerRole->id) {
            $counts['myTasksPendingMySupervisorApproval'] = Task::where('requester_id', $userId)
                                                                ->where('current_status_id', $pendingApprovalStatus->id)
                                                                ->count();
        }

        if ($officerRole && $userRoleId == $officerRole->id) {
            $counts['myAssignedTasks'] = Task::where('assignee_id', $userId)
                                            ->whereIn('current_status_id', [
                                                $acceptedStatus->id, 
                                                $inProgressStatus->id, 
                                                $revisionRequestedStatus->id, 
                                            ])
                                            ->whereNotIn('current_status_id', [ 
                                                $completedStatus->id,
                                                $rejectedReceiverStatus->id,
                                                $cancelledStatus->id,
                                            ])
                                            ->count();
        }

        if ($adminRole && $userRoleId == $adminRole->id) {
            $counts['allTasksTotal'] = Task::count();
        }

        return response()->json($counts);
    }

     /**
     * Get tasks assigned to the authenticated user's department.
     * 
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getIncomingTasks(Request $request)
    {
        try {
            $user = $request->user(); 

            if (!$user || is_null($user->department_id)) {
                Log::warning('Unauthorized or unassigned user trying to fetch incoming tasks.', ['user_id' => $user ? $user->id : 'null']);
                return response()->json(['message' => 'Unauthorized or no department associated.'], 403);
            }

            $loggedInUserDepartmentId = $user->department_id;

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

            $query = Task::query();

            $query->where('assigned_to_department_id', $loggedInUserDepartmentId);

            $filterStatusName = $request->input('status');

            if ($filterStatusName && $filterStatusName !== 'All') {
                $statusObject = TaskStatus::where('name', $filterStatusName)->first();
                if ($statusObject) {
                    $query->where('current_status_id', $statusObject->id);
                } else {
                    Log::warning('Invalid task status filter received for incoming tasks.', ['status_name' => $filterStatusName]);
                
                }
            } else {
                $query->whereIn('current_status_id', [
                    $pendingAcceptanceStatus->id,
                    $acceptedStatus->id,
                    $inProgressStatus->id,
                    $revisionRequestedStatus->id,
                    $rejectedReceiverStatus->id,
                    $completedStatus->id,
                ]);
            }

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

            if ($request->has('requester_department_id') && $request->input('requester_department_id') !== 'All') {
                $query->where('requested_by_department_id', $request->input('requester_department_id'));
            }

            $tasks = $query->with([
                'requester',
                'requestedByDepartment',
                'assignedToDepartment',
                'category',
                'currentStatus',
                'assignee' 
            ])->get();

            return response()->json($tasks);

        } catch (\Exception $e) {
            Log::error('Caught exception in getIncomingTasks:', ['error_message' => $e->getMessage(), 'file' => $e->getFile(), 'line' => $e->getLine(), 'trace' => $e->getTraceAsString()]);
            return response()->json(['message' => 'Failed to fetch incoming tasks. An unexpected error occurred.', 'debug_error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get tasks submitted by the authenticated user.
     * 
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getMySubmittedTasks(Request $request)
    {
        try {
            $user = $request->user(); 

            if (!$user) {
                Log::error('Unauthorized access to getMySubmittedTasks: No authenticated user found.');
                return response()->json(['message' => 'Authentication required or session invalid.'], 401);
            }

            $loggedInUserId = $user->id;
            $allTaskStatuses = TaskStatus::all()->keyBy('name'); 

            $requiredStatuses = [
                'Pending Approval (Requester Supervisor)',
                'Pending Acceptance (Receiver)',
                'Accepted',
                'Revision Requested',                   
                'Completed',
                'Rejected (Receiver)', 
                'Rejected (Supervisor)', 
                'Cancelled' 
            ];
            foreach ($requiredStatuses as $statusName) {
                if (!$allTaskStatuses->has($statusName)) {
                    Log::critical('Missing required TaskStatus record in getMySubmittedTasks: ' . $statusName);
                    return response()->json(['message' => 'Internal Server Error: Task statuses not fully configured for submitted tasks.'], 500);
                }
            }


            $query = Task::query();
            $query->where('requester_id', $loggedInUserId);

            $filterStatusName = $request->input('status_name'); 

            if ($filterStatusName && $filterStatusName !== 'All') {
                if ($allTaskStatuses->has($filterStatusName)) {
                    $query->where('current_status_id', $allTaskStatuses[$filterStatusName]->id);
                } else {
                    Log::warning('Invalid task status filter received for my submitted tasks.', ['status_name' => $filterStatusName]);
                }
            }

            if ($request->has('assigned_to_department_id') && $request->input('assigned_to_department_id') !== 'All') {
                $query->where('assigned_to_department_id', $request->input('assigned_to_department_id'));
            }

            if ($request->has('search')) {
                $search = $request->input('search');
                $query->where(function($q) use ($search) {
                    $q->where('title', 'like', '%'.$search.'%')
                      ->orWhere('description', 'like', '%'.$search.'%');
                });
            }


            $tasks = $query->with([
                'assignedToDepartment', 
                'currentStatus',        
                'requester',            
            ])->get();

            return response()->json($tasks);

        } catch (\Exception $e) {
            Log::error('Caught exception in getMySubmittedTasks:', ['error_message' => $e->getMessage(), 'file' => $e->getFile(), 'line' => $e->getLine(), 'trace' => $e->getTraceAsString()]);
            return response()->json(['message' => 'Failed to fetch your submitted tasks. An unexpected error occurred.', 'debug_error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get tasks pending approval for the authenticated user's department.
     *
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
            $user = $request->user(); 

            if (!$user || is_null($user->id)) {
                Log::warning('Unauthorized or invalid user trying to fetch assigned tasks.', ['user_id' => $user ? $user->id : 'null']);
                return response()->json(['message' => 'Unauthorized. Please log in again.'], 401);
            }

            $loggedInUserId = $user->id;

            $acceptedStatus = TaskStatus::where('name', 'Accepted')->first();
            $inProgressStatus = TaskStatus::where('name', 'In Progress')->first();
            $completedStatus = TaskStatus::where('name', 'Completed')->first();
            $revisionRequestedStatus = TaskStatus::where('name', 'Revision Requested')->first();
          

            if (!$acceptedStatus || !$inProgressStatus || !$completedStatus || !$revisionRequestedStatus) {
                Log::critical('Missing one or more required TaskStatus records for getMyAssignedTasks logic.');
                return response()->json(['message' => 'Internal Server Error: Task statuses not fully configured for assigned tasks.'], 500);
            }

            $query = Task::query();


            $query->where('assignee_id', $loggedInUserId);

            $filterStatusName = $request->input('status');

            if ($filterStatusName && $filterStatusName !== 'All') {
                $statusObject = TaskStatus::where('name', $filterStatusName)->first();
                if ($statusObject) {
                    $query->where('current_status_id', $statusObject->id);
                } else {
                    Log::warning('Invalid task status filter received for assigned tasks.', ['status_name' => $filterStatusName]);
                }
            } else {
              
                $query->whereIn('current_status_id', [
                    $acceptedStatus->id,
                    $inProgressStatus->id,
                    $revisionRequestedStatus->id,
                    //$completedStatus->id, jika officer ingin melihat tugas yang sudah selesai
                    //$rejectedReceiverStatus->id, jika officer ingin melihat tugas yang ditolak oleh departemen penerima
                ]);
            }

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