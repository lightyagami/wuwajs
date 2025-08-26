"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityPhantomCollectController = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ErrorCodeController_1 = require("../../../ErrorCode/ErrorCodeController");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityPhantomCollectData_1 = require("./ActivityPhantomCollectData");
const ActivitySubViewPhantomCollect_1 = require("./ActivitySubViewPhantomCollect");
class ActivityPhantomCollectController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.OnPhantomCollectUpdateNotify = t => {
      ActivityPhantomCollectController.ActivityId = t.w6n;
      var e = ActivityPhantomCollectController.GetCurrentActivityDataById();
      if (e) {
        if (t.oMs) {
          e.UpadatePhantomCollectReward(t.oMs);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomCollectUpdate, t.oMs.h5n);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, ActivityPhantomCollectController.ActivityId);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Activity", 34, "声骇收集活动数据更新错误:", ["ActivityId:", t.w6n]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Activity", 34, "声骇收集活动数据更新错误，没有活动数据:", ["ActivityId:", t.w6n]);
      }
    };
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(22272, this.OnPhantomCollectUpdateNotify);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(22272);
  }
  OnGetActivityResource(t) {
    return "UiItem_ActivityPhantomCollect";
  }
  OnCreateSubPageComponent(t) {
    return new ActivitySubViewPhantomCollect_1.ActivitySubViewPhantomCollect();
  }
  OnCreateActivityData(t) {
    ActivityPhantomCollectController.ActivityId = t.s5n;
    return new ActivityPhantomCollectData_1.ActivityPhantomCollectData();
  }
  OnOpenView(t) {}
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  static GetCurrentActivityDataById() {
    var t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(ActivityPhantomCollectController.ActivityId);
    if (t) {
      return t;
    }
  }
  static async PhantomCollectRewardReceiveRequest(t) {
    var e = new Protocol_1.Aki.Protocol.k$n();
    e.h5n = t;
    e.w6n = ActivityPhantomCollectController.ActivityId;
    var e = await Net_1.Net.CallAsync(23231, e);
    if (e) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23231);
      } else {
        e = ActivityPhantomCollectController.GetCurrentActivityDataById();
        if (e) {
          e = e.GetPhantomCollectRewardById(t);
          if (e) {
            e.Y4n = Protocol_1.Aki.Protocol.zps.ovs;
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, ActivityPhantomCollectController.ActivityId);
            return e;
          }
        }
      }
    }
  }
}
(exports.ActivityPhantomCollectController = ActivityPhantomCollectController).ActivityId = 0;
//# sourceMappingURL=ActivityPhantomCollectController.js.map