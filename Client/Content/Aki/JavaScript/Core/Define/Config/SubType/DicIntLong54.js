"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DicIntLong54 = undefined;
class DicIntLong54 {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsDicIntLong54(t, s) {
    return (s || new DicIntLong54()).__init(t.readInt32(t.position()) + t.position(), t);
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
      return this.J7.readFloat64(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.DicIntLong54 = DicIntLong54;
//# sourceMappingURL=DicIntLong54.js.map