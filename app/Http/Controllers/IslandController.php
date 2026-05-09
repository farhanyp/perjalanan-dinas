<?php

namespace App\Http\Controllers;

use App\Models\Island;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class IslandController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('islands/index', [
            'islands' => Island::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'latitude' => 'nullable|string|max:255',
            'longitude' => 'nullable|string|max:255',
            'is_abroad' => 'boolean',
        ]);

        Island::create($validated);

        return redirect()->back()->with('success', 'Island created successfully.');
    }

    public function update(Request $request, Island $island)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'latitude' => 'nullable|string|max:255',
            'longitude' => 'nullable|string|max:255',
            'is_abroad' => 'boolean',
        ]);

        $island->update($validated);

        return redirect()->back()->with('success', 'Island updated successfully.');
    }

    public function destroy(Island $island)
    {
        $island->delete();

        return redirect()->back()->with('success', 'Island deleted successfully.');
    }
}
