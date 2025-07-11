"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionSetSpineAnimationHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbPlaySpineAnimation_1 = require("./FbPlaySpineAnimation");
class UnionSetSpineAnimationHelper {
  static GetUnionSetSpineAnimationObject(i) {
    if (i === fb_action_1.UnionSetSpineAnimation.PlaySpineAnimation) {
      return new fb_action_1.PlaySpineAnimation();
    }
  }
  static ReadUnionSetSpineAnimation(i, n) {
    if (n !== undefined && i === fb_action_1.UnionSetSpineAnimation.PlaySpineAnimation) {
      return FbPlaySpineAnimation_1.FbPlaySpineAnimation.Create(n);
    } else {
      return undefined;
    }
  }
}
exports.UnionSetSpineAnimationHelper = UnionSetSpineAnimationHelper;
//# sourceMappingURL=UnionSetSpineAnimationHelper.js.map