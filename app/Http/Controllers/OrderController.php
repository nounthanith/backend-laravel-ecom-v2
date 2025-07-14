<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Cart;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function checkout(Request $request)
    {
        $cart = Cart::where('user_id', auth()->id())->where('status', 'active')->first();
        if (!$cart) {
            return response()->json(['error' => 'Cart not found'], 404);
        }
        $totalAmount = $cart->items->sum(fn($item) => $item->quantity * $item->price);
        $order = Order::create([
            'user_id' => auth()->id(),
            'cart_id' => $cart->id,
            'total_amount' => $totalAmount,
            'order_status' => 'Pending',

        ]);

        foreach ($cart->items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price' => $item->price,
            ]);
        }
        // change cart status to completed
        $cart->status = 'Completed';
        $cart->save();

        return response()->json(['message' => 'Order placed successfully', 'order' => $order]);
    }
    public function index()
    {
        $orders = Order::where('user_id', auth()->id())->with('cart.items.product')->get(); // get all orders of the user
        return response()->json($orders);
    }
}
