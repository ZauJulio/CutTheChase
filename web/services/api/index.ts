import axios from "axios";
import * as events from "./events";

import {
  Address,
  Image,
  Favorite,
  Preferences,
  User,
  Event,
} from "../../interfaces";

export const api = axios.create({
  baseURL: process.env.CTC_URL,
});

export default { events };

var _address: Address = {
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
     "Artes Visuais",
     "Música",
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

var _events: Event[] = [
  {
    id: 1,
    name: "Festa de Santana",
    description:
      "A Festa de Santana trata-se da festa da padroeira da cidade de Caicó, no interior do estado brasileiro do Rio Grande do Norte.",
    datetime: new Date("2021-06-27"),
    address: _address,
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
    category: ["Artes Visuais"],
  },
];

var categories: string[] = [
  "Música",
  "Artes Visuais",
  "Festival",
  "Dança",
  "Sebo",
  "Infantil",
];


export function getCategories() {
  return categories;
}

export function getEvents(
  searchArgs: string[],
  categories: string[],
  location: { lat: number; lng: number }
) {
  return _events;
}
