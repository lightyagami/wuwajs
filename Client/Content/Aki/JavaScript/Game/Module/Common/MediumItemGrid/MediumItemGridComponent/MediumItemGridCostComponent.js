"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridCostComponent = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const TowerData_1 = require("../../../TowerDetailUi/TowerData");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridCostComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  constructor() {
    super(...arguments);
    this.Mwt = undefined;
    this.Ewt = undefined;
  }
  GetResourceId() {
    return "UiItem_ItemEnergy";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem]];
  }
  OnActivate() {
    this.Mwt = UE.Color.FromHex(TowerData_1.HIGH_COLOR);
    this.Ewt = UE.Color.FromHex(TowerData_1.LOW_COLOR);
  }
  OnRefresh(e) {
    var e = ModelManager_1.ModelManager.TowerModel.GetRoleRemainCost(e, ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties);
    var t = this.GetText(0);
    t.SetText("" + e);
    var e = e >= TowerData_1.HIGH_COST;
    t.SetColor(e ? this.Mwt : this.Ewt);
    this.GetItem(1).SetColor(e ? this.Mwt : this.Ewt);
    this.SetActive(true);
  }
}
exports.MediumItemGridCostComponent = MediumItemGridCostComponent;
//# sourceMappingURL=MediumItemGridCostComponent.js.map