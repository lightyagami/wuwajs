"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CumulativeShopController = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const CumulativeShopData_1 = require("./CumulativeShopData");
const CumulativeShopSubView_1 = require("./CumulativeShopSubView");
class CumulativeShopController extends ActivityControllerBase_1.ActivityControllerBase {
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiView_CumulativeShop";
  }
  OnCreateSubPageComponent(e) {
    return new CumulativeShopSubView_1.CumulativeShopSubView();
  }
  OnCreateActivityData(e) {
    CumulativeShopController.ActivityId = e.s5n;
    return new CumulativeShopData_1.CumulativeShopData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(20467, CumulativeShopController.ConsumptiveTaskInfoNotify);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(20467);
  }
  static ConsumptiveRewardRequest(e) {
    var t = Protocol_1.Aki.Protocol.Fm1.create();
    t.w6n = this.ActivityId;
    t.gps = e;
    Net_1.Net.Call(28079, t, t => {
      if (t) {
        if (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 28510);
        }
        var r = this.GetCumulativeShopData();
        r.TaskDataMap.set(t.Wm1.s5n, t.Wm1);
        var o = ConfigManager_1.ConfigManager.CumulativeShopConfig.GetCumulativeShopTaskConfig(t.Wm1.s5n);
        var o = o.TaskTab;
        let e = r.TaskTabMap.get(o);
        if (!(e = e || []).includes(t.Wm1.s5n)) {
          e.push(t.Wm1.s5n);
        }
        r.TaskTabMap.set(o, e);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CumulativeShopTaskRefresh, o);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.ActivityId);
      }
    });
  }
  static GetCumulativeShopData() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.ActivityId);
  }
  static ConsumptiveActivityInfoRequest() {
    var e = Protocol_1.Aki.Protocol.bM1.create();
    Net_1.Net.Call(21056, e, e => {
      var t = this.GetCumulativeShopData();
      t.TaskDataMap.clear();
      t.TaskTabMap.clear();
      var e = e.Vm1.cMs;
      for (const o of e) {
        t.TaskDataMap.set(o.s5n, o);
        var r = ConfigManager_1.ConfigManager.CumulativeShopConfig.GetCumulativeShopTaskConfig(o.s5n).TaskTab;
        let e = t.TaskTabMap.get(r);
        (e = e || []).push(o.s5n);
        t.TaskTabMap.set(r, e);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CumulativeShopTaskViewDataRefresh);
    });
  }
}
exports.CumulativeShopController = CumulativeShopController;
(_a = CumulativeShopController).ActivityId = 0;
CumulativeShopController.ConsumptiveTaskInfoNotify = e => {
  var t = _a.GetCumulativeShopData();
  t.TaskDataMap.set(e.Ym1.s5n, e.Ym1);
  var r = ConfigManager_1.ConfigManager.CumulativeShopConfig.GetCumulativeShopTaskConfig(e.Ym1.s5n);
  var r = r.TaskTab;
  let o = t.TaskTabMap.get(r);
  if (!(o = o || []).includes(e.Ym1.s5n)) {
    o.push(e.Ym1.s5n);
  }
  t.TaskTabMap.set(r, o);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CumulativeShopTaskRefresh, r);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, _a.ActivityId);
}; //# sourceMappingURL=CumulativeShopController.js.map