<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function viewCart()
    {
        $user = Auth::user();
//        $cartItems = Cart::where('user_id', $user->id)->with('items.product')->get();

        // get cart count and total
        $cart = Cart::where('user_id', $user->id)->where('status','active')->with('items.product')->first();
        if (!$cart) {
            return response()->json([
                'message' => 'No active cart found.',
            ], 200);
        }
        $cartItems = $cart ? $cart->items : [];
        $total = 0;
        $count = 0;
        foreach ($cartItems as $item) {
            $total += $item->price * $item->quantity;
            $count += $item->quantity;
            $item->product->image = $item->product->image ? asset('storage/' . $item->product->image) : null;

        }

        return response()->json([
            'cart' => $cartItems,
            'total' => $total,
            'count' => $count
        ]);
    }
      // Add a product to the cart
      public function addToCart(Request $request)
      {
          $request->validate([
              'product_id' => 'required',
              'quantity' => 'required|integer|min:1',
          ]);
  
          $user = Auth::user();
          // add product to card and items
          $cart = Cart::firstOrCreate(['user_id' => $user->id, 'status' => 'active']);
          //where user_id = $user->id and status = active
          $cartItem = $cart->items()->where('product_id', $request->product_id)->first();
          if ($cartItem) {
              $cartItem->quantity = $request->quantity;
              $cartItem->save();
          } 
          else {
              $cart->items()->create([
                  'product_id' => $request->product_id,
                  'quantity' => $request->quantity,
                  'price' => Product::find($request->product_id)->price,
                  'status' => 'active',
  
              ]);
          }
  
  
          return response()->json(['message' => 'Product added to cart successfully.']);
      }

          // Remove a product from the cart
    public function removeFromCart($productId)
    {
        $user = Auth::user();
        //remove cart from by cart id
        $cart = Cart::where('user_id', $user->id)->where('status','active')->first();
        $cartItem = $cart->items()->where('product_id', $productId)->first();
        if ($cartItem) {
            $cartItem->delete();
        }

        return response()->json(['message' => 'Product removed from cart successfully.']);
    }
}
