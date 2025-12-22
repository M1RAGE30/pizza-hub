import { axiosInstance } from "./instance";

export const getStats = async () => {
  return (await axiosInstance.get("/admin/stats")).data;
};

export const getUsers = async () => {
  return (await axiosInstance.get("/admin/users")).data;
};

export const deleteUser = async (userId: number) => {
  return (await axiosInstance.delete(`/admin/users/${userId}`)).data;
};

export const getProducts = async () => {
  return (await axiosInstance.get("/admin/products")).data;
};

export const createProduct = async (productData: any) => {
  return (await axiosInstance.post("/admin/products", productData)).data;
};

export const updateProduct = async (productId: number, productData: any) => {
  return (await axiosInstance.put(`/admin/products/${productId}`, productData)).data;
};

export const deleteProduct = async (productId: number) => {
  return (await axiosInstance.delete(`/admin/products/${productId}`)).data;
};

export const getCategories = async () => {
  return (await axiosInstance.get("/admin/categories")).data;
};