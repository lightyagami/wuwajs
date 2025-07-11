"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveToPosA = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const pos_a_js_1 = require("../fb-action/pos-a.js");
class MoveToPosA {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsMoveToPosA(t, s) {
    return (s || new MoveToPosA()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsMoveToPosA(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new MoveToPosA()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  timeout() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  pos(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return (t || new pos_a_js_1.PosA()).__init(this.bb.__indirect(this.bb_pos + s), this.bb);
    } else {
      return undefined;
    }
  }
  static startMoveToPosA(t) {
    t.startObject(2);
  }
  static addTimeout(t, s) {
    t.addFieldFloat32(0, s, 0);
  }
  static addPos(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static endMoveToPosA(t) {
    return t.endObject();
  }
}
exports.MoveToPosA = MoveToPosA;
//# sourceMappingURL=move-to-pos-a.js.map