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
	public $senderId;
	public function __construct($message, $channelId, $senderId)
	{
		$this->message = $message;
		$this->channelId = $channelId;
		$this->senderId = $senderId;
	}

	public function broadcastOn()
	{
		error_log($this->senderId);
		return ['private-channel'.$this->channelId];
	}

	public function broadcastAs()
	{
		return 'new_message';
	}
}
