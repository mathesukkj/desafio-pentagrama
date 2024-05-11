<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|unique:app\models\user,email|email',
            'password' => 'required|min:8'
        ]);

        $user = User::create([
            "name" => $request->input("name"),
            "email" => $request->input("email"),
            "password" => Hash::make($request->input("password")),
        ]);

        $token = $user->createToken('token');

        return response()->json([
            "token" => $token->plainTextToken,
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if(Auth::attempt($request->only('email', 'password'))) {
            $token = $request->user()->createToken("token");
            return response()->json([
                "token" => $token->plainTextToken,
            ]);
        }

        return response()->json(["message" => "Not authorized"], 401);
    }
}
