"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HideMapMark = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HideMapMark {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsHideMapMark(t, a) {
    return (a || new HideMapMark()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsHideMapMark(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new HideMapMark()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  markId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startHideMapMark(t) {
    t.startObject(2);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static addMarkId(t, a) {
    t.addFieldInt32(1, a, 0);
  }
  static endHideMapMark(t) {
    return t.endObject();
  }
  static createHideMapMark(t, a, e) {
    HideMapMark.startHideMapMark(t);
    HideMapMark.addType(t, a);
    HideMapMark.addMarkId(t, e);
    return HideMapMark.endHideMapMark(t);
  }
}
exports.HideMapMark = HideMapMark;
//# sourceMappingURL=hide-map-mark.js.map