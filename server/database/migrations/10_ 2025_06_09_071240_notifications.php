<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // <<<--- Logika untuk SKIPPING jika tabel sudah ada --->>>
        if (Schema::hasTable('notifications')) {
            // Jika tabel 'notifications' sudah ada, kita akan menambah kolom yang hilang jika belum ada.
            // Ini akan memastikan tabel lengkap tanpa membuat ulang.
            Schema::table('notifications', function (Blueprint $table) {
                if (!Schema::hasColumn('notifications', 'type')) {
                    $table->string('type')->nullable()->after('user_id');
                }
                if (!Schema::hasColumn('notifications', 'data')) {
                    $table->json('data')->nullable()->after('message');
                }
                if (!Schema::hasColumn('notifications', 'read_at')) {
                    $table->timestamp('read_at')->nullable()->after('is_read');
                }
            });
            return; // Penting: keluar dari fungsi up() setelah menambahkan kolom
        }
        // <<<--- Akhir logika SKIPPING / penambahan kolom jika sudah ada --->>>

        // Jika tabel 'notifications' BELUM ADA, maka buat tabel lengkap dengan semua kolom
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('type')->nullable(); // Menambahkan kolom 'type'
            $table->text('message');
            $table->json('data')->nullable(); // Menambahkan kolom 'data'
            $table->boolean('is_read')->default(false);
            $table->timestamp('read_at')->nullable(); // Menambahkan kolom 'read_at'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Logika untuk drop tabel. Ini akan menghapus tabel jika di-rollback.
        Schema::dropIfExists('notifications');
    }
};