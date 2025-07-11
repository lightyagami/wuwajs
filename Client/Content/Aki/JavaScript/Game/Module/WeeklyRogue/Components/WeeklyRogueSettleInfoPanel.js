"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueSettleInfoPanelItem = exports.WeeklyRogueSettleInfoPanel = undefined;
const UE = require("ue");
const UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
class WeeklyRogueSettleInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.eGe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout]];
  }
  OnStart() {
    this.eGe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), () => new WeeklyRogueSettleInfoPanelItem());
  }
  UpdateData(e) {
    const t = [];
    t.push({
      Title: "WeeklyRogueSettleProgressTitle",
      Content: e.iqs + "/" + e.rqs,
      IsDoubleItem: false
    });
    t.push({
      Title: "WeeklyRogueSettleScoreReward",
      Content: e.SMs.toString(),
      IsDoubleItem: false
    });
    e = new UiAsyncTask_1.UiAsyncTask("WeeklyRogueSettleInfoPanel.UpdateData", async () => {
      await this.eGe?.RefreshByDataAsync(t);
    });
    this.RunAsyncTask(e);
  }
}
exports.WeeklyRogueSettleInfoPanel = WeeklyRogueSettleInfoPanel;
class WeeklyRogueSettleInfoPanelItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem]];
  }
  Refresh(e, t, s) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Title);
    this.GetText(2).SetText(e.Content);
    this.GetItem(3)?.SetUIActive(e.IsDoubleItem);
  }
}
exports.WeeklyRogueSettleInfoPanelItem = WeeklyRogueSettleInfoPanelItem;
//# sourceMappingURL=WeeklyRogueSettleInfoPanel.js.map