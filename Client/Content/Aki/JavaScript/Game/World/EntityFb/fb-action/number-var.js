"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberVar = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class NumberVar {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(r, t) {
    this.bb_pos = r;
    this.bb = t;
    return this;
  }
  static getRootAsNumberVar(r, t) {
    return (t || new NumberVar()).__init(r.readInt32(r.position()) + r.position(), r);
  }
  static getSizePrefixedRootAsNumberVar(r, t) {
    r.setPosition(r.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new NumberVar()).__init(r.readInt32(r.position()) + r.position(), r);
  }
  name(r) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, r);
    } else {
      return undefined;
    }
  }
  value() {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return this.bb.readFloat32(this.bb_pos + r);
    } else {
      return 0;
    }
  }
  static startNumberVar(r) {
    r.startObject(2);
  }
  static addName(r, t) {
    r.addFieldOffset(0, t, 0);
  }
  static addValue(r, t) {
    r.addFieldFloat32(1, t, 0);
  }
  static endNumberVar(r) {
    return r.endObject();
  }
  static createNumberVar(r, t, e) {
    NumberVar.startNumberVar(r);
    NumberVar.addName(r, t);
    NumberVar.addValue(r, e);
    return NumberVar.endNumberVar(r);
  }
}
exports.NumberVar = NumberVar;
//# sourceMappingURL=number-var.js.map