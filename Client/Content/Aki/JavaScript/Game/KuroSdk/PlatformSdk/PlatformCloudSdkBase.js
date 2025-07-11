"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlatformCloudSdkBase = undefined;
const Json_1 = require("../../../Core/Common/Json");
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const CloudGameManagerLauncher_1 = require("../../../Launcher/Platform/CloudGameManagerLauncher");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const CloudGameManager_1 = require("../../Manager/CloudGameManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LogReportDefine_1 = require("../../Module/LogReport/LogReportDefine");
const KuroSdkData_1 = require("../KuroSdkData");
const KuroSdkReport_1 = require("../KuroSdkReport");
const PlatformSdkWindows_1 = require("./PlatformSdkWindows");
const WEBVIEWCD = 5000;
class PlatformCloudSdkBase extends PlatformSdkWindows_1.PlatformSdkWindows {
  constructor() {
    super(...arguments);
    this.CustomerServiceResultCallBack = e => {
      var o = Json_1.Json.Parse(e);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("CloudGame", 58, "当前客服红点数量", ["num", e]);
      }
      if (o) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("CloudGame", 58, "当前客服红点数量", ["num", o.isredot]);
        }
        this.CurrentCustomerShowState = o.isredot > 0;
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkCustomerRedPointRefresh);
    };
    this.Ou_ = e => {
      if (Json_1.Json.Decode(e).ErrorCode === 0) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnShareResult, true);
      } else {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnShareResult, false);
      }
    };
    this.Gu_ = e => {
      var o;
      var e = Json_1.Json.Decode(e);
      ControllerHolder_1.ControllerHolder.KuroSdkController.OnSdkPayEnd(e.paymentType === 1, "");
      if (e.paymentType === 1) {
        (o = new LogReportDefine_1.SuccessSdkPayEvent()).s_sdk_pay_order = ModelManager_1.ModelManager.KuroSdkModel.CurrentPayingOrderId;
        ControllerHolder_1.ControllerHolder.LogReportController.LogReport(o);
      } else {
        (o = new LogReportDefine_1.FailSdkPayEvent()).s_sdk_pay_order = ModelManager_1.ModelManager.KuroSdkModel.CurrentPayingOrderId;
        o.s_reason = e.paymentType === 3 ? "cancel" : "fail";
        ControllerHolder_1.ControllerHolder.LogReportController.LogReport(o);
      }
      KuroSdkReport_1.KuroSdkReport.OnSdkPay();
    };
    this.oF1 = e => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("KuroSdk", 27, "Cloud KuroGameWinStateBindFunction", ["data", e]);
      }
      e = Json_1.Json.Parse(e);
      let o = false;
      if (e && e.status === "0") {
        o = true;
      }
      ModelManager_1.ModelManager.KuroSdkModel.OnSdkFocusChange(o);
    };
  }
  BindProtocolListener() {}
  BindShareResultListener() {
    CloudGameManager_1.CloudGameManager.BindFunction("OnShareResult", this.Ou_);
    CloudGameManager_1.CloudGameManager.BindFunction("OnSDKPayResult", this.Gu_);
  }
  KuroSdkBindRedPointFunction(e) {}
  KuroSdkExitBindFunction() {}
  KuroSdkQueryProductBindFunction() {}
  KuroDeepLinkBindFunction() {}
  KuroGameWinStateBindFunction() {
    CloudGameManager_1.CloudGameManager.BindFunction("OnGameWindowStatusChanged", this.oF1);
  }
  SdkLogout() {}
  SdkLogin() {
    if (CloudGameManagerLauncher_1.CloudGameManagerLauncher.IsPreLaunch) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("CloudGame", 16, "请求下发缓存的SDK登录信息 预启动跳过重复流程");
      }
    } else {
      CloudGameManager_1.CloudGameManager.SendData("RequestLogin");
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("CloudGame", 58, "请求下发缓存的SDK登录信息");
      }
    }
  }
  SdkCreateRole() {
    var e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 16, "云游戏上报创建新角色");
    }
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      e = KuroSdkData_1.KuroSdkControllerTool.GetCreateRoleInfo();
      CloudGameManager_1.CloudGameManager.SendDataByKey("SDKCreateRole", e);
    }
  }
  SdkSelectRole() {
    var e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 16, "云游戏上报选择新角色");
    }
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      e = KuroSdkData_1.KuroSdkControllerTool.GetRoleInfo();
      CloudGameManager_1.CloudGameManager.SendDataByKey("SDKSelectRole", e);
    }
  }
  SdkLevelUpRole() {
    var e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 16, "云游戏上报角色升级");
    }
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      e = KuroSdkData_1.KuroSdkControllerTool.GetRoleInfo();
      CloudGameManager_1.CloudGameManager.SendDataByKey("SDKLevelUpRole", e);
    }
  }
  SdkOpenLoginWnd() {
    CloudGameManager_1.CloudGameManager.SendData("RequestLogin");
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CloudGame", 58, "请求重新下发缓存的SDK登录信息");
    }
  }
  OpenUserCenter() {
    CloudGameManager_1.CloudGameManager.SendData("OpenUserCenter");
  }
  ShowAgreement() {
    CloudGameManager_1.CloudGameManager.SendData("OpenAgreement");
  }
  KuroOpenPrivacyClauseWnd() {
    CloudGameManager_1.CloudGameManager.SendData("OpenPrivacyClause");
  }
  OpenPostWebView() {
    if (this.LastOpenPostViewTime !== 0 && Time_1.Time.Now - this.LastOpenPostViewTime <= WEBVIEWCD) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("InDisplayCd");
      return;
    }
    this.LastOpenPostViewTime = Time_1.Time.Now;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CloudGame", 58, "打开公告");
    }
    var e = ModelManager_1.ModelManager.FunctionModel;
    var o = ModelManager_1.ModelManager.PlayerInfoModel;
    var r = ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk() ? "global" : "cn";
    var a = new KuroSdkData_1.OpenPostWebViewParam();
    a.playerId = o.GetId() === undefined ? "0" : o.GetId().toString();
    a.playerLevel = e.GetPlayerLevel() ? e.GetPlayerLevel().toString() : "1";
    a.language = LanguageSystem_1.LanguageSystem.PackageLanguage;
    a.extend = "extend";
    a.gameOrientation = "2";
    a.type = r;
    var o = Json_1.Json.Stringify(a);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CloudGame", 58, "云游戏OpenPostWebView", ["data", o]);
    }
    CloudGameManager_1.CloudGameManager.SendDataByKey("OpenPostWebView", o);
  }
  OpenWebView(e, o, r, a, n, t) {
    if (this.LastOpenTime !== 0 && Time_1.Time.Now - this.LastOpenTime <= WEBVIEWCD) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("InDisplayCd");
      return;
    }
    this.LastOpenTime = Time_1.Time.Now;
    var d = new KuroSdkData_1.OpenWebViewParamCloudGame();
    d.title = e;
    d.url = o;
    d.transparent = a;
    d.webAccelerated = n;
    d.isLandscape = r;
    d.identifier = t;
    var e = Json_1.Json.Stringify(d);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CloudGame", 58, "OpenWebView", ["sdkJson", e ?? ""]);
    }
    CloudGameManager_1.CloudGameManager.SendDataByKey("OpenWebView", e);
  }
  SdkOpenUrlWnd(e, o, r, a, n = true) {
    this.OpenWebView(e, o, r, a, n, "");
  }
  RecoverSdkData() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CloudGame", 58, "PlatformCloudSdkBase.RecoverSdkData");
    }
    CloudGameManager_1.CloudGameManager.TryRequestGamePadDevice();
  }
}
exports.PlatformCloudSdkBase = PlatformCloudSdkBase;
//# sourceMappingURL=PlatformCloudSdkBase.js.map