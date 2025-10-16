
import './App.css';
import React, { useState, useEffect } from "react";
import { BrandTable } from "./components/BrandTable";
import { BrandModal } from "./components/BrandModal";
import { Modal } from "./components/Modal";
import { getAllBrands, createBrand, updateBrand, softDeleteBrand, deleteBrand } from "./api/brandApi";

function App() {
  const [brands, setBrands] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [brandToEdit, setBrandToEdit] = useState(null);

  const fetchBrands = async () => {
    const data = await getAllBrands();
    setBrands(data);
  };

  useEffect(() => { fetchBrands(); }, []);

  const handleAdd = () => { setBrandToEdit(null); setModalOpen(true); };
  const handleEdit = (brand) => { setBrandToEdit(brand); setModalOpen(true); };
  const handleSubmit = async (formData) => {
    if (brandToEdit) await updateBrand(brandToEdit._id, formData);
    else await createBrand(formData);
    fetchBrands();
    setModalOpen(false);
  };
  const handleSoftDelete = async (id) => { await softDeleteBrand(id); fetchBrands(); };
  const handleDelete = async (id) => { await deleteBrand(id); fetchBrands(); };
  const handleRestore = fetchBrands;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Brand & Vehicle Dashboard</h1>
          <button
            onClick={handleAdd}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-md transition"
          >
            Add Brand
          </button>
        </div>

        {/* Brand Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <BrandTable
            brands={brands}
            onEdit={handleEdit}
            onSoftDelete={handleSoftDelete}
            onRestore={handleRestore}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <BrandModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          brandToEdit={brandToEdit}
        />
      </Modal>
    </div>
  );
}

export default App;
