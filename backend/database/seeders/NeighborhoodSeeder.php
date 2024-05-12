<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Neighborhood;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NeighborhoodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cityIds = City::pluck('id')->all();

        foreach ($cityIds as $cityId) {
            Neighborhood::factory()->count(20)->create([
                'city_id' => $cityId,
            ]);
        }
    }
}
