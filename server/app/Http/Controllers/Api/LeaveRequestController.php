<?php

namespace App\Http\Controllers;

use App\Models\LeaveRequest;
use Illuminate\Http\Request;

class LeaveRequestController extends Controller
{
    public function index()
    {
        return response()->json(LeaveRequest::with(['user', 'approver'])->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'reason' => 'required|string',
            'status' => 'in:pending,approved,rejected',
            'approver_id' => 'nullable|exists:users,id',
        ]);

        $leaveRequest = LeaveRequest::create($validated);
        return response()->json($leaveRequest, 201);
    }

    public function show($id)
    {
        $leaveRequest = LeaveRequest::with(['user', 'approver'])->findOrFail($id);
        return response()->json($leaveRequest);
    }

    public function update(Request $request, $id)
    {
        $leaveRequest = LeaveRequest::findOrFail($id);

        $validated = $request->validate([
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date|after_or_equal:start_date',
            'reason' => 'sometimes|string',
            'status' => 'sometimes|in:pending,approved,rejected',
            'approver_id' => 'nullable|exists:users,id',
        ]);

        $leaveRequest->update($validated);
        return response()->json($leaveRequest);
    }

    public function destroy($id)
    {
        $leaveRequest = LeaveRequest::findOrFail($id);
        $leaveRequest->delete();
        return response()->json(null, 204);
    }
}
