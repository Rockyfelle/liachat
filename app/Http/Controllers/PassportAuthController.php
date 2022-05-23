<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserProgram;

class PassportAuthController extends Controller
{
	public function reset1(Request $request, $token)
	{
		$user = User::where('register_token', $token)->first();

		if ($user) {
			return ['ok' => true, 'email' => $user->email];
		} else {
			return ['ok' => false, 'error' => 'Account not found'];
		}
	}

	public function reset2(Request $request)
	{
		$user = User::where('register_token', $request->token)->first();

		if ($user) {
			$user->password = bcrypt($request->password);
			$user->register_token = '';
			$user->save();

			return ['ok' => true];
		} else {
			return ['ok' => false, 'error' => 'Account not found'];
		}
	}

	/**
	 * Registration
	 */
	public function register(Request $request)
	{
		if (Auth::user()) {
			if (Auth::user()->role === 'teacher') {

				$registerToken = Str::random(40);

				$user = User::create([
					'name' => $request->name,
					'email' => $request->email,
					'role' => 'student',
					'password' => '',
					'school_id' => Auth::user()->school_id,
					'register_token' => $registerToken,
				]);

				UserProgram::create([
					'user_id' => $user->id,
					'program_id' => $request->programId,
				]);

				return response()->json(['ok' => true, 'registerToken' => $registerToken], 200);
			} else {
				return ['ok' => false, 'text' => 'You are not authorized to register'];
			}
		} else {
			return ['ok' => false, 'text' => 'You are not logged in'];
		}
	}

	/**
	 * Login
	 */
	public function login(Request $request)
	{
		$data = [
			'email' => $request->email,
			'password' => $request->password
		];

		if (auth()->attempt($data)) {
			$token = auth()->user()->createToken('LaravelAuthApp')->accessToken;

			return response()->json(['ok' => true, 'token' => 'Bearer ' . $token, 'user' => auth()->user()], 200);
		} else {

			return response()->json(['ok' => false, 'id' => 'login-incorrect', 'text' => 'The password is wrong or the account does not exist.'], 200);
		}
	}
}
