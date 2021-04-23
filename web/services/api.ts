import {
  Adress,
  Image,
  Category,
  Favorite,
  Preferences,
  User,
  Event,
} from "./interfaces";

import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.2.107:3333",
});

export default api;

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

var images: Image[] = [
  { id: "1", url: "./images/1.jpg" },
  { id: "2", url: "./images/2.jpg" },
  { id: "3", url: "./images/3.jpg" },
];

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
        user: "João",
        evaluation:
          "Surpreendeu as expectativas, eu e minha família gostamos muito.",
        rate: 4.8,
        showName: true,
      },
      {
        id: 2,
        user: "Pedro",
        evaluation:
          "Muito bom, gostei bastante,pretendo voltar novamente,um ótimo lugar para passar o tempo com amigos...",
        rate: 3.7,
        showName: false,
      },
      {
        id: 3,
        user: "Maria",
        evaluation:
          "Durante o mês de agosto acontece a famosa festa da padroeira da cidade Sant'Ana, que atrai multidão de várias cidades do Seridó. O arco em frente à igreja é imponente e muito lindo.",
        rate: 3.2,
        showName: true,
      },
      {
        id: 4,
        user: "Moisés",
        evaluation:
          "A Festa de Santana de Caicó é considerado o maior evento sócio-religioso do estado, e é a primeira manifestação do estado a entrar para a lista de Patrimônio Imaterial do Brasil.",
        rate: 5.0,
        showName: true,
      },
    ],
    images: images,
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
  { id: 7, name: "Favoritos" },
  { id: 8, name: "Avaliados" },
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
  location: { lat: number; lng: number }
) {
  return events;
}

export function login(email: string, password?: string) {
  return {
    status: 200,
    user: user,
  };
}
