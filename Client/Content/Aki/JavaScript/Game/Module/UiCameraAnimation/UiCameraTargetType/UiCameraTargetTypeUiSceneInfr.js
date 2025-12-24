"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCameraTargetTypeUiSceneInfr = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiCameraTargetTypeBase_1 = require("./UiCameraTargetTypeBase");
class UiCameraTargetTypeUiSceneInfr extends UiCameraTargetTypeBase_1.UiCameraTargetTypeBase {
  GetTargetActor() {}
  GetTargetBodyKey() {
    var e = ConfigManager_1.ConfigManager.InfrastructureConfig.GetRoadConfigById(ModelManager_1.ModelManager.InfrastructureModel.InteractingRoadId);
    if (e) {
      return e.BodyCameraSettingsName;
    }
  }
  GetTargetSkeletalMesh() {}
}
exports.UiCameraTargetTypeUiSceneInfr = UiCameraTargetTypeUiSceneInfr;
//# sourceMappingURL=UiCameraTargetTypeUiSceneInfr.js.map