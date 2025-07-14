<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Links to the user
            $table->string('recipient_name');
            $table->string('line1');              // Street address
            $table->string('line2')->nullable();   // Apartment, suite, etc.
            $table->string('city');
            $table->string('state');
            $table->string('postal_code');
            $table->string('country');
            $table->string('phone');
            $table->boolean('is_default')->default(false);
            $table->decimal('latitude', 10, 7)->nullable();   // Latitude from Google Maps
            $table->decimal('longitude', 10, 7)->nullable();  // Longitude from Google Maps
            $table->string('place_id')->nullable();           // Google Maps Place ID
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
    }
};
