import React from "react";

export const VehicleInput = ({ vehicle, onChange, onRemove }) => (
  <div className="border p-3 rounded mb-2 flex flex-col md:flex-row md:items-center gap-4">
    <input type="text" placeholder="Vehicle Name" value={vehicle.name} onChange={(e) => onChange("name", e.target.value)} className="border p-2 rounded w-full md:w-1/4" />
    <input type="number" placeholder="Price" value={vehicle.price} onChange={(e) => onChange("price", e.target.value)} className="border p-2 rounded w-full md:w-1/4" />
    <input type="text" placeholder="Color (comma separated)" value={vehicle.color} onChange={(e) => onChange("color", e.target.value.split(","))} className="border p-2 rounded w-full md:w-1/4" />
    <input type="file" onChange={(e) => onChange("image", e.target.files[0])} className="w-full md:w-1/4" />
    <button onClick={onRemove} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Remove</button>
  </div>
);
