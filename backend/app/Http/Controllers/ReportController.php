<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function report(Request $request)
    {
        $cities = City::with('neighborhoods.roads')->get();

        return response()->json([
            "data" => $cities,
        ]);
    }
}
