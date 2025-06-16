<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TaskCategory;

class TaskCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TaskCategory::insert([
            [
                'name' => 'IT Support',
                'description' => 'Permintaan bantuan terkait masalah IT.',
                'department_id' => 1011, // Ganti dengan ID departemen IT Anda
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'HR Data Update',
                'description' => 'Permintaan perubahan data karyawan.',
                'department_id' => 1015, // Ganti dengan ID departemen HRD Anda
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Marketing Design Request',
                'description' => 'Permintaan desain materi pemasaran.',
                'department_id' => 1012, // Ganti dengan ID departemen Marketing Anda
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Tambahkan kategori lain sesuai kebutuhan
        ]);
    }
}