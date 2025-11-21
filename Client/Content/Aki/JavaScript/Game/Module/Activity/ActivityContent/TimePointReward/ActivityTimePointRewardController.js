"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityTimePointRewardController = exports.TIME_AWARD_SEASON4_ACTIVITY_ID = exports.TIME_AWARD_SEASON2_ACTIVITY_ID = exports.TIME_AWARD_SEASON1_ACTIVITY_ID = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const CelebrationAwardSubView_1 = require("../CelebrationAward/CelebrationAwardSubView");
const MoonCelebrationAwardSubView_1 = require("../CelebrationAward/MoonCelebrationAwardSubView");
const ActivitySubViewTimePointReward_1 = require("./ActivitySubViewTimePointReward");
const ActivityTimePointRewardData_1 = require("./ActivityTimePointRewardData");
exports.TIME_AWARD_SEASON1_ACTIVITY_ID = 102000001;
exports.TIME_AWARD_SEASON2_ACTIVITY_ID = 102000002;
exports.TIME_AWARD_SEASON4_ACTIVITY_ID = 102000004;
class ActivityTimePointRewardController extends ActivityControllerBase_1.ActivityControllerBase {
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    if (e.Id === exports.TIME_AWARD_SEASON1_ACTIVITY_ID) {
      return "UiItem_ActivityTimePointReward";
    } else if (e.Id === exports.TIME_AWARD_SEASON2_ACTIVITY_ID) {
      return "UiItem_WelfareInfoA";
    } else if (e.Id === exports.TIME_AWARD_SEASON4_ACTIVITY_ID) {
      return "UiItem_WelfareBgC";
    } else {
      return "UiItem_ActivityTimePointReward";
    }
  }
  OnCreateSubPageComponent(e) {
    return new (e.Id === exports.TIME_AWARD_SEASON1_ACTIVITY_ID ? ActivitySubViewTimePointReward_1.ActivitySubViewTimePointReward : e.Id === exports.TIME_AWARD_SEASON2_ACTIVITY_ID ? CelebrationAwardSubView_1.CelebrationAwardSubView : e.Id === exports.TIME_AWARD_SEASON4_ACTIVITY_ID ? MoonCelebrationAwardSubView_1.MoonCelebrationAwardSubView : ActivitySubViewTimePointReward_1.ActivitySubViewTimePointReward)();
  }
  OnCreateActivityData(e) {
    return new ActivityTimePointRewardData_1.ActivityTimePointRewardData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  static GetRewardById(t, r) {
    var e = Protocol_1.Aki.Protocol.RYs.create();
    e.s5n = r;
    Net_1.Net.Call(24510, e, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24653);
      } else {
        ModelManager_1.ModelManager.ActivityModel.GetActivityById(t).SetRewardToGotState(r);
      }
    });
  }
}
exports.ActivityTimePointRewardController = ActivityTimePointRewardController;
//# sourceMappingURL=ActivityTimePointRewardController.js.map