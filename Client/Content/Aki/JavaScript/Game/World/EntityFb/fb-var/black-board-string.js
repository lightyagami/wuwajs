"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlackBoardString = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BlackBoardString {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsBlackBoardString(t, r) {
    return (r || new BlackBoardString()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBlackBoardString(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new BlackBoardString()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  key(t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  value(t) {
    var r = this.bb.__offset(this.bb_pos, 8);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  static startBlackBoardString(t) {
    t.startObject(3);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addKey(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static addValue(t, r) {
    t.addFieldOffset(2, r, 0);
  }
  static endBlackBoardString(t) {
    return t.endObject();
  }
  static createBlackBoardString(t, r, a, i) {
    BlackBoardString.startBlackBoardString(t);
    BlackBoardString.addType(t, r);
    BlackBoardString.addKey(t, a);
    BlackBoardString.addValue(t, i);
    return BlackBoardString.endBlackBoardString(t);
  }
}
exports.BlackBoardString = BlackBoardString;
//# sourceMappingURL=black-board-string.js.map