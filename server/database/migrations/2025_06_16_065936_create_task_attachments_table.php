<?php

// database/migrations/YYYY_MM_DD_create_task_attachments_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('task_attachments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('task_id')->constrained('tasks')->onDelete('cascade');
            $table->string('file_path'); // Path relatif di storage
            $table->string('file_name'); // Nama asli file
            $table->string('file_type')->nullable(); // MIME type, e.g., 'image/jpeg', 'application/pdf'
            $table->unsignedBigInteger('file_size')->nullable(); // Ukuran dalam bytes
            $table->foreignId('uploaded_by_id')->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('task_attachments');
    }
};
