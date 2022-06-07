<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Channel;
use App\Models\Message;
use App\Models\Program;
use App\Models\UserProgram;
use Illuminate\Http\Request;

class ChannelController extends Controller
{
	public function all(Request $request, $id, $dateTo, $count)
	{/*
		$channel = Channel::find($id);
		$channel->program;

		$messages = Message::orderBy('created_at', 'DESC')
			->where('channel_id', $id)
			//->where('created_at', '<', $dateTo)
			->where('id', '<', 999)
			->limit($count)
			->get();

		foreach ($messages as $message) {
			$message->channel;
			$message->user;
		}

		//Return data
		return response()->json(['channel' => $channel, 'messages' => $messages]);*/
		return ['ok' => true, 'text' => 'Not implemented'];
	}

	public function new(Request $request, $id, $lastMessage)
	{
		//Error if channel isn't specified
		if (!$id) {
			return ['ok' => false, 'text' => 'Channel not specified'];
		}

		//Error if lastMessage isn't specified
		if (!$lastMessage) {
			return ['ok' => false, 'text' => 'Last message not specified'];
		}

		//Begin DB transaction
		DB::beginTransaction();

		try {

			//Find channel by id
			$channel = Channel::find($id);

			//Error if channel does not exist
			if (!$channel) {
				return ['ok' => false, 'error' => 'Channel not found'];
			}

			//Error if user is not authorized to access channel
			if (!$channel->program->users->contains(Auth::user())) {
				return ['ok' => false, 'error' => 'You do not have permission to delete this channel'];
			}

			//Find channel props
			$channel->program;

			//Get messages
			$messages = Message::orderBy('created_at', 'DESC')
				->where('channel_id', $id)
				->where('id', '>', $lastMessage)
				->get();

			//Get props for every message
			foreach ($messages as $message) {
				$message->channel;
				$message->user;
			}

			//Commit DB transaction
			DB::commit();

			//Return data
			return ['ok' => true, 'channel' => $channel, 'messages' => $messages];
		} catch (\Exception $e) {

			//Rollback transaction
			DB::rollBack();

			//Return error
			return ['ok' => false, 'text' => $e];
		}
	}

	public function load(Request $request, $id)
	{

		//Error if channel isn't specified
		if (!$id) {
			return ['ok' => false, 'error' => 'Channel not specified'];
		}

		//Begin DB transaction
		DB::beginTransaction();

		try {

			//Find channel by id
			$channel = Channel::find($id);

			//Error if channel does not exist
			if (!$channel) {
				return ['ok' => false, 'error' => 'Channel not found'];
			}

			//Error if user is not authorized to access channel
			if (!$channel->program->users->contains(Auth::user())) {
				return ['ok' => false, 'error' => 'You do not have permission to delete this channel'];
			}

			//Find channel props
			$channel->program;

			//Find all messages for channel by id
			$messages = Message::orderBy('id', 'DESC')
				->where('channel_id', $id)
				->limit(20)
				->get();

			//Find all properties for every message
			foreach ($messages as $message) {
				$message->channel;
				$message->user;
			}

			//Commit DB transaction
			DB::commit();

			//Return data
			return ['ok' => true, 'exists' => true, 'channel' => $channel, 'messages' => $messages];
		} catch (\Exception $e) {

			//Rollback transaction
			DB::rollBack();

			//Return error
			return ['ok' => false, 'text' => $e];
		}

		//Return
		return ['ok' => true, 'exists' => false];
	}

	public function delete(Request $request, $programId)
	{
		//Error if channel isn't specified
		if (!$request->has('id') || !$request->id) {
			return ['ok' => false, 'error' => 'Channel not specified'];
		}

		//Begin DB transaction
		DB::beginTransaction();

		try {

			//Find channel by id
			$channel = Channel::find($request->id);

			//Error if channel does not exist
			if (!$channel) {
				return ['ok' => false, 'error' => 'Channel not found'];
			}

			//Error if user does not have permission to delete any channel
			if (Auth::user()->role === 'student') {
				return ['ok' => false, 'error' => 'You do not have permission to delete this channel'];
			}

			//Error if user does not have permission to delete specific channel
			if (Auth::user()->role === 'teacher' && !$channel->program->users->contains(Auth::user())) {
				return ['ok' => false, 'error' => 'You do not have permission to delete this channel'];
			}

			//Delete channel
			$channel->delete();

			//find program by id
			$program = Program::find($programId);
			
			//Error if program does not exist
			if (!$program) {
				return ['ok' => false, 'error' => 'Program not found'];
			}
			
			$program->channels;

			//Commit transaction
			DB::commit();

			//Return success

			return ['ok' => true, 'program' => $program];
		} catch (\Exception $e) {

			//Rollback transaction
			DB::rollBack();

			//Return error
			return ['ok' => false, 'text' => $e];
		}
	}


	public function create(Request $request, $programId)
	{
		if (!$programId) {
			return ["ok " => false, 'text' => 'Program not specified'];
		}
		$program = Program::find($programId);
		if (!$program) {
			return ["ok " => false, 'text' => 'Program does not exist'];
		}

		//Check if user does not have access to program
		$userProgram = UserProgram::where('user_id', Auth::user()->id)
			->where('program_id', $program->id)
			->first();

		//Error if user does not have access to program
		if (!$userProgram) {
			return ['ok' => false, 'text' => 'You do not have access to this program'];
		}
		//Only admin or teacher roles can create channels
		if (Auth::user()->role == 'student') {
			return ['ok' => false, 'text' => 'You do not have permission to create channels'];
		}
		error_log($request);
		$channel = Channel::create([
			'program_id' => $programId,
			'name' => $request->channel_name,
			'hidden' => $request->hidden,
		]);
		$program = Program::find($programId);
		$program->channels;

		return ['ok' => true, 'program' => $program];
	}
}
