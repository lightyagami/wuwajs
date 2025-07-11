"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbLifePoint = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbLifePointColorBoard_1 = require("./FbLifePointColorBoard");
const FbLifePointMaxStepRewardRuleItem_1 = require("./FbLifePointMaxStepRewardRuleItem");
class FbLifePoint {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.fIh = false;
    this.pIh = undefined;
    this.vIh = false;
    this.yIh = 0;
    this.SIh = false;
    this.MIh = undefined;
    this.EIh = false;
    this.IIh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbLifePoint(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get ColorBoard() {
    if (!this.fIh) {
      this.fIh = true;
      this.pIh = FbLifePointColorBoard_1.FbLifePointColorBoard.Create(this.FbDataInternal.colorBoard());
    }
    return this.pIh;
  }
  get StepLimit() {
    if (!this.vIh) {
      this.vIh = true;
      this.yIh = this.FbDataInternal.stepLimit();
    }
    return this.yIh;
  }
  get TidDesc() {
    if (!this.SIh) {
      this.SIh = true;
      this.MIh = this.FbDataInternal.tidDesc();
    }
    return this.MIh;
  }
  get MaxStepRewardRule() {
    if (!this.EIh) {
      this.EIh = true;
      this.IIh = new Array();
      var i = this.FbDataInternal.maxStepRewardRuleLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.maxStepRewardRule(t, new fb_action_1.LifePointMaxStepRewardRuleItem());
          this.IIh.push(FbLifePointMaxStepRewardRuleItem_1.FbLifePointMaxStepRewardRuleItem.Create(e));
        }
      }
    }
    return this.IIh;
  }
}
exports.FbLifePoint = FbLifePoint;
//# sourceMappingURL=FbLifePoint.js.map