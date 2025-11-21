"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCameraTargetTypeUiVisionHandBook = undefined;
const UE = require("ue");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const UiCameraTargetTypeBase_1 = require("./UiCameraTargetTypeBase");
class UiCameraTargetTypeUiVisionHandBook extends UiCameraTargetTypeBase_1.UiCameraTargetTypeBase {
  GetTargetActor() {
    return UiSceneManager_1.UiSceneManager.GetHandBookCaseActor();
  }
  GetTargetBodyKey() {}
  GetTargetSkeletalMesh() {
    var e = UiSceneManager_1.UiSceneManager.GetHandBookVision();
    if (e) {
      return e.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
    }
  }
}
exports.UiCameraTargetTypeUiVisionHandBook = UiCameraTargetTypeUiVisionHandBook;
//# sourceMappingURL=UiCameraTargetTypeUiVisionHandBook.js.map