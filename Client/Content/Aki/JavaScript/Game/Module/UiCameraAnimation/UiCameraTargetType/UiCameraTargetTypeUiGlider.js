"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCameraTargetTypeUiGlider = undefined;
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const UiCameraTargetTypeBase_1 = require("./UiCameraTargetTypeBase");
class UiCameraTargetTypeUiGlider extends UiCameraTargetTypeBase_1.UiCameraTargetTypeBase {
  GetTargetActor() {
    return UiSceneManager_1.UiSceneManager.GetGliderSkeletalHandle()?.Model?.CheckGetComponent(1)?.Actor;
  }
  GetTargetBodyKey() {}
  GetTargetSkeletalMesh() {
    return UiSceneManager_1.UiSceneManager.GetGliderSkeletalHandle()?.Model?.CheckGetComponent(1)?.MainMeshComponent;
  }
}
exports.UiCameraTargetTypeUiGlider = UiCameraTargetTypeUiGlider;
//# sourceMappingURL=UiCameraTargetTypeUiGlider.js.map