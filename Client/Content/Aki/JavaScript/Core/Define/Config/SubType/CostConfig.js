"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CostConfig = undefined;
const GameUtils_1 = require("../../../../Game/GameUtils");
const DicIntInt_1 = require("./DicIntInt");
class CostConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
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
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsCostConfig(t, s) {
    return (s || new CostConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  GetCostAt(t, s) {
    return this.cost(t);
  }
  cost(t, s) {
    var i = this.J7.__offset(this.z7, 4);
    if (i) {
      return (s || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  costLength() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.CostConfig = CostConfig;
//# sourceMappingURL=CostConfig.js.map