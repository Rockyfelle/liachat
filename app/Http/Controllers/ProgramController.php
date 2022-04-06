<?php

namespace App\Http\Controllers;
use App\Models\Program;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
    public function all(Request $request)
	{
		$programs = Program::all();
		foreach($programs as $program) {
			$program->channels;
			foreach($program->channels as $channel) {
				$channel->program;
				$channel->messages;
				foreach($channel->messages as $message) {
					$message->channel;
				}
			}
		}
		return response()->json($programs);
	}
}
