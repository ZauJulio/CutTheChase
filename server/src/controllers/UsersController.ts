import { Request, Response } from "express";
import firestore from "../database/firestore";
import { UserDataValidate } from "../database/schema/UserSchema";


export default {
  async index(request: Request, response: Response) {
    const usersRef = await firestore.collection("users").get();
    let users: any = [];

    usersRef.forEach((doc) => {
      users.push([doc.id, doc.data()]);
    });

    return response.json(users);
  },

  async login(request: Request, response: Response) {
    const { email, password } = request.query;

    const usersRef = firestore.collection("users");
    const queryRef = await usersRef
      .where("email", "==", email)
      .where("password", "==", password)
      .get();

    if (queryRef.empty) {
      return response.status(404).json("User not found");
    }

    let user: any = [];

    queryRef.forEach((doc) => {
      user.push([doc.id, doc.data()]);
    });

    return response.status(200).json(user);
  },

  async get(request: Request, response: Response) {
    const { email } = request.query;

    const usersRef = firestore.collection("users");
    const queryRef = await usersRef.where("email", "==", email).get();

    if (queryRef.empty) {
      return response.status(404).json("User not found");
    }

    let user: any = [];

    queryRef.forEach((doc) => {
      user.push([doc.id, doc.data()]);
    });

    return response.status(200).json(user);
  },

  async delete(request: Request, response: Response) {
    const { email } = request.body;

    const usersRef = firestore.collection("users");
    const queryRef = await usersRef.where("email", "==", email).get();

    if (queryRef.empty) {
      return response.status(404).json("User not found");
    }

    let user: any = [];

    queryRef.forEach((doc) => {
      doc.ref.delete();
    });

    return response.status(200);
  },

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      password,
      preferences,
      role,
      favorites,
    } = request.body;

    const data = {
      name,
      email,
      password,
      preferences,
      role,
      favorites,
    };

    await UserDataValidate(data);

    const addUser = firestore.collection("users").doc();
    await addUser.set(data);

    return response.status(201).json("user created");
  },

  // async update(request: Request, response: Response) {
  //   const {
  //     name,
  //     email,
  //     password,
  //     preferences,
  //     role,
  //     favorites,
  //   } = request.body;

  //   const data = {
  //     name,
  //     email,
  //     password,
  //     preferences,
  //     role,
  //     favorites,
  //   };

  //   await UserDataValidate(data);

  //   const usersRef = firestore.collection("users");
  //   const queryRef = await usersRef.where("email", "==", email).get();

  //   if (queryRef.empty) {
  //     return response.status(404).json("User not found");
  //   }

  //   let docId: string = "";

  //   queryRef.forEach((doc) => {
  //     docId = doc.id;
  //   });

  //   const updateUser = firestore.collection("users").doc(docId);
  //   await updateUser.update(data);

  //   return response.status(200).json("user updated");
  // },
};
