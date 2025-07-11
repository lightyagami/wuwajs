"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FixSpeed = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FixSpeed {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsFixSpeed(e, t) {
    return (t || new FixSpeed()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsFixSpeed(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new FixSpeed()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  speed() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startFixSpeed(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addSpeed(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endFixSpeed(e) {
    return e.endObject();
  }
  static createFixSpeed(e, t, i) {
    FixSpeed.startFixSpeed(e);
    FixSpeed.addType(e, t);
    FixSpeed.addSpeed(e, i);
    return FixSpeed.endFixSpeed(e);
  }
}
exports.FixSpeed = FixSpeed;
//# sourceMappingURL=fix-speed.js.map