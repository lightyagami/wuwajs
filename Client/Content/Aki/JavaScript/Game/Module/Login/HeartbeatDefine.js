"use strict";

var EBeginHeartbeat;
var EStopHeartbeat;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EStopHeartbeat = exports.EBeginHeartbeat = undefined;
(function (e) {
  e[e.GetLoginResponse = 0] = "GetLoginResponse";
  e[e.ReConnectSuccess = 1] = "ReConnectSuccess";
})(EBeginHeartbeat = exports.EBeginHeartbeat ||= {});
(function (e) {
  e[e.LogoutNotify = 0] = "LogoutNotify";
  e[e.BeforeGetToken = 1] = "BeforeGetToken";
  e[e.LoginStatusInit = 2] = "LoginStatusInit";
  e[e.BackLoginView = 3] = "BackLoginView";
  e[e.ReconnectStart = 4] = "ReconnectStart";
  e[e.BackLoginAndEnterGame = 5] = "BackLoginAndEnterGame";
})(EStopHeartbeat = exports.EStopHeartbeat ||= {}); //# sourceMappingURL=HeartbeatDefine.js.map