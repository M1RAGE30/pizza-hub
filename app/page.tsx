import {
  Container,
  Filters,
  ProductsGroupList,
  Title,
  TopBar,
} from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title="Пиццы"
                items={[
                  {
                    id: 1,
                    name: "Сырный цыпленок",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11ee7d5ec38508228fe86b151f762df0.avif",
                    price: 395,
                    items: [{ price: 395 }],
                  },
                  {
                    id: 2,
                    name: "Сырный цыпленок",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11ee7d5ec38508228fe86b151f762df0.avif",
                    price: 395,
                    items: [{ price: 395 }],
                  },
                  {
                    id: 3,
                    name: "Сырный цыпленок",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11ee7d5ec38508228fe86b151f762df0.avif",
                    price: 395,
                    items: [{ price: 395 }],
                  },
                  {
                    id: 4,
                    name: "Сырный цыпленок",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11ee7d5ec38508228fe86b151f762df0.avif",
                    price: 395,
                    items: [{ price: 395 }],
                  },
                  {
                    id: 5,
                    name: "Сырный цыпленок",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11ee7d5ec38508228fe86b151f762df0.avif",
                    price: 395,
                    items: [{ price: 395 }],
                  },
                ]}
                categoryId={1}
              />

              <ProductsGroupList
                title="Комбо"
                items={[
                  {
                    id: 1,
                    name: "Сырный цыпленок",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11ee7d5ec38508228fe86b151f762df0.avif",
                    price: 395,
                    items: [{ price: 395 }],
                  },
                  {
                    id: 2,
                    name: "Сырный цыпленок",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11ee7d5ec38508228fe86b151f762df0.avif",
                    price: 395,
                    items: [{ price: 395 }],
                  },
                  {
                    id: 3,
                    name: "Сырный цыпленок",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11ee7d5ec38508228fe86b151f762df0.avif",
                    price: 395,
                    items: [{ price: 395 }],
                  },
                  {
                    id: 4,
                    name: "Сырный цыпленок",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11ee7d5ec38508228fe86b151f762df0.avif",
                    price: 395,
                    items: [{ price: 395 }],
                  },
                  {
                    id: 5,
                    name: "Сырный цыпленок",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11ee7d5ec38508228fe86b151f762df0.avif",
                    price: 395,
                    items: [{ price: 395 }],
                  },
                ]}
                categoryId={2}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
