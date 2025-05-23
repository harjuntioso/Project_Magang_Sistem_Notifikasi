<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {   
        \App\Models\User::factory(30)->create();

        // User::create([
        //     'name' => Str::random(10),
        //     'email' => Str::random(10).'@example.com',
        //     'phone' => '6285156762511',
        //     'password' => Hash::make('password'),
        // ]);
    }
}
