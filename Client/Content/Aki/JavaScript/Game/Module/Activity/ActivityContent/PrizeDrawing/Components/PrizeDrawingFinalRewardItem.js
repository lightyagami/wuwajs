"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrizeDrawingFinalRewardItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const PrizeDrawingRewardItem_1 = require("./PrizeDrawingRewardItem");
class PrizeDrawingFinalRewardItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, i) {
    super();
    this.ETt = e;
    this.t6 = i;
    this.n7d = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await this.aGe(this.ETt, this.t6);
  }
  async aGe(e, i) {
    var r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e);
    this.GetText(1)?.ShowTextNew(r.Name);
    this.GetText(4)?.SetText("x" + i);
    this.GetItem(2)?.SetUIActive(false);
    this.GetSprite(3)?.SetUIActive(false);
    this.n7d = new PrizeDrawingRewardItem_1.GotItem();
    await Promise.all([this.n7d?.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()), this.SetItemIconAsync(this.GetTexture(0), e)]);
  }
  Refresh(e, i = false) {
    this.n7d?.RefreshGotState(e, i);
  }
}
exports.PrizeDrawingFinalRewardItem = PrizeDrawingFinalRewardItem;
//# sourceMappingURL=PrizeDrawingFinalRewardItem.js.map