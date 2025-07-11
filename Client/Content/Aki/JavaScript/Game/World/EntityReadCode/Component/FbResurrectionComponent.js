"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbResurrectionComponent = undefined;
const FbPosA_1 = require("../Action/FbPosA");
const FbGravityFlipTeleportConfig_1 = require("./FbGravityFlipTeleportConfig");
const UnionTriggerShapeHelper_1 = require("../Shape/UnionTriggerShapeHelper");
class FbResurrectionComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.VVh = false;
    this.jVh = undefined;
    this.y5h = false;
    this.S5h = undefined;
    this.m0h = false;
    this.C0h = undefined;
    this.yPh = false;
    this.SPh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbResurrectionComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get TeleportPos() {
    if (!this.VVh) {
      this.VVh = true;
      this.jVh = FbPosA_1.FbPosA.Create(this.FbDataInternal.teleportPos());
    }
    return this.jVh;
  }
  get TriggerShape() {
    var t;
    var i;
    if (!this.y5h && (this.y5h = true, t = this.FbDataInternal.triggerShapeType(), i = UnionTriggerShapeHelper_1.UnionTriggerShapeHelper.GetUnionTriggerShapeObject(t))) {
      this.S5h = UnionTriggerShapeHelper_1.UnionTriggerShapeHelper.ReadUnionTriggerShape(t, this.FbDataInternal.triggerShape(i));
    }
    return this.S5h;
  }
  get ReviveId() {
    if (!this.m0h) {
      this.m0h = true;
      this.C0h = this.FbDataInternal.reviveId();
    }
    return this.C0h;
  }
  get GravityConfig() {
    if (!this.yPh) {
      this.yPh = true;
      this.SPh = FbGravityFlipTeleportConfig_1.FbGravityFlipTeleportConfig.Create(this.FbDataInternal.gravityConfig());
    }
    return this.SPh;
  }
}
exports.FbResurrectionComponent = FbResurrectionComponent;
//# sourceMappingURL=FbResurrectionComponent.js.map