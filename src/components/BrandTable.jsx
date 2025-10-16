import React from "react";

export const BrandTable = ({ brands, onEdit, onSoftDelete, onRestore, onDelete }) => (
  <table className="min-w-full border-collapse border border-gray-300">
    <thead className="bg-gray-100">
      <tr>
        <th className="border p-2">Brand</th>
        <th className="border p-2">Country</th>
        <th className="border p-2">Year</th>
        <th className="border p-2">Vehicles</th>
        <th className="border p-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {brands.map((b) => (
        <tr key={b._id} className={b.is_deleted ? "bg-gray-200 line-through" : ""}>
          <td className="border p-2 flex items-center gap-2">
            {b.image && <img src={`http://localhost:5000/${b.image}`} className="w-10 h-10 object-cover rounded" />}
            {b.name}
          </td>
          <td className="border p-2">{b.country}</td>
          <td className="border p-2">{b.year}</td>
          <td className="border p-2">
            {b.vehicles.map((v) => (
              <span key={v._id} className="inline-block bg-gray-100 px-2 py-1 rounded mr-1 mb-1">{v.name}</span>
            ))}
          </td>
          <td className="border p-2 flex gap-2">
            {b.is_deleted ? (
              <button onClick={() => onRestore(b._id)} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">Restore</button>
            ) : (
              <>
                <button onClick={() => onEdit(b)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Edit</button>
                {/* <button onClick={() => onSoftDelete(b._id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Soft Delete</button> */}
                <button onClick={() => onDelete(b._id)} className="bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-800">Delete</button>
              </>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
