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
		//Program not specified
		if (!$programId)
			return ['ok' => false, 'text' => 'Program not specified'];

		//Get list of programs user has access to
		$allPrograms = Auth::user()->programs;

		//Get program user is trying to access
		$program = $allPrograms->where('id', $programId)->first();
		error_log($allPrograms);

		//Program not found
		if (!$program)
			return ['ok' => false, 'text' => 'Error program not found or user not authorized'];

		//Get channels and resources of program
		$program->channels;
		$resources = $program->resources;
		foreach ($resources as $resource) {
			$link = $request->getHttpHost();
			$resource->stringyboi = 'http://' . $link . '/uploads/' . $resource->file_name . '.' . $resource->file_extension;
		}

		//Get users of program
		$users = $program->users;

		//Download channels and messages if applicable
		$channel = [];
		$messages = [];
		if ($channelId) {

			//Get channel user is trying to access
			$channel = Channel::find($channelId);

			//Channel not found
			if (!$channel)
				return ['ok' => false, 'text' => 'Error channel not found'];

			//Get messages of channel
			$messages = Message::orderBy('id', 'DESC')
				->where('channel_id', $channelId)
				->limit('20')
				->get();

			//Get message properties
			foreach ($messages as $message) {
				$message->user;
			}
		}

		//Return success
		return ['ok' => true, 'programs' => $allPrograms, 'program' => $program, 'channel' => $channel, 'resources' => $resources, 'messages' => $messages, 'users' => $users];
	}

	public function load(Request $request, $id)
	{

		//If program ID is not specified, error
		if (!$id)
			return ['ok' => false, 'text' => 'Program not specified'];
		
		//Get specified program
		$program = Program::find($id);

		//If program does not exist, error
		if (!$program)
			return ['ok' => false, 'text' => 'Program does not exist'];

		//Download props for program
		$program->channels;

		return ['ok' => true, 'program' => $program];
	}
}
