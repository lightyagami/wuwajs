"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PeriodicityChallengeItemTopTips = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class PeriodicityChallengeItemTopTips extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  Refresh(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.TitleTips, ...e.Args);
    this.GetText(1)?.SetText(e.TxtNum);
  }
}
exports.PeriodicityChallengeItemTopTips = PeriodicityChallengeItemTopTips;
//# sourceMappingURL=PeriodicityChallengeItemTopTips.js.map