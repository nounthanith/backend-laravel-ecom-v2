<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Validation\ValidationException;
class AuthController extends Controller
{
    public function register(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        if($request->hasFile('avatar')){
            $image = $request->file('avatar');
            $path = Storage::disk('public')->put('users', $image);
            $request->avatar = $path;
        }
        
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'avatar' => $request->avatar
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;
        $user->avatar = $user->avatar ? asset('storage/' . $user->avatar) : null;


        return response()->json(['token' => $token, 'user' => $user]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first(); // get single record from db via email

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        //map domain name to the image path
        $user->avatar = $user->avatar ? asset('storage/' . $user->avatar) : null;
        return response()->json(['token' => $token, 'user' => $user]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
       // Delete Account
       public function deleteAccount(Request $request)
       {
           // check if user not found
           if (!$request->user()) {
               return response()->json(['message' => 'User not found'], 404);
           }
           $request->user()->delete();
           return response()->json(['message' => 'Account deleted successfully']);
       }
   
       // create a function to reset password for user account
       public function resetPassword(Request $request)
       {
           $request->validate([
               'email' => 'required|string|email',
               'password' => 'required|string|min:8',
           ]);
   
           $user = User::where('email', $request->email)->first();
   
           if (!$user) {
               throw ValidationException::withMessages([
                   'email' => ['The provided email is incorrect.'],
               ]);
           }
   
           $user->password = Hash::make($request->password);
           $user->save();
   
           return response()->json(['message' => 'Password reset successfully']);
       }
}
