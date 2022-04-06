<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Channel;

class Message extends Model
{
    use HasFactory;

	protected $fillable = [
        'user_id',
        'channel_id',
        'type',
        'type',
    ];

	public function channel() {
		return $this->belongsTo(Channel::class);
	}

}
