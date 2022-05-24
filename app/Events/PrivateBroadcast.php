<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
	
class PrivateBroadcast implements ShouldBroadcast
{
	use Dispatchable, InteractsWithSockets, SerializesModels;


	public $message;
	public $channelId;

	public function __construct($message, $channelId)
	{
		$this->message = $message;
		$this->channelId = $channelId;
		
	}

	public function broadcastOn()
	{
		error_log($this->channelId);
		return ['private-channel'.$this->channelId];
	}

	public function broadcastAs()
	{
		return 'new_message';
	}
}
