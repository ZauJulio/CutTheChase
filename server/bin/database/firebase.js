"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.firestore = void 0;
var app_1 = __importDefault(require("firebase/app"));
require("firebase/analytics");
var firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDERID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
};
console.log(firebaseConfig);
app_1.default.initializeApp(firebaseConfig);
app_1.default.analytics();
exports.firestore = app_1.default.firestore();
exports.storage = app_1.default.storage();
