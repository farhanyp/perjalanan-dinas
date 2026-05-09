<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Island extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'latitude',
        'longitude',
        'is_abroad',
    ];

    protected $casts = [
        'is_abroad' => 'boolean',
    ];

    public function provinces(): HasMany
    {
        return $this->hasMany(Province::class);
    }
}
