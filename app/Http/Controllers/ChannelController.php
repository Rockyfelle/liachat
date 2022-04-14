<?php

namespace App\Http\Controllers;

use App\Models\Channel;
use App\Models\Message;
use Illuminate\Http\Request;

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
}
