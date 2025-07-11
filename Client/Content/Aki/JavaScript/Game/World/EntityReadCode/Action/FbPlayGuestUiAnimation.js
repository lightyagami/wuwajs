"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPlayGuestUiAnimation = undefined;
const UnionPlayGuestUiAnimationTypeHelper_1 = require("./UnionPlayGuestUiAnimationTypeHelper");
class FbPlayGuestUiAnimation {
  constructor(i) {
    this.FbDataInternal = i;
    this.u_h = false;
    this.f8o = undefined;
    this.f2c = false;
    this.g2c = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbPlayGuestUiAnimation(i);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get PlayGuestUiAnimation() {
    var i;
    var t;
    if (!this.f2c && (this.f2c = true, i = this.FbDataInternal.playGuestUiAnimationType(), t = UnionPlayGuestUiAnimationTypeHelper_1.UnionPlayGuestUiAnimationTypeHelper.GetUnionPlayGuestUiAnimationTypeObject(i))) {
      this.g2c = UnionPlayGuestUiAnimationTypeHelper_1.UnionPlayGuestUiAnimationTypeHelper.ReadUnionPlayGuestUiAnimationType(i, this.FbDataInternal.playGuestUiAnimation(t));
    }
    return this.g2c;
  }
}
exports.FbPlayGuestUiAnimation = FbPlayGuestUiAnimation;
//# sourceMappingURL=FbPlayGuestUiAnimation.js.map