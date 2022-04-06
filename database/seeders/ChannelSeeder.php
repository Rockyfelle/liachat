<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ChannelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('channels')->insert([
			'program_id' => 1,
			'name' => 'Introduction to Web Security',
		]);

		DB::table('channels')->insert([
			'program_id' => 1,
			'name' => 'Assignments',
		]);

		DB::table('channels')->insert([
			'program_id' => 1,
			'name' => 'General Chat',
		]);

		DB::table('channels')->insert([
			'program_id' => 1,
			'name' => 'Hidden Channel',
		]);
    }
}
