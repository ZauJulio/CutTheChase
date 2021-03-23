import storage from "../database/storage";

import fs from "fs";
import { promisify } from "util";

const deleteImageOnDisk = promisify(fs.unlink);
const storageRef = storage.ref();
const imagesRef = storageRef.child("/events/image/");

export default {
  async upload(images: any) {
    const imagesNewNames: string[] = [];

    images.forEach(async (image: any) => {
      const filename = `${Date.now()}_${image.originalname}`;

      imagesRef
        .child(image)
        .put(image, { contentType: "image" })
        .then(function (snapshot) {})
        .catch(function (error) {
          console.log(error);
        });

      await deleteImageOnDisk(image.path);
      imagesNewNames.push(filename);
    });

    return imagesNewNames;
  },

  async download(doc: string, images: string[]) {
    const urlImages: string[] = [];

    images.forEach((image) => {
      imagesRef
        .child(`${doc}/${image}`)
        .getDownloadURL()
        .then(function (url) {
          urlImages.push(url);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
    return urlImages;
  },

  async delete(doc: string) {
    imagesRef
      .child(doc)
      .delete()
      .then(function () {})
      .catch(function (error) {
        console.log(error);
      });
  },
};
