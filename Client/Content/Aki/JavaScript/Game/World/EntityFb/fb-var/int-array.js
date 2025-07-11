"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IntArray = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class IntArray {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsIntArray(t, r) {
    return (r || new IntArray()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsIntArray(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new IntArray()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  values(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + r) + t * 4);
    } else {
      return 0;
    }
  }
  valuesLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  valuesArray() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  static startIntArray(t) {
    t.startObject(1);
  }
  static addValues(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static createValuesVector(r, s) {
    r.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      r.addInt32(s[t]);
    }
    return r.endVector();
  }
  static startValuesVector(t, r) {
    t.startVector(4, r, 4);
  }
  static endIntArray(t) {
    return t.endObject();
  }
  static createIntArray(t, r) {
    IntArray.startIntArray(t);
    IntArray.addValues(t, r);
    return IntArray.endIntArray(t);
  }
}
exports.IntArray = IntArray;
//# sourceMappingURL=int-array.js.map