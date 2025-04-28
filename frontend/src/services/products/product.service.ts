import { api } from "../api";

export const productService = {
  getAllProducts: async (filter: string, page: number, pageSize: number) => {
    const response = await api.get("/product", { params: { name: filter, page, pageSize } });
    return response.data;
  },

  getProductById: async (id: string) => {
    const response = await api.get(`/product/${id}`);
    return response.data;
  },

  createProduct: async (product: any) => {
    const response = await api.post("/product", product);
    return response.data;
  },

  updateProduct: async (id: string, product: any) => {
    const response = await api.patch(`/product/${id}`, product);
    return response.data;
  },

  deleteProduct: async (id: string) => {
    const response = await api.delete(`/product/${id}`);
    return response.data;
  },
};
