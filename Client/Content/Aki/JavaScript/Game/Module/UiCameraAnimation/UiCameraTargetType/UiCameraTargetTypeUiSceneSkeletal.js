"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCameraTargetTypeUiSceneSkeletal = undefined;
const SkeletalObserverManager_1 = require("../../SkeletalObserver/SkeletalObserverManager");
const UiCameraTargetTypeBase_1 = require("./UiCameraTargetTypeBase");
class UiCameraTargetTypeUiSceneSkeletal extends UiCameraTargetTypeBase_1.UiCameraTargetTypeBase {
  GetTargetActor() {
    return SkeletalObserverManager_1.SkeletalObserverManager.GetLastSkeletalObserver()?.Model?.CheckGetComponent(1)?.Actor;
  }
  GetTargetBodyKey() {}
  GetTargetSkeletalMesh() {
    return SkeletalObserverManager_1.SkeletalObserverManager.GetLastSkeletalObserver()?.Model?.CheckGetComponent(1)?.MainMeshComponent;
  }
}
exports.UiCameraTargetTypeUiSceneSkeletal = UiCameraTargetTypeUiSceneSkeletal;
//# sourceMappingURL=UiCameraTargetTypeUiSceneSkeletal.js.map