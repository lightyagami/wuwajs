"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionLevelSequenceTransitionHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbCameraTransition_1 = require("./FbCameraTransition");
const FbMaskTransition_1 = require("./FbMaskTransition");
class UnionLevelSequenceTransitionHelper {
  static GetUnionLevelSequenceTransitionObject(e) {
    switch (e) {
      case fb_action_1.UnionLevelSequenceTransition.CameraTransition:
        return new fb_action_1.CameraTransition();
      case fb_action_1.UnionLevelSequenceTransition.MaskTransition:
        return new fb_action_1.MaskTransition();
      default:
        return;
    }
  }
  static ReadUnionLevelSequenceTransition(e, n) {
    if (n !== undefined) {
      switch (e) {
        case fb_action_1.UnionLevelSequenceTransition.CameraTransition:
          return FbCameraTransition_1.FbCameraTransition.Create(n);
        case fb_action_1.UnionLevelSequenceTransition.MaskTransition:
          return FbMaskTransition_1.FbMaskTransition.Create(n);
        default:
          return;
      }
    }
  }
}
exports.UnionLevelSequenceTransitionHelper = UnionLevelSequenceTransitionHelper;
//# sourceMappingURL=UnionLevelSequenceTransitionHelper.js.map