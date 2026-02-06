"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerParam = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class GuessJokerParam {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Key() {
    return this.key();
  }
  get Value() {
    return this.value();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsGuessJokerParam(t, s) {
    return (s || new GuessJokerParam()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  key(t) {
    var s = this.J7.__offset(this.z7, 4);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
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
exports.GuessJokerParam = GuessJokerParam;
//# sourceMappingURL=GuessJokerParam.js.map