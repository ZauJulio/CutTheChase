import { Image } from "../services/api";

export function getMiddleImage(images: Image[]) {
  return images[Math.floor(images.length / 2)].url;
}
