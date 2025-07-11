"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbpState = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class AbpState {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Abp() {
    return this.abp();
  }
  get State1() {
    return this.state1();
  }
  get State2() {
    return this.state2();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsAbpState(t, s) {
    return (s || new AbpState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  abp(t) {
    var s = this.J7.__offset(this.z7, 4);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  state1(t) {
    var s = this.J7.__offset(this.z7, 6);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  state2(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.AbpState = AbpState;
//# sourceMappingURL=AbpState.js.map