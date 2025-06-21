"use strict";
var _a;
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BeginnerCarnivalController = void 0;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  BeginnerCarnivalData_1 = require("./BeginnerCarnivalData"),
  BeginnerCarnivalSubView_1 = require("./BeginnerCarnivalSubView");
class BeginnerCarnivalController extends ActivityControllerBase_1.ActivityControllerBase {
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_NewPlayerCelebration"
  }
  OnCreateSubPageComponent(e) {
    return new BeginnerCarnivalSubView_1.BeginnerCarnivalSubView
  }
  OnCreateActivityData(e) {
    return BeginnerCarnivalController.ActivityId = e.s5n, new BeginnerCarnivalData_1.BeginnerCarnivalData
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1
  }
  OnActivityFirstUnlock(e) {
    UiManager_1.UiManager.OpenView("BeginnerCarnivalUnlockTipView")
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(29104, BeginnerCarnivalController.NewbieCarnivalTaskDataUpdateNotify), Net_1.Net.Register(27992, BeginnerCarnivalController.NewbieCarnivalTaskJumpUpdateNotify)
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(29104), Net_1.Net.UnRegister(27992)
  }
  static NewbieCarnivalAwardRequest(i) {
    var e = Protocol_1.Aki.Protocol.a41.create();
    e.w6n = this.ActivityId, e._41 = i, Net_1.Net.Call(23521, e, e => {
      if (e) {
        var r, n;
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20779);
        for ([r, n] of this.GetBeginnerCarnivalData().TaskDataMap)
          for (const t of n)
            if (t.s5n === i) {
              n[n.indexOf(t)].H6n = Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshBeginnerCarnivalTask, r);
              break
            } EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.ActivityId)
      }
    })
  }
  static NewbieCarnivalSwitchRoleRequest(r) {
    var e = Protocol_1.Aki.Protocol.o41.create();
    e.w6n = this.ActivityId, e.Q6n = r, Net_1.Net.Call(29473, e, e => {
      e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18023), this.GetBeginnerCarnivalData().ChoseRoleId = r, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshBeginnerCarnivalChoseRole), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.ActivityId))
    })
  }
  static GetBeginnerCarnivalData() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.ActivityId)
  }
}
exports.BeginnerCarnivalController = BeginnerCarnivalController, (_a = BeginnerCarnivalController).ActivityId = 0, BeginnerCarnivalController.NewbieCarnivalTaskDataUpdateNotify = e => {
  var e = e.L$s.E$s,
    r = _a.GetBeginnerCarnivalData();
  for (const t of e) {
    var n = ConfigManager_1.ConfigManager.BeginnerCarnivalConfig.GetNewbieCarnivalTask(t.s5n);
    if (n) {
      let e = r.TaskDataMap.get(n.TaskType);
      for (const i of e = e || [])
        if (i.s5n === t.s5n) {
          e[e.indexOf(i)] = t;
          break
        } r.TaskDataMap.set(n.TaskType, e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshBeginnerCarnivalTask, n.TaskType)
    }
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, _a.ActivityId)
}, BeginnerCarnivalController.NewbieCarnivalTaskJumpUpdateNotify = e => {
  var r = _a.GetBeginnerCarnivalData();
  for (const n of e.Mou) r.JumpTaskMap.set(n.Eou, n.Iou), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshBeginnerCarnivalTask, n.Eou)
};
//# sourceMappingURL=BeginnerCarnivalController.js.map