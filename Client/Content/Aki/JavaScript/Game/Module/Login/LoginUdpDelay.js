"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginUdpDelay = undefined;
const puerts_1 = require("puerts");
const Log_1 = require("../../../Core/Common/Log");
const UE = require("ue");
const ModelManager_1 = require("../../Manager/ModelManager");
const Http_1 = require("../../../Core/Http/Http");
const ThinkingAnalyticsReporter_1 = require("../LogReport/ThinkingAnalyticsReporter");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const CLIENT_IP_KEY = "clientIp";
const TEST_PORT = 5500;
const REPORT_KEY = "UDP_PROBE";
function IsIPv4(e) {
  return /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/.test(e);
}
function IsIPv6(e) {
  var o;
  var n;
  var i;
  var r;
  return !!e && !e.includes(".") && !([r, o] = e.split("::"), (e.match(/::/g) || []).length > 1) && !(n = r ? r.split(":") : [], i = o ? o.split(":") : [], !n.every(e = e => e.length > 0 && /^[0-9a-fA-F]{1,4}$/.test(e))) && !!i.every(e) && (r = n.length + i.length, o === undefined ? r === 8 : r < 8);
}
function IsDomain(e) {
  return /^(?=.{1,253}$)(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}$/.test(e);
}
function GetAddressType(e) {
  if (e = e.trim()) {
    if (IsIPv4(e)) {
      return "IPv4";
    } else if (IsIPv6(e)) {
      return "IPv6";
    } else if (IsDomain(e)) {
      return "Domain";
    } else {
      return "Unknown";
    }
  } else {
    return "Unknown";
  }
}
async function GetDomianIp(r) {
  return new Promise(n => {
    const i = (e, o) => {
      if (e !== 0 && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 98, `DNSResolution failed for ${r}, error code: ${e}`);
      }
      n(o);
      (0, puerts_1.releaseManualReleaseDelegate)(i);
    };
    UE.KuroDNS.DNSResolution(r, new UE.FName(""), (0, puerts_1.toManualReleaseDelegate)(i));
  });
}
async function GetIP(e) {
  return (await Promise.all(e.map(async o => {
    var n = await GetDomianIp(o.ip);
    var i = [];
    for (let e = 0; e < n.Num(); e++) {
      i.push({
        first: o.ip,
        second: {
          ip: n.Get(e),
          port: o.port
        }
      });
    }
    return i;
  }))).flat();
}
class LoginUdpDelay {
  static async Start() {
    this.SGg();
    await this.vGg();
    await this.yGg();
    LoginUdpDelay.tWr();
  }
  static async vGg() {
    return new Promise(i => {
      let e;
      var o;
      if ((e = ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() || PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn ? ModelManager_1.ModelManager.LoginServerModel.GetCurrentSelectServerIp() : ModelManager_1.ModelManager.LoginModel.GetServerIp()) === undefined || e === "") {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 98, "server ip is undefined");
        }
        i();
      } else {
        o = e.startsWith("http") ? e + "/api/ping" : `http://${e}:${TEST_PORT}/api/ping`;
        Http_1.Http.Get(o, new Map([["Content-Type", "application/json"]]), (e, o, n) => {
          if (e) {
            e = JSON.parse(n);
            LoginUdpDelay.MGg = e[CLIENT_IP_KEY];
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Login", 98, "get client ip success");
            }
          } else if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Login", 98, "get client ip failed, http code: " + o);
          }
          i();
        });
      }
    });
  }
  static async yGg() {
    var o = BaseConfigController_1.BaseConfigController.GetCdnReturnConfigInfo();
    if (o === undefined) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 98, "udp delay config is undefined");
      }
    } else {
      let e;
      e = ControllerHolder_1.ControllerHolder.LoginController.IsGlobalSdkLoginMode() ? ModelManager_1.ModelManager.LoginServerModel.CurrentSelectServerData.Region ?? "" : "CN";
      o = o.UdpDelay?.[e];
      if (o === undefined) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 98, "not found udp delay config for region: " + e);
        }
      } else {
        var n = [];
        for (const r of (LoginUdpDelay.EGg = o).Probe) {
          var i = GetAddressType(r.ip);
          if (i === "IPv4" || i === "IPv6") {
            LoginUdpDelay.b3g.push({
              first: r.ip,
              second: r
            });
          } else if (i === "Domain") {
            n.push(r);
          } else if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Login", 98, `invalid udp probe address: ${r.ip}, skip`);
          }
        }
        o = await GetIP(n);
        LoginUdpDelay.b3g.push(...o);
      }
    }
  }
  static SGg() {
    var e = ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig()?.Uid ?? "";
    LoginUdpDelay.Lgu = e + "_" + UE.KismetGuidLibrary.NewGuid().ToString();
  }
  static IGg(e) {
    e = {
      traceId: LoginUdpDelay.Lgu,
      clientIp: LoginUdpDelay.MGg,
      timestamp: e
    };
    return JSON.stringify(e);
  }
  static tWr() {
    var e;
    if (LoginUdpDelay.EGg !== undefined && LoginUdpDelay.EGg.ProbeOpen) {
      if (LoginUdpDelay.IRe !== undefined) {
        TimerSystem_1.RealTimeTimerSystem.Remove(LoginUdpDelay.IRe);
        LoginUdpDelay.IRe = undefined;
      }
      (e = () => {
        for (const i of LoginUdpDelay.b3g) {
          const r = Date.now();
          var e = LoginUdpDelay.IGg(r);
          const a = (e, o) => {
            var n;
            if (e) {
              e = Date.now() - r;
              n = {
                traceId: LoginUdpDelay.Lgu,
                clientIp: LoginUdpDelay.MGg,
                serverIp: i.second.ip,
                port: i.second.port,
                cdnCfg: i.first,
                delay: e
              };
              ThinkingAnalyticsReporter_1.ThinkingAnalyticsReporter.Report(REPORT_KEY, JSON.stringify(n));
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Login", 98, `udp delay ip: ${i.second.ip}, ${e} ms, cdn config: ${i.first}, traceId: ${LoginUdpDelay.Lgu}`);
              }
            } else if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Login", 98, `udp delay failed, msg: ${o}, ip: ${i.second.ip}, cdn config: ${i.first}`);
            }
            (0, puerts_1.releaseManualReleaseDelegate)(a);
          };
          var o = (0, puerts_1.toManualReleaseDelegate)(a);
          UE.KuroUdp.SendUdpMessage(i.second.ip, i.second.port, e, 512, o);
        }
      })();
      LoginUdpDelay.IRe = TimerSystem_1.RealTimeTimerSystem.Forever(e, LoginUdpDelay.EGg.ProbeInterval * 1000, 1, undefined, undefined, false);
    }
  }
}
(exports.LoginUdpDelay = LoginUdpDelay).MGg = "anonymous";
LoginUdpDelay.Lgu = "";
LoginUdpDelay.b3g = [];
LoginUdpDelay.IRe = undefined; //# sourceMappingURL=LoginUdpDelay.js.map