<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Role; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log; 

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::with(['department', 'role'])->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string|unique:users,phone',
            'password' => 'required|string|min:6',
            'department_id' => 'required|exists:departments,id',
            'role_id' => 'required|exists:roles,id',
        ]);
        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);
        return response()->json($user, 201);
    }

    public function show($id)
    {
        $user = User::with(['department', 'role'])->findOrFail($id);
        return response()->json($user);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => ['sometimes', 'required', 'email', Rule::unique('users')->ignore($user->id)],
            'phone' => ['sometimes', 'required', 'string', Rule::unique('users')->ignore($user->id)],
            'password' => 'sometimes|nullable|string|min:6',
            'department_id' => 'sometimes|required|exists:departments,id',
            'role_id' => 'sometimes|required|exists:roles,id',
        ]);

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);
        return response()->json($user);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(null, 204);
    }
    
    /**
     * Get officers by department ID.
     * This is useful for populating dropdowns for task assignment.
     *
     * @param  int  $departmentId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getOfficersByDepartment(int $departmentId)
    {
        try {
            // Dapatkan ID role Officer
            $officerRole = Role::where('name', 'Officer')->first();

            if (!$officerRole) {
                Log::error('Officer role not found in database for getOfficersByDepartment.');
                return response()->json(['message' => 'Internal Server Error: Officer role not configured.'], 500);
            }

            // Ambil semua user di departemen yang diberikan dengan role Officer
            $officers = User::where('department_id', $departmentId)
                            ->where('role_id', $officerRole->id)
                            ->select('id', 'name') // Hanya ambil ID dan nama yang dibutuhkan
                            ->get();

            return response()->json($officers);
        } catch (\Exception $e) {
            Log::error('Failed to fetch officers for department ' . $departmentId . ':', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return response()->json(['message' => 'Failed to fetch officers.'], 500);
        }
    }
}