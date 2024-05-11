<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function report(Request $request)
    {
        $query = City::query();

        if($request->has("city_name")) {
            $query->where('name', "like", "%" . $request->query("city_name") . "%");
        }

        if ($request->has('neighborhood_name')) {
            $query->whereHas('neighborhoods', function ($query) use ($request) {
                $query->where('name', "like", "%" . $request->query("neighborhood_name") . "%");
            });
        }

        if ($request->has('road_name')) {
            $query->whereHas('neighborhoods.roads', function ($query) use ($request) {
                $query->where('name', "like", "%" . $request->query("road_name") . "%");
            });
        }

        if($request->has("start_foundation_date")) {
            $query->where("foundation_date", ">=", $request->query("start_foundation_date"));
        }

        if($request->has("end_foundation_date")) {
            $query->where("foundation_date", "<", $request->query("end_foundation_date"));
        }

        $cities = $query->with(['neighborhoods' => function ($query) {
            $query->with('roads')->limit(20);
        }])->paginate(10);

        $cities->transform(function ($city) {
            $city->neighborhoods->makeHidden(['city_id']);
            $city->neighborhoods->flatMap(function ($neighborhood) {
                $neighborhood->roads->makeHidden(['neighborhood_id']);
                return $neighborhood;
            });
            return $city;
        });

        return response()->json([
            "cities" => $cities,
        ]);
    }
}
