"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FixedPos = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const pos_a_js_1 = require("../fb-action/pos-a.js");
class FixedPos {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsFixedPos(t, s) {
    return (s || new FixedPos()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFixedPos(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new FixedPos()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  targetPos(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return (t || new pos_a_js_1.PosA()).__init(this.bb.__indirect(this.bb_pos + s), this.bb);
    } else {
      return undefined;
    }
  }
  static startFixedPos(t) {
    t.startObject(2);
  }
  static addType(t, s) {
    t.addFieldInt8(0, s, 0);
  }
  static addTargetPos(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static endFixedPos(t) {
    return t.endObject();
  }
}
exports.FixedPos = FixedPos;
//# sourceMappingURL=fixed-pos.js.map