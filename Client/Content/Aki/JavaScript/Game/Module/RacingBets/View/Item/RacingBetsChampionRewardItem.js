"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsChampionRewardItem = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class RacingBetsChampionRewardItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ETt = 0;
    this.H11 = () => {
      if (this.ETt > 0) {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.ETt);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIText]];
    this.BtnBindInfo = [[0, this.H11]];
  }
  Refresh(e) {
    this.ETt = e;
    this.SetItemIcon(this.GetTexture(1), this.ETt);
    this.GetText(2).SetText("x1");
  }
}
exports.RacingBetsChampionRewardItem = RacingBetsChampionRewardItem;
//# sourceMappingURL=RacingBetsChampionRewardItem.js.map