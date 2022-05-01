<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Program;
use App\Models\Channel;
use App\Models\Message;
use App\Models\ProgramResource;

class ProgramSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{

		$catalog = [
			[
				'name' => 'Web Security 50hp',
				'users' => [1, 2, 3, 4, 5],
				'resources'=> [
					[
						'file_name' => 'assignment',
						'file_extension'=> 'pdf',
						'user_id' => 3,
						'program_id' => 1,
					],
				],
				'channels' => [
					[
						'name' => 'Introduction to Web Security',
						'messages' => [
							[
								'user_id' => 3,
								'content' => 'Welcome to Web Security!',
							],
						]
					],
					[
						'name' => 'Assignments',
						'messages' => [
							[
								'user_id' => 3,
								'content' => 'Assignments will be here soon!',
							],
						]
					],
					[
						'name' => 'General Chat',
						'messages' => [
							[
								'user_id' => 1,
								'content' => 'First!',
							],
							[
								'user_id' => 2,
								'content' => 'faggot',
							],
							[
								'user_id' => 3,
								'content' => 'Hey now be respectful',
							],
							[
								'user_id' => 1,
								'content' => 'Nono he is actually a homosexual',
							],
							[
								'user_id' => 2,
								'content' => 'That is true...',
							],
							[
								'user_id' => 3,
								'content' => 'Alright fair enough, but watch your tone',
							],
						]
					],
					[
						'name' => 'Hidden Channel',
						'messages' => [
							[
								'user_id' => 5,
								'content' => 'OwO I\'m an admin',
							],
						]
					],
				]
			],
			[
				'name' => 'Web Security 70hp',
				'users' => [1, 2, 3, 4, 5],
				'resources' => [],
				'channels' => [
					[
						'name' => 'Introduction to Web Security',
						'messages' => [
							[
								'user_id' => 3,
								'content' => 'Welcome to Web Security!',
							],
						]
					],
				]
			],
		];

		foreach ($catalog as $program) {
			$newProgram = Program::create([
				'school_id' => 1,
				'name' => $program['name'],
			]);

			foreach($program['resources'] as $resource){
				ProgramResource::create([
					'user_id' => $resource['user_id'],
					'program_id' => $resource['program_id'],
					'hash' => 'hej',
					'file_name' => $resource['file_name'],
					'file_extension' => $resource['file_extension'],
				]);
			}

			foreach ($program['channels'] as $channel) {
				$newChannel = Channel::create([
					'program_id' => $newProgram->id,
					'name' => $channel['name'],
				]);

				foreach ($channel['messages'] as $message) {
					Message::create([
						'user_id' => $message['user_id'],
						'channel_id' => $newChannel->id,
						'type' => 'text',
						'content' => $message['content'],
					]);
				}
			}
		}


		/*Program::create([
			'school_id' => 1,
			'name' => 'Web Security 50HP',
		]);

		Program::create([
			'school_id' => 1,
			'name' => 'Only Teachers',
		]);

		Program::create([
			'school_id' => 1,
			'name' => 'Void',
		]);*/
	}
}
