"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetInfo = undefined;
const PerfSight_1 = require("../PerfSight/PerfSight");
class NetInfo {
  static get RttMs() {
    return NetInfo.iY;
  }
  static SetRttMs(t) {
    if (t < NetInfo.iY) {
      NetInfo.iY = t;
    } else {
      NetInfo.iY = NetInfo.iY * 0.9 + t * 0.1;
    }
    if (PerfSight_1.PerfSight.IsEnable) {
      PerfSight_1.PerfSight.PostNetworkLatency(t);
    }
  }
  static get LoginTraceId() {
    return NetInfo.CEi;
  }
  static set LoginTraceId(t) {
    NetInfo.CEi = t;
  }
  static get Token() {
    return NetInfo.spu;
  }
  static set Token(t) {
    NetInfo.spu = t;
  }
  static get TcpPort() {
    return NetInfo.apu;
  }
  static set TcpPort(t) {
    NetInfo.apu = t;
  }
  static get DeviceId() {
    return NetInfo.hpu;
  }
  static set DeviceId(t) {
    NetInfo.hpu = t;
  }
  static get UdpPort() {
    return NetInfo.lpu;
  }
  static set UdpPort(t) {
    NetInfo.lpu = t;
  }
  static get TcpRatio() {
    return NetInfo._pu;
  }
  static set TcpRatio(t) {
    NetInfo._pu = t;
  }
  static get TcpRetry() {
    return NetInfo.upu;
  }
  static set TcpRetry(t) {
    NetInfo.upu = t;
  }
}
(exports.NetInfo = NetInfo).iY = 0;
NetInfo.CEi = undefined;
NetInfo.spu = undefined;
NetInfo.apu = 0;
NetInfo.hpu = undefined;
NetInfo.lpu = 0;
NetInfo._pu = 0;
NetInfo.upu = 0;
NetInfo.TcpMaxRetry = 1; //# sourceMappingURL=NetInfo.js.map