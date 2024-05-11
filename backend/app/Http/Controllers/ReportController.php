<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function report(Request $request)
    {
        $cityName = $request->query("city_name");
        $neighborhoodName = $request->query("neighborhood_name");
        $roadName = $request->query("road_name");
        $foundationDateStart = $request->query("start_foundation_date");
        $foundationDateFinal = $request->query("final_foundation_date");

        $cities = City::with('neighborhoods.roads')->get();

        return response()->json([
            "cities" => $cities,
        ]);
    }
}
