"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonCostItem = undefined;
const ue_1 = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const ExchangeRewardModel_1 = require("../ExchangeReward/ExchangeRewardModel");
class InstanceDungeonCostItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Uth = undefined;
    this.A6e = () => {
      if (this.Uth && this.Uth.Item[0]?.ItemId === ItemDefines_1.EItemId.Power) {
        this.RefreshItem(this.Uth.Item);
      }
    };
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
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPowerChanged, this.A6e);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPowerChanged, this.A6e);
  }
  RefreshItem(e) {
    var t;
    var s;
    this.Uth = {
      Item: e
    };
    if (!this.InAsyncLoading()) {
      t = e[0]?.ItemId === ItemDefines_1.EItemId.Power && !ModelManager_1.ModelManager.PowerModel.IsPowerEnough(e[1]);
      (s = this.GetText(1))?.SetText("x" + e[1]);
      s?.SetChangeColor(t, s.changeColor);
      this.SetItemIcon(this.GetTexture(0), e[0]?.ItemId);
    }
  }
}
exports.InstanceDungeonCostItem = InstanceDungeonCostItem;
//# sourceMappingURL=InstanceDungeonCostItem.js.map