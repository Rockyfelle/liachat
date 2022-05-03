<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Channel;
use App\Models\ProgramResource;
use App\Models\User;
use App\Models\UserProgram;

class Program extends Model
{
	use HasFactory;
	protected $dateFormat = 'Y-m-d H:i:s.u';

	protected $fillable = [
		'program_id',
		'channel_id',
	];

	public function channels()
	{
		return $this->hasMany(Channel::class);
	}

	public function resources()
	{
		return $this->hasMany(ProgramResource::class);
	}

	public function users()
	{
		return $this->hasManyThrough(User::class, UserProgram::class, 'program_id', 'id', 'id', 'user_id');
	}
}
