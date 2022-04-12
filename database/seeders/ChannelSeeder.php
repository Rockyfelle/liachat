<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Channel;

class ChannelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		Channel::create([
			'program_id' => 1,
			'name' => 'Introduction to Web Security',
		]);

		Channel::create([
			'program_id' => 1,
			'name' => 'Assignments',
		]);

		Channel::create([
			'program_id' => 1,
			'name' => 'General Chat',
		]);

		Channel::create([
			'program_id' => 1,
			'name' => 'Hidden Channel',
		]);
    }
}
