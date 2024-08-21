<?php

namespace App\Enums;

use Illuminate\Support\Str;

enum ChallengeStatus: string
{
    case Pending = 'pending';
    case Accepted = 'accepted';
    case Completed = 'completed';
    case Rejected = 'rejected';

    /**
     * Get the status in a more human-readable format.
     */
    public function label(): string
    {
        return Str::title($this->value);
    }
}
