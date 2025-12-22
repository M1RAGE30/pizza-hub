import { Prisma } from "@prisma/client";
import { ingredients, categories, products, productPrices } from "./constants";
import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";

const convertToBYN = (rubPrice: number): number => {
  return Math.round(rubPrice / 30);
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
  price,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 25 | 30 | 35;
  price?: number;
}) => {
  return {
    productId,
    price: price !== undefined ? convertToBYN(price) : 0,
    pizzaType,
    size,
  } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "Администратор",
        email: "admin@pizzahub.com",
        password: hashSync("Admin123456!", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const createdProducts = await prisma.product.findMany({
    where: {
      name: {
        in: products.map((p) => p.name),
      },
    },
  });

  const getIngredientIdsByName = (names: string[]): number[] => {
    return ingredients
      .filter((ing) =>
        names.some(
          (name) =>
            ing.name.toLowerCase().includes(name.toLowerCase()) ||
            name.toLowerCase().includes(ing.name.toLowerCase())
        )
      )
      .map((ing) => ing.id);
  };

  const pizza1 = await prisma.product.create({
    data: {
      name: "Пицца с хреном",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/0199b8e98ec871ab8a443887a3e1a136.avif",
      description:
        "Возможно первая в истории пицца с пикантным сливочным хреном, свиной шейкой и маринованными огурчиками. Дерзайте пробовать!",
      categoryId: 1,
      composition: getIngredientIdsByName([
        "Свиная шейка",
        "Красный лук",
        "Маринованные огурчики",
        "Моцарелла",
      ]) as Prisma.InputJsonValue,
      ingredients: {
        connect: ingredients,
      },
    } as any,
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: "Додо",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/019ac604bad37209b1ec496bbdd98560.avif",
      description:
        "Секрет обновленной пиццы — в новом соусе. Он усиливает вкус и делает сочетание бекона, говядины и пепперони еще мяснее!",
      categoryId: 1,
      composition: getIngredientIdsByName([
        "Бекон",
        "Пряная говядина",
        "Пикантная пепперони",
        "Моцарелла",
        "Свежие томаты",
        "Шампиньоны",
        "Сладкий перец",
        "Красный лук",
      ]) as Prisma.InputJsonValue,
      ingredients: {
        connect: ingredients,
      },
    } as any,
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: "Пепперони фреш",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/0198bf57bc517218ab93c762f4b0193e.avif",
      description:
        "Пикантная пепперони, увеличенная порция моцареллы, томаты, фирменный томатный соус",
      categoryId: 1,
      composition: getIngredientIdsByName([
        "Пикантная пепперони",
        "Моцарелла",
        "Свежие томаты",
      ]) as Prisma.InputJsonValue,
      ingredients: {
        connect: ingredients,
      },
    } as any,
  });

  const pizza4 = await prisma.product.create({
    data: {
      name: "Чесночный цыпленок",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/0198bf24170179679a7872f2ddf16d18.avif",
      description:
        "Цыпленок, чеснок, томаты, моцарелла, фирменный соус альфредо",
      categoryId: 1,
      composition: getIngredientIdsByName([
        "Нежный цыпленок",
        "Свежие томаты",
        "Моцарелла",
      ]) as Prisma.InputJsonValue,
      ingredients: {
        connect: ingredients,
      },
    } as any,
  });

  const pizza5 = await prisma.product.create({
    data: {
      name: "Терияки",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/019a10a0c9ab792190a97768688bc6e9.avif",
      description:
        "Цыпленок, красный лук, сладкий перец, соус терияки, сыр моцарелла и фирменный соус альфредо",
      categoryId: 1,
      composition: getIngredientIdsByName([
        "Нежный цыпленок",
        "Сладкий перец",
        "Красный лук",
        "Моцарелла",
      ]) as Prisma.InputJsonValue,
      ingredients: {
        connect: ingredients,
      },
    } as any,
  });

  const pizza6 = await prisma.product.create({
    data: {
      name: "Четыре сыра",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/019a109fe01672189d029a725ba99705.avif",
      description:
        "Сыр блю чиз, сыры чеддер и пармезан, моцарелла, фирменный соус альфредо",
      categoryId: 1,
      composition: getIngredientIdsByName([
        "Сыр блю чиз",
        "Сыры чеддер и пармезан",
        "Моцарелла",
      ]) as Prisma.InputJsonValue,
      ingredients: {
        connect: ingredients,
      },
    } as any,
  });

  const pizza7 = await prisma.product.create({
    data: {
      name: "Сырная",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/0198bf40eb1171aabe90b1b3ce07c0c5.avif",
      description: "Моцарелла, сыры чеддер и пармезан, фирменный соус альфредо",
      categoryId: 1,
      composition: getIngredientIdsByName([
        "Моцарелла",
        "Сыры чеддер и пармезан",
      ]) as Prisma.InputJsonValue,
      ingredients: {
        connect: ingredients,
      },
    } as any,
  });

  const pizza8 = await prisma.product.create({
    data: {
      name: "Чоризо фреш",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/0198bf4f806371f19d529f9e9e7dba36.avif",
      description:
        "Острые колбаски чоризо, сладкий перец, моцарелла, фирменный томатный соус",
      categoryId: 1,
      composition: getIngredientIdsByName([
        "Острая чоризо",
        "Сладкий перец",
        "Моцарелла",
      ]) as Prisma.InputJsonValue,
      ingredients: {
        connect: ingredients,
      },
    } as any,
  });

  const pizza9 = await prisma.product.create({
    data: {
      name: "Ветчина и сыр",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/0198bf283b2372ea8e7cfc8adae9ea84.avif",
      description: "Ветчина, моцарелла, фирменный соус альфредо",
      categoryId: 1,
      composition: getIngredientIdsByName([
        "Ветчина",
        "Моцарелла",
      ]) as Prisma.InputJsonValue,
      ingredients: {
        connect: ingredients,
      },
    } as any,
  });

  const pizza10 = await prisma.product.create({
    data: {
      name: "Двойной цыпленок",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/0198bf3e424371b49f0b8d7dbe320a70.avif",
      description:
        "Двойная порция цыпленка, моцарелла, фирменный соус альфредо",
      categoryId: 1,
      composition: getIngredientIdsByName([
        "Нежный цыпленок",
        "Моцарелла",
      ]) as Prisma.InputJsonValue,
      ingredients: {
        connect: ingredients,
      },
    } as any,
  });

  const pizza11 = await prisma.product.create({
    data: {
      name: "Креветка и песто",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/0198bf4d218b75d4a3e667fc2f6d7643.avif",
      description:
        "Креветки, томаты, шампиньоны, соус песто, моцарелла, итальянские травы, фирменный томатный соус",
      categoryId: 1,
      composition: getIngredientIdsByName([
        "Креветки",
        "Свежие томаты",
        "Шампиньоны",
        "Моцарелла",
        "Итальянские травы",
      ]) as Prisma.InputJsonValue,
      ingredients: {
        connect: ingredients,
      },
    } as any,
  });

  const pizza12 = await prisma.product.create({
    data: {
      name: "Чилл Грилл",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/0198bf4624de7324966f2fc62c3ca673.avif",
      description:
        "Двойная порция цыпленка, маринованные огурчики, красный лук, соус гриль, моцарелла, чеснок, фирменный соус альфредо",
      categoryId: 1,
      composition: getIngredientIdsByName([
        "Нежный цыпленок",
        "Маринованные огурчики",
        "Красный лук",
        "Моцарелла",
      ]) as Prisma.InputJsonValue,
      ingredients: {
        connect: ingredients,
      },
    } as any,
  });

  await prisma.productItem.createMany({
    data: [
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 1,
        size: 20,
        price: 479,
      }),
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 1,
        size: 25,
        price: 609,
      }),
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 1,
        size: 30,
        price: 839,
      }),
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 2,
        size: 30,
        price: 839,
      }),
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 1,
        size: 35,
        price: 999,
      }),
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 2,
        size: 35,
        price: 999,
      }),

      generateProductItem({
        productId: pizza2.id,
        pizzaType: 1,
        size: 20,
        price: 539,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 1,
        size: 25,
        price: 679,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 1,
        size: 30,
        price: 929,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 2,
        size: 30,
        price: 929,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 1,
        size: 35,
        price: 1099,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 2,
        size: 35,
        price: 1099,
      }),

      generateProductItem({
        productId: pizza3.id,
        pizzaType: 1,
        size: 20,
        price: 289,
      }),
      generateProductItem({
        productId: pizza3.id,
        pizzaType: 1,
        size: 25,
        price: 369,
      }),
      generateProductItem({
        productId: pizza3.id,
        pizzaType: 1,
        size: 30,
        price: 629,
      }),
      generateProductItem({
        productId: pizza3.id,
        pizzaType: 2,
        size: 30,
        price: 629,
      }),
      generateProductItem({
        productId: pizza3.id,
        pizzaType: 1,
        size: 35,
        price: 749,
      }),
      generateProductItem({
        productId: pizza3.id,
        pizzaType: 2,
        size: 35,
        price: 749,
      }),

      generateProductItem({
        productId: pizza4.id,
        pizzaType: 1,
        size: 20,
        price: 289,
      }),
      generateProductItem({
        productId: pizza4.id,
        pizzaType: 1,
        size: 25,
        price: 369,
      }),
      generateProductItem({
        productId: pizza4.id,
        pizzaType: 1,
        size: 30,
        price: 629,
      }),
      generateProductItem({
        productId: pizza4.id,
        pizzaType: 2,
        size: 30,
        price: 629,
      }),
      generateProductItem({
        productId: pizza4.id,
        pizzaType: 1,
        size: 35,
        price: 749,
      }),
      generateProductItem({
        productId: pizza4.id,
        pizzaType: 2,
        size: 35,
        price: 749,
      }),

      generateProductItem({
        productId: pizza5.id,
        pizzaType: 1,
        size: 20,
        price: 379,
      }),
      generateProductItem({
        productId: pizza5.id,
        pizzaType: 1,
        size: 25,
        price: 479,
      }),
      generateProductItem({
        productId: pizza5.id,
        pizzaType: 1,
        size: 30,
        price: 719,
      }),
      generateProductItem({
        productId: pizza5.id,
        pizzaType: 2,
        size: 30,
        price: 719,
      }),
      generateProductItem({
        productId: pizza5.id,
        pizzaType: 1,
        size: 35,
        price: 859,
      }),
      generateProductItem({
        productId: pizza5.id,
        pizzaType: 2,
        size: 35,
        price: 859,
      }),

      generateProductItem({
        productId: pizza6.id,
        pizzaType: 1,
        size: 20,
        price: 399,
      }),
      generateProductItem({
        productId: pizza6.id,
        pizzaType: 1,
        size: 25,
        price: 499,
      }),
      generateProductItem({
        productId: pizza6.id,
        pizzaType: 1,
        size: 30,
        price: 749,
      }),
      generateProductItem({
        productId: pizza6.id,
        pizzaType: 2,
        size: 30,
        price: 749,
      }),
      generateProductItem({
        productId: pizza6.id,
        pizzaType: 1,
        size: 35,
        price: 899,
      }),
      generateProductItem({
        productId: pizza6.id,
        pizzaType: 2,
        size: 35,
        price: 899,
      }),

      generateProductItem({
        productId: pizza7.id,
        pizzaType: 1,
        size: 20,
        price: 289,
      }),
      generateProductItem({
        productId: pizza7.id,
        pizzaType: 1,
        size: 25,
        price: 369,
      }),
      generateProductItem({
        productId: pizza7.id,
        pizzaType: 1,
        size: 30,
        price: 629,
      }),
      generateProductItem({
        productId: pizza7.id,
        pizzaType: 2,
        size: 30,
        price: 629,
      }),
      generateProductItem({
        productId: pizza7.id,
        pizzaType: 1,
        size: 35,
        price: 749,
      }),
      generateProductItem({
        productId: pizza7.id,
        pizzaType: 2,
        size: 35,
        price: 749,
      }),

      generateProductItem({
        productId: pizza8.id,
        pizzaType: 1,
        size: 20,
        price: 289,
      }),
      generateProductItem({
        productId: pizza8.id,
        pizzaType: 1,
        size: 25,
        price: 369,
      }),
      generateProductItem({
        productId: pizza8.id,
        pizzaType: 1,
        size: 30,
        price: 629,
      }),
      generateProductItem({
        productId: pizza8.id,
        pizzaType: 2,
        size: 30,
        price: 629,
      }),
      generateProductItem({
        productId: pizza8.id,
        pizzaType: 1,
        size: 35,
        price: 749,
      }),
      generateProductItem({
        productId: pizza8.id,
        pizzaType: 2,
        size: 35,
        price: 749,
      }),

      generateProductItem({
        productId: pizza9.id,
        pizzaType: 1,
        size: 20,
        price: 339,
      }),
      generateProductItem({
        productId: pizza9.id,
        pizzaType: 1,
        size: 25,
        price: 429,
      }),
      generateProductItem({
        productId: pizza9.id,
        pizzaType: 1,
        size: 30,
        price: 679,
      }),
      generateProductItem({
        productId: pizza9.id,
        pizzaType: 2,
        size: 30,
        price: 679,
      }),
      generateProductItem({
        productId: pizza9.id,
        pizzaType: 1,
        size: 35,
        price: 799,
      }),
      generateProductItem({
        productId: pizza9.id,
        pizzaType: 2,
        size: 35,
        price: 799,
      }),

      generateProductItem({
        productId: pizza10.id,
        pizzaType: 1,
        size: 20,
        price: 349,
      }),
      generateProductItem({
        productId: pizza10.id,
        pizzaType: 1,
        size: 25,
        price: 439,
      }),
      generateProductItem({
        productId: pizza10.id,
        pizzaType: 1,
        size: 30,
        price: 689,
      }),
      generateProductItem({
        productId: pizza10.id,
        pizzaType: 2,
        size: 30,
        price: 689,
      }),
      generateProductItem({
        productId: pizza10.id,
        pizzaType: 1,
        size: 35,
        price: 809,
      }),
      generateProductItem({
        productId: pizza10.id,
        pizzaType: 2,
        size: 35,
        price: 809,
      }),

      generateProductItem({
        productId: pizza11.id,
        pizzaType: 1,
        size: 20,
        price: 519,
      }),
      generateProductItem({
        productId: pizza11.id,
        pizzaType: 1,
        size: 25,
        price: 649,
      }),
      generateProductItem({
        productId: pizza11.id,
        pizzaType: 1,
        size: 30,
        price: 929,
      }),
      generateProductItem({
        productId: pizza11.id,
        pizzaType: 2,
        size: 30,
        price: 929,
      }),
      generateProductItem({
        productId: pizza11.id,
        pizzaType: 1,
        size: 35,
        price: 1099,
      }),
      generateProductItem({
        productId: pizza11.id,
        pizzaType: 2,
        size: 35,
        price: 1099,
      }),

      generateProductItem({
        productId: pizza12.id,
        pizzaType: 1,
        size: 20,
        price: 399,
      }),
      generateProductItem({
        productId: pizza12.id,
        pizzaType: 1,
        size: 25,
        price: 499,
      }),
      generateProductItem({
        productId: pizza12.id,
        pizzaType: 1,
        size: 30,
        price: 749,
      }),
      generateProductItem({
        productId: pizza12.id,
        pizzaType: 2,
        size: 30,
        price: 749,
      }),
      generateProductItem({
        productId: pizza12.id,
        pizzaType: 1,
        size: 35,
        price: 899,
      }),
      generateProductItem({
        productId: pizza12.id,
        pizzaType: 2,
        size: 35,
        price: 899,
      }),

      ...createdProducts.map((product) => {
        const price = productPrices[product.name];
        return {
          productId: product.id,
          price: price, 
        };
      }),
    ],
  });

  await prisma.story.createMany({
    data: [
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284",
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 2,
        sourceUrl:
          "https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 2,
        sourceUrl:
          "https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 2,
        sourceUrl:
          "https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 3,
        sourceUrl:
          "https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 3,
        sourceUrl:
          "https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 4,
        sourceUrl:
          "https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 4,
        sourceUrl:
          "https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 4,
        sourceUrl:
          "https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 5,
        sourceUrl:
          "https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 5,
        sourceUrl:
          "https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 5,
        sourceUrl:
          "https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 5,
        sourceUrl:
          "https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 6,
        sourceUrl:
          "https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 6,
        sourceUrl:
          "https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE",
      },
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
