<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TaskCategory;
use App\Models\Department;   
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log; 

class TaskCategoryController extends Controller
{
    /**
     * Display a listing of the task categories.
     * Optionally includes department relation.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $taskCategories = TaskCategory::with('department')->get();
            return response()->json($taskCategories);
        } catch (\Exception $e) {
            Log::error('Failed to fetch task categories:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to fetch task categories.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified task category.
     *
     * @param  \App\Models\TaskCategory  $taskCategory
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(TaskCategory $taskCategory)
    {
        try {
            // Memuat relasi department saat menampilkan satu kategori
            $taskCategory->load('department');
            return response()->json($taskCategory);
        } catch (\Exception $e) {
            Log::error('Failed to fetch task category:', ['id' => $taskCategory->id, 'error' => $e->getMessage()]);
            return response()->json(['message' => 'Task category not found or failed to fetch.', 'error' => $e->getMessage()], 404);
        }
    }

    /**
     * Store a newly created task category in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255|unique:task_categories,name',
                'description' => 'nullable|string',
                'department_id' => 'nullable|integer|exists:departments,id', // department_id bisa null
            ]);

            $taskCategory = TaskCategory::create($validatedData);

            // Muat relasi setelah dibuat untuk respons yang konsisten
            $taskCategory->load('department');

            Log::info('Task category created successfully:', ['id' => $taskCategory->id, 'name' => $taskCategory->name]);
            return response()->json([
                'message' => 'Task category created successfully!',
                'task_category' => $taskCategory,
            ], 201);
        } catch (ValidationException $e) {
            Log::warning('Task category validation failed during store:', ['errors' => $e->errors()]);
            return response()->json(['message' => 'Validation Error', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Failed to store task category:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to store task category.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified task category in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TaskCategory  $taskCategory
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(Request $request, TaskCategory $taskCategory)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255|unique:task_categories,name,' . $taskCategory->id, // Abaikan ID sendiri
                'description' => 'nullable|string',
                'department_id' => 'nullable|integer|exists:departments,id',
            ]);

            $taskCategory->update($validatedData);

            // Muat relasi setelah diupdate untuk respons yang konsisten
            $taskCategory->load('department');

            Log::info('Task category updated successfully:', ['id' => $taskCategory->id, 'name' => $taskCategory->name]);
            return response()->json([
                'message' => 'Task category updated successfully!',
                'task_category' => $taskCategory,
            ]); // Default 200 OK
        } catch (ValidationException $e) {
            Log::warning('Task category validation failed during update:', ['id' => $taskCategory->id, 'errors' => $e->errors()]);
            return response()->json(['message' => 'Validation Error', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Failed to update task category:', ['id' => $taskCategory->id, 'error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to update task category.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified task category from storage.
     *
     * @param  \App\Models\TaskCategory  $taskCategory
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(TaskCategory $taskCategory)
    {
        try {
            $taskCategoryName = $taskCategory->name;
            $taskCategory->delete();

            Log::info('Task category deleted successfully:', ['id' => $taskCategory->id, 'name' => $taskCategoryName]);
            return response()->json(['message' => 'Task category deleted successfully!']); // Default 200 OK
        } catch (\Exception $e) {
            Log::error('Failed to delete task category:', ['id' => $taskCategory->id, 'error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to delete task category.', 'error' => $e->getMessage()], 500);
        }
    }
}