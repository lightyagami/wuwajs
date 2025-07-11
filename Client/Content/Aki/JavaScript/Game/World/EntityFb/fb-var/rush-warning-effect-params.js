"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RushWarningEffectParams = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RushWarningEffectParams {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsRushWarningEffectParams(t, s) {
    return (s || new RushWarningEffectParams()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsRushWarningEffectParams(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new RushWarningEffectParams()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  length() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  width() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  time() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startRushWarningEffectParams(t) {
    t.startObject(4);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addLength(t, s) {
    t.addFieldInt32(1, s, 0);
  }
  static addWidth(t, s) {
    t.addFieldInt32(2, s, 0);
  }
  static addTime(t, s) {
    t.addFieldFloat32(3, s, 0);
  }
  static endRushWarningEffectParams(t) {
    return t.endObject();
  }
  static createRushWarningEffectParams(t, s, a, r, i) {
    RushWarningEffectParams.startRushWarningEffectParams(t);
    RushWarningEffectParams.addType(t, s);
    RushWarningEffectParams.addLength(t, a);
    RushWarningEffectParams.addWidth(t, r);
    RushWarningEffectParams.addTime(t, i);
    return RushWarningEffectParams.endRushWarningEffectParams(t);
  }
}
exports.RushWarningEffectParams = RushWarningEffectParams;
//# sourceMappingURL=rush-warning-effect-params.js.map