"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbClientConditionListener = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("../Action/FbActionInfo");
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbClientConditionListener {
  constructor(t) {
    this.FbDataInternal = t;
    this.f_h = false;
    this.X6o = undefined;
    this.L_h = false;
    this.A_h = undefined;
    this.XYh = false;
    this.YYh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbClientConditionListener(t);
    }
  }
  get Condition() {
    if (!this.f_h) {
      this.f_h = true;
      this.X6o = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.condition());
    }
    return this.X6o;
  }
  get Actions() {
    if (!this.L_h) {
      this.L_h = true;
      this.A_h = new Array();
      var i = this.FbDataInternal.actionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var n = this.FbDataInternal.actions(t, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(n));
        }
      }
    }
    return this.A_h;
  }
  get SendSelfEvent() {
    if (!this.XYh) {
      this.XYh = true;
      this.YYh = this.FbDataInternal.sendSelfEvent();
    }
    return this.YYh;
  }
}
exports.FbClientConditionListener = FbClientConditionListener;
//# sourceMappingURL=FbClientConditionListener.js.map