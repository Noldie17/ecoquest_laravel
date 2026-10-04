<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('Home'))->name('home');
Route::get('/scanner', fn () => Inertia::render('Scanner'))->name('scanner');
Route::get('/history', fn () => Inertia::render('History'))->name('history');
Route::get('/about', fn () => Inertia::render('About'))->name('about');
