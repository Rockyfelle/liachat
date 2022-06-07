<?php

namespace App\Http\Controllers;

use App\Models\ProgramResource;
use App\Models\Program;
use App\Models\UserProgram;
use App\Models\Channel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProgramResourceController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function all(Request $request, $programId)
	{
		//Get program
		$program = Program::find($programId);

		//Error program does not exist
		if (!$program) {
			return ['ok' => false, 'text' => 'Program not found'];
		}

		//Check if user is in program
		$userProgram = UserProgram::where('user_id', Auth::user()->id)
			->where('program_id', $program->id)
			->first();

		//Error if user is not in program
		if (!$userProgram) {
			return ['ok' => false, 'text' => 'You do not have access to this program'];
		}

		$resources = ProgramResource::get()->where('program_id', $programId);

		foreach ($resources as $resource) {
			$link = $request->getHttpHost();
			$resource->stringyboi = 'http://' . $link . '/uploads/' . $resource->file_name . '.' . $resource->file_extension;
		}
		return ['ok' => true, 'response' => $resources];
	}

	public function upload(Request $request, $id)
	{
		error_log(Auth::user());
		//Get program
		$program = Program::find($id);

		//Error program does not exist
		if (!$program) {
			return ['ok' => false, 'text' => 'Program not found'];
		}

		//Check if user is in program
		$userProgram = UserProgram::where('user_id', Auth::user()->id)
			->where('program_id', $program->id)
			->first();

		//Error if user is not in program
		if (!$userProgram) {
			return ['ok' => false, 'text' => 'You do not have access to this program'];
		}

		//Error if user is student
		if (Auth::user()->role == 'student') {
			return ['ok' => false, 'text' => 'You do not have permission to upload files'];
		}

		//TODO: Check if filename exists, add (number of occ), 
		//fix the hash or remove that bitch
		//send program id from frontend somehow
		if ($request->has('files')) {
			$file = $request->file('files');
			$fileInfo = $id . '-' . $file->getClientOriginalName();
			$file->move('uploads/', $fileInfo);
			$fileName = pathinfo($fileInfo, PATHINFO_FILENAME);
			ProgramResource::create([
				'file_name' => $fileName,
				'file_extension' => $file->getClientOriginalExtension(),
				'user_id' => Auth::user()->id,
				'program_id' => 1,
				'hash' => 'hej'
			]);

			return ['ok' => true];
		} else {
			return ['ok' => false, 'text' => 'File not uploaded'];
		}
	}
}
