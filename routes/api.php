<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\OrderController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);

Route::post('logout',[AuthController::class,'logout'])->middleware('auth:sanctum');
//delete account route
Route::post('delete-account',[AuthController::class,'deleteAccount'])->middleware('auth:sanctum');
//reset password route
Route::post('reset-password',[AuthController::class,'resetPassword'])->middleware('auth:sanctum');

// create route group for category controller 
Route::get('products',[ProductController::class,'index']);


// create route group for sanctum middleware
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('categories', CategoryController::class);
    Route::post('products',[ProductController::class,'store']);

    Route::get('search-product',[ProductController::class,'search']);
    Route::get('get-product-by-cate/{id}',[ProductController::class,'getProductsByCategory']);

    //cart 
    Route::get('view-cart',[CartController::class,'viewCart']);
    Route::post('add-to-cart',[CartController::class,'addToCart']);
    Route::post('remove-from-cart/{id}',[CartController::class,'removeFromCart']);
    
    //address
    Route::get('addresses',[AddressController::class,'index']);
    Route::post('addresses',[AddressController::class,'store']);
    Route::put('addresses/{id}',[AddressController::class,'update']);
    Route::delete('addresses/{id}',[AddressController::class,'destroy']);

    //checkout
    Route::post('/checkout', [OrderController::class, 'checkout']);
    Route::get('/orders', [OrderController::class, 'index']);
    
    
});

