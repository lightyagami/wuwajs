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
    return NetInfo.svu;
  }
  static set Token(t) {
    NetInfo.svu = t;
  }
  static get TcpPort() {
    return NetInfo.avu;
  }
  static set TcpPort(t) {
    NetInfo.avu = t;
  }
  static get DeviceId() {
    return NetInfo.hvu;
  }
  static set DeviceId(t) {
    NetInfo.hvu = t;
  }
  static get UdpPort() {
    return NetInfo.lvu;
  }
  static set UdpPort(t) {
    NetInfo.lvu = t;
  }
  static get TcpRatio() {
    return NetInfo._vu;
  }
  static set TcpRatio(t) {
    NetInfo._vu = t;
  }
  static get TcpRetry() {
    return NetInfo.uvu;
  }
  static set TcpRetry(t) {
    NetInfo.uvu = t;
  }
  static get DisableCrc() {
    return NetInfo.TGd;
  }
  static set DisableCrc(t) {
    this.TGd = t;
  }
}
(exports.NetInfo = NetInfo).iY = 0;
NetInfo.CEi = undefined;
NetInfo.svu = undefined;
NetInfo.avu = 0;
NetInfo.hvu = undefined;
NetInfo.lvu = 0;
NetInfo._vu = 0;
NetInfo.uvu = 0;
NetInfo.TGd = false;
NetInfo.TcpMaxRetry = 1; //# sourceMappingURL=NetInfo.js.map