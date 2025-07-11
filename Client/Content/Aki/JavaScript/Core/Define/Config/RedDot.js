"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDot = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RedDot {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Name() {
    return this.name();
  }
  get RelativeName() {
    return this.relativename();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsRedDot(t, e) {
    return (e || new RedDot()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  name(t) {
    var e = this.J7.__offset(this.z7, 4);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  relativename(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.RedDot = RedDot;
//# sourceMappingURL=RedDot.js.map