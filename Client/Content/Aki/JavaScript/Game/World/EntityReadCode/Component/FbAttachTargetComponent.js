"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAttachTargetComponent = undefined;
const UnionAttachTargetHelper_1 = require("./UnionAttachTargetHelper");
class FbAttachTargetComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.S7h = false;
    this.M7h = undefined;
    this.E7h = false;
    this.I7h = undefined;
    this.T7h = false;
    this.b7h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbAttachTargetComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get AttachTarget() {
    var t;
    var e;
    if (!this.S7h && (this.S7h = true, t = this.FbDataInternal.attachTargetType(), e = UnionAttachTargetHelper_1.UnionAttachTargetHelper.GetUnionAttachTargetObject(t))) {
      this.M7h = UnionAttachTargetHelper_1.UnionAttachTargetHelper.ReadUnionAttachTarget(t, this.FbDataInternal.attachTarget(e));
    }
    return this.M7h;
  }
  get PosRule() {
    if (!this.E7h) {
      this.E7h = true;
      this.I7h = this.FbDataInternal.posRule();
    }
    return this.I7h;
  }
  get RotRule() {
    if (!this.T7h) {
      this.T7h = true;
      this.b7h = this.FbDataInternal.rotRule();
    }
    return this.b7h;
  }
}
exports.FbAttachTargetComponent = FbAttachTargetComponent;
//# sourceMappingURL=FbAttachTargetComponent.js.map