<?php

namespace App\Http\Controllers;

use App\Models\Neighborhood;
use Illuminate\Http\Request;

class NeighborhoodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Neighborhood::with("city")->paginate(50);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required|min:3|string",
            "city_id" => "required|integer"
        ]);

        $neighborhood = Neighborhood::create([
            "name" => $request->input("name"),
            "city_id" => $request->input("city_id"),
        ]);

        return $neighborhood;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $neighborhood = Neighborhood::findOrFail($id);

        return $neighborhood;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            "name" => "required|min:3|string",
            "city_id" => "required|integer"
        ]);

        $neighborhood = Neighborhood::findOrFail($id);

        $neighborhood->name = $request->input("name");
        $neighborhood->city_id = $request->input("city_id");
        $neighborhood->save();

        return $neighborhood;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $neighborhood = Neighborhood::findOrFail($id);

        $neighborhood->delete();

        return response()->json([], 204);
    }
}
