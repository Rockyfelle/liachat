<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;

class MessageController extends Controller
{
	public function create(Request $request, $channelId)
	{
		$message = Message::create([
			'channel_id' => $channelId,
			'user_id' => $request->mimic_user,//auth()->id(),
			'type' => 'text',
			'content' => $request->content,
		]);

		return response()->json($message);
	}
}
