"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleResonanceTabViewNew = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const RoleController_1 = require("../RoleController");
class RoleResonanceTabViewNew extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.d1o = undefined;
    this.aCo = undefined;
    this.Vdo = e => {
      this.aCo = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
      this.PlayMontageStart();
      this.FTt();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem]];
  }
  UnBindRedDot() {
    if (!this.aCo.IsTrialRole()) {
      RedDotController_1.RedDotController.UnBindRedDot("RoleResonanceTabHole");
    }
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleSystemChangeRole, this.Vdo);
  }
  OnStart() {
    this.d1o = this.OpenParam;
    if (this.d1o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Role", 58, "RoleViewAgent为空", ["界面名称", "RoleResonanceTabViewNew"]);
      }
    } else {
      this.aCo = this.d1o.GetCurSelectRoleData();
      this.PlayMontageStart();
    }
  }
  PlayMontageStart() {
    RoleController_1.RoleController.PlayRoleMontage(7);
  }
  OnBeforeShow() {
    this.FTt();
  }
  FTt() {
    var e = this.aCo.GetRoleConfig();
    var t = this.GetText(0);
    var e = ConfigManager_1.ConfigManager.RoleResonanceConfig.GetRoleResonanceList(e.ResonantChainGroupId);
    t.SetText(this.aCo.GetResonanceData().GetResonantChainGroupIndex() + "/" + e.length);
    this.GetItem(1).SetUIActive(!this.aCo.IsTrialRole());
    var e = UiManager_1.UiManager.IsViewShow("RoleHandBookRootView");
    if (e) {
      t.GetOwner().GetComponentByClass(UE.UIItem.StaticClass()).SetUIActive(false);
    }
  }
  OnBeforeHide() {
    this.UnBindRedDot();
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleSystemChangeRole, this.Vdo);
  }
}
exports.RoleResonanceTabViewNew = RoleResonanceTabViewNew;
//# sourceMappingURL=RoleResonanceTabViewNew.js.map