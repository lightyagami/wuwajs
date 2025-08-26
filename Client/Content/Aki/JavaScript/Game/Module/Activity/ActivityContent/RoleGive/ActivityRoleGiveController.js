"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRoleGiveController = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityRoleGiveData_1 = require("./ActivityRoleGiveData");
const ActivitySubViewRoleGive_1 = require("./ActivitySubViewRoleGive");
class ActivityRoleGiveController extends ActivityControllerBase_1.ActivityControllerBase {
  OnOpenView(e) {
    throw new Error("Method not implemented.");
  }
  OnGetActivityResource(e) {
    return "UiItem_ActivityRoleXiangliyao";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewRoleGive_1.ActivitySubViewRoleGive();
  }
  OnCreateActivityData(e) {
    ActivityRoleGiveController.CurrentActivityId = e.s5n;
    return new ActivityRoleGiveData_1.ActivityRoleGiveData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  static TrackMoonActivityRewardRequest() {
    var e = new Protocol_1.Aki.Protocol.Im_();
    e.w6n = ActivityRoleGiveController.CurrentActivityId;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("MoonChasing", 34, "TrackMoonActivityRewardRequest", ["ActivityId:", ActivityRoleGiveController.CurrentActivityId]);
    }
    Net_1.Net.Call(15989, e, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22962);
      } else if ((e = ActivityRoleGiveController.GetCurrentActivityData()) && (e.IsGetReward = true, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, ActivityRoleGiveController.CurrentActivityId), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("MoonChasing", 34, "TrackMoonActivityRewardResponse", ["ActivityId:", ActivityRoleGiveController.CurrentActivityId]);
      }
    });
  }
  static GetCurrentActivityData() {
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(ActivityRoleGiveController.CurrentActivityId);
    if (e) {
      return e;
    }
  }
}
(exports.ActivityRoleGiveController = ActivityRoleGiveController).CurrentActivityId = 0;
//# sourceMappingURL=ActivityRoleGiveController.js.map