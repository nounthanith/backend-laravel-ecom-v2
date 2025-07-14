<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\OrderItem;
use App\Models\Card;
use App\Models\User;

class Order extends Model
{
    /** @use HasFactory<\Database\Factories\OrderFactory> */
    use HasFactory;

    protected $fillable = ['user_id', 'order_status', 'total_amount', 'shipping_address','cart_id','payment_method','payment_status'];


    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }


    public function card()
    {
        return $this->belongsTo(Card::class, 'cart_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
