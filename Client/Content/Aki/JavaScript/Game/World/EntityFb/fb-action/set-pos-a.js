"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetPosA = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const pos_a_js_1 = require("../fb-action/pos-a.js");
class SetPosA {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsSetPosA(t, s) {
    return (s || new SetPosA()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSetPosA(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new SetPosA()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  pos(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return (t || new pos_a_js_1.PosA()).__init(this.bb.__indirect(this.bb_pos + s), this.bb);
    } else {
      return undefined;
    }
  }
  static startSetPosA(t) {
    t.startObject(1);
  }
  static addPos(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static endSetPosA(t) {
    return t.endObject();
  }
  static createSetPosA(t, s) {
    SetPosA.startSetPosA(t);
    SetPosA.addPos(t, s);
    return SetPosA.endSetPosA(t);
  }
}
exports.SetPosA = SetPosA;
//# sourceMappingURL=set-pos-a.js.map