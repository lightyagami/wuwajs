"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTrampleComponent = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("../Action/FbActionInfo");
const FbEnterLeaveRadius_1 = require("../Common/FbEnterLeaveRadius");
const FbEntityMatch_1 = require("./FbEntityMatch");
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
const UnionMatchRoleOptionHelper_1 = require("../Match/UnionMatchRoleOptionHelper");
class FbTrampleComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.f_h = false;
    this.X6o = undefined;
    this.Ukh = false;
    this.Dkh = undefined;
    this.qDh = false;
    this.PAe = undefined;
    this.QVh = false;
    this.KVh = 0;
    this.gch = false;
    this.fch = 0;
    this.$Vh = false;
    this.XVh = false;
    this.YVh = false;
    this.zVh = undefined;
    this.JVh = false;
    this.ZVh = false;
    this.e4h = false;
    this.t4h = undefined;
    this.i4h = false;
    this.r4h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTrampleComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get Condition() {
    if (!this.f_h) {
      this.f_h = true;
      this.X6o = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.condition());
    }
    return this.X6o;
  }
  get Match() {
    if (!this.Ukh) {
      this.Ukh = true;
      this.Dkh = FbEntityMatch_1.FbEntityMatch.Create(this.FbDataInternal.match());
    }
    return this.Dkh;
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
  get DownTime() {
    if (!this.QVh) {
      this.QVh = true;
      this.KVh = this.FbDataInternal.downTime();
    }
    return this.KVh;
  }
  get StayTime() {
    if (!this.gch) {
      this.gch = true;
      this.fch = this.FbDataInternal.stayTime();
    }
    return this.fch;
  }
  get IsResetGear() {
    if (!this.$Vh) {
      this.$Vh = true;
      this.XVh = this.FbDataInternal.isResetGear();
    }
    return this.XVh;
  }
  get ShowLandTipRadius() {
    if (!this.YVh) {
      this.YVh = true;
      this.zVh = FbEnterLeaveRadius_1.FbEnterLeaveRadius.Create(this.FbDataInternal.showLandTipRadius());
    }
    return this.zVh;
  }
  get StopTeleControlMove() {
    if (!this.JVh) {
      this.JVh = true;
      this.ZVh = this.FbDataInternal.stopTeleControlMove();
    }
    return this.ZVh;
  }
  get EnterActions() {
    if (!this.e4h) {
      this.e4h = true;
      this.t4h = new Array();
      var i = this.FbDataInternal.enterActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.enterActions(t, new fb_action_1.ActionInfo());
          this.t4h.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
      }
    }
    return this.t4h;
  }
  get ExitActions() {
    if (!this.i4h) {
      this.i4h = true;
      this.r4h = new Array();
      var i = this.FbDataInternal.exitActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.exitActions(t, new fb_action_1.ActionInfo());
          this.r4h.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
      }
    }
    return this.r4h;
  }
}
exports.FbTrampleComponent = FbTrampleComponent;
//# sourceMappingURL=FbTrampleComponent.js.map