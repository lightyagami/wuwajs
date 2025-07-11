"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlackBoardFloat = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BlackBoardFloat {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsBlackBoardFloat(t, a) {
    return (a || new BlackBoardFloat()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBlackBoardFloat(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new BlackBoardFloat()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  key(t) {
    var a = this.bb.__offset(this.bb_pos, 6);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  value() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startBlackBoardFloat(t) {
    t.startObject(3);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static addKey(t, a) {
    t.addFieldOffset(1, a, 0);
  }
  static addValue(t, a) {
    t.addFieldFloat32(2, a, 0);
  }
  static endBlackBoardFloat(t) {
    return t.endObject();
  }
  static createBlackBoardFloat(t, a, r, o) {
    BlackBoardFloat.startBlackBoardFloat(t);
    BlackBoardFloat.addType(t, a);
    BlackBoardFloat.addKey(t, r);
    BlackBoardFloat.addValue(t, o);
    return BlackBoardFloat.endBlackBoardFloat(t);
  }
}
exports.BlackBoardFloat = BlackBoardFloat;
//# sourceMappingURL=black-board-float.js.map