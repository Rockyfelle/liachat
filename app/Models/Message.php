<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Channel;
use App\Models\User;

class Message extends Model
{
    use HasFactory;
	protected $dateFormat = 'Y-m-d H:i:s.u';

	protected $fillable = [
        'user_id',
        'channel_id',
        'type',
        'content',
    ];

	public function channel() {
		return $this->belongsTo(Channel::class);
	}

	public function user() {
		return $this->belongsTo(User::class);
	}

}
