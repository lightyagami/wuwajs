"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Condition = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicStringString_1 = require("./SubType/DicStringString");
class Condition {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Type() {
    return this.type();
  }
  get NeedNum() {
    return this.neednum();
  }
  get LimitParams() {
    return GameUtils_1.GameUtils.ConvertToMap(this.limitparamsLength(), this.limitparamsKey, this.limitparamsValue, this);
  }
  limitparamsKey(t) {
    return this.limitparams(t)?.key();
  }
  limitparamsValue(t) {
    return this.limitparams(t)?.value();
  }
  get LimitParamsOpe() {
    return GameUtils_1.GameUtils.ConvertToMap(this.limitparamsopeLength(), this.limitparamsopeKey, this.limitparamsopeValue, this);
  }
  limitparamsopeKey(t) {
    return this.limitparamsope(t)?.key();
  }
  limitparamsopeValue(t) {
    return this.limitparamsope(t)?.value();
  }
  get IsClient() {
    return this.isclient();
  }
  get Description() {
    return this.description();
  }
  get AccessId() {
    return this.accessid();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsCondition(t, i) {
    return (i || new Condition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  type(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  neednum() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  GetLimitparamsAt(t, i) {
    return this.limitparams(t);
  }
  limitparams(t, i) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return (i || new DicStringString_1.DicStringString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  limitparamsLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetLimitparamsopeAt(t, i) {
    return this.limitparamsope(t);
  }
  limitparamsope(t, i) {
    var s = this.J7.__offset(this.z7, 12);
    if (s) {
      return (i || new DicStringString_1.DicStringString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  limitparamsopeLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  isclient() {
    var t = this.J7.__offset(this.z7, 14);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  description(t) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  accessid() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.Condition = Condition;
//# sourceMappingURL=Condition.js.map