"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdsorbAddBuff = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AdsorbAddBuff {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsAdsorbAddBuff(t, s) {
    return (s || new AdsorbAddBuff()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsAdsorbAddBuff(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new AdsorbAddBuff()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  speed() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startAdsorbAddBuff(t) {
    t.startObject(2);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addSpeed(t, s) {
    t.addFieldInt32(1, s, 0);
  }
  static endAdsorbAddBuff(t) {
    return t.endObject();
  }
  static createAdsorbAddBuff(t, s, d) {
    AdsorbAddBuff.startAdsorbAddBuff(t);
    AdsorbAddBuff.addType(t, s);
    AdsorbAddBuff.addSpeed(t, d);
    return AdsorbAddBuff.endAdsorbAddBuff(t);
  }
}
exports.AdsorbAddBuff = AdsorbAddBuff;
//# sourceMappingURL=adsorb-add-buff.js.map