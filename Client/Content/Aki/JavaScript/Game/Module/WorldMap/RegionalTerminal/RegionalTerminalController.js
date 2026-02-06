"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegionalTerminalController = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../../Core/Net/Net");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const RegionalTerminalDefine_1 = require("./RegionalTerminalDefine");
class RegionalTerminalController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.OnRegisterNetEvent();
    return true;
  }
  static OnClear() {
    this.OnUnRegisterNetEvent();
    return true;
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(25356, RegionalTerminalController.O$f);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(25356);
  }
  static RequestTerminalPinOperation(r, o, n) {
    var e = new Protocol_1.Aki.Protocol.oXm();
    e.s5n = r;
    e.nKn = o;
    Net_1.Net.Call(19357, e, e => {
      if (e) {
        if (e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 24557);
          n?.(false);
        } else {
          ModelManager_1.ModelManager.RegionalTerminalModel.UpdateGameplayPin(r, o);
          n?.(true);
        }
      } else {
        n?.(false);
      }
    });
  }
  static OpenTerminalOverviewView(e) {
    var r = new RegionalTerminalDefine_1.RegionalTerminalViewParams();
    r.GameplayId = e ?? 0;
    UiManager_1.UiManager.OpenView("RegionalTerminalOverviewView", r);
  }
}
(exports.RegionalTerminalController = RegionalTerminalController).O$f = e => {
  ModelManager_1.ModelManager.RegionalTerminalModel.InitGameplayPin(e.hXm ?? []);
  for (const r of e.sNf) {
    ModelManager_1.ModelManager.RegionalTerminalModel.UpdateFuncIdConditionFinishedState(r.d6n, r.aNf ?? []);
  }
  if (e.Uvg.length > 0) {
    for (const o of e.Uvg) {
      ModelManager_1.ModelManager.RegionalTerminalModel.SetUnlockAreaMapGroupId(o);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Map", 37, "[RegionalTerminal] UnlockAreaMapGroup", ["Ids", e.Uvg]);
    }
  }
};
//# sourceMappingURL=RegionalTerminalController.js.map