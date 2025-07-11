"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalabashDevelopCondition = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class CalabashDevelopCondition {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Condition() {
    return this.condition();
  }
  get ConditionParam() {
    return GameUtils_1.GameUtils.ConvertToArray(this.conditionparamLength(), this.conditionparam, this);
  }
  get Description() {
    return this.description();
  }
  get RewardExp() {
    return GameUtils_1.GameUtils.ConvertToMap(this.rewardexpLength(), this.rewardexpKey, this.rewardexpValue, this);
  }
  rewardexpKey(t) {
    return this.rewardexp(t)?.key();
  }
  rewardexpValue(t) {
    return this.rewardexp(t)?.value();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsCalabashDevelopCondition(t, i) {
    return (i || new CalabashDevelopCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  condition() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetConditionparamAt(t) {
    return this.conditionparam(t);
  }
  conditionparam(t) {
    var i = this.J7.__offset(this.z7, 8);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  conditionparamLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  conditionparamArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  description(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetRewardexpAt(t, i) {
    return this.rewardexp(t);
  }
  rewardexp(t, i) {
    var s = this.J7.__offset(this.z7, 12);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  rewardexpLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.CalabashDevelopCondition = CalabashDevelopCondition;
//# sourceMappingURL=CalabashDevelopCondition.js.map