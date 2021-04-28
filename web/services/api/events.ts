import { api } from "./";
import { Event } from "../../interfaces";
import { download } from "../storage";

export async function create(data: FormData, token: string): Promise<number> {
  const res = await api
    .post("/api/events/create", data, {
      withCredentials: false,
      headers: {
        Authorization: token,
      },
    })
    .then(
      () => {
        return 200;
      },
      (error) => {
        console.log(error);
        return 500;
      }
    );

  return res;
}

interface getEventsProps {
  searchArgs: string[];
  categories: string[];
  location: { lat: number; lng: number };
  token: string;
}

export async function getEvents(props: getEventsProps): Promise<Event[]> {
  const res = await api.get("/api/events/list", {
    params: {
      searchArgs: props.searchArgs,
      categories: props.categories,
      location: props.location,
    },
    headers: {
      Authorization: props.token,
    },
  });

  const events: Event[] = res.data;

  if (events.length > 0) {
    for (var event in event) {
      event.images = download(event.images);
    }
  }

  console.log(events);
  return events;
}
