<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = [
        'name',
        'role',
        'bio',
        'avatar',
        'social',
        'sort',
        'is_active',
    ];

    protected $casts = [
        'social' => 'array',
        'is_active' => 'boolean',
    ];
}


