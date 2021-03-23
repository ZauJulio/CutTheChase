"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var firestore_1 = __importDefault(require("../database/firestore"));
var UserSchema_1 = require("../database/schema/UserSchema");
exports.default = {
    index: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var usersRef, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, firestore_1.default.collection("users").get()];
                    case 1:
                        usersRef = _a.sent();
                        users = [];
                        usersRef.forEach(function (doc) {
                            users.push([doc.id, doc.data()]);
                        });
                        return [2 /*return*/, response.json(users)];
                }
            });
        });
    },
    login: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, usersRef, queryRef, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.query, email = _a.email, password = _a.password;
                        usersRef = firestore_1.default.collection("users");
                        return [4 /*yield*/, usersRef
                                .where("email", "==", email)
                                .where("password", "==", password)
                                .get()];
                    case 1:
                        queryRef = _b.sent();
                        if (queryRef.empty) {
                            return [2 /*return*/, response.status(404).json("User not found")];
                        }
                        user = [];
                        queryRef.forEach(function (doc) {
                            user.push([doc.id, doc.data()]);
                        });
                        return [2 /*return*/, response.status(200).json(user)];
                }
            });
        });
    },
    get: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var email, usersRef, queryRef, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = request.query.email;
                        usersRef = firestore_1.default.collection("users");
                        return [4 /*yield*/, usersRef.where("email", "==", email).get()];
                    case 1:
                        queryRef = _a.sent();
                        if (queryRef.empty) {
                            return [2 /*return*/, response.status(404).json("User not found")];
                        }
                        user = [];
                        queryRef.forEach(function (doc) {
                            user.push([doc.id, doc.data()]);
                        });
                        return [2 /*return*/, response.status(200).json(user)];
                }
            });
        });
    },
    delete: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var email, usersRef, queryRef, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = request.body.email;
                        usersRef = firestore_1.default.collection("users");
                        return [4 /*yield*/, usersRef.where("email", "==", email).get()];
                    case 1:
                        queryRef = _a.sent();
                        if (queryRef.empty) {
                            return [2 /*return*/, response.status(404).json("User not found")];
                        }
                        user = [];
                        queryRef.forEach(function (doc) {
                            doc.ref.delete();
                        });
                        return [2 /*return*/, response.status(200)];
                }
            });
        });
    },
    create: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, email, password, preferences, role, favorites, data, addUser;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, name = _a.name, email = _a.email, password = _a.password, preferences = _a.preferences, role = _a.role, favorites = _a.favorites;
                        data = {
                            name: name,
                            email: email,
                            password: password,
                            preferences: preferences,
                            role: role,
                            favorites: favorites,
                        };
                        return [4 /*yield*/, UserSchema_1.UserDataValidate(data)];
                    case 1:
                        _b.sent();
                        addUser = firestore_1.default.collection("users").doc();
                        return [4 /*yield*/, addUser.set(data)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, response.status(201).json("user created")];
                }
            });
        });
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
