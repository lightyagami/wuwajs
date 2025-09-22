"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetEventDispatcher = undefined;
const EventCSharpBridge_1 = require("../Common/Event/EventCSharpBridge");
const EventDefine_1 = require("../Common/Event/EventDefine");
class NetEventDispatcher {
  NotifyCsKcpClient(e) {
    EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.NotifyCsKcpClient, e);
  }
  KcpConnectSuccess() {
    EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.NotifyCsOnNetKcpConnectSuccess);
  }
  ReceiveResponse(e, n, t, i) {
    EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.NotifyCsOnNetReceiveResponse, e, n, t, i);
  }
  ReceiveException(e, n, t, i) {
    EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.NotifyCsOnNetReceiveException, e, n, t, i);
  }
  ReceiveTcpException(e) {
    EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.NotifyCsOnNetReceiveTcpException, e);
  }
  ReceivePush(e, n, t) {
    EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.NotifyCsOnNetReceivePush, e, n, t);
  }
  OnError(e, n, t, i, r) {
    EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.NotifyCsOnNetError, e, n, t, i, r);
  }
}
exports.NetEventDispatcher = NetEventDispatcher;
//# sourceMappingURL=NetEventDispatcher.js.map