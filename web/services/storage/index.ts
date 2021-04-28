import { app } from "./base";
const storageRef = app.storage("gs://cutthechase-8ddab.appspot.com").ref();
const imagesRef = storageRef.child("/events/images/");

export async function upload(images: File[]): Promise<string[]> {
  const imagesNewNames: string[] = [];

  images.forEach(async (image: File) => {
    var filename = `${Date.now()}-${image.name}`;

    try {
      imagesRef
        .child(filename)
        .put(image, { contentType: "image" })
        .then((snapshot) => {})
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }

    imagesNewNames.push(filename);
  });

  return imagesNewNames;
}

export async function download(images: string[]) {
  const urlImages: string[] = [];

  images.forEach(async (image) => {
    const ref = imagesRef.child(image);
    const url = await ref.getDownloadURL();
    urlImages.push(url);
  });

  return urlImages;
}
