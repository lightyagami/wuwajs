"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCameraTargetTypeSailDock = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiCameraTargetTypeBase_1 = require("./UiCameraTargetTypeBase");
class UiCameraTargetTypeSailDock extends UiCameraTargetTypeBase_1.UiCameraTargetTypeBase {
  GetTargetActor() {}
  GetTargetBodyKey() {
    var e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingPortConfig(ModelManager_1.ModelManager.FishingModel.DockId)?.SailingPoint;
    if (e) {
      switch (e) {
        case 1:
          return "FishingShipOne";
        case 2:
          return "FishingShipTwo";
        case 3:
          return "FishingShipThree";
        case 4:
          return "FishingShipFour";
        default:
          return;
      }
    }
  }
  GetTargetSkeletalMesh() {}
}
exports.UiCameraTargetTypeSailDock = UiCameraTargetTypeSailDock;
//# sourceMappingURL=UiCameraTargetTypeSailDock.js.map