"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BeginnerCarnivalController = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const BeginnerCarnivalData_1 = require("./BeginnerCarnivalData");
const BeginnerCarnivalSubView_1 = require("./BeginnerCarnivalSubView");
class BeginnerCarnivalController extends ActivityControllerBase_1.ActivityControllerBase {
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_NewPlayerCelebration";
  }
  OnCreateSubPageComponent(e) {
    return new BeginnerCarnivalSubView_1.BeginnerCarnivalSubView();
  }
  OnCreateActivityData(e) {
    BeginnerCarnivalController.ActivityId = e.s5n;
    return new BeginnerCarnivalData_1.BeginnerCarnivalData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnShowActivityFirstUnlockView(e) {
    UiManager_1.UiManager.OpenView("BeginnerCarnivalUnlockTipView");
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(29104, BeginnerCarnivalController.NewbieCarnivalTaskDataUpdateNotify);
    Net_1.Net.Register(27992, BeginnerCarnivalController.NewbieCarnivalTaskJumpUpdateNotify);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(29104);
    Net_1.Net.UnRegister(27992);
  }
  static NewbieCarnivalAwardRequest(i) {
    var e = Protocol_1.Aki.Protocol.G41.create();
    e.w6n = this.ActivityId;
    e.V41 = i;
    Net_1.Net.Call(23521, e, e => {
      if (e) {
        var r;
        var n;
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20779);
        }
        for ([r, n] of this.GetBeginnerCarnivalData().TaskDataMap) {
          for (const t of n) {
            if (t.s5n === i) {
              n[n.indexOf(t)].H6n = Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken;
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshBeginnerCarnivalTask, r);
              break;
            }
          }
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.ActivityId);
      }
    });
  }
  static NewbieCarnivalSwitchRoleRequest(r) {
    var e = Protocol_1.Aki.Protocol.k41.create();
    e.w6n = this.ActivityId;
    e.Q6n = r;
    Net_1.Net.Call(29473, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18023);
        }
        this.GetBeginnerCarnivalData().ChoseRoleId = r;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshBeginnerCarnivalChoseRole);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.ActivityId);
      }
    });
  }
  static GetBeginnerCarnivalData() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.ActivityId);
  }
}
exports.BeginnerCarnivalController = BeginnerCarnivalController;
(_a = BeginnerCarnivalController).ActivityId = 0;
BeginnerCarnivalController.NewbieCarnivalTaskDataUpdateNotify = e => {
  var e = e.L$s.E$s;
  var r = _a.GetBeginnerCarnivalData();
  for (const t of e) {
    var n = ConfigManager_1.ConfigManager.BeginnerCarnivalConfig.GetNewbieCarnivalTask(t.s5n);
    if (n) {
      let e = r.TaskDataMap.get(n.TaskType);
      for (const i of e = e || []) {
        if (i.s5n === t.s5n) {
          e[e.indexOf(i)] = t;
          break;
        }
      }
      r.TaskDataMap.set(n.TaskType, e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshBeginnerCarnivalTask, n.TaskType);
    }
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, _a.ActivityId);
};
BeginnerCarnivalController.NewbieCarnivalTaskJumpUpdateNotify = e => {
  var r = _a.GetBeginnerCarnivalData();
  for (const n of e.Ohu) {
    r.JumpTaskMap.set(n.qhu, n.Ghu);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshBeginnerCarnivalTask, n.qhu);
  }
}; //# sourceMappingURL=BeginnerCarnivalController.js.map