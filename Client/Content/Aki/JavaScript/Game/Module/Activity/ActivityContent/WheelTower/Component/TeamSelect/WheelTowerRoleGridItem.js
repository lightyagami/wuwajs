"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelTowerRoleGridItem = undefined;
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const TowerData_1 = require("../../../../../TowerDetailUi/TowerData");
const WheelTowerDefine_1 = require("../../WheelTowerDefine");
class WheelTowerRoleGridItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.dFe = 0;
    this.gtf = undefined;
  }
  OnStart() {
    this.BindOnCanExecuteChange(() => false);
  }
  OnRefresh(o, e, t) {
    if (o === 0) {
      const M = {
        Type: 6,
        IsClickable: false
      };
      this.Apply(M);
      this.SetSelected(false, true);
    } else {
      this.dFe = o;
      var r = ModelManager_1.ModelManager.WheelTowerModel.TryGetRealRoleId(o);
      var a = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(r);
      var i = ModelManager_1.ModelManager.WheelTowerModel.SelectedEnergyInfo.GetRoleEnergy(o);
      var l = ModelManager_1.ModelManager.WheelTowerModel.GetRoleSlot(o);
      var l = l === -1 ? undefined : l + 1;
      var s = ModelManager_1.ModelManager.WheelTowerModel.IsTemplateRole(o);
      var n = i <= 0;
      var d = !s && !n && ModelManager_1.ModelManager.WheelTowerModel.CheckConflict(o) !== undefined;
      let e = 0;
      e = s ? ConfigManager_1.ConfigManager.TrialRoleConfig.GetTrialRoleConfig(o)?.Level ?? WheelTowerDefine_1.TEMPLATE_ROLE_LEVEL : a.GetLevelData().GetLevel();
      const M = {
        Type: 2,
        Data: a,
        ItemConfigId: r,
        SkinId: a.GetRoleConfig().SkinId,
        BottomTextId: "Text_LevelShow_Text",
        BottomTextParameter: [e],
        ElementId: a.GetRoleConfig().ElementId,
        ShowCostData: {
          Cost: i,
          Color: i > 0 ? TowerData_1.highColor : TowerData_1.redColor
        },
        Index: l,
        IsDisable: n
      };
      this.SetUseFixedAsync(true);
      this.Apply(M);
      this.SetWarningTips(d);
      this.SetTemplateIcon(s);
      a = ModelManager_1.ModelManager.WheelTowerModel.IsEnhanceRole(r);
      this.SetUpgradeArrow(a);
      i = ModelManager_1.ModelManager.WheelTowerModel.IsSelectRole(o);
      this.GetItemGridExtendToggle().SetToggleStateForce(i ? 1 : 0, false);
    }
  }
  SetToggleClickCallback(e) {
    this.gtf = e;
  }
  OnExtendToggleClicked() {
    this.gtf?.(this.dFe);
  }
}
exports.WheelTowerRoleGridItem = WheelTowerRoleGridItem;
//# sourceMappingURL=WheelTowerRoleGridItem.js.map