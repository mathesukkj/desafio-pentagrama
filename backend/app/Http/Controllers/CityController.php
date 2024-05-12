<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = City::query();
        $paginate = 10;
        if($request->has("city_name")) {
            $query->where('name', "like", "%" . $request->query("city_name") . "%");
        }
        if($request->has("items_per_page")) {
            $paginate = $request->query("items_per_page");
        }
        return $query->paginate($paginate);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required|min:3|string",
            "state" => "required|min:2|string",
            "foundation_date" => "required|date"
        ]);

        $city = City::create([
            "name" => $request->input("name"),
            "state" => $request->input("state"),
            "foundation_date" => $request->input("foundation_date")
        ]);

        return $city;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $city = City::findOrFail($id);

        return $city;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            "name" => "required|min:3|string",
            "state" => "required|min:2|string",
            "foundation_date" => "required|date"
        ]);

        $city = City::findOrFail($id);

        $city->name = $request->input("name");
        $city->state =  $request->input("state");
        $city->foundation_date = $request->input("foundation_date");

        $city->save();

        return $city;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $city = City::findOrFail($id);

        $city->delete();

        return response()->json([], 204);
    }
}
