"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityDoubleRewardController = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityDoubleRewardData_1 = require("./ActivityDoubleRewardData");
const ActivitySubViewDoubleReward_1 = require("./ActivitySubViewDoubleReward");
class ActivityDoubleRewardController extends ActivityControllerBase_1.ActivityControllerBase {
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return e.Prefab;
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewDoubleReward_1.ActivitySubViewDoubleReward();
  }
  OnCreateActivityData(e) {
    ActivityDoubleRewardController.UniversalActivityIdSet.add(e.s5n);
    return new ActivityDoubleRewardData_1.ActivityDoubleRewardData();
  }
  OnInit() {
    return true;
  }
  OnClear() {
    ActivityDoubleRewardController.UniversalActivityIdSet.clear();
    return true;
  }
  static IsAnyActivityHasLeftUpCount() {
    for (const e of ModelManager_1.ModelManager.ActivityModel.GetActivitiesByType(Protocol_1.Aki.Protocol.uks.Proto_DoubleInstanceRewardActivity)) {
      if (e.CheckIfInShowTime()) {
        if (e.LeftUpCount > 0) {
          return true;
        }
      }
    }
    return false;
  }
  static GetAdventureUpActivity(e) {
    for (const r of ActivityDoubleRewardController.UniversalActivityIdSet) {
      var t = ModelManager_1.ModelManager.ActivityModel?.GetActivityById(r);
      if (t?.CheckIfInOpenTime() && t?.AdventureGuideUpList.includes(e)) {
        return t;
      }
    }
  }
  static GetDungeonUpActivity(t, e = true) {
    for (const i of ActivityDoubleRewardController.UniversalActivityIdSet) {
      var r = ModelManager_1.ModelManager.ActivityModel?.GetActivityById(i);
      if (r?.CheckIfInOpenTime() && r.GetDungeonUpList(e).find(e => t.includes(e)) !== undefined) {
        return r;
      }
    }
  }
  static GetDungeonUpActivityFullTip(e, t = true) {
    return ActivityDoubleRewardController.GetDungeonUpActivity(e, t)?.GetFullTip();
  }
  static HasAnyDoubleRewardActivityShowing() {
    return ModelManager_1.ModelManager.ActivityModel.GetIsActivityShowingByType(Protocol_1.Aki.Protocol.uks.Proto_DoubleInstanceRewardActivity);
  }
}
(exports.ActivityDoubleRewardController = ActivityDoubleRewardController).UniversalActivityIdSet = new Set();
//# sourceMappingURL=ActivityDoubleRewardController.js.map