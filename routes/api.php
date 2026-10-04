<?php

use App\Http\Controllers\AnalyzeWasteController;
use Illuminate\Support\Facades\Route;

Route::post('/analyze', AnalyzeWasteController::class)->name('api.analyze');
