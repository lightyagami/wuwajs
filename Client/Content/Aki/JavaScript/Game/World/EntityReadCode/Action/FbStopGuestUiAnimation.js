"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbStopGuestUiAnimation = undefined;
const UnionStopGuestUiAnimationTypeHelper_1 = require("./UnionStopGuestUiAnimationTypeHelper");
class FbStopGuestUiAnimation {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.C2c = false;
    this.p2c = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbStopGuestUiAnimation(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get StopGuestUiAnimation() {
    var t;
    var i;
    if (!this.C2c && (this.C2c = true, t = this.FbDataInternal.stopGuestUiAnimationType(), i = UnionStopGuestUiAnimationTypeHelper_1.UnionStopGuestUiAnimationTypeHelper.GetUnionStopGuestUiAnimationTypeObject(t))) {
      this.p2c = UnionStopGuestUiAnimationTypeHelper_1.UnionStopGuestUiAnimationTypeHelper.ReadUnionStopGuestUiAnimationType(t, this.FbDataInternal.stopGuestUiAnimation(i));
    }
    return this.p2c;
  }
}
exports.FbStopGuestUiAnimation = FbStopGuestUiAnimation;
//# sourceMappingURL=FbStopGuestUiAnimation.js.map