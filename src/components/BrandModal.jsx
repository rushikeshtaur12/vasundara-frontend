import React, { useState, useEffect } from "react";
export const BrandModal = ({ isOpen, onClose, onSubmit, brandToEdit }) => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [country, setCountry] = useState("");
  const [brandImage, setBrandImage] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [vehiclesToDelete, setVehiclesToDelete] = useState([]);

  useEffect(() => {
    if (brandToEdit) {
      setName(brandToEdit.name || "");
      setYear(brandToEdit.year || "");
      setCountry(brandToEdit.country || "");
      setVehicles(
        (brandToEdit.vehicles || []).map((v, idx) => ({
          ...v,
          tempId: idx,
          color: Array.isArray(v.color) ? v.color : [], // ensure array
          image: null, // file input is always null initially
        }))
      );
      setVehiclesToDelete([]);
      setBrandImage(null);
    } else {
      setName("");
      setYear("");
      setCountry("");
      setBrandImage(null);
      setVehicles([]);
      setVehiclesToDelete([]);
    }
  }, [brandToEdit]);

  const addVehicle = () => {
    setVehicles([
      ...vehicles,
      { tempId: vehicles.length, name: "", price: "", color: [], image: null },
    ]);
  };

  const removeVehicle = (tempId) => {
    const vehicle = vehicles.find((v) => v.tempId === tempId);
    if (vehicle?._id) {
      setVehiclesToDelete([...vehiclesToDelete, vehicle._id]);
    }
    setVehicles(vehicles.filter((v) => v.tempId !== tempId));
  };

  const handleVehicleChange = (tempId, key, value) => {
    setVehicles(
      vehicles.map((v) =>
        v.tempId === tempId ? { ...v, [key]: value } : v
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("year", year);
    formData.append("country", country);
    formData.append("is_exist", true);
    if (brandImage) formData.append("brandImage", brandImage);

    // Handle vehicles dynamically
    const vehiclesData = vehicles
      .filter((v) => v.name && v.price)
      .map((v) => {
        if (v.image) formData.append(`vehicleImage_${v.tempId}`, v.image);
        const payload = {
          tempId: v.tempId,
          name: v.name,
          price: v.price,
          color: v.color, // already array
        };
        if (v._id) payload.id = v._id; // existing vehicle
        return payload;
      });

    formData.append("vehicles", JSON.stringify(vehiclesData));
    formData.append("vehiclesToDelete", JSON.stringify(vehiclesToDelete));

    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">
          {brandToEdit ? "Edit Brand" : "Add Brand"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Brand Fields */}
          <input
            type="text"
            placeholder="Brand Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
          <div>
            <label className="block mb-1">Brand Image</label>
            <input
              type="file"
              onChange={(e) => setBrandImage(e.target.files[0])}
            />
          </div>

          {/* Vehicles */}
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Vehicles</h3>
            {vehicles.map((v) => (
              <div
                key={v.tempId}
                className="border rounded p-3 mb-3 flex flex-col gap-2"
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Vehicle Name"
                    value={v.name}
                    onChange={(e) =>
                      handleVehicleChange(v.tempId, "name", e.target.value)
                    }
                    className="flex-1 border rounded px-2 py-1"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={v.price}
                    onChange={(e) =>
                      handleVehicleChange(v.tempId, "price", e.target.value)
                    }
                    className="w-24 border rounded px-2 py-1"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeVehicle(v.tempId)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
                <div>
                  <label>Vehicle Image</label>
                  <input
                    type="file"
                    onChange={(e) =>
                      handleVehicleChange(v.tempId, "image", e.target.files[0])
                    }
                  />
                </div>
                <div>
                  <label>Color (comma separated)</label>
                  <input
                    type="text"
                    value={v.color.join(",")}
                    onChange={(e) =>
                      handleVehicleChange(
                        v.tempId,
                        "color",
                        e.target.value.split(",").map((c) => c.trim())
                      )
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addVehicle}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Vehicle
            </button>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {brandToEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
