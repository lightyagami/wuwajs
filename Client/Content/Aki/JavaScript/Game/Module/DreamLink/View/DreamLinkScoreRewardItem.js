"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DreamLinkScoreRewardItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
class DreamLinkScoreRewardItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.Data = e;
    this.pTl = -1;
    this.fTl = 0;
    this.vTl = () => {
      this.RefreshPerformance();
    };
    this.UFe = () => {
      this.Data.SaveFirstCheckRedDotState(5);
      UiManager_1.UiManager.OpenView("DreamLinkRewardViewEnergy");
    };
    this.fTl = this.Data.MaxEnergy;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.UFe]];
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoguelikeCurrencyUpdate, this.vTl);
    this.RefreshPerformance();
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoguelikeCurrencyUpdate, this.vTl);
  }
  RefreshPerformance() {
    var e = this.Data.GetEnergyItemCount();
    if (this.pTl !== e) {
      this.pTl = e;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "DreamLink_Reward_Ins_Progress", this.pTl, this.fTl);
    }
    this.GetItem(2).SetUIActive(this.Data.CheckHasEnergyReward());
  }
}
exports.DreamLinkScoreRewardItem = DreamLinkScoreRewardItem;
//# sourceMappingURL=DreamLinkScoreRewardItem.js.map