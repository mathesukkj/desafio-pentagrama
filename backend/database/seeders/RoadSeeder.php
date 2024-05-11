<?php

namespace Database\Seeders;

use App\Models\Neighborhood;
use App\Models\Road;
use Illuminate\Database\Seeder;

class RoadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $neighborhoodIds = Neighborhood::pluck('id')->all();

        foreach ($neighborhoodIds as $neighborhoodId) {
            Road::factory()->count(20)->create([
                'neighborhood_id' => $neighborhoodId,
            ]);
        }
    }
}
