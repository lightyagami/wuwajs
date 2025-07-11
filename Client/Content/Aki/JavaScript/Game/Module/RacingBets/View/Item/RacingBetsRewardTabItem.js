"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsRewardTabItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class RacingBetsRewardTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.bTc = undefined;
    this.ClickToggleCallBack = undefined;
    this.wp1 = ["Dango_RewardPage_RewardType_1", "Dango_CurrencyPage_DailyTask", "Dango_RewardPage_RewardType_2"];
    this.onl = () => {
      if (this.ClickToggleCallBack) {
        this.ClickToggleCallBack(this.bTc);
      }
    };
    this.LTc = () => this.GetExtendToggle(0).ToggleState !== 1;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.onl]];
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.LTc);
  }
  Refresh(t, e, s) {
    this.bTc = t;
    this.RefreshItem();
  }
  RefreshItem() {
    if (this.bTc) {
      this.GetText(1).ShowTextNew(this.wp1[this.bTc.Id - 1]);
      this.BNe();
    }
  }
  BNe() {
    var t = this.bTc.GetRewardDataList().some(t => t.CanReceiveReward());
    this.GetItem(2)?.SetUIActive(t);
  }
  OnSelected(t) {
    this.GetExtendToggle(0).SetToggleStateForce(1);
  }
  OnDeselected(t) {
    this.GetExtendToggle(0).SetToggleStateForce(0);
  }
  BindClickToggleCallBack(t) {
    this.ClickToggleCallBack = t;
  }
}
exports.RacingBetsRewardTabItem = RacingBetsRewardTabItem;
//# sourceMappingURL=RacingBetsRewardTabItem.js.map