<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Address;

class AddressController extends Controller
{
    public function index()
    {
        // get all addresses
        $addresses = Address::where('user_id', auth()->id())->get();
        return response()->json($addresses);
    }

    public function store(Request $request)
    {
        // create address
        $address = Address::create([
            'user_id' => auth()->id(),
            'recipient_name' => $request->recipient_name,
            'line1' => $request->line1,
            'line2' => $request->line2,
            'city' => $request->city,
            'state' => $request->state,
            'postal_code' => $request->postal_code,
            'country' => $request->country,
            'phone' => $request->phone,
            'is_default' => $request->is_default,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'place_id' => $request->place_id,
        ]);
        return response()->json($address);
    }

    public function update(Request $request, $id)
    {
        // update address
        $address = Address::find($id);
        $address->update($request->all());
        return response()->json($address);
    }

    public function destroy($id)
    {
        // delete address
        $address = Address::find($id);
        $address->delete();
        return response()->json($address);
    }
}
