"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DicStringInt = undefined;
const GameUtils_1 = require("../../../../Game/GameUtils");
class DicStringInt {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsDicStringInt(t, i) {
    return (i || new DicStringInt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  key(t) {
    var i = this.J7.__offset(this.z7, 4);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
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
exports.DicStringInt = DicStringInt;
//# sourceMappingURL=DicStringInt.js.map