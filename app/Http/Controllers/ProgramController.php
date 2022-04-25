<?php

namespace App\Http\Controllers;

use App\Models\Program;
use App\Models\Channel;
use App\Models\Message;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
	public function init(Request $request, $programId, $channelId)
	{
		if ($programId) {

			//Is authenticated
			//if (Auth::user()) {
				//Get list of programs user has access to
				$allPrograms = Program::orderBy('id', 'DESC')
					->get();
				$program = Program::find($programId);
				$program->channels;

				if ($program) {

					if ($channelId) {

						$channel = Channel::find($channelId);
						if ($channel) {

							$messages = Message::orderBy('id', 'DESC')
								->where('channel_id', $channelId)
								->limit('20')
								->get();

							return ['success' => true, 'programs' => $allPrograms, 'program' => $program, 'channel' => $channel, 'messages' => $messages];
						} else {
							//Error channel not found
						}
					}
				} else {
					//Error program not found
				}
			}
		//} //else {
			//Not Logged In
		//}
	}

	public function program(Request $request, $id)
	{
		$program = Program::find($id);

		$program->channels;
		foreach ($program->channels as $channel) {
			$channel->program;
			$channel->messages;
			foreach ($channel->messages as $message) {
				$message->channel;
			}
		}

		return response()->json($program);
	}

	public function all(Request $request)
	{
		$programs = Program::all();
		foreach ($programs as $program) {
			$program->channels;
			foreach ($program->channels as $channel) {
				$channel->program;
				$channel->messages;
				foreach ($channel->messages as $message) {
					$message->channel;
				}
			}
		}
		return response()->json($programs);
	}
}
