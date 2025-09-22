"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCameraTargetTypeUiSceneHulu = undefined;
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const UiCameraTargetTypeBase_1 = require("./UiCameraTargetTypeBase");
class UiCameraTargetTypeUiSceneHulu extends UiCameraTargetTypeBase_1.UiCameraTargetTypeBase {
  GetTargetActor() {
    return UiSceneManager_1.UiSceneManager.GetHuluObserver()?.Model?.CheckGetComponent(1)?.Actor;
  }
  GetTargetBodyKey() {}
  GetTargetSkeletalMesh() {
    return UiSceneManager_1.UiSceneManager.GetHuluObserver()?.Model?.CheckGetComponent(1)?.MainMeshComponent;
  }
}
exports.UiCameraTargetTypeUiSceneHulu = UiCameraTargetTypeUiSceneHulu;
//# sourceMappingURL=UiCameraTargetTypeUiSceneHulu.js.map