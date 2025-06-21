"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbPlayGuestUiAnimation = void 0;
const UnionPlayGuestUiAnimationTypeHelper_1 = require("./UnionPlayGuestUiAnimationTypeHelper");
class FbPlayGuestUiAnimation {
  constructor(i) {
    this.FbDataInternal = i, this.u_h = !1, this.f8o = void 0, this.f2c = !1, this.g2c = void 0
  }
  static Create(i) {
    if (i) return new FbPlayGuestUiAnimation(i)
  }
  get Type() {
    return this.u_h || (this.u_h = !0, this.f8o = this.FbDataInternal.type()), this.f8o
  }
  get PlayGuestUiAnimation() {
    var i, t;
    return !this.f2c && (this.f2c = !0, i = this.FbDataInternal.playGuestUiAnimationType(), t = UnionPlayGuestUiAnimationTypeHelper_1.UnionPlayGuestUiAnimationTypeHelper.GetUnionPlayGuestUiAnimationTypeObject(i)) && (this.g2c = UnionPlayGuestUiAnimationTypeHelper_1.UnionPlayGuestUiAnimationTypeHelper.ReadUnionPlayGuestUiAnimationType(i, this.FbDataInternal.playGuestUiAnimation(t))), this.g2c
  }
}
exports.FbPlayGuestUiAnimation = FbPlayGuestUiAnimation;
//# sourceMappingURL=FbPlayGuestUiAnimation.js.map