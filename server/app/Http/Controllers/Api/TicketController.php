<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function index()
    {
        return response()->json(Ticket::with(['creator', 'assignedTo'])->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'created_by' => 'required|exists:users,id',
            'assigned_to' => 'nullable|exists:users,id',
            'status' => 'in:open,in_progress,closed',
        ]);

        $ticket = Ticket::create($validated);
        return response()->json($ticket, 201);
    }

    public function show($id)
    {
        $ticket = Ticket::with(['creator', 'assignedTo'])->findOrFail($id);
        return response()->json($ticket);
    }

    public function update(Request $request, $id)
    {
        $ticket = Ticket::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'created_by' => 'sometimes|required|exists:users,id',
            'assigned_to' => 'nullable|exists:users,id',
            'status' => 'sometimes|in:open,in_progress,closed',
        ]);

        $ticket->update($validated);
        return response()->json($ticket);
    }

    public function destroy($id)
    {
        $ticket = Ticket::findOrFail($id);
        $ticket->delete();
        return response()->json(null, 204);
    }
}
