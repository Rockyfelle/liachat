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
			return ['success' => false, 'text' => 'Program not specified'];

		//Get list of programs user has access to
		$allPrograms = Auth::user()->programs;

		//Get program user is trying to access
		$program = $allPrograms->where('id', $programId)->first();
		error_log($allPrograms);

		//Program not found
		if (!$program)
			return ['success' => false, 'text' => 'Error program not found or user not authorized'];

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
				return ['success' => false, 'text' => 'Error channel not found'];

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
		return ['success' => true, 'programs' => $allPrograms, 'program' => $program, 'channel' => $channel, 'resources' => $resources, 'messages' => $messages, 'users' => $users];
	}

	public function load(Request $request, $id)
	{
		$program = Program::find($id);

		$program->channels;

		return response()->json($program);
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
