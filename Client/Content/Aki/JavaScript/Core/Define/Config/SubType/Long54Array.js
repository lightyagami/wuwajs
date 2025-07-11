"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Long54Array = undefined;
const GameUtils_1 = require("../../../../Game/GameUtils");
class Long54Array {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ArrayLong() {
    return GameUtils_1.GameUtils.ConvertToArray(this.arraylongLength(), this.arraylong, this);
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsLong54Array(t, r) {
    return (r || new Long54Array()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  GetArraylongAt(t) {
    return this.arraylong(t);
  }
  arraylong(t) {
    var r = this.J7.__offset(this.z7, 4);
    if (r) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + r) + t * 8);
    } else {
      return 0;
    }
  }
  arraylongLength() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  arraylongArray() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.Long54Array = Long54Array;
//# sourceMappingURL=Long54Array.js.map