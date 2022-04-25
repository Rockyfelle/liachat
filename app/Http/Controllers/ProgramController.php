<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Program;
use App\Models\Channel;
use App\Models\Message;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
	public function init(Request $request, $programId, $channelId)
	{	
		if (Auth::user()) {

			//Is authenticated
			if ($programId) {

				//Get list of programs user has access to
				$allPrograms = Auth::user()->programs;

				$program = $allPrograms->where('id', $programId)->first();

				if ($program) {

					$program->channels;
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
							return ['success' => false, 'text' => 'Error channel not found'];
						}
					} else {
						//Channel not specified
						return ['success' => false, 'text' => 'Channel not specified'];
					}
				} else {
					//Error program not found
					return ['success' => false, 'text' => 'Error program not found or user not authorized'];
				}
			} else {
				//Program not specified
				return ['success' => false, 'text' => 'Program not specified'];
			}
		} else {
			//Not Logged In
			return ['success' => false, 'text' => 'You are not logged in'];
		}
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
