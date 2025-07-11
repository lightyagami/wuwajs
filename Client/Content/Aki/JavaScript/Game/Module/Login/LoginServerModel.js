"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginServerModel = exports.RegionAndIpSt = exports.LocalPlayerIpLevelData = exports.CurrentRecommendInfo = exports.LoginPlayerInfo = exports.DEFAULTPING = undefined;
const UE = require("ue");
const Json_1 = require("../../../Core/Common/Json");
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController");
const PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const DEFAULTSERVERREGION = "America";
const SEASERVER = "SEA";
const CNSERVERNAME = "Default";
exports.DEFAULTPING = 9999;
class LoginPlayerInfo extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments);
    this.Code = 0;
    this.SdkLoginCode = 0;
    this.UserId = "";
    this.UserInfos = undefined;
    this.RecommendRegion = "";
  }
}
exports.LoginPlayerInfo = LoginPlayerInfo;
class UserRegionInfo {
  constructor() {
    this.Region = "";
    this.Level = 0;
    this.LastOnlineTime = -0;
  }
}
class CurrentRecommendInfo {
  constructor() {
    this.Index = 0;
    this.Ip = "";
  }
}
exports.CurrentRecommendInfo = CurrentRecommendInfo;
class LocalPlayerIpLevelData {
  constructor() {
    this.Region = "";
    this.Level = 0;
  }
}
exports.LocalPlayerIpLevelData = LocalPlayerIpLevelData;
class RegionAndIpSt {
  constructor() {
    this.Region = "";
    this.Ip = "";
  }
  Phrase(e, r) {
    this.Region = e;
    this.Ip = r;
  }
}
exports.RegionAndIpSt = RegionAndIpSt;
class LoginServerModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.DEi = new Map();
    this.REi = new Map();
    this.OnBeginSuggestServerData = undefined;
    this.CurrentSelectServerData = undefined;
    this.CurrentUiSelectSeverData = undefined;
    this.Eml = undefined;
  }
  GetCurrentSelectPayServerName() {
    let e = BaseConfigController_1.BaseConfigController.GetPublicValue("SdkArea");
    if (e !== "CN" && this.CurrentSelectServerData) {
      e = this.CurrentSelectServerData.Region;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Pay", 27, "海外支付区域", ["area", e]);
      }
    } else {
      e = CNSERVERNAME;
    }
    return e = StringUtils_1.StringUtils.IsEmpty(e) ? CNSERVERNAME : e;
  }
  GetCurrentSelectServerIp() {
    var e;
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() || PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
      if (ControllerHolder_1.ControllerHolder.LoginController.IsGlobalSdkLoginMode()) {
        if (this.CurrentSelectServerData) {
          return this.CurrentSelectServerData.ip;
        } else {
          return "";
        }
      } else if ((e = this.GetLoginServersByClientRegion()) && e.length > 0) {
        return e[0].ip;
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 27, "当前没有服务器，请检查CDN配置");
        }
        return "";
      }
    } else {
      return ModelManager_1.ModelManager.LoginModel.GetServerIp() ?? "";
    }
  }
  GetCurrentServerLoginUrl() {
    var e;
    if (ControllerHolder_1.ControllerHolder.LoginController.IsGlobalSdkLoginMode()) {
      if (this.CurrentSelectServerData) {
        return this.CurrentSelectServerData.LoginUrl;
      } else {
        return [];
      }
    } else if ((e = this.GetLoginServersByClientRegion()) && e.length > 0) {
      return e[0].LoginUrl;
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 21, "当前没有服务器，请检查CDN配置");
      }
      return [];
    }
  }
  GetCurrentServerLoginUrlByIndex(e) {
    var r = this.GetCurrentServerLoginUrl();
    if (r && r.length > 0) {
      if (e < r.length) {
        return r[e];
      } else {
        return r[0];
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 21, "没有可选的LoginUrl");
      }
      return "";
    }
  }
  GetCurrentSelectServerName() {
    var e;
    if (ControllerHolder_1.ControllerHolder.LoginController.IsGlobalSdkLoginMode()) {
      if (this.CurrentSelectServerData) {
        return this.CurrentSelectServerData.name;
      } else {
        return "";
      }
    } else if ((e = this.GetLoginServersByClientRegion()) && e.length > 0) {
      return e[0].name;
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 27, "当前没有服务器，请检查CDN配置");
      }
      return "";
    }
  }
  GetCurrentLoginServerId() {
    var e;
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() || PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
      if (ControllerHolder_1.ControllerHolder.LoginController.IsGlobalSdkLoginMode()) {
        if (this.CurrentSelectServerData) {
          return this.CurrentSelectServerData.id;
        } else {
          return "0";
        }
      } else if ((e = this.GetLoginServersByClientRegion()) && e.length > 0) {
        return e[0].id;
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 27, "当前没有服务器，请检查CDN配置");
        }
        return "0";
      }
    } else {
      return ModelManager_1.ModelManager.LoginModel.GetServerId() ?? "";
    }
  }
  GetLoginServersByClientRegion() {
    if (!this.Eml) {
      var e = BaseConfigController_1.BaseConfigController.GetLoginServers();
      if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().BlockServerArea()) {
        this.Eml = new Array();
        var r;
        var o = PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetSdkCountry();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 27, "锁区", ["currentCountryCode", o]);
        }
        for (const t of e) {
          if (t.Region && (r = ConfigManager_1.ConfigManager.LoginConfig.GetServerLimitConfig(t.Region)) && o && r.CountryCodes.includes(o)) {
            this.Eml.push(t);
          }
        }
        if (this.Eml.length === 0) {
          for (const i of e) {
            if (i.Region === SEASERVER) {
              this.Eml.push(i);
              break;
            }
          }
        }
      } else {
        this.Eml = e;
      }
    }
    return this.Eml;
  }
  SelectCurrentSelectServerByServerId(e, r) {
    ModelManager_1.ModelManager.LoginModel.SetServerIp(e, 1);
    e = this.GetLoginServersByClientRegion();
    if (e && e.length > 0) {
      for (const o of e) {
        if (o.id === r) {
          this.CurrentSelectServerData = o;
          break;
        }
      }
    }
    ModelManager_1.ModelManager.LoginModel.SetServerId(r);
    ModelManager_1.ModelManager.LoginModel?.SetServerName(this.CurrentSelectServerData?.name ?? "");
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 27, "选择服务器", ["serverId", r]);
    }
  }
  IsFirstLogin(e) {
    var r = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.SdkLastTimeLoginData);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Login", 27, "IsFirstLogin", ["IsFirstLogin", r?.get(e)], ["sdkId", e]);
    }
    return !r?.has(e);
  }
  LastTimeLoginData(e) {
    var r = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.SdkLastTimeLoginData);
    if (r?.has(e)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Login", 27, "LastTimeLoginData", ["result?.get(sdkUid).Ip", r?.get(e).Ip], ["sdkId", e], ["result?.get(sdkUid).Region", r?.get(e).Region]);
      }
      return r.get(e);
    }
  }
  SaveFirstLogin(e, r) {
    var o = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.SdkLastTimeLoginData);
    const t = new Map();
    o?.forEach((e, r) => {
      t.set(r, e);
    });
    o = new RegionAndIpSt();
    o.Phrase(r.Region, r.ip);
    t.set(e, o);
    LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.SdkLastTimeLoginData, t);
  }
  AddRegionPingValue(e, r) {
    this.REi.set(e, r);
  }
  RefreshIpPing(r, o) {
    var t = Array.from(this.REi.keys());
    var i = t.length;
    for (let e = 0; e < i; e++) {
      if (t[e].PingUrl === r) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Login", 27, "RefreshIpPing", [t[e].Region, o * 1000]);
        }
        this.REi.set(t[e], o * 1000);
      }
    }
  }
  GetPlayerLoginInfo(e) {
    return this.DEi.get(e);
  }
  SetPlayerLoginInfo(e, r) {
    this.DEi.set(e, r);
  }
  FindIpServerData(r) {
    var o = Array.from(this.REi.keys());
    var t = o.length;
    for (let e = 0; e < t; e++) {
      if (o[e].ip === r.Ip && o[e].Region === r.Region) {
        return o[e];
      }
    }
  }
  InitSuggestData(e, r) {
    this.CurrentSelectServerData = undefined;
    var e = this.UEi(e);
    this.CurrentSelectServerData = this.FindIpServerData(e);
    this.OnBeginSuggestServerData = this.CurrentSelectServerData;
    if (!this.OnBeginSuggestServerData) {
      if ((e = this.GetLoginServersByClientRegion()) && e.length > 0) {
        this.OnBeginSuggestServerData = e[0];
        this.CurrentSelectServerData = e[0];
      }
    }
    r?.(this.CurrentSelectServerData);
  }
  UEi(e) {
    var r = Array.from(this.REi.keys());
    var o = r.length;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Login", 27, "GetSuggestServerData");
    }
    var t = this.GetPlayerLoginInfo(e);
    if (!t) {
      if (e = this.LastTimeLoginData(e)) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Login", 27, "没有服务器信息拿本地登录信息", ["data", e.Region]);
        }
        return e;
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Login", 27, "没有拿到服务器推荐返回低Ping");
        }
        return this.AEi(DEFAULTSERVERREGION);
      }
    }
    let i = "";
    if (t.UserInfos.length > 0) {
      var n = t.UserInfos[0].LastOnlineTime;
      i = t.UserInfos[0].Region;
      var a = t.UserInfos.length;
      for (let e = 0; e < a; e++) {
        if (t.UserInfos[e].LastOnlineTime > n) {
          i = t.UserInfos[e].Region;
        }
      }
    }
    if (i !== "") {
      var g;
      var e = this.PEi(i);
      if (e) {
        (g = new RegionAndIpSt()).Phrase(e.Region, e.ip);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Login", 27, "recommendRegion", ["recommendRegion", i]);
        }
        return g;
      }
    }
    var s = t.RecommendRegion;
    for (let e = 0; e < o; e++) {
      if (r[e].Region === s) {
        if (this.xEi()) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Login", 27, "PingHigh", [r[e].Region, r[e].ip]);
          }
          (l = new RegionAndIpSt()).Phrase(r[e].Region, r[e].ip);
          return l;
        }
        var l = this.REi.get(r[e]);
        if (l && l > 100) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Login", 27, "this.RegionPingMap.get(keys[i]) > 100");
          }
          return this.AEi(DEFAULTSERVERREGION);
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Login", 27, "返回推荐");
        }
        var L = new RegionAndIpSt();
        L.Phrase(r[e].Region, r[e].ip);
        return L;
      }
    }
    return this.AEi(DEFAULTSERVERREGION);
  }
  PEi(r) {
    var o = Array.from(this.REi.keys());
    var t = o.length;
    for (let e = 0; e < t; e++) {
      if (o[e].Region === r) {
        return o[e];
      }
    }
  }
  xEi() {
    var r = Array.from(this.REi.keys());
    var o = r.length;
    for (let e = 0; e < o; e++) {
      var t = this.REi.get(r[e]);
      if (t && t < 100) {
        return false;
      }
    }
    return true;
  }
  AEi(r) {
    var o = Array.from(this.REi.keys());
    var t = o.length;
    let i = exports.DEFAULTPING;
    let n = "";
    var a = new RegionAndIpSt();
    for (let e = 0; e < t; e++) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Login", 27, "区域ping", ["ping", this.REi.get(o[e]).toString()]);
      }
      if (i > this.REi.get(o[e]) && (i = this.REi.get(o[e]), a.Phrase(o[e].Region, o[e].ip), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Login", 27, "尝试选择低Ping", [o[e].Region, i]);
      }
      if (o[e].Region === r) {
        n = o[e].ip;
      }
    }
    if (StringUtils_1.StringUtils.IsEmpty(a.Ip)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Login", 27, "找不到低ping，用默认服务器");
      }
      a.Phrase(r, n);
    }
    return a;
  }
  GetLoginLevel(e, r) {
    var o = this.GetPlayerLoginInfo(e);
    if (o) {
      var t = o.UserInfos?.length ?? 0;
      for (let e = 0; e < t; e++) {
        if (o.UserInfos[e]?.Region === r) {
          return o.UserInfos[e].Level;
        }
      }
      return 0;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Login", 27, "找不到ServerLevel", ["region", r]);
    }
    return this.wEi(e, r);
  }
  wEi(e, r) {
    var o = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.SdkLevelData);
    if (o?.has(e)) {
      var t = o.get(e);
      var i = t.length;
      for (let e = 0; e < i; e++) {
        if (t[e].Region === r) {
          return t[e].Level;
        }
      }
    }
    return 0;
  }
  GetCurrentArea() {
    var e = UE.KuroStaticLibrary.GetCultureRegion().split("-");
    var r = e.length;
    if (r > 1) {
      return e[r - 1];
    } else {
      return "US";
    }
  }
  SaveLocalRegionLevel(e, r, o) {
    var t = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.SdkLevelData);
    const i = new Map();
    t?.forEach((e, r) => {
      i.set(r, e);
    });
    let n = i.get(e);
    var a = (n = n || new Array()).length;
    let g = false;
    for (let e = 0; e < a; e++) {
      if (n[e].Region === r) {
        n[e].Level = o;
        g = true;
        break;
      }
    }
    if (!g) {
      (t = new LocalPlayerIpLevelData()).Region = r;
      t.Level = o;
      n.push(t);
    }
    i.set(e, n);
    LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.SdkLevelData, i);
  }
}
exports.LoginServerModel = LoginServerModel;
//# sourceMappingURL=LoginServerModel.js.map