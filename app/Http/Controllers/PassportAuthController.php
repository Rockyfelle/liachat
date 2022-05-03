<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;

class PassportAuthController extends Controller
{
	/**
	 * Registration
	 */
	public function register(Request $request)
	{
		if (Auth::user()) {
			if (Auth::user()->role === 'teacher') {

				$user = User::create([
					'name' => $request->name,
					'email' => $request->email,
					'role' => 'student',
					'password' => '',
					'school_id' => Auth::user()->school_id,
					'register_token' => Str::random(40),
				]);

				return response()->json(['success' => true], 200);
			} else {
				return ['success' => false, 'text' => 'You are not authorized to register'];
			}
		} else {
			return ['success' => false, 'text' => 'You are not logged in'];
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

			return response()->json(['success' => true, 'token' => 'Bearer ' . $token, 'user' => auth()->user()], 200);
		} else {

			return response()->json(['success' => false, 'id' => 'login-incorrect', 'text' => 'The password is wrong or the account does not exist.'], 200);
		}
	}
}
