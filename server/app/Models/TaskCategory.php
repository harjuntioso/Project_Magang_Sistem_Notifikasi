<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskCategory extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'department_id'];
    protected $table = 'task_categories';

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}