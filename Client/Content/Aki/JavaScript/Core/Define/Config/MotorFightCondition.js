"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightCondition = undefined;
class MotorFightCondition {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ConditionId() {
    return this.conditionid();
  }
  get ConditionType() {
    return this.conditiontype();
  }
  get CompareType() {
    return this.comparetype();
  }
  get ConditionParam() {
    return this.conditionparam();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsMotorFightCondition(t, i) {
    return (i || new MotorFightCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  conditionid() {
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
  comparetype() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  conditionparam() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.MotorFightCondition = MotorFightCondition;
//# sourceMappingURL=MotorFightCondition.js.map