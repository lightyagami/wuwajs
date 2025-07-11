"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTalkOption = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("./FbActionInfo");
const FbOptionLockTip_1 = require("./FbOptionLockTip");
const UnionTalkOptionParamHelper_1 = require("./UnionTalkOptionParamHelper");
const UnionTalkOptionPreConditionHelper_1 = require("./UnionTalkOptionPreConditionHelper");
class FbTalkOption {
  constructor(t) {
    this.FbDataInternal = t;
    this.Ggh = false;
    this.Ogh = undefined;
    this.CCh = false;
    this.gCh = 0;
    this.igh = false;
    this.rgh = 0;
    this.vCh = false;
    this.yCh = undefined;
    this.d_h = false;
    this.m_h = 0;
    this.Fgh = false;
    this.Ngh = false;
    this.L_h = false;
    this.A_h = undefined;
    this.Vgh = false;
    this.jgh = undefined;
    this.Hgh = false;
    this.Wgh = undefined;
    this.ogh = false;
    this.ngh = false;
    this.sgh = false;
    this.agh = undefined;
    this.T_h = false;
    this.b_h = undefined;
    this.Qgh = false;
    this.Kgh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTalkOption(t);
    }
  }
  get TidTalkOption() {
    if (!this.Ggh) {
      this.Ggh = true;
      this.Ogh = this.FbDataInternal.tidTalkOption();
    }
    return this.Ogh;
  }
  get TextId() {
    if (!this.CCh) {
      this.CCh = true;
      this.gCh = this.FbDataInternal.textId();
    }
    return this.gCh;
  }
  get PlotLineId() {
    if (!this.igh) {
      this.igh = true;
      this.rgh = this.FbDataInternal.plotLineId();
    }
    return this.rgh;
  }
  get PlotLineKey() {
    if (!this.vCh) {
      this.vCh = true;
      this.yCh = this.FbDataInternal.plotLineKey();
    }
    return this.yCh;
  }
  get Icon() {
    if (!this.d_h) {
      this.d_h = true;
      this.m_h = this.FbDataInternal.icon();
    }
    return this.m_h;
  }
  get ReadMarkEnabled() {
    if (!this.Fgh) {
      this.Fgh = true;
      this.Ngh = this.FbDataInternal.readMarkEnabled();
    }
    return this.Ngh;
  }
  get Actions() {
    if (!this.L_h) {
      this.L_h = true;
      this.A_h = new Array();
      var i = this.FbDataInternal.actionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.actions(t, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
      }
    }
    return this.A_h;
  }
  get OptionStyle() {
    if (!this.Vgh) {
      this.Vgh = true;
      this.jgh = this.FbDataInternal.optionStyle();
    }
    return this.jgh;
  }
  get PreCondition() {
    var t;
    var i;
    if (!this.Hgh && (this.Hgh = true, t = this.FbDataInternal.preConditionType(), i = UnionTalkOptionPreConditionHelper_1.UnionTalkOptionPreConditionHelper.GetUnionTalkOptionPreConditionObject(t))) {
      this.Wgh = UnionTalkOptionPreConditionHelper_1.UnionTalkOptionPreConditionHelper.ReadUnionTalkOptionPreCondition(t, this.FbDataInternal.preCondition(i));
    }
    return this.Wgh;
  }
  get _folded() {
    if (!this.ogh) {
      this.ogh = true;
      this.ngh = this.FbDataInternal.folded();
    }
    return this.ngh;
  }
  get _editFlag() {
    if (!this.sgh) {
      this.sgh = true;
      this.agh = this.FbDataInternal.editFlag();
    }
    return this.agh;
  }
  get OptionLockTip() {
    if (!this.T_h) {
      this.T_h = true;
      this.b_h = FbOptionLockTip_1.FbOptionLockTip.Create(this.FbDataInternal.optionLockTip());
    }
    return this.b_h;
  }
  get TypeParams() {
    var t;
    var i;
    if (!this.Qgh && (this.Qgh = true, t = this.FbDataInternal.typeParamsType(), i = UnionTalkOptionParamHelper_1.UnionTalkOptionParamHelper.GetUnionTalkOptionParamObject(t))) {
      this.Kgh = UnionTalkOptionParamHelper_1.UnionTalkOptionParamHelper.ReadUnionTalkOptionParam(t, this.FbDataInternal.typeParams(i));
    }
    return this.Kgh;
  }
}
exports.FbTalkOption = FbTalkOption;
//# sourceMappingURL=FbTalkOption.js.map