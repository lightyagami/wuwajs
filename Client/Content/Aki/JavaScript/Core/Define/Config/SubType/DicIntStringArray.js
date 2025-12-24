"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DicIntStringArray = undefined;
const StringArray_1 = require("./StringArray");
class DicIntStringArray {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsDicIntStringArray(t, r) {
    return (r || new DicIntStringArray()).__init(t.readInt32(t.position()) + t.position(), t);
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
      return (t || new StringArray_1.StringArray()).__init(this.J7.__indirect(this.z7 + r), this.J7);
    } else {
      return null;
    }
  }
}
exports.DicIntStringArray = DicIntStringArray;
//# sourceMappingURL=DicIntStringArray.js.map