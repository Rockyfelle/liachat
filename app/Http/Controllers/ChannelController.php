<?php

namespace App\Http\Controllers;

use App\Models\Channel;
use App\Models\Message;
use App\Models\Program;
use App\Models\UserProgram;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class ChannelController extends Controller
{
	public function all(Request $request, $id, $dateTo, $count)
	{
		$channel = Channel::find($id);
		$channel->program;
		/*$channel->messages;
		foreach ($channel->messages as $message) {
			$message->channel;
			$message->user;
		}*/

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
		return response()->json(['channel' => $channel, 'messages' => $messages]);
	}

	public function new(Request $request, $id, $lastMessage)
	{
		$channel = Channel::find($id);
		$channel->program;

		$messages = Message::orderBy('created_at', 'DESC')
			->where('channel_id', $id)
			->where('id', '>', $lastMessage)
			->get();

		foreach ($messages as $message) {
			$message->channel;
			$message->user;
		}

		return response()->json(['channel' => $channel, 'messages' => $messages]);
	}

	public function load(Request $request, $id)
	{

		//Find channel by id
		$channel = Channel::find($id);

		//Does channel exist
		if ($channel) {

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

			return ['success' => true, 'exists' => true, 'channel' => $channel, 'messages' => $messages];
		}

		//Return
		return ['success' => true, 'exists' => false];
	}
	

	public function createChannel(Request $request, $programId){
		if(!$programId){
			return ["ok "=> false, 'text'=> 'Program not specified'];
		}
		$program = Program::find($programId);

		if(!$program){
			return ["ok "=> false, 'text'=> 'Program does not exist'];
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
		if(Auth::user()->rolse == 'student'){
			return ['ok' => false, 'text' => 'You do not have permission to create channels'];
		}
		$channel = Channel::create([
			'program_id' => $programId,
			'name' => $request->channelName,
			'hidden' => $request->hidden,
		]); 

		return ['ok'=> true, 'channel' => $channel];
	}
}
