"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityFishingController = undefined;
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../../Ui/UiManager");
const ActivityControllerBase_1 = require("../../../ActivityControllerBase");
const ActivityFishingData_1 = require("./ActivityFishingData");
const ActivityFishingSubView_1 = require("./View/ActivityFishingSubView");
class ActivityFishingController extends ActivityControllerBase_1.ActivityControllerBase {
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnOpenView(t) {}
  OnGetActivityResource(t) {
    return "UiItem_FishingActivity";
  }
  OnCreateSubPageComponent(t) {
    return new ActivityFishingSubView_1.ActivityFishingSubView();
  }
  OnCreateActivityData(t) {
    return new ActivityFishingData_1.ActivityFishingData();
  }
  OnActivityFirstUnlock(t) {
    UiManager_1.UiManager.OpenView("FishingActivityUnlockView");
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FishingRefreshHandBookRewardView, ActivityFishingController.PWa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UnLockGoods, ActivityFishingController.y9_);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FishingRefreshHandBookRewardView, ActivityFishingController.PWa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UnLockGoods, ActivityFishingController.y9_);
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(21583, ActivityFishingController.ZP_);
    Net_1.Net.Register(16955, ActivityFishingController.ex_);
    Net_1.Net.Register(23358, ActivityFishingController.tx_);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(21583);
    Net_1.Net.UnRegister(16955);
    Net_1.Net.UnRegister(23358);
  }
  static GetCurrentActivityData() {
    var t = ModelManager_1.ModelManager.ActivityModel?.GetCurrentActivitiesByType(Protocol_1.Aki.Protocol.uks.Proto_FishingActivity);
    let e = undefined;
    t?.forEach(t => {
      e = t;
    });
    return e;
  }
  static FishingActivityLimitRewardRequest(t) {
    var e = new Protocol_1.Aki.Protocol.ky_();
    e.gps = t;
    Net_1.Net.Call(29865, e, t => {
      if (t && t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 15838);
      }
    });
  }
  static FishingActivityMilestoneRewardRequest(t) {
    var e = new Protocol_1.Aki.Protocol.Oy_();
    var i = this.GetCurrentActivityData();
    if (i) {
      e.w6n = i.Id;
      e.KM_ = t;
      Net_1.Net.Call(15096, e, t => {
        if (t && t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 16778);
        }
      });
    }
  }
}
exports.ActivityFishingController = ActivityFishingController;
(_a = ActivityFishingController).ZP_ = t => {
  var e = _a.GetCurrentActivityData();
  if (e) {
    e.RefreshLimitTimeTaskDataList(t.E$s, true);
    e.RefreshActivityRedDotState();
  }
};
ActivityFishingController.ex_ = t => {
  var e = _a.GetCurrentActivityData();
  if (e) {
    e.RefreshMilestoneReward(t.WM_, true);
    e.RefreshActivityRedDotState();
  }
};
ActivityFishingController.tx_ = t => {
  var e = _a.GetCurrentActivityData();
  if (e) {
    e.MilestoneRewardItemAccumulate = t.QM_;
  }
};
ActivityFishingController.y9_ = t => {
  if (t.has(209)) {
    _a.PWa();
  }
};
ActivityFishingController.PWa = () => {
  var t = _a.GetCurrentActivityData();
  if (t) {
    t.RefreshActivityRedDotState();
  }
}; //# sourceMappingURL=ActivityFishingController.js.map