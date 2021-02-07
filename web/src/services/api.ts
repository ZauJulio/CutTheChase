export interface Event {
  id: string;
  lat: number;
  lng: number;
  name: string;
  datetime: Date;
  duration: number;
  locality: string;
  description: string;
  site: string;
  favorite: boolean;
  rating: number;
  assessments: string[];
  photos: Image[];
}

export interface Image {
  id: string;
  url: string;
}

export interface Category {
  name: string;
  selected: boolean;
}

const lat = -6.4572625;
const lng = -37.0899993;

var events: Event[] = [
  {
    id: "1",
    lat: lat,
    lng: lng,
    name: "Festa de Santana",
    datetime: new Date("2021-06-27"),
    duration: 880000000,
    locality: "Ilha de Santana",
    description:
      "A Festa de Santana trata-se da festa da padroeira da cidade de Caicó, no interior do estado brasileiro do Rio Grande do Norte.",
    site: "https://caico.rn.gov.br/ @festadesantanacaicooficial",
    favorite: true,
    rating: 4.8,
    assessments: ["Legal", "show"],
    photos: [
      { id: "1", url: "./images/1.jpg"},
      { id: "2", url: "./images/2.jpg"},
      { id: "3", url: "./images/3.jpg"},
    ],
  },
];

var categorys: Category[] = [
  { name: "Música", selected: false },
  { name: "Artes Visuais", selected: false },
  { name: "Festival", selected: false },
  { name: "Dança", selected: false },
  { name: "Sebo", selected: false },
  { name: "Infantil", selected: false },
];

export function getCategorys() {
  return categorys;
}
export function getEvents(searchArgs: string[], categorys: string[]) {
  return events;
}
