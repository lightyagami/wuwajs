"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionAdjustPlayerCameraOptionHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbAdjustAxisLockCamera_1 = require("./FbAdjustAxisLockCamera");
const FbAdjustBasicCamera_1 = require("./FbAdjustBasicCamera");
const FbAdjustDialogCamera_1 = require("./FbAdjustDialogCamera");
const FbAdjustFirstPersonCamera_1 = require("./FbAdjustFirstPersonCamera");
const FbAdjustFixedCamera_1 = require("./FbAdjustFixedCamera");
const FbAdjustHorizontalCamera_1 = require("./FbAdjustHorizontalCamera");
class UnionAdjustPlayerCameraOptionHelper {
  static GetUnionAdjustPlayerCameraOptionObject(a) {
    switch (a) {
      case fb_action_1.UnionAdjustPlayerCameraOption.AdjustAxisLockCamera:
        return new fb_action_1.AdjustAxisLockCamera();
      case fb_action_1.UnionAdjustPlayerCameraOption.AdjustBasicCamera:
        return new fb_action_1.AdjustBasicCamera();
      case fb_action_1.UnionAdjustPlayerCameraOption.AdjustDialogCamera:
        return new fb_action_1.AdjustDialogCamera();
      case fb_action_1.UnionAdjustPlayerCameraOption.AdjustFirstPersonCamera:
        return new fb_action_1.AdjustFirstPersonCamera();
      case fb_action_1.UnionAdjustPlayerCameraOption.AdjustFixedCamera:
        return new fb_action_1.AdjustFixedCamera();
      case fb_action_1.UnionAdjustPlayerCameraOption.AdjustHorizontalCamera:
        return new fb_action_1.AdjustHorizontalCamera();
      default:
        return;
    }
  }
  static ReadUnionAdjustPlayerCameraOption(a, e) {
    if (e !== undefined) {
      switch (a) {
        case fb_action_1.UnionAdjustPlayerCameraOption.AdjustAxisLockCamera:
          return FbAdjustAxisLockCamera_1.FbAdjustAxisLockCamera.Create(e);
        case fb_action_1.UnionAdjustPlayerCameraOption.AdjustBasicCamera:
          return FbAdjustBasicCamera_1.FbAdjustBasicCamera.Create(e);
        case fb_action_1.UnionAdjustPlayerCameraOption.AdjustDialogCamera:
          return FbAdjustDialogCamera_1.FbAdjustDialogCamera.Create(e);
        case fb_action_1.UnionAdjustPlayerCameraOption.AdjustFirstPersonCamera:
          return FbAdjustFirstPersonCamera_1.FbAdjustFirstPersonCamera.Create(e);
        case fb_action_1.UnionAdjustPlayerCameraOption.AdjustFixedCamera:
          return FbAdjustFixedCamera_1.FbAdjustFixedCamera.Create(e);
        case fb_action_1.UnionAdjustPlayerCameraOption.AdjustHorizontalCamera:
          return FbAdjustHorizontalCamera_1.FbAdjustHorizontalCamera.Create(e);
        default:
          return;
      }
    }
  }
}
exports.UnionAdjustPlayerCameraOptionHelper = UnionAdjustPlayerCameraOptionHelper;
//# sourceMappingURL=UnionAdjustPlayerCameraOptionHelper.js.map