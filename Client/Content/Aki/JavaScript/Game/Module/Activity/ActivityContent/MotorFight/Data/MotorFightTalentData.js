"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightTalentData = undefined;
class MotorFightTalentData {
  constructor(t) {
    this.Lo = undefined;
    this.ccg = false;
    this.P4e = false;
    this.Lo = t;
  }
  set IsUnLock(t) {
    this.P4e = t;
  }
  get IsUnLock() {
    return this.P4e;
  }
  set IsFinishPreCondition(t) {
    this.ccg = t;
  }
  get IsFinishPreCondition() {
    return this.ccg;
  }
  get Id() {
    return this.Lo.Id;
  }
  get Name() {
    return this.Lo.Name;
  }
  get Column() {
    return this.Lo.Column;
  }
  get Row() {
    return this.Lo.Row;
  }
  get Cost() {
    return this.Lo.Consume;
  }
  get Desc() {
    return this.Lo.Desc;
  }
  get DescParams() {
    return this.Lo.DescParam;
  }
  get PreNode() {
    return this.Lo.PreNode;
  }
  get Icon() {
    return this.Lo.Icon;
  }
  get ConditionId() {
    return this.Lo.UnlockCondition;
  }
}
exports.MotorFightTalentData = MotorFightTalentData;
//# sourceMappingURL=MotorFightTalentData.js.map