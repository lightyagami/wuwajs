"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DailyActivityController = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
class DailyActivityController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return true;
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(15658, DailyActivityController.Ukt);
    Net_1.Net.Register(18915, DailyActivityController.Akt);
    Net_1.Net.Register(24655, DailyActivityController.Pkt);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(15658);
    Net_1.Net.UnRegister(18915);
    Net_1.Net.UnRegister(24655);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, this.xkt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CrossDay, this._Mo);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, this.xkt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CrossDay, this._Mo);
  }
  static async RequestDailyActivityData() {
    var e = Protocol_1.Aki.Protocol.tss.create();
    var e = await Net_1.Net.CallAsync(28224, e);
    return !!e && (ModelManager_1.ModelManager.DailyActivityModel.RefreshDailyActivityData(e.Bxs), true);
  }
  static RequestDailyActivityTaskReward(e) {
    var t = Protocol_1.Aki.Protocol.sss.create();
    t.B6n = e;
    Net_1.Net.Call(18478, t, e => {
      if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28855);
      }
    });
  }
  static RequestDailyActivityReward(e) {
    var t = Protocol_1.Aki.Protocol.hss.create();
    t.BVn = e;
    Net_1.Net.Call(23046, t, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.DailyActivityModel.RefreshActivityInfo(e.BVn);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24930);
        }
      }
    });
  }
  static RequestAllAvailableActivityReward() {
    var e = ModelManager_1.ModelManager.DailyActivityModel.DailyActivityGoalMap;
    const r = [];
    e.forEach((e, t) => {
      if (e.State === 1) {
        r.push(t);
      }
    });
    DailyActivityController.RequestDailyActivityReward(r);
  }
}
(exports.DailyActivityController = DailyActivityController).xkt = () => {
  ModelManager_1.ModelManager.DailyActivityModel.InitGoalData();
  DailyActivityController.RequestDailyActivityData();
};
DailyActivityController._Mo = () => {
  DailyActivityController.RequestDailyActivityData().then(e => {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DailyUpdateNotify);
  });
};
DailyActivityController.Ukt = e => {
  ModelManager_1.ModelManager.DailyActivityModel.UpdateDailyActivityData(e.Bxs);
};
DailyActivityController.Akt = e => {
  ModelManager_1.ModelManager.DailyActivityModel.RefreshDailyActivityData(e.Bxs);
};
DailyActivityController.Pkt = e => {
  ModelManager_1.ModelManager.DailyActivityModel.RefreshActivityValue(e.wxs);
}; //# sourceMappingURL=DailyActivityController.js.map