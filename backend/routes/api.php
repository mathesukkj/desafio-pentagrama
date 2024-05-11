<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\NeighborhoodController;
use App\Http\Controllers\RoadController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/signup', [AuthController::class, 'signup']);

Route::post('/login', [AuthController::class, 'login']);

Route::middleware("auth:sanctum")->group(function () {
    Route::resource('/cities', CityController::class);
    Route::resource('/neighborhoods', NeighborhoodController::class);
    Route::resource('/roads', RoadController::class);
});
