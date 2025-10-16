import { api } from "./axios";

// GET all brands
export const getAllBrands = async () => {
  const res = await api.get("/brands");
  return res.data;
};

// CREATE brand + vehicles
export const createBrand = async (formData) => {
  const res = await api.post("/brands", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// UPDATE brand + vehicles
export const updateBrand = async (brandId, formData) => {
  const res = await api.patch(`/brands/${brandId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// SOFT DELETE brand
export const softDeleteBrand = async (brandId) => {
  const res = await api.patch(`/brands/${brandId}/soft-delete`);
  return res.data;
};

// HARD DELETE brand
export const deleteBrand = async (brandId) => {
  const res = await api.delete(`/brands/${brandId}`);
  return res.data;
};
