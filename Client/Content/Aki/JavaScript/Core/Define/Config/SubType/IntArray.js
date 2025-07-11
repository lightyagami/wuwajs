"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IntArray = undefined;
const GameUtils_1 = require("../../../../Game/GameUtils");
class IntArray {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ArrayInt() {
    return GameUtils_1.GameUtils.ConvertToArray(this.arrayintLength(), this.arrayint, this);
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsIntArray(t, r) {
    return (r || new IntArray()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  GetArrayintAt(t) {
    return this.arrayint(t);
  }
  arrayint(t) {
    var r = this.J7.__offset(this.z7, 4);
    if (r) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + r) + t * 4);
    } else {
      return 0;
    }
  }
  arrayintLength() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  arrayintArray() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.IntArray = IntArray;
//# sourceMappingURL=IntArray.js.map