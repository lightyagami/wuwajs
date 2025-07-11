"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlatformSdkWindows = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const ue_1 = require("ue");
const Json_1 = require("../../../Core/Common/Json");
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../Common/PublicUtil");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const KuroSdkData_1 = require("../KuroSdkData");
const PlatformSdkBase_1 = require("./PlatformSdkBase");
const WEBVIEWCD = 5000;
class WindowsSdkRedPointSt extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments);
    this.data = "";
    this.error = 0;
    this.type = "";
  }
}
class WindowsSdkRedPointContentSt extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments);
    this.showRed = false;
  }
}
class WindowsSdkCustomerServiceSt extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments);
    this.data = "";
    this.error = 0;
    this.type = "";
  }
}
class WindowsSdkCustomerServiceContentSt extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments);
    this.cuid = 0;
    this.isreddot = 0;
  }
}
class WindowsPaymentSt extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments);
    this.data = "";
    this.error = 0;
    this.type = "";
  }
}
class PlatformSdkWindows extends PlatformSdkBase_1.PlatformSdkBase {
  constructor() {
    super(...arguments);
    this.OnAnnounceInitCallBack = e => {};
    this.AnnounceRedPointCallBack = e => {
      e = Json_1.Json.Parse(e);
      e = Json_1.Json.Parse(e.data);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("KuroSdk", 27, "公告红点", ["data", e]);
      }
      ControllerHolder_1.ControllerHolder.KuroSdkController.SetPostWebViewRedPointState(e.showRed);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkPostWebViewRedPointRefresh);
    };
    this.CustomerServiceResultCallBack = e => {
      var o = Json_1.Json.Parse(e);
      var r = Json_1.Json.Parse(o.data);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("KuroSdk", 27, "当前客服红点数量", ["result", e]);
      }
      if (o) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("KuroSdk", 27, "当前客服红点数量", ["num", r.isreddot]);
        }
        this.CurrentCustomerShowState = r.isreddot > 0;
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkCustomerRedPointRefresh);
    };
    this.OnLoginCallBack = e => {};
  }
  OnInit() {
    this.CurrentDid = ue_1.KuroSDKManager.GetBasicInfo().DeviceId;
    cpp_1.FCrashSightProxy.SetCustomData("SdkDeviceId", this.CurrentDid);
    cpp_1.FCrashSightProxy.SetCustomData("SdkChannelId", this.GetChannelId());
  }
  BindSpecialEvent() {
    ue_1.KuroSDKManager.Get().AnnounceInitDelegate.Clear();
    ue_1.KuroSDKManager.Get().AnnounceInitDelegate.Add(this.OnAnnounceInitCallBack);
    ue_1.KuroSDKManager.Get().AnnounceRedPointDelegate.Clear();
    ue_1.KuroSDKManager.Get().AnnounceRedPointDelegate.Add(this.AnnounceRedPointCallBack);
    ue_1.KuroSDKManager.Get().CustomerServiceResultDelegate.Clear();
    ue_1.KuroSDKManager.Get().CustomerServiceResultDelegate.Add(this.CustomerServiceResultCallBack);
    ue_1.KuroSDKManager.Get().OnLoginDelegate.Clear();
    ue_1.KuroSDKManager.Get().OnLoginDelegate.Add(this.OnLoginCallBack);
  }
  OpenWebView(e, o, r, t, n, _) {
    var s = new KuroSdkData_1.OpenWebViewParamWindows();
    s.title = e;
    s.url = o;
    s.transparent = t;
    s.webAccelerated = n;
    s.innerbrowser = true;
    s.identifier = _;
    var s = Json_1.Json.Stringify(s);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 27, "OpenWebView", ["sdkJson", s ?? ""]);
    }
    ue_1.KuroSDKManager.OpenWebView(e, o, r, t, n, _, s);
  }
  GetSdkOpenUrlWndInfo(e, o) {
    var r = new KuroSdkData_1.OpenSdkUrlWndParamWindows();
    r.title = e;
    r.url = o;
    var e = Json_1.Json.Stringify(r);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 27, "SdkJson", ["sdkJson", e ?? ""]);
    }
    return e;
  }
  SdkOpenUrlWnd(e, o, r, t, n = true) {
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      if (this.LastOpenTime !== 0) {
        if (Time_1.Time.Now - this.LastOpenTime <= WEBVIEWCD) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("InDisplayCd");
          return;
        }
      }
      this.LastOpenTime = Time_1.Time.Now;
      this.OpenWebView(e, o, r, t, n, "");
    }
  }
  OpenFeedback() {
    var e;
    var o;
    var r;
    var t;
    var n;
    var _;
    var s = BaseConfigController_1.BaseConfigController.GetFeedBackUrl();
    if (s) {
      _ = s.url;
      e = ModelManager_1.ModelManager.LoginModel;
      o = ModelManager_1.ModelManager.FunctionModel;
      r = ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() ? e.GetSdkLoginConfig()?.Token ?? "0" : "0";
      t = ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() ? e.GetSdkLoginConfig()?.Uid ?? "0" : "0";
      n = e.GetSdkLoginConfig()?.UserName ? e.GetSdkLoginConfig()?.UserName ?? "" : "";
      _ = StringUtils_1.StringUtils.Format(this.FeedBackSt, _, r, e.GetServerId().toString(), t, n, o.GetPlayerName().toString(), ModelManager_1.ModelManager.FunctionModel.PlayerId.toString(), LanguageSystem_1.LanguageSystem.PackageLanguage);
      if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
        ControllerHolder_1.ControllerHolder.KuroSdkController.OpenWebView(s.title, _, true, true);
      } else {
        UE.KismetSystemLibrary.LaunchURL(_);
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "CDN没有反馈配置");
    }
  }
  SdkExit() {
    ue_1.KuroSDKManager.ShowExitGameDialog();
  }
  InitializePostWebView() {
    var e;
    var o = ModelManager_1.ModelManager.LoginServerModel.GetLoginServersByClientRegion();
    if (o) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("KuroSdk", 27, "serverId");
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("KuroSdk", 27, o[0].id);
      }
      (e = new KuroSdkData_1.InitializePostWebViewParam()).language = LanguageSystem_1.LanguageSystem.PackageLanguage;
      e.cdn = [`${PublicUtil_1.PublicUtil.GetNoticeBaseUrl()}/gamenotice/${PublicUtil_1.PublicUtil.GetGameId()}/`];
      e.serverId = o[0].id === undefined ? "1013" : o[0].id;
      o = Json_1.Json.Stringify(e);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("KuroSdk", 27, "初始化公告", ["json", o]);
      }
      ue_1.KuroSDKManager.KuroSDKEvent(10, o);
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 27, "没有登录服务器信息");
    }
  }
  GetChannelId() {
    return ue_1.KuroSDKManager.GetSdkParams("channel_id");
  }
  GetChannelName() {
    return ue_1.KuroSDKManager.GetSdkParams("channel_name");
  }
  GetGameId() {
    return ue_1.KuroSDKManager.GetSdkParams("project_id");
  }
  GetDid() {
    return ue_1.KuroSDKManager.GetSdkParams("did");
  }
  GetAccessToken() {
    return ue_1.KuroSDKManager.GetSdkParams("token");
  }
  GetAgreement() {
    let e = new Array();
    var o;
    var r = ue_1.KuroSDKManager.GetSdkParams("game_init_agreement");
    if (!ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()) {
      o = Json_1.Json.Parse(r);
      e = o;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "AgreementData", ["AgreementData", r]);
    }
    return e;
  }
  SdkPay(e) {
    var o;
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      o = KuroSdkData_1.KuroSdkControllerTool.GetSdkPayRoleInfo();
      o = this.qSe(e, o);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("KuroSdk", 27, "WindowsPayment", ["json", o], ["paymentInfo", e]);
      }
      ue_1.KuroSDKManager.KuroSDKEvent(8, o);
    }
  }
  qSe(e, o) {
    var r = new KuroSdkData_1.PayInfoWindows();
    r.roleId = o.roleId.toString();
    r.roleName = o.roleName.toString();
    r.serverId = o.serverId.toString();
    r.serverName = o.serverName.toString();
    r.cpOrderId = e.cpOrderId.toString();
    r.callbackUrl = e.callbackUrl.toString();
    r.product_id = e.product_id.toString();
    r.goodsName = e.goodsName.toString();
    r.goodsDesc = e.goodsDesc.toString();
    r.currency = "";
    r.extraParams = "";
    let t = Json_1.Json.Stringify(r);
    return t = (t = t.replace("}", ",")) + StringUtils_1.StringUtils.Format("\"price\":{0}", e.price.toString()) + "}";
  }
  OpenCustomerService(e) {
    var o = ModelManager_1.ModelManager.LoginModel;
    var r = new KuroSdkData_1.OpenCustomerServiceParamWindows();
    r.islogin = o.IsSdkLoggedIn();
    r.from = e;
    r.roleId = this.GetCustomServerRoleId();
    r.extendsInfo = this.GetCustomServerExtendsInfo();
    var o = Json_1.Json.Stringify(r);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "WindowsCustomerService", ["json", o]);
    }
    ue_1.KuroSDKManager.OpenCustomerService(o);
  }
  SdkSelectRole() {
    var e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 27, "上报选择角色");
    }
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      e = this.ZSe();
      ue_1.KuroSDKManager.KuroSDKEvent(2, e);
    }
  }
  SdkCreateRole() {
    var e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 27, "上报创建新角色");
    }
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      e = this.tye();
      ue_1.KuroSDKManager.KuroSDKEvent(3, e);
    }
  }
  SdkLevelUpRole() {
    var e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 27, "上报角色升级");
    }
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      e = this.ZSe();
      ue_1.KuroSDKManager.KuroSDKEvent(4, e);
    }
  }
  tye() {
    var e = ModelManager_1.ModelManager.LoginModel;
    var o = new KuroSdkData_1.RoleInfoWindows();
    o.roleId = this.GetRoleId();
    o.roleName = e.GetPlayerName() ? e.GetPlayerName() : "";
    o.serverId = e.GetServerId() ? e.GetServerId() : "";
    o.serverName = e.GetServerName() ? e.GetServerName() : "";
    o.roleLevel = "1";
    o.vipLevel = "0";
    o.partyName = " ";
    o.roleCreateTime = e.GetCreatePlayerTime() ? e.GetCreatePlayerTime() : "";
    o.setBalanceLevelOne = "0";
    o.setBalanceLevelTwo = "0";
    o.setSumPay = "0";
    var e = Json_1.Json.Stringify(o) ?? "";
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "SdkGetRoleInfo", ["data", e]);
    }
    return e;
  }
  ZSe() {
    var e = ModelManager_1.ModelManager.FunctionModel;
    var o = ModelManager_1.ModelManager.LoginModel;
    var r = new KuroSdkData_1.RoleInfoWindows();
    r.roleId = this.GetRoleId();
    r.roleName = e.GetPlayerName() ? e.GetPlayerName() : "";
    r.serverId = o.GetServerId() ? o.GetServerId() : "";
    r.serverName = o.GetServerName() ? o.GetServerName() : "";
    r.roleLevel = e.GetPlayerLevel() ? e.GetPlayerLevel().toString() : "1";
    r.vipLevel = "0";
    r.partyName = " ";
    r.roleCreateTime = "";
    r.setBalanceLevelOne = e.GetPlayerCashCoin();
    r.setBalanceLevelTwo = "0";
    r.setSumPay = "0";
    var o = Json_1.Json.Stringify(r) ?? "";
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "SdkGetRoleInfo", ["data", o]);
    }
    return o;
  }
  SetFont() {
    var e = new KuroSdkData_1.SetFontParamWindows();
    var o = ModelManager_1.ModelManager.KuroSdkModel.GetCurrentFontName();
    e.name = o;
    var o = ModelManager_1.ModelManager.KuroSdkModel.GetDeviceFontAsset();
    e.path = UE.BlueprintPathsLibrary.RootDir() + "Client/Binaries/Win64/ThirdParty/KrPcSdk_Mainland/" + o;
    var o = Json_1.Json.Stringify(e) ?? "";
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 27, "SetFont", ["data", o]);
    }
    ue_1.KuroSDKManager.SetFont(o);
  }
  OnPaymentCallBack(e, o, r) {
    let t = false;
    if (Json_1.Json.Parse(o)?.error === 0 && (t = true, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("KuroSdk", 27, "OnPaymentCallBack Windows Success");
    }
    r(t, o);
  }
}
exports.PlatformSdkWindows = PlatformSdkWindows;
//# sourceMappingURL=PlatformSdkWindows.js.map