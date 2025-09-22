"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueCardCostItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SurvivorsRogueCardComponent_1 = require("./SurvivorsRogueCardComponent");
class SurvivorsRogueCardCostItem extends SurvivorsRogueCardComponent_1.SurvivorsRogueCardComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText]];
  }
  OnGetResourceId() {
    return "UiItem_SurvivorsCardCost";
  }
  GetLayoutLevel() {
    return 1;
  }
  OnRefresh(e, r) {
    var o;
    if (e === undefined) {
      this.SetActive(false);
    } else {
      o = ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.GetCurrencyCount();
      this.SetCost(e, r && o < e);
      this.SetActive(true);
    }
  }
  SetCostItem(e) {
    this.SetItemIcon(this.GetTexture(0), e);
  }
  SetCost(e, r) {
    var o = this.GetText(1);
    o.SetText(e.toString());
    o.SetChangeColor(r, o.changeColor);
  }
}
exports.SurvivorsRogueCardCostItem = SurvivorsRogueCardCostItem;
//# sourceMappingURL=SurvivorsRogueCardComponentCost.js.map