"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRoadBookController = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityRoadBookData_1 = require("./ActivityRoadBookData");
const ActivitySubViewRoadBook_1 = require("./View/ActivitySubViewRoadBook");
class ActivityRoadBookController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.AHm = e => {
      var t = ActivityRoadBookController.GetRoadBookData();
      if (t) {
        if (e.T$s) {
          t.RefreshTravelTaskData(e.T$s);
        }
        if (e.Ujm) {
          t.RefreshMotorChallengePlayData(e.Ujm);
        }
        if (e.ME_) {
          t.UnlockAreaData(e.ME_);
        }
        if (e.SE_) {
          t.UnlockPhantom(e.SE_);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t.Id);
      }
    };
  }
  OnOpenView(e) {}
  OnRegisterNetEvent() {
    Net_1.Net.Register(28238, this.AHm);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(28238);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, ActivityRoadBookController.qdi);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, ActivityRoadBookController.qdi);
  }
  OnGetActivityResource(e) {
    return "UiItem_MapThemeHall30";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewRoadBook_1.ActivitySubViewRoadBook();
  }
  OnCreateActivityData(e) {
    return new ActivityRoadBookData_1.ActivityRoadBookData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  static GetRoadBookData() {
    var e = ModelManager_1.ModelManager.ActivityModel.GetCurrentActivitiesByType(Protocol_1.Aki.Protocol.uks.Proto_RoadBookActivity);
    let t = undefined;
    return t = e ? e[0] : t;
  }
  static RequestRoadBookLevelUp(t) {
    var e = Protocol_1.Aki.Protocol.Ejm.create();
    Net_1.Net.Call(22215, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29529);
          t?.(false);
        } else if (e = ActivityRoadBookController.GetRoadBookData()) {
          e.TravelLevel++;
          t?.(true);
          e.RefreshActivityRedDotState();
          ActivityRoadBookController.eVl(e);
        } else {
          t?.(false);
        }
      } else {
        t?.(false);
      }
    });
  }
  static RequestMultiRoadBookTaskReward(o) {
    var e;
    if (o && o.length !== 0) {
      (e = Protocol_1.Aki.Protocol.Tjm.create()).B6n = o;
      Net_1.Net.Call(17004, e, e => {
        if (e) {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17437);
          } else {
            const t = ActivityRoadBookController.GetRoadBookData();
            if (t) {
              o.forEach(e => {
                t.SetTravelTaskDataDone(e);
              });
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t.Id);
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoadBookTaskRefresh);
            }
          }
        }
      });
    }
  }
  static RequestTakeTaskFinalReward() {
    var e = Protocol_1.Aki.Protocol.Sjm.create();
    Net_1.Net.Call(19993, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24503);
        } else if (e = ActivityRoadBookController.GetRoadBookData()) {
          e.TaskFinalRewardData.IsReceived = true;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e.Id);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoadBookTaskRefresh);
        }
      }
    });
  }
  static RequestMultiTakeMotorChallengeReward(o) {
    var e;
    if (o && o.length !== 0) {
      (e = Protocol_1.Aki.Protocol.Rjm.create()).B6n = o;
      Net_1.Net.Call(27457, e, e => {
        if (e) {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25435);
          } else {
            const t = ActivityRoadBookController.GetRoadBookData();
            if (t) {
              o.forEach(e => {
                t.SetMotorChallengeRewardDone(e);
              });
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t.Id);
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoadBookMotorRefresh);
            }
          }
        }
      });
    }
  }
  static eVl(e) {
    if (!UiManager_1.UiManager.IsViewOpen("RoadBookLevelTipsView")) {
      UiManager_1.UiManager.OpenView("RoadBookLevelTipsView", e);
    }
  }
  OnShowActivityFirstUnlockView(e) {
    UiManager_1.UiManager.OpenView("ActivityUnlockTipRoadBookView");
  }
}
(exports.ActivityRoadBookController = ActivityRoadBookController).qdi = (e, t) => {
  var o = ActivityRoadBookController.GetRoadBookData();
  if (o && o.GetActivityConfig().ExpItemId === e) {
    if (o.CanTravelLevelUp()) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, o.Id);
    }
    ActivityRoadBookController.eVl(o);
  }
};
//# sourceMappingURL=ActivityRoadBookController.js.map