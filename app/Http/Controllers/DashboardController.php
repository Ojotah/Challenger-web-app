<?php

namespace App\Http\Controllers;

use App\Http\Resources\ChallengeResource;
use App\Models\Challenge;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $totalPendingChallenges = Challenge::query()
            ->where('status', 'pending')
            ->count();
        $myPendingChallenges = Challenge::query()
            ->where('status', 'pending')
            ->where('assigned_user_id', $user->id)
            ->count();

        $totalProgressChallenges = Challenge::query()
            ->where('status', 'in_progress')
            ->count();
        $myProgressChallenges = Challenge::query()
            ->where('status', 'in_progress')
            ->where('assigned_user_id', $user->id)
            ->count();

        $totalCompletedChallenges = Challenge::query()
            ->where('status', 'completed')
            ->count();
        $myCompletedChallenges = Challenge::query()
            ->where('status', 'completed')
            ->where('assigned_user_id', $user->id)
            ->count();

        $activeChallenges = Challenge::query()
            ->whereIn('status', ['pending', 'in_progress'])
            ->where('assigned_user_id', $user->id)
            ->limit(10)
            ->get();
        $activeChallenges = ChallengeResource::collection($activeChallenges);

        return inertia(
            'Dashboard',
            compact(
                'totalPendingChallenges',
                'myPendingChallenges',
                'totalProgressChallenges',
                'myProgressChallenges',
                'totalCompletedChallenges',
                'myCompletedChallenges',
                'activeChallenges'
            )
        );
    }
}
