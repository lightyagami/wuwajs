"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRoleGiveData = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const TrackMoonPhaseActivityById_1 = require("../../../../../Core/Define/ConfigQuery/TrackMoonPhaseActivityById");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
const ActivityRoleGiveController_1 = require("./ActivityRoleGiveController");
class ActivityRoleGiveData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.IsGetReward = false;
  }
  PhraseEx(e) {
    var t = e.GS_;
    ActivityRoleGiveController_1.ActivityRoleGiveController.CurrentActivityId = e.s5n;
    if (t) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MoonChasing", 34, "ActivityRoleGiveData Refresh:", ["IsGetReward:", t.DS_], ["ActivityId:", e.s5n]);
      }
      this.IsGetReward = t.DS_;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MoonChasing", 34, "ActivityRoleGiveData无数据");
    }
  }
  GetExtraConfig() {
    return TrackMoonPhaseActivityById_1.configTrackMoonPhaseActivityById.GetConfig(ActivityRoleGiveController_1.ActivityRoleGiveController.CurrentActivityId);
  }
  GetExDataRedPointShowState() {
    var e = this.GetExtraConfig();
    var t = ModelManager_1.ModelManager.MoonChasingModel?.GetPopularityValue();
    return !!t && !!e && !this.IsGetReward && t >= e?.PopularityNeed;
  }
}
exports.ActivityRoleGiveData = ActivityRoleGiveData;
//# sourceMappingURL=ActivityRoleGiveData.js.map