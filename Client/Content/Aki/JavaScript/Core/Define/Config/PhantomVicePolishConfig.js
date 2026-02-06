"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomVicePolishConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class PhantomVicePolishConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get PropCount() {
    return this.propcount();
  }
  get Cost() {
    return GameUtils_1.GameUtils.ConvertToMap(this.costLength(), this.costKey, this.costValue, this);
  }
  costKey(t) {
    return this.cost(t)?.key();
  }
  costValue(t) {
    return this.cost(t)?.value();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsPhantomVicePolishConfig(t, i) {
    return (i || new PhantomVicePolishConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  propcount() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetCostAt(t, i) {
    return this.cost(t);
  }
  cost(t, i) {
    var s = this.J7.__offset(this.z7, 6);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  costLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.PhantomVicePolishConfig = PhantomVicePolishConfig;
//# sourceMappingURL=PhantomVicePolishConfig.js.map