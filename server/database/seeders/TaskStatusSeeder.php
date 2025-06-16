<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TaskStatus;

class TaskStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TaskStatus::insert([
            [
                'name' => 'Pending Approval (Requester Manager)',
                'description' => 'Menunggu persetujuan dari manajer departemen pengaju.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Approved',
                'description' => 'Tugas telah disetujui oleh manajer departemen pengaju.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Rejected (Manager)',
                'description' => 'Tugas ditolak oleh manajer departemen pengaju.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
             [
                'name' => 'Pending Acceptance (Receiver)',
                'description' => 'Menunggu penerimaan tugas oleh departemen penerima.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Accepted',
                'description' => 'Tugas telah diterima oleh departemen penerima.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Revision Requested',
                'description' => 'Revisi tugas diminta.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'In Progress',
                'description' => 'Tugas sedang dikerjakan.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Completed',
                'description' => 'Tugas telah selesai.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                 'name' => 'Rejected (Receiver)',
                 'description' => 'Tugas ditolak oleh departemen penerima.',
                 'created_at' => now(),
                 'updated_at' => now(),
             ],
            [
                'name' => 'Cancelled',
                'description' => 'Tugas dibatalkan.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Tambahkan status lain sesuai kebutuhan
        ]);
    }
}