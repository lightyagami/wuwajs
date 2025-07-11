"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlackBoardBoolean = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BlackBoardBoolean {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(a, t) {
    this.bb_pos = a;
    this.bb = t;
    return this;
  }
  static getRootAsBlackBoardBoolean(a, t) {
    return (t || new BlackBoardBoolean()).__init(a.readInt32(a.position()) + a.position(), a);
  }
  static getSizePrefixedRootAsBlackBoardBoolean(a, t) {
    a.setPosition(a.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new BlackBoardBoolean()).__init(a.readInt32(a.position()) + a.position(), a);
  }
  type(a) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, a);
    } else {
      return undefined;
    }
  }
  key(a) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, a);
    } else {
      return undefined;
    }
  }
  value() {
    var a = this.bb.__offset(this.bb_pos, 8);
    return !!a && !!this.bb.readInt8(this.bb_pos + a);
  }
  static startBlackBoardBoolean(a) {
    a.startObject(3);
  }
  static addType(a, t) {
    a.addFieldOffset(0, t, 0);
  }
  static addKey(a, t) {
    a.addFieldOffset(1, t, 0);
  }
  static addValue(a, t) {
    a.addFieldInt8(2, +t, 0);
  }
  static endBlackBoardBoolean(a) {
    return a.endObject();
  }
  static createBlackBoardBoolean(a, t, o, e) {
    BlackBoardBoolean.startBlackBoardBoolean(a);
    BlackBoardBoolean.addType(a, t);
    BlackBoardBoolean.addKey(a, o);
    BlackBoardBoolean.addValue(a, e);
    return BlackBoardBoolean.endBlackBoardBoolean(a);
  }
}
exports.BlackBoardBoolean = BlackBoardBoolean;
//# sourceMappingURL=black-board-boolean.js.map