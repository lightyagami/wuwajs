"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBeamCastComponent = undefined;
const FbCylinderTriggerShape_1 = require("../Shape/FbCylinderTriggerShape");
class FbBeamCastComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.xEh = false;
    this.REh = undefined;
    this.w5l = false;
    this.P5l = false;
    this.gQh = false;
    this.fQh = undefined;
    this.M_h = false;
    this.E_h = undefined;
    this.IOh = false;
    this.TOh = undefined;
    this.QP_ = false;
    this.KP_ = false;
  }
  static Create(t) {
    if (t) {
      return new FbBeamCastComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get EffectPath() {
    if (!this.xEh) {
      this.xEh = true;
      this.REh = this.FbDataInternal.effectPath();
    }
    return this.REh;
  }
  get DelayDestroyEffect() {
    if (!this.w5l) {
      this.w5l = true;
      this.P5l = this.FbDataInternal.delayDestroyEffect();
    }
    return this.P5l;
  }
  get HitEffectPath() {
    if (!this.gQh) {
      this.gQh = true;
      this.fQh = this.FbDataInternal.hitEffectPath();
    }
    return this.fQh;
  }
  get Range() {
    if (!this.M_h) {
      this.M_h = true;
      this.E_h = FbCylinderTriggerShape_1.FbCylinderTriggerShape.Create(this.FbDataInternal.range());
    }
    return this.E_h;
  }
  get TargetState() {
    if (!this.IOh) {
      this.IOh = true;
      this.TOh = this.FbDataInternal.targetState();
    }
    return this.TOh;
  }
  get IgnoreMonsterCollision() {
    if (!this.QP_) {
      this.QP_ = true;
      this.KP_ = this.FbDataInternal.ignoreMonsterCollision();
    }
    return this.KP_;
  }
}
exports.FbBeamCastComponent = FbBeamCastComponent;
//# sourceMappingURL=FbBeamCastComponent.js.map