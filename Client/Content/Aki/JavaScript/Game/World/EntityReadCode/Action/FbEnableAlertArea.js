"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEnableAlertArea = undefined;
const UnionDisableAlertConditionHelper_1 = require("./UnionDisableAlertConditionHelper");
class FbEnableAlertArea {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Yph = false;
    this.zph = 0;
    this.Dch = false;
    this.bSo = false;
    this.jSh = false;
    this.HSh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEnableAlertArea(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get AreaId() {
    if (!this.Yph) {
      this.Yph = true;
      this.zph = this.FbDataInternal.areaId();
    }
    return this.zph;
  }
  get IsEnable() {
    if (!this.Dch) {
      this.Dch = true;
      this.bSo = this.FbDataInternal.isEnable();
    }
    return this.bSo;
  }
  get AutoDisableCondition() {
    var t;
    var i;
    if (!this.jSh && (this.jSh = true, t = this.FbDataInternal.autoDisableConditionType(), i = UnionDisableAlertConditionHelper_1.UnionDisableAlertConditionHelper.GetUnionDisableAlertConditionObject(t))) {
      this.HSh = UnionDisableAlertConditionHelper_1.UnionDisableAlertConditionHelper.ReadUnionDisableAlertCondition(t, this.FbDataInternal.autoDisableCondition(i));
    }
    return this.HSh;
  }
}
exports.FbEnableAlertArea = FbEnableAlertArea;
//# sourceMappingURL=FbEnableAlertArea.js.map