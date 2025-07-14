<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Address extends Model
{
    /** @use HasFactory<\Database\Factories\AddressFactory> */
    use HasFactory;
    protected $fillable = [
        'user_id', 'recipient_name', 'line1', 'line2', 'city', 'state', 'postal_code', 'country', 'phone', 'is_default', 'latitude', 'longitude', 'place_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
