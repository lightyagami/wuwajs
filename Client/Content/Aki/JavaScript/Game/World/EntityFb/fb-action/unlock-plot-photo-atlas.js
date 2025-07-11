"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnlockPlotPhotoAtlas = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class UnlockPlotPhotoAtlas {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsUnlockPlotPhotoAtlas(t, o) {
    return (o || new UnlockPlotPhotoAtlas()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsUnlockPlotPhotoAtlas(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new UnlockPlotPhotoAtlas()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    if (o) {
      return this.bb.__string(this.bb_pos + o, t);
    } else {
      return undefined;
    }
  }
  id() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startUnlockPlotPhotoAtlas(t) {
    t.startObject(2);
  }
  static addType(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static addId(t, o) {
    t.addFieldInt32(1, o, 0);
  }
  static endUnlockPlotPhotoAtlas(t) {
    return t.endObject();
  }
  static createUnlockPlotPhotoAtlas(t, o, s) {
    UnlockPlotPhotoAtlas.startUnlockPlotPhotoAtlas(t);
    UnlockPlotPhotoAtlas.addType(t, o);
    UnlockPlotPhotoAtlas.addId(t, s);
    return UnlockPlotPhotoAtlas.endUnlockPlotPhotoAtlas(t);
  }
}
exports.UnlockPlotPhotoAtlas = UnlockPlotPhotoAtlas;
//# sourceMappingURL=unlock-plot-photo-atlas.js.map