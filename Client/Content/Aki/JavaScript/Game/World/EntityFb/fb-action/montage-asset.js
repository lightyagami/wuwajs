"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MontageAsset = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class MontageAsset {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsMontageAsset(t, s) {
    return (s || new MontageAsset()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsMontageAsset(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new MontageAsset()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  asset(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  static startMontageAsset(t) {
    t.startObject(2);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addAsset(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static endMontageAsset(t) {
    return t.endObject();
  }
  static createMontageAsset(t, s, e) {
    MontageAsset.startMontageAsset(t);
    MontageAsset.addType(t, s);
    MontageAsset.addAsset(t, e);
    return MontageAsset.endMontageAsset(t);
  }
}
exports.MontageAsset = MontageAsset;
//# sourceMappingURL=montage-asset.js.map