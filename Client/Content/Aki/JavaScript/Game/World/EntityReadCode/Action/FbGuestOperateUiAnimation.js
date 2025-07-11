"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbGuestOperateUiAnimation = undefined;
const UnionGuestOperateUiAnimationHelper_1 = require("./UnionGuestOperateUiAnimationHelper");
class FbGuestOperateUiAnimation {
  constructor(t) {
    this.FbDataInternal = t;
    this.kOc = false;
    this.OOc = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbGuestOperateUiAnimation(t);
    }
  }
  get UiAnimationConfig() {
    var t;
    var e;
    if (!this.kOc && (this.kOc = true, t = this.FbDataInternal.uiAnimationConfigType(), e = UnionGuestOperateUiAnimationHelper_1.UnionGuestOperateUiAnimationHelper.GetUnionGuestOperateUiAnimationObject(t))) {
      this.OOc = UnionGuestOperateUiAnimationHelper_1.UnionGuestOperateUiAnimationHelper.ReadUnionGuestOperateUiAnimation(t, this.FbDataInternal.uiAnimationConfig(e));
    }
    return this.OOc;
  }
}
exports.FbGuestOperateUiAnimation = FbGuestOperateUiAnimation;
//# sourceMappingURL=FbGuestOperateUiAnimation.js.map