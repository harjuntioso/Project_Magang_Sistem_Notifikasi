<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    // List all departments
    public function index()
    {
        return response()->json(Department::all());
    }

    // Create new department
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
        ]);
        $department = Department::create($validated);
        return response()->json($department, 201);
    }

    // Show single department
    public function show($id)
    {
        $department = Department::findOrFail($id);
        return response()->json($department);
    }

    // Update department
    public function update(Request $request, $id)
    {
        $department = Department::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:100',
        ]);
        $department->update($validated);
        return response()->json($department);
    }

    // Delete department
    public function destroy($id)
    {
        $department = Department::findOrFail($id);
        $department->delete();
        return response()->json(null, 204);
    }
}
