<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use App\Events\Broadcaster;
//use App\Http\Controllers\ChannelController;

class MessageController extends Controller
{
	public function create(Request $request, $channelId)
	{
		$message = Message::create([
			'channel_id' => $channelId,
			'user_id' => $request->mimic_user, //auth()->id(),
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
		event(new Broadcaster($toSend, $channelId));

		return response()->json($message);
	}
}
