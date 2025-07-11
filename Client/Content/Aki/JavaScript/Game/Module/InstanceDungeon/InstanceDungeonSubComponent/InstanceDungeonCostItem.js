"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonCostItem = undefined;
const ue_1 = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ExchangeRewardModel_1 = require("../ExchangeReward/ExchangeRewardModel");
class InstanceDungeonCostItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Uth = undefined;
    this.Nli = () => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(ExchangeRewardModel_1.POWER_DISCOUNT_HELP_ID);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, ue_1.UITexture], [1, ue_1.UIText], [2, ue_1.UIButtonComponent], [3, ue_1.UIItem]];
    this.BtnBindInfo = [[2, this.Nli]];
  }
  OnStart() {
    this.GetItem(3)?.SetUIActive(false);
    this.GetButton(2)?.RootUIComp.SetUIActive(false);
    if (this.Uth) {
      this.RefreshItem(this.Uth.Item);
    }
  }
  RefreshItem(e) {
    if (this.InAsyncLoading()) {
      this.Uth = {
        Item: e
      };
    } else {
      this.GetText(1)?.SetText("x" + e[1]);
      this.SetItemIcon(this.GetTexture(0), e[0]?.ItemId);
    }
  }
}
exports.InstanceDungeonCostItem = InstanceDungeonCostItem;
//# sourceMappingURL=InstanceDungeonCostItem.js.map