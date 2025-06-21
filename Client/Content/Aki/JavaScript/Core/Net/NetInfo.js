"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.NetInfo = void 0;
const PerfSight_1 = require("../PerfSight/PerfSight");
class NetInfo {
  static get RttMs() {
    return NetInfo.iY
  }
  static SetRttMs(t) {
    t < NetInfo.iY ? NetInfo.iY = t : NetInfo.iY = .9 * NetInfo.iY + .1 * t, PerfSight_1.PerfSight.IsEnable && PerfSight_1.PerfSight.PostNetworkLatency(t)
  }
  static get LoginTraceId() {
    return NetInfo.CEi
  }
  static set LoginTraceId(t) {
    NetInfo.CEi = t
  }
  static get Token() {
    return NetInfo.J_u
  }
  static set Token(t) {
    NetInfo.J_u = t
  }
  static get TcpPort() {
    return NetInfo.Z_u
  }
  static set TcpPort(t) {
    NetInfo.Z_u = t
  }
  static get DeviceId() {
    return NetInfo.e1u
  }
  static set DeviceId(t) {
    NetInfo.e1u = t
  }
  static get UdpPort() {
    return NetInfo.t1u
  }
  static set UdpPort(t) {
    NetInfo.t1u = t
  }
  static get TcpRatio() {
    return NetInfo.i1u
  }
  static set TcpRatio(t) {
    NetInfo.i1u = t
  }
  static get TcpRetry() {
    return NetInfo.r1u
  }
  static set TcpRetry(t) {
    NetInfo.r1u = t
  }
}(exports.NetInfo = NetInfo).iY = 0, NetInfo.CEi = void 0, NetInfo.J_u = void 0, NetInfo.Z_u = 0, NetInfo.e1u = void 0, NetInfo.t1u = 0, NetInfo.i1u = 0, NetInfo.r1u = 0, NetInfo.TcpMaxRetry = 1;
//# sourceMappingURL=NetInfo.js.map