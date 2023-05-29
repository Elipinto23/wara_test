<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Empleado;

class EmpleadoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $empleados = Empleado::get();
            return response()->json($empleados, 200);
        } catch (\Throwable $th) {
            return response()->json([ 'error' => $th->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data['nombre'] = $request['nombre'];
            $data['apellido'] = $request['apellido'];
            $data['puesto'] = $request['puesto'];
            $res = Empleado::create($data);
            return response()->json($res, 201);
        } catch (\Throwable $th) {
            return response()->json([ 'error' => $th->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $empleado = Empleado::findOrFail($id);
            return response()->json($empleado, 200);
        } catch (\Throwable $th) {
            return response()->json([ 'error' => $th->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $data['nombre'] = $request['nombre'];
            $data['apellido'] = $request['apellido'];
            $data['puesto'] = $request['puesto'];
            Empleado::findOrFail($id)->update($data);
            $res = Empleado::find($id);
            return response()->json($res, 200);
        } catch (\Throwable $th) {
            return response()->json([ 'error' => $th->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $empleado = Empleado::find($id);
            $res = $empleado->delete();
        return response()->json(
            [
                'empleado' => $empleado,
                'deleted' =>  $res
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([ 'error' => $th->getMessage()], 500);
        }
    }
}
