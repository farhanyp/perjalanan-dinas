<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Province extends Model
{
    use HasFactory;

    protected $fillable = [
        'island_id',
        'name',
        'latitude',
        'longitude',
        'is_abroad',
    ];

    protected $casts = [
        'is_abroad' => 'boolean',
    ];

    public function island(): BelongsTo
    {
        return $this->belongsTo(Island::class);
    }

    public function cities(): HasMany
    {
        return $this->hasMany(City::class);
    }
}
