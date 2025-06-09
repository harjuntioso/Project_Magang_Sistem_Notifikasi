<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Task;

class Department extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function users()
    {
        return $this->hasMany(\App\Models\User::class);
    }

    public function tasksFrom()
    {
        return $this->hasMany(Task::class, 'from_department_id');
    }

    public function tasksTo()
    {
        return $this->hasMany(Task::class, 'to_department_id');
    }
}
