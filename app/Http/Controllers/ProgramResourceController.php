<?php

namespace App\Http\Controllers;

use App\Models\ProgramResource;
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
        $resources = ProgramResource::get()->where('program_id',$programId);

        foreach($resources as $resource){
            $link = $request->getHttpHost();
            $resource->stringyboi = 'http://'.$link.'/uploads/'.$resource->file_name.'.'.$resource->file_extension;
        }
        return ['success' => true, 'response'=> $resources];
    }

    public function upload(Request $request, $id)
    {
        $imagesName = [];
        $response = [];
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


            $response["status"] = "successs";
            $response["message"] = "Success! file(s) uploaded";
        } else {
            $response["status"] = "failed";
            $response["message"] = "Failed! file(s) not uploaded";
        }
        return response()->json($response);
    }
}
