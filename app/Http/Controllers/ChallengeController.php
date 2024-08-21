<?php

namespace App\Http\Controllers;

use App\Enums\ChallengeStatus;
use App\Services\ChallengeService;
use Illuminate\Http\Request;

class ChallengeController extends Controller
{
    protected ChallengeService $challengeService;

    public function __construct(ChallengeService $challengeService)
    {
        $this->challengeService = $challengeService;
    }

    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $challenge = $this->challengeService->createChallenge([
            'name' => $validated['name'],
            'user_id' => auth()->id(),
            'status' => ChallengeStatus::Pending,
        ]);

        return response()->json($challenge, 201);
    }

    public function accept($id): \Illuminate\Http\JsonResponse
    {
        $challenge = $this->challengeService->acceptChallenge($id);

        return response()->json($challenge);
    }

    public function approveCompletion($id): \Illuminate\Http\JsonResponse
    {
        $challenge = $this->challengeService->approveChallengeCompletion($id);

        return response()->json($challenge);
    }
}
