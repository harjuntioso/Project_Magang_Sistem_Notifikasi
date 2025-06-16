<?php

// database/migrations/YYYY_MM_DD_create_tasks_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('purpose')->nullable(); // Tujuan pengajuan tugas

            // Siapa yang mengajukan tugas
            $table->foreignId('requester_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('requested_by_department_id')->constrained('departments')->onDelete('cascade');

            // Departemen yang dituju untuk mengerjakan tugas
            $table->foreignId('assigned_to_department_id')->constrained('departments')->onDelete('cascade');

            // Siapa yang menyetujui tugas di departemen pengaju (misal: Supervisor/Manager pengaju)
            $table->foreignId('approver_id')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('approved_at')->nullable(); // Waktu disetujui oleh manajer pengaju

            // Siapa yang ditugaskan secara spesifik di departemen penerima
            $table->foreignId('assignee_id')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('assigned_at')->nullable(); // Waktu ditugaskan ke individu

            $table->foreignId('task_category_id')->constrained('task_categories')->onDelete('cascade');
            $table->foreignId('current_status_id')->constrained('task_statuses')->onDelete('cascade'); // Status tugas saat ini

            $table->string('priority')->default('Normal'); // 'Normal', 'Medium', 'High', 'Urgent'
            $table->date('deadline')->nullable(); // Batas waktu penyelesaian

            // Kolom untuk feedback/status khusus
            $table->text('rejection_reason')->nullable(); // Alasan jika ditolak
            $table->text('revision_notes')->nullable();   // Catatan jika diminta revisi

            // Siapa yang mengambil aksi terakhir pada tugas (untuk logging/audit)
            $table->foreignId('last_action_by_id')->nullable()->constrained('users')->onDelete('set null');

            $table->timestamps(); // created_at, updated_at
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
