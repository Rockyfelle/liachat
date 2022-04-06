<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Message;
use App\Models\Program;

class Channel extends Model
{
    use HasFactory;

	protected $fillable = [
        'program_id',
        'name',
        'hidden',
    ];

	public function messages()
	{
		return $this->hasMany(Message::class);
	}

	public function program()
	{
		return $this->belongsTo(Program::class);
	}
}
