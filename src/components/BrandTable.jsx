export const BrandTable = ({ brands, onEdit, onSoftDelete, onRestore, onDelete,loading }) => {
  return (
    <div className="overflow-x-auto">
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
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center py-10 text-gray-400">
                Loading brands...
              </td>
            </tr>
          ) : brands.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-10 text-gray-400">
                <div className="flex flex-col items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17v-2a2 2 0 00-2-2H5a2 2 0 00-2 2v2m6 0h6m6 0v-2a2 2 0 00-2-2h-2a2 2 0 00-2 2v2m4-10V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v2m6 0H9"
                    />
                  </svg>
                  <p className="text-lg font-semibold">No brands available</p>
                  <p className="text-sm text-gray-400">Please add a new brand to get started.</p>
                </div>
              </td>
            </tr>
          ) : (
            brands.map((b) => (
              <tr key={b._id} className={b.is_deleted ? "bg-gray-100 line-through" : ""}>
                <td className="px-6 py-4 flex items-center gap-2">
                  {b.image && (
                    <img
                      src={`http://localhost:5000/uploads/${b.image}`}
                      alt="brand"
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg";
                      }}
                    />
                  )}
                  <span className="font-medium">{b.name}</span>
                </td>
                <td className="px-6 py-4">{b.year}</td>
                <td className="px-6 py-4">{b.country}</td>
                <td className="px-6 py-4">
                  {b.vehicles?.map((v) => (
                    <div key={v._id} className="flex items-center gap-2 mb-1">
                      {v.image && (
                        <img
                          src={`http://localhost:5000/uploads/${v.image}`}
                          alt="vehicle"
                          className="w-6 h-6 rounded"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg";
                          }}
                        />
                      )}
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
                  <button
                    onClick={() => onDelete(b._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
