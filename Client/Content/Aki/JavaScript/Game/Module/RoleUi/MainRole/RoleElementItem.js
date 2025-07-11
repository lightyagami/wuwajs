"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleElementItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class RoleElementItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.d1o = undefined;
    this.C1o = undefined;
    this.OnToggleCallback = undefined;
    this.CanToggleChange = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIExtendToggle], [4, UE.UIItem]];
    this.BtnBindInfo = [[3, () => {
      this.OnToggleCallback?.(this.GridIndex);
    }]];
  }
  OnStart() {
    this.GetExtendToggle(3)?.CanExecuteChange.Bind(() => !this.CanToggleChange || this.CanToggleChange(this.GridIndex));
  }
  Update(t) {
    this.C1o = t;
    var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.C1o.Id).ElementId;
    var e = ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(t);
    this.GetText(2).ShowTextNew(e.Name);
    this.SetElementIcon("", this.GetTexture(1), t);
    this.SetTextureByPath(e.ElementChangeTexture, this.GetTexture(0));
    this.RefreshState();
  }
  Refresh(t, e, i) {
    this.C1o = t;
    this.Update(t);
  }
  RefreshState() {
    var t = this.C1o.Id;
    var t = this.d1o.GetCurSelectRoleId() === t;
    this.GetItem(4).SetUIActive(t);
  }
  OnSelected(t) {
    this.GetExtendToggle(3)?.SetToggleState(1);
  }
  OnDeselected(t) {
    this.GetExtendToggle(3)?.SetToggleState(0);
  }
  SetRoleViewAgent(t) {
    this.d1o = t;
  }
}
exports.RoleElementItem = RoleElementItem;
//# sourceMappingURL=RoleElementItem.js.map