<?php

// database/migrations/YYYY_MM_DD_create_task_categories_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('task_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique(); // e.g., 'IT Support', 'HR Data Update', 'Marketing Design Request'
            $table->text('description')->nullable();
            // Opsional: Jika kategori ini spesifik untuk departemen penerima
            $table->foreignId('department_id')->nullable()->constrained()->onDelete('set null');
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('task_categories');
    }
};