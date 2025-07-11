"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DicIntIntIntMap = undefined;
const IntIntMap_1 = require("./IntIntMap");
class DicIntIntIntMap {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  __init(t, n) {
    this.z7 = t;
    this.J7 = n;
    return this;
  }
  static getRootAsDicIntIntIntMap(t, n) {
    return (n || new DicIntIntIntMap()).__init(t.readInt32(t.position()) + t.position(), t);
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
    var n = this.J7.__offset(this.z7, 6);
    if (n) {
      return (t || new IntIntMap_1.IntIntMap()).__init(this.J7.__indirect(this.z7 + n), this.J7);
    } else {
      return null;
    }
  }
}
exports.DicIntIntIntMap = DicIntIntIntMap;
//# sourceMappingURL=DicIntIntIntMap.js.map