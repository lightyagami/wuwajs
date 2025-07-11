"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlatformCloudSdkIos = undefined;
const Json_1 = require("../../../Core/Common/Json");
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../Common/PublicUtil");
const CloudGameManager_1 = require("../../Manager/CloudGameManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const KuroSdkData_1 = require("../KuroSdkData");
const PlatformCloudSdkBase_1 = require("./PlatformCloudSdkBase");
class PlatformCloudSdkIos extends PlatformCloudSdkBase_1.PlatformCloudSdkBase {
  constructor() {
    super(...arguments);
    this.AnnounceRedPointCallBack = e => {
      if (e.includes("showRed") && (e.includes("1") || e.includes("YES"))) {
        ControllerHolder_1.ControllerHolder.KuroSdkController.SetPostWebViewRedPointState(true);
      } else {
        ControllerHolder_1.ControllerHolder.KuroSdkController.SetPostWebViewRedPointState(false);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkPostWebViewRedPointRefresh);
    };
  }
  BindSpecialEvent() {
    CloudGameManager_1.CloudGameManager.BindFunction("OnPostRedDotRefresh", this.AnnounceRedPointCallBack);
    CloudGameManager_1.CloudGameManager.BindFunction("OnCustomerRedDotRefresh", this.CustomerServiceResultCallBack);
  }
  OpenCustomerService(e) {
    var o = ModelManager_1.ModelManager.LoginModel;
    var r = ModelManager_1.ModelManager.PlayerInfoModel;
    var a = new KuroSdkData_1.OpenCustomerServiceParamIos();
    a.islogin = o.IsSdkLoggedIn() ? 1 : 0;
    a.from = e;
    a.RoleId = this.GetCustomServerRoleId();
    a.RoleName = r.GetAccountName();
    a.ServerId = o.GetServerId();
    a.ServerName = o.GetServerName();
    a.RoleLevel = r.GetPlayerLevel();
    a.ExtendsInfo = this.GetCustomServerExtendsInfo();
    var e = Json_1.Json.Stringify(a);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CloudGame", 58, "IosCustomerService", ["json", e]);
    }
    CloudGameManager_1.CloudGameManager.SendDataByKey("OpenCustomerService", e ?? "");
  }
  SdkPay(e) {
    var o = KuroSdkData_1.KuroSdkControllerTool.GetSdkPayRoleInfo();
    var e = KuroSdkData_1.KuroSdkControllerTool.GetPaymentInfo(e, o);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CloudGame", 58, "IOSPayment", ["json", e]);
    }
    CloudGameManager_1.CloudGameManager.SendDataByKey("SDKPay", e);
  }
  InitializePostWebView() {
    var e = this.GetCurrentSelectServerId();
    var o = new KuroSdkData_1.InitializePostWebViewParam();
    o.language = LanguageSystem_1.LanguageSystem.PackageLanguage;
    o.serverId = e;
    o.cdn = [`${PublicUtil_1.PublicUtil.GetNoticeBaseUrl()}/gamenotice/${PublicUtil_1.PublicUtil.GetGameId()}/`];
    var e = Json_1.Json.Stringify(o);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CloudGame", 58, "初始化公告", ["json", e]);
    }
    CloudGameManager_1.CloudGameManager.SendDataByKey("InitPostWebView", e);
  }
}
exports.PlatformCloudSdkIos = PlatformCloudSdkIos;
//# sourceMappingURL=PlatformCloudSdkIos.js.map