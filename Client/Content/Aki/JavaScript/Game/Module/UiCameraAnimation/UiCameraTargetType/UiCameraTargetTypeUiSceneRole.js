"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCameraTargetTypeUiSceneRole = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const UiCameraTargetTypeBase_1 = require("./UiCameraTargetTypeBase");
class UiCameraTargetTypeUiSceneRole extends UiCameraTargetTypeBase_1.UiCameraTargetTypeBase {
  GetTargetActor() {
    return UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
  }
  GetTargetBodyKey() {
    var e = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
    if (e) {
      var a = e.Model?.GetComponent(15);
      if (a) {
        a = a.GetCurrentMorphData();
        if (a) {
          return a.RoleBody;
        }
      }
      a = e.Model?.CheckGetComponent(13);
      e = a.RoleConfigId;
      a = a.RoleSkinId;
      e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
      if (e) {
        if (a <= 0) {
          return e.RoleBody;
        } else {
          return ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(a).GetRoleBody();
        }
      }
    }
  }
  GetTargetSkeletalMesh() {
    var e = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
    if (e) {
      return e.Model?.CheckGetComponent(1)?.MainMeshComponent;
    }
  }
}
exports.UiCameraTargetTypeUiSceneRole = UiCameraTargetTypeUiSceneRole;
//# sourceMappingURL=UiCameraTargetTypeUiSceneRole.js.map