<?php
 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
 
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
 
Route::get('users', [UserController::class, 'index']); //php artisan install:api
Route::get('users/{id}', [UserController::class, 'show']);
Route::post('addnew', [UserController::class, 'store']);
Route::put('usersupdate/{id}', [UserController::class, 'update']);
Route::delete('usersdelete/{id}', [UserController::class, 'destroy']);

Route::post('auth/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/auth/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('auth/profile', [AuthController::class, 'profile']);
