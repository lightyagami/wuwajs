"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomTrialBattleData = undefined;
const AttributeDefine_1 = require("../../../Attribute/AttributeDefine");
const PhantomBattleData_1 = require("../PhantomBattleData");
class PhantomTrialBattleData extends PhantomBattleData_1.PhantomBattleData {
  constructor() {
    super(...arguments);
    this.kVi = new Map();
    this.FVi = undefined;
    this.VVi = new Map();
    this.wVi = 0;
    this.HVi = 0;
  }
  SetMainPropValue(t, e, r) {
    e = new AttributeDefine_1.AttributeValueData(t, e, r);
    this.kVi.set(t, e);
  }
  SetSubPropValue(t, e, r) {
    e = new AttributeDefine_1.AttributeValueData(t, e, r);
    this.VVi.set(t, e);
  }
  SetFetterGroupId(t) {
    this.HVi = t;
  }
  GetFetterGroupId() {
    return this.HVi;
  }
  SetSlotIndex(t) {
    this.wVi = t;
  }
  GetIfMain() {
    return this.wVi === 0;
  }
  GetUniqueId() {
    return this.GetIncrId();
  }
  GetMainTrailProp() {
    return this.kVi;
  }
  GetSubTrailPropMap() {
    return this.VVi;
  }
  GetBreachProp() {
    return this.FVi;
  }
  IsBreach() {
    return true;
  }
}
exports.PhantomTrialBattleData = PhantomTrialBattleData;
//# sourceMappingURL=PhantomTrialBattleData.js.map