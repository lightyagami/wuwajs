"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbStaticNoRenderPortal = undefined;
const UnionTeleportTransitionOptionHelper_1 = require("../Action/UnionTeleportTransitionOptionHelper");
const FbGravityFlipTeleportConfig_1 = require("./FbGravityFlipTeleportConfig");
const FbTeleportSceneEffect_1 = require("./FbTeleportSceneEffect");
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbStaticNoRenderPortal {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.DKh = false;
    this.BKh = undefined;
    this.HKh = false;
    this.WKh = 0;
    this.$Kh = false;
    this.XKh = undefined;
    this.YKh = false;
    this.zKh = undefined;
    this.f_h = false;
    this.X6o = undefined;
    this.yd_ = false;
    this.Sd_ = undefined;
    this.yPh = false;
    this.SPh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbStaticNoRenderPortal(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get PortalModel() {
    if (!this.DKh) {
      this.DKh = true;
      this.BKh = this.FbDataInternal.portalModel();
    }
    return this.BKh;
  }
  get LinkPortalEntityId() {
    if (!this.HKh) {
      this.HKh = true;
      this.WKh = this.FbDataInternal.linkPortalEntityId();
    }
    return this.WKh;
  }
  get TeleportSceneEffect() {
    if (!this.$Kh) {
      this.$Kh = true;
      this.XKh = FbTeleportSceneEffect_1.FbTeleportSceneEffect.Create(this.FbDataInternal.teleportSceneEffect());
    }
    return this.XKh;
  }
  get TeleportLoadingEffect() {
    var t;
    var i;
    if (!this.YKh && (this.YKh = true, t = this.FbDataInternal.teleportLoadingEffectType(), i = UnionTeleportTransitionOptionHelper_1.UnionTeleportTransitionOptionHelper.GetUnionTeleportTransitionOptionObject(t))) {
      this.zKh = UnionTeleportTransitionOptionHelper_1.UnionTeleportTransitionOptionHelper.ReadUnionTeleportTransitionOption(t, this.FbDataInternal.teleportLoadingEffect(i));
    }
    return this.zKh;
  }
  get Condition() {
    if (!this.f_h) {
      this.f_h = true;
      this.X6o = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.condition());
    }
    return this.X6o;
  }
  get TeleportToSelfPos() {
    if (!this.yd_) {
      this.yd_ = true;
      this.Sd_ = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.teleportToSelfPos());
    }
    return this.Sd_;
  }
  get GravityConfig() {
    if (!this.yPh) {
      this.yPh = true;
      this.SPh = FbGravityFlipTeleportConfig_1.FbGravityFlipTeleportConfig.Create(this.FbDataInternal.gravityConfig());
    }
    return this.SPh;
  }
}
exports.FbStaticNoRenderPortal = FbStaticNoRenderPortal;
//# sourceMappingURL=FbStaticNoRenderPortal.js.map