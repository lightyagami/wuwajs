"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkinViewModel = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SkinViewModelBase_1 = require("../../SkinViewModelBase");
class RoleSkinViewModel extends SkinViewModelBase_1.ViewModelBase {
  constructor() {
    super();
    this.DataMap.set(0, 0);
    this.DataMap.set(1, false);
  }
  Init(e) {
    if (this.GetSelectRoleSkinId() <= 0) {
      e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e.RoleId);
      this.SetSelectRoleSkinId(e.GetRoleSkinId());
    }
  }
  SetSelectRoleSkinId(e, a) {
    this.SetData(0, e, a);
  }
  GetSelectRoleSkinId() {
    return this.GetData(0);
  }
  SetIsWearWeaponSkin(e, a) {
    this.SetData(1, e, a);
  }
  GetIsWearWeaponSkin() {
    return this.GetData(1);
  }
  GetRoleTabCameraInputData(e, a) {
    var n = this.GetIsWearWeaponSkin() ? ConfigManager_1.ConfigManager.PayShopConfig.GetBuySkinDetailWeaponCameraConfigId() : ConfigManager_1.ConfigManager.PayShopConfig.GetBuySkinDetailRoleCameraConfigId();
    var n = ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraConfig(n);
    var i = a.D_K2_GetActorLocation();
    var a = (a?.Model?.CheckGetComponent(13)).RoleConfigId;
    var a = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(a).RoleBody;
    return {
      DragComponent: e,
      CameraSettingConfig: n,
      CameraOffsetConfig: ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraOffsetConfig(a),
      SourceLocation: i
    };
  }
}
exports.RoleSkinViewModel = RoleSkinViewModel;
//# sourceMappingURL=RoleSkinViewModel.js.map