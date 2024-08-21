<?php

namespace App\Models;

use App\Enums\ChallengeStatus;
use Illuminate\Database\Eloquent\Model;

class Challenge extends Model
{
    protected $fillable = ['name', 'user_id', 'status'];

    protected $casts = [
        'status' => ChallengeStatus::class,
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
