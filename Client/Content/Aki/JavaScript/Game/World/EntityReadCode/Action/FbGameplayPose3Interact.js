"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbGameplayPose3Interact = undefined;
class FbGameplayPose3Interact {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbGameplayPose3Interact(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
}
exports.FbGameplayPose3Interact = FbGameplayPose3Interact;
//# sourceMappingURL=FbGameplayPose3Interact.js.map