export const categories = [
  {
    name: "Пиццы",
  },
  {
    name: "Завтрак",
  },
  {
    name: "Закуски",
  },
  {
    name: "Коктейли",
  },
  {
    name: "Кофе",
  },
];

export const ingredients = [
  {
    name: "Сырный бортик",
    price: 205,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png",
  },
  {
    name: "Пряная говядина",
    price: 119,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/01991530635b73ecb1a22658b49e1653.png",
  },
  {
    name: "Моцарелла",
    price: 90,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/0199ae74f2fd783b8fb21bb0af7d09e6.png",
  },
  {
    name: "Сыры чеддер и пармезан",
    price: 79,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/0199152f32e47035aefbe8c971c54502.png",
  },
  {
    name: "Сыр блю чиз",
    price: 59,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/0199153050ea707cbed48b92097e095f.png",
  },
  {
    name: "Острый перец халапеньо",
    price: 39,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/0199152c7eb27553a08f57c8c9861ac3.png",
  },
  {
    name: "Нежный цыпленок",
    price: 49,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/0199152e59157089adb89948280ebb10.png",
  },
  {
    name: "Шампиньоны",
    price: 39,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/0199152bfda5723f8bbecc43a35f83f1.png",
  },
  {
    name: "Бекон",
    price: 49,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/0199ae744508792995ccae4ff71e233e.png",
  },
  {
    name: "Ветчина",
    price: 49,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/0199152d7fd075a9b11d17f8acaf1670.png",
  },
  {
    name: "Пикантная пепперони",
    price: 59,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/0199152b6e6978a188ec97d9bd52e7d2.png",
  },
  {
    name: "Острая чоризо",
    price: 49,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/0199ae74b6d6761f972e9a60b63044bc.png",
  },
  {
    name: "Маринованные огурчики",
    price: 39,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/0199152e33ee7722ac038fa5bc26e630.png",
  },
  {
    name: "Свежие томаты",
    price: 39,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/0199152a8428737d9f6b19c1b2329749.png",
  },
  {
    name: "Красный лук",
    price: 39,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/0199ae747c85710abcf2950497834b01.png",
  },
  {
    name: "Сочные ананасы",
    price: 39,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/0199152b81587495b19ba8008c567f5d.png",
  },
  {
    name: "Итальянские травы",
    price: 19,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/0199152ced7677fcb0e49edd0ebf6c90.png",
  },
  {
    name: "Сладкий перец",
    price: 39,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/0199152da27677a7a24a41b4eddfcedd.png",
  },
  {
    name: "Кубики брынзы",
    price: 49,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/0199152a464a781abbc1d135f7d138aa.png",
  },
  {
    name: "Баварские колбаски",
    price: 59,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/019915307407729e970fee55536f6dca.png",
  },
  {
    name: "Креветки",
    price: 115,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/0199152abd577969bb76a8123d1a7ea1.png",
  },
  {
    name: "Свиная шейка",
    price: 115,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/0199e7d1cd977499a410e7a4f0495221.png",
  },
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
  {
    name: "Омлет с ветчиной и грибами в пите",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/019860510daa726fa023e04a1ae06a87.avif",
    description:
      "Горячий сытный омлет с поджаристой корочкой, ветчина, шампиньоны и моцарелла в пшеничной пите. Удобно взять с собой",
    categoryId: 2,
  },
  {
    name: "Омлет с пепперони в пите",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/0198605864fc73b8a8259cbfa18e95c8.avif",
    description:
      "Для тех, кто не пропускает завтраки — омлет с поджаристой корочкой, пикантная пепперони, томаты и моцарелла в пшеничной пите. Удобно взять с собой",
    categoryId: 2,
  },
  {
    name: "Омлет сырный в пите",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/01986056bdd074f68ad0fc8de6f1e723.avif",
    description:
      "Вариант завтрака в пшеничной пите с омлетом с поджаристой корочкой, моцареллой, кубиками брынзы, сырами чеддер и пармезан. Удобно взять с собой",
    categoryId: 2,
  },
  {
    name: "Омлет с томатами",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/01988a36bbee7743a6ca0637e674fa30.avif",
    description:
      "Легкий и питательный завтрак: омлет из печи с томатами и моцареллой",
    categoryId: 2,
  },
  {
    name: "Омлет с беконом",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/01988a27ac0578b69644066f43e3d41c.avif",
    description:
      "Классическое сочетание горячего омлета с поджаристой корочкой и бекона с добавлением моцареллы и томатов на завтрак",
    categoryId: 2,
  },
  {
    name: "Омлет с ветчиной и грибами",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/01988a29a3fd7191b04504e1c1e3f480.avif",
    description:
      "Горячий сытный омлет с поджаристой корочкой, ветчина, шампиньоны и моцарелла",
    categoryId: 2,
  },
  {
    name: "Омлет с пепперони",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/01988a2c616b74498fb32c2ddff51901.avif",
    description:
      "Сытный и сбалансированный завтрак — омлет с поджаристой корочкой, пикантная пепперони, томаты и моцарелла",
    categoryId: 2,
  },
  {
    name: "Омлет сырный",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/01988a37c69575b2900c83e314a17ae2.avif",
    description:
      "Горячий завтрак из омлета с поджаристой корочкой, моцарелла, кубики брынзы, сыры чеддер и пармезан",
    categoryId: 2,
  },
  {
    name: "Сырники",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/01980d3fd54678fa9b9fe6c9d7c0d24c.avif",
    description:
      "Любимый десерт многих гостей — румяные сырники из печи. Нежные, в меру сладкие и напоминающие детство",
    categoryId: 2,
  },
  {
    name: "Персиковый молочный коктейль",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/0199864e07967186b27287dc88685579.avif",
    description: "Сочный, спелый персик и приятная свежесть мороженого",
    categoryId: 4,
  },
  {
    name: "Молочный коктейль Фисташка",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/0199864a65a871ebade4be4d862a7c20.avif",
    description:
      "Сочетание нежности, сливочной текстуры и тонкого вкуса фисташки",
    categoryId: 4,
  },
  {
    name: "Молочный коктейль с печеньем Орео",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/019986494294739e9e1edf44accf8dcc.avif",
    description:
      "Как вкуснее есть печенье? Его лучше пить! Попробуйте молочный коктейль с мороженым и дробленым печеньем «Орео»",
    categoryId: 4,
  },
  {
    name: "Классический молочный коктейль",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/0198227af30a72b3b2614e9da1d277a3.avif",
    description: "Это классика: молоко, мороженое и ничего лишнего",
    categoryId: 4,
  },
  {
    name: "Клубничный молочный коктейль",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/0199ae7135777528bca136648af27fb4.avif",
    description:
      "Не важно, какое время года на улице, этот коктейль с клубничным сиропом вернет вас в лето с одного глотка",
    categoryId: 4,
  },
  {
    name: "Шоколадный молочный коктейль",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/0199864ca5fe77de868217896c71a63c.avif",
    description:
      "Это шок! Шоколадный молочный коктейль со сливочным мороженым и фирменным какао",
    categoryId: 4,
  },
  {
    name: "Кофе Американо",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/0198227e7648741ead340c4c96da45a4.avif",
    description: "Горячий кофе для ценителей чистого вкуса",
    categoryId: 5,
  },
  {
    name: "Латте Темный лес",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/01995c21fa247222a0e435d8924a73f6.avif",
    description:
      "Вишня, шоколад и мягкий кофе - вкус, как у знаменитого пирожного",
    categoryId: 5,
  },
  {
    name: "Кофе Капучино",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/019840b6488170018dd640026aea9961.avif",
    description:
      "Легендарный рецепт кофе: эспрессо, горячее молоко и плотная молочная пенка",
    categoryId: 5,
  },
  {
    name: "Кофе Латте",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/01982280dc9a778c941ba53768d94882.avif",
    description:
      "Идеально сбалансированное сочетание кофе, увеличенной порции молока и нежнейшей пенки",
    categoryId: 5,
  },
  {
    name: "Кофе Карамельный капучино",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/01998643d08072eb8dec77eeca378a50.avif",
    description:
      "Классический капучино с молочной пенкой и карамельным сиропом",
    categoryId: 5,
  },
  {
    name: "Кофе Кокосовый латте",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/0199864186a476df9937a053d065344b.avif",
    description: "Горячий латте с кокосовым сиропом",
    categoryId: 5,
  },
  {
    name: "Кофе Ореховый латте",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/01998642911c798ca1235e655ad191d0.avif",
    description: "Горячий латте с сиропом со вкусом фундука",
    categoryId: 5,
  },
  {
    name: "Айс капучино",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/0199864654447319847e41eb6b656ec9.avif",
    description: "Освежающий холодный кофе с порцией эспрессо и пломбиром",
    categoryId: 5,
  },
  {
    name: "Ланчбокс с хреном",
    imageUrl:
      "https://media.dodostatic.net/image/r:233x233/0198bf046b9577f78d909cfe8e772264.avif",
    description:
      "Это блюдо с ярким характером: дерзкий сливочный соус с хреном, свиная шейка и маринованные огурчики с картошкой по-деревенски",
    categoryId: 3,
  },
  {
    name: "Паста Мясная",
    imageUrl:
      "https://media.dodostatic.net/image/r:233x233/019a8979ca3773f5a96ad9402295bbe4.avif",
    description:
      "Встречайте новую Мясную пасту из печи: в ней соединились пряная говядина, сочный цыпленок, лук и сыр моцарелла, а сливочный альфредо и новый фирменный соус выводят баланс вкуса на новый уровень",
    categoryId: 3,
  },
  {
    name: "Холодный чикен ролл",
    imageUrl:
      "https://media.dodostatic.net/image/r:233x233/01980e8a432071ca863e03212730c399.avif",
    description:
      "Холодная закуска для легкого перекуса: ролл с цыпленком, свежим салатом, томатами, чеддером и пармезаном с соусом ранч",
    categoryId: 3,
  },
  {
    name: "Додстер",
    imageUrl:
      "https://media.dodostatic.net/image/r:233x233/01980cb92528769295aeb186fb501f8e.avif",
    description:
      "Легендарная горячая закуска с цыпленком, томатами, моцареллой, соусом ранч в тонкой пшеничной лепешке",
    categoryId: 3,
  },
  {
    name: "Додстер Чилл Грилл",
    imageUrl:
      "https://media.dodostatic.net/image/r:233x233/01980cb84cfb7023b6eca978780d30c5.avif",
    description:
      "Горячая закуска с цыпленком и соусом гриль с луком, маринованными огурчиками и моцареллой в тонкой пшеничной лепешке",
    categoryId: 3,
  },
  {
    name: "Супермясной Додстер",
    imageUrl:
      "https://media.dodostatic.net/image/r:233x233/01980cb9c5f8725aa9fb71a2ed7095a7.avif",
    description:
      "Горячая закуска, в которой много мяса — цыпленок, чоризо и пряная говядина с моцареллой и соусом бургер в тонкой пшеничной лепешке",
    categoryId: 3,
  },
  {
    name: "Додстер с ветчиной",
    imageUrl:
      "https://media.dodostatic.net/image/r:233x233/01980cba8e9e70dab9df8aa0f577e527.avif",
    description:
      "Горячий завтрак с ветчиной, томатами, моцареллой, соусом ранч в тонкой пшеничной лепешке",
    categoryId: 3,
  },
  {
    name: "Острый Додстер",
    imageUrl:
      "https://media.dodostatic.net/image/r:233x233/01980cbb11e677738af9e254a413763f.avif",
    description:
      "Горячая закуска с цыпленком, перчиком халапеньо, маринованными огурчиками, томатами, моцареллой и соусом барбекю в тонкой пшеничной лепешке",
    categoryId: 3,
  },
];

export const productPrices: Record<string, number> = {
  "Омлет с ветчиной и грибами в пите": 239,
  "Омлет с пепперони в пите": 239,
  "Омлет сырный в пите": 239,
  "Омлет с томатами": 159,
  "Омлет с беконом": 209,
  "Омлет с ветчиной и грибами": 209,
  "Омлет с пепперони": 209,
  "Омлет сырный": 209,
  Сырники: 165,
  "Персиковый молочный коктейль": 269,
  "Молочный коктейль Фисташка": 269,
  "Молочный коктейль с печеньем Орео": 269,
  "Классический молочный коктейль": 225,
  "Клубничный молочный коктейль": 269,
  "Шоколадный молочный коктейль": 269,
  "Кофе Американо": 119,
  "Латте Темный лес": 169,
  "Кофе Капучино": 179,
  "Кофе Латте": 179,
  "Кофе Карамельный капучино": 169,
  "Кофе Кокосовый латте": 169,
  "Кофе Ореховый латте": 169,
  "Айс капучино": 270,
  "Ланчбокс с хреном": 359,
  "Паста Мясная": 439,
  "Холодный чикен ролл": 239,
  Додстер: 249,
  "Додстер Чилл Грилл": 259,
  "Супермясной Додстер": 299,
  "Додстер с ветчиной": 239,
  "Острый Додстер": 279,
};
