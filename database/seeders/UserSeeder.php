<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::table('users')->insert([
			'name' => 'Student 1',
			'email' => 'student1@mail.com',
			'role' => 'student',
			'school_id' => 1,
			'password' => bcrypt('1234'),
		]);

		DB::table('users')->insert([
			'name' => 'Student 2',
			'email' => 'student2@mail.com',
			'role' => 'student',
			'school_id' => 1,
			'password' => bcrypt('1234'),
		]);

		DB::table('users')->insert([
			'name' => 'Teacher 1',
			'email' => 'teacher1@mail.com',
			'role' => 'teacher',
			'school_id' => 1,
			'password' => bcrypt('1234'),
		]);

		DB::table('users')->insert([
			'name' => 'Teacher 2',
			'email' => 'teacher2@mail.com',
			'role' => 'teacher',
			'school_id' => 1,
			'password' => bcrypt('1234'),
		]);

		DB::table('users')->insert([
			'name' => 'Admin 1',
			'email' => 'admin1@mail.com',
			'role' => 'admin',
			'school_id' => 1,
			'password' => bcrypt('1234'),
		]);
	}
}
