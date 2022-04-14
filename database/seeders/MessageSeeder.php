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
			'created_at' => '2020-01-01 00:00:00',
		]);

		Message::create([
			'user_id' => 3,
			'channel_id' => 4,
			'type' => 'text',
			'content' => 'You found the hidden channel!',
			'created_at' => '2020-01-02 00:00:00',
		]);

		Message::create([
			'user_id' => 3,
			'channel_id' => 3,
			'type' => 'text',
			'content' => 'Is everyone excited for the new assignment?!',
			'created_at' => '2020-01-03 00:00:00',
		]);

		Message::create([
			'user_id' => 1,
			'channel_id' => 3,
			'type' => 'text',
			'content' => 'Oh yeah!!!! I cant wait',
			'created_at' => '2020-01-04 00:00:00',
		]);

		Message::create([
			'user_id' => 2,
			'channel_id' => 3,
			'type' => 'text',
			'content' => 'Yay... more work...',
			'created_at' => '2020-01-05 01:00:00',
		]);

		Message::create([
			'user_id' => 2,
			'channel_id' => 3,
			'type' => 'text',
			'content' => 'Yay... more work...',
			'created_at' => '2020-01-05 02:00:00',
		]);

		Message::create([
			'user_id' => 2,
			'channel_id' => 3,
			'type' => 'text',
			'content' => 'Yay... more work...',
			'created_at' => '2020-01-05 03:00:00',
		]);

		Message::create([
			'user_id' => 2,
			'channel_id' => 3,
			'type' => 'text',
			'content' => 'Yay... more work...',
			'created_at' => '2020-01-05 03:04:00',
		]);

		Message::create([
			'user_id' => 2,
			'channel_id' => 3,
			'type' => 'text',
			'content' => 'Yay... more work...',
			'created_at' => '2020-01-05 03:04:01',
		]);

		//Message::factory()->count(50)->create();
	}
}
