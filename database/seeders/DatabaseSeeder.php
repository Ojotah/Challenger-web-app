<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Challenge;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create 10 users
        User::factory(10)->create();
        User::factory()->create([
            'id' => 1111,
            'name' => 'admin-1',
            'email' => 'admin@example.com',
            'password' => bcrypt('1234'),
            'email_verified_at' => time(),
        ]);
        // Create 10 categories
        $categories = [
            ['name' => 'Fitness Challenges', 'description' => 'Challenges related to physical fitness and exercise.'],
            ['name' => 'Q&A Challenges', 'description' => 'Challenges involving questions and quizzes.'],
            ['name' => 'Creative Challenges', 'description' => 'Challenges focused on creative skills and projects.'],
            ['name' => 'Coding Challenges', 'description' => 'Challenges related to coding and development.'],
            ['name' => 'Outdoor Adventures', 'description' => 'Challenges related to outdoor activities.'],
            ['name' => 'Health & Wellness', 'description' => 'Challenges focused on improving health and wellness.'],
            ['name' => 'Productivity', 'description' => 'Challenges aimed at increasing productivity.'],
            ['name' => 'Skill Improvement', 'description' => 'Challenges to improve specific skills.'],
            ['name' => 'Reading & Writing', 'description' => 'Challenges related to reading and writing.'],
            ['name' => 'Miscellaneous', 'description' => 'Other challenges that don\'t fit in specific categories.'],
        ];

        foreach ($categories as $key => $category) {
            Category::create([
                'id' => $key + 1,
                'name' => $category['name'],
                'description' => $category['description'],
                'image_path' => "path/to/category{$key}_image.jpg", // Example image path
                'created_by' => 1, // Assuming user 1 created all
                'updated_by' => 1,
            ]);
        }

        // Create 50 challenges
        foreach (range(1, 50) as $i) {
            Challenge::create([
                'name' => "Challenge {$i}",
                'description' => "Description for challenge {$i}",
                'deadline' => now()->addMonths(rand(1, 6)),
                'status' => ['pending', 'in_progress', 'completed'][rand(0, 2)],
                'difficulty' => ['low', 'medium', 'high'][rand(0, 2)],
                'image_path' => "path/to/challenge{$i}_image.jpg", // Example image path
                'assigned_user_id' => rand(1, 10), // Assigning to a random user
                'created_by' => rand(1, 10),
                'updated_by' => rand(1, 10),
                'category_id' => rand(1, 10), // Assigning to a random category
            ]);
        }
    }
}
