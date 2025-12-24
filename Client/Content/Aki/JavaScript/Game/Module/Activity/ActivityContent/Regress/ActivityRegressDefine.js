"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.regressBlueColor = exports.regressYellowColor = exports.REGRESS_OTHER_CONFIG_MAX_NUM = exports.REGRESS_ROLE_CONFIG_MAX_NUM = exports.ActivityRegressTaskScoreRewardGridData = exports.RECALL_PAY_BP_GIFT_ID = exports.RECALL_SCORE_ITEM_ID = exports.ActivityRegressTabSwitchItemCommonData = exports.ERecallStartCondition = exports.activityRegressMainViewComponentsInfo = undefined;
const UE = require("ue");
var ERecallStartCondition;
exports.activityRegressMainViewComponentsInfo = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem]];
(function (t) {
  t[t.WorldDone = 0] = "WorldDone";
  t[t.RecallReady = 1] = "RecallReady";
  t[t.FirstShow = 2] = "FirstShow";
  t[t.UnForbidStart = 3] = "UnForbidStart";
  t[t.IsOpen = 4] = "IsOpen";
})(ERecallStartCondition = exports.ERecallStartCondition ||= {});
class ActivityRegressTabSwitchItemCommonData {
  constructor() {
    this.RecallEntryType = undefined;
    this.Config = undefined;
    this.Title = "";
  }
}
exports.ActivityRegressTabSwitchItemCommonData = ActivityRegressTabSwitchItemCommonData;
exports.RECALL_SCORE_ITEM_ID = 20;
exports.RECALL_PAY_BP_GIFT_ID = 46;
class ActivityRegressTaskScoreRewardGridData {
  constructor() {
    this.Config = undefined;
    this.RewardState = 0;
    this.PayRewardState = 0;
  }
}
exports.ActivityRegressTaskScoreRewardGridData = ActivityRegressTaskScoreRewardGridData;
exports.REGRESS_ROLE_CONFIG_MAX_NUM = 4;
exports.REGRESS_OTHER_CONFIG_MAX_NUM = 3;
const YELLOW_COLOR = "8D784C";
exports.regressYellowColor = UE.Color.FromHex(YELLOW_COLOR);
const BLUE_COLOR = "476188";
exports.regressBlueColor = UE.Color.FromHex(BLUE_COLOR);
//# sourceMappingURL=ActivityRegressDefine.js.map