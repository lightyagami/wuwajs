"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RogueBattleSettleDataInfoPanel = void 0;
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  BOSS_EVENT_TYPE = 5,
  DIFFICULT_EVENT_TYPE = 4,
  SIMPLE_EVENT_TYPE = 3,
  RANDOM_EVENT_TYPE = 1;
class RogueBattleSettleDataInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.IncId = 0, this.ResultView = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIText],
      [9, UE.UIText],
      [10, UE.UIText]
    ]
  }
  OnBeforeShow() {
    this.GetText(0).SetText(this.ResultView.SMs.toString()), this.GetText(1).SetText(this.ResultView.EP1.toString()), this.GetText(2).SetText(this.ResultView.IP1.toString()), this.GetText(3).SetText(this.ResultView.TP1.toString());
    let t = 0,
      e = 0,
      i = 0,
      s = 0;
    for (const E of this.ResultView.bP1) E.sps === BOSS_EVENT_TYPE && (t = E.m9n), E.sps === DIFFICULT_EVENT_TYPE && (e = E.m9n), E.sps === SIMPLE_EVENT_TYPE && (i = E.m9n), E.sps === RANDOM_EVENT_TYPE && (s = E.m9n);
    this.GetText(4).SetText(t.toString()), this.GetText(5).SetText(e.toString()), this.GetText(6).SetText(i.toString()), this.GetText(7).SetText(s.toString()), this.GetText(8).SetText(this.ResultView.RP1.toString()), 0 === this.ResultView.RP1 && this.ResultView.LP1 ? LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "RogueRes_Settle_ItemMaxCount") : this.GetText(8).SetText(this.ResultView.RP1.toString()), 0 === this.ResultView.wP1 && this.ResultView.AP1 ? LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), "RogueRes_Settle_ItemMaxCount") : this.GetText(9).SetText(this.ResultView.wP1.toString()), 0 === this.ResultView.PP1 && this.ResultView.xP1 ? LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), "RogueRes_Settle_ItemMaxCount") : this.GetText(10).SetText(this.ResultView.PP1.toString())
  }
}
exports.RogueBattleSettleDataInfoPanel = RogueBattleSettleDataInfoPanel;
//# sourceMappingURL=RogueBattleSettleDataInfoPanel.js.map