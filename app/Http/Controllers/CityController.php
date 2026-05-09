<?php

namespace App\Http\Controllers;

use App\Jobs\ImportCitiesJob;
use App\Models\City;
use App\Models\Province;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
            'province_id' => 'nullable|exists:provinces,id',
            'name' => 'required|string|max:255',
            'latitude' => 'required|string|max:255',
            'longitude' => 'required|string|max:255',
            'is_abroad' => 'boolean',
        ]);

        City::create($validated);

        return redirect()->back()->with('success', 'City created successfully.');
    }

    public function update(Request $request, City $city)
    {
        $validated = $request->validate([
            'province_id' => 'nullable|exists:provinces,id',
            'name' => 'required|string|max:255',
            'latitude' => 'required|string|max:255',
            'longitude' => 'required|string|max:255',
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

    public function downloadTemplate()
    {
        $spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        
        $headers = ['name', 'latitude', 'longitude', 'country', 'island', 'province'];
        $sheet->fromArray($headers, null, 'A1');
        
        $sheet->fromArray(['Jakarta', '-6.2088', '106.8456', 'Indonesia', 'Jawa', 'DKI Jakarta'], null, 'A2');
        $sheet->fromArray(['Singapore', '1.3521', '103.8198', 'Singapore', '', ''], null, 'A3');

        $writer = new \PhpOffice\PhpSpreadsheet\Writer\Xlsx($spreadsheet);
        
        $callback = function() use ($writer) {
            $writer->save('php://output');
        };

        return response()->streamDownload($callback, 'template_cities.xlsx', [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ]);
    }

    public function importBatch(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls,csv|max:10240'
        ]);

        $path = $request->file('file')->store('imports');

        ImportCitiesJob::dispatch($path);

        return redirect()->back()->with('success', 'Batch import has been queued and is processing in the background.');
    }
}
