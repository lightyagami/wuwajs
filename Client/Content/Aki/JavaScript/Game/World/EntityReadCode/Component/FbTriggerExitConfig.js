"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTriggerExitConfig = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("../Action/FbActionInfo");
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbTriggerExitConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.Zkh = false;
    this.eGh = 0;
    this.vkh = false;
    this.ykh = 0;
    this.f_h = false;
    this.X6o = undefined;
    this.Bkh = false;
    this.qkh = 0;
    this.tGh = false;
    this.iGh = false;
    this.L_h = false;
    this.A_h = undefined;
    this.rGh = false;
    this.oGh = false;
  }
  static Create(t) {
    if (t) {
      return new FbTriggerExitConfig(t);
    }
  }
  get ExtraRange() {
    if (!this.Zkh) {
      this.Zkh = true;
      this.eGh = this.FbDataInternal.extraRange();
    }
    return this.eGh;
  }
  get MaxTriggerTimes() {
    if (!this.vkh) {
      this.vkh = true;
      this.ykh = this.FbDataInternal.maxTriggerTimes();
    }
    return this.ykh;
  }
  get Condition() {
    if (!this.f_h) {
      this.f_h = true;
      this.X6o = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.condition());
    }
    return this.X6o;
  }
  get MatchTypeCount() {
    if (!this.Bkh) {
      this.Bkh = true;
      this.qkh = this.FbDataInternal.matchTypeCount();
    }
    return this.qkh;
  }
  get ExitByNotEnterCondition() {
    if (!this.tGh) {
      this.tGh = true;
      this.iGh = this.FbDataInternal.exitByNotEnterCondition();
    }
    return this.iGh;
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
  get DisableExecuteActionsWhenDestroy() {
    if (!this.rGh) {
      this.rGh = true;
      this.oGh = this.FbDataInternal.disableExecuteActionsWhenDestroy();
    }
    return this.oGh;
  }
}
exports.FbTriggerExitConfig = FbTriggerExitConfig;
//# sourceMappingURL=FbTriggerExitConfig.js.map