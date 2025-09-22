"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CdKeyInputController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const CDKEY_USE_INTERVAL = 5000;
class CdKeyInputController extends UiControllerBase_1.UiControllerBase {
  static nEt() {
    this.v9s = true;
    this.sEt = 0;
    this.aEt = TimerSystem_1.GameplayTimerSystem.Forever(this.hEt, TimeUtil_1.TimeUtil.InverseMillisecond);
  }
  static lEt() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.aEt)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.aEt);
    }
    this.v9s = false;
    this.sEt = 0;
    this.aEt = undefined;
  }
  static OnClear() {
    this.lEt();
    return true;
  }
  static CheckInCdKeyUseCd() {
    return this.v9s;
  }
  static GetCdKeyUseCd() {
    var e = Math.ceil((CDKEY_USE_INTERVAL - this.sEt) / TimeUtil_1.TimeUtil.InverseMillisecond);
    return Math.max(1, e);
  }
}
exports.CdKeyInputController = CdKeyInputController;
(_a = CdKeyInputController).aEt = undefined;
CdKeyInputController.v9s = false;
CdKeyInputController.sEt = 0;
CdKeyInputController.hEt = e => {
  CdKeyInputController.sEt += e;
  if (CdKeyInputController.sEt >= CDKEY_USE_INTERVAL) {
    CdKeyInputController.lEt();
  }
};
CdKeyInputController.RequestCdKey = async e => {
  var t = new Protocol_1.Aki.Protocol.Bzn();
  t.R8n = e;
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Functional", 37, "请求CdKey兑换", ["CdKey", e]);
  }
  CdKeyInputController.nEt();
  var e = await Net_1.Net.CallAsync(28368, t);
  if (e) {
    return e.Q4n;
  }
}; //# sourceMappingURL=CdKeyInputController.js.map