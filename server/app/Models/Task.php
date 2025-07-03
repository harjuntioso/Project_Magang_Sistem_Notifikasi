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

    protected $casts = [
        'deadline' => 'date',
        'approved_at' => 'datetime',
        'assigned_at' => 'datetime',
    ];

    public function category()
    {
        return $this->belongsTo(TaskCategory::class, 'task_category_id');
    }

    public function requester()
    {
        return $this->belongsTo(User::class, 'requester_id');
    }

    public function requestedByDepartment()
    {
        return $this->belongsTo(Department::class, 'requested_by_department_id');
    }


    public function assignedToDepartment()
    {
        return $this->belongsTo(Department::class, 'assigned_to_department_id');
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'approver_id');
    }

    public function assignee()
    {
        return $this->belongsTo(User::class, 'assignee_id');
    }


    public function currentStatus()
    {
        return $this->belongsTo(TaskStatus::class, 'current_status_id');
    }

    public function attachments()
    {
        return $this->hasMany(TaskAttachment::class);
    }

    public function comments()
    {
        return $this->hasMany(TaskComment::class);
    }

    public function lastActionBy()
    {
        return $this->belongsTo(User::class, 'last_action_by_id');
    }
    
}