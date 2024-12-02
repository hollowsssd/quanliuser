<?php

namespace App\Http\Controllers;

use GuzzleHttp\Psr7\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use function Laravel\Prompts\password;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $email = $request->email;
        $password = $request->password;

        if (!$email || !$password) {

            return response()->json([
                'success' => false,
                'message' => "something wrong"
            ]);
        }
        $status = Auth::attempt(['email' => $email, 'password' => $password]);
        if ($status) {
            $token = $request->user()->createToken('auth');
            return response()->json([
                'success' => true,
                'token' => $token->plainTextToken,
                'message' => "login success"
            ]);
        }
        return response()->json([
            'success' => false,
            'message' => "something wrong"
        ], 401);
    }
    public function profile(Request $request)
    {
        return response()->json([
            'success' => true,
            'user' => $request->user()
        ]);
    }


    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'success' => true,
        ]);
    }
}
