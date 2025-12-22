import React from "react";
import { Api } from "../services/api-client";
import toast from "react-hot-toast";

interface ProductVariant {
  price: number;
  size: number | null;
  pizzaType: number | null;
}

interface ProductFormData {
  name: string;
  imageUrl: string;
  description: string;
  categoryId: string;
  variants: ProductVariant[];
}

export const useAdminProductModal = (product: any, onClose: () => void) => {
  const [formData, setFormData] = React.useState<ProductFormData>({
    name: "",
    imageUrl: "",
    description: "",
    categoryId: "",
    variants: [{ price: 0, size: null, pizzaType: null }],
  });
  const [categories, setCategories] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await Api.admin.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  React.useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        imageUrl: product.imageUrl || "",
        description: product.description || "",
        categoryId: product.categoryId?.toString() || "",
        variants: product.items?.length > 0 
          ? product.items.map((item: any) => ({
              price: item.price || 0,
              size: item.size || null,
              pizzaType: item.pizzaType || null,
            }))
          : [{ price: 0, size: null, pizzaType: null }],
      });
    } else {
      setFormData({
        name: "",
        imageUrl: "",
        description: "",
        categoryId: "",
        variants: [{ price: 0, size: null, pizzaType: null }],
      });
    }
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => {
      const newFormData = { ...prev, categoryId: value };
      
      if (value !== "1") {
        newFormData.variants = [{ price: prev.variants[0]?.price || 0, size: null, pizzaType: null }];
      }
      
      return newFormData;
    });
  };

  const handleVariantChange = (index: number, field: keyof ProductVariant, value: any) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant
      ),
    }));
  };

  const addVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, { price: 0, size: null, pizzaType: null }],
    }));
  };

  const removeVariant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const isPizzaCategory = formData.categoryId === "1";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.imageUrl || !formData.categoryId) {
      toast.error("Заполните все обязательные поля");
      return;
    }

    if (formData.variants.some(v => v.price <= 0)) {
      toast.error("Все варианты должны иметь цену больше 0");
      return;
    }

    try {
      setLoading(true);
      
      const productData = {
        name: formData.name,
        imageUrl: formData.imageUrl,
        description: formData.description,
        categoryId: Number(formData.categoryId),
        variants: formData.variants.map(variant => ({
          price: variant.price,
          size: variant.size === null ? null : variant.size,
          pizzaType: variant.pizzaType === null ? null : variant.pizzaType,
        })),
      };

      if (product) {
        await Api.admin.updateProduct(product.id, productData);
        toast.success("Продукт обновлен");
      } else {
        await Api.admin.createProduct(productData);
        toast.success("Продукт создан");
      }

      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Ошибка при сохранении продукта");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    categories,
    loading,
    isPizzaCategory,
    handleInputChange,
    handleCategoryChange,
    handleVariantChange,
    addVariant,
    removeVariant,
    handleSubmit,
  };
};