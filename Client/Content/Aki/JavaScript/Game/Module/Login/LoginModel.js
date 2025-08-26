"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginModel = exports.LoginNotice = exports.LoginNoticeEx = exports.ServerInfo = exports.ServerData = exports.ReconnectInfo = exports.DEFAULT_SERVER_IP = exports.STREAM_MAINLINE = exports.STREAM = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Info_1 = require("../../../Core/Common/Info");
const Json_1 = require("../../../Core/Common/Json");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const NetInfo_1 = require("../../../Core/Net/NetInfo");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ThirdPartySdkManager_1 = require("../../Manager/ThirdPartySdkManager");
const LoginDefine_1 = require("./Data/LoginDefine");
const Heartbeat_1 = require("./Heartbeat");
const HeartbeatDefine_1 = require("./HeartbeatDefine");
const LOADING_WIDGET_KEY = "loading_widget";
const BACK_TO_GAME_KEY = "back_to_game";
exports.STREAM = "Stream";
exports.STREAM_MAINLINE = "mainline";
exports.DEFAULT_SERVER_IP = "127.0.0.1";
class ReconnectInfo {
  constructor(t, e, i) {
    this.Token = "";
    this.Host = "";
    this.Port = 0;
    this.Token = t;
    this.Host = e;
    this.Port = i;
  }
}
exports.ReconnectInfo = ReconnectInfo;
class MapConfig {
  constructor(t, e) {
    this.MapId = 0;
    this.MapName = "";
    this.MapId = t;
    this.MapName = e;
  }
}
class ServerData {
  constructor(t) {
    this.Config = new ServerConfig();
    if (t) {
      this.Config = t;
    }
  }
  SetIp(t) {
    this.Config.Ip = t;
    return this;
  }
}
exports.ServerData = ServerData;
class ServerConfig extends Json_1.JsonObjBase {
  constructor(t = "", e = "", i = "", o = 0) {
    super();
    this.Ip = "";
    this.Port = "";
    this.Name = "";
    this.Order = 0;
    this.Ip = t;
    this.Port = e;
    this.Name = i;
    this.Order = o;
  }
}
class ServerInfo extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments);
    this.server = "";
    this.address = "";
    this.description = "";
    this.stream = "";
    this.editor = undefined;
    this.package = undefined;
    this.order = undefined;
  }
}
exports.ServerInfo = ServerInfo;
class LoginNoticeEx extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments);
    this.title = "";
    this.content = "";
    this.whiteList = undefined;
    this.startTimeMs = -0;
    this.endTimeMs = -0;
  }
}
exports.LoginNoticeEx = LoginNoticeEx;
class LoginNotice {
  constructor() {
    this.Id = "";
    this.WhiteLists = undefined;
    this.ModifyTime = -0;
    this.BeginTime = -0;
    this.EndTime = -0;
    this.Title = "";
    this.content = "";
  }
  Phrase(t) {
    this.WhiteLists = t.whiteList;
    this.BeginTime = t.startTimeMs / 1000;
    this.EndTime = t.endTimeMs / 1000;
    this.Title = t.title;
    this.content = t.content;
  }
}
exports.LoginNotice = LoginNotice;
class SdkLoginConfig {
  constructor(t = "", e = "", i = "") {
    this.Uid = "";
    this.UserName = "";
    this.Token = "";
    this.Uid = t;
    this.UserName = e;
    this.Token = i;
  }
  GetLoginUserNameWithUriEncode() {
    return encodeURIComponent(this.UserName);
  }
}
class SdkLoginInfo {
  constructor() {
    this.LoginCode = "";
    this.Uid = "";
    this.UserName = "";
  }
}
class LoginModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.BornMode = 1;
    this.BornLocation = undefined;
    this.Platform = "";
    this.QMi = undefined;
    this.XMi = undefined;
    this.$Mi = undefined;
    this.YMi = undefined;
    this.hGn = undefined;
    this.XK = LoginDefine_1.ELoginStatus.Init;
    this.JMi = undefined;
    this.zMi = false;
    this.ZMi = undefined;
    this.B9e = "";
    this.eEi = undefined;
    this.tEi = false;
    this.T1h = false;
    this.SmokeTestReady = false;
    this.CurrentIdStr = "";
    this.SdkAccountChangeNeedExitFlag = false;
    this.PlayStationGameAutoLoginId = "-1";
    this.iEi = 0;
    this.oEi = new Map();
    this.rEi = undefined;
    this.z1d = undefined;
    this.nEi = false;
    this.sEi = -0;
    this.aEi = 0;
    this.yX = undefined;
    this.rFn = undefined;
    this.oFn = "0";
    this.dPa = undefined;
    this.SdkAccessToken = "";
    this.SdkAccessTokenRunTime = 0;
    this.SdkAccessTokenCountingState = false;
    this.hEi = 0;
    this.LoginNotice = undefined;
    this.lEi = 0;
    this.ZIa = undefined;
    this.IsCopyAccount = false;
    this.LoginTimeStamp = -0;
    this.HealthTipTime = -0;
    this._Ei = 0;
    this.uEi = 0;
    this.Coa = undefined;
    this.goa = undefined;
    this.foa = undefined;
    this.cEi = undefined;
    this.mEi = 10;
    this.dEi = undefined;
    this.CEi = undefined;
    this.gEi = undefined;
    this.fEi = undefined;
    this.AutoLoginTimerIdInternal = undefined;
    this.twa = undefined;
    this.iwa = undefined;
    this.kza = undefined;
    this.Mla = undefined;
    this.Sla = 0;
    this.TryBackToGameMaxCount = 5;
  }
  get IsNewAccount() {
    return this.T1h;
  }
  get pEi() {
    return LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.LoginFailCount, 0);
  }
  set pEi(t) {
    LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.LoginFailCount, t);
  }
  get vEi() {
    return LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.NextLoginTime, 0);
  }
  set vEi(t) {
    LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.NextLoginTime, t);
  }
  get MEi() {
    return LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.ResetLoginFailCountTime, 0);
  }
  set MEi(t) {
    LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.ResetLoginFailCountTime, t);
  }
  get PublicJsonVersion() {
    return this.lEi;
  }
  set PublicJsonVersion(t) {
    this.lEi = t;
  }
  get PublicMiscVersion() {
    return this._Ei;
  }
  set PublicMiscVersion(t) {
    this._Ei = t;
  }
  get PublicUniverseEditorVersion() {
    return this.uEi;
  }
  set PublicUniverseEditorVersion(t) {
    this.uEi = t;
  }
  get LauncherVersion() {
    return this.Coa;
  }
  set LauncherVersion(t) {
    this.Coa = t;
  }
  get ResourceVersion() {
    return this.goa;
  }
  set ResourceVersion(t) {
    this.goa = t;
  }
  get VerifyConfigVersionHandle() {
    return this.foa;
  }
  set VerifyConfigVersionHandle(t) {
    this.foa = t;
  }
  OnInit() {
    this.BornMode = 1;
    this.BornLocation = new Protocol_1.Aki.Protocol.Gks();
    this.XK = LoginDefine_1.ELoginStatus.Init;
    this.hEi = 0;
    this.twa = UE.KuroStaticLibrary.GetDeviceCPU();
    this.iwa = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIDeviceName();
    this.kza = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIDriverDate();
    if (!this.kza?.length) {
      this.kza = "Unknown";
    }
    var t = CommonParamById_1.configCommonParamById.GetIntConfig("HealthTipTime") ?? 0;
    this.HealthTipTime = t;
    return true;
  }
  OnClear() {
    this.XK = LoginDefine_1.ELoginStatus.Init;
    this.hEi = 0;
    this.QMi = [];
    this.XMi = [];
    this.$Mi = [];
    this.YMi = [];
    this.XK = LoginDefine_1.ELoginStatus.Init;
    this.zMi = false;
    this.B9e = "";
    this.eEi = undefined;
    this.tEi = false;
    this.JMi = undefined;
    this.lEi = 0;
    this._Ei = 0;
    this.uEi = 0;
    this.Coa = undefined;
    this.goa = undefined;
    this.twa = undefined;
    this.iwa = undefined;
    this.kza = undefined;
    this.iEi = 0;
    this.oEi.clear();
    return true;
  }
  InitConfig() {
    if (!this.QMi || !this.XMi || !this.$Mi) {
      this.QMi = new Array();
      this.XMi = new Array();
      this.$Mi = new Array();
      this.YMi = new Array();
      var t = ConfigManager_1.ConfigManager.LoginConfig.GetAllInstanceDungeon();
      if (t) {
        for (const e of t) {
          let t = ConfigManager_1.ConfigManager.LoginConfig.GetInstanceDungeonNameById(e.MapName);
          if (t === undefined) {
            t = "";
          }
          this.QMi.push(new MapConfig(e.Id, t));
        }
      }
    }
  }
  AddServerInfoByCdn() {
    if (this.$Mi) {
      var t = ModelManager_1.ModelManager.LoginServerModel.GetLoginServersByClientRegion();
      if (t) {
        if (t.length <= 0 && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 10, "CDN的服务器数据列表为空");
        }
        for (const i of t) {
          var e = new ServerConfig(i.ip, LoginDefine_1.DEFAULTPORT, i.name, 0);
          this.$Mi.push(e);
          this.YMi.push(new ServerData(e));
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Login", 10, "拿不到CDN返回的服务器数据");
      }
    }
  }
  AddExtraServer() {
    var t = UE.BlueprintPathsLibrary.ProjectConfigDir() + "/ServerConfig.json";
    var e = UE.KuroStaticLibrary.LoadFileToStringArray(t);
    if (!(e.Num() <= 0)) {
      for (let t = 0; t < e.Num(); ++t) {
        var i = Json_1.Json.Parse(e.Get(t));
        this.$Mi.push(i);
      }
    }
  }
  AddServerInfos(t) {
    if (this.$Mi) {
      var e = Info_1.Info.IsPlayInEditor;
      for (const i of t) {
        if (e && i.editor || !e && i.package) {
          this.$Mi.push(new ServerConfig(i.address, LoginDefine_1.DEFAULTPORT, i.description, i.order));
        }
      }
    }
  }
  AddDataTableServers() {
    if (this.$Mi && GlobalData_1.GlobalData.World) {
      for (const t of DataTableUtil_1.DataTableUtil.GetDataTableAllRow(14)) {
        this.$Mi.push(new ServerConfig(t.IP, t.Port, t.Name, t.Order));
      }
    }
  }
  CleanConfig() {
    this.QMi = undefined;
    this.XMi = undefined;
    this.$Mi = undefined;
    this.rEi = undefined;
    this.YMi = undefined;
  }
  SetCreatePlayerTime(t) {
    this.sEi = t;
  }
  GetCreatePlayerTime() {
    return this.sEi;
  }
  SetCreatePlayerId(t) {
    this.aEi = t;
  }
  GetCreatePlayerId() {
    return this.aEi;
  }
  GetServerIp() {
    return this.yX;
  }
  GetSourcePlayerAccount() {
    return this.ZIa;
  }
  SetServerIp(t, e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 8, "保存服务器IP", ["serverIp", t], ["reason", e]);
    }
    this.yX = t;
  }
  TrySetCustomServerPort(t, e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 8, "自定义服务器Port", ["port", t], ["reason", e]);
    }
    this.hGn = t;
  }
  TryGetRealServerPort() {
    var t = this.GetCustomServerPort();
    if (t) {
      this.hGn = undefined;
      return t;
    } else {
      return this.GetServerPort();
    }
  }
  GetCustomServerPort() {
    return this.hGn;
  }
  GetServerPort() {
    var t = "5500";
    var e = UE.KismetSystemLibrary.GetCommandLine().split(" ");
    var i = e.indexOf("-LocalGameServerStartPort");
    if (i === -1 || i + 1 >= e.length || (e = parseInt(e[i + 1], 10), isNaN(e))) {
      return t;
    } else {
      return (e + 1).toString();
    }
  }
  GetServerName() {
    return this.rFn;
  }
  SetServerName(t) {
    this.rFn = t;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 27, "当前选择服务器Name", ["serverId", t]);
    }
  }
  GetServerId() {
    return this.oFn;
  }
  SetServerId(t) {
    this.oFn = t;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSetLoginServerId);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 27, "当前选择服务器Id", ["serverId", t]);
    }
  }
  GetSingleMapId() {
    var t = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.SingleMapId, -1);
    if (t === -1) {
      return undefined;
    } else {
      return t;
    }
  }
  SetSingleMapId(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 8, "保存单人副本id", ["singleMapId", t]);
    }
    LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.SingleMapId, t);
  }
  GetMultiMapId() {
    var t = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.MultiMapId, -1);
    if (t === -1) {
      return undefined;
    } else {
      return t;
    }
  }
  SetMultiMapId(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 8, "保存多人副本id", ["multiMapId", t]);
    }
    LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.MultiMapId, t);
  }
  GetAccount() {
    return LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.Account, "");
  }
  SetAccount(t) {
    LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.Account, t);
    this.AddRecentlyAccount(t);
    ThirdPartySdkManager_1.ThirdPartySdkManager.SetUserInfo(t);
  }
  SetSourceAccount(t) {
    this.ZIa = t;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 5, "设置复制账号", ["目标账号:", t]);
    }
  }
  GetSelectBoxActive() {
    return LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.SelectBoxActive, true) ?? false;
  }
  SetSelectBoxActive(t) {
    LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.SelectBoxActive, t);
  }
  GetAutoOpenLoginView() {
    return this.zMi;
  }
  SetAutoOpenLoginView(t) {
    this.zMi = t;
  }
  GetLoginStatus() {
    return this.XK;
  }
  GetLastFailStatus() {
    return this.JMi;
  }
  SetLoginStatus(t, e = 0) {
    if (t !== this.XK) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 8, "LoginProcedure-登录状态变化", ["Before", LoginDefine_1.ELoginStatus[this.XK]], ["After", LoginDefine_1.ELoginStatus[t]]);
      }
      if (this.XK !== LoginDefine_1.ELoginStatus.Init && t === LoginDefine_1.ELoginStatus.Init) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Login", 21, "LoginProcedure-登录失败");
        }
        Heartbeat_1.Heartbeat.StopHeartBeat(HeartbeatDefine_1.EStopHeartbeat.LoginStatusInit);
        this.JMi = this.XK;
      } else {
        this.JMi = undefined;
      }
      this.XK = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LoginStatusChange);
    }
  }
  IsLoginStatus(t) {
    return this.XK === t;
  }
  SetSdkLoginState(t) {
    if ((this.hEi = t) === 0) {
      this.PlayStationGameAutoLoginId = "-1";
    }
  }
  SetSdkLoginInfo(t, e, i) {
    this.dPa ||= new SdkLoginInfo();
    this.dPa.LoginCode = t;
    this.dPa.Uid = e;
    this.dPa.UserName = i;
  }
  GetSdkLoginInfo() {
    return this.dPa;
  }
  IsSdkLoggedIn() {
    return this.hEi === 1;
  }
  IsSdkLoggingIn() {
    return this.hEi === 2;
  }
  IsSdkLogout() {
    return this.hEi === 0;
  }
  GetSingleMapList() {
    return this.QMi;
  }
  GetSingleMapIp(t) {
    if (t < this.QMi.length) {
      return this.QMi[t].MapId;
    }
  }
  GetServerInfoList() {
    this.$Mi?.sort((t, e) => t.Order - e.Order);
    return this.$Mi;
  }
  GetServerDataList() {
    return this.YMi;
  }
  GetServerInfo(t) {
    if (t < this.$Mi.length) {
      return this.$Mi[t];
    }
  }
  HasReconnectInfo() {
    return this.ZMi !== undefined;
  }
  SetReconnectInfo(t, e, i) {
    this.ZMi = new ReconnectInfo(t, e, i);
  }
  SetReconnectToken(t) {
    if (this.ZMi) {
      this.ZMi.Token = t;
    }
  }
  GetReconnectToken() {
    if (this.ZMi !== undefined) {
      return this.ZMi.Token;
    }
  }
  GetReconnectHost() {
    if (this.ZMi !== undefined) {
      return this.ZMi.Host;
    }
  }
  GetReconnectPort() {
    if (this.ZMi !== undefined) {
      return this.ZMi.Port;
    }
  }
  GetPlayerName() {
    return this.B9e;
  }
  SetPlayerName(t) {
    this.B9e = t;
  }
  GetPlayerSex() {
    return this.eEi;
  }
  SetPlayerSex(t) {
    this.eEi = t;
  }
  IsPlayerSexValid(t) {
    let e = t;
    return (e = t === undefined ? this.eEi : e) === LoginDefine_1.ELoginSex.Boy || e === LoginDefine_1.ELoginSex.Girl;
  }
  GetHasCharacter() {
    return this.tEi;
  }
  SetHasCharacter(t) {
    this.tEi = t;
  }
  SetIsNewAccount(t) {
    this.T1h = t;
  }
  CleanCreateData() {
    this.tEi = false;
    this.B9e = "";
    this.eEi = undefined;
  }
  SetRpcHttp(t, e) {
    const i = ++this.iEi;
    e = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      if (this.IsLoginStatus(LoginDefine_1.ELoginStatus.LoginHttp)) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Login", 8, "http请求超时", ["rpcId", i]);
        }
        this.oEi.delete(i);
        t();
      }
    }, e);
    this.oEi.set(i, e);
    return i;
  }
  CleanRpcHttp(t) {
    var e = this.oEi.get(t);
    return !!e && (TimerSystem_1.GameplayTimerSystem.Remove(e), this.oEi.delete(t), true);
  }
  AddLoginFailCount() {
    if (this.pEi === 0) {
      t = ConfigManager_1.ConfigManager.LoginConfig.GetLoginFailResetTime();
      this.EEi(t);
    }
    this.SetLoginFailCount(this.pEi + 1);
    var t = ConfigManager_1.ConfigManager.LoginConfig.GetLoginFailParam(this.pEi);
    this.SEi(t);
  }
  IsThisTimeCanLogin() {
    var t = Date.now() * 0.001;
    if (this.pEi > 0) {
      var e = ConfigManager_1.ConfigManager.LoginConfig.GetLoginFailResetTime();
      if (t >= this.MEi + e) {
        this.CleanLoginFailCount(LoginDefine_1.ECleanFailCountWay.RefreshTime);
        return true;
      }
    }
    e = this.vEi + ConfigManager_1.ConfigManager.LoginConfig.GetLoginFailParam(this.pEi);
    return e <= t || (t = new Date(e * 1000), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Login", 8, "下次可登录的时间戳", ["NextLoginTime", TimeUtil_1.TimeUtil.DateFormat(t)]), false);
  }
  CleanLoginFailCount(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Login", 8, "清空登录失败信息", ["way", LoginDefine_1.ECleanFailCountWay[t]]);
    }
    this.SetLoginFailCount(0, false);
    this.SEi(0, false);
    this.EEi(0, false);
  }
  SetLoginFailCount(t, e = true) {
    this.pEi = t;
    if (e && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Login", 8, "登录失败次数增加", ["LoginFailCount", this.pEi]);
    }
  }
  SEi(t, e = true) {
    this.vEi = Date.now() * 0.001;
    if (e && (e = new Date((this.vEi + t) * 1000), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Login", 8, "设置下次可登录时间", ["NextLoginTime", TimeUtil_1.TimeUtil.DateFormat(e)]);
    }
  }
  EEi(t, e = true) {
    this.MEi = Date.now() * 0.001;
    if (e && (e = new Date((this.MEi + t) * 1000), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Login", 8, "设置下次重置登录失败时间", ["ResetLoginFailCountTime", TimeUtil_1.TimeUtil.DateFormat(e)]);
    }
  }
  FixLoginFailInfo() {
    var t;
    var e = Date.now() * 0.001;
    if (this.MEi > e) {
      t = ConfigManager_1.ConfigManager.LoginConfig.GetLoginFailResetTime();
      this.EEi(t);
    }
    if (this.vEi > e) {
      t = ConfigManager_1.ConfigManager.LoginConfig.GetLoginFailParam(this.pEi);
      this.SEi(t);
    }
  }
  SetSdkLoginConfig(t, e, i) {
    this.rEi = new SdkLoginConfig(t, e, i);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 27, "设置SDK登录配置", ["uId", t], ["userName", e]);
    }
  }
  CheckLoginToGameServerSdkConfigIfSame() {
    if (this.rEi && this.z1d) {
      if (this.rEi.Uid !== this.z1d.Uid || this.rEi.UserName !== this.z1d.UserName || this.rEi.Token !== this.z1d.Token) {
        this.SdkAccountChangeNeedExitFlag = true;
      } else {
        this.SdkAccountChangeNeedExitFlag = false;
      }
    }
  }
  CacheCurrentSdkLoginConfig() {
    if (this.rEi) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 27, "缓存当前登录服务器SDK登录配置", ["uId", this.rEi.Uid], ["userName", this.rEi.UserName]);
      }
      this.z1d = new SdkLoginConfig(this.rEi.Uid, this.rEi.UserName, this.rEi.Token);
    } else {
      this.z1d = undefined;
    }
  }
  GetSdkLoginConfig() {
    return this.rEi;
  }
  GetLoginUid() {
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() || PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
      if (this.rEi) {
        return this.rEi.Uid;
      } else {
        return "";
      }
    } else {
      return this.GetAccount();
    }
  }
  GetLoginUserName() {
    if (this.rEi) {
      return this.rEi.UserName;
    } else {
      return "";
    }
  }
  GetLoginUserNameWithUriEncode() {
    if (this.rEi) {
      return this.rEi.GetLoginUserNameWithUriEncode();
    } else {
      return "";
    }
  }
  GetLoginToken() {
    if (this.rEi) {
      return this.rEi.Token;
    } else {
      return "";
    }
  }
  set LogoutNotify(t) {
    this.cEi = t;
  }
  get LogoutNotify() {
    return this.cEi;
  }
  SetTodayFirstTimeLogin(t) {
    this.nEi = t;
  }
  GetTodayFirstTimeLogin() {
    return this.nEi;
  }
  GetLastLoginTime() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.LoginTime, 0);
  }
  SetLastLoginTime(t) {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.LoginTime, t);
  }
  AddRecentlyAccount(i) {
    if (!StringUtils_1.StringUtils.IsEmpty(i)) {
      for (this.dEi ||= []; this.dEi.length >= this.mEi;) {
        this.dEi.splice(0, 1);
      }
      let e = -1;
      for (let t = 0; t < this.dEi.length; t++) {
        if (this.dEi[t] === i) {
          e = t;
          break;
        }
      }
      if (e !== -1) {
        this.dEi.splice(e, 1);
      }
      this.dEi.push(i);
    }
  }
  InitRecentlyAccountList() {
    this.dEi = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.RecentlyAccountList);
    this.dEi ||= [];
  }
  GetRecentlyAccountList() {
    return this.dEi;
  }
  SaveRecentlyAccountList() {
    if (this.dEi) {
      LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.RecentlyAccountList, this.dEi);
    }
  }
  get LoginTraceId() {
    return this.CEi;
  }
  set LoginTraceId(t) {
    this.CEi = t;
    NetInfo_1.NetInfo.LoginTraceId = t;
  }
  CreateLoginPromise() {
    this.gEi = new CustomPromise_1.CustomPromise();
  }
  FinishLoginPromise() {
    this.gEi?.SetResult(undefined);
  }
  async WaitLoginPromise() {
    await this.gEi?.Promise;
    this.gEi = undefined;
  }
  HasLoginPromise() {
    return this.gEi !== undefined;
  }
  CreateAutoLoginPromise() {
    this.fEi = new CustomPromise_1.CustomPromise();
  }
  ClearAutoLoginPromise() {
    this.fEi = undefined;
  }
  FinishAutoLoginPromise(t) {
    this.fEi.SetResult(t);
  }
  async WaitAutoLoginPromise() {
    var t = await this.fEi?.Promise;
    this.fEi = undefined;
    return t;
  }
  HasAutoLoginPromise() {
    return this.fEi !== undefined;
  }
  get AutoLoginTimerId() {
    return this.AutoLoginTimerIdInternal;
  }
  set AutoLoginTimerId(t) {
    this.AutoLoginTimerIdInternal = t;
  }
  ClearAutoLoginTimerId() {
    if (this.AutoLoginTimerId !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.AutoLoginTimerId);
      this.AutoLoginTimerId = undefined;
    }
  }
  GetWaterMarkPath() {
    var t = UE.KuroLauncherLibrary.GameSavedDir() + "Logs/TmpData";
    if (Info_1.Info.IsPs5Platform()) {
      return t.toLowerCase();
    } else {
      return t;
    }
  }
  CpuInfo() {
    return this.twa;
  }
  DeviceInfo() {
    return this.iwa;
  }
  DriverDate() {
    return this.kza;
  }
  HasBackToGameData() {
    return !!this.Mla || UE.KuroVariableFunctionLibrary.HasStringValue(BACK_TO_GAME_KEY);
  }
  SaveKuroVariableStringValue(t, e) {
    return !!UE.KuroVariableFunctionLibrary.SetStringValue(t, e) || (Log_1.Log.CheckError() && Log_1.Log.Error("Login", 27, "[BackToGame] SetStringValue失败", ["key", t], ["jsonData", e]), false);
  }
  SaveKuroVariableObject(t, e) {
    if (e?.IsValid()) {
      return !!UE.KuroVariableFunctionLibrary.SetObject(t, e) || (Log_1.Log.CheckError() && Log_1.Log.Error("Login", 27, "[BackToGame] SetObject失败", ["key", t]), false);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Login", 27, "[BackToGame] SaveKuroVariableObject Object无效", ["key", t]);
      }
      return false;
    }
  }
  SaveBackToGameData(t, e = false) {
    var i = JSON.stringify(t, (t, e) => {
      if (t !== "LoadingWidget") {
        return e;
      }
    });
    if (e && (UE.KuroVariableFunctionLibrary.HasStringValue(BACK_TO_GAME_KEY) && UE.KuroVariableFunctionLibrary.RemoveStringValue(BACK_TO_GAME_KEY), UE.KuroVariableFunctionLibrary.HasObject(LOADING_WIDGET_KEY))) {
      UE.KuroVariableFunctionLibrary.RemoveObject(LOADING_WIDGET_KEY);
    }
    if (t.LoadingWidget?.IsValid() && !this.SaveKuroVariableObject(LOADING_WIDGET_KEY, t.LoadingWidget)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Login", 3, "[BackToGame] SetObject重复设置参数", ["backToGame", i], ["key", LOADING_WIDGET_KEY]);
      }
      return false;
    } else if (this.SaveKuroVariableStringValue(BACK_TO_GAME_KEY, i)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Login", 27, "[BackToGame] 保存BackToGameData", ["backToGame", i]);
      }
      this.Mla = t;
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Login", 3, "[BackToGame] SetStringValue重复设置参数", ["backToGame", i], ["key", BACK_TO_GAME_KEY]);
      }
      return false;
    }
  }
  RemoveBackToGameData() {
    if (this.Mla) {
      UE.KuroVariableFunctionLibrary.RemoveObject(LOADING_WIDGET_KEY);
      if (!UE.KuroVariableFunctionLibrary.RemoveStringValue(BACK_TO_GAME_KEY)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Login", 3, "[BackToGame] RemoveStringValue失败", ["key", BACK_TO_GAME_KEY]);
        }
        return false;
      }
      this.Mla = undefined;
      this.Sla = 0;
      AudioSystem_1.AudioSystem.SetState("reconnect_auto_login", "not_in_auto_login");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.FEstimation.Enable 1");
    }
    return true;
  }
  GetBackToGameData() {
    if (this.Mla) {
      return this.Mla;
    }
    var t;
    var e = (0, puerts_1.$ref)("");
    if (UE.KuroVariableFunctionLibrary.GetStringValue(BACK_TO_GAME_KEY, e) && (e = (0, puerts_1.$unref)(e))?.length) {
      e = JSON.parse(e);
      t = (0, puerts_1.$ref)(undefined);
      if (UE.KuroVariableFunctionLibrary.GetObject(LOADING_WIDGET_KEY, t)) {
        e.LoadingWidget = (0, puerts_1.$unref)(t);
      }
      this.Mla = e;
      return this.Mla;
    }
  }
  BackToGameFailCount() {
    return this.Sla;
  }
  CheckBackToGameFailCount() {
    ++this.Sla;
    return this.Sla <= this.TryBackToGameMaxCount;
  }
}
exports.LoginModel = LoginModel;
//# sourceMappingURL=LoginModel.js.map