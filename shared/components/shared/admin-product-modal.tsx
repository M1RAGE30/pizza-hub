"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useAdminProductModal } from "../../hooks/use-admin-product-modal";
import { Trash2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product?: any;
}

interface Category {
  id: number;
  name: string;
}

interface ProductVariant {
  price: number;
  size: number | null;
  pizzaType: number | null;
}

const getVariantsText = (count: number): string => {
  if (count === 1) return "1 вариант";
  if (count >= 2 && count <= 4) return `${count} варианта`;
  return `${count} вариантов`;
};

export const AdminProductModal: React.FC<Props> = ({ isOpen, onClose, product }) => {
  const {
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
  } = useAdminProductModal(product, onClose);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>
            {product ? "Редактировать продукт" : "Добавить продукт"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название *
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Название продукта"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Категория *
              </label>
              <Select value={formData.categoryId} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category: Category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL изображения *
            </label>
            <Input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Описание
            </label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Описание продукта"
              rows={3}
            />
          </div>

          {isPizzaCategory ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-medium text-gray-900">
                  {getVariantsText(formData.variants.length)}
                </h4>
                <Button
                  type="button"
                  onClick={addVariant}
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                >
                  Добавить вариант
                </Button>
              </div>

              <div className="space-y-4 max-h-60 overflow-y-auto">
                {formData.variants.map((variant: ProductVariant, index: number) => (
                  <div key={index} className="bg-white p-4 rounded-lg border">
                    <div className="flex justify-between items-start mb-3">
                      <h5 className="font-medium text-gray-900">
                        Вариант {index + 1}
                      </h5>
                      {formData.variants.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeVariant(index)}
                          className="text-red-600 hover:text-red-900 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Цена *
                        </label>
                        <Input
                          type="number"
                          value={variant.price}
                          onChange={(e) =>
                            handleVariantChange(index, "price", Number(e.target.value))
                          }
                          placeholder="0"
                          min="0"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Размер
                        </label>
                        <Select
                          value={variant.size?.toString() || "0"}
                          onValueChange={(value) =>
                            handleVariantChange(index, "size", value === "0" ? null : Number(value))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Размер" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Без размера</SelectItem>
                            <SelectItem value="20">20 см</SelectItem>
                            <SelectItem value="25">25 см</SelectItem>
                            <SelectItem value="30">30 см</SelectItem>
                            <SelectItem value="35">35 см</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Тип теста
                        </label>
                        <Select
                          value={variant.pizzaType?.toString() || "0"}
                          onValueChange={(value) =>
                            handleVariantChange(index, "pizzaType", value === "0" ? null : Number(value))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Тип" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Без типа</SelectItem>
                            <SelectItem value="1">Традиционное</SelectItem>
                            <SelectItem value="2">Тонкое</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Цена *
              </label>
              <Input
                type="number"
                value={formData.variants[0]?.price || 0}
                onChange={(e) =>
                  handleVariantChange(0, "price", Number(e.target.value))
                }
                placeholder="0"
                min="0"
                required
              />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Сохранение..." : "Сохранить"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};