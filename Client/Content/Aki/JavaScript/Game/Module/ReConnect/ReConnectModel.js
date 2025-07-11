"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReConnectModel = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const NetworkDefine_1 = require("../../../Launcher/NetworkDefine");
class ReConnectModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Tso = false;
    this.Lso = 0;
    this.Dso = 0;
    this.Rso = 0;
    this.Uso = 0;
    this.Aso = new Set();
    this.Pso = 0;
    this.xso = 0;
    this.wso = 0;
    this.Bso = undefined;
    this.bso = 1000;
    this.qso = 60;
    this.Gso = undefined;
    this.Nso = "";
    this.Oso = NetworkDefine_1.ENetworkType.None;
    this.kso = undefined;
  }
  OnInit() {
    this.ClearReconnectData();
    if (this.Uso === undefined) {
      this.Uso = 0;
    }
    this.Pso = CommonParamById_1.configCommonParamById.GetIntConfig("max_try_reconnect_count") ?? 3;
    this.xso = CommonParamById_1.configCommonParamById.GetIntConfig("reconnect_count_per_try") ?? 3;
    this.qso = CommonParamById_1.configCommonParamById.GetIntConfig("reconnect_channel_close_seconds") ?? 60;
    this.bso = CommonParamById_1.configCommonParamById.GetIntConfig("reconnect_show_mask_timeout_ms") ?? 1000;
    if (UE.KismetSystemLibrary.GetCommandLine().search("-InfinityReconnect") === -1) {
      this.Tso = false;
    } else {
      this.Tso = true;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Reconnect", 41, "[InfinityReconnect] Enable infinity reconnect.");
      }
    }
    return true;
  }
  OnClear() {
    this.ClearReconnectData();
    return true;
  }
  ClearReconnectData() {
    this.Lso = 0;
    this.Dso = 0;
    this.ResetReconnectStatus();
    this.ReconvTraceId = "";
  }
  get ServerChannelCloseTimeMs() {
    return this.qso * 1000;
  }
  AddRpc(e) {
    this.Aso.add(e);
  }
  DelRpc(e) {
    this.Aso.delete(e);
  }
  IsRpcEmpty() {
    return this.Aso.size <= 0;
  }
  GetUnResponsedRpcStr() {
    let e = "";
    for (const t of this.Aso) {
      e += `[${t}]`;
    }
    return e;
  }
  IsReConnectMaxCount() {
    return this.Lso > this.xso;
  }
  GetReConnectCount() {
    return this.Lso;
  }
  ReSetReConnectCount() {
    this.Lso = 0;
  }
  AddReConnectCount() {
    this.Lso++;
    this.Uso++;
    return this.Lso;
  }
  IsTryMaxCount() {
    return !this.Tso && this.Dso >= this.Pso;
  }
  AddTryCount() {
    this.Dso++;
  }
  GetTryCount() {
    return this.Dso;
  }
  get GetTotalReConnectCount() {
    return this.Uso;
  }
  GetReConnectStatus() {
    return this.Rso;
  }
  ResetReconnectStatus() {
    this.Rso = 0;
  }
  SetReconnectDoing() {
    this.Rso = 1;
  }
  CancelShowMaskTimer() {
    if (this.Bso) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.Bso);
      this.Bso = undefined;
    }
  }
  StartShowMaskTimer(e) {
    this.Bso = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      e();
      this.Bso = undefined;
    }, this.bso);
  }
  SetCurIncId() {
    this.wso = ReConnectModel.Fso;
  }
  IsReConnectIdSame() {
    return this.wso === ReConnectModel.Fso;
  }
  static AddReConnectIncId() {
    ReConnectModel.Fso++;
  }
  set DisconnectedFunction(e) {
    this.Gso = e;
  }
  get DisconnectedFunction() {
    return this.Gso;
  }
  get ReconvTraceId() {
    return this.Nso;
  }
  set ReconvTraceId(e) {
    this.Nso = e;
  }
  get LastNetworkType() {
    return this.Oso;
  }
  set LastNetworkType(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Reconnect", 30, "set LastNetworkType", ["old", this.Oso], ["new", e]);
    }
    this.Oso = e;
  }
  get NetworkListener() {
    this.kso ||= new UE.KuroNetworkChange();
    return this.kso;
  }
}
(exports.ReConnectModel = ReConnectModel).Fso = 0;
//# sourceMappingURL=ReConnectModel.js.map