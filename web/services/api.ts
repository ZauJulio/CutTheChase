import {
  Adress,
  Image,
  Category,
  Assessment,
  Favorite,
  Role,
  Preferences,
  User,
  Repeat,
  Event,
  SelectableCategory,
} from "./interfaces";

var _adress: Adress = {
  id: 1,
  lat: -6.4572625,
  lng: -37.0899993,
  locality: "Ilha de Santana",
};

var _favorite: Favorite[] = [
  {
    id: 1,
    event: 1,
  },
];

var preferences: Preferences = {
  id: 1,
  user: 1,
  favcategories: [
    {
      id: 1,
      name: "Artes Visuais",
    },
    {
      id: 2,
      name: "Música",
    },
  ],
};

var user: User = {
  id: 1,
  name: "Zaú Júlio",
  email: "zauhdf@gmail.com",
  password: "",
  preferences: preferences,
  role: {
    id: 1,
    name: "promotor",
  },
  favorites: _favorite,
};

var events: Event[] = [
  {
    id: 1,
    name: "Festa de Santana",
    description:
      "A Festa de Santana trata-se da festa da padroeira da cidade de Caicó, no interior do estado brasileiro do Rio Grande do Norte.",
    datetime: new Date("2021-06-27"),
    adress: _adress,
    duration: 880000000,
    site: "https://caico.rn.gov.br/",
    rating: 4.5,
    assessments: [
      {
        id: 1,
        user: "Fulano",
        evaluation: "Show",
        rate: 4.8,
        showName: true,
      },
      {
        id: 2,
        user: "Cicano",
        evaluation: "Legal",
        rate: 3.7,
        showName: true,
      },
    ],
    photos: [
      { id: "1", url: "./images/1.jpg" },
      { id: "2", url: "./images/2.jpg" },
      { id: "3", url: "./images/3.jpg" },
    ],
    repeat: { id: 1, frequency: "d" },
    promotor: user,
    category: [{ id: 1, name: "Artes Visuais" }],
  },
];

var categories: Category[] = [
  { id: 1, name: "Música" },
  { id: 2, name: "Artes Visuais" },
  { id: 3, name: "Festival" },
  { id: 4, name: "Dança" },
  { id: 5, name: "Sebo" },
  { id: 6, name: "Infantil" },
];

export function getSelectableCategories() {
  return getCategories().map((category) => {
    return Object.assign(category, { selected: false });
  });
}

export function getCategories() {
  return categories;
}

export function getEvents(
  searchArgs: string[],
  categories: string[],
  location: { lat: number; long: number }
) {
  return events;
}

export function login(email: string, password?: string) {
  return {
    status: 200,
    user: user,
  };
}
