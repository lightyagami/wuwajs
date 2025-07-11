"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlackboardWhiteList = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class BlackboardWhiteList {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Key() {
    return this.key();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsBlackboardWhiteList(t, s) {
    return (s || new BlackboardWhiteList()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  key(t) {
    var s = this.J7.__offset(this.z7, 4);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.BlackboardWhiteList = BlackboardWhiteList;
//# sourceMappingURL=BlackboardWhiteList.js.map