"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleSettleDataInfoPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const BOSS_EVENT_TYPE = 5;
const DIFFICULT_EVENT_TYPE = 4;
const SIMPLE_EVENT_TYPE = 3;
const RANDOM_EVENT_TYPE = 1;
class RogueBattleSettleDataInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.IncId = 0;
    this.ResultView = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIText], [8, UE.UIText], [9, UE.UIText], [10, UE.UIText]];
  }
  OnBeforeShow() {
    this.GetText(0).SetText(this.ResultView.SMs.toString());
    this.GetText(1).SetText(this.ResultView.zP1.toString());
    this.GetText(2).SetText(this.ResultView.JP1.toString());
    this.GetText(3).SetText(this.ResultView.ZP1.toString());
    let t = 0;
    let e = 0;
    let i = 0;
    let s = 0;
    for (const E of this.ResultView.ex1) {
      if (E.sps === BOSS_EVENT_TYPE) {
        t = E.m9n;
      }
      if (E.sps === DIFFICULT_EVENT_TYPE) {
        e = E.m9n;
      }
      if (E.sps === SIMPLE_EVENT_TYPE) {
        i = E.m9n;
      }
      if (E.sps === RANDOM_EVENT_TYPE) {
        s = E.m9n;
      }
    }
    this.GetText(4).SetText(t.toString());
    this.GetText(5).SetText(e.toString());
    this.GetText(6).SetText(i.toString());
    this.GetText(7).SetText(s.toString());
    this.GetText(8).SetText(this.ResultView.tx1.toString());
    if (this.ResultView.tx1 === 0 && this.ResultView.ix1) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "RogueRes_Settle_ItemMaxCount");
    } else {
      this.GetText(8).SetText(this.ResultView.tx1.toString());
    }
    if (this.ResultView.rx1 === 0 && this.ResultView.ox1) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), "RogueRes_Settle_ItemMaxCount");
    } else {
      this.GetText(9).SetText(this.ResultView.rx1.toString());
    }
    if (this.ResultView.nx1 === 0 && this.ResultView.sx1) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), "RogueRes_Settle_ItemMaxCount");
    } else {
      this.GetText(10).SetText(this.ResultView.nx1.toString());
    }
  }
}
exports.RogueBattleSettleDataInfoPanel = RogueBattleSettleDataInfoPanel;
//# sourceMappingURL=RogueBattleSettleDataInfoPanel.js.map