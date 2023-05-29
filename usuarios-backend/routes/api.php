<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EmpleadoController;
use App\Http\Controllers\Api\LoginController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['middleware' => 'auth:sanctum'], function (){
    Route::controller(EmpleadoController::class)->group(function (){
        Route::get('/empleado','index');
        Route::post('/empleado','store');
        Route::get('/empleado/{id}', 'show');
        Route::put('empleado/{id}', 'update');
        Route::delete('/empleado/{id}', 'destroy');
    });
    
    Route::post('/logout', [LoginController::class, 'logOut']);
});

Route::post('/login', [LoginController::class, 'authenticate']);
Route::post('/register', [LoginController::class, 'createUser']);