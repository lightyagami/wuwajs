"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbHookLockPoint = undefined;
const FbCameraGaze_1 = require("../Action/FbCameraGaze");
const FbGazeNextPointAfterInteract_1 = require("./FbGazeNextPointAfterInteract");
const UnionHookInteractConfigHelper_1 = require("./UnionHookInteractConfigHelper");
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
const UnionMatchRoleOptionHelper_1 = require("../Match/UnionMatchRoleOptionHelper");
const FbSphereTriggerShape_1 = require("../Shape/FbSphereTriggerShape");
class FbHookLockPoint {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.M_h = false;
    this.E_h = undefined;
    this.qDh = false;
    this.PAe = undefined;
    this.EP_ = false;
    this.IP_ = false;
    this.nGh = false;
    this.sGh = false;
    this.aGh = false;
    this.hGh = undefined;
    this.lGh = false;
    this._Gh = undefined;
    this.cGh = false;
    this.uGh = false;
    this.dGh = false;
    this.mGh = undefined;
    this.CGh = false;
    this.gGh = false;
    this.fGh = false;
    this.pGh = 0;
    this.W__ = false;
    this.Q__ = undefined;
    this.vGh = false;
    this.yGh = 0;
    this.SGh = false;
    this.MGh = false;
    this.EGh = false;
    this.IGh = false;
    this.TGh = false;
    this.bGh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbHookLockPoint(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get Range() {
    if (!this.M_h) {
      this.M_h = true;
      this.E_h = FbSphereTriggerShape_1.FbSphereTriggerShape.Create(this.FbDataInternal.range());
    }
    return this.E_h;
  }
  get MatchRoleOption() {
    if (!this.qDh) {
      this.qDh = true;
      this.PAe = new Array();
      var i = this.FbDataInternal.matchRoleOptionLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.matchRoleOptionType(t);
          var s = UnionMatchRoleOptionHelper_1.UnionMatchRoleOptionHelper.GetUnionMatchRoleOptionObject(e);
          if (s && (e = UnionMatchRoleOptionHelper_1.UnionMatchRoleOptionHelper.ReadUnionMatchRoleOption(e, this.FbDataInternal.matchRoleOption(t, s))) !== undefined) {
            this.PAe.push(e);
          }
        }
      }
    }
    return this.PAe;
  }
  get IgnorePlayCollision() {
    if (!this.EP_) {
      this.EP_ = true;
      this.IP_ = this.FbDataInternal.ignorePlayCollision();
    }
    return this.IP_;
  }
  get UseRangeComponent() {
    if (!this.nGh) {
      this.nGh = true;
      this.sGh = this.FbDataInternal.useRangeComponent();
    }
    return this.sGh;
  }
  get CameraGaze() {
    if (!this.aGh) {
      this.aGh = true;
      this.hGh = FbCameraGaze_1.FbCameraGaze.Create(this.FbDataInternal.cameraGaze());
    }
    return this.hGh;
  }
  get GazeNextPointAfterInteract() {
    if (!this.lGh) {
      this.lGh = true;
      this._Gh = FbGazeNextPointAfterInteract_1.FbGazeNextPointAfterInteract.Create(this.FbDataInternal.gazeNextPointAfterInteract());
    }
    return this._Gh;
  }
  get InheritSpeed() {
    if (!this.cGh) {
      this.cGh = true;
      this.uGh = this.FbDataInternal.inheritSpeed();
    }
    return this.uGh;
  }
  get NormalEffect() {
    if (!this.dGh) {
      this.dGh = true;
      this.mGh = this.FbDataInternal.normalEffect();
    }
    return this.mGh;
  }
  get IsClimb() {
    if (!this.CGh) {
      this.CGh = true;
      this.gGh = this.FbDataInternal.isClimb();
    }
    return this.gGh;
  }
  get PlayerStateRestritionId() {
    if (!this.fGh) {
      this.fGh = true;
      this.pGh = this.FbDataInternal.playerStateRestritionId();
    }
    return this.pGh;
  }
  get HookEnableCondition() {
    if (!this.W__) {
      this.W__ = true;
      this.Q__ = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.hookEnableCondition());
    }
    return this.Q__;
  }
  get HookLockCd() {
    if (!this.vGh) {
      this.vGh = true;
      this.yGh = this.FbDataInternal.hookLockCd();
    }
    return this.yGh;
  }
  get IsDestroyedSelf() {
    if (!this.SGh) {
      this.SGh = true;
      this.MGh = this.FbDataInternal.isDestroyedSelf();
    }
    return this.MGh;
  }
  get IsHideSelf() {
    if (!this.EGh) {
      this.EGh = true;
      this.IGh = this.FbDataInternal.isHideSelf();
    }
    return this.IGh;
  }
  get HookInteractConfig() {
    var t;
    var i;
    if (!this.TGh && (this.TGh = true, t = this.FbDataInternal.hookInteractConfigType(), i = UnionHookInteractConfigHelper_1.UnionHookInteractConfigHelper.GetUnionHookInteractConfigObject(t))) {
      this.bGh = UnionHookInteractConfigHelper_1.UnionHookInteractConfigHelper.ReadUnionHookInteractConfig(t, this.FbDataInternal.hookInteractConfig(i));
    }
    return this.bGh;
  }
}
exports.FbHookLockPoint = FbHookLockPoint;
//# sourceMappingURL=FbHookLockPoint.js.map