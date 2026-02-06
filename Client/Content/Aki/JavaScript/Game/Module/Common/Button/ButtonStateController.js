"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonStateController = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../../Core/Net/Net");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CHECKGAP = 120000;
class ButtonStateController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.snm = new Map([[0, ModelManager_1.ModelManager.HomeBtnModel]]);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, this.xkt);
    return true;
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, this.xkt);
    this.R6t();
    this.snm?.clear();
    return !(this.snm = undefined);
  }
  static R6t() {
    if (this.anm !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.anm);
      this.anm = undefined;
    }
  }
  static P3e() {
    this.R6t();
    this.anm = TimerSystem_1.GameplayTimerSystem.Forever(this.hnm, CHECKGAP, undefined, undefined, undefined, false);
  }
  static RequestBtnState() {
    var e;
    if (this.snm) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("HomeBtn", 87, "向服务器请求按钮状态");
      }
      (e = new Protocol_1.Aki.Protocol.vrm()).jom = [...this.snm.keys()];
      Net_1.Net.Call(27139, e, e => {
        if (e) {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21352);
          } else {
            e.j7n.forEach(e => {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("HomeBtn", 87, "服务器下发按钮状态", ["Type", e.h5n], ["Enable", e.tWn]);
              }
              var t = this.snm?.get(e.h5n);
              if (t) {
                EventSystem_1.EventSystem.EmitWithTarget(t, EventDefine_1.EEventName.BtnStateUpdate, e.tWn);
              }
            });
          }
        }
      });
    }
  }
}
exports.ButtonStateController = ButtonStateController;
(_a = ButtonStateController).anm = undefined;
ButtonStateController.snm = undefined;
ButtonStateController.xkt = () => {
  _a.RequestBtnState();
  _a.P3e();
};
ButtonStateController.hnm = () => {
  _a.RequestBtnState();
}; //# sourceMappingURL=ButtonStateController.js.map