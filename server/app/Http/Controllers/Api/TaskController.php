<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return response()->json(Task::with(['fromDepartment', 'toDepartment', 'assignedBy', 'assignedTo'])->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'from_department_id' => 'required|exists:departments,id',
            'to_department_id' => 'required|exists:departments,id',
            'assigned_by' => 'required|exists:users,id',
            'assigned_to' => 'required|exists:users,id',
            'status' => 'in:pending,in_progress,done',
        ]);

        $task = Task::create($validated);
        return response()->json($task, 201);
    }

    public function show($id)
    {
        $task = Task::with(['fromDepartment', 'toDepartment', 'assignedBy', 'assignedTo'])->findOrFail($id);
        return response()->json($task);
    }

    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'from_department_id' => 'sometimes|required|exists:departments,id',
            'to_department_id' => 'sometimes|required|exists:departments,id',
            'assigned_by' => 'sometimes|required|exists:users,id',
            'assigned_to' => 'sometimes|required|exists:users,id',
            'status' => 'sometimes|in:pending,in_progress,done',
        ]);

        $task->update($validated);
        return response()->json($task);
    }

    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();
        return response()->json(null, 204);
    }
}
