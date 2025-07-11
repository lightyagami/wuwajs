"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnlockNounAtlas = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class UnlockNounAtlas {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsUnlockNounAtlas(t, s) {
    return (s || new UnlockNounAtlas()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsUnlockNounAtlas(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new UnlockNounAtlas()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
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
  static startUnlockNounAtlas(t) {
    t.startObject(2);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addId(t, s) {
    t.addFieldInt32(1, s, 0);
  }
  static endUnlockNounAtlas(t) {
    return t.endObject();
  }
  static createUnlockNounAtlas(t, s, n) {
    UnlockNounAtlas.startUnlockNounAtlas(t);
    UnlockNounAtlas.addType(t, s);
    UnlockNounAtlas.addId(t, n);
    return UnlockNounAtlas.endUnlockNounAtlas(t);
  }
}
exports.UnlockNounAtlas = UnlockNounAtlas;
//# sourceMappingURL=unlock-noun-atlas.js.map