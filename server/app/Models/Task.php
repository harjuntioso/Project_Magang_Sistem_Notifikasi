<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'purpose', 
        'task_category_id',
        'requester_id',
        'requested_by_department_id', 
        'assigned_to_department_id',  
        'approver_id', 
        'approved_at', 
        'assignee_id',
        'assigned_at', 
        'current_status_id', 
        'priority', 
        'deadline', 
        'rejection_reason', 
        'revision_notes', 
        'last_action_by_id',
    ];

    // Kolom-kolom yang harus di-cast ke tipe data tertentu
    protected $casts = [
        'deadline' => 'date',
        'approved_at' => 'datetime',
        'assigned_at' => 'datetime',
    ];


    // Relasi ke kategori tugas
    public function category()
    {
        return $this->belongsTo(TaskCategory::class, 'task_category_id');
    }

    // Relasi ke user yang mengajukan tugas
    public function requester()
    {
        return $this->belongsTo(User::class, 'requester_id');
    }

    // Relasi ke departemen pengaju tugas
    public function requestedByDepartment()
    {
        return $this->belongsTo(Department::class, 'requested_by_department_id');
    }

    // Relasi ke departemen yang dituju/penerima tugas
    public function assignedToDepartment()
    {
        return $this->belongsTo(Department::class, 'assigned_to_department_id');
    }

    // Relasi ke user yang menyetujui tugas (manajer pengaju)
    public function approver()
    {
        return $this->belongsTo(User::class, 'approver_id');
    }

    // Relasi ke user yang ditugaskan untuk mengerjakan tugas (di departemen penerima)
    public function assignee()
    {
        return $this->belongsTo(User::class, 'assignee_id');
    }

    // Relasi ke status tugas saat ini
    public function currentStatus()
    {
        return $this->belongsTo(TaskStatus::class, 'current_status_id');
    }

    // Relasi ke lampiran-lampiran tugas
    public function attachments()
    {
        return $this->hasMany(TaskAttachment::class);
    }

    // Relasi ke komentar-komentar tugas
    public function comments()
    {
        return $this->hasMany(TaskComment::class);
    }

    // Relasi ke user yang terakhir kali mengambil aksi pada tugas
    public function lastActionBy()
    {
        return $this->belongsTo(User::class, 'last_action_by_id');
    }
    
}