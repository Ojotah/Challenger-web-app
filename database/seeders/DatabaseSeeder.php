<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Challenge;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'id' => 1,
            'name' => 'Challenger-1',
            'email' => 'challenger1@example.com',
            'password' => bcrypt('1234'),
            'email_verified_at' => time(),
        ]);
        User::factory()->create([
            'id' => 2,
            'name' => 'Challenger-2',
            'email' => 'challengerw@example.com',
            'password' => bcrypt('1234'),
            'email_verified_at' => time(),
        ]);

        Category::create([
            'id' => 1,
            'name' => 'Fitness Challenges',
            'description' => 'Challenges related to physical fitness and exercise.',
            'status' => 'active',
            'image_path' => 'path/to/fitness_image.jpg',
            'created_by' => 1,
            'updated_by' => 1,
        ]);

        Category::create([
            'id' => 2,
            'name' => 'Q&A Challenges',
            'description' => 'Challenges involving questions and quizzes.',
            'status' => 'active',
            'image_path' => 'path/to/q&a_image.jpg',
            'created_by' => 1,
            'updated_by' => 1,
        ]);

        Category::create([
            'id' => 3,
            'name' => 'Creative Challenges',
            'description' => 'Challenges focused on creative skills and projects.',
            'status' => 'active',
            'image_path' => 'path/to/creative_image.jpg',
            'created_by' => 1,
            'updated_by' => 1,
        ]);

        Challenge::create([
            'name' => 'Run a Marathon',
            'description' => 'Complete a full marathon within the year.',
            'deadline' => now()->addMonths(6),
            'status' => 'pending',
            'difficulty' => 'high',
            'image_path' => 'path/to/marathon_image.jpg',
            'assigned_user_id' => 1,
            'created_by' => 2,
            'updated_by' => 1,
            'category_id' => 1,
        ]);

        Challenge::create([
            'name' => 'Complete a Puzzle',
            'description' => 'Solve a 1000-piece puzzle within a month.',
            'deadline' => now()->addMonths(1),
            'status' => 'in_progress',
            'difficulty' => 'medium',
            'image_path' => 'path/to/puzzle_image.jpg',
            'assigned_user_id' => 2,
            'created_by' => 1,
            'updated_by' => 1,
            'category_id' => 3,

        ]);

        Challenge::create([
            'name' => 'Cook a New Recipe',
            'description' => 'Prepare a new dish from a different cuisine.',
            'deadline' => now()->addWeeks(2),
            'status' => 'completed',
            'difficulty' => 'low',
            'image_path' => 'path/to/cooking_image.jpg',
            'assigned_user_id' => 1,
            'created_by' => 2,
            'updated_by' => 1,
            'category_id' => 3,
        ]);

        Challenge::create([
            'name' => 'Read a Book',
            'description' => 'Finish reading a book of your choice.',
            'deadline' => now()->addMonths(2),
            'status' => 'pending',
            'difficulty' => 'medium',
            'image_path' => 'path/to/book_image.jpg',
            'assigned_user_id' => 2,
            'created_by' => 1,
            'updated_by' => 1,
            'category_id' => 2,
        ]);
    }
}
