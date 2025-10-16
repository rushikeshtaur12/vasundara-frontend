import React from "react";

export const BrandTable = ({ brands, onEdit, onSoftDelete, onRestore, onDelete }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Brand</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Year</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Country</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Vehicles</th>
          <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {brands.map((b) => (
          <tr key={b._id} className={b.is_deleted ? "bg-gray-100 line-through" : ""}>
            <td className="px-6 py-4 flex items-center gap-2">
              {b.image && <img src={`http://localhost:5000/uploads/${b.image}`} alt="brand" className="w-10 h-10 rounded-full object-cover"/>}
              <span className="font-medium">{b.name}</span>
            </td>
            <td className="px-6 py-4">{b.year}</td>
            <td className="px-6 py-4">{b.country}</td>
            <td className="px-6 py-4">
              {b.vehicles?.map((v) => (
                <div key={v._id} className="flex items-center gap-2 mb-1">
                  {v.image && <img src={`http://localhost:5000/uploads/${v.image}`} alt="vehicle" className="w-6 h-6 rounded"/>}
                  <span>{v.name} (${v.price})</span>
                </div>
              ))}
            </td>
            <td className="px-6 py-4 flex justify-end gap-2">
              <button
                onClick={() => onEdit(b)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              {/* {b.is_deleted ? (
                <button
                  onClick={() => onRestore(b._id)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  Restore
                </button>
              ) : (
                <button
                  onClick={() => onSoftDelete(b._id)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded"
                >
                  Soft Delete
                </button>
              )} */}
              <button
                onClick={() => onDelete(b._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


