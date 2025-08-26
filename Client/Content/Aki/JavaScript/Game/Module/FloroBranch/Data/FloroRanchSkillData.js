"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchSkillData = undefined;
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
class FloroRanchSkillData {
  constructor(t) {
    this.Lo = undefined;
    this.P4e = true;
    this.Qmu = 0;
    this.Lo = t;
  }
  get Id() {
    return this.Lo.Id;
  }
  UpdateUnLockState(t) {
    this.P4e = t;
  }
  get IsUnLock() {
    return this.P4e;
  }
  set ConditionId(t) {
    this.Qmu = t;
  }
  get ConditionId() {
    return this.Qmu;
  }
  get Name() {
    return this.Lo.Name;
  }
  GetRealName() {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.Lo.Name);
  }
  get Icon() {
    return this.Lo.Icon;
  }
  get Desc() {
    return this.Lo.Desc;
  }
  get IsActiveSkill() {
    return this.Lo.Type === 0;
  }
}
exports.FloroRanchSkillData = FloroRanchSkillData;
//# sourceMappingURL=FloroRanchSkillData.js.map