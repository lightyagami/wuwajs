"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdsortTransform = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class AdsortTransform {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsAdsortTransform(t, s) {
    return (s || new AdsortTransform()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsAdsortTransform(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new AdsortTransform()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  pos(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + s), this.bb);
    } else {
      return undefined;
    }
  }
  rot(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + s), this.bb);
    } else {
      return undefined;
    }
  }
  static startAdsortTransform(t) {
    t.startObject(2);
  }
  static addPos(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addRot(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static endAdsortTransform(t) {
    return t.endObject();
  }
}
exports.AdsortTransform = AdsortTransform;
//# sourceMappingURL=adsort-transform.js.map