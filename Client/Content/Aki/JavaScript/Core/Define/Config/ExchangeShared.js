"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExchangeShared = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class ExchangeShared {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get MaxCount() {
    return this.maxcount();
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
  get ResetTimeId() {
    return this.resettimeid();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsExchangeShared(t, s) {
    return (s || new ExchangeShared()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxcount() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetCostAt(t, s) {
    return this.cost(t);
  }
  cost(t, s) {
    var e = this.J7.__offset(this.z7, 8);
    if (e) {
      return (s || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  costLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  resettimeid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.ExchangeShared = ExchangeShared;
//# sourceMappingURL=ExchangeShared.js.map