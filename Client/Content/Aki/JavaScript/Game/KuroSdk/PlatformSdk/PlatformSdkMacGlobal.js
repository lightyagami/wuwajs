"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlatformSdkMacGlobal = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const ue_1 = require("ue");
const Json_1 = require("../../../Core/Common/Json");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const KuroSdkData_1 = require("../KuroSdkData");
const PlatformSdkBase_1 = require("./PlatformSdkBase");
const WEBVIEWCD = 5000;
class IQueryProduct extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments);
    this.products = undefined;
    this.code = 0;
    this.msg = "";
  }
}
class ISdkCustomerService extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments);
    this.cuid = "";
    this.isredot = 0;
  }
}
class PlatformSdkMacGlobal extends PlatformSdkBase_1.PlatformSdkBase {
  constructor() {
    super(...arguments);
    this.JSe = undefined;
    this.CustomerServiceResultCallBack = e => {
      var r = Json_1.Json.Parse(e);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("KuroSdk", 27, "当前客服红点数量", ["num", e]);
      }
      if (r) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("KuroSdk", 27, "当前客服红点数量", ["num", r.isredot]);
        }
        this.CurrentCustomerShowState = r.isredot > 0;
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkCustomerRedPointRefresh);
    };
  }
  OnInit() {
    this.CurrentDid = ue_1.KuroSDKManager.GetBasicInfo().DeviceId;
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() && UE.KuroLauncherLibrary.IsFirstIntoLauncher()) {
      ue_1.KuroSDKManager.PostSplashScreenEndSuccess();
    }
    cpp_1.FCrashSightProxy.SetCustomData("SdkDeviceId", this.CurrentDid);
    cpp_1.FCrashSightProxy.SetCustomData("SdkChannelId", this.GetChannelId());
  }
  BindSpecialEvent() {
    ue_1.KuroSDKManager.Get().CustomerServiceResultDelegate.Clear();
    ue_1.KuroSDKManager.Get().CustomerServiceResultDelegate.Add(this.CustomerServiceResultCallBack);
  }
  OpenCustomerService(e) {
    var r = ModelManager_1.ModelManager.LoginModel;
    var o = ModelManager_1.ModelManager.PlayerInfoModel;
    var t = new KuroSdkData_1.OpenCustomerServiceParamMac();
    t.islogin = r.IsSdkLoggedIn() ? 1 : 0;
    t.from = e;
    t.RoleId = this.GetCustomServerRoleId();
    t.RoleName = o.GetAccountName();
    t.ServerId = r.GetServerId();
    t.ServerName = r.GetServerName();
    t.RoleLevel = o.GetPlayerLevel();
    t.ExtendsInfo = this.GetCustomServerExtendsInfo();
    var e = Json_1.Json.Stringify(t);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "MacCustomerService", ["json", e]);
    }
    ue_1.KuroSDKManager.OpenCustomerService(e);
  }
  GetChannelId() {
    var e = this.zSe();
    if (e?.channelId) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("KuroSdk", 27, "channel_id", ["userInfo", e]);
      }
      return e?.channelId;
    } else {
      return "";
    }
  }
  zSe() {
    var e;
    if (this.JSe === undefined) {
      e = ue_1.KuroSDKManager.GetSdkParams("");
      this.JSe = Json_1.Json.Parse(e);
    }
    return this.JSe;
  }
  SetFont() {
    var e = ModelManager_1.ModelManager.KuroSdkModel.GetDeviceFontAsset();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 27, "SetFont", ["fontPath", e]);
    }
    ue_1.KuroSDKManager.SetFont(e);
  }
  QueryProduct(r, e) {
    let o = "";
    var t = r.length;
    for (let e = 0; e < t; e++) {
      o += r[e];
      if (e !== t - 1) {
        o += ",";
      }
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "QueryProduct", ["data", o]);
    }
    ue_1.KuroSDKManager.QueryProductInfo(o);
  }
  OnQueryProduct(e) {
    var e = e.split("|");
    const o = new Array();
    if (e?.length > 0 && ((e = Json_1.Json.Parse(e[1]))?.products?.forEach(e => {
      var r = new PlatformSdkBase_1.QueryProductSt();
      r.Currency = e.currency;
      r.GoodId = e.goodsId;
      r.Name = e.name;
      r.Desc = e.desc;
      r.Price = e.price;
      o.push(r);
    }), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("KuroSdk", 27, "queryProduct", ["queryProduct", e]);
    }
    return o;
  }
  SdkPay(e) {
    var r = this.bSe();
    var r = this.qSe(e, r);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "AndroidPayment", ["json", r], ["paymentInfo", e]);
    }
    ue_1.KuroSDKManager.KuroSDKEvent(8, r);
  }
  bSe() {
    var e = ModelManager_1.ModelManager.FunctionModel;
    var r = ModelManager_1.ModelManager.LoginModel;
    return {
      roleId: this.GetRoleId(),
      roleName: e.GetPlayerName() ? e.GetPlayerName() : "",
      roleLevel: e.GetPlayerLevel() ? e.GetPlayerLevel().toString() : "1",
      serverId: r.GetServerId() ? r.GetServerId() : "",
      serverName: r.GetServerName() ? r.GetServerName() : "",
      vipLevel: "0",
      partyName: " ",
      setBalanceLevelOne: 0,
      setBalanceLevelTwo: 0
    };
  }
  qSe(e, r) {
    var o = new KuroSdkData_1.PayInfoMacIosGlobal();
    o.RoleId = r.roleId.toString();
    o.RoleName = r.roleName.toString();
    o.ServerId = r.serverId.toString();
    o.ServerName = r.serverName.toString();
    o.CpOrder = e.cpOrderId.toString();
    o.CallbackUrl = e.callbackUrl.toString();
    o.GamePropID = e.product_id.toString();
    o.GoodsName = e.goodsName.toString();
    o.GoodsDesc = e.goodsDesc.toString();
    o.Price = e.price.toString();
    o.GoodsCurrency = "USD";
    o.ExtraParams = r.roleId.toString();
    return Json_1.Json.Stringify(o) ?? "";
  }
  SdkOpenUrlWnd(e, r, o, t, n = true) {
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      if (this.LastOpenTime !== 0) {
        if (Time_1.Time.Now - this.LastOpenTime <= WEBVIEWCD) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("InDisplayCd");
          return;
        }
      }
      this.LastOpenTime = Time_1.Time.Now;
      this.OpenWebView(e, r, o, t, n, "");
    }
  }
  SdkExit() {
    ue_1.KuroSDKManager.ShowExitGameDialog();
  }
}
exports.PlatformSdkMacGlobal = PlatformSdkMacGlobal;
//# sourceMappingURL=PlatformSdkMacGlobal.js.map