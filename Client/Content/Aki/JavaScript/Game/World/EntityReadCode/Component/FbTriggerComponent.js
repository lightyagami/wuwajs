"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTriggerComponent = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("../Action/FbActionInfo");
const FbEntityMatch_1 = require("./FbEntityMatch");
const FbTriggerExitConfig_1 = require("./FbTriggerExitConfig");
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
const UnionMatchRoleOptionHelper_1 = require("../Match/UnionMatchRoleOptionHelper");
class FbTriggerComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.Ukh = false;
    this.Dkh = undefined;
    this.vkh = false;
    this.ykh = 0;
    this.Bkh = false;
    this.qkh = 0;
    this.f_h = false;
    this.X6o = undefined;
    this.L_h = false;
    this.A_h = undefined;
    this.kkh = false;
    this.Gkh = undefined;
    this.qDh = false;
    this.PAe = undefined;
    this.Okh = false;
    this.Fkh = false;
    this.Nkh = false;
    this.Vkh = false;
    this.jkh = false;
    this.Hkh = false;
    this.dD_ = false;
    this.mD_ = false;
  }
  static Create(t) {
    if (t) {
      return new FbTriggerComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get Match() {
    if (!this.Ukh) {
      this.Ukh = true;
      this.Dkh = FbEntityMatch_1.FbEntityMatch.Create(this.FbDataInternal.match());
    }
    return this.Dkh;
  }
  get MaxTriggerTimes() {
    if (!this.vkh) {
      this.vkh = true;
      this.ykh = this.FbDataInternal.maxTriggerTimes();
    }
    return this.ykh;
  }
  get MatchTypeCount() {
    if (!this.Bkh) {
      this.Bkh = true;
      this.qkh = this.FbDataInternal.matchTypeCount();
    }
    return this.qkh;
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
          var s = this.FbDataInternal.actions(t, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
      }
    }
    return this.A_h;
  }
  get ExitConfig() {
    if (!this.kkh) {
      this.kkh = true;
      this.Gkh = FbTriggerExitConfig_1.FbTriggerExitConfig.Create(this.FbDataInternal.exitConfig());
    }
    return this.Gkh;
  }
  get MatchRoleOption() {
    if (!this.qDh) {
      this.qDh = true;
      this.PAe = new Array();
      var i = this.FbDataInternal.matchRoleOptionLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.matchRoleOptionType(t);
          var h = UnionMatchRoleOptionHelper_1.UnionMatchRoleOptionHelper.GetUnionMatchRoleOptionObject(s);
          if (h && (s = UnionMatchRoleOptionHelper_1.UnionMatchRoleOptionHelper.ReadUnionMatchRoleOption(s, this.FbDataInternal.matchRoleOption(t, h))) !== undefined) {
            this.PAe.push(s);
          }
        }
      }
    }
    return this.PAe;
  }
  get ChangeRoleTrigger() {
    if (!this.Okh) {
      this.Okh = true;
      this.Fkh = this.FbDataInternal.changeRoleTrigger();
    }
    return this.Fkh;
  }
  get ClientPrePerformance() {
    if (!this.Nkh) {
      this.Nkh = true;
      this.Vkh = this.FbDataInternal.clientPrePerformance();
    }
    return this.Vkh;
  }
  get OnlineDisableTip() {
    if (!this.jkh) {
      this.jkh = true;
      this.Hkh = this.FbDataInternal.onlineDisableTip();
    }
    return this.Hkh;
  }
  get OnlineAutoExit() {
    if (!this.dD_) {
      this.dD_ = true;
      this.mD_ = this.FbDataInternal.onlineAutoExit();
    }
    return this.mD_;
  }
}
exports.FbTriggerComponent = FbTriggerComponent;
//# sourceMappingURL=FbTriggerComponent.js.map