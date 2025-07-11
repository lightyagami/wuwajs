"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DisableMapMark = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DisableMapMark {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(a, t) {
    this.bb_pos = a;
    this.bb = t;
    return this;
  }
  static getRootAsDisableMapMark(a, t) {
    return (t || new DisableMapMark()).__init(a.readInt32(a.position()) + a.position(), a);
  }
  static getSizePrefixedRootAsDisableMapMark(a, t) {
    a.setPosition(a.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new DisableMapMark()).__init(a.readInt32(a.position()) + a.position(), a);
  }
  type(a) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, a);
    } else {
      return undefined;
    }
  }
  markId() {
    var a = this.bb.__offset(this.bb_pos, 6);
    if (a) {
      return this.bb.readInt32(this.bb_pos + a);
    } else {
      return 0;
    }
  }
  static startDisableMapMark(a) {
    a.startObject(2);
  }
  static addType(a, t) {
    a.addFieldOffset(0, t, 0);
  }
  static addMarkId(a, t) {
    a.addFieldInt32(1, t, 0);
  }
  static endDisableMapMark(a) {
    return a.endObject();
  }
  static createDisableMapMark(a, t, s) {
    DisableMapMark.startDisableMapMark(a);
    DisableMapMark.addType(a, t);
    DisableMapMark.addMarkId(a, s);
    return DisableMapMark.endDisableMapMark(a);
  }
}
exports.DisableMapMark = DisableMapMark;
//# sourceMappingURL=disable-map-mark.js.map