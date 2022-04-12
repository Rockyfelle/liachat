<?php

namespace App\Http\Controllers;

use App\Models\Channel;
use Illuminate\Http\Request;

class ChannelController extends Controller
{
	public function all(Request $request, $id)
	{
		$channel = Channel::find($id);
		$channel->program;
		$channel->messages;
		foreach ($channel->messages as $message) {
			$message->channel;
			$message->user;
		}

		$channel->messages = array_reverse($channel->messages->toArray());


		return response()->json($channel);
	}
}
