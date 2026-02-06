"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCameraTargetTypeUiSceneActor = undefined;
const UE = require("ue");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const UiCameraTargetTypeBase_1 = require("./UiCameraTargetTypeBase");
class UiCameraTargetTypeUiSceneActor extends UiCameraTargetTypeBase_1.UiCameraTargetTypeBase {
  GetTargetActor(e) {
    return UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName(e.TargetActorTag), 1);
  }
  GetTargetBodyKey() {}
  GetTargetSkeletalMesh() {}
}
exports.UiCameraTargetTypeUiSceneActor = UiCameraTargetTypeUiSceneActor;
//# sourceMappingURL=UiCameraTargetTypeUiSceneActor.js.map