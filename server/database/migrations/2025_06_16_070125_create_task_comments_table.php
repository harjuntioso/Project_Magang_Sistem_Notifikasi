<?php

// database/migrations/YYYY_MM_DD_create_task_comments_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('task_comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('task_id')->constrained('tasks')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Siapa yang berkomentar
            $table->text('comment');
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('task_comments');
    }
};
