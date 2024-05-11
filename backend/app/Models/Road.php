<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Road extends Model
{
    use HasFactory;

    protected $fillable = ["name", "neighborhood_id"];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];

    public function neighborhood(): BelongsTo
    {
        return $this->belongsTo(Neighborhood::class);
    }
}
