<?php

// database/migrations/YYYY_MM_DD_create_task_statuses_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('task_statuses', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique(); // e.g., 'Pending Approval (Requester Manager)', 'Approved', 'Rejected (Manager)', 'Pending Acceptance (Receiver)', 'Accepted', 'Revision Requested', 'In Progress', 'Completed', 'Rejected (Receiver)', 'Cancelled'
            $table->text('description')->nullable();
            $table->string('color_code')->nullable(); // Opsional, untuk representasi warna di UI
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('task_statuses');
    }
};