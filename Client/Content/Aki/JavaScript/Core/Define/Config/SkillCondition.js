"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillCondition = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class SkillCondition {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ConditionType() {
    return this.conditiontype();
  }
  get ConditionParam() {
    return GameUtils_1.GameUtils.ConvertToMap(this.conditionparamLength(), this.conditionparamKey, this.conditionparamValue, this);
  }
  conditionparamKey(t) {
    return this.conditionparam(t)?.key();
  }
  conditionparamValue(t) {
    return this.conditionparam(t)?.value();
  }
  get Description() {
    return this.description();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsSkillCondition(t, i) {
    return (i || new SkillCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  conditiontype() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetConditionparamAt(t, i) {
    return this.conditionparam(t);
  }
  conditionparam(t, i) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
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
  description(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.SkillCondition = SkillCondition;
//# sourceMappingURL=SkillCondition.js.map