"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionEnableSubLevelTransitionHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbEnableSubLevelTransitionWithSceneCapture_1 = require("./FbEnableSubLevelTransitionWithSceneCapture");
class UnionEnableSubLevelTransitionHelper {
  static GetUnionEnableSubLevelTransitionObject(e) {
    if (e === fb_action_1.UnionEnableSubLevelTransition.EnableSubLevelTransitionWithSceneCapture) {
      return new fb_action_1.EnableSubLevelTransitionWithSceneCapture();
    }
  }
  static ReadUnionEnableSubLevelTransition(e, n) {
    if (n !== undefined && e === fb_action_1.UnionEnableSubLevelTransition.EnableSubLevelTransitionWithSceneCapture) {
      return FbEnableSubLevelTransitionWithSceneCapture_1.FbEnableSubLevelTransitionWithSceneCapture.Create(n);
    } else {
      return undefined;
    }
  }
}
exports.UnionEnableSubLevelTransitionHelper = UnionEnableSubLevelTransitionHelper;
//# sourceMappingURL=UnionEnableSubLevelTransitionHelper.js.map