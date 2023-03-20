import { CategoryEnum } from './CategoryEnum'
import { MenuItem } from './MenuItem'

export const menu: MenuItem[] = [
  {
    "id": "1",
    "title": "Americano",
    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "options": [
      {
        "label": "Hot",
        "value": "65"
      },
      {
        "label": "Iced",
        "value": "70"
      },
      {
        "label": "Frappe",
        "value": "75"
      }
    ],
    "spicy": false,
  },
  {
    "id": "2",
    "title": "Latte",
    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "options": [
      {
        "label": "Hot",
        "value": "65"
      },
      {
        "label": "Iced",
        "value": "75"
      },
      {
        "label": "Frappe",
        "value": "80"
      }
    ],
    "spicy": false
  },
  {
    "id": "3",
    "title": "Mocha",
    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "options": [
      {
        "label": "Hot",
        "value": "65"
      },
      {
        "label": "Iced",
        "value": "75"
      },
      {
        "label": "Frappe",
        "value": "80"
      }
    ],
    "spicy": false
  },
  {
    "id": "4",
    "title": "Cappuccino",
    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "options": [
      {
        "label": "Hot",
        "value": "65"
      },
      {
        "label": "Iced",
        "value": "75"
      },
      {
        "label": "Frappe",
        "value": "80"
      }
    ],
    "spicy": false
  },
  {
    "id": "5",
    "title": "Chocolate",
    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "options": [
      {
        "label": "Hot",
        "value": "65"
      },
      {
        "label": "Iced",
        "value": "75"
      },
      {
        "label": "Frappe",
        "value": "80"
      }
    ],
    "spicy": false
  },
  {
    "id": "6",
    "title": "Thai Tea",
    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "options": [
      {
        "label": "Hot",
        "value": "65"
      },
      {
        "label": "Iced",
        "value": "75"
      },
      {
        "label": "Frappe",
        "value": "80"
      }
    ],
    "spicy": false
  },
  {
    "id": "7",
    "title": "Green Tea",
    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "options": [
      {
        "label": "Hot",
        "value": "65"
      },
      {
        "label": "Iced",
        "value": "75"
      },
      {
        "label": "Frappe",
        "value": "80"
      }
    ],
    "spicy": false
  },
  {
    "id": "8",
    "title": "Strawberry Italian Soda",
    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "price": 75,
    "spicy": false
  },
  {
    "id": "9",
    "title": "Green Apple Italian Soda",
    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "price": 75,
    "spicy": false
  },
  {
    "id": "10",
    "title": "Blueberry Italian Soda",

    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "price": 75,
    "spicy": false
  },
  {
    "id": "11",
    "title": "Lychee Italian Soda",
    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "price": 75,
    "spicy": false
  },
  {
    "id": "12",
    "title": "Honey Lime",

    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "price": 75,
    "spicy": false
  },
  {
    "id": "13",
    "title": "Strawberry Shake",
    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "price": 75,
    "spicy": false
  },
  {
    "id": "14",
    "title": "Blueberry Shake",

    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "price": 75,
    "spicy": false
  },
  {
    "id": "15",
    "title": "Orange Shake",
    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "price": 75,
    "spicy": false
  },
  {
    "id": "16",
    "title": "Lime Shake",

    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "price": 75,
    "spicy": false
  },
  {
    "id": "17",
    "title": "Pineapple Shake",

    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "price": 75,
    "spicy": false
  },
  {
    "id": "18",
    "title": "Green Apple Shake",
    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "price": 75,
    "spicy": false
  },
  {
    "id": "19",
    "title": "Watermelon Shake",
    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "price": 75,
    "spicy": false
  },
  {
    "id": "20",
    "title": "Banana Shake",

    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "price": 75,
    "spicy": false
  },
  {
    "id": "21",
    "title": "Thai Papaya Salad with peanuts",
    "category": CategoryEnum.Salads,
    "image": '../assets/images/fast-food.png',
    "options": [
      {
        "label": "Salted Eggs",
        "value": "79"
      },
      {
        "label": "Salted Dried Shrimp",
        "value": "99"
      },
      {
        "label": "Salted Crab",
        "value": "99"
      },
      {
        "label": "Fermented Fish",
        "value": "99"
      },
      {
        "label": "Raw Shrimp",
        "value": "139"
      }
    ],
    "spicy": true
  },
  {
    "id": "22",
    "title": "Soup with Rice",
    "category": CategoryEnum.Soups,
    "image": '../assets/images/fast-food.png',
    "options": [
      {
        "label": "Pork",
        "value": "99"
      },
      {
        "label": "Chicken",
        "value": "99"
      },
      {
        "label": "Shrimps",
        "value": "119"
      },
      {
        "label": "Squids",
        "value": "119"
      }
    ],
    "spicy": true
  },
  {
    "id": "23",
    "title": "Club Sandwich",
    "category": CategoryEnum.FastFood,
    "image": '../assets/images/fast-food.png',
    "price": 159,
    "spicy": true
  },
  {
    "id": "24",
    "title": "Pasta Green Pesto with Shrimps",

    "category": CategoryEnum.Pasta,
    "image": '../assets/images/fast-food.png',
    "price": 149,
    "spicy": true
  },
  {
    "id": "25",
    "title": "Wide Rice Noodles in Thick Gravy",
    "category": CategoryEnum.Noodles,
    "image": '../assets/images/fast-food.png',
    "options": [
      {
        "label": "Pork",
        "value": "99"
      },
      {
        "label": "Chicken",
        "value": "99"
      },
      {
        "label": "Shrimps",
        "value": "119"
      },
      {
        "label": "Squids",
        "value": "119"
      }
    ],
    "spicy": true
  },
  {
    "id": "26",
    "title": "Crispy Egg Noodles in Thick Gravy",
    "category": CategoryEnum.Noodles,
    "image": '../assets/images/fast-food.png',
    "options": [
      {
        "label": "Pork",
        "value": "99"
      },
      {
        "label": "Chicken",
        "value": "99"
      },
      {
        "label": "Shrimps",
        "value": "119"
      },
      {
        "label": "Squids",
        "value": "119"
      }
    ],
    "spicy": true
  },
  {
    "id": "27",
    "title": "Rice with stir-fried options",
    "category": CategoryEnum.Rice,
    "image": '../assets/images/fast-food.png',
    "options": [
      {
        "label": "Pork",
        "value": "99"
      },
      {
        "label": "Chicken",
        "value": "99"
      },
      {
        "label": "Shrimps",
        "value": "119"
      },
      {
        "label": "Squids",
        "value": "119"
      }
    ],
    "spicy": true
  },
  {
    "id": "28",
    "title": "Waffle",
    "category": CategoryEnum.Desserts,
    "image": '../assets/images/fast-food.png',
    "options": [
      {
        "label": "Honey",
        "value": "80"
      },
      {
        "label": "Chocolate",
        "value": "80"
      },
      {
        "label": "Strawberry",
        "value": "80"
      },
      {
        "label": "Ice Cream Vanilla",
        "value": "100"
      },
      {
        "label": "Ice Cream Chocolate",
        "value": "100"
      },
      {
        "label": "Ice Cream Strawberry",
        "value": "100"
      }
    ],
    "spicy": false
  },
  {
    "id": "29",
    "title": "Muesli with Yogurt",
    "category": CategoryEnum.Desserts,
    "image": '../assets/images/fast-food.png',
    "price": 99,
    "spicy": false
  }
]