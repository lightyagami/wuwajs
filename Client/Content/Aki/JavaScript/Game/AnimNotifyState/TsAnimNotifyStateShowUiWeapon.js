"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsUiSceneRoleActor_1 = require("../Module/UiComponent/TsUiSceneRoleActor");
const UiWeaponAnsContext_1 = require("../Module/UiModel/UiModelComponent/Common/UiModelAns/UiAnimNotifyStateContext/UiWeaponAnsContext");
class TsAnimNotifyStateShowUiWeapon extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.WeaponIndex = 0;
    this.ShowMaterialController = true;
    this.HideEffect = true;
    this.Transform = undefined;
    this.HangSocketName = undefined;
    this.UiWeaponAnsContext = undefined;
  }
  Constructor() {
    this.UiWeaponAnsContext = undefined;
  }
  K2_NotifyBegin(e, t, o) {
    e = e.GetOwner();
    if (e instanceof TsUiSceneRoleActor_1.default) {
      if (this.WeaponIndex >= 0) {
        this.UiWeaponAnsContext = new UiWeaponAnsContext_1.UiWeaponAnsContext(this.WeaponIndex, this.ShowMaterialController, this.HideEffect, this.Transform, this.HangSocketName);
        e.Model?.CheckGetComponent(6).AddAns("UiWeaponAnsContext", this.UiWeaponAnsContext);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 43, "UI武器显隐配置的索引不合法", ["index", this.WeaponIndex]);
      }
    }
    return false;
  }
  K2_NotifyEnd(e, t) {
    e = e.GetOwner();
    if (e instanceof TsUiSceneRoleActor_1.default) {
      if (this.WeaponIndex >= 0) {
        if (!this.UiWeaponAnsContext) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Weapon", 43, "TsAnimNotifyStateShowUiWeapon未成对，UiWeaponAnsContext为空");
          }
          return false;
        }
        e.Model?.CheckGetComponent(6).ReduceAns("UiWeaponAnsContext", this.UiWeaponAnsContext);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 43, "UI武器显隐配置的索引不合法", ["index", this.WeaponIndex]);
      }
    }
    return false;
  }
  GetNotifyName() {
    return "Ui界面武器显示";
  }
}
exports.default = TsAnimNotifyStateShowUiWeapon;
//# sourceMappingURL=TsAnimNotifyStateShowUiWeapon.js.map