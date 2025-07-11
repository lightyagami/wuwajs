"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlatformSdkBase = exports.QueryProductSt = exports.SharePlatformSt = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const ue_1 = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Json_1 = require("../../../Core/Common/Json");
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController");
const Platform_1 = require("../../../Launcher/Platform/Platform");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const PublicUtil_1 = require("../../Common/PublicUtil");
const TimeUtil_1 = require("../../Common/TimeUtil");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LogReportDefine_1 = require("../../Module/LogReport/LogReportDefine");
const KuroSdkData_1 = require("../KuroSdkData");
const KuroSdkReport_1 = require("../KuroSdkReport");
const TIMEGAP = 1000;
const WEBVIEWCD = 5000;
const ONEYEARTIME = 31536000;
class SharePlatformSt {
  constructor() {
    this.PlatformId = undefined;
    this.IconUrl = undefined;
  }
}
exports.SharePlatformSt = SharePlatformSt;
class QueryProductSt {
  constructor() {
    this.ChannelGoodId = undefined;
    this.Currency = undefined;
    this.CurrencyCode = undefined;
    this.GoodId = undefined;
    this.Name = undefined;
    this.Desc = undefined;
    this.Price = undefined;
  }
}
exports.QueryProductSt = QueryProductSt;
class PlatformSdkBase {
  constructor() {
    this.GSe = undefined;
    this.NSe = undefined;
    this.LastOpenTime = 0;
    this.LastOpenPostViewTime = 0;
    this.FeedBackSt = "{0}?token={1}&svr_id={2}&uid={3}&user_name={4}&role_name={5}&role_id={6}&lang={7}";
    this.CurrentDid = "";
    this.GetSharePlatformCallBackList = new Array();
    this.kSe = false;
    this.FSe = false;
    this.CurrentCustomerShowState = false;
    this.VSe = e => {
      e = e === 1;
      ControllerHolder_1.ControllerHolder.KuroSdkController.SetPostWebViewRedPointState(e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkPostWebViewRedPointRefresh);
    };
  }
  Init() {
    this.HSe();
    this.BindProtocolListener();
    this.BindShareResultListener();
    this.KuroSdkExitBindFunction();
    this.KuroSdkBindRedPointFunction(this.VSe);
    this.KuroSdkQueryProductBindFunction();
    this.KuroDeepLinkBindFunction();
    this.KuroGameWinStateBindFunction();
    this.BindSpecialEvent();
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      this.KSe();
    }
    this.SetGamePadMode(Info_1.Info.IsInGamepad());
    this.CurrentDid = ue_1.KuroSDKManager.GetBasicInfo().DeviceId;
  }
  KSe() {
    if (UE.KuroLauncherLibrary.IsFirstIntoLauncher()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("KuroSdk", 27, "KuroSdk:StartInitProgress");
      }
      ue_1.KuroSDKManager.SetIfGlobalSdk(ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk());
      this.SetFont();
      this.NSe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
        this.QSe();
      }, TIMEGAP);
    } else {
      ue_1.KuroSDKManager.Get().LogoutDelegate.Clear();
      if (!ModelManager_1.ModelManager.LoginModel.HasBackToGameData()) {
        this.SdkLogout();
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkInitDone);
    }
  }
  QSe() {
    if (ue_1.KuroSDKManager.GetSdkInitState()) {
      ue_1.KuroSDKManager.SetWindowsMode(false);
      this.XSe();
      ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(16);
      ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(10);
      if (Platform_1.Platform.IsWindowsPlatform() && ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()) {
        this.GSe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
          this.$Se();
        }, TIMEGAP);
      }
      if (this.NSe !== undefined) {
        TimerSystem_1.GameplayTimerSystem.Remove(this.NSe);
        this.NSe = undefined;
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkInitDone);
    }
  }
  OnInit() {}
  XSe() {
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      ue_1.KuroSDKManager.PostSplashScreenEndSuccess();
    }
  }
  SdkDoInit() {
    ue_1.KuroSDKManager.KuroSDKEvent(17, "");
  }
  $Se() {
    if (ue_1.KuroSDKManager.GetPostWebViewInitState()) {
      if (this.GSe !== undefined) {
        TimerSystem_1.GameplayTimerSystem.Remove(this.GSe);
        this.GSe = undefined;
      }
    } else {
      ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(10);
    }
  }
  SdkLogout() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 27, "游戏注销");
    }
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      ue_1.KuroSDKManager.KuroSDKEvent(6, "");
    }
  }
  SdkLogin() {
    if (this.GetProtocolState()) {
      if (ue_1.KuroSDKManager.GetSdkInitState()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("KuroSdk", 27, "开始进行Sdk登录!!!");
        }
        if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
          if (!Platform_1.Platform.IsWindowsPlatform() || UE.KuroLauncherLibrary.IsFirstIntoLauncher()) {
            ue_1.KuroSDKManager.KuroSDKEvent(0, "");
          } else {
            ue_1.KuroSDKManager.KuroSDKEvent(7, "");
          }
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("KuroSdk", 27, "SDK初始化未结束");
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "协议尚未初始化");
    }
  }
  SdkKick() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 27, "响应Sdk踢人完成!!!，返回sdk");
    }
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      ue_1.KuroSDKManager.KuroSDKEvent(1, "");
      ControllerHolder_1.ControllerHolder.KuroSdkController.IsKick = true;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkKick);
    }
  }
  SdkSelectRole() {
    var e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 27, "上报选择角色");
    }
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      e = KuroSdkData_1.KuroSdkControllerTool.GetRoleInfo();
      ue_1.KuroSDKManager.KuroSDKEvent(2, e);
    }
  }
  SdkCreateRole() {
    var e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 27, "上报创建新角色");
    }
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      e = KuroSdkData_1.KuroSdkControllerTool.GetCreateRoleInfo();
      ue_1.KuroSDKManager.KuroSDKEvent(3, e);
    }
  }
  SdkLevelUpRole() {
    var e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 27, "上报角色升级");
    }
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      e = KuroSdkData_1.KuroSdkControllerTool.GetRoleInfo();
      ue_1.KuroSDKManager.KuroSDKEvent(4, e);
    }
  }
  SdkExit() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 27, "游戏退出");
    }
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      UE.KismetSystemLibrary.QuitGame(GlobalData_1.GlobalData.World, undefined, 0, false);
    } else if (!ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() || (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ExitGamePush), Info_1.Info.IsPcOrGamepadPlatform())) {
      cpp_1.KuroApplication.ExitWithReason(false, "SDK");
    } else if (Info_1.Info.PlatformType === 1 || Info_1.Info.PlatformType === 2 && ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("KuroSdk", 27, "直接退出");
      }
      cpp_1.KuroApplication.ExitWithReason(false, "SDK");
    } else {
      ue_1.KuroSDKManager.KuroSDKEvent(5, "");
    }
  }
  SdkOpenLoginWnd() {
    if (this.GetProtocolState()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("KuroSdk", 27, "主动打开sdk登录界面");
      }
      if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
        if (Info_1.Info.PlatformType === 1 && ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()) {
          ue_1.KuroSDKManager.KuroSDKEvent(0, "");
        } else {
          ue_1.KuroSDKManager.KuroSDKEvent(7, "");
        }
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "协议尚未初始化");
    }
  }
  GetAgreement() {
    let n = new Array();
    var e;
    var o = ue_1.KuroSDKManager.GetAgreementUrl();
    if (!ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()) {
      if (Platform_1.Platform.IsAndroidPlatform()) {
        Json_1.Json.Parse(o).gameInit?.forEach(e => {
          n.push(e);
        });
      } else if (Platform_1.Platform.IsWindowsPlatform()) {
        e = Json_1.Json.Parse(o);
        n = e;
      } else if (Platform_1.Platform.IsIOSPlatform() || Platform_1.Platform.IsMacPlatform()) {
        o.split(",").forEach(e => {
          let o = e;
          var r;
          var t;
          var e = (o = (o = o.replace("{", "")).replace("}", "")).split(";");
          if (e.length >= 2) {
            t = e[0].split("=");
            (r = new KuroSdkData_1.SdkAgreementLinkData()).link = t[1];
            r.link = r.link.trimStart();
            r.link = r.link.trimEnd();
            r.link = r.link.replace(/"/g, "");
            t = e[1].split("=");
            r.title = t[1];
            r.title = r.title.trimStart();
            r.title = r.title.trimEnd();
            r.title = r.title.replace(/"/g, "");
            r.title = r.title.toLowerCase();
            r.title = unescape(r.title);
            n.push(r);
          }
        });
      }
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "AgreementData", ["AgreementData", o]);
    }
    return n;
  }
  QueryProduct(e, o) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "需要模块内重写QueryProduct");
    }
    ModelManager_1.ModelManager.KuroSdkModel.QueryPromise?.SetResult(true);
  }
  ShareByteData(e, o) {
    e = Json_1.Json.Stringify(e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "Share", ["json", e]);
    }
    ue_1.KuroSDKManager.Share(o, e);
  }
  Share(e, o) {}
  ShareTexture(e, o) {}
  SdkPay(e) {
    var o;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "SdkPay", ["SdkPay", e]);
    }
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      o = KuroSdkData_1.KuroSdkControllerTool.GetSdkPayRoleInfo();
      e = KuroSdkData_1.KuroSdkControllerTool.GetPaymentInfo(e, o);
      ue_1.KuroSDKManager.KuroSDKEvent(8, e);
    }
  }
  GetCurrentSelectServerId() {
    var e;
    if (ModelManager_1.ModelManager.LoginServerModel.GetLoginServersByClientRegion()) {
      if ((e = ModelManager_1.ModelManager.LoginServerModel.GetCurrentLoginServerId()) === "0" && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("KuroSdk", 27, "海外选服没有服务器");
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("KuroSdk", 27, "当前服务器Id", ["serverId", e]);
      }
      return e;
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("KuroSdk", 27, "没有登录服务器信息");
      }
      return "0";
    }
  }
  InitializePostWebView() {
    var e = this.GetCurrentSelectServerId();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 27, "serverId");
    }
    var o = new KuroSdkData_1.InitializePostWebViewParam();
    o.language = LanguageSystem_1.LanguageSystem.PackageLanguage;
    o.serverId = e;
    if (Platform_1.Platform.IsWindowsPlatform() || Platform_1.Platform.IsAndroidPlatform()) {
      o.cdn = [PublicUtil_1.PublicUtil.GetNoticeBaseUrl() + "/gamenotice/" + PublicUtil_1.PublicUtil.GetGameId()];
    } else {
      o.cdn = [`${PublicUtil_1.PublicUtil.GetNoticeBaseUrl()}/gamenotice/${PublicUtil_1.PublicUtil.GetGameId()}/`];
    }
    var e = Json_1.Json.Stringify(o);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 27, "初始化公告", ["json", e]);
    }
    ue_1.KuroSDKManager.KuroSDKEvent(10, e);
  }
  GetSdkOpenUrlWndInfo(e, o) {
    var r = new KuroSdkData_1.OpenSdkUrlWndParam();
    r.title = e;
    r.wndUrl = o;
    var e = Json_1.Json.Stringify(r);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 27, "SdkJson", ["sdkJson", e ?? ""]);
    }
    return e;
  }
  OpenUserCenter() {
    ue_1.KuroSDKManager.KuroSDKEvent(13, "");
  }
  ShowAgreement() {
    ue_1.KuroSDKManager.KuroSDKEvent(15, "");
    KuroSdkReport_1.KuroSdkReport.Report(new KuroSdkReport_1.SdkReportOpenPrivacy(undefined));
  }
  KuroOpenPrivacyClauseWnd() {
    ue_1.KuroSDKManager.KuroSDKEvent(12, "");
    KuroSdkReport_1.KuroSdkReport.Report(new KuroSdkReport_1.SdkReportOpenPrivacy(undefined));
  }
  ReadProductInfo() {
    ue_1.KuroSDKManager.KuroSDKEvent(14, "");
  }
  NotifyLanguage() {
    var e = LanguageSystem_1.LanguageSystem.PackageLanguage;
    ue_1.KuroSDKManager.KuroSDKEvent(16, e);
    this.SetFont();
  }
  OpenPostWebView() {
    if (this.LastOpenPostViewTime !== 0 && Time_1.Time.Now - this.LastOpenPostViewTime <= WEBVIEWCD) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("InDisplayCd");
      return;
    }
    this.LastOpenPostViewTime = Time_1.Time.Now;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 27, "打开公告");
    }
    var e = ModelManager_1.ModelManager.FunctionModel;
    var o = ModelManager_1.ModelManager.PlayerInfoModel;
    var r = ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk() ? "global" : "cn";
    var t = new KuroSdkData_1.OpenPostWebViewParam();
    t.playerId = o.GetId() === undefined ? "0" : o.GetId().toString();
    t.playerLevel = e.GetPlayerLevel() ? e.GetPlayerLevel().toString() : "1";
    t.language = LanguageSystem_1.LanguageSystem.PackageLanguage;
    t.extend = "extend";
    t.gameOrientation = "2";
    t.type = r;
    var o = Json_1.Json.Stringify(t);
    ue_1.KuroSDKManager.KuroSDKEvent(11, o);
  }
  GetChannelId() {
    return "";
  }
  GetGameId() {
    return "";
  }
  GetChannelName() {
    return "";
  }
  GetAppChannelId() {
    return "";
  }
  GetDid() {
    return "";
  }
  GetOaid() {
    return "";
  }
  GetJyDid() {
    return "";
  }
  GetAccessToken() {
    return "";
  }
  GetPackageId() {
    return UE.KuroSDKManager.GetPackageId();
  }
  GetIsQRCodeLogin() {
    return ue_1.KuroSDKManager.GetSdkIsQRScan();
  }
  QRCodeLogin() {
    ue_1.KuroSDKManager.OpenSdkQRScan();
  }
  GetIsUserCenterEnable() {
    return true;
  }
  SetFont() {}
  IsCustomerServiceEnable() {
    return true;
  }
  OpenCustomerService(e) {}
  OpenFeedback() {
    var e;
    var o = BaseConfigController_1.BaseConfigController.GetFeedBackUrl();
    if (o) {
      e = this.GetFeedBackOpenUrl();
      if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
        ControllerHolder_1.ControllerHolder.KuroSdkController.SdkOpenUrlWnd(o.title, e);
      } else {
        UE.KismetSystemLibrary.LaunchURL(e);
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "CDN没有反馈配置");
    }
  }
  GetFeedBackOpenUrl() {
    var e = BaseConfigController_1.BaseConfigController.GetFeedBackUrl().url;
    var o = ModelManager_1.ModelManager.LoginModel;
    var r = ModelManager_1.ModelManager.FunctionModel;
    var t = ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() ? o.GetSdkLoginConfig()?.Token ?? "0" : "0";
    var n = ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() ? o.GetSdkLoginConfig()?.Uid ?? "0" : "0";
    var _ = o.GetSdkLoginConfig()?.UserName ? o.GetSdkLoginConfig()?.UserName ?? "" : "";
    return StringUtils_1.StringUtils.Format(this.FeedBackSt, e, t, o.GetServerId()?.toString() ?? "", n, _, r.GetPlayerName()?.toString() ?? "", ModelManager_1.ModelManager.FunctionModel.PlayerId.toString(), LanguageSystem_1.LanguageSystem.PackageAudio);
  }
  SdkOpenUrlWnd(e, o, r, t, n = 0) {
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      if (this.LastOpenTime !== 0) {
        if (Time_1.Time.Now - this.LastOpenTime <= WEBVIEWCD) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("InDisplayCd");
          return;
        }
      }
      this.LastOpenTime = Time_1.Time.Now;
      e = this.GetSdkOpenUrlWndInfo(e, o);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("KuroSdk", 27, "OpenUrl", ["info", e]);
      }
      ue_1.KuroSDKManager.KuroSDKEvent(9, e ?? "");
    }
  }
  OpenWebView(e, o, r, t, n, _) {
    ue_1.KuroSDKManager.OpenWebView(e, o, r, t, n, _, "");
  }
  KuroSdkLoginBindFunction(o) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 27, "绑定登录回调");
    }
    ue_1.KuroSDKManager.Get().LoginDelegate.Clear();
    ue_1.KuroSDKManager.Get().LoginDelegate.Add(e => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("KuroSdk", 27, "登录成功");
      }
      if (e) {
        o(e);
      }
    });
  }
  KuroSdkKickBindFunction() {
    ue_1.KuroSDKManager.Get().KickDelegate.Clear();
    ue_1.KuroSDKManager.Get().KickDelegate.Add(() => {
      this.SdkLogout();
    });
  }
  KuroSdkLogoutBindFunction(e) {
    ue_1.KuroSDKManager.Get().LogoutDelegate.Clear();
    ue_1.KuroSDKManager.Get().LogoutDelegate.Add(() => {
      e();
    });
  }
  BindSpecialEvent() {}
  KuroDeepLinkBindFunction() {
    ue_1.KuroSDKManager.Get().DeepLinkDelegate.Clear();
    ue_1.KuroSDKManager.Get().DeepLinkDelegate.Add(e => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("KuroSdk", 27, " KuroSDKManager.Get()!.DeepLinkDelegate", ["deepLink", e]);
      }
    });
  }
  KuroGameWinStateBindFunction() {
    ue_1.KuroSDKManager.Get().GameStateChangeCallBack.Clear();
    ue_1.KuroSDKManager.Get().GameStateChangeCallBack.Add(e => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("KuroSdk", 27, " KuroGameWinStateBindFunction", ["data", e]);
      }
      e = Json_1.Json.Parse(e);
      let o = false;
      if (e && e.status === "0") {
        o = true;
      }
      ModelManager_1.ModelManager.KuroSdkModel.OnSdkFocusChange(o);
    });
  }
  HSe() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "BindLogListener");
    }
    ue_1.KuroSDKManager.Get().LogDelegate.Clear();
    ue_1.KuroSDKManager.Get().LogDelegate.Add(o => {
      var r = o.split(",");
      var t = r.length;
      if (t > 0) {
        for (let e = 0; e < t; e++) {
          var n = r[e].split("=");
          if (n.length === 2 && n[0] === "level") {
            if ((n = Number(n[1])) === 0) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("KuroSdk", 27, "sdklog", ["Debug", o]);
              }
            } else if (n === 1) {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("KuroSdk", 27, "sdklog", ["Info", o]);
              }
            } else if (n === 2) {
              if (Log_1.Log.CheckWarn()) {
                Log_1.Log.Warn("KuroSdk", 27, "sdklog", ["Warn", o]);
              }
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("KuroSdk", 27, "sdklog", ["Error", o]);
            }
          }
        }
      }
    });
  }
  KuroSdkExitBindFunction() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "KuroSdkExitBindFunction");
    }
    ue_1.KuroSDKManager.Get().ExitDelegate.Clear();
    ue_1.KuroSDKManager.Get().ExitDelegate.Add(() => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("KuroSdk", 27, " KuroSDKManager.Get()!.ExitDelegate");
      }
      if (GlobalData_1.GlobalData.World) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("KuroSdk", 27, "GlobalData.World KuroSDKManager.Get()!.ExitDelegate");
        }
        cpp_1.KuroApplication.ExitWithReason(false, "KuroSdkExitBindFunction");
      }
    });
  }
  BindProtocolListener() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "BindProtocolListener");
    }
    ue_1.KuroSDKManager.Get().ProtocolCallBack.Clear();
    ue_1.KuroSDKManager.Get().ProtocolCallBack.Add(() => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("KuroSdk", 27, " BindProtocolListener.Get()!.ProtocolCallBack");
      }
      this.FSe = true;
    });
  }
  BindShareResultListener() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "BindShareResultListener");
    }
    ue_1.KuroSDKManager.Get().ShareResultDelegate.Clear();
    ue_1.KuroSDKManager.Get().ShareResultDelegate.Add((e, o, r) => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("KuroSdk", 27, " BindProtocolListener.Get()!.ShareResultDelegate");
      }
      this.OnShareResult(e, o, r);
    });
  }
  OnShareResult(e, o, r) {}
  KuroSdkQueryProductBindFunction() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "KuroSdkQueryProductBindFunction");
    }
    ue_1.KuroSDKManager.Get().PostProductDelegate.Clear();
    ue_1.KuroSDKManager.Get().PostProductDelegate.Add(e => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("KuroSdk", 27, "sdk:查询商品 queryProduct", ["result", e]);
      }
      e = this.OnQueryProduct(e);
      ModelManager_1.ModelManager.KuroSdkModel.OnQueryProductInfo(e);
    });
  }
  OnQueryProduct(e) {}
  GetSharePlatform(e) {
    this.GetSharePlatformCallBackList.push(e);
    if (!this.kSe) {
      this.kSe = true;
      ue_1.KuroSDKManager.GetSharePlatform();
    }
  }
  OnGetSharePlatform(e) {
    this.kSe = false;
  }
  KuroSdkPaymentBindFunction(r) {
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      ue_1.KuroSDKManager.Get().PaymentDelegate.Clear();
      ue_1.KuroSDKManager.Get().PaymentDelegate.Add((e, o) => {
        this.OnPaymentCallBack(e, o, r);
        if (e.PaymentType === 1) {
          (o = new LogReportDefine_1.SuccessSdkPayEvent()).s_sdk_pay_order = ModelManager_1.ModelManager.KuroSdkModel.CurrentPayingOrderId;
          ControllerHolder_1.ControllerHolder.LogReportController.LogReport(o);
        } else {
          (o = new LogReportDefine_1.FailSdkPayEvent()).s_sdk_pay_order = ModelManager_1.ModelManager.KuroSdkModel.CurrentPayingOrderId;
          o.s_reason = e.PaymentType === 3 ? "cancel" : "fail";
          ControllerHolder_1.ControllerHolder.LogReportController.LogReport(o);
        }
        KuroSdkReport_1.KuroSdkReport.OnSdkPay();
      });
    }
  }
  OnPaymentCallBack(e, o, r) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "OnPaymentCallBack", ["payment", e]);
    }
    r(e.PaymentType === 1, o);
  }
  KuroSdkBindRedPointFunction(o) {
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      ue_1.KuroSDKManager.Get().PostRedPointDelegate.Clear();
      ue_1.KuroSDKManager.Get().PostRedPointDelegate.Add(e => {
        o(e);
      });
    }
  }
  GetDeviceDid() {
    return this.CurrentDid;
  }
  ResetCustomServerRedDot() {
    this.CurrentCustomerShowState = false;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkCustomerRedPointRefresh);
  }
  GetProtocolState() {
    return !!this.FSe || !!UE.KuroSDKManager.GetIsAgreeProtocol();
  }
  GetCustomerServiceShowState() {
    return this.CurrentCustomerShowState;
  }
  CheckPhotoPermission() {
    return ue_1.KuroSDKManager.CheckPhotoPermission();
  }
  RequestPhotoPermission(e) {
    ue_1.KuroSDKManager.Get().RequestPhotoPermissionDelegate.Clear();
    ue_1.KuroSDKManager.Get().RequestPhotoPermissionDelegate.Add(e);
    ue_1.KuroSDKManager.RequestPhotoPermission();
  }
  OpenReview(e) {
    var o = this.CheckIfCanReview();
    if (o) {
      ue_1.KuroSDKManager.RequestReviewApp("");
      this.ReportReview(e);
      this.SaveCurrentReviewTime();
    } else {
      e = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.OpenReviewTimeList) ?? [];
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("KuroSdk", 27, "OpenReview Fail", ["state", o], ["reviewTimeList", e]);
      }
    }
  }
  ReportReview(e) {
    var o;
    if (Info_1.Info.IsMobilePlatform() && (Info_1.Info.PlatformType !== 2 || ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk())) {
      (o = new LogReportDefine_1.SdkStartReview()).s_channel = Info_1.Info.PlatformType === 1 ? "iOS" : "GP";
      o.i_id = e;
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(o);
    }
  }
  CurrentPlatformYearReviewTime() {
    return 0;
  }
  SaveCurrentReviewTime() {
    var e = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.OpenReviewTimeList) ?? [];
    var o = TimeUtil_1.TimeUtil.GetServerTime();
    var r = this.CurrentPlatformYearReviewTime();
    if (!(e.length < r)) {
      e.shift();
    }
    e.push(o);
    LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.OpenReviewTimeList, e);
  }
  CheckIfCanReview() {
    var e = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.OpenReviewTimeList) ?? [];
    var o = TimeUtil_1.TimeUtil.GetServerTime();
    var r = this.CurrentPlatformYearReviewTime();
    let t = false;
    return t = e.length < r || o - e[0] >= ONEYEARTIME ? true : t;
  }
  SetCursor(e) {
    ue_1.KuroSDKManager.SetCursor(e);
  }
  SetGamePadMode(e) {
    ue_1.KuroSDKManager.SetGamePadMode(e);
  }
  BindWebViewCloseDelegate(e) {
    ue_1.KuroSDKManager.Get().WebViewCloseDelegate.Clear();
    ue_1.KuroSDKManager.Get().WebViewCloseDelegate.Add(() => {
      e();
    });
  }
  GetRoleId() {
    if (ModelManager_1.ModelManager.PlayerInfoModel.GetId()) {
      return ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString();
    } else if (ModelManager_1.ModelManager.LoginModel.GetCreatePlayerId()) {
      return ModelManager_1.ModelManager.LoginModel.GetCreatePlayerId().toString();
    } else {
      return "";
    }
  }
  GetCustomServerRoleId() {
    return StringUtils_1.StringUtils.Format("{0}", this.GetRoleId());
  }
  GetCustomServerExtendsInfo() {
    var e = new KuroSdkData_1.OpenCustomerServiceExtendsInfo();
    var o = new KuroSdkData_1.OpenCustomerServiceExtendsInfoData();
    o.key = "version";
    o.label = "version";
    o.value = BaseConfigController_1.BaseConfigController.GetP4Version();
    e.data = new Array();
    e.data.push(o);
    return JSON.stringify(e);
  }
  OpenExternalUrl(e) {
    UE.KismetSystemLibrary.LaunchURL(e);
  }
  CloseWebView(e) {
    ue_1.KuroSDKManager.CloseWebView(e);
  }
  OnClear() {}
  RecoverSdkData() {}
}
exports.PlatformSdkBase = PlatformSdkBase;
//# sourceMappingURL=PlatformSdkBase.js.map