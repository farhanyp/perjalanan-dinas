<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::redirect('/', '/login');

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    // Master Data Routes
    Route::get('islands', [\App\Http\Controllers\IslandController::class, 'index'])->name('islands.index');
    Route::post('islands', [\App\Http\Controllers\IslandController::class, 'store'])->name('islands.store');
    Route::put('islands/{island}', [\App\Http\Controllers\IslandController::class, 'update'])->name('islands.update');
    Route::delete('islands/{island}', [\App\Http\Controllers\IslandController::class, 'destroy'])->name('islands.destroy');

    Route::get('provinces', [\App\Http\Controllers\ProvinceController::class, 'index'])->name('provinces.index');
    Route::post('provinces', [\App\Http\Controllers\ProvinceController::class, 'store'])->name('provinces.store');
    Route::put('provinces/{province}', [\App\Http\Controllers\ProvinceController::class, 'update'])->name('provinces.update');
    Route::delete('provinces/{province}', [\App\Http\Controllers\ProvinceController::class, 'destroy'])->name('provinces.destroy');

    Route::get('cities/download-template', [\App\Http\Controllers\CityController::class, 'downloadTemplate'])->name('cities.download-template');
    Route::post('cities/import-batch', [\App\Http\Controllers\CityController::class, 'importBatch'])->name('cities.import-batch');
    Route::get('cities', [\App\Http\Controllers\CityController::class, 'index'])->name('cities.index');
    Route::post('cities', [\App\Http\Controllers\CityController::class, 'store'])->name('cities.store');
    Route::put('cities/{city}', [\App\Http\Controllers\CityController::class, 'update'])->name('cities.update');
    Route::delete('cities/{city}', [\App\Http\Controllers\CityController::class, 'destroy'])->name('cities.destroy');

    Route::get('documents', [\App\Http\Controllers\DocumentController::class, 'index'])->name('documents.index');
    Route::post('documents', [\App\Http\Controllers\DocumentController::class, 'store'])->name('documents.store');
    Route::put('documents/{document}', [\App\Http\Controllers\DocumentController::class, 'update'])->name('documents.update');
    Route::delete('documents/{document}', [\App\Http\Controllers\DocumentController::class, 'destroy'])->name('documents.destroy');
});

require __DIR__.'/settings.php';
