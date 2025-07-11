"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleBreach = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class RoleBreach {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get BreachGroupId() {
    return this.breachgroupid();
  }
  get BreachLevel() {
    return this.breachlevel();
  }
  get MaxLevel() {
    return this.maxlevel();
  }
  get BreachConsume() {
    return GameUtils_1.GameUtils.ConvertToMap(this.breachconsumeLength(), this.breachconsumeKey, this.breachconsumeValue, this);
  }
  breachconsumeKey(t) {
    return this.breachconsume(t)?.key();
  }
  breachconsumeValue(t) {
    return this.breachconsume(t)?.value();
  }
  get BreachReward() {
    return this.breachreward();
  }
  get ConditionId() {
    return this.conditionid();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsRoleBreach(t, e) {
    return (e || new RoleBreach()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  breachgroupid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  breachlevel() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxlevel() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetBreachconsumeAt(t, e) {
    return this.breachconsume(t);
  }
  breachconsume(t, e) {
    var r = this.J7.__offset(this.z7, 12);
    if (r) {
      return (e || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + r) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  breachconsumeLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  breachreward() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  conditionid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RoleBreach = RoleBreach;
//# sourceMappingURL=RoleBreach.js.map