"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlatformCloudSdkAndroid = undefined;
const Json_1 = require("../../../Core/Common/Json");
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../Core/Common/Log");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../Common/PublicUtil");
const CloudGameManager_1 = require("../../Manager/CloudGameManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const KuroSdkData_1 = require("../KuroSdkData");
const PlatformCloudSdkBase_1 = require("./PlatformCloudSdkBase");
class PlatformCloudSdkAndroid extends PlatformCloudSdkBase_1.PlatformCloudSdkBase {
  constructor() {
    super(...arguments);
    this.AnnounceRedPointCallBack = e => {
      e = Json_1.Json.Parse(e);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("CloudGame", 58, "公告红点", ["data", e]);
      }
      ControllerHolder_1.ControllerHolder.KuroSdkController.SetPostWebViewRedPointState(e.showRed);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkPostWebViewRedPointRefresh);
    };
  }
  BindSpecialEvent() {
    CloudGameManager_1.CloudGameManager.BindFunction("OnPostRedDotRefresh", this.AnnounceRedPointCallBack);
    CloudGameManager_1.CloudGameManager.BindFunction("OnCustomerRedDotRefresh", this.CustomerServiceResultCallBack);
  }
  OpenCustomerService(e) {
    var o = ModelManager_1.ModelManager.LoginModel;
    var r = new KuroSdkData_1.OpenCustomerServiceParamAndroid();
    r.IsLogin = o.IsSdkLoggedIn() ? "1" : "0";
    r.FromLogin = e.toString();
    r.RoleId = this.GetCustomServerRoleId();
    r.ServerId = o.GetServerId() ?? "";
    r.IsLandscape = "0";
    r.ExtendsInfo = this.GetCustomServerExtendsInfo();
    var e = Json_1.Json.Stringify(r);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CloudGame", 58, "AndroidCustomerService", ["json", e]);
    }
    CloudGameManager_1.CloudGameManager.SendDataByKey("OpenCustomerService", e ?? "");
  }
  SdkPay(e) {
    var o = this.bSe();
    var o = this.qu_(e, o);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CloudGame", 58, "AndroidPayment", ["json", o], ["paymentInfo", e]);
    }
    CloudGameManager_1.CloudGameManager.SendDataByKey("SDKPay", o);
  }
  bSe() {
    var e = ModelManager_1.ModelManager.FunctionModel;
    var o = ModelManager_1.ModelManager.LoginModel;
    var r = new KuroSdkData_1.AndroidSdkPayRole();
    r.roleId = this.GetRoleId();
    r.roleName = e.GetPlayerName() ? e.GetPlayerName() : "";
    r.roleLevel = e.GetPlayerLevel() ? e.GetPlayerLevel().toString() : "1";
    r.serverId = o.GetServerId() ? o.GetServerId() : "";
    r.serverName = o.GetServerName() ? o.GetServerName() : "";
    r.vipLevel = "0";
    r.partyName = " ";
    r.setBalanceLevelOne = "0";
    r.setBalanceLevelTwo = "0";
    return r;
  }
  qu_(e, o) {
    var r = new KuroSdkData_1.PayInfoAndroid();
    r.cpOrderId = e.cpOrderId.toString();
    r.callbackUrl = e.callbackUrl.toString();
    r.product_id = e.product_id.toString();
    r.goodsName = e.goodsName.toString();
    r.goodsDesc = e.goodsDesc.toString();
    r.currency = e.currency.toString();
    r.extraParams = e.extraParams?.toString();
    let a = Json_1.Json.Stringify(r);
    a = (a = a.replace("}", ",")) + StringUtils_1.StringUtils.Format("\"price\":{0}", e.price.toString()) + "}";
    r = Json_1.Json.Stringify(o);
    e = StringUtils_1.StringUtils.Format("{\"RoleInfo\":{0},\"OrderInfo\":{1}}", r, a);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CloudGame", 58, "SdkJson", ["sdkJson", e]);
    }
    return e ?? "";
  }
  InitializePostWebView() {
    var e = this.GetCurrentSelectServerId();
    var o = new KuroSdkData_1.InitializePostWebViewParam();
    o.language = LanguageSystem_1.LanguageSystem.PackageLanguage;
    o.serverId = e;
    o.cdn = [PublicUtil_1.PublicUtil.GetNoticeBaseUrl() + "/gamenotice/" + PublicUtil_1.PublicUtil.GetGameId()];
    var e = Json_1.Json.Stringify(o);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CloudGame", 58, "初始化公告", ["json", e]);
    }
    CloudGameManager_1.CloudGameManager.SendDataByKey("InitPostWebView", e);
  }
}
exports.PlatformCloudSdkAndroid = PlatformCloudSdkAndroid;
//# sourceMappingURL=PlatformCloudSdkAndroid.js.map