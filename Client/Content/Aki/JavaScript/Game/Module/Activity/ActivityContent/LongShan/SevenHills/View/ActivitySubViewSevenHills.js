"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ActivitySubViewSevenHills = void 0;
const UE = require("ue"),
  UiManager_1 = require("../../../../../../Ui/UiManager"),
  ActivitySubViewGeneralInfo_1 = require("../../../../View/SubView/ActivitySubViewGeneralInfo");
class ActivitySubViewSevenHills extends ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo {
  constructor() {
    super(...arguments), this.ActivityBaseData = void 0, this.tWt = () => {
      UiManager_1.UiManager.OpenView("SevenHillsMainView")
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIText]
    ]
  }
  OnBeforeShow() {
    this.SetClickFunc(this.tWt), this.SetBtnText("LongShanStage_Join01"), this.BNe(), this.ymu()
  }
  ymu() {
    var e = this.ActivityBaseData.GetScoreItemCount(),
      e = (this.GetText(4)?.SetText(e.toString()), this.ActivityBaseData.ScoreItemTotal);
    this.GetText(5)?.SetText("/" + e)
  }
  OnRefreshView() {
    this.RefreshFunction(), this.RefreshTimerText(), this.BNe(), this.ymu()
  }
  BNe() {
    var e = this.ActivityBaseData.CheckAnyStageRed() || this.ActivityBaseData.CheckScoreRewardRedDot();
    this.SetFunctionRedDotVisible(e)
  }
}
exports.ActivitySubViewSevenHills = ActivitySubViewSevenHills;
//# sourceMappingURL=ActivitySubViewSevenHills.js.map