"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlackBoardVector = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class BlackBoardVector {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsBlackBoardVector(t, r) {
    return (r || new BlackBoardVector()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBlackBoardVector(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new BlackBoardVector()).__init(t.readInt32(t.position()) + t.position(), t);
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
  vector(t) {
    var r = this.bb.__offset(this.bb_pos, 8);
    if (r) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + r), this.bb);
    } else {
      return undefined;
    }
  }
  static startBlackBoardVector(t) {
    t.startObject(3);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addKey(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static addVector(t, r) {
    t.addFieldOffset(2, r, 0);
  }
  static endBlackBoardVector(t) {
    return t.endObject();
  }
}
exports.BlackBoardVector = BlackBoardVector;
//# sourceMappingURL=black-board-vector.js.map