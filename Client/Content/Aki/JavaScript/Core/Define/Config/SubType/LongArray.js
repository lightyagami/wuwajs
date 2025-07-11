"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LongArray = undefined;
const GameUtils_1 = require("../../../../Game/GameUtils");
class LongArray {
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
  static getRootAsLongArray(t, r) {
    return (r || new LongArray()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  GetArraylongAt(t) {
    return this.arraylong(t);
  }
  arraylong(t) {
    var r = this.J7.__offset(this.z7, 4);
    if (r) {
      return this.J7.readInt64(this.J7.__vector(this.z7 + r) + t * 8);
    } else {
      return BigInt(0);
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
}
exports.LongArray = LongArray;
//# sourceMappingURL=LongArray.js.map