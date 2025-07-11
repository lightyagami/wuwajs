"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbHitLogicChangeTargetState = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbConditionHitConfig_1 = require("./FbConditionHitConfig");
const FbConditionHitConfigWithBullet_1 = require("./FbConditionHitConfigWithBullet");
class FbHitLogicChangeTargetState {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.tK_ = false;
    this.iK_ = undefined;
    this.rK_ = false;
    this.oK_ = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbHitLogicChangeTargetState(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get TargetBulletHitConfigs() {
    if (!this.tK_) {
      this.tK_ = true;
      this.iK_ = new Array();
      var i = this.FbDataInternal.targetBulletHitConfigsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.targetBulletHitConfigs(t, new fb_component_1.ConditionHitConfigWithBullet());
          this.iK_.push(FbConditionHitConfigWithBullet_1.FbConditionHitConfigWithBullet.Create(e));
        }
      }
    }
    return this.iK_;
  }
  get OtherBulletsHitConfig() {
    if (!this.rK_) {
      this.rK_ = true;
      this.oK_ = new Array();
      var i = this.FbDataInternal.otherBulletsHitConfigLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.otherBulletsHitConfig(t, new fb_component_1.ConditionHitConfig());
          this.oK_.push(FbConditionHitConfig_1.FbConditionHitConfig.Create(e));
        }
      }
    }
    return this.oK_;
  }
}
exports.FbHitLogicChangeTargetState = FbHitLogicChangeTargetState;
//# sourceMappingURL=FbHitLogicChangeTargetState.js.map