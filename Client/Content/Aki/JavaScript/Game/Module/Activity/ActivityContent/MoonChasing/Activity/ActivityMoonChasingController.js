"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityMoonChasingController = undefined;
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../../Ui/UiManager");
const ActivityControllerBase_1 = require("../../../ActivityControllerBase");
const ActivityMoonChasingData_1 = require("./ActivityMoonChasingData");
const ActivitySubViewMoonChasing_1 = require("./ActivitySubViewMoonChasing");
class ActivityMoonChasingController extends ActivityControllerBase_1.ActivityControllerBase {
  OnGetIsOpeningActivityRelativeView() {
    for (const t of ModelManager_1.ModelManager.ActivityModel.GetActivitiesByType(Protocol_1.Aki.Protocol.uks.Proto_TrackMoonActivity)) {
      var o = t;
      let e = [];
      for (const i of e = o.ActivityFlowState === 0 ? ["MoonChasingMainView", "RewardMainView", "MoonChasingHandbookView", "BusinessMainView", "BusinessHelperView", "MoonChasingTaskView"] : ["MoonChasingMemoryView", "MoonChasingMemoryDetailView", "RewardMainView", "MoonChasingHandbookView"]) {
        if (UiManager_1.UiManager.IsViewOpen(i)) {
          return true;
        }
      }
    }
    return false;
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityMoonChasingMain";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewMoonChasing_1.ActivitySubViewMoonChasing();
  }
  OnCreateActivityData(e) {
    if (!ActivityMoonChasingController.a7a) {
      ActivityMoonChasingController.h7a();
      ActivityMoonChasingController.a7a = true;
    }
    return new ActivityMoonChasingData_1.ActivityMoonChasingData();
  }
  OnShowActivityFirstUnlockView(e) {
    if (e.ActivityFlowState === 0) {
      UiManager_1.UiManager.OpenView("ActivityUnlockTipMoonChasingView");
    }
  }
  static RefreshActivityRedDot() {
    ModelManager_1.ModelManager.ActivityModel.GetCurrentActivitiesByType(Protocol_1.Aki.Protocol.uks.Proto_TrackMoonActivity).forEach(e => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e.Id);
    });
  }
  static TrackMoonActivityTargetRewardRequest(o, t) {
    var e = new Protocol_1.Aki.Protocol.M$s();
    e.s5n = t;
    e.w6n = o;
    Net_1.Net.Call(17485, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16626);
        } else if (e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(o)) {
          e.SetRewardState(t, 2);
        }
      }
    });
  }
  static CheckIsActivityClose() {
    for (const e of ModelManager_1.ModelManager.ActivityModel.GetActivitiesByType(Protocol_1.Aki.Protocol.uks.Proto_TrackMoonActivity)) {
      if (e.CheckIfClose()) {
        ControllerHolder_1.ControllerHolder.ActivityController.ShowActivityRefreshAndBackToBattleView();
        break;
      }
    }
  }
  static h7a() {
    ControllerHolder_1.ControllerHolder.MoonChasingController.TrackMoonAllDataRequest();
  }
}
(exports.ActivityMoonChasingController = ActivityMoonChasingController).a7a = false;
//# sourceMappingURL=ActivityMoonChasingController.js.map