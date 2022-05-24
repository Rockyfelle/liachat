<?php

namespace App\Http\Controllers;

use Pusher\Pusher;
use Illuminate\Http\Request;
use App\Models\Program;
use App\Models\Channel;
use Illuminate\Support\Facades\Auth;

class PusherController extends Controller
{
    public function pusherAuth(Request $request)
    {
        //Error if channelId does not exist
        $channelId = preg_replace('/[^0-9.]+/', '', $request->channel_name);
        // Get Channel
        $channel = Channel::find($channelId);
        // Error if channel does not exist
        if (!$channel) {
            return ['ok' => false, 'text' => 'Channel doesnt exist'];
        }
        //Get program from channel
        if (!$channel->program->users->contains(Auth::user())) {
            return ['ok' => false, 'error' => 'You do not have permission to access this channel'];
        }
        // Error if user is not in program

        $pusher = new Pusher(config('broadcasting.connections.pusher.key'), config('broadcasting.connections.pusher.secret'), config('broadcasting.connections.pusher.app_id'));
        echo $pusher->socketAuth(request()->input('channel_name'), request()->input('socket_id'));
        return;
    }
}
