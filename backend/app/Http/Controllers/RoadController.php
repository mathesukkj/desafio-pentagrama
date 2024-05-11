<?php

namespace App\Http\Controllers;

use App\Models\Road;
use Illuminate\Http\Request;

class RoadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Road::paginate(50);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $road = Road::create([
            "name" => $request->input("name"),
            "neighborhood_id" => $request->input("neighborhood_id"),
        ]);

        return $road;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $road = Road::findOrFail($id);

        return $road;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $road = Road::findOrFail($id);

        $road->name = $request->input("name");
        $road->neighborhood_id = $request->input("neighborhood_id");
        $road->save();

        return $road;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $road = Road::findOrFail($id);

        $road->delete();

        return response()->json([], 204);
    }
}
