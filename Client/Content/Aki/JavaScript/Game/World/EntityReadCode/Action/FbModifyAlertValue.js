"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbModifyAlertValue = undefined;
const UnionAlertValueChangeSpeedHelper_1 = require("./UnionAlertValueChangeSpeedHelper");
const UnionSetAlertValueTypeHelper_1 = require("./UnionSetAlertValueTypeHelper");
class FbModifyAlertValue {
  constructor(e) {
    this.FbDataInternal = e;
    this.u_h = false;
    this.f8o = undefined;
    this.Yph = false;
    this.zph = 0;
    this.Pvh = false;
    this.Uvh = undefined;
    this.XSh = false;
    this.YSh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbModifyAlertValue(e);
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
  get SetType() {
    var e;
    var t;
    if (!this.Pvh && (this.Pvh = true, e = this.FbDataInternal.setTypeType(), t = UnionSetAlertValueTypeHelper_1.UnionSetAlertValueTypeHelper.GetUnionSetAlertValueTypeObject(e))) {
      this.Uvh = UnionSetAlertValueTypeHelper_1.UnionSetAlertValueTypeHelper.ReadUnionSetAlertValueType(e, this.FbDataInternal.setType(t));
    }
    return this.Uvh;
  }
  get ChangeSpeed() {
    var e;
    var t;
    if (!this.XSh && (this.XSh = true, e = this.FbDataInternal.changeSpeedType(), t = UnionAlertValueChangeSpeedHelper_1.UnionAlertValueChangeSpeedHelper.GetUnionAlertValueChangeSpeedObject(e))) {
      this.YSh = UnionAlertValueChangeSpeedHelper_1.UnionAlertValueChangeSpeedHelper.ReadUnionAlertValueChangeSpeed(e, this.FbDataInternal.changeSpeed(t));
    }
    return this.YSh;
  }
}
exports.FbModifyAlertValue = FbModifyAlertValue;
//# sourceMappingURL=FbModifyAlertValue.js.map