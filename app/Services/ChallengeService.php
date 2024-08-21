<?php

namespace App\Services;

use App\Enums\ChallengeStatus;
use App\Models\Challenge;
use Illuminate\Database\Eloquent\Model;

class ChallengeService extends BaseService
{
    /**
     * Get the model that the service is responsible for.
     */
    public function getModel(): Model
    {
        return new Challenge;
    }

    /**
     * Additional logic to handle challenge-specific business logic.
     */

    /**
     * Example method: Create a new challenge.
     */
    public function createChallenge(array $data): Challenge
    {
        // Implement custom logic before saving
        $challenge = $this->getModel()->create($data);

        // Fire custom events if needed
        $this->fireModelEvent('created', $challenge);

        return $challenge;
    }

    /**
     * Example method: Accept a challenge.
     */
    public function acceptChallenge(int $challengeId): \Illuminate\Database\Eloquent\Collection|Model
    {
        $challenge = $this->find($challengeId);

        // Implement custom logic to accept a challenge
        $challenge->status = ChallengeStatus::Accepted;
        $challenge->save();

        // Fire custom events if needed
        $this->fireModelEvent('accepted', $challenge);

        return $challenge;
    }

    /**
     * Example method: Approve a challenge completion.
     */
    public function approveChallengeCompletion(int $challengeId): \Illuminate\Database\Eloquent\Collection|Model
    {
        $challenge = $this->find($challengeId);

        // Implement custom logic to approve challenge completion
        $challenge->status = ChallengeStatus::Completed;
        $challenge->save();

        // Fire custom events if needed
        $this->fireModelEvent('completed', $challenge);

        return $challenge;
    }
}
