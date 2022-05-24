<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Program;
use App\Models\Channel;
use App\Models\Message;
use App\Models\UserProgram;
use App\Events\Broadcaster;
use App\Events\PrivateBroadcast;
//use App\Http\Controllers\ChannelController;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
	public function create(Request $request, $channelId)
	{
		//Error if user does not have access to channel
		if (!$channelId) {
			return ['ok' => false, 'text' => 'Channel not specified'];
		}

		//Get channel
		$channel = Channel::find($channelId);

		//Error if user does not have access to channel
		if (!$channel) {
			return ['ok' => false, 'text' => 'Channel not found'];
		}

		//Check if user does not have access to program
		$userProgram = UserProgram::where('user_id', Auth::user()->id)
			->where('program_id', $channel->program->id)
			->first();

		//Error if user does not have access to program
		if (!$userProgram) {
			return ['ok' => false, 'text' => 'You do not have access to this program'];
		}
		error_log($request);
		$message = Message::create([
			'channel_id' => $channelId,
			'user_id' => Auth::user()->id,
			'type' => 'text',
			'content' => $request->content,
		]);
		$message->user;
		$message->channel;

		//event(new Broadcaster($request->content, $channelId));
		$toSend = [
			'messages' => [
				$message,
			],
		];

		event(new PrivateBroadcast($toSend, $channelId));

		return ['ok' => true, 'message' => $message];
	}
}
