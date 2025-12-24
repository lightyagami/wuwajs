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
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController");
const ActivityControllerBase_1 = require("../../../ActivityControllerBase");
const ActivityFishingData_1 = require("./ActivityFishingData");
const ActivityFishingDefine_1 = require("./ActivityFishingDefine");
const ActivityFishingSubView_1 = require("./View/ActivityFishingSubView");
class ActivityFishingController extends ActivityControllerBase_1.ActivityControllerBase {
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnOpenView(e) {
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("CantUseInMultiplayerMode");
    } else if (e.GetPreGuideQuestFinishState()) {
      let e = ModelManager_1.ModelManager.FishingModel.GetShipData().GetLastPortId();
      if (e <= 0) {
        e = ActivityFishingDefine_1.DEFAULT_PORT_ID;
      }
      var i = ConfigManager_1.ConfigManager.FishingConfig.GetFishingPortConfig(e);
      ControllerHolder_1.ControllerHolder.WorldMapController.FocalMarkItem(34, i.MarkId);
    } else {
      i = e.GetUnFinishPreGuideQuestId();
      UiManager_1.UiManager.OpenView("QuestView", i);
    }
  }
  OnGetActivityResource(e) {
    return "UiItem_FishingActivity";
  }
  OnCreateSubPageComponent(e) {
    return new ActivityFishingSubView_1.ActivityFishingSubView();
  }
  OnCreateActivityData(e) {
    return new ActivityFishingData_1.ActivityFishingData();
  }
  OnShowActivityFirstUnlockView(e) {
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
    Net_1.Net.Register(25742, ActivityFishingController.ZP_);
    Net_1.Net.Register(22541, ActivityFishingController.ex_);
    Net_1.Net.Register(28418, ActivityFishingController.tx_);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(25742);
    Net_1.Net.UnRegister(22541);
    Net_1.Net.UnRegister(28418);
  }
  static GetCurrentActivityData() {
    var e = ModelManager_1.ModelManager.ActivityModel?.GetCurrentActivitiesByType(Protocol_1.Aki.Protocol.uks.Proto_FishingActivity);
    let i = undefined;
    e?.forEach(e => {
      i = e;
    });
    return i;
  }
  static FishingActivityLimitRewardRequest(e) {
    var i = new Protocol_1.Aki.Protocol.ky_();
    i.gps = e;
    Net_1.Net.Call(23424, i, e => {
      if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24928);
      }
    });
  }
  static FishingActivityMilestoneRewardRequest(e) {
    var i = new Protocol_1.Aki.Protocol.Oy_();
    var t = this.GetCurrentActivityData();
    if (t) {
      i.w6n = t.Id;
      i.KM_ = e;
      Net_1.Net.Call(27900, i, e => {
        if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26042);
        }
      });
    }
  }
}
exports.ActivityFishingController = ActivityFishingController;
(_a = ActivityFishingController).ZP_ = e => {
  var i = _a.GetCurrentActivityData();
  if (i) {
    i.RefreshLimitTimeTaskDataList(e.E$s, true);
    i.RefreshActivityRedDotState();
  }
};
ActivityFishingController.ex_ = e => {
  var i = _a.GetCurrentActivityData();
  if (i) {
    i.RefreshMilestoneReward(e.WM_, true);
    i.RefreshActivityRedDotState();
  }
};
ActivityFishingController.tx_ = e => {
  var i = _a.GetCurrentActivityData();
  if (i) {
    i.MilestoneRewardItemAccumulate = e.QM_;
  }
};
ActivityFishingController.y9_ = e => {
  if (e.has(209)) {
    _a.PWa();
  }
};
ActivityFishingController.PWa = () => {
  var e = _a.GetCurrentActivityData();
  if (e) {
    e.RefreshActivityRedDotState();
  }
}; //# sourceMappingURL=ActivityFishingController.js.map