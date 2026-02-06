"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetEventDispatcher = undefined;
const Log_1 = require("../../Core/Common/Log");
const Net_1 = require("../../Core/Net/Net");
const EventCSharpBridge_1 = require("../Common/Event/EventCSharpBridge");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
class NetEventDispatcher {
  constructor() {
    this.CsNetCall = (v, e, E, t) => {
      Net_1.Net.CsCall(v, e, (e, t, n) => {
        var r;
        var i;
        if (n === undefined) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Net", 63, "[C#]Net.Call失败,返回数据为空:", ["requestMessageId", v], ["status", t], ["csRpcId", E]);
          }
        } else {
          t = n.MsgType;
          r = n.SeqNo;
          i = n.MessageId;
          n = n.MessageBuffer;
          EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.NotifyCsOnNetReceiveResponse, t, r, E, i, n);
        }
      }, t);
    };
  }
  Init() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNetCall, this.CsNetCall);
  }
  Clear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNetCall, this.CsNetCall);
  }
  KcpConnectSuccess() {
    EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.NotifyCsOnNetKcpConnectSuccess);
  }
  ReceiveException(e, t, n, r) {
    EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.NotifyCsOnNetReceiveException, e, t, n, r);
  }
  ReceiveTcpException(e) {
    EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.NotifyCsOnNetReceiveTcpException, e);
  }
  ReceivePush(e, t, n) {
    EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.NotifyCsOnNetReceivePush, e, t, n);
  }
  OnError(e, t, n, r, i) {
    EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.NotifyCsOnNetError, e, t, n, r, i);
  }
  CleanNetMessageCaches() {
    EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.NotifyCsCleanNetMessageCaches);
  }
}
exports.NetEventDispatcher = NetEventDispatcher;
//# sourceMappingURL=NetEventDispatcher.js.map