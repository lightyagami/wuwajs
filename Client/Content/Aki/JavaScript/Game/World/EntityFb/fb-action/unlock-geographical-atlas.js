"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnlockGeographicalAtlas = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class UnlockGeographicalAtlas {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsUnlockGeographicalAtlas(t, a) {
    return (a || new UnlockGeographicalAtlas()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsUnlockGeographicalAtlas(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new UnlockGeographicalAtlas()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
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
  static startUnlockGeographicalAtlas(t) {
    t.startObject(2);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static addId(t, a) {
    t.addFieldInt32(1, a, 0);
  }
  static endUnlockGeographicalAtlas(t) {
    return t.endObject();
  }
  static createUnlockGeographicalAtlas(t, a, s) {
    UnlockGeographicalAtlas.startUnlockGeographicalAtlas(t);
    UnlockGeographicalAtlas.addType(t, a);
    UnlockGeographicalAtlas.addId(t, s);
    return UnlockGeographicalAtlas.endUnlockGeographicalAtlas(t);
  }
}
exports.UnlockGeographicalAtlas = UnlockGeographicalAtlas;
//# sourceMappingURL=unlock-geographical-atlas.js.map