<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DocumentController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('documents/index', [
            'documents' => Document::with(['city', 'creator'])->latest()->get(),
            'cities' => City::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'city_id' => 'required|exists:cities,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|string',
            'end_date' => 'required|string',
            'status' => 'required|in:DRAFT,PROCESSING,APPROVE,DECLINE,ARCHIVED',
        ]);

        $validated['created_by'] = Auth::id();

        Document::create($validated);

        return redirect()->back()->with('success', 'Document created successfully.');
    }

    public function update(Request $request, Document $document)
    {
        $validated = $request->validate([
            'city_id' => 'required|exists:cities,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|string',
            'end_date' => 'required|string',
            'status' => 'required|in:DRAFT,PROCESSING,APPROVE,DECLINE,ARCHIVED',
            'message_decline' => 'nullable|string',
        ]);

        $document->update($validated);

        return redirect()->back()->with('success', 'Document updated successfully.');
    }

    public function destroy(Document $document)
    {
        $document->delete();

        return redirect()->back()->with('success', 'Document deleted successfully.');
    }
}
