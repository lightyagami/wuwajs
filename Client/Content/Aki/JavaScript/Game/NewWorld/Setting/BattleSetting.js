"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleSetting = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const moduleNetworkState = [];
class BattleSetting {
  static RequestSetModuleNetworkState(t, e) {
    var o = Protocol_1.Aki.Protocol.pis.create();
    o.zjn = t;
    o.Jjn = e;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 19, "[BattleModule] Request module network mode", ["ModuleName", Protocol_1.Aki.Protocol.B4s[t]], ["ClientControl", e]);
    }
    Net_1.Net.Call(29025, o, e => {
      BattleSetting.ReceiveSetModuleNetworkState(t, e.Jjn);
    });
  }
  static IsModuleClientControl(e) {
    return moduleNetworkState[e] ?? true;
  }
  static ReceiveSetModuleNetworkState(e, t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 19, "[BattleModule] Receive module network mode notify", ["ModuleName", Protocol_1.Aki.Protocol.B4s[e]], ["ClientControl", t]);
    }
    moduleNetworkState[e] = t;
  }
}
exports.BattleSetting = BattleSetting;
//# sourceMappingURL=BattleSetting.js.map