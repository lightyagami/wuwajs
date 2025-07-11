"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTriggeredConfig = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("../Action/FbActionInfo");
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbTriggeredConfig {
  constructor(i) {
    this.FbDataInternal = i;
    this.f_h = false;
    this.X6o = undefined;
    this.vkh = false;
    this.ykh = 0;
    this.L_h = false;
    this.A_h = undefined;
    this.jkh = false;
    this.Hkh = false;
  }
  static Create(i) {
    if (i) {
      return new FbTriggeredConfig(i);
    }
  }
  get Condition() {
    if (!this.f_h) {
      this.f_h = true;
      this.X6o = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.condition());
    }
    return this.X6o;
  }
  get MaxTriggerTimes() {
    if (!this.vkh) {
      this.vkh = true;
      this.ykh = this.FbDataInternal.maxTriggerTimes();
    }
    return this.ykh;
  }
  get Actions() {
    if (!this.L_h) {
      this.L_h = true;
      this.A_h = new Array();
      var t = this.FbDataInternal.actionsLength();
      if (t) {
        for (let i = 0; i < t; ++i) {
          var s = this.FbDataInternal.actions(i, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
      }
    }
    return this.A_h;
  }
  get OnlineDisableTip() {
    if (!this.jkh) {
      this.jkh = true;
      this.Hkh = this.FbDataInternal.onlineDisableTip();
    }
    return this.Hkh;
  }
}
exports.FbTriggeredConfig = FbTriggeredConfig;
//# sourceMappingURL=FbTriggeredConfig.js.map