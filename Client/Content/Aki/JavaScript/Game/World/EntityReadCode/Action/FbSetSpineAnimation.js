"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetSpineAnimation = undefined;
const UnionSetSpineAnimationHelper_1 = require("./UnionSetSpineAnimationHelper");
class FbSetSpineAnimation {
  constructor(i) {
    this.FbDataInternal = i;
    this.bSh = false;
    this.TAe = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbSetSpineAnimation(i);
    }
  }
  get Config() {
    var i;
    var e;
    if (!this.bSh && (this.bSh = true, i = this.FbDataInternal.configType(), e = UnionSetSpineAnimationHelper_1.UnionSetSpineAnimationHelper.GetUnionSetSpineAnimationObject(i))) {
      this.TAe = UnionSetSpineAnimationHelper_1.UnionSetSpineAnimationHelper.ReadUnionSetSpineAnimation(i, this.FbDataInternal.config(e));
    }
    return this.TAe;
  }
}
exports.FbSetSpineAnimation = FbSetSpineAnimation;
//# sourceMappingURL=FbSetSpineAnimation.js.map