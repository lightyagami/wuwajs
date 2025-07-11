"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DicIntFloat = undefined;
class DicIntFloat {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsDicIntFloat(t, s) {
    return (s || new DicIntFloat()).__init(t.readInt32(t.position()) + t.position(), t);
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
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.DicIntFloat = DicIntFloat;
//# sourceMappingURL=DicIntFloat.js.map