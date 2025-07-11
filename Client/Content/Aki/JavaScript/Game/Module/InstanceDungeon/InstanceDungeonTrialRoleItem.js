"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonTrialRoleItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class InstanceDungeonTrialRoleItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super();
    this.dFe = 0;
    this.dFe = t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UITexture], [2, UE.UIItem], [7, UE.UIExtendToggle]];
  }
  OnStart() {
    this.GetExtendToggle(7).CanExecuteChange.Bind(() => false);
    this.GetExtendToggle(7).IsSelfInteractive = false;
    this.GetItem(2)?.SetUIActive(false);
    this.Q1i();
  }
  OnBeforeDestroy() {
    this.dFe = 0;
  }
  SetRoleId(e) {
    this.dFe = e;
    this.Q1i();
  }
  Q1i() {
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.dFe);
    this.SetRoleIcon(e?.RoleHeadIcon ?? "", this.GetTexture(1), this.dFe);
  }
}
exports.InstanceDungeonTrialRoleItem = InstanceDungeonTrialRoleItem;
//# sourceMappingURL=InstanceDungeonTrialRoleItem.js.map