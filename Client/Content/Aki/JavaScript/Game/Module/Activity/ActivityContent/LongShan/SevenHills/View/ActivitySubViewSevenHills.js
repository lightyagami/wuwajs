"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewSevenHills = undefined;
const UE = require("ue");
const UiManager_1 = require("../../../../../../Ui/UiManager");
const ActivitySubViewGeneralInfo_1 = require("../../../../View/SubView/ActivitySubViewGeneralInfo");
class ActivitySubViewSevenHills extends ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.OnConfirmBtnClick = () => {
      UiManager_1.UiManager.OpenView("SevenHillsMainView", this.ActivityBaseData);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText]];
  }
  OnBeforeShow() {
    this.SetClickFunc(this.OnConfirmBtnClick);
    this.SetBtnText("LongShanStage_Join01");
    this.BNe();
    this.iDu();
  }
  iDu() {
    var e = this.ActivityBaseData.GetScoreItemCount();
    this.GetText(4)?.SetText(e.toString());
    var e = this.ActivityBaseData.ScoreItemTotal;
    this.GetText(5)?.SetText("/" + e);
  }
  OnRefreshView() {
    this.RefreshFunction();
    this.RefreshTimerText();
    this.BNe();
    this.iDu();
  }
  BNe() {
    var e = this.ActivityBaseData.CheckAnyStageRed() || this.ActivityBaseData.CheckScoreRewardRedDot();
    this.SetFunctionRedDotVisible(e);
  }
}
exports.ActivitySubViewSevenHills = ActivitySubViewSevenHills;
//# sourceMappingURL=ActivitySubViewSevenHills.js.map