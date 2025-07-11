"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloatArray = undefined;
const GameUtils_1 = require("../../../../Game/GameUtils");
class FloatArray {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ArrayFloat() {
    return GameUtils_1.GameUtils.ConvertToArray(this.arrayfloatLength(), this.arrayfloat, this);
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsFloatArray(t, r) {
    return (r || new FloatArray()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  GetArrayfloatAt(t) {
    return this.arrayfloat(t);
  }
  arrayfloat(t) {
    var r = this.J7.__offset(this.z7, 4);
    if (r) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + r) + t * 4);
    } else {
      return 0;
    }
  }
  arrayfloatLength() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  arrayfloatArray() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.FloatArray = FloatArray;
//# sourceMappingURL=FloatArray.js.map