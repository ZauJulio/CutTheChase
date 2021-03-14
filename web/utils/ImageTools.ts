import { Image } from "../services/interfaces";

export function getMiddleImage(images: Image[]) {
  return images[Math.floor(images.length / 2)].url;
}
