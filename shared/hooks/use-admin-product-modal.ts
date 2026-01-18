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
        variants:
          product.items?.length > 0
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => {
      const newFormData = { ...prev, categoryId: value };

      if (value === "1") {
        // Для пицц устанавливаем первый вариант с размером и типом теста
        newFormData.variants = [
          { price: prev.variants[0]?.price || 0, size: 25, pizzaType: 1 },
        ];
      } else {
        // Для других категорий убираем размер и тип теста
        newFormData.variants = [
          { price: prev.variants[0]?.price || 0, size: null, pizzaType: null },
        ];
      }

      return newFormData;
    });
  };

  const handleVariantChange = (
    index: number,
    field: keyof ProductVariant,
    value: any,
  ) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant,
      ),
    }));
  };

  const addVariant = () => {
    if (!canAddVariant()) return;

    let newVariant: ProductVariant;

    if (isPizzaCategory) {
      // Для пицц находим первую доступную комбинацию
      const allPossibleCombinations = [
        { size: 25, pizzaType: 1 },
        { size: 25, pizzaType: 2 },
        { size: 30, pizzaType: 1 },
        { size: 30, pizzaType: 2 },
        { size: 35, pizzaType: 1 },
        { size: 35, pizzaType: 2 },
      ];

      const existingCombinations = formData.variants
        .filter((v) => v.size && v.pizzaType)
        .map((v) => `${v.size}-${v.pizzaType}`);

      const availableCombination = allPossibleCombinations.find(
        (combo) =>
          !existingCombinations.includes(`${combo.size}-${combo.pizzaType}`),
      );

      newVariant = {
        price: 0,
        size: availableCombination?.size || 25,
        pizzaType: availableCombination?.pizzaType || 1,
      };
    } else {
      newVariant = { price: 0, size: null, pizzaType: null };
    }

    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, newVariant],
    }));
  };

  const removeVariant = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const isPizzaCategory = formData.categoryId === "1";

  // Функция для получения доступных размеров для конкретного варианта
  const getAvailableSizes = (currentIndex: number) => {
    const sizes = [
      { value: "25", label: "25 см" },
      { value: "30", label: "30 см" },
      { value: "35", label: "35 см" },
    ];

    if (!isPizzaCategory) {
      return [{ value: "0", label: "Без размера" }, ...sizes];
    }

    return sizes.filter((size) => {
      // Проверяем, есть ли уже варианты с этим размером
      const existingVariantsWithSize = formData.variants.filter(
        (variant, index) =>
          index !== currentIndex && variant.size === Number(size.value),
      );

      // Если нет вариантов с этим размером, размер доступен
      if (existingVariantsWithSize.length === 0) return true;

      // Если есть варианты с этим размером, проверяем типы теста
      const existingTypes = existingVariantsWithSize
        .map((v) => v.pizzaType)
        .filter((t) => t !== null);

      // Если уже есть оба типа теста (1 и 2), размер недоступен
      if (existingTypes.includes(1) && existingTypes.includes(2)) return false;

      return true;
    });
  };

  // Функция для получения доступных типов теста для конкретного варианта
  const getAvailablePizzaTypes = (currentIndex: number) => {
    const types = [
      { value: "1", label: "Традиционное" },
      { value: "2", label: "Тонкое" },
    ];

    if (!isPizzaCategory) {
      return [{ value: "0", label: "Без типа" }, ...types];
    }

    const currentVariant = formData.variants[currentIndex];
    if (!currentVariant.size) return types;

    return types.filter((type) => {
      // Проверяем, есть ли уже вариант с таким же размером и типом теста
      const existingVariant = formData.variants.find(
        (variant, index) =>
          index !== currentIndex &&
          variant.size === currentVariant.size &&
          variant.pizzaType === Number(type.value),
      );

      return !existingVariant;
    });
  };

  // Функция для проверки, можно ли добавить новый вариант
  const canAddVariant = () => {
    if (!isPizzaCategory) return true;

    // Максимум 6 вариантов для пиццы (3 размера × 2 типа теста)
    if (formData.variants.length >= 6) return false;

    // Проверяем, есть ли еще доступные комбинации
    const allPossibleCombinations = [
      { size: 25, pizzaType: 1 },
      { size: 25, pizzaType: 2 },
      { size: 30, pizzaType: 1 },
      { size: 30, pizzaType: 2 },
      { size: 35, pizzaType: 1 },
      { size: 35, pizzaType: 2 },
    ];

    const existingCombinations = formData.variants
      .filter((v) => v.size && v.pizzaType)
      .map((v) => `${v.size}-${v.pizzaType}`);

    const availableCombinations = allPossibleCombinations.filter(
      (combo) =>
        !existingCombinations.includes(`${combo.size}-${combo.pizzaType}`),
    );

    return availableCombinations.length > 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.imageUrl || !formData.categoryId) {
      toast.error("Заполните все обязательные поля");
      return;
    }

    if (formData.variants.some((v) => v.price <= 0)) {
      toast.error("Все варианты должны иметь цену больше 0");
      return;
    }

    // Для пицц проверяем, что у всех вариантов есть размер и тип теста
    if (isPizzaCategory) {
      const invalidVariants = formData.variants.filter(
        (v) => !v.size || !v.pizzaType,
      );
      if (invalidVariants.length > 0) {
        toast.error("Для пицц все варианты должны иметь размер и тип теста");
        return;
      }
    }

    // Проверка на дублирование комбинаций размер+тип теста для пицц
    if (isPizzaCategory) {
      const combinations = new Set();
      for (const variant of formData.variants) {
        if (variant.size && variant.pizzaType) {
          const combination = `${variant.size}-${variant.pizzaType}`;
          if (combinations.has(combination)) {
            toast.error(
              "Нельзя создавать одинаковые комбинации размера и типа теста",
            );
            return;
          }
          combinations.add(combination);
        }
      }
    }

    try {
      setLoading(true);

      const productData = {
        name: formData.name,
        imageUrl: formData.imageUrl,
        description: formData.description,
        categoryId: Number(formData.categoryId),
        variants: formData.variants.map((variant) => ({
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
    getAvailableSizes,
    getAvailablePizzaTypes,
    canAddVariant,
  };
};
