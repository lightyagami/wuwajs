"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DicIntIntArray = undefined;
const IntArray_1 = require("./IntArray");
class DicIntIntArray {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsDicIntIntArray(t, r) {
    return (r || new DicIntIntArray()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  key() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  value(t) {
    var r = this.J7.__offset(this.z7, 6);
    if (r) {
      return (t || new IntArray_1.IntArray()).__init(this.J7.__indirect(this.z7 + r), this.J7);
    } else {
      return null;
    }
  }
}
exports.DicIntIntArray = DicIntIntArray;
//# sourceMappingURL=DicIntIntArray.js.map