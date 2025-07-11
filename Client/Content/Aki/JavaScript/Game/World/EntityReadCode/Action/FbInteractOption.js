"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbInteractOption = undefined;
const FbDurationInteract_1 = require("./FbDurationInteract");
const FbOptionLockTip_1 = require("./FbOptionLockTip");
const UnionInteractOptionHelper_1 = require("./UnionInteractOptionHelper");
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbInteractOption {
  constructor(t) {
    this.FbDataInternal = t;
    this.__h = false;
    this.c_h = undefined;
    this.u_h = false;
    this.f8o = undefined;
    this.d_h = false;
    this.m_h = undefined;
    this.C_h = false;
    this.g_h = undefined;
    this.f_h = false;
    this.X6o = undefined;
    this.p_h = false;
    this.v_h = undefined;
    this.y_h = false;
    this.S_h = undefined;
    this.M_h = false;
    this.E_h = 0;
    this.I_h = false;
    this.y6o = undefined;
    this.T_h = false;
    this.b_h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbInteractOption(t);
    }
  }
  get Guid() {
    if (!this.__h) {
      this.__h = true;
      this.c_h = this.FbDataInternal.guid();
    }
    return this.c_h;
  }
  get Type() {
    var t;
    var i;
    if (!this.u_h && (this.u_h = true, t = this.FbDataInternal.typeType(), i = UnionInteractOptionHelper_1.UnionInteractOptionHelper.GetUnionInteractOptionObject(t))) {
      this.f8o = UnionInteractOptionHelper_1.UnionInteractOptionHelper.ReadUnionInteractOption(t, this.FbDataInternal.type(i));
    }
    return this.f8o;
  }
  get Icon() {
    if (!this.d_h) {
      this.d_h = true;
      this.m_h = this.FbDataInternal.icon();
    }
    return this.m_h;
  }
  get TidContent() {
    if (!this.C_h) {
      this.C_h = true;
      this.g_h = this.FbDataInternal.tidContent();
    }
    return this.g_h;
  }
  get Condition() {
    if (!this.f_h) {
      this.f_h = true;
      this.X6o = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.condition());
    }
    return this.X6o;
  }
  get UniquenessTest() {
    if (!this.p_h) {
      this.p_h = true;
      this.v_h = this.FbDataInternal.uniquenessTest();
    }
    return this.v_h;
  }
  get DoIntactType() {
    if (!this.y_h) {
      this.y_h = true;
      this.S_h = this.FbDataInternal.doIntactType();
    }
    return this.S_h;
  }
  get Range() {
    if (!this.M_h) {
      this.M_h = true;
      this.E_h = this.FbDataInternal.range();
    }
    return this.E_h;
  }
  get Duration() {
    if (!this.I_h) {
      this.I_h = true;
      this.y6o = FbDurationInteract_1.FbDurationInteract.Create(this.FbDataInternal.duration());
    }
    return this.y6o;
  }
  get OptionLockTip() {
    if (!this.T_h) {
      this.T_h = true;
      this.b_h = FbOptionLockTip_1.FbOptionLockTip.Create(this.FbDataInternal.optionLockTip());
    }
    return this.b_h;
  }
}
exports.FbInteractOption = FbInteractOption;
//# sourceMappingURL=FbInteractOption.js.map