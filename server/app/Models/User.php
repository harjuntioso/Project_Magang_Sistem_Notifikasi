<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; // <<<--- PASTIKAN IMPORT INI ADA!

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens; // <<<--- DAN PASTIKAN 'HasApiTokens' ADA DI SINI!

    protected $fillable = [
        'name',
        'email',
        'phone', // Pastikan kolom ini di database bisa NULL atau punya default value
        'password',
        'department_id',
        'role_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Relasi ke Department
    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    // Relasi ke Role
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    // Relasi ke Leave Requests yang dia buat
    public function leaveRequests()
    {
        return $this->hasMany(LeaveRequest::class);
    }

    // Relasi ke tugas yang dia assigned
    public function assignedTasks()
    {
        return $this->hasMany(Task::class, 'assigned_to');
    }

    // Relasi ke tugas yang dia buat (assigned_by)
    public function createdTasks()
    {
        return $this->hasMany(Task::class, 'assigned_by');
    }
}