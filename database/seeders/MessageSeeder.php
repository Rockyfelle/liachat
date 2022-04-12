<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Message;

class MessageSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Message::create([
			'user_id' => 3,
			'channel_id' => 1,
			'type' => 'text',
			'content' => 'Welcome to the Web Security 50HP channel!',
		]);

		Message::create([
			'user_id' => 3,
			'channel_id' => 4,
			'type' => 'text',
			'content' => 'You found the hidden channel!',
		]);

		Message::create([
			'user_id' => 3,
			'channel_id' => 3,
			'type' => 'text',
			'content' => 'Is everyone excited for the new assignment?!',
		]);

		Message::create([
			'user_id' => 1,
			'channel_id' => 3,
			'type' => 'text',
			'content' => 'Oh yeah!!!! I cant wait',
		]);

		Message::create([
			'user_id' => 2,
			'channel_id' => 3,
			'type' => 'text',
			'content' => 'Yay... more work...',
		]);

		Message::factory()->count(50)->create();
	}
}
