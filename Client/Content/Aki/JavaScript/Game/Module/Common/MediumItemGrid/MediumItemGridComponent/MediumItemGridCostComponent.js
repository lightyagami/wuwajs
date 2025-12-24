"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridCostComponent = undefined;
const UE = require("ue");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridCostComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  GetResourceId() {
    return "UiItem_ItemEnergy";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem]];
  }
  OnRefresh(e) {
    var t = this.GetText(0);
    t.SetText("" + e.Cost);
    t.SetColor(e.Color);
    this.GetItem(1).SetColor(e.Color);
    this.SetActive(true);
  }
}
exports.MediumItemGridCostComponent = MediumItemGridCostComponent;
//# sourceMappingURL=MediumItemGridCostComponent.js.map