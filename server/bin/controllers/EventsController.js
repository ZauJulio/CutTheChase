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
var geofire_common_1 = __importDefault(require("geofire-common"));
var ImagesStorageController_1 = __importDefault(require("./ImagesStorageController"));
var EventSchema_1 = require("../database/schema/EventSchema");
exports.default = {
    index: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var eventsRef, events;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, firestore_1.default.collection("events").get()];
                    case 1:
                        eventsRef = _a.sent();
                        events = [];
                        eventsRef.forEach(function (doc) { return __awaiter(_this, void 0, void 0, function () {
                            var event, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        event = doc.data();
                                        _a = event;
                                        return [4 /*yield*/, ImagesStorageController_1.default.upload(event.images)];
                                    case 1:
                                        _a.images = _b.sent();
                                        events.push([doc.id, event]);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/, response.json(events)];
                }
            });
        });
    },
    get: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, event, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = request.query.id;
                        return [4 /*yield*/, firestore_1.default.collection("events").doc(String(id)).get()];
                    case 1:
                        event = _b.sent();
                        if (event !== undefined) {
                            return [2 /*return*/, response.status(404).json("Event not found")];
                        }
                        _a = event;
                        return [4 /*yield*/, ImagesStorageController_1.default.download(event.id, event.images)];
                    case 2:
                        _a.images = _b.sent();
                        return [2 /*return*/, response.status(200).json(event)];
                }
            });
        });
    },
    getInRadius: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var radiusInM, center, bounds, promises, _i, bounds_1, b, q;
            var _this = this;
            return __generator(this, function (_a) {
                radiusInM = Number(request.query.radiusInM);
                center = [
                    Number(request.query.lat),
                    Number(request.query.lng),
                ];
                bounds = geofire_common_1.default.geohashQueryBounds(center, radiusInM);
                promises = [];
                for (_i = 0, bounds_1 = bounds; _i < bounds_1.length; _i++) {
                    b = bounds_1[_i];
                    q = firestore_1.default
                        .collection("events")
                        .orderBy("geoHash")
                        .startAt(b[0])
                        .endAt(b[1]);
                    promises.push(q.get());
                }
                Promise.all(promises)
                    .then(function (snapshots) { return __awaiter(_this, void 0, void 0, function () {
                    var matchingDocs, _i, snapshots_1, snap, _a, _b, doc, adress, distanceInKm, distanceInM, event_1, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                matchingDocs = [];
                                _i = 0, snapshots_1 = snapshots;
                                _d.label = 1;
                            case 1:
                                if (!(_i < snapshots_1.length)) return [3 /*break*/, 6];
                                snap = snapshots_1[_i];
                                _a = 0, _b = snap.docs;
                                _d.label = 2;
                            case 2:
                                if (!(_a < _b.length)) return [3 /*break*/, 5];
                                doc = _b[_a];
                                adress = doc.get("adress");
                                distanceInKm = geofire_common_1.default.distanceBetween([adress.lat, adress.lng], center);
                                distanceInM = distanceInKm * 1000;
                                if (!(distanceInM <= radiusInM)) return [3 /*break*/, 4];
                                event_1 = doc;
                                _c = event_1;
                                return [4 /*yield*/, ImagesStorageController_1.default.download(event_1.id, event_1.images)];
                            case 3:
                                _c.images = _d.sent();
                                matchingDocs.push(event_1);
                                _d.label = 4;
                            case 4:
                                _a++;
                                return [3 /*break*/, 2];
                            case 5:
                                _i++;
                                return [3 /*break*/, 1];
                            case 6: return [2 /*return*/, matchingDocs];
                        }
                    });
                }); })
                    .then(function (matchingDocs) {
                    return response.status(200).json(matchingDocs);
                });
                return [2 /*return*/];
            });
        });
    },
    delete: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, event;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.query.id;
                        return [4 /*yield*/, firestore_1.default.collection("events").doc(String(id)).delete()];
                    case 1:
                        event = _a.sent();
                        return [4 /*yield*/, ImagesStorageController_1.default.delete(String(id))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.status(200)];
                }
            });
        });
    },
    create: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, description, datetime, duration, site, repeat, adress, promotor, assessments, categorys, images, geoHash, data, addEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, name = _a.name, description = _a.description, datetime = _a.datetime, duration = _a.duration, site = _a.site, repeat = _a.repeat, adress = _a.adress, promotor = _a.promotor, assessments = _a.assessments, categorys = _a.categorys;
                        return [4 /*yield*/, ImagesStorageController_1.default.upload(request.files)];
                    case 1:
                        images = _b.sent();
                        geoHash = {
                            geoHash: geofire_common_1.default.geohashForLocation([adress.lat, adress.lng]),
                        };
                        data = {
                            name: name,
                            description: description,
                            datetime: datetime,
                            duration: duration,
                            site: site,
                            repeat: repeat,
                            promotor: promotor,
                            adress: adress,
                            geoHash: geoHash,
                            assessments: assessments,
                            categorys: categorys,
                            images: images,
                        };
                        return [4 /*yield*/, EventSchema_1.EventDataValidate(data)];
                    case 2:
                        _b.sent();
                        addEvent = firestore_1.default.collection("events").doc();
                        return [4 /*yield*/, addEvent.set(data)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, response.status(201).json("event created")];
                }
            });
        });
    },
    // async update(request: Request, response: Response) {
    //   const {
    //     id,
    //     name,
    //     description,
    //     datetime,
    //     duration,
    //     site,
    //     repeat,
    //     promotor,
    //     adress,
    //     assessments,
    //     categorys,
    //   } = request.body;
    //   const requestImages = request.files as Express.Multer.File[];
    //   const images = requestImages.map((image) => {
    //     return { path: image.filename };
    //   });
    //   const data = {
    //     name,
    //     description,
    //     datetime,
    //     duration,
    //     site,
    //     repeat,
    //     promotor,
    //     adress,
    //     assessments,
    //     categorys,
    //     images,
    //   };
    //   await EventDataValidate(data);
    //   const updateEvent = firestore.collection("events").doc(id);
    //   await updateEvent.update(data);
    //   return response.status(200).json("event updated");
    // },
};
