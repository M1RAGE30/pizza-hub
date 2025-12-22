import React from "react";
import { Api } from "../services/api-client";
import toast from "react-hot-toast";

export const useAdminProducts = () => {
  const [products, setProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await Api.admin.getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Ошибка при загрузке продуктов");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId: number) => {
    if (!confirm("Вы уверены, что хотите удалить этот продукт?")) {
      return;
    }

    try {
      await Api.admin.deleteProduct(productId);
      setProducts(products.filter(product => product.id !== productId));
      toast.success("Продукт удален");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Ошибка при удалении продукта");
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, deleteProduct, refetch: fetchProducts };
};