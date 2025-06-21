"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbGuestOperateUiAnimation = void 0;
const UnionGuestOperateUiAnimationHelper_1 = require("./UnionGuestOperateUiAnimationHelper");
class FbGuestOperateUiAnimation {
  constructor(t) {
    this.FbDataInternal = t, this.kOc = !1, this.OOc = void 0
  }
  static Create(t) {
    if (t) return new FbGuestOperateUiAnimation(t)
  }
  get UiAnimationConfig() {
    var t, e;
    return !this.kOc && (this.kOc = !0, t = this.FbDataInternal.uiAnimationConfigType(), e = UnionGuestOperateUiAnimationHelper_1.UnionGuestOperateUiAnimationHelper.GetUnionGuestOperateUiAnimationObject(t)) && (this.OOc = UnionGuestOperateUiAnimationHelper_1.UnionGuestOperateUiAnimationHelper.ReadUnionGuestOperateUiAnimation(t, this.FbDataInternal.uiAnimationConfig(e))), this.OOc
  }
}
exports.FbGuestOperateUiAnimation = FbGuestOperateUiAnimation;
//# sourceMappingURL=FbGuestOperateUiAnimation.js.map