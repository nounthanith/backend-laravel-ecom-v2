<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use App\Models\Category;
class ProductController extends Controller
{

    public function index()
    {
        // Retrieve categories with limited product data
        $categories = Category::with([
            'products' => function ($query) {
                $query->select('id', 'name', 'description', 'price', 'stock', 'image', 'category_id', 'is_featured')
                    ->limit(5); // Limit products to 5 per category
            },
        ],)->latest()->get(['id', 'name']); // Fetch only necessary columns for categories

        // Filter and map categories with products
        $groupedProducts = $categories->map(function ($category) {
            if ($category->products->isEmpty()) return null;

            return [
                'category_id' => $category->id,
                'category_name' => $category->name,
                'category_description' => $category->description,
                'products' => $category->products->map(function ($product) {
                    return [
                        'id' => $product->id,
                        'name' => $product->name,
                        'description' => $product->description,
                        'price' => $product->price,
                        'stock' => $product->stock,
                        'image' => asset('storage/' . $product->image),
                    ];
                })
            ];
        })->filter()->values();

        // Retrieve featured banners
        $featuredProducts = Product::where('is_featured', true)
            ->limit(10)
            ->get(['id', 'name', 'image','description','price']);

        // Map banners to include the full image path
        $lstFeatured = $featuredProducts->map(fn ($product) => [
            'id' => $product->id,
            'name' => $product->name,
            'description' => $product->description,
            'image' => $product->image ? asset('storage/' . $product->image) : null,
            'price' => $product->price,



        ]);

        return response()->json([
            'categories' => $groupedProducts,
            'featured_products' => $lstFeatured
        ]);
    }
    public function store(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'category_id' => 'required|exists:categories,id',
            'is_featured' => 'required|boolean',
            'stock' => 'required|integer',
        ]);

        if($request->hasFile('image')){
            $image = $request->file('image');
            $path = Storage::disk('public')->put('products', $image);
            $request->image = $path;
        }

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'image' => $request->image,
            'category_id' => $request->category_id,
            'is_featured' => $request->is_featured,
            'stock' => $request->stock,
        ]);

        return response()->json($product);
    }

    ///search product 
    public function search(Request $request)
    {
        $request->validate([
            'search' => 'nullable|string',
            'min_price' => 'nullable|numeric',
            'max_price' => 'nullable|numeric',
        ]);

        $search = $request->search;
        $minPrice = $request->min_price;
        $maxPrice = $request->max_price;

        $products = Product::when($search, function ($query, $search) {
                $query->where('name', 'like', "%$search%")
                    ->orWhereHas('category', function ($query) use ($search) {
                        $query->where('name', 'like', "%$search%");
                    });
            })
            ->when($minPrice, function ($query, $minPrice) {
                $query->where('price', '>=', $minPrice);
            })
            ->when($maxPrice, function ($query, $maxPrice) {
                $query->where('price', '<=', $maxPrice);
            })
            ->when(!$search && !$minPrice && !$maxPrice, function ($query) {
                $query->latest()->limit(10);
            })
            ->get();
//        dd($products);

        // Map the image URL to the full path
        $products = $products->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => $product->price,
                'stock' => $product->stock,
                'image' => $product->image ? asset('storage/' . $product->image) : null,
               
              
            ];
        })->values();

        return response()->json($products);
    }

    public function getProductsByCategory($cateId)
    {
        $category = Category::findOrFail($cateId);
        $products = $category->products()->paginate(10);
        $featuredProducts = $category->products()->where('is_featured', true)->get();
        //map the image url to the full path
        $products = $products->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => $product->price,
                'stock' => $product->stock,
                'image' =>  asset('storage/' . $product->image),
                'is_featured' => $product->is_featured,
            

            ];
        })->values();
        return response()->json($products);
    }

}
