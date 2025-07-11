"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TakePlotPhoto = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TakePlotPhoto {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsTakePlotPhoto(t, o) {
    return (o || new TakePlotPhoto()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTakePlotPhoto(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new TakePlotPhoto()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startTakePlotPhoto(t) {
    t.startObject(0);
  }
  static endTakePlotPhoto(t) {
    return t.endObject();
  }
  static createTakePlotPhoto(t) {
    TakePlotPhoto.startTakePlotPhoto(t);
    return TakePlotPhoto.endTakePlotPhoto(t);
  }
}
exports.TakePlotPhoto = TakePlotPhoto;
//# sourceMappingURL=take-plot-photo.js.map