"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DicIntInt = undefined;
class DicIntInt {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsDicIntInt(t, s) {
    return (s || new DicIntInt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  key() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  value() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.DicIntInt = DicIntInt;
//# sourceMappingURL=DicIntInt.js.map