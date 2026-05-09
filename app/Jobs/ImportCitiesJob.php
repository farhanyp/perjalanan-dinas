<?php

namespace App\Jobs;

use App\Models\City;
use App\Models\Island;
use App\Models\Province;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ImportCitiesJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected string $filePath;

    public function __construct(string $filePath)
    {
        $this->filePath = $filePath;
    }

    public function handle(): void
    {
        if (!Storage::exists($this->filePath)) {
            Log::error("ImportCitiesJob: File not found at {$this->filePath}");
            return;
        }

        $absolutePath = Storage::path($this->filePath);

        try {
            $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($absolutePath);
            $sheet = $spreadsheet->getActiveSheet();
            $rows = $sheet->toArray();
        } catch (\Exception $e) {
            Log::error("ImportCitiesJob: Failed to load spreadsheet at {$this->filePath} - " . $e->getMessage());
            Storage::delete($this->filePath);
            return;
        }

        $header = array_shift($rows);
        
        if (!$header) {
            Log::error("ImportCitiesJob: File is empty or has no header at {$this->filePath}");
            Storage::delete($this->filePath);
            return;
        }

        // Map header to indices
        $map = array_flip(array_map('trim', $header));

        foreach ($rows as $row) {
            // Check if the row has any content
            $isEmpty = true;
            foreach ($row as $cell) {
                if (!empty($cell)) {
                    $isEmpty = false;
                    break;
                }
            }
            if ($isEmpty) continue; // Skip empty rows

            try {
                $name = isset($map['name']) ? $row[$map['name']] : null;
                $latitude = isset($map['latitude']) ? $row[$map['latitude']] : null;
                $longitude = isset($map['longitude']) ? $row[$map['longitude']] : null;
                $country = isset($map['country']) ? $row[$map['country']] : 'Indonesia';
                $islandName = isset($map['island']) ? $row[$map['island']] : null;
                $provinceName = isset($map['province']) ? $row[$map['province']] : null;

                if (!$name) continue;

                // Logic: Indonesia -> is_abroad = true, others -> false (As per user request)
                $isAbroad = (strtolower(trim((string)$country)) === 'indonesia');

                $island = null;
                if (!empty($islandName)) {
                    $island = Island::firstOrCreate(['name' => $islandName], [
                        'is_abroad' => $isAbroad
                    ]);
                }

                $province = null;
                if (!empty($provinceName)) {
                    $province = Province::firstOrCreate([
                        'name' => $provinceName,
                        'island_id' => $island?->id
                    ], [
                        'is_abroad' => $isAbroad
                    ]);
                }

                City::updateOrCreate(
                    ['name' => $name],
                    [
                        'province_id' => $province?->id,
                        'latitude' => $latitude,
                        'longitude' => $longitude,
                        'is_abroad' => $isAbroad
                    ]
                );
            } catch (\Exception $e) {
                Log::error("ImportCitiesJob: Error processing row: " . json_encode($row) . " - " . $e->getMessage());
            }
        }

        // Clean up
        Storage::delete($this->filePath);
    }
}
