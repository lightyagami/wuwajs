"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleMove = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class SimpleMove {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSimpleMove(t, e) {
    return (e || new SimpleMove()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSimpleMove(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SimpleMove()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  who() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  useTime() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  pos(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  static startSimpleMove(t) {
    t.startObject(3);
  }
  static addWho(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addUseTime(t, e) {
    t.addFieldFloat32(1, e, 0);
  }
  static addPos(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endSimpleMove(t) {
    return t.endObject();
  }
}
exports.SimpleMove = SimpleMove;
//# sourceMappingURL=simple-move.js.map