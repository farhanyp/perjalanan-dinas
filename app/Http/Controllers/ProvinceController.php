<?php

namespace App\Http\Controllers;

use App\Models\Island;
use App\Models\Province;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProvinceController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('provinces/index', [
            'provinces' => Province::with('island')->get(),
            'islands' => Island::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'island_id' => 'required|exists:islands,id',
            'name' => 'required|string|max:255',
            'latitude' => 'nullable|string|max:255',
            'longitude' => 'nullable|string|max:255',
            'is_abroad' => 'boolean',
        ]);

        Province::create($validated);

        return redirect()->back()->with('success', 'Province created successfully.');
    }

    public function update(Request $request, Province $province)
    {
        $validated = $request->validate([
            'island_id' => 'required|exists:islands,id',
            'name' => 'required|string|max:255',
            'latitude' => 'nullable|string|max:255',
            'longitude' => 'nullable|string|max:255',
            'is_abroad' => 'boolean',
        ]);

        $province->update($validated);

        return redirect()->back()->with('success', 'Province updated successfully.');
    }

    public function destroy(Province $province)
    {
        $province->delete();

        return redirect()->back()->with('success', 'Province deleted successfully.');
    }
}
