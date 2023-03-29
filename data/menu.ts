import { CategoryEnum } from './CategoryEnum'
import { MenuItem } from './MenuItem'

export const menu: MenuItem[] = [
  {
    "id": "1",
    "name": "Americano",
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
    "name": "Latte",
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
    "name": "Mocha",
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
    "name": "Cappuccino",
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
    "name": "Chocolate",
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
    "name": "Thai Tea",
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
    "name": "Green Tea",
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
    "name": "Strawberry Italian Soda",
    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "price": 75,
    "spicy": false
  },
  {
    "id": "9",
    "name": "Green Apple Italian Soda",
    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "price": 75,
    "spicy": false
  },
  {
    "id": "10",
    "name": "Blueberry Italian Soda",

    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "price": 75,
    "spicy": false
  },
  {
    "id": "11",
    "name": "Lychee Italian Soda",
    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "price": 75,
    "spicy": false
  },
  {
    "id": "12",
    "name": "Honey Lime",

    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "price": 75,
    "spicy": false
  },
  {
    "id": "13",
    "name": "Strawberry Shake",
    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "price": 75,
    "spicy": false
  },
  {
    "id": "14",
    "name": "Blueberry Shake",

    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "price": 75,
    "spicy": false
  },
  {
    "id": "15",
    "name": "Orange Shake",
    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "price": 75,
    "spicy": false
  },
  {
    "id": "16",
    "name": "Lime Shake",

    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "price": 75,
    "spicy": false
  },
  {
    "id": "17",
    "name": "Pineapple Shake",

    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "price": 75,
    "spicy": false
  },
  {
    "id": "18",
    "name": "Green Apple Shake",
    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "price": 75,
    "spicy": false
  },
  {
    "id": "19",
    "name": "Watermelon Shake",
    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "price": 75,
    "spicy": false
  },
  {
    "id": "20",
    "name": "Banana Shake",

    "category": CategoryEnum.Drinks,
    "image": '../assets/images/fast-food.png',
    "price": 75,
    "spicy": false
  },
  {
    "id": "21",
    "name": "Thai Papaya Salad with peanuts",
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
    "name": "Soup with Rice",
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
    "name": "Club Sandwich",
    "category": CategoryEnum.FastFood,
    "image": '../assets/images/fast-food.png',
    "price": 159,
    "spicy": true
  },
  {
    "id": "24",
    "name": "Pasta Green Pesto with Shrimps",

    "category": CategoryEnum.Pasta,
    "image": '../assets/images/fast-food.png',
    "price": 149,
    "spicy": true
  },
  {
    "id": "25",
    "name": "Wide Rice Noodles in Thick Gravy",
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
    "name": "Crispy Egg Noodles in Thick Gravy",
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
    "name": "Rice with stir-fried options",
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
    "name": "Waffle",
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
    "name": "Muesli with Yogurt",
    "category": CategoryEnum.Desserts,
    "image": '../assets/images/fast-food.png',
    "price": 99,
    "spicy": false
  }
]