"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityMotorDevelopController = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityMotorDevelopData_1 = require("./ActivityMotorDevelopData");
const ActivitySubViewMotorDevelop_1 = require("./ActivitySubViewMotorDevelop");
const FIRSTUNLOCK = 2;
class ActivityMotorDevelopController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.OnMotorDevelopTaskUpdateNotify = e => {
      var t = ActivityMotorDevelopController.GetActivityData();
      if (t) {
        t.UpdateMotorDevelopTask(e.vlu);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMotorDevelopTaskUpdate);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, ActivityMotorDevelopController.ActivityId);
      }
    };
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityMotoCultivate";
  }
  OnActivityFirstUnlock(e) {
    e.SetActivityFirstUnlockUnReadFlag(1);
  }
  static RefreshFirstUnlockUnReadRedDot() {
    var e = ActivityMotorDevelopController.GetActivityData();
    var t = ModelManager_1.ModelManager.ActivityModel?.GetActivityCacheData(ActivityMotorDevelopController.ActivityId, 0, FIRSTUNLOCK, 0, 0);
    if (e.IsUnLock() && t) {
      e.SetActivityFirstUnlockUnReadFlag(0);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, ActivityMotorDevelopController.ActivityId);
    }
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewMotorDevelop_1.ActivitySubViewMotorDevelop();
  }
  OnCreateActivityData(e) {
    ActivityMotorDevelopController.ActivityId = e.s5n;
    return new ActivityMotorDevelopData_1.ActivityMotorDevelopData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(18598, this.OnMotorDevelopTaskUpdateNotify);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(18598);
  }
  static GetActivityData() {
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(ActivityMotorDevelopController.ActivityId);
    if (e) {
      return e;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Activity", 43, "摩托开发任务活动数据更新错误，没有活动数据:", ["ActivityId:", ActivityMotorDevelopController.ActivityId]);
    }
  }
  static RewardReceiveRequest(e) {
    var t = new Protocol_1.Aki.Protocol.Dkg();
    t.BVn = e;
    Net_1.Net.Call(26269, t, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22858);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, ActivityMotorDevelopController.ActivityId);
      }
    });
  }
}
(exports.ActivityMotorDevelopController = ActivityMotorDevelopController).ActivityId = 0;
//# sourceMappingURL=ActivityMotoDevelopController.js.map