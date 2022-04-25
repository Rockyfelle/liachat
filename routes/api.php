<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\ChannelController;
use App\Http\Controllers\MessageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('program/all', [ProgramController::class, 'all']);
Route::get('program/{id}', [ProgramController::class, 'program']);
Route::get('channel/new/{id}/{lastMessage}/', [ChannelController::class, 'new']);
Route::get('channel/{id}/{dateTo}/{count}', [ChannelController::class, 'all']);
Route::post('message/{channelId}', [MessageController::class, 'create']);
Route::get('program/init/{programId}/{channelId}', [ProgramController::class, 'init']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
