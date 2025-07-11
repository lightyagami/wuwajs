"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomRarity = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class PhantomRarity {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Rare() {
    return this.rare();
  }
  get Cost() {
    return this.cost();
  }
  get Desc() {
    return this.desc();
  }
  get PolishCost() {
    return GameUtils_1.GameUtils.ConvertToMap(this.polishcostLength(), this.polishcostKey, this.polishcostValue, this);
  }
  polishcostKey(t) {
    return this.polishcost(t)?.key();
  }
  polishcostValue(t) {
    return this.polishcost(t)?.value();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsPhantomRarity(t, s) {
    return (s || new PhantomRarity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  rare() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  cost() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  desc(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetPolishcostAt(t, s) {
    return this.polishcost(t);
  }
  polishcost(t, s) {
    var i = this.J7.__offset(this.z7, 10);
    if (i) {
      return (s || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  polishcostLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.PhantomRarity = PhantomRarity;
//# sourceMappingURL=PhantomRarity.js.map