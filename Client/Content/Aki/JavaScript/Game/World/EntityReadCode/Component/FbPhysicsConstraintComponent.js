"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPhysicsConstraintComponent = undefined;
const UnionPhysicsAttachTargetHelper_1 = require("./UnionPhysicsAttachTargetHelper");
const FbPhysicsAngularLimit_1 = require("../Physics/FbPhysicsAngularLimit");
class FbPhysicsConstraintComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.xEh = false;
    this.REh = undefined;
    this.S7h = false;
    this.M7h = undefined;
    this.o$h = false;
    this.n$h = undefined;
    this.H7_ = false;
    this.$7_ = 0;
  }
  static Create(t) {
    if (t) {
      return new FbPhysicsConstraintComponent(t);
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
  get AttachTarget() {
    var t;
    var i;
    if (!this.S7h && (this.S7h = true, t = this.FbDataInternal.attachTargetType(), i = UnionPhysicsAttachTargetHelper_1.UnionPhysicsAttachTargetHelper.GetUnionPhysicsAttachTargetObject(t))) {
      this.M7h = UnionPhysicsAttachTargetHelper_1.UnionPhysicsAttachTargetHelper.ReadUnionPhysicsAttachTarget(t, this.FbDataInternal.attachTarget(i));
    }
    return this.M7h;
  }
  get AngularLimit() {
    if (!this.o$h) {
      this.o$h = true;
      this.n$h = FbPhysicsAngularLimit_1.FbPhysicsAngularLimit.Create(this.FbDataInternal.angularLimit());
    }
    return this.n$h;
  }
  get DampingCoefficient() {
    if (!this.H7_) {
      this.H7_ = true;
      this.$7_ = this.FbDataInternal.dampingCoefficient();
    }
    return this.$7_;
  }
}
exports.FbPhysicsConstraintComponent = FbPhysicsConstraintComponent;
//# sourceMappingURL=FbPhysicsConstraintComponent.js.map