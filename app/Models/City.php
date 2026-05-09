<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class City extends Model
{
    use HasFactory;

    protected $fillable = [
        'province_id',
        'name',
        'latitude',
        'longitude',
        'is_abroad',
    ];

    protected $casts = [
        'is_abroad' => 'boolean',
    ];

    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(Document::class);
    }
}
