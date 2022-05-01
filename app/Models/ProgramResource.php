<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Program;
class ProgramResource extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
		'program_id',
		'hash',
        'file_name',
        'file_extension'
	];

    public function program(){
        return $this->belongsTo(Program::class);
    }
}
