<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Province;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CityController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('cities/index', [
            'cities' => City::with('province.island')->get(),
            'provinces' => Province::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'province_id' => 'required|exists:provinces,id',
            'name' => 'required|string|max:255',
            'latitude' => 'nullable|string|max:255',
            'longitude' => 'nullable|string|max:255',
            'is_abroad' => 'boolean',
        ]);

        City::create($validated);

        return redirect()->back()->with('success', 'City created successfully.');
    }

    public function update(Request $request, City $city)
    {
        $validated = $request->validate([
            'province_id' => 'required|exists:provinces,id',
            'name' => 'required|string|max:255',
            'latitude' => 'nullable|string|max:255',
            'longitude' => 'nullable|string|max:255',
            'is_abroad' => 'boolean',
        ]);

        $city->update($validated);

        return redirect()->back()->with('success', 'City updated successfully.');
    }

    public function destroy(City $city)
    {
        $city->delete();

        return redirect()->back()->with('success', 'City deleted successfully.');
    }
}
