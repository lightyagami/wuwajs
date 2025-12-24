"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiRoleUtils = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const EffectUtil_1 = require("../../Utils/EffectUtil");
const UiModelUtil_1 = require("../UiModel/UiModelUtil");
class UiRoleUtils {
  static PlayRoleChangeEffect(e) {
    var l;
    var o;
    if (e) {
      if (e = e.Model) {
        l = e.CheckGetComponent(5);
        o = EffectUtil_1.EffectUtil.GetEffectPath("ChangeRoleMaterialController");
        if (o = ResourceSystem_1.ResourceSystem.GetLoadedAsset(o, UE.PD_CharacterControllerData_C)) {
          l?.AddRenderingMaterialByData(o);
        }
        UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(e, "ChangeRoleEffect");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Role", 16, "PlayRoleChangeEffect roleActor is null");
    }
  }
  static PlayRoleLevelUpEffect(e) {
    if (e) {
      e = e.Model;
      UiModelUtil_1.UiModelUtil.SetRenderingMaterial(e, "RoleLevelUpMaterialController");
      UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(e, "RoleLevelUpEffect");
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Role", 16, "PlayRoleLevelUpEffect roleActor is null");
    }
  }
  static PlayRoleBreachFinishEffect(e) {
    if (e) {
      e = e.Model;
      UiModelUtil_1.UiModelUtil.SetRenderingMaterial(e, "RoleBreachFinishMaterialController");
      UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(e, "RoleBreachFinishEffect");
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Role", 16, "PlayRoleBreachFinishEffect roleActor is null");
    }
  }
}
exports.UiRoleUtils = UiRoleUtils;
//# sourceMappingURL=UiRoleUtils.js.map