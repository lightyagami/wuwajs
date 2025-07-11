"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Heartbeat = undefined;
const cpp_1 = require("cpp");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const HeartbeatDefine_1 = require("./HeartbeatDefine");
class Heartbeat {
  static SetMaxTimeOutHandler(t) {
    this.$Qs = t;
  }
  static GetHeartbeatInterval() {
    return this.sMi;
  }
  static SendHeartbeatImmediately() {
    this.aMi = 9999999;
  }
  static BeginHeartBeat(t) {
    this.hMi = true;
    this.lMi = false;
    this._Mi = Date.now();
    this.uMi = 0;
    this.SetHeartBeatMode(0);
    this.SendHeartbeatImmediately();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.StartHeartBeat);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Heartbeat", 8, "开启心跳", ["MaxTimeOutCount", this.TimeOutMaxCount], ["ConnectTimeOut", this.cMi], ["HeartbeatInterval", this.sMi], ["Reason", HeartbeatDefine_1.EBeginHeartbeat[t]]);
    }
  }
  static SetHeartBeatMode(t) {
    if (t !== this.mMi) {
      switch (this.mMi = t) {
        case 0:
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Heartbeat", 8, "设置心跳配置为普通状态");
          }
          this.TimeOutMaxCount = CommonParamById_1.configCommonParamById.GetIntConfig("normal_heartbeat_timeout_reconnect") ?? 3;
          this.cMi = CommonParamById_1.configCommonParamById.GetIntConfig("normal_heartbeat_timeout_ms") ?? 3000;
          this.sMi = CommonParamById_1.configCommonParamById.GetIntConfig("normal_heartbeat_interval_ms") ?? 7000;
          break;
        case 1:
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Heartbeat", 8, "设置心跳配置为战斗状态");
          }
          this.TimeOutMaxCount = CommonParamById_1.configCommonParamById.GetIntConfig("battle_heartbeat_timeout_reconnect") ?? 3;
          this.cMi = CommonParamById_1.configCommonParamById.GetIntConfig("battle_heartbeat_timeout_ms") ?? 900;
          this.sMi = CommonParamById_1.configCommonParamById.GetIntConfig("battle_heartbeat_interval_ms") ?? 1000;
      }
    }
  }
  static StopHeartBeat(t) {
    this.hMi = false;
    var e = this.uMi;
    this.uMi = 0;
    this.SetHeartBeatMode(0);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.StopHeartBeat);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Heartbeat", 8, "结束心跳", ["MaxTimeOutCount", this.TimeOutMaxCount], ["ConnectTimeOut", this.cMi], ["HeartbeatInterval", this.sMi], ["TimeOutCount", e], ["Reason", HeartbeatDefine_1.EStopHeartbeat[t]]);
    }
  }
  static dMi() {
    this.uMi++;
    if (this.hMi) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Heartbeat", 8, "心跳超时", ["次数", this.uMi]);
      }
      if (this.uMi < this.TimeOutMaxCount) {
        this.SendHeartbeatImmediately();
      } else {
        TimerSystem_1.GameplayTimerSystem.Next(() => {
          this.$Qs?.();
        });
      }
    }
  }
  static RegisterTick() {
    if (Heartbeat.CMi === undefined) {
      Heartbeat.CMi = TimerSystem_1.GameplayTimerSystem.Forever(Heartbeat.Tick, TimerSystem_1.MIN_TIME);
    }
  }
  static gMi() {
    this.aMi = 0;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Net", 8, "发送心跳");
    }
    var t = new Protocol_1.Aki.Protocol.Cos();
    var e = cpp_1.FTpSafeProxy.GetAntiData2();
    if (e.byteLength > 0) {
      t.HLa = new Uint8Array(e);
    }
    Net_1.Net.Call(1650, Protocol_1.Aki.Protocol.Cos.create(t), this.fMi, this.cMi);
    this.lMi = true;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SendHeartbeat);
  }
}
exports.Heartbeat = Heartbeat;
(_a = Heartbeat).hMi = false;
Heartbeat.lMi = false;
Heartbeat.uMi = 0;
Heartbeat.TimeOutMaxCount = 0;
Heartbeat.cMi = 0;
Heartbeat.sMi = 0;
Heartbeat.aMi = 0;
Heartbeat._Mi = 0;
Heartbeat.CMi = undefined;
Heartbeat.$Qs = undefined;
Heartbeat.mMi = undefined;
Heartbeat.Tick = t => {
  var e;
  if (_a.hMi) {
    e = Date.now();
    t = Math.max(e - _a._Mi, t);
    _a.aMi += t;
    _a._Mi = e;
    if (!(_a.aMi < _a.sMi) && !_a.lMi) {
      _a.gMi();
    }
  }
};
Heartbeat.fMi = t => {
  _a.lMi = false;
  if (!t) {
    Heartbeat.dMi();
  }
}; //# sourceMappingURL=Heartbeat.js.map