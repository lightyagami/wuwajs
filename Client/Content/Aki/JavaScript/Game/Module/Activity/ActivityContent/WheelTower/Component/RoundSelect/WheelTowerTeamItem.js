"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelTowerTeamItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const TowerData_1 = require("../../../../../TowerDetailUi/TowerData");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout");
class WheelTowerTeamItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Mrf = undefined;
    this.ClickCallback = undefined;
    this.eTt = () => {
      this.ClickCallback?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIHorizontalLayout], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.eTt]];
  }
  OnStart() {
    this.Mrf = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), () => new RoleItem());
  }
  Refresh(e) {
    this.Mrf?.RefreshByData(e);
    e = ModelManager_1.ModelManager.WheelTowerModel.CheckCurrentSelectConflict();
    let t = false;
    e.forEach(e => {
      if (ModelManager_1.ModelManager.WheelTowerModel.SelectedEnergyInfo.GetRoleEnergy(e.RoleId) > 0) {
        t = true;
      }
    });
    this.GetItem(3)?.SetUIActive(t);
  }
}
exports.WheelTowerTeamItem = WheelTowerTeamItem;
class RoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem]];
  }
  Refresh(e, t, r) {
    var i;
    var a;
    var s = e > 0;
    this.GetTexture(1)?.SetUIActive(s);
    this.GetItem(2)?.SetUIActive(s);
    this.GetText(3)?.SetUIActive(s);
    this.GetItem(4)?.SetUIActive(s);
    if (s) {
      e = (s = ModelManager_1.ModelManager.WheelTowerModel).TryGetRealRoleId(e);
      i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e).Card;
      this.SetTextureShowUntilLoaded(i, this.GetTexture(1));
      i = s.SelectedEnergyInfo.GetRoleEnergy(e);
      (a = this.GetText(3))?.SetText(i.toString());
      a?.SetChangeColor(i <= 0, TowerData_1.redColor);
      a = s.IsEnhanceRole(e);
      this.GetItem(4)?.SetUIActive(a);
    }
  }
}
//# sourceMappingURL=WheelTowerTeamItem.js.map