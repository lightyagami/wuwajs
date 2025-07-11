"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FunctionOpenViewLimit = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class FunctionOpenViewLimit {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ViewName() {
    return this.viewname();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsFunctionOpenViewLimit(t, i) {
    return (i || new FunctionOpenViewLimit()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  viewname(t) {
    var i = this.J7.__offset(this.z7, 4);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.FunctionOpenViewLimit = FunctionOpenViewLimit;
//# sourceMappingURL=FunctionOpenViewLimit.js.map