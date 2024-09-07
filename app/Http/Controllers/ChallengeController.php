<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ChallengeResource;
use App\Http\Resources\UserResource;
use App\Models\Category;
use App\Models\Challenge;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ChallengeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Challenge::query();

        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if (request('name')) {
            $query->where('name', 'like', '%'.request('name').'%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }

        $challenges = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia('Challenge/Index', [
            'challenges' => ChallengeResource::collection($challenges),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $category = Category::query()->orderBy('name', 'asc')->get();
        $users = User::query()->orderBy('name', 'asc')->get();

        return inertia('Challenge/Create', [
            'category' => CategoryResource::collection($category),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if ($image) {
            $data['image_path'] = $image->store('challenge/'.Str::random(), 'public');
        }
        Challenge::create($data);

        return to_route('challenge.index')
            ->with('success', 'Challenge was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Challenge $challenge)
    {
        return inertia('Challenge/Show', [
            'challenge' => new ChallengeResource($challenge),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Challenge $challenge)
    {
        $category = Category::query()->orderBy('name', 'asc')->get();
        $users = User::query()->orderBy('name', 'asc')->get();

        return inertia('Challenge/Edit', [
            'challenge' => new ChallengeResource($challenge),
            'categories' => CategoryResource::collection($category),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Challenge $challenge)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        if ($image) {
            if ($challenge->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($challenge->image_path));
            }
            $data['image_path'] = $image->store('challenge/'.Str::random(), 'public');
        }
        $challenge->update($data);

        return to_route('challenge.index')
            ->with('success', "Challenge \"$challenge->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Challenge $challenge)
    {
        $name = $challenge->name;
        $challenge->delete();
        if ($challenge->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($challenge->image_path));
        }

        return to_route('challenge.index')
            ->with('success', "Challenge \"$name\" was deleted");
    }

    public function myChallenge()
    {
        $user = auth()->user();
        $query = Challenge::query()->where('assigned_user_id', $user->id);

        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if (request('name')) {
            $query->where('name', 'like', '%'.request('name').'%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }

        $challenge = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia('Challenge/Index', [
            'challenges' => ChallengeResource::collection($challenge),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }
}
