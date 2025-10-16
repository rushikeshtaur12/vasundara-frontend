import React, { useState, useEffect } from "react";
import { VehicleInput } from "./VehicleInput";

export const BrandModal = ({ isOpen, onClose, onSubmit, brandToEdit }) => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [country, setCountry] = useState("");
  const [brandImage, setBrandImage] = useState(null);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    if (brandToEdit) {
      setName(brandToEdit.name);
      setYear(brandToEdit.year);
      setCountry(brandToEdit.country);
      setVehicles(brandToEdit.vehicles.map((v, idx) => ({ ...v, tempId: idx, image: null })));
    } else {
      setVehicles([{ tempId: 0, name: "", price: "", color: [], image: null }]);
    }
  }, [brandToEdit]);

  const handleVehicleChange = (idx, field, value) => {
    const newVehicles = [...vehicles];
    newVehicles[idx][field] = value;
    setVehicles(newVehicles);
  };

  const handleAddVehicle = () => setVehicles([...vehicles, { tempId: vehicles.length, name: "", price: "", color: [], image: null }]);
  const handleRemoveVehicle = (idx) => setVehicles(vehicles.filter((_, i) => i !== idx));

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("name", name);
  formData.append("year", year);
  formData.append("country", country);
  formData.append("is_exist", true); // auto add

  if (brandImage) formData.append("brandImage", brandImage);

  // Only include vehicles with valid name & price
  const vehiclesData = vehicles
    .filter(v => v.name && v.price) // skip empty vehicles
    .map((v) => {
      if (v.image) formData.append(`vehicleImage_${v.tempId}`, v.image);
      return { tempId: v.tempId, name: v.name, price: v.price, color: v.color };
    });

  formData.append("vehicles", JSON.stringify(vehiclesData));

  onSubmit(formData);
  onClose();
};


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">{brandToEdit ? "Edit Brand" : "Add Brand"}</h2>
      <input type="text" placeholder="Brand Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded w-full" required/>
      <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} className="border p-2 rounded w-full" required/>
      <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} className="border p-2 rounded w-full"  required/>
      <input type="file" onChange={(e) => setBrandImage(e.target.files[0])} />

      <h3 className="font-semibold mt-4">Vehicles</h3>
      {vehicles.map((v, idx) => (
        <VehicleInput
          key={v.tempId}
          vehicle={v}
          onChange={(field, value) => handleVehicleChange(idx, field, value)}
          onRemove={() => handleRemoveVehicle(idx)}
        />
      ))}

      <button type="button" onClick={handleAddVehicle} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Add Vehicle</button>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">{brandToEdit ? "Update Brand" : "Create Brand"}</button>
    </form>
  );
};
