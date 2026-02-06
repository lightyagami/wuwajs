"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCameraTargetTypePlayer = undefined;
const UE = require("ue");
const Global_1 = require("../../../Global");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiCameraTargetTypeBase_1 = require("./UiCameraTargetTypeBase");
class UiCameraTargetTypePlayer extends UiCameraTargetTypeBase_1.UiCameraTargetTypeBase {
  GetTargetActor() {
    return ControllerHolder_1.ControllerHolder.CharacterController.GetActor(ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity);
  }
  GetTargetBodyKey() {
    if (this.JXm()) {
      return "Motor";
    }
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
    if (e) {
      e = e.GetConfigId;
      e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
      if (e) {
        return e.RoleBody;
      }
    }
  }
  GetTargetSkeletalMesh() {
    var e = ControllerHolder_1.ControllerHolder.CharacterController.GetActor(ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity);
    if (e) {
      return e.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
    }
  }
  JXm() {
    var e = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    return !!e && !!(e = e.Entity.CheckGetComponent(242)) && !!e.VehicleEntity?.Valid && e.VehicleType === "Motorcycle";
  }
}
exports.UiCameraTargetTypePlayer = UiCameraTargetTypePlayer;
//# sourceMappingURL=UiCameraTargetTypePlayer.js.map