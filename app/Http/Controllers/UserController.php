<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\UserStoreRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
 
class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
 
        // Return Json Response
        return response()->json([
            'results' => $users
        ], 200);
    }
 
    public function store(UserStoreRequest $request)
    {
        try {
            // Create User
            $imageName = Str::random(32) . "." . $request->image->getClientOriginalExtension();
             
            Storage::disk('public')->put($imageName, file_get_contents($request->image));
            User::create([
                'id' => $request->id,
                'name' => $request->name,
                'email' => $request->email,
                'password' => $request->password,
                'image' => $imageName,
                      
            ]);
 
            // Return Json Response
            return response()->json([
                'message' => "User successfully created. '$request->name'-- '$imageName'"
            ], 200);
        } catch (\Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => "Something went really wrong!"
            ], 500);
        }
    }
 
    public function show($id)
    {
        // User Detail 
        $users = User::find($id);
        if (!$users) {
            return response()->json([
                'message' => 'User Not Found.'
            ], 404);
        }
 
        // Return Json Response
        return response()->json([
            'users' => $users
        ], 200);
    }
 
    public function update(UserStoreRequest $request, $id)
    {
        try {
            // Find User
            $users = User::find($id);
            if (!$users) {
                return response()->json([
                    'message' => 'User Not Found.'
                ], 404);
            }
 
            // echo "request : $request->image";
            $users->name = $request->name;
            $users->email = $request->email;

            if ($request->image) {
 
                // Public storage
                $storage = Storage::disk('public');
 
                // Old iamge delete
                if ($storage->exists($users->image))
                    $storage->delete($users->image);
 
                // Image name
                $imageName = Str::random(32) . "." . $request->image->getClientOriginalExtension();
                $users->image = $imageName;
 
                // Image save in public folder
                $storage->put($imageName, file_get_contents($request->image));
            }

 
            // Update User
            $users->save();
 
            // Return Json Response
            return response()->json([
                'message' => "User successfully updated."
            ], 200);
        } catch (\Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => "Something went really wrong!"
            ], 500);
        }
    }
 
    public function destroy($id)
    {
        // Detail 
        $users = User::find($id);
        if (!$users) {
            return response()->json([
                'message' => 'User Not Found.'
            ], 404);
        }
 
        // Delete User
        $users->delete();
 
        // Return Json Response
        return response()->json([
            'message' => "User successfully deleted."
        ], 200);
    }
}